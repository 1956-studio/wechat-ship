PLUGIN = nprogress bootstrap codemirror
all:install
install:
	npm install . && npm install bower -g && bower install $(PLUGIN)
