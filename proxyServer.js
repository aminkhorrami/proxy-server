// https://datatracker.ietf.org/doc/html/rfc7231#section-4.3.6

module.exports = {
  ProxyServer: function () {
    const net = require("net");
    const { PostRequest } = require("./PostRequest.js");

    //Creates a new TCP or IPC server.
    const server = net.createServer();

    server.on("connection", (clientToProxySocket) => {
      console.log(
        "Client Connected To Proxy",
        clientToProxySocket.getMaxListeners()
      );

      // We need only the data once, the starting packet
      clientToProxySocket.once("data", (data) => {
        console.log(data.toString());
        let isTLSConnection = data.toString().indexOf("CONNECT") !== -1;
        // on the web By Default port is 80
        let serverPort = 80;
        let serverAddress;
        if (isTLSConnection) {
          // Port changed if connection is TLS
          serverPort = data
            .toString()
            .split("CONNECT ")[1]
            .split(" ")[0]
            .split(":")[1];
          serverAddress = data
            .toString()
            .split("CONNECT ")[1]
            .split(" ")[0]
            .split(":")[0];
        } else {
          // without certificate
          serverAddress = data.toString().split("Host: ")[1].split("\r\n")[0];
          console.log("shiiit", serverAddress);
        }
        console.log("host", serverAddress);
        // https://nodejs.org/api/net.html#net_net_createconnection
        // A factory function, which creates a new net.Socket, immediately initiates connection with socket.connect()
        // Following is a SocketClient of the Target server
        let proxyToServerSocket = net.createConnection(
          {
            host: serverAddress,
            port: serverPort,
          },
          () => {
            // the connected callBack is actually here!
            console.log("PROXY TO SERVER SET UP");
            if (isTLSConnection) {
              clientToProxySocket.write("HTTP/1.1 200 OK\r\n\n");
            } else {
              proxyToServerSocket.write(data);
            }

            // Sockets are derived from the streams so they can be piped.
            // readableSrc**.pipe( **writableDest** )

            // if the serverAddress is in ProxyFilteredList
            // you can not access them!

            if (this.isThisURLFiltered(serverAddress)) {
              // proxyToServerSocket.end();
              // proxyToServerSocket.write();

              //The pipe() function reads data from a readable stream as
              //it becomes available and writes it to a destination writable stream.

              clientToProxySocket.pipe(proxyToServerSocket);
              proxyToServerSocket.pipe(clientToProxySocket);
              console.log(
                "clientToProxySocket:",
                clientToProxySocket.bytesWritten,
                clientToProxySocket.bytesWritten,
                clientToProxySocket.address(),
                "\n proxyToServerSocket",
                proxyToServerSocket.bytesRead,
                proxyToServerSocket.bytesWritten,
                proxyToServerSocket.address()
              );
            } else {
              clientToProxySocket.pipe(proxyToServerSocket);
              proxyToServerSocket.pipe(clientToProxySocket);
            }

            // make a record on MONGODB

            const recordConnection = {
              connectionDate: new Date(),
              //The amount of received bytes.
              receivedProxyBytes: clientToProxySocket.bytesRead,
              //The amount of bytes sent.
              WrittenProxyBytes: clientToProxySocket.bytesWritten,
              proxyPort: clientToProxySocket.address().port,
              gateWayPort: proxyToServerSocket.address().port,
              requestForAFilteredSite: this.isThisURLFiltered(serverAddress),
            };

            PostRequest(recordConnection);

            proxyToServerSocket.on("error", (err) => {
              console.log("Proxy TO SERVER ERROR");
              console.log(err);
            });
            proxyToServerSocket.on("close", () => {
              console.log(`Proxy TO Server ${serverAddress} Hanged Up!`);
              console.log();
            });
          }
        );
        clientToProxySocket.on("error", (err) => {
          console.log("Client TO PROXY ERROR");
          console.log(err);
        });
        clientToProxySocket.on("close", () => {
          console.log(`Client TO PROXY Socket Hanged Up! ${serverAddress}`);
        });
      });
    });

    server.on("error", (err) => {
      console.log("SERVER ERROR");
      console.log(err);
      throw err;
    });

    server.on("close", () => {
      console.log("Client Disconnected");
    });

    server.listen(8124, () => {
      console.log(
        "%c%s",
        "color: green;",
        "Proxy Server runnig at http://localhost:" + 8124 + "\n"
      );
    });
  },
  isThisURLFiltered: function (url) {
    for (let i of this.filteredURLs)
      if (i === url) return true;
      else return false;
  },
  filteredURLs: ["namnak.com", "isna.ir"],
};
