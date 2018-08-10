# Melon Reporting and Auditing

## Getting started

To locally run the app, the following tools have to be installed:
- Node.js (8.11.3 or higher)
- yarn (1.9.2 or higher)
- git (2.18.0 or higher)

In a terminal, run the following commands:

```bash
git clone https://github.com/melonproject/reporting.git
cd reporting
yarn install
yarn dev
```

`yarn dev` runs both the storybook and the main app in development mode and exposes the following interfaces:

- App: http://localhost:3010/
- Storybook: http://localhost:3050/

## Deploy

```bash
yarn deploy
```

Deploys both the storybook and the main app in production mode to now:

- App: https://melon-reporting.now.sh/
- Storybook: https://melon-reporting-storybook.now.sh/
