const http = require("http");

const PostRequest = (body) => {
  console.log("\n Socket Detail", body);
  const data = JSON.stringify(body);
  const options = {
    host: "127.0.0.1",
    port: 5000,
    path: "/api/v1/users/record",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };

  const req = http.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
};

exports.PostRequest = PostRequest;
