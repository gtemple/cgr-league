import Season from "./Season"


interface Props {
  'id': string | undefined
}

const SeasonList = (props: Props) => {
  const { id } = props;

  return (
    <div>
      <Season key={1} id={1} userId={id} />
      <Season key={2} id={2} userId={id} />


    </div>
  )
}

export default SeasonList