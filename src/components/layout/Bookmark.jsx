import { useContext, useEffect } from 'react';

import ArticlesContext from '../../store/ArticlesProvider';
import { ReactComponent as TagIcon } from '../../assets/bookmark.svg';
import classes from './Bookmark.module.css';
import AuthContext from '../../store/AuthProvider';

const BOOKMARK_ARTICLES_NUM = 20;

const Bookmark = ({ article, id, source = '' }) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const articlesCtx = useContext(ArticlesContext);
  const { articles } = articlesCtx;

  useEffect(() => {
    if (source === 'mypage') {
      const el = document.getElementById('tag--' + id);
      if (el !== null) el.style.fill = 'rgb(251, 255, 0)';
    } else if (articles.findIndex((data) => article.url === data.url) !== -1) {
      const el = document.getElementById('tag--' + id);
      if (el !== null) el.style.fill = 'rgb(251, 255, 0)';
    }
  }, [source]);

  const clickHandler = (article, id) => {
    const el = document.getElementById('tag--' + id);
    if (getComputedStyle(el).fill !== 'rgb(251, 255, 0)') {
      if (articles.length !== BOOKMARK_ARTICLES_NUM) {
        articlesCtx.addArticles(article);
        setTimeout(() => {
          el.style.fill = 'rgb(251, 255, 0)';
        }, 200);
      } else {
        alert('Sorry, bookmark is limited to 20 articles.');
      }
    } else {
      if (source === 'mypage') {
        if (
          window.confirm(
            'If you remove Bookmark, it will be removed from the list. Is everything ok?'
          )
        ) {
          articlesCtx.removeArticles(article);
        }
      } else {
        articlesCtx.removeArticles(article);
        setTimeout(() => {
          el.style.fill = 'rgba(255, 255, 255, 0.863)';
        }, 200);
      }
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
          {/* {articles.findIndex((data) => article.url === data.url) !== -1 &&
            settingColor(id)} */}
          {/* <SetBookmark /> */}
        </>
      )}
    </>
  );
};

export default Bookmark;
