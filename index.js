const async = require('async');
const request = require('request');

const baseURL = 'http://demo0737567.mockable.io';
let array = ['/weather-report', '/weather-report', '/weather-report', '/weather-report'];
const urls = array.map(function(value) {
  return baseURL + value;
});

function httpGet(url, callback) {
  const options = {
    url: url,
    json: true
  };
  request(options, function(err, res) {
    callback(err, res);
  });
}

async.map(urls, httpGet, function(err, res) {
  if (err) return console.log(err);
  let response;
  response = res.map(function (data, index) {
    return {
      'index': index,
      'data': data.body,
      'status': data.statusCode
    };
  });
  console.log(response);
});
