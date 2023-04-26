import { useState, useEffect } from 'react'
import axios from 'axios'
import totalSeasonScore from '../../helpers/sumSeasonPoints'



const CurrentSeason = () => {
  const [data, setData] = useState<boolean>(false)
  const [seasonInfo, setSeasonInfo] = useState<ObjectType>({})

  const results = (results:ObjectType) => {
    console.log(results)
    const totalInfo = totalSeasonScore(seasonInfo)
    const totalInfoKeys = Object.keys(totalInfo)
    console.log(totalInfoKeys)
        return totalInfoKeys.map((objKey:string) => {
          return (<li key={objKey}>
                    {totalInfo[objKey].first_name} {totalInfo[objKey].last_name} {totalInfo[objKey].totalPoints}
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
  data && totalSeasonScore(seasonInfo)

  return (
    <div>
    <ul>
      {data && results(seasonInfo)}
    </ul>
    </div>
  )
}

export default CurrentSeason