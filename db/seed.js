import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const track_names = [
    "A",
    "AA",
    "A2",
    "BBB",
    "C:",
    "DeDeDe",
    "E",
    "Eff",
    "Gisney",
    "Hhh",
    "I, Robot",
    "Joe, Cotton-Eyed",
    "Killers",
    "La dee da",
    "Moo",
    "No",
    "Opera",
    "Pipapo",
    "Q&I",
    "Rawr",
  ];

  // tracks
  for (let i = 0; i < 20; i++) {
    const text = `
      INSERT INTO tracks(name, duration_ms)
      VALUES($1, $2)
      RETURNING *
    `;
    const values = [track_names[i], Math.floor(Math.random() * 120) + 60];
    await db.query({ text, values });
  }

  // playlists
  for (let i = 0; i < 10; i++) {
    const text = `
      INSERT INTO playlists(name, description)
      VALUES($1, $2)
      RETURNING *
    `;
    const values = ["List " + i, "Description for list " + i];
    await db.query({ text, values });
  }

  for (let i = 0; i < 15; i++) {
    const text = `
      INSERT INTO playlists_tracks(playlist_id, track_id)
      VALUES($1, $2)
      RETURNING *
    `;
    const values = [Math.floor(Math.random() * 10) + 1, i + 1];
    await db.query({ text, values });
  }
}
