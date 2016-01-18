Goodybag App
============

Setup
-----

To install dependencies and run the initial build:

```bash
npm install
```

To start the server:

```bash
export GOODYBAG_SID=... # paste your connect.sid cookie here
export GOODYBAG_API=https://www.goodybag.com/api # or http://localhost:3000/api
export GOODYBAG_ORDER_ID=... # paste an order id here
node dist/app/server.js # you can also use nodemon here
```

To watch for changes:

```sh
gulp watch
```

Gulp tasks
----------

**Default** does these steps:

1. **Build** will compile all the ES6 in `app` into ES5 files in `dist/src`
2. **Bundle** will bundle (and compile) all the ES6 in `app` into the bundle
   `dist/build/bundle.js`
3. **Migrate** will copy all files from `public` to `dist/build`
4. **Compile** will compile `app/styles/main.less` to `dist/build/main.css`
pick

**Watch** will watch and re-do all the things above when something changes.

Mocha tests
-----------

Running `npm test` or simply `mocha` will run the test suite. If you want to
have a tigher TDD-loop, or you just want your tests to run more rapidly, then
start mocha in watch-mode with `mocha -w`. Try out the `-R min` reporter.

Best practices
--------------

See our [best practices page](https://github.com/goodybag/cater-web/wiki/Best-practices) on the wiki.
