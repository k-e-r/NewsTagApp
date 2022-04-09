import React, { useReducer } from 'react';

const ArticlesContext = React.createContext({
  articles: [],
  addArticles: (articles) => {},
  removeArticles: (articles) => {},
});

const articlesReducer = (state, action) => {
  if (action.type === 'ADD') {
    const existingArticleIndex = state.articles.findIndex(
      (article) => article.title === action.articles.title
    );
    console.log('state:', state.articles);
    console.log('action:', action.articles);
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
      (article) => article.title !== action.articles.title
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
    articles: [
      {
        author: 'Robert Snell and Sarah Rahal, The Detroit News',
        content:
          'Grand Rapids — Jurors said Friday they have reached a verdict on some counts in the case against four men accused of plotting to kidnap and hurt Michigan Gov. Gretchen Whitmer but are locked on other… [+3653 chars]',
        description:
          'The partial verdict follows four weeks of testimony in federal court in what is considered the largest domestic terrorism case in recent U.S. history.',
        publishedAt: '2022-04-08T16:18:45Z',
        source: {
          name: 'The Detroit News',
        },
        title:
          'Jurors reach partial verdict in Whitmer kidnap plot case - Detroit News',
        url: 'https://www.detroitnews.com/story/news/local/michigan/2022/04/08/michigan-governor-whitmer-federal-kidnap-conspiracy-trial-verdict/9487618002/',
        urlToImage:
          'https://www.gannett-cdn.com/presto/2022/03/04/PDTN/ed7f930c-66ae-489e-b4aa-751d5c9289ea-Whitmer_defendants_four_pack.jpg?auto=webp&crop=882,496,x58,y0&format=pjpg&width=1200',
      },
      {
        content:
          'The motion picture academy on Friday banned Will Smith from attending the Oscars or any other academy event for 10 years following his slap of Chris Rock at the Academy Awards.\r\nThe move comes after … [+2026 chars]',
        description:
          'The motion picture academy on Friday banned Will Smith from attending the Oscars or any other academy event for 10 years following his slap of Chris Rock at the Academy Awards.',
        publishedAt: '2022-04-08T19:49:40Z',
        source: {
          id: 'cbc-news',
          name: 'CBC News',
        },
        title:
          'Will Smith banned from the Oscars for 10 years over Chris Rock slap - CBC News',
        url: 'https://www.cbc.ca/news/entertainment/will-smith-banned-oscars-slap-chris-rock-1.6413739',
        urlToImage:
          'https://i.cbc.ca/1.6406331.1649446824!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_620/aptopix-94th-academy-awards.jpg',
      },
      {
        author: 'ESPN',
        content:
          "The 2022 MLB season is here! Thursday's Opening Day action didn't disappoint, and Friday kept the party going with clutch performances, mascot antics and more.\r\nThe New York Yankees and Boston Red So… [+33863 chars]",
        description:
          'Baseball is back! Here is your one-stop shop to keep up with the action as your team takes the field.',
        publishedAt: '2022-04-09T03:45:00Z',
        source: {
          name: 'ESPN',
        },
        title:
          'MLB Opening Day 2022 - What we saw, live updates and takeaways as baseball returns - ESPN',
        url: 'https://www.espn.com/mlb/story/_/page/mlbmain_live/mlb-opening-day-2022-saw-live-updates-takeaways-baseball-returns',
        urlToImage:
          'https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2022%2F0409%2Fr997224_1296x729_16%2D9.jpg',
      },
    ],
  });

  const addArticlesHandler = (articles) => {
    dispatchAction({ type: 'ADD', articles: articles });
  };

  const removeArticlesHandler = (articles) => {
    dispatchAction({ type: 'REMOVE', articles: articles });
  };

  const articlesContext = {
    articles: state.articles,
    addArticles: addArticlesHandler,
    removeArticles: removeArticlesHandler,
  };

  return (
    <ArticlesContext.Provider value={articlesContext}>
      {props.children}
    </ArticlesContext.Provider>
  );
};

export default ArticlesContext;
