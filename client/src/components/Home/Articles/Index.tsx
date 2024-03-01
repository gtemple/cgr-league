import { useState, useEffect } from "react";
import ArticleData from "../../../classes/ArticleData";
import useGetImage from "../../../Hooks/useGetImage";
import "./styles.css";

const Articles = (props: { articleData: ArticleData[] }) => {
  const [firstArticle, setFirstArticle] = useState<ArticleData | null>(null);

  useEffect(() => {
    if (props.articleData.length > 0) {
      setFirstArticle(props.articleData[0]);
    }
  }, [props.articleData]);

  const { img, loading } = useGetImage(
    firstArticle ? firstArticle.header_image : "",
    "article-image" || ""
  );

  return (
    <div className="default-container hero-container">
      <div className="">
        {firstArticle && (
          <>
            <img src={img} className="hero-img" alt="Article Image" />
            <div className='hero-text'>
              <div className="hero-header">{firstArticle.title}</div>
              <div className="hero-sub">{firstArticle.subtitle}</div>
            </div>
          </>
        )}
      </div>
      <div>
        {props.articleData.map((article, index) => {
          // Skip the first article as it's already displayed separately
          if (index === 0) return null;
          return (
            <div className="secondary-article" key={index}>
              <div className="secondary-hero">{article.title}</div>
              <div className="secondary-sub">{article.subtitle}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Articles;
