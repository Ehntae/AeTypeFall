# AeTF - AeTypeFall

## A Typescript & JavaScript transpiler to Starfall & GLua

### Prerequisites

* [Visual Studio Code](https://code.visualstudio.com) is the recommend IDE for use with TypeFall
  * both Typescript and VSCode are made by Microsoft, as a consequence it is the most supportive of Typescript
* [NodeJS](https://nodejs.org/en) is needed to use NPM (Node package manager)
  * Node is a requirement for installing the necessary dependencies of **AeTypeFall**, including Typescript itself.

### To begin using AeTypeFall

* Clone this repository
* Open your command line of choice and change the working directory to the cloned **AeTypeFall** directory.
  * i.e. cmd for windows, bash for Linux and mac.
* Run the following commands:
  * "*npm i*"
    * This will install typefall dependencies.
  * "*cd compiler*"
  * "*npm i*"
    * This will install compiler dependencies in its directory.
  * "*npm i -g tslint*"
    * Install tslint (Typescript linting and enhanced intellisense) globally.

### To create your first **AeTypeFall** project

* Navigate to the *projects* directory and create a new directory for your project; name it after your project.
* Begin by creating a *main.ts* file, this will act as the entry point of the project; i.e. the file you will open in Starfall and place to run and re-run the relevant project.

### Known issues

* The *undefined* keyword currently does not work as intended. Use the *null* keyword instead. It will transpile correctly to lua's *nil*.
* A project directory must not contain sub-directories, as they will currently incorrectly compile, this will be fixed soon.
* Iterators have been found to produce sporadic syntax errors, use with care (and send an issue if you have any.)