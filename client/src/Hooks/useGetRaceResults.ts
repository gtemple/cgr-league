import { useState, useEffect } from 'react';

import axios from "axios";

export default function useGetSeason(id: number) {
  const [raceData, setRaceData] = useState([])
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    axios
      .get(`/api/seasons/`)
      .then((res) => {
        setRaceData(res.data.seasonResults)
        setLoaded(true)
      })
  }, [loaded])

  return {
    raceData,
  }
} 