PLUGIN = nprogress bootstrap
all:install
install:
	npm install . && npm install bower -g && bower install $(PLUGIN)
