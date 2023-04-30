import { useState, useEffect } from 'react';

import axios from "axios";

export default function useGetTrack(id: string | undefined) {
  const [trackData, setTrackData] = useState<array>([])
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    axios
      .get(`/api/tracks/${id}`)
      .then((res) => {
        setTrackData(res.data.tracks)
        setLoaded(true)
      })
  }, [loaded])

  return {
    trackData
  }
}