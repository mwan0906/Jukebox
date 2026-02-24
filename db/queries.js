import db from "#db/client";

export async function getTracks() {
  const sql = `
  SELECT *
  FROM tracks
  ;`;
  const { rows: tracks } = await db.query(sql);
  return tracks;
}

export async function getTrackByID(id) {
  const sql = `
  SELECT *
  FROM tracks
  WHERE id = $1
  ;`;
  const {
    rows: [track],
  } = await db.query(sql, [id]);
  return track;
}

export async function getPlaylists() {
  const sql = `
  SELECT *
  FROM playlists
  ;`;
  const { rows: tracks } = await db.query(sql);
  return tracks;
}

export async function createPlaylist(name, description) {
  const text = `
  INSERT INTO playlists(name, description)
  VALUES($1, $2)
  RETURNING *
  ;`;
  const values = [name, description];
  const {
    rows: [playlist],
  } = await db.query({ text, values });
  return playlist;
}

export async function getPlaylistByID(id) {
  const sql = `
  SELECT *
  FROM playlists
  WHERE id = $1
  ;`;
  const {
    rows: [playlist],
  } = await db.query(sql, [id]);
  return playlist;
}

export async function getPlaylistTracks(id) {
  const sql = `
  SELECT tracks.*
  FROM tracks
  JOIN playlists_tracks ON tracks.id = playlists_tracks.track_id
  WHERE playlists_tracks.playlist_id = $1
  ;`;
  const { rows: tracks } = await db.query(sql, [id]);
  return tracks;
}

export async function addTrackToPlaylist(playlist_id, track_id) {
  const sql = `
  INSERT INTO playlists_tracks(playlist_id, track_id)
  VALUES($1, $2)
  RETURNING playlists_tracks.*
  ;`;
  const {
    rows: [track],
  } = await db.query(sql, [playlist_id, track_id]);
  return track;
}
