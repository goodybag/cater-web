export PATH := ./node_modules/.bin:$(PATH)
export SHELL := /usr/bin/env bash

COMMON_MODULES=react react-dom lodash react-intl bluebird react-addons-css-transition-group react-addons-transition-group superagent classnames moment-timezone @goodybag/react-pickadate nagoya hiroshima tokyo yokohama link-delegate flux

OUTPUT_DIR=dist
ASSETS_DIR=$(OUTPUT_DIR)/build
SOURCE_DIR=app
PUBLIC_DIRS=public node_modules/diet-tags/img
STYLES_DIR=$(SOURCE_DIR)/styles
BUILD_DIR=$(OUTPUT_DIR)/src
FINAL_DIR=$(OUTPUT_DIR)/final
SOURCE_ENTRY=$(SOURCE_DIR)/main.js
STYLES_ENTRY=$(STYLES_DIR)/main.less
STYLES_FILES=$(shell find $(STYLES_DIR) -name \*.less)
SOURCE_FILES=$(shell find $(SOURCE_DIR) -name \*.js)
STATIC_FILES=$(foreach PUBLIC_DIR,$(PUBLIC_DIRS),$(foreach PUBLIC_FILE,$(shell find $(PUBLIC_DIR) -type f),$(PUBLIC_FILE:$(PUBLIC_DIR)/%=$(ASSETS_DIR)/%)))
BUILD_FILES=$(SOURCE_FILES:$(SOURCE_DIR)%=$(BUILD_DIR)%)

ASSET_FILES=$(ASSETS_DIR)/bundle.js \
			$(ASSETS_DIR)/common.js \
			$(ASSETS_DIR)/main.css \
			$(STATIC_FILES)

FINAL_FILES=$(FINAL_DIR)/runtime.js \
			$(FINAL_DIR)/main.css \
			$(STATIC_FILES:$(ASSETS_DIR)%=$(FINAL_DIR)%)

all: node_modules assets build

static: $(STATIC_FILES)
assets: $(ASSET_FILES)
build: $(BUILD_FILES)
final: assets build $(FINAL_FILES) $(FINAL_FILES:%=%.gz)
styles: $(ASSETS_DIR)/main.css

watch: watch-bundle watch-common watch-source watch-styles

watch-styles:
	@mkdir -p $(ASSETS_DIR)
	@nodemon -w $(STYLES_DIR) -e less --exec "make styles"

watch-source:
	babel -w $(SOURCE_DIR) -d $(BUILD_DIR)

watch-bundle:
	@mkdir -p $(ASSETS_DIR)
	@watchify \
		$(SOURCE_ENTRY) \
		--debug \
		--verbose \
		$(foreach module,$(COMMON_MODULES),--external $(module)) \
		-o $(ASSETS_DIR)/bundle.js

watch-common:
	@mkdir -p $(ASSETS_DIR)
	@watchify \
		--debug \
		--verbose \
		--ignore-watch="" \
		$(foreach module,$(COMMON_MODULES),-r $(module)) \
		-o $(ASSETS_DIR)/common.js

clean:
	rm -rf $(OUTPUT_DIR)

$(BUILD_FILES): $(BUILD_DIR)

$(BUILD_DIR): $(SOURCE_FILES) node_modules
	babel -q $(SOURCE_DIR) -d $(BUILD_DIR)

$(ASSETS_DIR) $(OUTPUT_DIR):
	mkdir -p $@

$(ASSETS_DIR)/bundle.js: $(SOURCE_FILES) node_modules
	@mkdir -p "$(@D)"
	@echo "browserify $(SOURCE_ENTRY) > $@"
	@browserify -d $(SOURCE_ENTRY) $(foreach module,$(COMMON_MODULES),-x $(module)) > $@

$(ASSETS_DIR)/common.js: $(wildcard node_modules/**/*.js) node_modules
	@mkdir -p "$(@D)"
	browserify -d $(foreach module,$(COMMON_MODULES),-r $(module)) > $@

$(ASSETS_DIR)/runtime.js: $(SOURCE_FILES) node_modules
	@mkdir -p "$(@D)"
	NODE_ENV=production browserify $(SOURCE_ENTRY) > $@

$(ASSETS_DIR)/main.css: $(STYLES_FILES) node_modules
	@mkdir -p "$(@D)"
	lessc --source-map-less-inline --source-map-map-inline --npm-import="prefix=~" $(STYLES_ENTRY) $@

.SECONDEXPANSION:
$(ASSETS_DIR)/%: $(wildcard $(foreach PUBLIC_DIR,$(PUBLIC_DIRS),$(PUBLIC_DIR)/$$*))
	@mkdir -p $(@D)
	cp $(wildcard $(foreach PUBLIC_DIR,$(PUBLIC_DIRS),$(PUBLIC_DIR)/$*)) $@

$(FINAL_DIR)/%.js: $(ASSETS_DIR)/%.js node_modules
	@mkdir -p "$(@D)"
	@#uglifyjs -m -c warnings=false < $< > $@
	cp $< $@

$(FINAL_DIR)/%.css: $(ASSETS_DIR)/%.css node_modules
	@mkdir -p "$(@D)"
	cssnano $^ > $@

$(FINAL_DIR)/%.gz: $(FINAL_DIR)/%
	gzip -kf $<

$(FINAL_DIR)/%: $(ASSETS_DIR)/%
	@mkdir -p "$(@D)"
	cp $< $@

node_modules:
	npm install --ignore-scripts

.DELETE_ON_ERROR:
