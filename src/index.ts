import { CloudWatchLogsHandler, CloudWatchLogsEvent } from 'aws-lambda';
// import { IncomingWebhook } from '@slack/webhook';

// const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

export const handler: CloudWatchLogsHandler = async (
  event: CloudWatchLogsEvent
) => {
  const payload = Buffer.from(event.awslogs.data, 'base64').toString('utf8');

  console.log('Received event:', JSON.stringify(payload, null, 2));

  return;
};
