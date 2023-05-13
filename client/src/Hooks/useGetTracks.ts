import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_DB_URL, import.meta.env.VITE_DB_KEY);

export default function useGetTracks() {
  //@ts-expect-error
  const [tracksData, setTracksData] = useState<array>([])
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    getTracks();
  }, []);

  async function getTracks() {
    const { data } = await supabase.from("tracks").select();

    setTracksData(data);
    setLoaded(true)
  }

  return {
    tracksData
  }
}