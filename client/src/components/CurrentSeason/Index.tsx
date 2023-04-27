import { useState, useEffect } from 'react'
import axios from 'axios'
import totalSeasonScore from '../../helpers/sumSeasonPoints'



const CurrentSeason = () => {
  const [data, setData] = useState<boolean>(false)
  const [seasonInfo, setSeasonInfo] = useState<ObjectType>({})
  const [humanStandings, setHumanStandings] = useState<string[]>([])

  const results = (results:ObjectType) => {
    const totalInfo = totalSeasonScore(results)
    const totalInfoArray = []
    
    for (let i in totalInfo) {
      totalInfoArray.push([totalInfo[i].totalPoints, i, [totalInfo[i].first_name, totalInfo[i].last_name].join(' '), totalInfo[i].human])
    }

    const sortedScores = totalInfoArray.sort(function(a:[number, string, string] , b:[number, string, string]) {return a[0] < b[0]})
    let position = 0;

    return sortedScores.map((score) => {
      position++
      if (score[3]) {
        console.log(score[2])
      }

      return ( <li key={score[1]}>
        {position} {score[2]} {score[0]}
      </li>)
    })
  }

  const humanResults = (results:ObjectType) => {
    
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
      {data && humanResults(seasonInfo)}
    </ul>
    </div>
  )
}

export default CurrentSeason