# Playwright Intraverse -TEST

## Table of Contents

- [Description](#description)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Test](#Test)

## Description

E2E tests for Intraverse APP


## Prerequisites

Before you begin, ensure you have Node.js and npm installed on your machine. If not, follow the installation instructions provided in the [Node.js Package Manager Installation Guide](https://nodejs.org/en/download/package-manager#installing-nodejs-via-package-manager).


## Installation

```bash
cd intra-test
```

- Install the dependencies and the browsers.

```bash
npm install && npx playwright install
```

- Run the test.

```bash
npx playwright test
```

- Run the test in non-headless.

```bash
npx playwright test --headed
```

- Report the test result.

```bash
npm run report
```


## Test

