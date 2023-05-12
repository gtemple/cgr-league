import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_DB_URL, import.meta.env.VITE_DB_KEY);

interface Bio {
  firstName?: string,
  lastName?: string,
  initials?: string,
  profileImage?: string,
  dateOfBirth?: string,
  cityOfBirth?: string,
  countryOfBirth?: string,
  countryOfRepresentation?: string,
  human?: boolean
}

export default function useGetUserBio(id: string | undefined) {
  const [userData, setUserData] = useState<[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)
  const [bio, setBio] = useState<Bio>({})

  useEffect(() => {
    getUsers(id)
  }, [loaded])

  async function getUsers(userId) {
    const { data } = await supabase.from("users").select().eq('id', userId);
    console.log('bio', data)
    setUserData(data[0]);
    setLoaded(true)
  }

  return {
    userData
  }
}