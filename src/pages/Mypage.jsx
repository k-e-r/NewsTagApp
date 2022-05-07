import LoadFavoriteArticles from '../components/articles/LoadFavoriteArticles';

import classes from './Mypage.module.css';

const Mypage = () => {
  return (
    <section className={classes.layout}>
      <LoadFavoriteArticles />
    </section>
  );
};

export default Mypage;
