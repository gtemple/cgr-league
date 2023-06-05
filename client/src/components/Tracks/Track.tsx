import TrackData from "../../classes/TrackData";

interface Props {
  trackData: TrackData[];
}

const Track: React.FC<Props> = ({ trackData }) => {
  const uniqueSeasonIds = Array.from(new Set(trackData.map((data) => data.seasons.id)));

  return (
    <div className='season-results'>
      {uniqueSeasonIds.map((seasonId) => {
        const seasonData = trackData.filter((data) => data.seasons.id === seasonId);
        const users = Array.from(new Set(seasonData.map((data) => data.users)));
        const userPositions = users.map((user) => {
          const userData = seasonData.find((data) => data.users.id === user.id);
          return userData ? { user, position: userData.position } : null;
        });

        // Sort the userPositions array based on the position
        //@ts-expect-error
        userPositions.sort((a, b) => a.position - b.position);

        return (
          <div>
            <h2>Season {seasonId} results</h2>
            <table className="container2 track-season" key={seasonId}>
              <thead>
                <tr>
                  <th></th>
                  <th>Driver</th>
                </tr>
              </thead>
              <tbody>
                {userPositions.map((userPosition) =>
                  userPosition ? (
                    <tr key={userPosition.user.id}>
                      <td>{userPosition.position ? userPosition.position : '-'}</td>
                      <td>
                        {userPosition.user.first_name} {userPosition.user.last_name}
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default Track;