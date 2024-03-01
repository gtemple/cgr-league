import StandingsList from "./StandingsList";
import UserList from "./UserList";
import TwitchPopout from "./TwitchPopout";

import "../home.css";
import ConstructorsStandings from "./ConstructorsStandings";

const CurrentSeasonStats = (props: {
  //@ts-expect-error
  seasonData: ObjectType;
  currentSeason: number;
}) => {
  return (
    <div className="default-container">
      <div className="homepage-stats-container">
        <div className="primary-panel">
          <div>
            <div className="current-season-container-title">
              Constructor Standings
            </div>
            <ConstructorsStandings seasonData={props.seasonData} />
          </div>
          <div>
            <div className="current-season-container-title">
              Driver Standings
            </div>
            <StandingsList seasonData={props.seasonData} />
          </div>
        </div>
        <div className="secondary-panel">
          <TwitchPopout />
          <UserList seasonData={props.seasonData} />
        </div>
      </div>
    </div>
  );
};

export default CurrentSeasonStats;
