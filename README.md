# SLS Demo

This is a low-code demo of:

- Lambda-less API Gateway
- State Machines (WIP)
- EventBridge Pipes (WIP)

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

# Deploy

## Configuring AWS SSO

You'll need to [configure AWS SSO](https://docs.aws.amazon.com/cli/latest/userguide/sso-configure-profile-token.html) to deploy this app. Once configured, run `CDK_ENV=YOUR_AWS_ACCOUNT_NAME yarn deploy` to deploy to your AWS account. You'll need to make sure that you replace `YOUR_AWS_ACCOUNT_NAME` with the SSO credential name you set up.

# Technologies

- [yarn (classic)](https://classic.yarnpkg.com/)
- [Typescript](https://www.typescriptlang.org/)
- [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/home.html)
- [Vitest](https://vitest.dev/)
- [Husky](https://github.com/typicode/husky)
- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)
