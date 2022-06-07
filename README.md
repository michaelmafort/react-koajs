# Restaurant Booking
This repo is part of a challenge to hiring process. It`s splited in two parts, first the API services and the frontend, reactjs application.

## Setup
This application use docker to run each service container, to start follow the steps below:

1. Clone this repository.
2. Enter in root folder of this repository cloned.
3. Rename the `.env-example` from api-booking to `.env`
4. Update `.env` file with the credentials you have configured on `docker-compose.yml` environment for mongo service. (if you have not updated the docker-compose it run with default credentials)
5. Inside the root directory run `docker-compose up`
6. Go to http://localhost:3000 and see if the `API` server is alive.
7. Go to http://localhost:3001 and see if the react `frontend` running.

## Running automated tests
1. Stared the docker-compose services. 
2. Testing API `docker exec -it api npm test`
3. Testing Front `docker exec -it front npm test`

## Functional test using Postman

Configure the request to send a `POST` method to http://localhost:3000/restaurant/629969290ea3b264f4032297/booking/add and send the content below (`JSON format`) in the body.
```
{
"arrivalAt": "2022-07-01T18:00:00",
"name": "Guest Name",
"email": "guest@email.com",
"phone": "(11) 99999-9999",
"people": "8"
}
```