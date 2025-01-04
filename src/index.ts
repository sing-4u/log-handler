import { CloudWatchLogsHandler, CloudWatchLogsEvent } from 'aws-lambda';
import * as zlib from 'zlib';
// import { IncomingWebhook } from '@slack/webhook';

// const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

export const handler: CloudWatchLogsHandler = async (
  event: CloudWatchLogsEvent
) => {
  const payload = Buffer.from(event.awslogs.data, 'base64').toString('utf8');

  const decompressed = zlib.gunzipSync(payload).toString('utf-8');

  // const logData = JSON.parse(decompressed);

  console.log(decompressed);

  return;
};
