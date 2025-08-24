**TinyInput**
================

A simple library that takes user input the same way it is done in Python.

**Description**
---------------

TinyInput is a lightweight JavaScript library that provides an easy way to read user input from the standard input (stdin) and write to the standard output (stdout). Inspired by Python's built-in `input()` function, TinyInput aims to simplify user input handling in Node.js applications.

**Features**
------------

* Read user input from stdin
* Write to stdout
* Simple and easy to use API

**Installation**
--------------

To install TinyInput, run the following command:

```
npm install tinyinput
```

**Usage**
-----

To use TinyInput, simply import the library and call the `input()` function:
```ts
import { input } from 'tinyinput';

async function main(){
    const userInput = await input('Please enter your name: ', opt);
    console.log(`Hello, ${userInput}!`);
}

main()

//opt can be "int" | "float" | "string"
```

**Technologies**
-------------

* Written in TypeScript
* Built with tsup
* Compatible with Node.js

**Configuration and Env**
------------------------

No specific configuration or environment variables are required to use TinyInput.

**Folder Structure**
---------------------

```
.
├── .gitignore
├── .npmignore
├── LICENSE
├── README.md
├── package-lock.json
├── package.json
├── src
|  ├── index.ts
|  ├── type.ts
├── tsconfig.json
├── tsup.config.ts
```

**Author**
---------

Mohamed Lamin Walon-Jalloh ([@walonCode](https://github.com/walonCode))

**Contribution**
-------------

If you'd like to contribute to TinyInput, please fork the repository and submit a pull request. Your help is greatly appreciated!

**License**
---------

TinyInput is licensed under the MIT License.

**GitHub Badges**

 TypeScript: ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
 Node.js: ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)