import { useState, useEffect } from 'react';

import axios from "axios";

interface Bio {
  firstName?: string,
  lastName?: string,
  initials?: string,
  profileImage?: string,
  dateOfBirth?: string,
  cityOfBirth?: string,
  countryOfBirth?: string,
  human?: boolean
}

export default function useGetUserBio(id: string | undefined) {
  const [userData, setUserData] = useState<[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)
  const [bio, setBio] = useState<Bio>({})

  useEffect(() => {
    axios
      .get(`/api/users/bio/${id}`)
      .then((res) => {
        const firstName = res.data.user[0].first_name
        const lastName = res.data.user[0].last_name
        const initials = res.data.user[0].initials
        const profileImage = res.data.user[0].profile_image
        const dateOfBirth = res.data.user[0].date_of_birth
        const cityOfBirth = res.data.user[0].city_of_birth
        const countryOfBirth = res.data.user[0].country_of_birth
        const human = res.data.user[0].human

        setBio({
          firstName,
          lastName,
          initials,
          profileImage,
          dateOfBirth,
          cityOfBirth,
          countryOfBirth,
          human
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