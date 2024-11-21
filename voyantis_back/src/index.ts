import Fastify from "fastify";
import cors from "@fastify/cors";

// Define a map to store queues by queue name
const queues: Record<string, any[]> = {};

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: "*", // This will allow requests from any origin.
  methods: ["GET", "POST", "PUT", "DELETE"],
});

// POST endpoint to add a message to the queue
fastify.post("/api/:queue_name", (request, reply) => {
  const { queue_name } = request.params as { queue_name: string };
  const message = request.body;

  if (!queues[queue_name]) {
    queues[queue_name] = [];
  }

  queues[queue_name].push(message);
  reply.status(201).send({ status: "Message added" });
});

// GET endpoint to retrieve the next message from the queue
fastify.get("/api/:queue_name", async (request, reply) => {
  const { queue_name } = request.params as { queue_name: string };
  const timeoutMs = parseInt((request.query as any).timeout) || 10000;

  if (!queues[queue_name] || queues[queue_name].length === 0) {
    // Wait for the timeout if the queue is empty
    await new Promise((resolve) => setTimeout(resolve, timeoutMs));
    if (!queues[queue_name] || queues[queue_name].length === 0) {
      return reply.status(204).send();
    }
  }

  // Retrieve the message from the queue
  const message = queues[queue_name].shift();
  reply.status(200).send(message);
});
// GET endpoint to retrieve all queues and the number of messages in each
fastify.get("/api/queues", (request, reply) => {
  const queueSummary = Object.entries(queues).map(([queue_name, messages]) => ({
    queue_name,
    message_count: messages.length,
  }));
  reply.status(200).send(queueSummary);
});

// Start the server
const PORT = 5000;
fastify.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server is running on ${address}`);
});
