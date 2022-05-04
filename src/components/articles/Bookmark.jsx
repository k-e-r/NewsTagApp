import { useSelector, useDispatch } from 'react-redux';

import { articlesActions } from '../../store/articles-slice';
import { ReactComponent as TagIcon } from '../../assets/bookmark.svg';
import classes from './Bookmark.module.css';

const BOOKMARK_ARTICLES_NUM = 20;

const Bookmark = ({ article, source = '' }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const articles = useSelector((state) => state.articles.articles);
  let isBookmarked = articles.some((data) => data.url === article.url);
  const dispatch = useDispatch();

  const clickHandler = (article) => {
    if (articles.some((data) => data.url === article.url)) {
      // remove
      if (source === 'mypage') {
        if (
          window.confirm(
            'If you remove Bookmark, it will be removed from the list. Is everything ok?'
          )
        ) {
          dispatch(articlesActions.removeArticles(article));
        }
      } else {
        setTimeout(() => {
          dispatch(articlesActions.removeArticles(article));
          isBookmarked = false;
        }, 200);
      }
    } else {
      // add
      if (articles.length !== BOOKMARK_ARTICLES_NUM) {
        setTimeout(() => {
          dispatch(articlesActions.addArticles(article));
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
            style={{
              fill: isBookmarked
                ? 'rgb(251, 255, 0)'
                : 'rgba(255, 255, 255, 0.863)',
            }}
            className={`${classes.tag} tag--${article.url}`}
            onClick={() => clickHandler(article)}
          />
        </>
      )}
    </>
  );
};

export default Bookmark;
