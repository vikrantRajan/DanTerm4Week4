/* global fetch */

const https = require('https');
const http = require('http');
require('isomorphic-fetch');
const { WebClient } = require('@slack/web-api');
const Twit = require('twit');

const { calculatePercent } = require('./js/assessment');
const course = require('../course.json');
const credentials = require('../credentials.json');
const { print } = require('./js/utils.teacher');

const flickrJpgPaths = response => response.photos.photo
  .map(photo => `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`);
exports.flickrJpgPaths = flickrJpgPaths;

// keyword is a new variable, when undefined set to blank.
// keyword is in an object with a parent property query
const autocompleteHandler = ({ query: { keyword = '' } }) => {
  // keyword is either blank or a string value
  const DELAY = 1500; // 1.5 sec
  const places = [];

  places.push('Afghanistan');
  places.push('Albania');
  places.push('Algeria');
  places.push('American Samoa');
  places.push('Antarctica');
  places.push('Argentina');
  places.push('Armenia');
  places.push('Aruba');
  places.push('Australia');
  places.push('Austria');
  places.push('Bahamas');
  places.push('Bangladesh');
  places.push('Barbados');
  places.push('Belarus');
  places.push('Belgium');
  places.push('Belize');
  places.push('Bermuda');
  places.push('Bolivia');
  places.push('Brazil');
  places.push('Bulgaria');
  places.push('Cambodia');
  places.push('Cameroon');
  places.push('Canada');
  places.push('Cayman Islands');
  places.push('Chad');
  places.push('Chile');
  places.push('China');
  places.push('Colombia');
  places.push('Congo');
  places.push('Cook Islands');
  places.push('Costa Rica');
  places.push('Côte d\'Ivoire');
  places.push('Croatia');
  places.push('Cuba');
  places.push('Cyprus');
  places.push('Czechia');

  const items = places.filter(place => place.toLowerCase().includes(keyword.toLowerCase()));

  if (items.length === 0) {
    items.push('No matches found');
  }

  // I promise to return the value when setTimeout resolves with the answer
  return new Promise(resolve => setTimeout(resolve, DELAY, { items }));
};

// Node.js rule, exports must in the root. Not inside a function or closure
exports.autocompleteHandler = autocompleteHandler;

const buildSlackMessage = (studentKey) => {
  const student = course.assessment.students[studentKey];
  const homeworkMark = student.homework;
  const { latestNote } = student;
  const additionalNote = (latestNote) ? `Additional notes: ${latestNote}` : '';

  const message = `Hello ${studentKey}
Class ${course.assessment.classNumber} - Homework mark update ${JSON.stringify(homeworkMark)}
Your homework allocation is ${calculatePercent(homeworkMark)}%
Documentation https://github.com/VanArts/course-files/tree/master/public/social-apis#assessment
${additionalNote}`;

  return message;
};

const sendSlackDirectMessage = slack => async ({ studentName }) => {
  const student = course.assessment.students[studentName];
  const message = buildSlackMessage(studentName);
  const { error } = await slack.chat.postMessage({
    text: message,
    channel: student.slackUserId,
  });

  if (error) {
    return {
      error,
      message: `Slack Direct Message failed to ${studentName}`,
    };
  }

  return { message: `Slack Direct Message sent to ${studentName}:\n${message}` };
};

exports.plugin = {
  name: 'api',
  version: '1.3.0',
  register: (server) => {
    server.route({
      method: 'GET',
      path: '/api/twitter',
      handler: () => {
        const twitter = new Twit({
          consumer_key: credentials.twitter.consumer_key,
          consumer_secret: credentials.twitter.consumer_secret,
          access_token: credentials.twitter.access_token,
          access_token_secret: credentials.twitter.access_token_secret,
          timeout_ms: 60 * 1000,
          strictSSL: true,
        });

        //
        //  search twitter for all tweets containing the word 'banana' since July 11, 2011
        //
        twitter.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, (err, data) => {
          console.log(data);
        });

        return { in_progress: true };
      },
    });

    server.route({
      method: 'GET',
      path: '/api/flickr',
      handler: () => new Promise((resolve) => {
        const flickrServiceUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${credentials.flickr.api_key}&format=json&nojsoncallback=1&lat=49.282763&lon=-123.115529&radius=1`;

        fetch(flickrServiceUrl)
          .then(response => response.json())
          .then((json) => {
            const photos = flickrJpgPaths(json);

            resolve(photos); // output to user agent (browser)
          });
      }),
    });

    server.route({
      method: 'GET',
      path: '/api/autocomplete',
      handler: autocompleteHandler,
    });

    server.route({
      method: 'GET',
      path: '/api/rss',
      // handler: ({ query: { url } }, reply) => new Promise((resolve) => {
      handler: (request, reply) => new Promise((resolve) => {
        const url = request.query.url || 'https://www.cbc.ca/cmlink/rss-canada';
        const isSSL = (url.substring(0, 5) === 'https');
        const httpRequest = (isSSL) ? https : http;

        print(`Getting ${url} via ${isSSL ? 'https' : 'http'}`);

        httpRequest.get(url, (response) => {
          let body = '';

          if (response.statusCode === 200) {
            // Continuously update stream with data
            response.on('data', (data) => {
              body += data;
            });
            response.on('end', () => {
              resolve(reply.response(body).type('application/xml'));
            });
          } else {
            resolve(reply.response(`Service call failed with HTTP status code: ${response.statusCode}`));
          }
        }).on('error', (e) => {
          resolve(reply.response(`Service call failed due to error: ${e.message}`));
        });
      }),
    });

    server.route({
      method: 'GET',
      path: '/api/slow-fruit',
      handler: () => {
        const DELAY = 2 * 1000; // 2 sec
        const OUT = {
          apple: 'green',
          banana: 'gold',
          cherry: 'red',
          durian: 'blue',
          eggplant: 'purple',
          'fuji-apple': 'lightgreen',
          grape: 'magenta',
        };

        return new Promise(resolve => setTimeout(resolve, DELAY, OUT));
      },
    });

    server.route({
      method: 'GET',
      path: '/api/fruit',
      handler: (request, reply) => {
        // Browser web address http://localhost:3000/api/fruit?format=json
        // output blank, xml, json
        console.log(request.query.format); // eslint-disable-line no-console
        // PHP is echo($_GET['format']) // outputs blank, xml, json

        if (request.query.format === 'xml') {
          return reply
            .response('<fruits><fruit name="apple">green</fruit><fruit name="banana">yellow</fruit><fruit name="cherry">red</fruit></fruits>')
            .type('application/xml');
        }

        return {
          apple: 'green',
          banana: 'yellow',
          cherry: 'red',
        };
      },
    });

    server.route({
      method: 'GET',
      path: '/api/teacheraid/web',
      handler: (request, reply) => new Promise(async (resolve) => {
        const slack = new WebClient(credentials.slack.access_token_secret);
        const sendDM = await sendSlackDirectMessage(slack);

        const studentNames = Object.keys(course.assessment.students);
        const messages = await Promise.all(
          studentNames.map(async studentName => sendDM({ studentName })),
        );
        resolve(reply.response(messages));
      }),
    });

    // Choose Web API
    // https://medium.com/slack-developer-blog/getting-started-with-slacks-apis-f930c73fc889

    // Auth token
    // https://github.com/slackapi/node-slack-sdk/blob/master/docs/_main/getting_started.md#getting-a-token-to-use-the-web-api

    // Scope for bot sending message
    // https://api.slack.com/scopes/chat:write:bot

    // Web API
    // https://www.npmjs.com/package/@slack/web-api

    // method for sending message from bot to user
    // https://api.slack.com/methods/chat.postMessage
  },
};
