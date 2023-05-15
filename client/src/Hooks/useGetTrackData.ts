import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(import.meta.env.VITE_DB_URL, import.meta.env.VITE_DB_KEY);

interface TrackData {
  created_at: string;
  dnf: boolean;
  dotd: boolean;
  fastest_lap: boolean;
  id: number;
  position: number;
  race_distance: number;
  race_order: number;
  seasons: { id: number; game: string } | { id: number; game: string }[] | null;  pole_position: boolean | undefined;
  sprint: boolean;
  teams: { team_name: string };
  tracks: { distance: number; img: null | string | undefined; layout: null | string | undefined; name: string };
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

    //@ts-expect-error
    setTrackData(data)
    setLoaded(true)
  }


  return {
    trackData,
  };
}
