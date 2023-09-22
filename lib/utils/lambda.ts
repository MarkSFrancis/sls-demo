import { Runtime, Tracing, Architecture } from 'aws-cdk-lib/aws-lambda';
import {
  NodejsFunction,
  NodejsFunctionProps,
} from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { getCdkEnv } from './env';

export const lambda = (
  scope: Construct,
  id: string,
  options: Partial<NodejsFunctionProps>
) =>
  new NodejsFunction(scope, id, {
    runtime: Runtime.NODEJS_18_X,
    memorySize: 256,
    handler: 'handler',
    bundling: {
      minify: true,
    },
    tracing: Tracing.ACTIVE,
    architecture: Architecture.ARM_64,
    environment: {
      SLSDEMO_AWS_ACCOUNT_NAME: getCdkEnv().name,
      ...(options.environment ?? {}),
    },
    ...options,
  });
