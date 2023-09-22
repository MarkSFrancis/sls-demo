import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { HttpMethod } from '@aws-cdk/aws-apigatewayv2-alpha';
import { AWS_REGION } from '../src/utils/constants';
import {
  AwsIntegration,
  Method,
  PassthroughBehavior,
  Resource,
  RestApi,
} from 'aws-cdk-lib/aws-apigateway';
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';

export class SlsDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new RestApi(this, 'api');

    new cdk.CfnOutput(this, 'api-url', {
      value: api.url,
    });

    const db = new Table(this, 'db', {
      partitionKey: {
        name: 'pk',
        type: AttributeType.STRING,
      },
      sortKey: {
        name: 'sk',
        type: AttributeType.STRING,
      },
    });

    const todoResource = new Resource(this, 'api-todo', {
      parent: api.root,
      pathPart: 'todo',
    });

    const apiCreateTodoRole = new Role(this, 'write-to-db', {
      assumedBy: new ServicePrincipal('apigateway.amazonaws.com'),
    });
    db.grantWriteData(apiCreateTodoRole);

    new Method(this, 'api-create-todo-method', {
      httpMethod: HttpMethod.POST,
      resource: todoResource,
      options: {
        methodResponses: [
          {
            statusCode: '200',
          },
        ],
      },
      integration: new AwsIntegration({
        service: 'dynamodb',
        action: 'PutItem',
        region: AWS_REGION,
        integrationHttpMethod: HttpMethod.POST,
        options: {
          credentialsRole: apiCreateTodoRole,
          requestTemplates: {
            'application/json': `{"TableName":"${db.tableName}","Item":{"pk":{"S":"$context.requestId"},"title":{"S":$input.json('$.title')},"sk":{"S":"$context.requestId"}}}`,
          },
          passthroughBehavior: PassthroughBehavior.WHEN_NO_MATCH,
          integrationResponses: [
            {
              statusCode: '200',
              responseTemplates: {
                'application/json': '{}',
              },
            },
          ],
        },
      }),
    });
  }
}
