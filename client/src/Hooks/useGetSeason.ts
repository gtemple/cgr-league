import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_DB_URL, import.meta.env.VITE_DB_KEY);

interface SeasonData {
  created_at: string;
  dnf: boolean;
  dotd: boolean;
  fastest_lap: boolean;
  id: number;
  position: number;
  race_distance: number;
  race_order: number;
  seasons: { id: number };
  poll_position: boolean | null;
  sprint: boolean;
  teams: { team_name: string };
  tracks: { distance: number; img: null; layout: null; name: string };
  users: {
    country_of_representation: string;
    first_name: string;
    human: true;
    id: number;
    initials: string;
    last_name: string;
    profile_image: string;
  };
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
        pole_position,
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
