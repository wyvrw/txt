# contributing

## code

[Node.js](http://nodejs.org) should be installed.

1. [Fork](https://help.github.com/articles/fork-a-repo) this repo.

2. Setup your fork locally:
	
	```bash
	git clone https://github.com/YOUR-USERNAME/txt.git
	cd txt
	git remote add upstream https://github.com/wyvrw/txt.git
	npm install
	```

3. If it has been some time, keep your fork up to date:
	
	```bash
	git pull upstream master
	```

4. Make changes and then test the code:
	
	```bash
	npm test
	```

5. Create a [pull request](https://help.github.com/articles/using-pull-requests).

Do not edit txt.js or txt.min.js in the root folder - these will only be updated for the next release. Edit txt.js in the src folder.
