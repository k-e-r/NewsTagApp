import { useEffect, useState } from 'react';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import classes from './Articles.module.css';
import notImage from '../../assets/image-not-found-scaled.jpg';

const LazyImage = ({ article }) => {
  const [loading, setLoading] = useState(false);

  // Skeleton無効化
  const imageLoadedHandler = () => {
    if (!loading) setLoading(true);
  };

  const imageErrorHandler = (url) => {
    document.getElementById('img--' + url).src = `${notImage}`;
    if (!loading) setLoading(true);
  };

  useEffect(() => {
    if (document.getElementById('img--' + article.image)?.complete) {
      if (!loading) setLoading(true);
    }
  }, [article]);

  return (
    <>
      <div className={classes.imageContainer}>
        {article.image ? (
          <>
            {!loading && <Skeleton />}
            <img
              width={`${!loading ? '0%' : '100%'}`}
              onLoad={() => imageLoadedHandler(article.image)}
              onError={() => imageErrorHandler(article.image)}
              id={`img--${article.image}`}
              src={article.image}
              alt={article.title}
            />
          </>
        ) : (
          <img src={notImage} alt={article.title} />
        )}
      </div>
    </>
  );
};

export default LazyImage;
