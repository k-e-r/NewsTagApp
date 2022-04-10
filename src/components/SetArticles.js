import { useEffect, useState } from 'react';

import { getNews, getSingleArticle, addArticle, putArticle } from '../lib/api';
import { DataCheck } from '../lib/date-check';
import Card from './layout/Card';

const SetArticles = ({ category, country }) => {
  const [attrData, setAttrData] = useState('');
  const [loadedArticles, setLoadedArticles] = useState([]);
  const [error, setError] = useState('');
  const [registerDB, setRegisterDB] = useState(false);
  const [articlesId, setArticlesId] = useState('');

  // データ受領後、再レンダリングされるため、
  // JSX共有可能
  useEffect(() => {
    // register attrData
    if (attrData !== category + '_' + country) {
      setAttrData(category + '_' + country);
      // country切り替えでリセット
      setLoadedArticles([]);
    }
    // Database try
    if (loadedArticles.length === 0 && attrData !== '') {
      getSingleArticle(attrData)
        .then((data) => {
          // もし日付が古いならData上書き指示
          if (!DataCheck(data[0].date)) {
            // PUT用にデータセット
            setArticlesId(data[0].id);
            setError('overwriting');
          } else {
            setLoadedArticles(data[0].articles);
          }
        })
        .catch((error) => setError('Database Error: ' + error));
    }
  }, [category, country, loadedArticles, attrData]);

  // NewsAPI try
  useEffect(() => {
    // 自己エラー時は無視
    // 上書き
    if (!error.match(/NewsAPI/) && error !== '') {
      console.log('getNews');
      getNews(country, category)
        .then((data) => {
          setLoadedArticles(data);
          // 新規記事をDB登録指示
          setRegisterDB(true);
        })
        .catch((error) => {
          setError('NewsAPI Error: ' + error);
        });
    }
    setError('');
  }, [category, country, error]);

  // DB登録
  useEffect(() => {
    if (registerDB) {
      setRegisterDB('');
      if (articlesId) {
        // PUT
        putArticle(
          {
            date: new Date().toLocaleString('en-US'),
            articles: loadedArticles,
          },
          attrData,
          articlesId
        ).catch((error) => {
          setError('Register DB Error: ' + error);
        });
        setArticlesId('');
      } else {
        // POST
        addArticle(
          {
            date: new Date().toLocaleString('en-US'),
            articles: loadedArticles,
          },
          attrData
        ).catch((error) => {
          setError('Register DB Error: ' + error);
        });
      }
    }
  }, [registerDB, articlesId, loadedArticles, attrData]);

  return (
    <section>
      <Card articles={loadedArticles} />
    </section>
  );
};

export default SetArticles;
