import { CloudWatchLogsHandler, CloudWatchLogsEvent } from 'aws-lambda';
import * as zlib from 'zlib';
import { IncomingWebhook } from '@slack/webhook';

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

export const handler: CloudWatchLogsHandler = async (
  event: CloudWatchLogsEvent
) => {
  const payload = Buffer.from(event.awslogs.data, 'base64');

  const decompressed = zlib.gunzipSync(payload);

  const logData = JSON.parse(decompressed.toString('utf-8')) as LogData;

  const log = logData.logEvents.map((log) => log.message).join('\n');

  if (!SLACK_WEBHOOK_URL) {
    console.error('SLACK_WEBHOOK_URL is not defined');
    return;
  }

  const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL);

  await webhook.send({
    text: log,
    username: 'CloudWatchLogs',
    icon_emoji: ':cloudwatch:',
  });

  return;
};

type LogData = {
  messageType: string;
  owner: string;
  logGroup: string;
  logStream: string;
  subscriptionFilters: string[];
  logEvents: {
    id: string;
    timestamp: number;
    message: string;
  }[];
};
