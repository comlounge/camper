VERSION=2.0.0
CSS = ./../static/css/main.css
PRINT_CSS = ./../static/css/rechnung.css
CSS_MIN = ./../static/css/main.min.css
CSS_LESS = ./main.less
PRINT_LESS = ./rechnung.less
LESS_COMPESSOR ?= `which lessc`
UGLIFY_JS ?= `which uglifyjs`
WATCHR ?= `which watchr`

build:
	@@if test ! -z ${LESS_COMPESSOR}; then \
		lessc ${CSS_LESS} > ${CSS}; \
		lessc ${CSS_LESS} > ${CSS_MIN} --compress; \
		echo "CSS successfully built! - `date`"; \
	else \
		echo "You must have the LESS compiler installed in order to build the CSS."; \
		echo "You can install it by running: npm install less -g"; \
	fi

watch:
	@@if test ! -z ${WATCHR}; then \
	  echo "Watching less files..."; \
	  watchr -e "watch('.*\.less') { system 'make' }"; \
	else \
		echo "You must have the watchr installed in order to watch Bootstrap Less files."; \
		echo "You can install it by running: gem install watchr"; \
	fi

.PHONY: build watch
