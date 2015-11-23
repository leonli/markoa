PATH := node_modules/.bin:$(PATH)
SHELL := /bin/bash

test:
	mocha -c --compilers js:babel-core/register | bunyan -o short -l warn
dev:
	browser-refresh | bunyan -o short
start:
	NODE_ENV=production node server.js | bunyan -o short

.PHONY: test dev start
