import Season from "./Season"


interface Props {
  'id': string | undefined
}

const SeasonList = (props: Props) => {
  const { id } = props;

  return (
    <div className='season-list'>
      <Season key={1} id={1} userId={id} />
      <Season key={2} id={2} userId={id} />
      <Season key={3} id={3} userId={id} />
      <Season key={4} id={4} userId={id} />
    </div>
  )
}

export default SeasonList