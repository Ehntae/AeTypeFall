# AeTF - AeTypeFall

## A Typescript & JavaScript transpiler to Starfall & GLua

### Contact
> If you have any questions or concerns, contact me via discord: _Aeomi#2143_

### Prerequisites

> * [Visual Studio Code](https://code.visualstudio.com) is the recommend IDE for use with TypeFall. Git Atom should work but has not yet been tested.
>   * both Typescript and VSCode are made by Microsoft, as a consequence it is the most supportive of Typescript.
> * [NodeJS](https://nodejs.org/en) is needed to use NPM (Node package manager)
>   * Node is a requirement for installing the necessary dependencies of **AeTypeFall**, including Typescript itself.

### Installing AeTypeFall and its dependencies

> * Clone this repository into a directory of your choice.
> * Open your command line and change the working directory to the cloned **AeTypeFall** directory.
> * Run the following command: "*npm install*"
> * Next, install the TSLint extension into your editor for dynamic linting. (Tested and working with VSCode)

### To create your first **AeTypeFall** project

> * Navigate to the *projects* directory and create a new directory for your project; name it after your project.
> * Begin by creating a *main.ts* file, this will act as the entry point of the project; i.e. the file you will open in Starfall and place to run and re-run the relevant project.
> * You can create sub-directories to organize your project (see [here](https://github.com/Aeomi/AeTypeFall/blob/master/README.md#notes) for recommended conventions.)


### Using tasks and the compiler

> * Open your command line at the project's directory.
> * *gulp --tasks*
>   * Use to check the tree of all gulp tasks.
> * *gulp lintFull*
>   * To perform a full TSLint check on all of your projects (with type-enabled rules.)
>   * Use this periodically, especially if you are having any issues with your project.
> * *gulp compile*
>   * Used to compile your TypeFall projects from the *projects* directory to the *build* directory; transpiling them into Lua.
> * *gulp sync*
>   * Used to synchronize the *build* directory into your Starfall directory as defined in the *config/config.json* file.
> * *gulp compileSync*
>   * Used to run both *compile* and *sync* in sequential order (this task is synchronous).
> * *gulp dev*
>   * This will watch the *projects* directory for changes. Whenever a file there is saved, the *compileSync* task will be executed. (You can exit this by sending an interrupt like CTRL+C.)

### Notes

> * Generally you should consider modularity for your projects; treat each file as a module, such that the implementation for e.g. ```class A { ... }``` would have its own file (it is convention to use PascalCasing for both a class-name and its file-name: ```class A``` => *A.ts*)
> * Currently there is no conversion for preprocessor directives (such as --@sever, or --@name.) In place of the realm specification directives (```--@server```, ```--@client```, and ```--@shared```) you can do the following: ```if (SERVER) return;```<br/>However, you cannot return outside of a block in Typescript; you must therefore use the ```--@ts-ignore``` directive to suppress a Typescript error on the next line. In conclusion:<br/>
> ```//@ts-ignore```<br/>
> ```if (SERVER) return;```<br/>
> Preprocessor directives will be coming once a comment-crawling related bug with the Typescript AST has been resolved.

> * Bitwise operators (such as >>> << | &) are fully supported and can be used in lieu of LuaJIT's bitlib.
> * Sometimes you might want to pause your working on a project, and sometimes such a project might have errors left in it that you aren't currently concerned with fixing, nor do you want linting errors or compilation to fail because of it. To solve this, simply rename a project and append an underscore (*_myProject*) to it, and it will be ignored until the underscore is removed.
> * Approximately 30% of Starfall codebase has been given type definitions for use with TypeFall. This coverage will continue to increase over time, however, it is a very large workload and I am unable to work on it whilst working on the compiler. If you wish you can fork this project and work on the definitions file, as that will massively accelerate the completion of the definitions.

### Known issues

> * The *undefined* keyword currently is not being identified by the Typescript AST. Use the *null* keyword instead. It will transpile correctly to Lua's *nil*.
>   * This is a temporary measure; a fix is coming soom.
> * Iterators have been found to produce sporadic syntax errors, use with care (and send an issue if you have any.)
