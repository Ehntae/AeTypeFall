'use strict';

const { exec }   = require("child_process");
const gulp       = require("gulp");
const nodemon    = require("gulp-nodemon");
const gulpTslint = require("gulp-tslint");
const ts         = require("typescript"); // ensure this is ts and not gulp ts
const tslint     = require("tslint");
const pump       = require("pump");


const lintReport = {
    emitError: false,
    sort: true,
    fullPath: true,
    allowWarnings: true
}

gulp.task("lint", cb => {
    pump([
        gulp.src(["./projects/**/*.ts", "!node_modules/**"], {base: "."}),
        gulpTslint({
            formatter: "stylish",
            configuration: "./tslint.json"
        }),
        gulpTslint.report(lintReport)
    ], cb)
});


/**
 * This should not be auto-run via watch
 */
gulp.task("lintFull", cb => {
    const typeProgram = tslint.Linter.createProgram("./tsconfig.json", ".");
    ts.getPreEmitDiagnostics(typeProgram);

    pump([
        gulp.src(["./projects/**/*.ts", "!node_modules/**"], {base: "."}),
        gulpTslint({
            program: typeProgram,
            formatter: "stylish",
            configuration: "./tslint.json"
        }),
        gulpTslint.report(lintReport)
    ], cb);
});


gulp.task("compile", cb => {

    exec("node compiler/tfc -p ./compiler/tsconfig_c.json", (err, stdout, stderr) => {
        console.log("[AeTF : TypeFall] Compiling...")
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });

});
