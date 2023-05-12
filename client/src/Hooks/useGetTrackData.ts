import { useState, useEffect } from 'react';
import axios from 'axios';

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
    axios.get(`/api/tracks/${id}`).then((res) => {
      setTrackData(res.data.tracks);
      setLoaded(true);
    });
  }, [loaded]);

  return {
    trackData,
  };
}
