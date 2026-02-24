import express from "express";
const router = express.Router();
export default router;

import {
  getPlaylists,
  getPlaylistByID,
  getPlaylistTracks,
  createPlaylist,
  addTrackToPlaylist,
  getTrackByID,
} from "#db/queries";

router.get("/", async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});

router.post("/", async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Body is not provided.");
  }
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).send("Required field missing.");
  }
  const playlist = await createPlaylist(name, description);
  res.status(201).send(playlist);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    return res.status(400).send("ID must be a positive integer.");
  }

  const playlist = await getPlaylistByID(id);
  if (!playlist) {
    return res.status(404).send("Playlist not found.");
  }
  res.send(playlist);
});

router.get("/:id/tracks", async (req, res) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    return res.status(400).send("ID must be a positive integer.");
  }

  const playlist = await getPlaylistByID(id);
  if (!playlist) {
    return res.status(404).send("Playlist not found.");
  }

  const tracks = await getPlaylistTracks(id);
  res.send(tracks);
});

router.post("/:id/tracks", async (req, res) => {
  const { id: playlistId } = req.params;
  if (!/^\d+$/.test(playlistId)) {
    return res.status(400).send("Playlist ID must be a positive integer.");
  }

  if (!req.body) {
    return res.status(400).send("Body is not provided.");
  }
  const { trackId } = req.body;
  if (!trackId || !/^\d+$/.test(trackId)) {
    return res.status(400).send("Track Id must be a positive integer.");
  }

  const playlist = await getPlaylistByID(playlistId);
  if (!playlist) {
    return res.status(404).send("Playlist not found.");
  }
  const track = await getTrackByID(trackId);
  if (!track) {
    return res.status(400).send("Track not found.");
  }
  const tracks = await getPlaylistTracks(playlistId);
  if (tracks.filter((tp) => tp.id == trackId).length) {
    return res.status(400).send("Track already in playlist.");
  }

  const newTrack = await addTrackToPlaylist(playlistId, trackId);
  res.status(201).send(newTrack);
});
