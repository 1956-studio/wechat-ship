PLUGIN = nprogress
all:install
install:
	npm install . && bower install $(PLUGIN)
