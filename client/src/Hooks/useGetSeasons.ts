import { useState, useEffect } from 'react';
import axios from 'axios';

interface Season {
  id: number;
  game: string;
}

interface SeasonsResponse {
  seasons: Season[];
}

export default function useGetSeasons() {
  const [seasonData, setSeasonData] = useState<Season[]>([]); // Specify the type as Season[]
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    axios.get('/api/seasons').then((res) => {
      const responseData: SeasonsResponse = res.data; // Define the response data type
      console.log('here', responseData.seasons);
      setSeasonData(responseData.seasons);
      setLoaded(true);
    });
  }, [loaded]);

  return {
    seasonData,
    loaded,
  };
}