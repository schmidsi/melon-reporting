# reporting

Melon Fund Reporting

## Getting started

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
