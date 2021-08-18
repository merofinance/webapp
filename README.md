<div align="center">
  <br>
	<a href="https://backd.fund/"><img src="https://backd.fund/bkd-full-dark.png" width="200"></a>
  <br>
  <br>
  <p>
    <a href="https://github.com/backdfund/webapp/graphs/contributors">
        <img src="https://img.shields.io/github/contributors/backdfund/webapp?style=flat-square" alt="GitHub contributors" />
    </a>
    <a href="https://github.com/backdfund/webapp/commits/">
    	<img src="https://img.shields.io/github/commit-activity/m/backdfund/webapp?style=flat-square" alt="GitHub commit-activity" />
    </a>
    <a href="https://gitmoji.dev">
        <img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji" >
    </a>
    <a href="https://discord.gg/jpGvaFV3Rv">
        <img src="https://discordapp.com/api/guilds/869304943373348915/embed.png" alt="Discord server" >
    </a>
    <a href="https://percy.io/3b0d1c60/backd">
        <img src="https://percy.io/static/images/percy-badge.svg" alt="Percy Visual Testing" >
    </a>
  </p>
</div>

# Backd Website

Welcome to the repo for the Backed Website - a React project implementing Web3 which allows users to interract with the Backd Protocol.

## Development

- Install [Yarn](https://yarnpkg.com/)
- Then run the following commands:

```
# Clone the project to download its contents
> cd repositories
> git clone https://github.com/backdfund/webapp.git

# Make Yarn install the project's dependencies into node_modules/
> cd webapp
> yarn

# Startup the project
> yarn start
```

- Open http://localhost:3000/ to view the website.

To launch the application using mock data, use the following command:

```
env REACT_APP_USE_MOCK=1 yarn start
```

## Testing

There are two types of tests supported, Unit Tests and Automation Tests.  
Both need to be passing for any PR to be merged.

### Unit Tests

The following command can be used to run the unit tests:  
`yarn test`  
This launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Automation Tests

The following command can be used to run the automation tests:  
`yarn run cy:open`  
This runs Cypress in open mode so you can view the tests suites and see them run.  
See the [Cypress docs](https://docs.cypress.io/guides/overview/why-cypress) for more information.
