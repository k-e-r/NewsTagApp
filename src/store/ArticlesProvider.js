import React, { useReducer } from 'react';

const ArticlesContext = React.createContext({
  articles: [],
  addArticles: (articles) => {},
  removeArticles: (articles) => {},
});

const articlesReducer = (state, action) => {
  if (action.type === 'ADD') {
    const existingArticleIndex = state.articles.findIndex(
      (article) => article.url === action.articles.url
    );

    if (existingArticleIndex !== -1) {
      return {
        articles: state.articles,
      };
    }
    let updatedArticles;
    if (state.articles.length !== 0) {
      updatedArticles = state.articles.concat([action.articles]);
    } else {
      updatedArticles = [action.articles];
    }

    return {
      articles: updatedArticles,
    };
  }
  if (action.type === 'REMOVE') {
    let updatedArticles;

    updatedArticles = state.articles.filter(
      (article) => article.url !== action.articles.url
    );

    return {
      articles: updatedArticles,
    };
  }

  if (action.type === 'CLEAR') {
    return { articles: [] };
  }

  return { articles: [] };
};

export const ArticlesProvider = (props) => {
  const [state, dispatchAction] = useReducer(articlesReducer, {
    articles: [],
  });

  const addArticlesHandler = (articles) => {
    dispatchAction({ type: 'ADD', articles: articles });
  };

  const removeArticlesHandler = (articles) => {
    dispatchAction({ type: 'REMOVE', articles: articles });
  };

  const clearArticlesHandler = () => {
    dispatchAction({ type: 'CLEAR' });
  };

  const articlesContext = {
    articles: state.articles,
    addArticles: addArticlesHandler,
    removeArticles: removeArticlesHandler,
    clearArticles: clearArticlesHandler,
  };

  return (
    <ArticlesContext.Provider value={articlesContext}>
      {props.children}
    </ArticlesContext.Provider>
  );
};

export default ArticlesContext;
