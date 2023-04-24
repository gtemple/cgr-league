import { useState, useEffect } from 'react'
import axios from 'axios'
import useSeasonStandings from '../../Hooks/useSeasonStandings'



const CurrentSeason = () => {
  const [data, setData] = useState<boolean>(false)
  const [seasonInfo, setSeasonInfo] = useState<ObjectType>({})

  const results = (results:ObjectType) => {
    console.log(results)
        return results.map((result:ObjectType) => {
          return (<li key={result.id}>
                    {result.first_name}
                    {results.points}
                  </li>)
        })
    }


  useEffect(() => {
    axios
      .get('/api/seasons/1')
      .then(res => {
        setSeasonInfo(res.data.seasonResults)
        setData(true)
      }) 

  }, [data])

  return (
    <div>
    <ul>
      {data && results(seasonInfo)}
    </ul>
    </div>
  )
}

export default CurrentSeason