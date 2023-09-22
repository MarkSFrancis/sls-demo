import { Construct } from 'constructs';
import { NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { EventBus, Rule, RuleProps } from 'aws-cdk-lib/aws-events';
import { IGrantable } from 'aws-cdk-lib/aws-iam';
import { lambda } from '../utils/lambda';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';

export type EventBusFnProps = Partial<NodejsFunctionProps> & {
  eventRule: Omit<RuleProps, 'eventBus'>;
};

/**
 * Creates an opinionated event bus with a message archive
 */
export class EventBusConstruct extends Construct {
  readonly eventBus: EventBus;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.eventBus = new EventBus(this, `${id}-bus`);
  }

  /**
   * Create a lambda, attach it to this event bus, add a DLQ, and add an alarm. Triggers the lambda when a relevant event is put on the bus
   */
  addFn(id: string, lambdaProps: EventBusFnProps) {
    const fnLambda = lambda(this, `${id}-fn`, {
      ...lambdaProps,
      retryAttempts: 2,
    });

    const fnRule = new Rule(this, `${id}-rule`, {
      eventBus: this.eventBus,
      ...lambdaProps.eventRule,
    });

    fnRule.addTarget(
      new LambdaFunction(fnLambda, {
        retryAttempts: 3,
      })
    );

    return fnLambda;
  }

  /**
   * Allow a resource (such as a lambda) to put events onto this bus
   */
  grantPutEvents(grantee: IGrantable) {
    this.eventBus.grantPutEventsTo(grantee);
  }
}
