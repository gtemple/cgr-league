import { useState, useEffect } from 'react'
import axios from 'axios'
import useSeasonStandings from '../Hooks/useSeasonStandings'



const CurrentSeason = () => {
  const [data, setData] = useState<boolean>(false)
  const [seasonInfo, setSeasonInfo] = useState<ObjectType>({})

  // const Results:React.FunctionComponent = (results:ObjectType) => {
  //   results.map((result:ObjectType) => {
  //     <h1>{result.first_name}</h1>
  //   })

  // }

  const Results:React.FunctionComponent = () => {
      return (<h1>heyrr</h1>)
  }


  useEffect(() => {
    axios
      .get('/api/seasons/1')
      .then(res => {
        setSeasonInfo(res.data.seasonResults)
        setData(true)
        console.log(seasonInfo)
      }) 
  }, [data])

  return (
    <div>
      {data && <Results />}
    </div>
  )
}

export default CurrentSeason