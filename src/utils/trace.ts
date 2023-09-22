import {
  Subsegment,
  captureAWSv3Client,
  captureAsyncFunc,
  captureFunc,
} from 'aws-xray-sdk';

export const captureAwsClient = captureAWSv3Client;

/**
 * Wrap your function to automatically capture information for the subsegment. Note that (unlike the default implementation from AWS) this implementation automatically closes the subsegment
 * @param name - The name of the new subsegment
 * @param funcToTrace - The function context to wrap. Passed a subsegment to make enriching with extra metadata easier
 * @see https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-nodejs-subsegments.html
 * @see https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-nodejs-segment.html
 */
export const trace = <T>(
  name: string,
  funcToTrace: (subsegment: Subsegment | undefined) => T
) => {
  return captureFunc(name, (subsegment) => {
    let result: T;
    try {
      result = funcToTrace(subsegment);
    } finally {
      subsegment?.close();
    }

    return result;
  });
};

/**
 * Wrap your function to automatically capture information for the subsegment. Note that (unlike the default implementation from AWS) this implementation automatically closes the subsegment
 * @param name - The name of the new subsegment
 * @param funcToTrace - The function context to wrap. Passed a subsegment to make enriching with extra metadata easier
 * @see https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-nodejs-subsegments.html
 * @see https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-nodejs-segment.html
 */
export const traceAsync = async <T>(
  name: string,
  funcToTrace: (subsegment: Subsegment | undefined) => Promise<T>
) => {
  return await captureAsyncFunc(name, async (subsegment) => {
    const result = await funcToTrace(subsegment).finally(() => {
      subsegment?.close();
    });

    return result;
  });
};
