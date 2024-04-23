# CampervanCalendar

[![Node.js CI](https://github.com/GravityDarkLab/CampervanCalendar/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/GravityDarkLab/CampervanCalendar/actions/workflows/node.js.yml)

> __Note:__ Check the Actions tab for the latest build status and test coverage summary.

> __Note:__ This project uses a mock API to simulate fetching data.

This project is a simple calendar application that was created as part of a coding challenge. It is built with Vue 3, Vite, and Tailwind CSS.

A live version of the app can be found [here](https://gravitydarklab.github.io/CampervanCalendar/).
This project make usage of the open source [vue-simple-calendar](https://github.com/richardtallent/vue-simple-calendar) for the calendar component.

## Tech Stack

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Vue 3](https://v3.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Features

- [x] Display a calendar for the current week.
- [x] Allow the user to navigate to the previous and next weeks.
- [x] Display a list of bookings for the current displayed week.
- [x] Allow user to jump to today's date.
- [x] Allow user to switch between differnt stations.
- [x] Allow user to click on a booking to view more details.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Vue 3](https://v3.vuejs.org/)
- [Vitest](https://vitest.dev/)

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

### Project Setup

1. Clone the repository from GitHub:

    ```sh
    git clone <repository-url>
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Run the development server:

    ```sh
    npm run dev
    ```

4. The App should now be running.

### Runnnig the Tests

```sh
npm run test:unit
```

### Running Test Coverage

```sh
npm run test:coverage
```

### Other Scripts

#### Build for Production

```sh
npm run build
```

#### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

#### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
