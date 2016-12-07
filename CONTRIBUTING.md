# Setup your developer environment
* CLI
	* CLI is Command Line Interface otherwise known as Command Prompt, Powershell, Terminal, Bash, Shell
* [Node.js](http://nodejs.org/)
	* Install v6.9.x
		* Visit official website and install
	* Verify
		* Open CLI
		* Run `node -v`
		* Expect a version number
* Local dependencies (including gulp.js)
	* Install
		* Change directory to the web site root
		* Run `npm install`
	* Verify
		* Open CLI
		* Run `npm start`

* Follow team standard with text editor
    * [Visual Studio Code](https://code.visualstudio.com/)
		* Install Extension(s)
			* EditorConfig for VS Code

## Commands
* `npm start` Start the web server
* `npm run dev` Start the web server in developement mode watching files to lint, concat, and unit testing
* `npm test` Execute JS unit test suite
* `npm run bundle` Manually prepare your JS for public
* `npm run lint` Manually lint your JS

## Bundled critical.js
1. All JavaScript files inside the `/course-files/src/js/*.js` are bundled and concatenated into `/course-files/public/js/critical.js`
1. Gulp.js has a build step that is executed with command `npm run dev` (into CLI)
	* To trigger the build, save a JavaScript file in the `src` folder
1. This file is created with the goal of decreasing the number of files downloaded by the browser; from many to one.
