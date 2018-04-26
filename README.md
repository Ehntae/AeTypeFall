# AeTF - AeTypeFall

## A Typescript & JavaScript transpiler to Starfall & GLua

#### If you have any questions, contact me via discord *Aeomi#2143*

### Prerequisites

* [Visual Studio Code](https://code.visualstudio.com) is the recommend IDE for use with TypeFall. Git Atom should work but has not yet been tested.
  * both Typescript and VSCode are made by Microsoft, as a consequence it is the most supportive of Typescript.
* [NodeJS](https://nodejs.org/en) is needed to use NPM (Node package manager)
  * Node is a requirement for installing the necessary dependencies of **AeTypeFall**, including Typescript itself.

### Installing AeTypeFall and its dependencies

* Clone this repository into a directory of your choice.
* Open your command line and change the working directory to the cloned **AeTypeFall** directory.
* Run the following command: "*npm install*"
* Next, install the TSLint extension into your editor for dynamic linting. (Tested and working with VSCode)


### To create your first **AeTypeFall** project

* Navigate to the *projects* directory and create a new directory for your project; name it after your project.
* Begin by creating a *main.ts* file, this will act as the entry point of the project; i.e. the file you will open in Starfall and place to run and re-run the relevant project.
* You can create sub-directories to organize your project.

### Using tasks and the compiler

* Open your command line at the project's directory.
* *gulp --tasks*
  * Use to check the tree of all gulp tasks.
* *gulp lintFull*
  * To perform a full TSLint check on all of your projects (with type-enabled rules.)
  * Use this periodically, especially if you are having any issues with your project.
* *gulp compile*
  * Used to compile your TypeFall projects from the *projects* directory to the *build* directory; transpiling them into Lua.
* *gulp sync*
  * Used to synchronize the *build* directory into your Starfall directory as defined in the *config/config.json* file.
* *gulp compileSync*
  * Used to run both *compile* and *sync* in sequential order (this task is synchronous).
* *gulp dev*
  * This will watch the *projects* directory for changes. Whenever a file there is saved, the *compileSync* task will be executed. (You can exit this by sending an interrupt like CTRL+C.)

### Notes

* Bitwise operators (such as >>> << | &) are fully supported and can be used in lieu of LuaJIT's bitlib.
* Approximately 30% of Starfall codebase has been given type definitions for use with TypeFall. This coverage will continue to increase over time, however, it is a very large workload and I am unable to work on it whilst working on the compiler. If you wish you can fork this project and work on the definitions file, as that will massively accelerate the completion of the definitions.

### Known issues

* The *undefined* keyword currently is not being identified by the Typescript AST. Use the *null* keyword instead. It will transpile correctly to Lua's *nil*.
* Iterators have been found to produce sporadic syntax errors, use with care (and send an issue if you have any.)