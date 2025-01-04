import { CloudWatchLogsHandler } from 'aws-lambda';
// import { IncomingWebhook } from '@slack/webhook';

// const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

export const handler: CloudWatchLogsHandler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  return;
};
