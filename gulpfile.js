'use strict';

const { exec }   = require("child_process");
const gulp       = require("gulp");
const nodemon    = require("gulp-nodemon");
const gulpTslint = require("gulp-tslint");
const ts         = require("typescript");
const tslint     = require("tslint");
const pump       = require("pump");
const dirSync    = require("gulp-directory-sync");

const starfallPath = require("./config/config.json").starfallPath;


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
    console.log("\nIGNORE FOLLOWING OUTPUT ABOUT FANCY-LOG!\n<IGNORE>");

    const typeProgram = tslint.Linter.createProgram("./tsconfig.json", ".");
    ts.getPreEmitDiagnostics(typeProgram);

    console.log("<\\IGNORE>\n\n[AeTF : TypeFall] Performing a full, type-rule supported lint-check...")

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
        console.log("[AeTF : TypeFall] Compiling...");
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});


gulp.task("sync", cb => {
    pump([
        gulp.src("./build/"),
        dirSync("./build/", starfallPath + "/AeTF", { printSummary: true })
    ], cb);
});


gulp.task("compileSync", gulp.series("compile", "sync"));


/**
 * Currently will only watch for typescript changes,
 * this could be changed to allow the user to edit the built lua files.
 * However, this isn't supported, and could lead to problems.
 */
gulp.task("dev", cb => {

    // project change => compile => sync

});
