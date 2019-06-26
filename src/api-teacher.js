const https = require('https');
const http = require('http');
const { IncomingWebhook } = require('@slack/webhook');
const { WebClient } = require('@slack/web-api');

const { calculatePercent } = require('./js/assessment');
const course = require('../course.json');
const credentials = require('../credentials.json');
const { print } = require('./js/utils.teacher');

exports.plugin = {
  name: 'api',
  version: '1.3.0',
  register: (server) => {
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

    const buildMessage = (studentKey) => {
      const student = course.assessment.students[studentKey];
      const homeworkMark = student.homework;
      const { latestNote } = student;
      const additionalNote = (latestNote) ? `Additional notes: ${latestNote}` : '';

      const message = `Copy to ${studentKey}
Class ${course.assessment.classNumber} - Homework mark update ${JSON.stringify(homeworkMark)}
Your homework allocation is ${calculatePercent(homeworkMark)}%
Documentation https://github.com/VanArts/course-files/tree/master/public/jQuery#assessment
${additionalNote}`;

      return message;
    };

    const sendSlackMessage = async ({ student, webhook }) => {
      // Send simple text to the webhook channel
      const { error } = await webhook.send(buildMessage(student));

      if (error) {
        return { error };
      }

      return { message: `Message sent to ${student} see play channel in Slack` };
    };

    server.route({
      method: 'GET',
      path: '/api/teacheraid/play',
      handler: async (request) => {
        const webhookUrl = credentials.slack.webhook;
        const webhook = new IncomingWebhook(webhookUrl);

        const { student: studentRaw } = request.query;

        if (studentRaw) {
          return sendSlackMessage({
            student: studentRaw,
            webhook,
          });
        }

        const studentNames = Object.keys(course.assessment.students);
        return Promise.all(studentNames.map(async student => sendSlackMessage({
          student,
          webhook,
        })));
      },
    });

    const sendSlackDirectMessage = slack => async ({ studentName }) => {
      const student = course.assessment.students[studentName];
      const { error } = await slack.chat.postMessage({
        text: `Hello ${studentName}!`,
        channel: student.slackUserId,
      });

      if (error) {
        return {
          error,
          message: `Slack Direct Message failed to ${studentName}`,
        };
      }

      return { message: `Slack Direct Message sent to ${studentName}` };
    };

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
