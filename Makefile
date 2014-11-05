PLUGIN = nprogress bootstrap codemirror bootstrap.growl bootstrap-paginator
all:install
install:
	npm install . && npm install bower -g && bower install $(PLUGIN)
