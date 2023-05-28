import Season from "./Season";

interface Props {
  id: string | undefined;
}

const SeasonList = (props: Props) => {
  const { id } = props;
  const count = 6;

  const renderSeasons = () => {
    const seasons = [];
    for (let i = 1; i <= count; i++) {
      seasons.push(
        <Season key={i} id={i} userId={id} />
      );
    }
    return seasons;
  };

  return <div className='season-list'>{renderSeasons()}</div>;
};

export default SeasonList;