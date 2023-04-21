-- schema/03_create_race_results.sql
DROP TABLE IF EXISTS race_results CASCADE;
-- CREATE RACE RESULTS
CREATE TABLE race_results (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCE users(id) ON DELETE CASCADE,
  tracks_id INTEGER REFERENCE tracks(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  dnf BOOLEAN NOT NULL,
  fastest_lap BOOLEAN NOT NULL,
  season INTEGER NOT NULL,
  race_distance INTEGER
);