import { useState, useEffect } from 'react';

import axios from "axios";

export default function getSeasons() {
  const [seasonData, setSeasonData] = useState<array>([])
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    axios
      .get('/api/seasons')
      .then((res) => {
        setSeasonData(res.data.seasons)
        setLoaded(true)
        console.log(res.data.seasons)
      })
  }, [loaded])

  return {
    seasonData
  }
}