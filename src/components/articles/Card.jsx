import 'react-loading-skeleton/dist/skeleton.css';

import Bookmark from './Bookmark';
import LazyImage from './LazyImage';
import classes from './Card.module.css';

const Card = ({ article, source = '' }) => {
  return (
    <>
      <Bookmark article={article} source={source} />
      <a href={article.url} target='_blank' rel='noopener noreferrer'>
        <LazyImage article={article} />
        <div className={classes.text}>
          <h3>{article.title}</h3>
          {article.source && article.source.name && (
            <p className={classes.source}>{article.source.name}</p>
          )}
          <p>{article.description}</p>
        </div>
      </a>
    </>
  );
};

export default Card;
