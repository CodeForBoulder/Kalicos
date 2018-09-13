# Kalicos Rest API Server

This is the rest API for the Kalicos project. This contains all the endpoints for interacting with the Kalicos db as well as serving up the client (as of right now the client is not currently configured to run on this server).

Read our [documentation](./apiReference.md) for the rest API.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To run this project locally you must have Node, npm, and MongoDB installed on your machine. 

### Installing and Running Locally

```
cd server
npm install
cp config/config.example.json config/config.json
npm start
```

This project does require a google maps api key. You can get the api key [here](https://developers.google.com/maps/documentation/geocoding/)

### scripts
| Scripts              | Use                                           |
|----------------------|-----------------------------------------------|
| `npm start`          | start server locally                          |
| `npm run dev`        | start persistent server locally using nodemon |
| `npm test`           | run mocha test suite                          |
| `npm run test:watch` | run persistent mocha test suite               |
| `npm run lint`       | run eslint across server files                |
| `npm run lint:fix`   | fixes lint errors across files automatically  |

## Testing
to run test suite, run one of the test commands listed in the table above. 

To add unit tests for future functions, the `tests` folder has been set up to mimic server directory. This means if you create a controller file and need to write tests for that controller, the tests should be in `tests/controller/someController.test.js.`

## Deployment

more to come here eventually but the projects is not currently deployed for production.

## Built With

* [Express](http://expressjs.com/) - Server Library
* [MongoDB](https://www.mongodb.com/) - Database
* [React](https://facebook.github.io/react/) - Front End Framework
* [Mongoose](http://mongoosejs.com/) - MongoDB ODM
