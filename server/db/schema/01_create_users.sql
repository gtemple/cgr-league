-- schema/01_create_users.sql
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  initials VARCHAR(255) NOT NULL,
  city_of_birth VARCHAR(255) NOT NULL,
  country_of_birth VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  human BOOLEAN NOT NULL,
  profile_image TEXT
);