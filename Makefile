PLUGIN = nprogress bootstrap codemirror bootstrap.growl
all:install
install:
	npm install . && npm install bower -g && bower install $(PLUGIN)
