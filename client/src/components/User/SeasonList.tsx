import Season from "./Season"


interface Props {
  'id': string | undefined
}

const SeasonList = (props: Props) => {
  //get the season length and then pass that once for each season


  const printSeason = () => {
    let season = 3;
  
    while (season > 0) {
      season--
      return (
      <Season id={season}/>
      )
    }
  }


  <table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
</table> 



  return (
    <div>
      {printSeason()}
    </div>
  )
}

export default SeasonList