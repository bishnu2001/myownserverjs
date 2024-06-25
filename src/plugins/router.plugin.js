const { readdir } = require("fs");
const path = require("path");
const { configs } = require("../config");

const RouterPlugin = {
  setup(app) {
    // Read the directory asynchronously
    readdir(path.join(__dirname, "../routes"), async (err, files) => {
      if (err) {
        console.error("Error reading routes directory:", err);
        return;
      }

      for (let index = 0; index < files.length; index++) {
        const filename = files[index];
        const route = filename.split(".")[0];

        try {
          // Dynamically import the router module
          const router = require(path.join(__dirname, `../routes/${filename}`));
          // Ensure router.default is used for ES module interop
          app.use(`${configs.API_VERSION}/${route}`, router.default);
          console.log(`http://${configs.HOST}:${configs.PORT}/${configs.API_VERSION}/${route}`);
        } catch (error) {
          console.error(`Error loading route ${route}:`, error);
        }

        if (index === files.length - 1) {
          // Set up a 404 handler if no routes are found
          app.use((req, res) => {
            res.status(404).json("Route not found");
          });
        }
      }
    });
  },
};

module.exports = {
  RouterPlugin
};
