import { createSlice } from '@reduxjs/toolkit';

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
  },
  reducers: {
    addArticles(state, action) {
      const existingArticleIndex = state.articles.findIndex(
        (article) => article.url === action.payload.url
      );

      if (existingArticleIndex === -1) {
        if (state.articles.length !== 0) {
          state.articles = state.articles.concat([action.payload]);
        } else {
          state.articles = [action.payload];
        }
      }
    },
    removeArticles(state, action) {
      state.articles = state.articles.filter(
        (article) => article.url !== action.payload.url
      );
    },
    clearArticles(state) {
      state.articles = [];
    },
  },
});

export const articlesActions = articlesSlice.actions;

export default articlesSlice;
