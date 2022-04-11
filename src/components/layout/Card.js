import { useEffect, useState } from 'react';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import Loading from '../function/Loading';
import Bookmark from './Bookmark';
import notImage from '../../assets/image-not-found-scaled.jpg';
import classes from './Card.module.css';

// Loadする記事の数
const ARTICLES_LENGTH = 20;
let setImage = Array(ARTICLES_LENGTH).fill(false);
let i = 0;

const Card = ({ articles, source = '' }) => {
  const [imageState, setImageState] = useState(0);

  useEffect(() => {
    // reset
    if (imageState === articles.length) {
      setImage = Array(ARTICLES_LENGTH).fill(false);
      i = 0;
    }
  }, [imageState, articles.length]);

  // Skeleton無効化
  const imageLoadedHandler = (idx) => {
    // console.log('idxOK', idx);
    // 既にcompleteで処理済の場合はスキップ
    if (!setImage[idx]) {
      let j = i++;
      setImage[idx] = true;
      setImageState(j);
    }
  };

  const imageErrorHandler = (url, idx) => {
    // console.log('idxNG', idx);
    document.getElementById('img--' + url).src = `${notImage}`;
    let j = i++;
    setImage[idx] = true;
    setImageState(j);
  };

  useEffect(() => {
    for (let x = 0; x < articles.length; x++) {
      if (document.getElementById('img--' + articles[x].url) !== null) {
        if (document.getElementById('img--' + articles[x].url).complete) {
          // onLoadされてないかつ、画像読み込み済
          if (!setImage[x]) {
            let j = i++;
            setImage[x] = true;
            setImageState(j);
          }
        }
      }
    }
  }, [articles]);

  return (
    <>
      <ul className={classes.articles}>
        {articles &&
          articles.map((article, idx) => (
            <li className={classes.article} key={article.title}>
              <Bookmark article={article} source={source} id={article.url} />
              <a href={article.url} target='_blank' rel='noopener noreferrer'>
                <div className={classes.imageContainer}>
                  {article.image ? (
                    <>
                      {!setImage[idx] && <Skeleton height={420} width={1000} />}
                      {!setImage[idx] && source !== 'mypage' && (
                        <Skeleton height={420} width={1000} />
                      )}
                      <img
                        onLoad={() => imageLoadedHandler(idx)}
                        onError={() => imageErrorHandler(article.url, idx)}
                        id={`img--${article.url}`}
                        src={article.image}
                        alt={article.title}
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
                  {article.source && article.source.name && (
                    <p className={classes.source}>{article.source.name}</p>
                  )}
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
