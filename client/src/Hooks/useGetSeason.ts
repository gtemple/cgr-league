import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_DB_URL, import.meta.env.VITE_DB_KEY);

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
    getSeasonData(id);
  }, []);

  async function getSeasonData(seasonId: number | string | undefined) {
    const { data, error } = await supabase
      .from('race_results')
      .select(`
        dotd,
        id,
        dnf,
        fastest_lap,
        race_distance,
        sprint,
        position,
        race_order,
        created_at,
        users (id, human, first_name, last_name, country_of_representation, initials, profile_image),
        seasons (id),
        teams (team_name),
        tracks (name, distance, layout, img)
      `)
    .eq('season_id', seasonId)
    if (error) {
      console.error(error);
      return null;
    }

    //@ts-expect-error
  
    setSeasonData(data)
    setLoaded(true)
  }


  return {
    seasonData,
  };
}
