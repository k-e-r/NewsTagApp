import { useEffect, useState } from 'react';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import Loading from '../Loading';
import Bookmark from './Bookmark';
import notImage from '../../assets/image-not-found-scaled.jpg';
import classes from './Card.module.css';

// Loadする記事の数
const ARTICLES_LENGTH = 20;
let setImage = Array(ARTICLES_LENGTH).fill(false);
let i = 0;

const Card = ({ articles }) => {
  const [imageState, setImageState] = useState(0);
  // const check = articles.filter((data) => data.urlToImage !== undefined);

  console.log('Card');

  useEffect(() => {
    // reset
    if (imageState === articles.length) {
      setImage = Array(ARTICLES_LENGTH).fill(false);
      i = 0;
    }
  }, [imageState, articles.length]);

  // Skeleton無効化
  const imageLoadedHandler = (idx) => {
    i = i + 1;
    setImage[idx] = true;
    setImageState(i);
  };

  const imageErrorHandler = (url, idx) => {
    document.getElementById('img--' + url).src = `${notImage}`;

    setImage[idx] = true;
  };

  return (
    <>
      <ul className={classes.articles}>
        {articles &&
          articles.map((article, idx) => (
            <li className={classes.article} key={article.title}>
              <Bookmark article={article} id={article.url} />
              <a href={article.url}>
                <div className={classes.imageContainer}>
                  {article.urlToImage ? (
                    <>
                      {!setImage[idx] && <Skeleton height={420} width={1000} />}
                      <img
                        id={`img--${article.url}`}
                        src={article.urlToImage}
                        alt={article.title}
                        onLoad={() => imageLoadedHandler(idx)}
                        onError={() => imageErrorHandler(article.url, idx)}
                      />
                    </>
                  ) : (
                    <img
                      src={notImage}
                      alt={article.title}
                      onLoad={() => imageLoadedHandler(idx)}
                    />
                  )}
                </div>
                <div className={classes.text}>
                  <h3>{article.title}</h3>
                  <p className={classes.source}>{article.source.name}</p>
                  <p>{article.description}</p>
                </div>
              </a>
            </li>
          ))}
        {!articles.length && <Loading />}
      </ul>
    </>
  );
};

export default Card;
