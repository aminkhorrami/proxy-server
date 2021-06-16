const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const express = require("express");
const { DataBase, MongoAuth, MongoUser } = require("./envVariables.js");
const ProxyModule = require("./proxyServer.js");
// const router = require("./routes/userRoute.js");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT_EXCEPTION!   Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// Create Express Server
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Dashboard Port
const PORT = 5000;

// Logging
app.use(morgan("dev"));

const dashboardServer = () => {
  const instanceOfServer = app.listen(PORT, () => {
    // app.use("/api/v1/users", router);
    // app.get("/dashboard", (req, res) => {
    //   res.send("FUCK OFF!");
    // });

    app.get("*", (req, res, next) => {
      res.sendFile(path.join(__dirname + "/client/build/index.html"));
    });

    console.log(`Dashboard Server Running on ${PORT} ...!!!`);
  });
  instanceOfServer.on("close", () => {
    mongoose.connection.close();
    console.log("server shutting down");
  });
  return instanceOfServer;
};

// for being ensure everything is captured first we connect the mongo DB
// then our proxy!

const dbConnection = () => {
  ProxyModule.ProxyServer();
  console.log("DATA BASE", DataBase);
  // return mongoose
  //   .connect(DB, {
  //     auth: {
  //       user: MongoUser,
  //       password: MongoAuth,
  //     },
  //     useNewUrlParser: true,
  //     useCreateIndex: true,
  //     useFindAndModify: false,
  //     useUnifiedTopology: true,
  //     poolSize: 10,
  //   })
  //   .then(() => {
  //     console.log("DB connection successful!");
  //     dashboardServer();
  //   })
  //   .catch((e) => {
  //     console.error(
  //       "Failed to connect to mongo on startup - retrying in 5 sec",
  //       e
  //     );
  //     mongoose.connection.close();
  //     dashboardServer().close();
  //     setTimeout(dbConnection, 5000);
  //   });
};

mongoose.connection.on("close", () => {
  console.log("DB Disconnected Successfully");
});

process.on("SIGINT", () => {
  mongoose.connection.close().then(() => {
    process.exit(1);
  });
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED_REJECTION!   Shutting down...");
  dashboardServer.close(() => {
    process.exit(1);
  });
});

//makeInitialDir();

dbConnection();
