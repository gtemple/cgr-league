import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(import.meta.env.VITE_DB_URL, import.meta.env.VITE_DB_KEY);

interface TrackData {
  user_id: number;
  human: boolean;
  first_name: string;
  last_name: string;
  initials: string;
  profile_image: string;
  id: number;
  dnf: boolean;
  fastest_lap: boolean;
  sprint: boolean;
  position: number;
  dotd: boolean;
  race_order: number;
  pole_position: null | string;
  created_at: string;
  team_name: string;
  name: string;
  game: string;
  season_id: number;
}

export default function useGetTrack(id: string | undefined) {
  const [trackData, setTrackData] = useState<TrackData[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    getTrackData(id);
  }, [loaded]);

  async function getTrackData(trackId: number | string | undefined) {
    const { data, error } = await supabase
      .from('race_results')
      .select(`
        dotd,
        id,
        dnf,
        fastest_lap,
        race_distance,
        pole_position,
        sprint,
        position,
        race_order,
        created_at,
        users (id, human, first_name, last_name, country_of_representation, initials, profile_image),
        seasons (id, game),
        teams (team_name),
        tracks (name, distance, layout, img)
      `)
    .eq('track_id', trackId)
    if (error) {
      console.error(error);
      return null;
    }

  
    setTrackData(data)
    setLoaded(true)
  }


  return {
    trackData,
  };
}
