* No re-ordering _(seems to)_ takes place:

    Execution order of `app.(METHOD|use)` determines fallthrough order.

* `app.use` matches child routes, `app.METHOD` doesn't.

    e.g.: `app.get('/foo')` will match `/foo` and `/foo/` but not `/foo/bar`.

* `next()` called when no further middleware has been set up throws an error.
