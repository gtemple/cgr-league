import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_DB_URL, import.meta.env.VITE_DB_KEY);


interface Teams {
  id: number;
  team_name: string;
  team_img: string | null;
}

export default function useGetTeams() {
  const [teamsData, setTeamsData] = useState<Teams[]>([]); // Specify the type as Season[]
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    getTeams();
  }, []);

  async function getTeams() {
    const { data } = await supabase.from("teams").select();
    //@ts-expect-error
    setTeamsData(data);
    setLoaded(true)
  }

  return {
    teamsData,
    loaded,
  };
}