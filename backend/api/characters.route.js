import express from "express";

const router = express.Router();

router.route("/").get((req, res) => res.send("Movie Characters Review API"));

export default router;
