import { useState } from 'react';
import useAsyncEffect from 'use-async-effect';

import {
  getNews,
  getSingleArticle,
  addArticle,
  putArticle,
} from '../../lib/api';
import { DataCheck } from '../../lib/date-check';
import ArticlesCards from './ArticlesCards';

const LoadArticles = ({ category, country }) => {
  const [attrData, setAttrData] = useState('');
  const [loadedArticles, setLoadedArticles] = useState([]);
  const [error, setError] = useState('');
  const [registerDB, setRegisterDB] = useState(false);
  const [articlesId, setArticlesId] = useState('');

  // データ受領後、再レンダリングされるため、
  // JSX共有可能
  async function loadArticles() {
    // register attrData
    if (attrData !== category + '_' + country) {
      setAttrData(category + '_' + country);
      // category/country切り替えでリセット
      setLoadedArticles([]);
    }
    // Database try
    if (loadedArticles.length === 0 && attrData !== '') {
      const data = await getSingleArticle(attrData);
      // もし日付が古いならData上書き指示
      if (!DataCheck(data[0]?.date)) {
        // PUT用にデータセット
        setArticlesId(data[0]?.id);
        setError('overwriting');
      } else {
        setLoadedArticles(data[0]?.articles);
      }
    }
  }
  useAsyncEffect(loadArticles, [category, country, loadedArticles, attrData]);

  // NewsAPI try
  async function newsApiCall() {
    // 自己エラー時は無視
    // 上書き
    if (!error.match(/NewsAPI/) && error !== '') {
      const data = await getNews(country, category);
      if (data) {
        setLoadedArticles(data);
        // 新規記事をDB登録指示
        setRegisterDB(true);
      }
    }
    setError('');
  }
  useAsyncEffect(newsApiCall, [error]);

  // DB登録
  async function setArticle() {
    if (registerDB) {
      setRegisterDB('');
      if (articlesId) {
        // PUT
        await putArticle(
          {
            date: new Date().toLocaleString('en-US'),
            articles: loadedArticles,
          },
          attrData,
          articlesId
        );
        setArticlesId('');
      } else {
        // POST
        await addArticle(
          {
            date: new Date().toLocaleString('en-US'),
            articles: loadedArticles,
          },
          attrData
        );
      }
    }
  }
  useAsyncEffect(setArticle, [
    registerDB,
    articlesId,
    loadedArticles,
    attrData,
  ]);

  return (
    <>
      <ArticlesCards articles={loadedArticles} />
    </>
  );
};

export default LoadArticles;
