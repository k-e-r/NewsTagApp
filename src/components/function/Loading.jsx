import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import classes from '../layout/Card.module.css';

const Loading = () => {
  // for loading window
  let loading = [];
  for (let i = 0; i < 20; i++) {
    loading.push(
      <li className={classes.article} key={i}>
        <a href='/'>
          <div className={classes.imageContainer}>
            <Skeleton height={420} width={1000} />
          </div>
          <div className={classes.text}>
            <h3>
              <Skeleton />
            </h3>
            <p className={classes.source}>
              <Skeleton />
            </p>
            <p>
              <Skeleton count={3} />
            </p>
          </div>
        </a>
      </li>
    );
  }

  return <>{loading}</>;
};

export default Loading;
