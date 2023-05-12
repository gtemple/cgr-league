import { useState, useEffect } from 'react';
import axios from 'axios';

interface SeasonData {
  user_id: number;
  human: boolean;
  first_name: string;
  last_name: string;
  initials: string;
  profile_image: null;
  id: number;
  dnf: boolean;
  fastest_lap: boolean;
  sprint: boolean;
  position: number;
  dotd: boolean;
  race_order: number;
  created_at: string;
  team_name: string;
  name: string;
  game: string;
  season_id: number;
  pole_position: boolean;
}

export default function useGetSeason(id: number | string | undefined) {
  const [seasonData, setSeasonData] = useState<SeasonData[]>([]); // Provide type annotation and initialize as an empty array
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    axios.get(`/api/seasons/${id}`).then((res) => {
      setSeasonData(res.data.seasonResults);
      setLoaded(true);
    });
  }, [loaded]);

  return {
    seasonData,
  };
}
