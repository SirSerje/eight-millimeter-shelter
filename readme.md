# 8mm shelter 📹

This project is small example of full-stack job.

Technical documentation provided in [link](https://github.com/SirSerje/eight-millimeter-shelter/wiki/index)

## Start & develop:

If you're not familiar with modern front-end develop, ensure, you have 
[homebrew](https://brew.sh/) (if you're on Mac) > [node](https://nodejs.org/uk/download/package-manager/) > [npm](https://www.npmjs.com/get-npm)

You can choose any package manager you want npm or [yarn](https://yarnpkg.com/lang/en/docs/install/)

1. `git clone https://github.com/SirSerje/eight-millimeter-shelter.git`
2. `cd eight-millimeter-shelter`
3. Install [nvm](https://github.com/creationix/nvm) and set default version to stable ^8.0
4. `npm install` or `yarn` to install all dependencies
5. `npm start` or `yarn start` to start backend
6. `npm react-start` or `yarn react-start` to start frontend

There is `build-webpack` and `start-webpack` to run frontend project without create-react-app script

Project have pre-commit hook to avoid breaking tests and code style. Check `lint` and `test` in package.json

## Known issues:

If you're brave enough, just add bug or create PR, this will be great ☺️:

- Webstorm's run script doesn't work properly. Use console instead. I've choose yarn, works ok.
- server hasn't all error response handling
- sometimes npm or yarn crashed without any reason. In this case you should try cleanup project (remove node_modules directory and delete all .lock files)
- Ensure, you're not install `eslint` globally (this case describe on [Github
](https://github.com/eslint/eslint/issues/6732))
