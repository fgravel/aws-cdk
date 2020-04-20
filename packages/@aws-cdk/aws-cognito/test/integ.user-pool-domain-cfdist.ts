import { App, CfnOutput, Stack } from '@aws-cdk/core';
import { UserPool, UserPoolDomainType } from '../lib';

/*
 * Stack verification steps:
 * * Verify that the CloudFrontDistribution stack output is of the format 'xxxxxxxxxxxxxx.cloudfront.net'
 */

const app = new App();
const stack = new Stack(app, 'integ-user-pool-domain-cfdist');

const userpool = new UserPool(stack, 'UserPool');

const domain = userpool.addDomain('Domain', {
  domain: UserPoolDomainType.cognitoDomain({
    domainPrefix: 'cdk-integ-user-pool-domain'
  }),
});

new CfnOutput(stack, 'Domain', {
  value: domain.domainName,
});

new CfnOutput(stack, 'CloudFrontDomainName', {
  value: domain.cloudFrontDomainName,
});