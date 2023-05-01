import * as _ from '../../../helpers/sumSeasonPoints'


const StandingsList = (props) => {

  const results = (results:ObjectType) => {
    const totalInfo = _.totalSeasonScore(results)
    const totalInfoArray = []
    
    for (let i in totalInfo) {
      totalInfoArray.push([totalInfo[i].totalPoints, i, [totalInfo[i].first_name, totalInfo[i].last_name].join(' '), totalInfo[i].human])
    }

    const sortedScores = totalInfoArray.sort(function(a:[number, string, string] , b:[number, string, string]) {return a[0] < b[0]})
    let position = 0;

    return sortedScores.map((score) => {
      position++

      return ( <li key={score[1]}>
        {position} {score[2]} {score[0]}
      </li>)
    })
  }

  return (
    <div>
      {props.seasonData && results(props.seasonData)}
      StandingsList</div>
  )
}

export default StandingsList