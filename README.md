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

To use TinyInput, import the library and call the `input()` function. By default, it returns a string and ensures the input is not empty.

```ts
import { input } from 'tinyinput';

async function main() {
    // Basic usage (returns string)
    const name = await input('What is your name? ');
    console.log(`Hello, ${name}!`);

    // Integer input (retries until valid)
    const age = await input('How old are you? ', 'int');
    console.log(`Next year you will be ${age + 1}`);

    // Float input (retries until valid)
    const price = await input('Enter price: ', 'float');
    console.log(`Total with tax: ${(price * 1.15).toFixed(2)}`);

    // Password input (hides typing)
    const password = await input('Enter password: ', 'password');
    console.log('Securely received password');

    // Email validation
    const email = await input("Enter email: ", "email");
    console.log(`Updating record for ${email}`);

    // Confirmation (returns boolean)
    const save = await confirm("Save changes?");
    if (save) {
        console.log("Saved!");
    }

    // Selection (returns the string choice)
    const color = await select("Pick a color", ["Red", "Green", "Blue"]);
    console.log(`You chose ${color}`);
}

main();
```

**API Reference**
-----------

### `input(question, opt)`

The main function for reading input. Returns a `Promise<string | number>`.

*   **question** (string): The prompt to show.
*   **opt** (string, optional):
    *   `"string"` (default): Returns trimmed, non-empty string.
    *   `"int"`: Parses and returns a valid integer.
    *   `"float"`: Parses and returns a valid number.
    *   `"password"`: Hides input while typing.
    *   `"email"`: Validates email format.

### `confirm(question, defaultValue?)`

Simplified helper for yes/no questions. Returns a `Promise<boolean>`.

*   **defaultValue** (boolean, optional): Defaults to `true`. Used if the user just presses Enter.

### `select(question, choices)`

Displays a numbered list of choices. Returns a `Promise<string>`.

*   **choices** (string[]): A non-empty array of options to choose from.

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