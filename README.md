# Background

This repo contains a variety of sample frameworks to test the various HypeLab providers that are output from the `hypelab-ts` repo. Cypress tests are run against each of the various frameworks in order to confirm that formats render as expected.

# Set up

In order to run the tests, you can run `npm run test` which will sync the latest built version of the `hypelab-ts` providers into the `npm_modules` in each of the various frameworks and then subsequently kick off Cypress tests.

If you haven't built the `hypelab-ts` providers yet, you can do so by changing to the `hypelab-ts` directory and running the command `npm run test:providers`.

If you want to visually see the output of the Cypress tests, you can cd into the specific framework's directory and run the command `npm run cypress`.
