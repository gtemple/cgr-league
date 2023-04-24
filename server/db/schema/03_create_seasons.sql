-- schema/03_create_seasons.sql
DROP TABLE IF EXISTS seasons CASCADE;
-- CREATE TEAMS
CREATE TABLE seasons (
  id SERIAL PRIMARY KEY,
  game VARCHAR(255) NOT NULL
);