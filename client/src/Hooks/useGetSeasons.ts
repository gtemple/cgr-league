import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_DB_URL, import.meta.env.VITE_DB_KEY);


interface Season {
  id: number;
  game: string;
}

export default function useGetSeasons() {
  const [seasonData, setSeasonData] = useState<Season[]>([]); // Specify the type as Season[]
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    getSeasons();
  }, []);

  async function getSeasons() {
    const { data } = await supabase.from("seasons").select();
    //@ts-expect-error
    setSeasonData(data);
    setLoaded(true)
  }

  return {
    seasonData,
    loaded,
  };
}