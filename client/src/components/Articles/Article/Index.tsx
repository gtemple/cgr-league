import { useParams } from "react-router-dom";
import useGetArticle from "../../../Hooks/useGetArticle";

const Article = () => {
  const { id } = useParams();

  const { articleData, loaded } = useGetArticle(id);

  return <>{articleData && <div>{articleData.title}</div>}</>;
};

export default Article;
