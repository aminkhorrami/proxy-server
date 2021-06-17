// https://datatracker.ietf.org/doc/html/rfc7231#section-4.3.6
module.exports = {
  ProxyServer: () => {
    const net = require("net");
    // import net from "net";
    //Creates a new TCP or IPC server.
    const server = net.createServer();

    server.on("connection", (clientToProxySocket) => {
      console.log("Client Connected To Proxy");
      // We need only the data once, the starting packet
      clientToProxySocket.once("data", (data) => {
        // If you want to see the packet uncomment below
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
        }

        console.log(serverAddress);

        // https://nodejs.org/api/net.html#net_net_createconnection
        // A factory function, which creates a new net.Socket, immediately initiates connection with socket.connect()

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

            clientToProxySocket.pipe(proxyToServerSocket);
            proxyToServerSocket.pipe(clientToProxySocket);

            proxyToServerSocket.on("error", (err) => {
              console.log("PROXY TO SERVER ERROR");
              console.log(err);
            });
          }
        );
        clientToProxySocket.on("error", (err) => {
          console.log("CLIENT TO PROXY ERROR");
          console.log(err);
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
};
