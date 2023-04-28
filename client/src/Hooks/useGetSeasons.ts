import { useState, useEffect } from 'react';

import axios from "axios";

export default function useGetSeasons() {
  const [seasonData, setSeasonData] = useState<array>([])
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    axios
      .get('/api/seasons')
      .then((res) => {
        setSeasonData(res.data.seasons)
        setLoaded(true)
      })
  }, [loaded])

  return {
    seasonData,
    loaded
  }
} 