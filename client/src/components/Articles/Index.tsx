import { Link } from 'react-router-dom'
import useGetArticles from "../../Hooks/useGetArticles";
import useGetImage from "../../Hooks/useGetImage";
import moment from "moment";
import ArticleData from "../../classes/ArticleData";
import "./styles.css";

function Articles() {
  const { articlesData, loaded } = useGetArticles();

  return (
    <div className="default-container">
      {articlesData.length > 0 &&
        articlesData.map((article, index) => {
          return <ArticleCard key={index} article={article} />;
        })}
    </div>
  );
}

//@ts-ignore
function ArticleCard({ article }) {
  const { img, loading } = useGetImage(article.header_image, "article-image");

  return (
    <div className="blog-card">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Link to={`/articles/article/${article.id}`} className='no-link-2'>
          <img src={img} alt="Article Image" className='preview-img'/>
          <div className='blog-text'>
            <div className='blog-title'>{article.title}</div>
            <div>{article.subtitle}</div>
            <div className='blog-date'>
              {moment(article.created_at).format("MMMM Do YYYY, h:mm:ss a")}
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}

export default Articles;
