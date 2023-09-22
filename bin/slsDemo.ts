#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { getCdkEnv } from '../lib/utils/env';
import { AWS_REGION } from '../src/utils/constants';
import { SlsDemoStack } from '../lib/slsDemoStack';

const app = new cdk.App();
const env = getCdkEnv();

new SlsDemoStack(app, `sls-demo-${env.name}-stack`, {
  env: { region: AWS_REGION },
  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
