-- schema/04_create_teams.sql
DROP TABLE IF EXISTS teams CASCADE;
-- CREATE TEAMS
CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  team_name VARCHAR(255) NOT NULL,
  team_img TEXT
);