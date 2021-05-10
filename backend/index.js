import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import CharactersDAO from "./dao/characters.DAO"

//Load env vars
dotenv.config();

//Instantiate MongoDB Client (mongoose is an alternative)
const MongoClient = mongodb.MongoClient;

//Defining in wich port to run
const port = process.env.PORT || 8000;


//Connect our MongoClient with our express app
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

    //Inject MongoDB client to initialize characters collection in DAO
    await CharactersDAO.injectDB(client);

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
