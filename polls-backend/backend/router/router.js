import { Router } from "express";
import { createPoll, getActivepolls, getAllPolls, getExpiredPolls, votePoll } from "../controllers/controllers.js";

 export const pollRouter=Router()

pollRouter.post("/createpoll",createPoll)
pollRouter.get("/getpolls",getAllPolls)
pollRouter.post("/votepoll/:id",votePoll)
pollRouter.post("/getActivepolls",getActivepolls)
pollRouter.post("/getExpiredPolls",getExpiredPolls)