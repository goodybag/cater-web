Goodybag App
============

Setup
-----

To install dependencies and run the initial build:

```sh
npm install
```

To start the server:

```sh
export GOODYBAG_SID=... # paste your connect.sid cookie here
node dist/app/server.js # you can also use nodemon here
```

To watch for changes:

```sh
gulp watch
```

Strong Recommendations
----------------------

### Components

- Postfix component class names with `Component` such as `NavbarComponent` and
  `RestaurantTabsComponent`.
- Before commits try to make your code abide by ESLint rules.
- Include `propTypes` and `contextTypes` declarations for all components.
- Group import statements into relative and non-relative blocks.

### Styling

Most of these are derived from [SMACSS](https://smacss.com/book). Read it if
you have the time. If you have any questions about them ask Tenor.

- Prefix all CSS classes with `gb-{module}` such as `gb-navbar` for all navbar
  classes.
- Only use `div`s when possible. (exceptions being special elements like `input`, `img`, etc.)
- Use one, case-specific, class for each element. For example instead of
  writing:

  ```
  <div className="gb-navbar-item gb-navbar-points">...</div>
  ```

  do:
    
  ```
  <div className="gb-navbar-points">...</div>
  // in css:
  .gb-navbar-points {
    .gb-navbar-item;

    // ...
  }
  ```
- Avoid hard-coding magic numbers, especially colors. Create an entry in
  `base.less` for colors, or include a variable declaration at the top of the
  module for things magic measurements. 
- Avoid resorting to absolute positioning in order to align elements. Try to
  leverage padding/margin tricks or inline elements and floats.
- Avoid using flex boxes and other expiremental/unsupported features when
  possible.

package.json
------------

Make sure to distinguish between devDependencies and normal dependencies when
you add entries to the package. If the dependency is only needed for the
build-step, be sure to include it as a "devDependency." (`npm i -D ...`). If
the dependency is needed at runtime (included in the dev bundle) then include
it as a hard dependency. (`npm i -S ...`)

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
