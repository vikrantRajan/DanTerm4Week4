const { IncomingWebhook } = require('@slack/webhook');

const { calculatePercent } = require('./js/assessment');
const course = require('../course.json');
const credentials = require('../credentials.json');

exports.plugin = {
  name: 'api',
  version: '1.3.0',
  register: (server) => {
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

    // Choose Web API
    // https://medium.com/slack-developer-blog/getting-started-with-slacks-apis-f930c73fc889

    // Auth token
    // https://github.com/slackapi/node-slack-sdk/blob/master/docs/_main/getting_started.md#getting-a-token-to-use-the-web-api

    // Scope for bot sending message
    // https://api.slack.com/scopes/chat:write:bot
  },
};
