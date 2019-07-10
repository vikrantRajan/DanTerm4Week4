/* global describe, it */
const expect = require('expect.js');
const { WebClient } = require('@slack/web-api');

const course = require('../../course.json');
const credentials = require('../../credentials.json');

describe('Slack', () => {
  if (!credentials.slack || !credentials.slack.access_token_secret) return;
  if (course.diagnosisMode !== 'true') return;
  const slack = new WebClient();
  const token = credentials.slack.access_token_secret;

  it('should have an okay token', async () => {
    const actual = await slack.auth.test({ token });
    expect(actual.ok).to.be.ok();
  });

  it('should have scope to post a message from bot to user', async () => {
    // needs permissions for this call https://api.slack.com/methods/chat.postMessage
    // Change scopes with Slack not token, add permission to your app
    // https://api.slack.com/apps
    // Reinstall is needed
    const actual = await slack.auth.test({ token });
    expect(actual.response_metadata.scopes).to.be.ok();
    expect(actual.response_metadata.scopes).to.contain('bot');
    expect(actual.response_metadata.scopes).to.contain('chat:write:bot');
  });
});
