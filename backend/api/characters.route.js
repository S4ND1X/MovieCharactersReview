import express from "express";
import CharactersCtrl from "./characters.controller.js"

//use Express Router
const router = express.Router();

//Add new route with their respective controller
router.route("/").get(CharactersCtrl.apiGetCharacters);

export default router;
