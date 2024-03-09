import express from "express";
import bodyParser from "body-parser";
import { router as movie } from "./api/movie";
import { router as addmovie } from "./api/addMovie";
import { router as addperson } from "./api/addPerson";

export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use("/movie", movie);
app.use("/addmovie", addmovie);
app.use("/addperson", addperson);