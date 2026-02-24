import express from "express";
const app = express();
export default app;

app.use(express.json());

import tracksRouter from "./api/tracks.js";
app.use("/tracks", tracksRouter);

import playlistsRouter from "./api/playlists.js";
app.use("/playlists", playlistsRouter);
