# Based on Angular 2 QuickStart Source Template
[![Build Status][travis-badge]][travis-badge-url]

This repository holds the TypeScript source code of the cardiology bullseye component, based on [angular.io quickstart](https://angular.io/docs/ts/latest/quickstart.html), so I recommend to visit https://github.com/angular/quickstart.

## Prerequisites

Node.js and npm are essential to Angular development. 
    
<a href="https://docs.npmjs.com/getting-started/installing-node" target="_blank" title="Installing Node.js and updating npm">
Get it now</a> if it's not already installed on your machine.
 
**Verify that you are running at least node `v4.x.x` and npm `3.x.x`**
by running `node -v` and `npm -v` in a terminal/console window.
Older versions produce errors.

We recommend [nvm](https://github.com/creationix/nvm) for managing multiple versions of node and npm.

## Download the project

Clone this repo into new project folder (e.g., `my-proj`).
```bash
git clone  https://github.com/antpass79/cardiology-bullseye-component.git  my-proj
cd my-proj
```

Discard everything "git-like" by deleting the `.git` folder.
```bash
rm -rf .git  # non-Windows
rd .git /S/Q # windows
```

### Create a new git repo
You could [start writing code](#start-development) now and throw it all away when you're done.
If you'd rather preserve your work under source control, consider taking the following steps.

Initialize this project as a *local git repo* and make the first commit:
```bash
git init
git add .
git commit -m "Initial commit"
```

Create a *remote repository* for this project on the service of your choice.

Grab its address (e.g. *`https://github.com/<my-org>/my-proj.git`*) and push the *local repo* to the *remote*.
```bash
git remote add origin <repo-address>
git push -u origin master
```
## Install npm packages

> See npm and nvm version notes above

Install the npm packages described in the `package.json` and verify that it works:

```bash
npm install
npm start
```

The `npm start` command first compiles the application, 
then simultaneously re-compiles and runs the `lite-server`.
Both the compiler and the server watch for file changes.

Shut it down manually with `Ctrl-C`.

## Install additional packages
Install bootstrap package
npm install bootstrap@4.0.0-alpha.5

Install xml to json converter library
npm install x2json

You're ready to run the application.

### Other functionalities

For details about the project structure and functionalities (e2e, tests etc.) see https://github.com/angular/quickstart.


