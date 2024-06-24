import { readdir } from "fs";
import path from "path";
import { configs } from "../config";
export const RouterPlugin = {
  setup(app) {
    readdir(path.join(__dirname, "../routes"), (err, files) => {
      files.forEach(async (filename, index) => {
        const route = filename.split(".")[0];
        const router = await import(
          path.join(__dirname,`../routes${filename}`)
        );
        app.use(`${configs.API_VERSION}/${route}`, router.default);
        console.log(
          `http://${configs.HOST}:${configs.PORT}/${configs.API_VERSION}/${route}`
        );
        if (files.length - 1 == index) {
          app.use((req, res) => {
            res.status(404).json("route not found");
          });
        }
      });
    });
  },
};
