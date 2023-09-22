# SLS Demo

This is a serverless demo of State Machines and EventBridge Pipes on AWS

# Getting Started

## Prerequisites

- You'll need an AWS account
  - You'll need to [configure AWS SSO](https://docs.aws.amazon.com/cli/latest/userguide/sso-configure-profile-token.html)
- Install [fnm](https://github.com/Schniz/fnm)
- Install node's latest lts version
  - `fnm install --lts`
- Install [yarn (classic version)](https://classic.yarnpkg.com/lang/en/docs/install/)
  - `npm i -g yarn`
- Install the [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/home.html)
- Clone this project onto your local machine
- Open a terminal at the root folder of this project
- Run `yarn install` to install all dependencies

## Configuring AWS SSO

This repo has some opinions about profiles you have set up in `aws sso`, and what names you use.

This is a minimum example that aligns with this repo's opinions:

```
[profile dev]
sso_session = YOUR_SESSION_ID
sso_account_id = YOUR_AWS_ACCOUNT_ID
sso_role_name = YOUR_ROLE_NAME
region = YOUR_AWS_REGION
```

You can still use this app without the same config, but some `yarn deploy:{env}` scripts won't work for you.

# Deploy

- Run `yarn deploy:dev` to deploy to the dev account

# Technologies

- [yarn (classic)](https://classic.yarnpkg.com/)
- [Typescript](https://www.typescriptlang.org/)
- [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/home.html)
- [Vitest](https://vitest.dev/)
- [Husky](https://github.com/typicode/husky)
- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)
