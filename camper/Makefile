build:
	pybabel extract -F babel.cfg -k T -o messages.pot . 
	pybabel update -i messages.pot -d translations
	pybabel compile -d translations
compile:
	pybabel compile -d translations
js:
	pybabel extract -F babel_js.cfg -k T -o jsmessages.pot . 
	pybabel update -i jsmessages.pot -d translations -D js
	pybabel compile -d translations -D js
	./node_modules/po2json/bin/po2json translations/de/LC_MESSAGES/js.po -d js -f jed1.x static/js/camper-de.json
	./node_modules/po2json/bin/po2json translations/en/LC_MESSAGES/js.po -d js -f jed1.x static/js/camper-en.json
init:
	pybabel init -i jsmessages.pot -d translations -D js -l de
	pybabel init -i jsmessages.pot -d translations -D js -l en
