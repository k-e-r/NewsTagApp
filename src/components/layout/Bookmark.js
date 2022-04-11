import { useContext } from 'react';

import ArticlesContext from '../../store/ArticlesProvider';
import { ReactComponent as TagIcon } from '../../assets/bookmark.svg';
import classes from './Bookmark.module.css';
import AuthContext from '../../store/AuthProvider';

const Bookmark = ({ article, id, source = '' }) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const articlesCtx = useContext(ArticlesContext);
  const { articles } = articlesCtx;

  const settingColor = (id) => {
    const el = document.getElementById('tag--' + id);
    if (el !== null) el.style.fill = 'rgb(251, 255, 0)';
  };

  const clickHandler = (article, id) => {
    const el = document.getElementById('tag--' + id);
    if (getComputedStyle(el).fill !== 'rgb(251, 255, 0)') {
      articlesCtx.addArticles(article);
      setTimeout(() => {
        el.style.fill = 'rgb(251, 255, 0)';
      }, 500);
    } else {
      articlesCtx.removeArticles(article);
      setTimeout(() => {
        el.style.fill = 'rgba(255, 255, 255, 0.863)';
      }, 500);
    }
  };

  // useRefでTagと紐付けできるかも。要検証。
  //  -> clickHandlerはOK, settingColorがNG (紐付け)

  return (
    <>
      {isLoggedIn && (
        <>
          <TagIcon
            id={`tag--${article.url}`}
            className={`${classes.tag} tag--${article.url}`}
            onClick={() => clickHandler(article, id)}
          />
          {source === 'mypage' && settingColor(id)}
          {articles.findIndex((data) => article.url === data.url) !== -1 &&
            settingColor(id)}
          {/* <SetBookmark /> */}
        </>
      )}
    </>
  );
};

export default Bookmark;
