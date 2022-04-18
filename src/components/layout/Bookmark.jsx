import { useContext } from 'react';

import ArticlesContext from '../../store/ArticlesProvider';
import { ReactComponent as TagIcon } from '../../assets/bookmark.svg';
import classes from './Bookmark.module.css';
import AuthContext from '../../store/AuthProvider';

const BOOKMARK_ARTICLES_NUM = 20;

const Bookmark = ({ article, source = '' }) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const articlesCtx = useContext(ArticlesContext);
  const { articles } = articlesCtx;
  let isBookmarked = articles.some((data) => data.url === article.url);

  const clickHandler = (article) => {
    if (articles.some((data) => data.url === article.url)) {  // remove
      if (source === 'mypage') {
        if (
          window.confirm(
            'If you remove Bookmark, it will be removed from the list. Is everything ok?'
          )
        ) {
          articlesCtx.removeArticles(article);
        }
      } else {
        setTimeout(() => {
          articlesCtx.removeArticles(article);
          isBookmarked = false;
        }, 200);
      }
    } else {  // add
      if (articles.length !== BOOKMARK_ARTICLES_NUM) {
        setTimeout(() => {
          articlesCtx.addArticles(article);
          isBookmarked = true;
        }, 200);
      } else {
        alert('Sorry, bookmark is limited to 20 articles.');
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
            style={{fill : isBookmarked ? 'rgb(251, 255, 0)' : 'rgba(255, 255, 255, 0.863)'}}
            className={`${classes.tag} tag--${article.url}`}
            onClick={() => clickHandler(article)}
          />
        </>
      )}
    </>
  );
};

export default Bookmark;
