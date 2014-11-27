PLUGIN = nprogress bootstrap codemirror bootstrap.growl bootstrap-paginator bootstrap-datepicker
all:install
install:
	npm install . && npm install bower -g && bower install $(PLUGIN)
