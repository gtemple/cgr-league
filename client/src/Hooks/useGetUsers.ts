import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_DB_URL, import.meta.env.VITE_DB_KEY);

type User = {
  id: number;
  first_name: string;
  last_name: string;
  initials: string;
  city_of_birth: string;
  country_of_birth: string;
  country_of_representation: string;
  date_of_birth: string;
  human: boolean;
  profile_image: string;
};

export default function useGetUsers() {
  const [userData, setUserData] = useState<User[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const { data } = await supabase.from("users").select();
    //@ts-expect-error
    setUserData(data);
  }

  return {
    userData
  };
}