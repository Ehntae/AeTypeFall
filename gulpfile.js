'use strict';

const { exec }   = require("child_process");
const gulp       = require("gulp");
const gulpTslint = require("gulp-tslint");
const ts         = require("typescript");
const tslint     = require("tslint");
const pump       = require("pump");
const dirSync    = require("gulp-directory-sync");
const watch      = require("gulp-watch");
const batch      = require("gulp-batch");

const starfallPath = require("./config/config.json").starfallPath;


const lintReport = {
    emitError: false,
    sort: true,
    fullPath: true,
    allowWarnings: true
}

gulp.task("lint", cb => {
    pump([
        gulp.src(["./projects/**/*.ts", "!node_modules/**", "!./projects/_*/**/*.ts"], {base: "."}),
        gulpTslint({
            formatter: "stylish",
            configuration: "./tslint.json"
        }),
        gulpTslint.report(lintReport)
    ], cb)
});


gulp.task("lintFull", cb => {
    console.log("\n\t\t=== IGNORE TYPE RESOLUTION OUTPUT ===\n<IGNORE>");

    const typeProgram = tslint.Linter.createProgram("./tsconfig.json", ".");
    ts.getPreEmitDiagnostics(typeProgram);

    console.log("<\\IGNORE>\n\n\t\t[AeTF : TypeFall]  Full type-rule supported lint-check");

    pump([
        // gulp.src(["./projects/**/*.ts", "!node_modules/**"], {base: "."}),
        gulp.src(["projects/**/*.ts", "!projects/_*/**/*.ts", "!node_modules"], {base: "."}),
        gulpTslint({
            program: typeProgram,
            formatter: "stylish",
            configuration: "./tslint.json"
        }),
        gulpTslint.report(lintReport)
    ], cb);
});


const compile = cb => {
    exec("node compiler/tfc -p ./compiler/tsconfig_c.json", (err, stdout, stderr) => {
        console.log("[AeTF : TypeFall] Compiling...");
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
}

gulp.task("compile", compile);


gulp.task("sync", cb => {
    pump([
        gulp.src("./build/"),
        dirSync("./build/", starfallPath + "/AeTF", { printSummary: true })
    ], cb);
});


const compileSync = gulp.series("compile", "sync");
gulp.task("compileSync", compileSync);


gulp.task("dev", cb => {
    console.log("=== Starting dev-watch. Compile & sync on save ===\n");

    return watch("./projects/**/*.ts", batch((events, done) => {
        let date = new Date();
        let time = `${date.getHours()}:${date.getMinutes()}`;

        console.log(`[${time}] Save detected!\n`);
        compileSync(done);
    }));

});
