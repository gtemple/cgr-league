import * as _ from '../../../helpers/sumSeasonPoints';
import '../home.css'

type ScoreTuple = [number, string, string];

const StandingsList = (props: { seasonData: ObjectType }) => {

  const results = (results:ObjectType) => {
    const totalInfo = _.totalSeasonScore(results)
    const totalInfoArray: ScoreTuple[] = []
    
    for (let i in totalInfo) {
      totalInfoArray.push([totalInfo[i].totalPoints, i, [totalInfo[i].first_name, totalInfo[i].last_name].join(' ')])
    }

    const sortedScores = totalInfoArray.sort((a: ScoreTuple , b: ScoreTuple) => b[0] - a[0])
    let position = 0;

    return sortedScores.map((score) => {
      position++

      return ( 
        <tr className='standings-cell' key={score[1]}>
          <th>{position}</th>
          <th>{score[2]}</th>
          <th>{score[0]}</th>
        </tr>
      )
    })
  }

  return (
    <div>
      <table className='standings'>
        <tbody>
          {props.seasonData && results(props.seasonData)}
        </tbody>
      </table>
    </div>
  )
}

export default StandingsList;