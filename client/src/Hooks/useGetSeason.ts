import { useState, useEffect } from 'react';

import axios from "axios";

export default function useGetSeason(id: integer) {
  const [seasonData, setSeasonData] = useState<array>([])
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    axios
      .get(`/api/seasons/${id}`)
      .then((res) => {
        setSeasonData(res.data.seasonResults)
        setLoaded(true)
      })
  }, [loaded])

  return {
    seasonData,
  }
} 