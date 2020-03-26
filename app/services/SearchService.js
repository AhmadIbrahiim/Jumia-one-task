const fetch = require("node-fetch");
const config = require("./../../config/config");
const parser = require("xml2json");

module.exports = class SearchService {
  constructor(configs) {
    this.configs = configs || config;
  }

  search(params) {
    return new Promise((resolve, reject) => {
      let filterFilds = `&search[field]=${params.search}`;
      delete params.search;

      // falten query params into query string.
      var queryString = new URLSearchParams(params).toString();
      let requestUrl =
        config.goodreads.base_url +
        config.goodreads.search_resource +
        queryString +
        filterFilds +
        "&per_page=10&key=" +
        config.goodreads.API_KEY;
      fetch(requestUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.text())
        .then(xml => {
          let json = JSON.parse(parser.toJson(xml));
          return resolve(json.GoodreadsResponse.search);
        })
        .catch(e => {
          return reject(e);
        });
    });
  }
};
