const http = require("http");
const ListenerPlugin = {
  listen(app) {
    const server = http.createServer(app);
    server.listen(7000, () => {
      console.log(`\n server running on port ${7000}`);
    });
  },
};

module.exports = { ListenerPlugin };
