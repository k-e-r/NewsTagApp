const firebaseDomain = process.env['REACT_APP_FIREBASE_DOMAIN'];

export const getSingleArticle = async (attrData) => {
  const response = await fetch(`${firebaseDomain}/categories/${attrData}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch categories.');
  }

  const transformedArticles = [];

  for (const key in data) {
    const articleObj = {
      id: key,
      ...data[key],
    };

    transformedArticles.push(articleObj);
  }

  return transformedArticles;
};

export const addArticle = async (articleData, attrData) => {
  console.log('attrData:', attrData);
  const response = await fetch(
    `${firebaseDomain}/categories/${attrData}.json`,
    {
      method: 'POST',
      body: JSON.stringify(articleData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create categories.');
  }

  return null;
};

export const putArticle = async (articleData, attrData, articleId) => {
  const response = await fetch(
    `${firebaseDomain}/categories/${attrData}/${articleId}.json`,
    {
      method: 'PUT',
      body: JSON.stringify(articleData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not rewrite categories.');
  }

  return null;
};

/**
 *
 */
export const getNews = async (country = 'us', category = 'general') => {
  const apiKey = process.env['REACT_APP_KEY'];
  const endpoint = process.env['REACT_APP_ENDPOINT'];

  const response = await fetch(
    `${endpoint}?country=${country}&category=${category}&apiKey=${apiKey}`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch articles.');
  }

  return data.articles;
};

/**
 *
 */
const firebaseAuthDomain = process.env['REACT_APP_AUTH_FIREBASE_DOMAIN'];
export async function getSingleUser(usrId) {
  console.log('getSingleUser', usrId);
  const response = await fetch(`${firebaseDomain}/users/${usrId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch users.');
  }

  const transformedArticles = [];

  for (const key in data) {
    const articleObj = {
      id: key,
      ...data[key],
    };

    transformedArticles.push(articleObj);
  }

  return transformedArticles;
}

export async function addUserBook(bookData, usrId) {
  console.log('usrId:', usrId, 'bookData', bookData);
  const response = await fetch(`${firebaseDomain}/users/${usrId}.json`, {
    method: 'POST',
    body: JSON.stringify(bookData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create favorite.');
  }

  return null;
}

export const putUserBook = async (bookData, usrId, registerId) => {
  const response = await fetch(
    `${firebaseDomain}/users/${usrId}/${registerId}.json`,
    {
      method: 'PUT',
      body: JSON.stringify({
        data: usrId,
        articles: bookData,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not rewrite categories.');
  }

  return null;
};
