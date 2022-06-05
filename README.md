# Restaurant Booking
This repo is part of a challenge to hiring process. It`s splited in two parts, first the API services and the frontend, reactjs application.

## Setup
This application use docker to run each service container, to start follow the steps below:

1. Clone this repository.
2. Enter in root folder of this repository cloned.
3. Rename the `.env-example` from api-booking to `.env`
4. Update `.env` file with the credentials you have configured on `docker-compose.yml` environment for mongo service. (if you have not updated the docker-compose it run with default credentials)
5. Inside the root directory run `docker-compose up`
6. Go to http://superb.local:3000 and see if the server is alive.

## Running automated tests
1. After stared the docker-compose run `docker exec -it api npm test`