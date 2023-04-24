// db/queries/seasons.js

const db = require('../../configs/db.config');

const getSeasonResults = (id) => {
	return db.query(`
  SELECT u.id, u.first_name, u.last_name, u.initials, u.profile_image, r.dnf, r.fastest_lap, r.sprint, r.position, r.created_at, t.team_name, tr.name
  FROM race_results r
  INNER JOIN users u ON r.user_id = u.id
  INNER JOIN tracks tr ON r.track_id = tr.id
  INNER JOIN seasons s ON r.season_id = s.id
  INNER JOIN teams t ON t.user_id = u.id AND t.season_id = s.id
  WHERE s.id = $1
  GROUP BY r.id, u.id, t.id, tr.id
`, [id]).then(data => {
		return data.rows;
	})
}


module.exports = {getSeasonResults}