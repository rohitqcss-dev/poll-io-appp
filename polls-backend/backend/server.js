import express from "express"
import "dotenv/config"
import { connectDb } from "./config/database.js"
import { pollRouter } from "./router/router.js"
import cors from "cors"

const app = express()

connectDb()
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE', 
  credentials: true,               
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions)); 
app.use(express.json())
app.use("/poll", pollRouter)

app.listen(8000, () => {
  console.log("Server started on port 8000")
})