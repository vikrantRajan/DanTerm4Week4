# How-to setup on your first day

## Main communiation tool
1. Email instructor (Dan BROOKS [dan@vanarts.com](dan@vanarts.com)) your email address and ask to be invitied to use Slack
  	* Slack forces you to setup a user per Slack team so you may customize for VanArts
1. Setup user for this course at [http://domaindesign.slack.com](http://domaindesign.slack.com)
1. Check your email inbox for Slack invitation
1. Join Slack #general channel (see Slack invite)
1. Dan will invite you to the course private channel
	* Verify you can read the jQuery channel [#vanarts-jquery-web14](https://domaindesign.slack.com/messages/GCGCGSG48/)
1. Use Slack as the main communication tool for this course

## GitHub code host
1. Setup and / or Sign-in to [GitHub.com](https://github.com/)
 	 * Starter files and course examples will be shared via GitHub
1. Share your GitHub username on Slack in the course's private channel (i.e. [#vanarts-jquery-web14](https://domaindesign.slack.com/messages/GCGCGSG48/))
1. Dan will then grant you permission to the jQuery course starter files [https://github.com/VanArts/course-files](https://github.com/VanArts/course-files)
1. Check your email inbox for GitHub invitation
	* Verify you can see the [CONTRIBUTING.md file on GitHub.com](https://github.com/VanArts/course-files/blob/master/CONTRIBUTING.md)

## SourceTree to pull code locally
1. Download your git client (or use existing). Recommended SourceTree [https://www.sourcetreeapp.com/](https://www.sourcetreeapp.com/)
1. Setup and / or Sign-in to Atlassian (owner of SourceTree)
1. Authorize SourceTree to access GitHub.com by [creating an SSH key](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)
1. [Link SSH key to GitHub.com user](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)
	* If SourceTree icon is missing then try viewing this address in Window Explorer `C:\Users\{username}\AppData\Local\SourceTree\`
1. Convert SSH key to PPK for SourceTree
	1. Open SourceTree
	1. Menu Bar > Tools > Import SSH Keys
	1. Load button
	1. Change folder to <User>/.ssh
	1. Select *.* all files
	1. Load the .ssh/id_rsa
	1. Save private key as github.ppk
	1. Close Importer
1. Load PPK into Putty
	1. System tray > Putty
	1. Add Keys <user>/.ssh/github.ppk
1. Verify
	1. System tray > Putty
	1. View Keys (new SSH key added)
1. Clone **course-files** repo
  	1. Save to `c:\javascript\course-files`
  	1. Verify in Windows Explorer the GitHub.com files match your local (i.e. on C drive)
