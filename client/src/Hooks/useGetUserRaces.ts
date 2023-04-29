import { useState, useEffect } from 'react';

import axios from "axios";

export default function useGetUserRaces(id: string | undefined) {
  const [userData, setUserData] = useState<[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    axios
      .get(`/api/users/${id}`)
      .then((res) => {

        setUserData(res.data.user)
        setLoaded(true)
      })
  }, [loaded])

  return {
    userData
  }
}