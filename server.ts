import express, { Express } from "express";
// const { PrismaClient } = require('@prisma/client');
// const bodyParser = require('body-parser');
import bodyParser from "body-parser";
import { userRouter } from "./Route/userRoute";

const app: Express = express();
// const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/user',userRouter)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
