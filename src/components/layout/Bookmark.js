import { useContext, useEffect, useState } from 'react';

import ArticlesContext from '../../store/ArticlesProvider';
import { ReactComponent as TagIcon } from '../../assets/bookmark.svg';
import classes from './Bookmark.module.css';
import AuthContext from '../../store/AuthProvider';
import SetBookmark from './SetBookmark';

const Bookmark = ({ article, id }) => {
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
      el.style.fill = 'rgb(251, 255, 0)';
      articlesCtx.addArticles(article);
    } else {
      el.style.fill = 'rgba(255, 255, 255, 0.863)';
      articlesCtx.removeArticles(article);
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
          {articles.findIndex((data) => article.title === data.title) !== -1 &&
            settingColor(id)}
          {/* <SetBookmark /> */}
        </>
      )}
    </>
  );
};

export default Bookmark;
