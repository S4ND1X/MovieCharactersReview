import express from "express";

import cors from "cors";

import characters from "./api/characters.route.js";

const app = express();

app.use(cors());

//Same as using bodyparser, able to use json in request
app.use(express.json());

//Defining initial api rout
app.use("/api/v1/characters", characters);
//Wildcard for non existing endpoint
app.use("*", (req, res) => res.status(404).json({ error: "Route not found" }));

export default app;
