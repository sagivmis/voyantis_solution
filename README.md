# Voynatis solution

to install:

1. open the folder in terminal
2. run the following commands:
3. `npm install`
4. `cd voynatis_back`
5. `npm i`
6. `npm run dev`
7. then use your preferred platform to send requests to the server and fill the queues as pleased.

`POST /api/{queue_name}`  
The body is the message in JSON format.
This will place a new message in the queue named queue_name.

`GET /api/{queue_name}?timeout={ms}`  
Gets the next message from queue_name.
Will return 204 if there’s no message in the queue after the timeout has elapsed.
If a timeout is not specified, a default of 10 seconds should be used.

\*\*\*\* you can also use those commands in a powershell:

    1. Invoke-WebRequest -Uri "http://localhost:5000/api/<NAME OF QUEUE HERE>" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"text": "<YOUR MESSAGE HERE>"}'
    2. Invoke-WebRequest -Uri "http://localhost:5000/api/myqueue?timeout=5000" -Method GET

3. run commands:
   1. `cd ..`
   2. `npm run dev`
4. go to https://localhost:5173/ to see the application
