// Configure the plugin after adding it to the Analytics module
import { Amplify } from 'aws-amplify';

Amplify.configure({
  ...Amplify.getConfig(),
  Analytics: {
    Kinesis: {
      // REQUIRED -  Amazon Kinesis service region
      region: 'us-east-1',

      // OPTIONAL - The buffer size for events in number of items.
      bufferSize: 1000,

      // OPTIONAL - The number of events to be deleted from the buffer when flushed.
      flushSize: 100,

      // OPTIONAL - The interval in milliseconds to perform a buffer check and flush if necessary.
      flushInterval: 5000, // 5s

      // OPTIONAL - The limit for failed recording retries.
      resendLimit: 5
    }
  }
});