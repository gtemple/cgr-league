import { useState, useEffect } from 'react';

import axios from "axios";

export default function useGetUsers() {
  const [userData, setUserData] = useState<array>([])
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    axios
      .get('/api/users')
      .then((res) => {
        setUserData(res.data.users)
        setLoaded(true)
      })
  }, [loaded])

  return {
    userData
  }
}