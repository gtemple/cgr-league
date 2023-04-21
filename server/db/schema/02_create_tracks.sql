-- schema/02_create_tracks.sql
DROP TABLE IF EXISTS tracks CASCADE;
-- CREATE TRACKS
CREATE TABLE tracks (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  city VARCHAR(255),
  country VARCHAR(255),
  distance INTEGER
);