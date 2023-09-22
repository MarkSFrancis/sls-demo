import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { getCdkEnv } from './utils/env';

export class SlsDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const env = getCdkEnv();
  }
}
