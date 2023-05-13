import { useState, useEffect } from 'react';

import axios from "axios";

export default function useGetTracks() {
  //@ts-expect-error
  const [tracksData, setTracksData] = useState<array>([])
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {

    axios
      .get('/api/tracks')
      .then((res) => {
        console.log('track-data', res.data.tracks)
        setTracksData(res.data.tracks)
        setLoaded(true)
      })
  }, [loaded])

  return {
    tracksData
  }
}