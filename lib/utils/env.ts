import { AWS_REGION } from '../../src/utils/constants';

export type CdkAccountName = 'dev' | 'test' | 'prod';

export type CdkEnv = ReturnType<typeof getCdkEnv>;

export const getCdkEnv = () => {
  const envName = (process.env.CDK_ENV as CdkAccountName) ?? 'dev';
  const awsRegion = AWS_REGION;
  const awsAccountId = useEnvValue(envName, {
    dev: '398891587658',
    test: '777090961048',
    prod: '223772707415',
  });

  return {
    name: envName,
  };
};

const useEnvValue = <T>(
  envName: CdkAccountName,
  values: Record<CdkAccountName, T>
) => {
  return values[envName];
};
