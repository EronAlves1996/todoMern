import mongoose from "mongoose";
import app from "./app";
import configuration from "./config";

(async () => {
  await mongoose.connect(configuration.DB_URL);
  console.log("Connected to database");
  app.listen(3001);
  console.log("App listening on 3001");
})();
