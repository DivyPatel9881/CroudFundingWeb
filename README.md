# Crowd Funding Webapp with Neurelo and MongoDB

## Inspiration
- Usually, the owners of the CrowdFunding infrastructure take away a significant share of the funds received by the campaigns in the name of "supporting the services" and "covering deployment and maintenance costs"
- This Webpage application enables society to raise and fund campaigns without needing to have a middleman/broker to channel the funds to campaign owners
- Created two clones of the same application one using Neurelo's Javascript SDK which connects to Neurelo's Database Abstraction layer for Database needs and other, a more traditional way, by using Mongoose as an ORM to connect to MongoDB. This is to help compare and contrast among the two alternatives

## What it does
- Institutions or NGO representatives can create and run campaigns for their noble cause in order to raise funds to support their rationale
- The platform can leverage the massive user base of the Ethereum network to be able to broadcast the campaigns to the users and being able to raise funds
- It minimizes fund-raising fees(which is a significant share) levied by intermediate platform owners

## How to spin-up the server based on Neurelo
```
# Spin-up daemonized development server, to enable making code changes and reflect updates to the Frontend/Server in the live
$ npm install
$ npm install -g nodemon
$ cd Neurelo-app
$ npm run start-dev
# Spin-up production server
$ cd Neurelo-app
$ npm run start
```

## How to spin-up the server based on Mongoose
```
# Spin-up daemonized development server, to enable making code changes and reflect updates to the Frontend/Server in the live
$ npm install
$ cd Mongoose-app
$ npm run start-dev
# Spin-up production server
$ cd Mongoose-app
$ npm run start
```

## Code organization and its description
- `Neurelo-app/`: Root-level directory for all the files associated with the application based on Neurelo's SDK
- `Neurelo-app/app.js`: Entry-point file for the Neurelo-based application
- `Neurelo-app/controller`: Directory which constitutes all the controller logic associated with creating projects, commenting on a project, fetch projects by category, fetching information about a specific project, pledging money to a particular project, etc.
- `Neurelo-app/controller/lib`: Static JS libraries for frontend
- `Neurelo-app/controller/*.js`: Files associated with the controller logic
- `Neurelo-app/view`: Directory which constitutes all the files associated with the styling, templates, and assets associated with the webpage
- `Neurelo-app/view/ejs`: Embedded Javascript templating files
- `Neurelo-app/view/css`: CSS files
- `Neurelo-app/view/assets`: Assets associated with the webpages
- `Mongoose-app/`: Root-level directory for all the files associated with the application based on Neurelo's SDK
- `Mongoose-app/app.js`: Entry-point file for the Mongoose-based application
- `Mongoose-app/model`: Directory associated with the models of the MongoDB collections which user should abide to for semantic purposes while using mongoose


## How is it built
- MVC(Model-View-Controller) framework was being adopted to develop the backend and frontend for the Webpage
- Tech stack includes `Node.js(Primary Language)`, `Express.js(REST API framework)`, `Passport.js(Authentication)`, `MongoDB(Primary Database)`, `Neurelo(Database Abstraction layer)`, `Mongoose(ORM as an experimental alternative to Neurelo)`, `EJS(Templating library for frontend)`
