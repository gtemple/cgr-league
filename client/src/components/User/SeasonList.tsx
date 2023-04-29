import Season from "./Season"


interface Props {
  'id': string | undefined
}

const SeasonList = (props: Props) => {
  const { id } = props;


  const printSeasons = () => {
    let season = 3;
  
    while (season > 0) {
      season--
      return (
        <div>
          <Season key={season} id={season} userId={id} />
        </div>
      )
    }
  }






  return (
    <div>
      {printSeasons()}
    </div>
  )
}

export default SeasonList