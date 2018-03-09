var gulp = require('gulp');
var typedoc = require("gulp-typedoc");

gulp.task("typedoc", function() {
    return gulp
        .src(["src/**/*.ts"])
        .pipe(typedoc({
            // TypeScript options (see typescript docs)
            module: "commonjs",
            target: "es6",
            //includeDeclarations: true,

            // Output options (see typedoc docs)
            out: "doc/",
            //json: "output/to/file.json",

            // TypeDoc options (see typedoc docs)
            name: "node-middleware",
            //theme: "/path/to/my/theme",
            //plugins: ["my", "plugins"],
            ignoreCompilerErrors: false,
            version: true,
        }))
    ;
});

gulp.task("default", () => {
    gulp.run('typedoc');
})
