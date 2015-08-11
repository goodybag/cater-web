Goodybag App
============

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

1. **Build** will compile all the ES6 in `src` into ES5 files in `dist/src`
2. **Bundle** will bundle the ES5 modules in `dist/src` to
   `dist/build/bundle.js`
3. **Migrate** will copy all files from `public` to `dist/build`
4. **Compile** will compile `src/styles/main.less` to `dist/build/main.css`

**Watch** will watch and re-do all the thing above when something changes.
Unfortunately I don't have webpack setup to do delta-rebuilds but the build
speed is fast enough for me.

Mocha tests
-----------

Running `npm test` or simply `mocha` will run the test suite. If you want to
have a tigher TDD-loop, or you just want your tests to run more rapidly, then
start mocha in watch-mode with `mocha -w`. Try out the `-R min` reporter.
