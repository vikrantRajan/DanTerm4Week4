# jQuery & AJAX

## Outline
1. JavaScript review
1. Browser dev tools
1. jQuery intro
1. jQuery events
1. Form Validation
1. jQuery loops and objects
1. jQuery AJAX + Fetch
1. AJAX local server
1. RSS + AJAX XML
1. Autocomplete
1. Chess

## Assessment

### Breakdown
* Attendance record represent 33% of the course mark
* Homework assignments indicate student skills
* Skills represent 66% of the course mark

### Progress
* Progress of assessed skills will be provided via Slack direct message

### Calculation
* Sample message [[2, 3], [4, 5]]
	* **Two** points earned out of a sub-total of **three** on one homework assignment
	* **Four** points earned out of a sub-total of **five** on two homework assignment
* Use [assessment.js](../../src/js/assessment.js) to preview course mark
	* Homework example `calculatePercent([[2, 3], [4, 5]])` (result 75%)
	* ... with 80% attendance `getJqueryCoursePercent(75, 80)` (result 77%)

### Assessment Window
* Homework is evaluated at the beginning of class. If you arrive after the class homework has been verified you will receive a zero mark for that assignment.
* An alternative for a zero mark is to Slack your **fully-functionaly homework** before class using a code sharing tool:
	* Commit homework via git
		* Setup [your private GitHub.com repository](https://help.github.com/articles/create-a-repo/)
		* [Copy many files to your repository](https://confluence.atlassian.com/bitbucket/copy-your-repository-and-add-files-729980492.html)
		* What files do you copy to your repository?
			* Everything in *course-files* plus your homework files
				* Configuration files (`/.editorconfig`, `/.eslintrc`...)
				* Web server files (`/app-teacher.js`, `/package.json`...)
				* Project source files (`/src/*`)
				* Project public files (`/public/*`)
				* **Plus your homework files**
		* Send me the details of your assignment to me via [Slack](https://domaindesign.slack.com/):
			* GitHub repository address (GIT or HTTPS i.e. git@github.com:VanArts/student-name-api-final.git )
			* Developer facing HTML address on GitHub ( i.e. https://github.com/VanArts/course-files/blob/master/public/social-apis/math/1calculator.html#L21 )
			* Developer facing JavaScript address on GitHub ( i.e. https://github.com/VanArts/course-files/blob/master/src/js/math/calculator.teacher.js )
			* User facing HTML address on Localhost ( http://localhost:8000/final.html )

	* [JSFiddle](https://jsfiddle.net/)
	* [Codepen](https://codepen.io/pen/)
