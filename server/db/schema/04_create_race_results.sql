-- schema/03_create_race_results.sql
DROP TABLE IF EXISTS race_results CASCADE;
-- CREATE RACE RESULTS
CREATE TABLE race_results (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  track_id INTEGER REFERENCES tracks(id) ON DELETE CASCADE,
  team_id INTEGER REFERENCES teams(id) ON DELETE CASCADE,
  position INTEGER,
  dnf BOOLEAN NOT NULL,
  fastest_lap BOOLEAN NOT NULL,
  dotd BOOLEAN NOT NULL,
  season_id INTEGER REFERENCES seasons(id) ON DELETE CASCADE,
  sprint BOOLEAN NOT NULL,
  race_distance INTEGER,
  race_order INTEGER,
  pole_position BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW()
);