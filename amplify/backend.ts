import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Stream } from "aws-cdk-lib/aws-kinesis";
import { Stack } from "aws-cdk-lib/core";

const backend = defineBackend({
  auth, 
  data,
  // additional resources 
});

// create a new stack for the Kinesis stream
const kinesisStack = backend.createStack("kinesis-stack");

// create a new Kinesis stream with one shard
const kinesisStream = new Stream(kinesisStack, "KinesisStream", {
  streamName: "myKinesisStream",
  shardCount: 1,
});

// create a new policy to allow PutRecords to the Kinesis stream
const kinesisPolicy = new Policy(kinesisStack, "KinesisPolicy", {
  statements: [
    new PolicyStatement({
      actions: ["kinesis:PutRecords"],
      resources: [kinesisStream.streamArn],
    }),
  ],
});

// apply the policy to the authenticated and unauthenticated roles
backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(kinesisPolicy);
backend.auth.resources.unauthenticatedUserIamRole.attachInlinePolicy(kinesisPolicy);