-- schema/03_create_race_results.sql
DROP TABLE IF EXISTS race_results CASCADE;
-- CREATE RACE RESULTS
CREATE TABLE race_results (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  track_id INTEGER REFERENCES tracks(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  dnf BOOLEAN NOT NULL,
  fastest_lap BOOLEAN NOT NULL,
  season_id INTEGER REFERENCES seasons(id) ON DELETE CASCADE,
  sprint BOOLEAN NOT NULL,
  race_distance INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);