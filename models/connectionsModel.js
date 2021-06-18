const mongoose = require("mongoose");

const connectionsSchema = new mongoose.Schema({
  connectionDate: {
    type: Date,
  },
  receivedProxyBytes: {
    type: Number,
  },
  WrittenProxyBytes: {
    type: Number,
  },
  proxyPort: {
    type: Number,
  },
  gateWayPort: {
    type: Number,
  },
  requestForAFilteredSite: {
    type: Boolean,
  },
});

const Connection = mongoose.model("Connection", connectionsSchema);

exports.Connection = Connection;
