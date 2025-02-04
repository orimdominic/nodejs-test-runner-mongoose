# nodejs-test-runner-mongoose

## What you need

1. [Node.js](https://nodejs.org/en) >=v18 and npm
2. [MongoDB](https://www.mongodb.com/) >=v7.0.14

## Setting Up

1. Clone the repository
2. Install the project's dependencies

```bash
npm install
```

3. In the terminal at the root of the repository, run

```
node .
```

You should see output on the terminal telling you what Node.js version you are running. For example

```bash
You are running Node.js v22.13.1
```

You should also see details of the user and the task created.

```bash
Created user with id 679f1d7f73fbeaf23b2007df
Created task "Task title" for user with id "679f1d7f73fbeaf23b2007df"
```

## Tests

At this point, you can run tests for the project using the npm `test` script in `package.json`

```bash
npm run test

> nodejs-test-runner-mongoose@1.0.0 test
> node --test --import ./test.setup.mjs

...

ℹ tests 8
ℹ suites 5
ℹ pass 6
ℹ fail 2
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 3418.86502
```
