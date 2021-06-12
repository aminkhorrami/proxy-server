const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

// Create Express Server
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Configuration
const PORT = 5000;
// const HOST = "localhost";
const API_SERVICE_URL = "https://jsonplaceholder.typicode.com";

// Logging
app.use(morgan("dev"));

app.get("/dashboard", (req, res) => {
  // const count = 5;

  // // Generate some passwords
  // const passwords = Array.from(Array(count).keys()).map((i) =>
  //   generatePassword(12, false)
  // );

  // // Return them as json
  // res.json(passwords);

  // console.log(`Sent ${count} passwords`);
  res.send("FUCK OFF!");
});

// Info GET endpoint
app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// Authorization
app.use("", (req, res, next) => {
  if (req.headers.authorization) {
    next();
  } else {
    res.sendStatus(403);
  }
});

// Proxy endpoints
app.use(
  "/json_placeholder",
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/json_placeholder`]: "",
    },
  })
);

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${proocess.env.PORT || PORT}`);
});

// 'user stritct';

// /* eslint-disable no-console */

// /* eslint-disable import/first */
// import mongoose from 'mongoose';
// import { makeInitialDir } from './utils/makeInitialDir';

// process.on('uncaughtException', err => {
//   console.log('UNCAUGHT_EXCEPTION!   Shutting down...');
//   console.log(err.name, err.message);
//   process.exit(1);
// });

// // IMPORTANT LOCATION
// import app from './app';

// const DB = process.env.DATABASE;

// const port = process.env.PORT || 3000;
// const domain = process.env.domain || '127.0.0.1';

// const server = () => {
//   const instanceOfServer = app.listen(port, () => {
//     console.log(`Server Running on http://${domain}:${port} ...!!!`);
//   });

//   instanceOfServer.on('close', () => {
//     mongoose.connection.close();
//     console.log('server shutting down');
//   });

//   return instanceOfServer;
// };

// const dbConnection = () => {
//   return mongoose
//     .connect(DB, {
//       auth: {
//         user: process.env.MONGO_INITDB_ROOT_USERNAME,
//         password: process.env.MONGO_INITDB_ROOT_PASSWORD
//       },
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//       useUnifiedTopology: true,
//       poolSize: 10
//     })
//     .then(() => {
//       console.log('DB connection successful!');
//       server();
//     })
//     .catch(e => {
//       console.error(
//         'Failed to connect to mongo on startup - retrying in 5 sec',
//         e
//       );
//       mongoose.connection.close();
//       server().close();
//       setTimeout(dbConnection, 5000);
//     });
// };

// mongoose.connection.on('close', () => {
//   console.log('DB Disconnected Successfully');
// });

// process.on('SIGINT', () => {
//   mongoose.connection.close().then(() => {
//     process.exit(1);
//   });
// });

// process.on('unhandledRejection', err => {
//   console.log(err.name, err.message);
//   console.log('UNHANDLED_REJECTION!   Shutting down...');
//   server.close(() => {
//     process.exit(1);
//   });
// });

// makeInitialDir();

// dbConnection();
