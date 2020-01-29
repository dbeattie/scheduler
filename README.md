# Interview Scheduler

Scheduler is a responsive single page app created using predominently React.js. Users can book, exit, and delete appointments with available interviewers in five daily time slots, within a given week. Data is transmitted and stored in a separate API database.

## Final Product

!["Interview Creation"](https://github.com/dbeattie/scheduler/blob/master/docs/Scheduler-Book-Appointment.png?raw=true)

!["Interview Delete Confirmation"](https://github.com/dbeattie/scheduler/blob/master/docs/Scheduler-Confirm-Delete.png?raw=true)


## View Online

- This project can be viewed in production online at: https://vibrant-knuth-a4491b.netlify.com/
- **Note:** *Database can take 30-60 seconds to cold boot, so you may need to give it a minute to render.*

## Setup

1. Download repository. 

2. Install dependencies with `npm install`.

3. Set up API database server following instructions at: https://github.com/dbeattie/scheduler-api

4. With API database server set up and running, run a separate webpack development server with `npm start`

5. View app locally at: http://localhost:8000

## Stretch Work

- Built a Heroku hosted database API that connects to the Netlify production app.
- Connected circleCI to run automated tests prior to pushing master branch to production branch.

## Dependencies

- axios: ^0.19.1
- classnames: ^2.2.6
- normalize.css: ^8.0.1
- react: ^16.9.0
- react-dom: ^16.9.0
- react-scripts: ^3.3.0

## Dev Dependencies

- babel/core: ^7.4.3
- storybook/addon-actions: ^5.0.10
- storybook/addon-backgrounds: ^5.0.10
- storybook/addon-links: ^5.0.10
- storybook/addons: ^5.0.10
- storybook/react: ^5.0.10
- testing-library/jest-dom: ^4.0.0
- testing-library/react: ^8.0.7
- testing-library/react-hooks: ^3.2.1
- babel-loader: ^8.0.5
- eslint: ^6.8.0
- eslint-config-airbnb-base: ^14.0.0
- eslint-plugin-import: ^2.20.0
- jest: ^24.9.0
- node-sass: ^4.13.1
- prop-types: ^15.7.2
- react-test-renderer: ^16.9.0

## Extras 

Storyboard was utilized during component creation and Jest was utilized for test automation. To view components in storyboard or run automated jest tests locally consider the following:

#### Running Storybook Visual Testbed

```sh
npm run storybook
```

#### Running Jest Test Framework

```sh
npm test
```