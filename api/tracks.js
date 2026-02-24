import express from "express";
const router = express.Router();
export default router;

import { getTracks, getTrackByID } from "#db/queries";

router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    return res.status(400).send("ID must be a positive integer.");
  }

  const track = await getTrackByID(id);
  if (!track) {
    return res.status(404).send("Track not found.");
  }
  res.send(track);
});
