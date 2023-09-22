import { AddRoutesOptions, HttpApi } from '@aws-cdk/aws-apigatewayv2-alpha';
import { Construct } from 'constructs';
import { NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { lambda } from '../utils/lambda';
import {
  HttpLambdaIntegration,
  HttpLambdaIntegrationProps,
} from '@aws-cdk/aws-apigatewayv2-integrations-alpha';

/**
 * A HTTP API backed with lambdas
 */
export class ApiConstruct extends Construct {
  public readonly httpApi: HttpApi;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.httpApi = new HttpApi(this, `${id}-api`);
  }

  addFn(
    id: string,
    props: NodejsFunctionProps & {
      integration?: HttpLambdaIntegrationProps;
      route: Omit<AddRoutesOptions, 'integration'>;
    }
  ) {
    const newLambda = lambda(this, `${id}-fn`, props);

    const integration = new HttpLambdaIntegration(
      `${id}-integration`,
      newLambda,
      props.integration
    );

    this.httpApi.addRoutes({ integration, ...props.route });

    return newLambda;
  }
}
