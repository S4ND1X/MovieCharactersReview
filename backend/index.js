import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";

//Load env vars
dotenv.config();

const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

console.log(process.env.PORT);

MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
  poolSize: 50,
  writeConcern: { wtimeout: 2500 },
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
