const firebaseDomain = process.env['REACT_APP_FIREBASE_DOMAIN'];

export async function getAllArticles() {
  const response = await fetch(`${firebaseDomain}/categories.json`);
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
}

export async function getSingleArticle(attrData) {
  console.log('attrData(api.js):', attrData);
  const response = await fetch(`${firebaseDomain}/categories/${attrData}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch categories.');
  }

  const transformedArticles = [];
  console.log('api.js:', data);

  for (const key in data) {
    const articleObj = {
      id: key,
      ...data[key],
    };

    transformedArticles.push(articleObj);
  }

  return transformedArticles;
}

export async function addArticle(articleData, attrData) {
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
}

export async function putArticle(articleData, attrData, articleId) {
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
}

export async function getNews(country = 'us', category = 'general') {
  // const request = require('request');
  const apiKey = process.env['REACT_APP_KEY'];
  const endpoint = process.env['REACT_APP_ENDPOINT'];

  const response = await fetch(
    `${endpoint}?country=${country}&category=${category}&apiKey=${apiKey}`
  );
  // const response = await fetch(`tekitou`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch articles.');
  }

  console.log(data);
  return data.articles;
}

//
//
//
//

export async function getSingleUser(usrName) {
  const response = await fetch(`${firebaseDomain}/users/${usrName}.json`);
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

export async function addUserBook(usrName, bookData) {
  console.log('usrName:', usrName);
  const response = await fetch(`${firebaseDomain}/users/${usrName}.json`, {
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

export async function putUserBook(usrName, bookData, usrId) {
  const response = await fetch(
    `${firebaseDomain}/users/${usrName}/${usrId}.json`,
    {
      method: 'PUT',
      body: JSON.stringify(bookData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not rewrite favorite data.');
  }

  return null;
}
