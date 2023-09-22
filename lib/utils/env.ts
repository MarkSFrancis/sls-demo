export type CdkAccountName =
  | 'dev'
  | 'test'
  | 'prod'
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (string & {}); // typescript trick to allow any string but keep autocomplete;

export type CdkEnv = ReturnType<typeof getCdkEnv>;

export const getCdkEnv = () => {
  const envName = process.env.CDK_ENV as CdkAccountName;
  if (!envName) {
    throw new Error('Missing CDK_ENV environment variable');
  }

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
