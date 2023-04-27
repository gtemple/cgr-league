import { useState, useEffect } from 'react';

import axios from "axios";

interface Bio {
  first_name?: string,
  last_name?: string,
  initials?: string,
  profile_image?: string
}

export default function useGetUserRaces(id: string | undefined) {
  const [userData, setUserData] = useState<[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)
  const [bio, setBio] = useState<Bio>({})

  useEffect(() => {
    axios
      .get(`/api/users/${id}`)
      .then((res) => {
        console.log(res.data.user)
        const first_name = res.data.user[0].first_name
        const last_name = res.data.user[0].last_name
        const initials = res.data.user[0].initials
        const profile_image = res.data.user[0].profile_image

        setBio({
          first_name,
          last_name,
          initials,
          profile_image
        })
        setUserData(res.data.user)
        setLoaded(true)
      })
  }, [loaded])

  return {
    userData,
    bio
  }
}