const config  = require('../../config');

const NewsApi = require('newsapi');
const newsApi = new NewsApi(config.newsApiKey);

module.exports = newsApi;