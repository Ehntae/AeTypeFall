'use strict';

const gulp = require("gulp");
const nodemon = require("gulp-nodemon");
const gulpTslint = require("gulp-tslint");
const tslint = require("tslint");
const pump = require("pump");

const lintReport = {};
//     emitError: false,
//     sort: true,
//     fullPath: true
// }

gulp.task("lint", cb => {
    pump([
        gulp.src("./projects/**/*.ts"),
        gulpTslint({
            formatter: "stylish"
        }),
        gulpTslint.report(lintReport)
    ], cb)
});


gulp.task("lintFull", cb => {
    const program = tslint.Linter.createProgram("./tsconfig.json");

    pump([
        gulp.src("./projects/**/*.ts"),
        gulpTslint({
            program
            // formatter: "stylish"
        }),
        gulpTslint.report(lintReport)
    ], cb);
});
