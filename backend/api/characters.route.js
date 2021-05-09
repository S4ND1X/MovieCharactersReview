import express from "express";
import CharactersCtrl from "./characters.controller.js"

const router = express.Router();

router.route("/").get(CharactersCtrl.apiGetCharacters);

export default router;
