import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";


import axios from "axios";
const supabase = createClient(import.meta.env.VITE_DB_URL, import.meta.env.VITE_DB_KEY);


export default function useGetUserRaces(id: string | undefined) {
  const [userData, setUserData] = useState<[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)

  
  useEffect(()=> {
    getUser(id)
  }, [loaded])

  async function getUser(userId: number) {
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
        created_at,
        users (id, human, first_name, last_name, country_of_representation, initials, profile_image),
        seasons (game, id),
        tracks (name, distance)
      `)
    .eq('user_id', userId)
    if (error) {
      console.error(error);
      return null;
    }
  
    console.log('new data:', data)
    setLoaded(true)
    setUserData(data)
  }




  // useEffect(() => {
  //   axios
  //     .get(`/api/users/${id}`)
  //     .then((res) => {

  //       setUserData(res.data.user)
  //       setLoaded(true)
  //     })
  // }, [loaded])

  return {
    userData
  }
}