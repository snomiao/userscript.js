// ==UserScript==
// @name             testing-library-user-event
// @namespace        https://userscript.snomiao.com/
// @version          0.1.0
// @description      Google日历键盘键盘操作，功能：Alt+hjkl 移动日程
// @author           snomiao@gmail.com
// @match            *://*/*
// @grant            none
// @contributionURL  https://snomiao.com/donate
// @supportURL       https://github.com/snomiao/userscript.js/issues
// ==/UserScript==
"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // ../node_modules/.pnpm/ansi-styles@5.2.0/node_modules/ansi-styles/index.js
  var require_ansi_styles = __commonJS({
    "../node_modules/.pnpm/ansi-styles@5.2.0/node_modules/ansi-styles/index.js"(exports, module2) {
      "use strict";
      var ANSI_BACKGROUND_OFFSET = 10;
      var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
      var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
      function assembleStyles() {
        const codes = /* @__PURE__ */ new Map();
        const styles = {
          modifier: {
            reset: [0, 0],
            // 21 isn't widely supported and 22 does the same thing
            bold: [1, 22],
            dim: [2, 22],
            italic: [3, 23],
            underline: [4, 24],
            overline: [53, 55],
            inverse: [7, 27],
            hidden: [8, 28],
            strikethrough: [9, 29]
          },
          color: {
            black: [30, 39],
            red: [31, 39],
            green: [32, 39],
            yellow: [33, 39],
            blue: [34, 39],
            magenta: [35, 39],
            cyan: [36, 39],
            white: [37, 39],
            // Bright color
            blackBright: [90, 39],
            redBright: [91, 39],
            greenBright: [92, 39],
            yellowBright: [93, 39],
            blueBright: [94, 39],
            magentaBright: [95, 39],
            cyanBright: [96, 39],
            whiteBright: [97, 39]
          },
          bgColor: {
            bgBlack: [40, 49],
            bgRed: [41, 49],
            bgGreen: [42, 49],
            bgYellow: [43, 49],
            bgBlue: [44, 49],
            bgMagenta: [45, 49],
            bgCyan: [46, 49],
            bgWhite: [47, 49],
            // Bright color
            bgBlackBright: [100, 49],
            bgRedBright: [101, 49],
            bgGreenBright: [102, 49],
            bgYellowBright: [103, 49],
            bgBlueBright: [104, 49],
            bgMagentaBright: [105, 49],
            bgCyanBright: [106, 49],
            bgWhiteBright: [107, 49]
          }
        };
        styles.color.gray = styles.color.blackBright;
        styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
        styles.color.grey = styles.color.blackBright;
        styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
        for (const [groupName, group] of Object.entries(styles)) {
          for (const [styleName, style] of Object.entries(group)) {
            styles[styleName] = {
              open: `\x1B[${style[0]}m`,
              close: `\x1B[${style[1]}m`
            };
            group[styleName] = styles[styleName];
            codes.set(style[0], style[1]);
          }
          Object.defineProperty(styles, groupName, {
            value: group,
            enumerable: false
          });
        }
        Object.defineProperty(styles, "codes", {
          value: codes,
          enumerable: false
        });
        styles.color.close = "\x1B[39m";
        styles.bgColor.close = "\x1B[49m";
        styles.color.ansi256 = wrapAnsi256();
        styles.color.ansi16m = wrapAnsi16m();
        styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
        styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
        Object.defineProperties(styles, {
          rgbToAnsi256: {
            value: (red, green, blue) => {
              if (red === green && green === blue) {
                if (red < 8) {
                  return 16;
                }
                if (red > 248) {
                  return 231;
                }
                return Math.round((red - 8) / 247 * 24) + 232;
              }
              return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
            },
            enumerable: false
          },
          hexToRgb: {
            value: (hex) => {
              const matches2 = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(hex.toString(16));
              if (!matches2) {
                return [0, 0, 0];
              }
              let { colorString } = matches2.groups;
              if (colorString.length === 3) {
                colorString = colorString.split("").map((character) => character + character).join("");
              }
              const integer = Number.parseInt(colorString, 16);
              return [
                integer >> 16 & 255,
                integer >> 8 & 255,
                integer & 255
              ];
            },
            enumerable: false
          },
          hexToAnsi256: {
            value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
            enumerable: false
          }
        });
        return styles;
      }
      Object.defineProperty(module2, "exports", {
        enumerable: true,
        get: assembleStyles
      });
    }
  });

  // ../node_modules/.pnpm/pretty-format@27.5.1/node_modules/pretty-format/build/collections.js
  var require_collections = __commonJS({
    "../node_modules/.pnpm/pretty-format@27.5.1/node_modules/pretty-format/build/collections.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.printIteratorEntries = printIteratorEntries;
      exports.printIteratorValues = printIteratorValues;
      exports.printListItems = printListItems;
      exports.printObjectProperties = printObjectProperties;
      var getKeysOfEnumerableProperties = (object, compareKeys) => {
        const keys = Object.keys(object).sort(compareKeys);
        if (Object.getOwnPropertySymbols) {
          Object.getOwnPropertySymbols(object).forEach((symbol) => {
            if (Object.getOwnPropertyDescriptor(object, symbol).enumerable) {
              keys.push(symbol);
            }
          });
        }
        return keys;
      };
      function printIteratorEntries(iterator, config2, indentation, depth, refs, printer, separator = ": ") {
        let result = "";
        let current = iterator.next();
        if (!current.done) {
          result += config2.spacingOuter;
          const indentationNext = indentation + config2.indent;
          while (!current.done) {
            const name = printer(
              current.value[0],
              config2,
              indentationNext,
              depth,
              refs
            );
            const value = printer(
              current.value[1],
              config2,
              indentationNext,
              depth,
              refs
            );
            result += indentationNext + name + separator + value;
            current = iterator.next();
            if (!current.done) {
              result += "," + config2.spacingInner;
            } else if (!config2.min) {
              result += ",";
            }
          }
          result += config2.spacingOuter + indentation;
        }
        return result;
      }
      function printIteratorValues(iterator, config2, indentation, depth, refs, printer) {
        let result = "";
        let current = iterator.next();
        if (!current.done) {
          result += config2.spacingOuter;
          const indentationNext = indentation + config2.indent;
          while (!current.done) {
            result += indentationNext + printer(current.value, config2, indentationNext, depth, refs);
            current = iterator.next();
            if (!current.done) {
              result += "," + config2.spacingInner;
            } else if (!config2.min) {
              result += ",";
            }
          }
          result += config2.spacingOuter + indentation;
        }
        return result;
      }
      function printListItems(list, config2, indentation, depth, refs, printer) {
        let result = "";
        if (list.length) {
          result += config2.spacingOuter;
          const indentationNext = indentation + config2.indent;
          for (let i = 0; i < list.length; i++) {
            result += indentationNext;
            if (i in list) {
              result += printer(list[i], config2, indentationNext, depth, refs);
            }
            if (i < list.length - 1) {
              result += "," + config2.spacingInner;
            } else if (!config2.min) {
              result += ",";
            }
          }
          result += config2.spacingOuter + indentation;
        }
        return result;
      }
      function printObjectProperties(val, config2, indentation, depth, refs, printer) {
        let result = "";
        const keys = getKeysOfEnumerableProperties(val, config2.compareKeys);
        if (keys.length) {
          result += config2.spacingOuter;
          const indentationNext = indentation + config2.indent;
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const name = printer(key, config2, indentationNext, depth, refs);
            const value = printer(val[key], config2, indentationNext, depth, refs);
            result += indentationNext + name + ": " + value;
            if (i < keys.length - 1) {
              result += "," + config2.spacingInner;
            } else if (!config2.min) {
              result += ",";
            }
          }
          result += config2.spacingOuter + indentation;
        }
        return result;
      }
    }
  });

  // ../node_modules/.pnpm/pretty-format@27.5.1/node_modules/pretty-format/build/plugins/AsymmetricMatcher.js
  var require_AsymmetricMatcher = __commonJS({
    "../node_modules/.pnpm/pretty-format@27.5.1/node_modules/pretty-format/build/plugins/AsymmetricMatcher.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.test = exports.serialize = exports.default = void 0;
      var _collections = require_collections();
      var global2 = function() {
        if (typeof globalThis !== "undefined") {
          return globalThis;
        } else if (typeof global2 !== "undefined") {
          return global2;
        } else if (typeof self !== "undefined") {
          return self;
        } else if (typeof window !== "undefined") {
          return window;
        } else {
          return Function("return this")();
        }
      }();
      var Symbol2 = global2["jest-symbol-do-not-touch"] || global2.Symbol;
      var asymmetricMatcher = typeof Symbol2 === "function" && Symbol2.for ? Symbol2.for("jest.asymmetricMatcher") : 1267621;
      var SPACE = " ";
      var serialize = (val, config2, indentation, depth, refs, printer) => {
        const stringedValue = val.toString();
        if (stringedValue === "ArrayContaining" || stringedValue === "ArrayNotContaining") {
          if (++depth > config2.maxDepth) {
            return "[" + stringedValue + "]";
          }
          return stringedValue + SPACE + "[" + (0, _collections.printListItems)(
            val.sample,
            config2,
            indentation,
            depth,
            refs,
            printer
          ) + "]";
        }
        if (stringedValue === "ObjectContaining" || stringedValue === "ObjectNotContaining") {
          if (++depth > config2.maxDepth) {
            return "[" + stringedValue + "]";
          }
          return stringedValue + SPACE + "{" + (0, _collections.printObjectProperties)(
            val.sample,
            config2,
            indentation,
            depth,
            refs,
            printer
          ) + "}";
        }
        if (stringedValue === "StringMatching" || stringedValue === "StringNotMatching") {
          return stringedValue + SPACE + printer(val.sample, config2, indentation, depth, refs);
        }
        if (stringedValue === "StringContaining" || stringedValue === "StringNotContaining") {
          return stringedValue + SPACE + printer(val.sample, config2, indentation, depth, refs);
        }
        return val.toAsymmetricMatcher();
      };
      exports.serialize = serialize;
      var test = (val) => val && val.$$typeof === asymmetricMatcher;
      exports.test = test;
      var plugin = {
        serialize,
        test
      };
      var _default = plugin;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/ansi-regex@5.0.1/node_modules/ansi-regex/index.js
  var require_ansi_regex = __commonJS({
    "../node_modules/.pnpm/ansi-regex@5.0.1/node_modules/ansi-regex/index.js"(exports, module2) {
      "use strict";
      module2.exports = ({ onlyFirst = false } = {}) => {
        const pattern = [
          "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
          "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
        ].join("|");
        return new RegExp(pattern, onlyFirst ? void 0 : "g");
      };
    }
  });

  // ../node_modules/.pnpm/pretty-format@27.5.1/node_modules/pretty-format/build/plugins/ConvertAnsi.js
  var require_ConvertAnsi = __commonJS({
    "../node_modules/.pnpm/pretty-format@27.5.1/node_modules/pretty-format/build/plugins/ConvertAnsi.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.test = exports.serialize = exports.default = void 0;
      var _ansiRegex = _interopRequireDefault(require_ansi_regex());
      var _ansiStyles = _interopRequireDefault(require_ansi_styles());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var toHumanReadableAnsi = (text) => text.replace((0, _ansiRegex.default)(), (match) => {
        switch (match) {
          case _ansiStyles.default.red.close:
          case _ansiStyles.default.green.close:
          case _ansiStyles.default.cyan.close:
          case _ansiStyles.default.gray.close:
          case _ansiStyles.default.white.close:
          case _ansiStyles.default.yellow.close:
          case _ansiStyles.default.bgRed.close:
          case _ansiStyles.default.bgGreen.close:
          case _ansiStyles.default.bgYellow.close:
          case _ansiStyles.default.inverse.close:
          case _ansiStyles.default.dim.close:
          case _ansiStyles.default.bold.close:
          case _ansiStyles.default.reset.open:
          case _ansiStyles.default.reset.close:
            return "</>";
          case _ansiStyles.default.red.open:
            return "<red>";
          case _ansiStyles.default.green.open:
            return "<green>";
          case _ansiStyles.default.cyan.open:
            return "<cyan>";
          case _ansiStyles.default.gray.open:
            return "<gray>";
          case _ansiStyles.default.white.open:
            return "<white>";
          case _ansiStyles.default.yellow.open:
            return "<yellow>";
          case _ansiStyles.default.bgRed.open:
            return "<bgRed>";
          case _ansiStyles.default.bgGreen.open:
            return "<bgGreen>";
          case _ansiStyles.default.bgYellow.open:
            return "<bgYellow>";
          case _ansiStyles.default.inverse.open:
            return "<inverse>";
          case _ansiStyles.default.dim.open:
            return "<dim>";
          case _ansiStyles.default.bold.open:
            return "<bold>";
          default:
            return "";
        }
      });
      var test = (val) => typeof val === "string" && !!val.match((0, _ansiRegex.default)());
      exports.test = test;
      var serialize = (val, config2, indentation, depth, refs, printer) => printer(toHumanReadableAnsi(val), config2, indentation, depth, refs);
      exports.serialize = serialize;
      var plugin = {
        serialize,
        test
      };
      var _default = plugin;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/pretty-format@27.5.1/node_modules/pretty-format/build/plugins/DOMCollection.js
  var require_DOMCollection = __commonJS({
    "../node_modules/.pnpm/pretty-format@27.5.1/node_modules/pretty-format/build/plugins/DOMCollection.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.test = exports.serialize = exports.default = void 0;
      var _collections = require_collections();
      var SPACE = " ";
      var OBJECT_NAMES = ["DOMStringMap", "NamedNodeMap"];
      var ARRAY_REGEXP = /^(HTML\w*Collection|NodeList)$/;
      var testName = (name) => OBJECT_NAMES.indexOf(name) !== -1 || ARRAY_REGEXP.test(name);
      var test = (val) => val && val.constructor && !!val.constructor.name && testName(val.constructor.name);
      exports.test = test;
      var isNamedNodeMap = (collection) => collection.constructor.name === "NamedNodeMap";
      var serialize = (collection, config2, indentation, depth, refs, printer) => {
        const name = collection.constructor.name;
        if (++depth > config2.maxDepth) {
          return "[" + name + "]";
        }
        return (config2.min ? "" : name + SPACE) + (OBJECT_NAMES.indexOf(name) !== -1 ? "{" + (0, _collections.printObjectProperties)(
          isNamedNodeMap(collection) ? Array.from(collection).reduce((props, attribute) => {
            props[attribute.name] = attribute.value;
            return props;
          }, {}) : { ...collection },
          config2,
          indentation,
          depth,
          refs,
          printer
        ) + "}" : "[" + (0, _collections.printListItems)(
          Array.from(collection),
          config2,
          indentation,
          depth,
          refs,
          printer
        ) + "]");
      };
      exports.serialize = serialize;
      var plugin = {
        serialize,
        test
      };
      var _default = plugin;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/pretty-format@27.5.1/node_modules/pretty-format/build/plugins/lib/escapeHTML.js
  var require_escapeHTML = __commonJS({
    "../node_modules/.pnpm/pretty-format@27.5.1/node_modules/pretty-format/build/plugins/lib/escapeHTML.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = escapeHTML2;
      function escapeHTML2(str) {
        return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }
    }
  });

  // ../node_modules/.pnpm/pretty-format@27.5.1/node_modules/pretty-format/build/plugins/lib/markup.js
  var require_markup = __commonJS({
    "../node_modules/.pnpm/pretty-format@27.5.1/node_modules/pretty-format/build/plugins/lib/markup.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.printText = exports.printProps = exports.printElementAsLeaf = exports.printElement = exports.printComment = exports.printChildren = void 0;
      var _escapeHTML = _interopRequireDefault(require_escapeHTML());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var printProps2 = (keys, props, config2, indentation, depth, refs, printer) => {
        const indentationNext = indentation + config2.indent;
        const colors = config2.colors;
        return keys.map((key) => {
          const value = props[key];
          let printed = printer(value, config2, indentationNext, depth, refs);
          if (typeof value !== "string") {
            if (printed.indexOf("\n") !== -1) {
              printed = config2.spacingOuter + indentationNext + printed + config2.spacingOuter + indentation;
            }
            printed = "{" + printed + "}";
          }
          return config2.spacingInner + indentation + colors.prop.open + key + colors.prop.close + "=" + colors.value.open + printed + colors.value.close;
        }).join("");
      };
      exports.printProps = printProps2;
      var printChildren2 = (children, config2, indentation, depth, refs, printer) => children.map(
        (child) => config2.spacingOuter + indentation + (typeof child === "string" ? printText2(child, config2) : printer(child, config2, indentation, depth, refs))
      ).join("");
      exports.printChildren = printChildren2;
      var printText2 = (text, config2) => {
        const contentColor = config2.colors.content;
        return contentColor.open + (0, _escapeHTML.default)(text) + contentColor.close;
      };
      exports.printText = printText2;
      var printComment2 = (comment, config2) => {
        const commentColor = config2.colors.comment;
        return commentColor.open + "<!--" + (0, _escapeHTML.default)(comment) + "-->" + commentColor.close;
      };
      exports.printComment = printComment2;
      var printElement2 = (type3, printedProps, printedChildren, config2, indentation) => {
        const tagColor = config2.colors.tag;
        return tagColor.open + "<" + type3 + (printedProps && tagColor.close + printedProps + config2.spacingOuter + indentation + tagColor.open) + (printedChildren ? ">" + tagColor.close + printedChildren + config2.spacingOuter + indentation + tagColor.open + "</" + type3 : (printedProps && !config2.min ? "" : " ") + "/") + ">" + tagColor.close;
      };
      exports.printElement = printElement2;
      var printElementAsLeaf2 = (type3, config2) => {
        const tagColor = config2.colors.tag;
        return tagColor.open + "<" + type3 + tagColor.close + " \u2026" + tagColor.open + " />" + tagColor.close;
      };
      exports.printElementAsLeaf = printElementAsLeaf2;
    }
  });

  // ../node_modules/.pnpm/pretty-format@27.5.1/node_modules/pretty-format/build/plugins/DOMElement.js
  var require_DOMElement = __commonJS({
    "../node_modules/.pnpm/pretty-format@27.5.1/node_modules/pretty-format/build/plugins/DOMElement.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.test = exports.serialize = exports.default = void 0;
      var _markup = require_markup();
      var ELEMENT_NODE2 = 1;
      var TEXT_NODE2 = 3;
      var COMMENT_NODE2 = 8;
      var FRAGMENT_NODE2 = 11;
      var ELEMENT_REGEXP2 = /^((HTML|SVG)\w*)?Element$/;
      var testHasAttribute = (val) => {
        try {
          return typeof val.hasAttribute === "function" && val.hasAttribute("is");
        } catch {
          return false;
        }
      };
      var testNode2 = (val) => {
        const constructorName = val.constructor.name;
        const { nodeType, tagName } = val;
        const isCustomElement = typeof tagName === "string" && tagName.includes("-") || testHasAttribute(val);
        return nodeType === ELEMENT_NODE2 && (ELEMENT_REGEXP2.test(constructorName) || isCustomElement) || nodeType === TEXT_NODE2 && constructorName === "Text" || nodeType === COMMENT_NODE2 && constructorName === "Comment" || nodeType === FRAGMENT_NODE2 && constructorName === "DocumentFragment";
      };
      var test = (val) => {
        var _val$constructor;
        return (val === null || val === void 0 ? void 0 : (_val$constructor = val.constructor) === null || _val$constructor === void 0 ? void 0 : _val$constructor.name) && testNode2(val);
      };
      exports.test = test;
      function nodeIsText2(node) {
        return node.nodeType === TEXT_NODE2;
      }
      function nodeIsComment2(node) {
        return node.nodeType === COMMENT_NODE2;
      }
      function nodeIsFragment2(node) {
        return node.nodeType === FRAGMENT_NODE2;
      }
      var serialize = (node, config2, indentation, depth, refs, printer) => {
        if (nodeIsText2(node)) {
          return (0, _markup.printText)(node.data, config2);
        }
        if (nodeIsComment2(node)) {
          return (0, _markup.printComment)(node.data, config2);
        }
        const type3 = nodeIsFragment2(node) ? "DocumentFragment" : node.tagName.toLowerCase();
        if (++depth > config2.maxDepth) {
          return (0, _markup.printElementAsLeaf)(type3, config2);
        }
        return (0, _markup.printElement)(
          type3,
          (0, _markup.printProps)(
            nodeIsFragment2(node) ? [] : Array.from(node.attributes).map((attr) => attr.name).sort(),
            nodeIsFragment2(node) ? {} : Array.from(node.attributes).reduce((props, attribute) => {
              props[attribute.name] = attribute.value;
              return props;
            }, {}),
            config2,
            indentation + config2.indent,
            depth,
            refs,
            printer
          ),
          (0, _markup.printChildren)(
            Array.prototype.slice.call(node.childNodes || node.children),
            config2,
            indentation + config2.indent,
            depth,
            refs,
            printer
          ),
          config2,
          indentation
        );
      };
      exports.serialize = serialize;
      var plugin = {
        serialize,
        test
      };
      var _default = plugin;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/pretty-format@27.5.1/node_modules/pretty-format/build/plugins/Immutable.js
  var require_Immutable = __commonJS({
    "../node_modules/.pnpm/pretty-format@27.5.1/node_modules/pretty-format/build/plugins/Immutable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.test = exports.serialize = exports.default = void 0;
      var _collections = require_collections();
      var IS_ITERABLE_SENTINEL = "@@__IMMUTABLE_ITERABLE__@@";
      var IS_LIST_SENTINEL = "@@__IMMUTABLE_LIST__@@";
      var IS_KEYED_SENTINEL = "@@__IMMUTABLE_KEYED__@@";
      var IS_MAP_SENTINEL = "@@__IMMUTABLE_MAP__@@";
      var IS_ORDERED_SENTINEL = "@@__IMMUTABLE_ORDERED__@@";
      var IS_RECORD_SENTINEL = "@@__IMMUTABLE_RECORD__@@";
      var IS_SEQ_SENTINEL = "@@__IMMUTABLE_SEQ__@@";
      var IS_SET_SENTINEL = "@@__IMMUTABLE_SET__@@";
      var IS_STACK_SENTINEL = "@@__IMMUTABLE_STACK__@@";
      var getImmutableName = (name) => "Immutable." + name;
      var printAsLeaf = (name) => "[" + name + "]";
      var SPACE = " ";
      var LAZY = "\u2026";
      var printImmutableEntries = (val, config2, indentation, depth, refs, printer, type3) => ++depth > config2.maxDepth ? printAsLeaf(getImmutableName(type3)) : getImmutableName(type3) + SPACE + "{" + (0, _collections.printIteratorEntries)(
        val.entries(),
        config2,
        indentation,
        depth,
        refs,
        printer
      ) + "}";
      function getRecordEntries(val) {
        let i = 0;
        return {
          next() {
            if (i < val._keys.length) {
              const key = val._keys[i++];
              return {
                done: false,
                value: [key, val.get(key)]
              };
            }
            return {
              done: true,
              value: void 0
            };
          }
        };
      }
      var printImmutableRecord = (val, config2, indentation, depth, refs, printer) => {
        const name = getImmutableName(val._name || "Record");
        return ++depth > config2.maxDepth ? printAsLeaf(name) : name + SPACE + "{" + (0, _collections.printIteratorEntries)(
          getRecordEntries(val),
          config2,
          indentation,
          depth,
          refs,
          printer
        ) + "}";
      };
      var printImmutableSeq = (val, config2, indentation, depth, refs, printer) => {
        const name = getImmutableName("Seq");
        if (++depth > config2.maxDepth) {
          return printAsLeaf(name);
        }
        if (val[IS_KEYED_SENTINEL]) {
          return name + SPACE + "{" + // from Immutable collection of entries or from ECMAScript object
          (val._iter || val._object ? (0, _collections.printIteratorEntries)(
            val.entries(),
            config2,
            indentation,
            depth,
            refs,
            printer
          ) : LAZY) + "}";
        }
        return name + SPACE + "[" + (val._iter || // from Immutable collection of values
        val._array || // from ECMAScript array
        val._collection || // from ECMAScript collection in immutable v4
        val._iterable ? (0, _collections.printIteratorValues)(
          val.values(),
          config2,
          indentation,
          depth,
          refs,
          printer
        ) : LAZY) + "]";
      };
      var printImmutableValues = (val, config2, indentation, depth, refs, printer, type3) => ++depth > config2.maxDepth ? printAsLeaf(getImmutableName(type3)) : getImmutableName(type3) + SPACE + "[" + (0, _collections.printIteratorValues)(
        val.values(),
        config2,
        indentation,
        depth,
        refs,
        printer
      ) + "]";
      var serialize = (val, config2, indentation, depth, refs, printer) => {
        if (val[IS_MAP_SENTINEL]) {
          return printImmutableEntries(
            val,
            config2,
            indentation,
            depth,
            refs,
            printer,
            val[IS_ORDERED_SENTINEL] ? "OrderedMap" : "Map"
          );
        }
        if (val[IS_LIST_SENTINEL]) {
          return printImmutableValues(
            val,
            config2,
            indentation,
            depth,
            refs,
            printer,
            "List"
          );
        }
        if (val[IS_SET_SENTINEL]) {
          return printImmutableValues(
            val,
            config2,
            indentation,
            depth,
            refs,
            printer,
            val[IS_ORDERED_SENTINEL] ? "OrderedSet" : "Set"
          );
        }
        if (val[IS_STACK_SENTINEL]) {
          return printImmutableValues(
            val,
            config2,
            indentation,
            depth,
            refs,
            printer,
            "Stack"
          );
        }
        if (val[IS_SEQ_SENTINEL]) {
          return printImmutableSeq(val, config2, indentation, depth, refs, printer);
        }
        return printImmutableRecord(val, config2, indentation, depth, refs, printer);
      };
      exports.serialize = serialize;
      var test = (val) => val && (val[IS_ITERABLE_SENTINEL] === true || val[IS_RECORD_SENTINEL] === true);
      exports.test = test;
      var plugin = {
        serialize,
        test
      };
      var _default = plugin;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/react-is@17.0.2/node_modules/react-is/cjs/react-is.development.js
  var require_react_is_development = __commonJS({
    "../node_modules/.pnpm/react-is@17.0.2/node_modules/react-is/cjs/react-is.development.js"(exports) {
      "use strict";
      if (true) {
        (function() {
          "use strict";
          var REACT_ELEMENT_TYPE = 60103;
          var REACT_PORTAL_TYPE = 60106;
          var REACT_FRAGMENT_TYPE = 60107;
          var REACT_STRICT_MODE_TYPE = 60108;
          var REACT_PROFILER_TYPE = 60114;
          var REACT_PROVIDER_TYPE = 60109;
          var REACT_CONTEXT_TYPE = 60110;
          var REACT_FORWARD_REF_TYPE = 60112;
          var REACT_SUSPENSE_TYPE = 60113;
          var REACT_SUSPENSE_LIST_TYPE = 60120;
          var REACT_MEMO_TYPE = 60115;
          var REACT_LAZY_TYPE = 60116;
          var REACT_BLOCK_TYPE = 60121;
          var REACT_SERVER_BLOCK_TYPE = 60122;
          var REACT_FUNDAMENTAL_TYPE = 60117;
          var REACT_SCOPE_TYPE = 60119;
          var REACT_OPAQUE_ID_TYPE = 60128;
          var REACT_DEBUG_TRACING_MODE_TYPE = 60129;
          var REACT_OFFSCREEN_TYPE = 60130;
          var REACT_LEGACY_HIDDEN_TYPE = 60131;
          if (typeof Symbol === "function" && Symbol.for) {
            var symbolFor = Symbol.for;
            REACT_ELEMENT_TYPE = symbolFor("react.element");
            REACT_PORTAL_TYPE = symbolFor("react.portal");
            REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
            REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
            REACT_PROFILER_TYPE = symbolFor("react.profiler");
            REACT_PROVIDER_TYPE = symbolFor("react.provider");
            REACT_CONTEXT_TYPE = symbolFor("react.context");
            REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
            REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
            REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
            REACT_MEMO_TYPE = symbolFor("react.memo");
            REACT_LAZY_TYPE = symbolFor("react.lazy");
            REACT_BLOCK_TYPE = symbolFor("react.block");
            REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
            REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
            REACT_SCOPE_TYPE = symbolFor("react.scope");
            REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
            REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
            REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
            REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
          }
          var enableScopeAPI = false;
          function isValidElementType(type3) {
            if (typeof type3 === "string" || typeof type3 === "function") {
              return true;
            }
            if (type3 === REACT_FRAGMENT_TYPE || type3 === REACT_PROFILER_TYPE || type3 === REACT_DEBUG_TRACING_MODE_TYPE || type3 === REACT_STRICT_MODE_TYPE || type3 === REACT_SUSPENSE_TYPE || type3 === REACT_SUSPENSE_LIST_TYPE || type3 === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
              return true;
            }
            if (typeof type3 === "object" && type3 !== null) {
              if (type3.$$typeof === REACT_LAZY_TYPE || type3.$$typeof === REACT_MEMO_TYPE || type3.$$typeof === REACT_PROVIDER_TYPE || type3.$$typeof === REACT_CONTEXT_TYPE || type3.$$typeof === REACT_FORWARD_REF_TYPE || type3.$$typeof === REACT_FUNDAMENTAL_TYPE || type3.$$typeof === REACT_BLOCK_TYPE || type3[0] === REACT_SERVER_BLOCK_TYPE) {
                return true;
              }
            }
            return false;
          }
          function typeOf(object) {
            if (typeof object === "object" && object !== null) {
              var $$typeof = object.$$typeof;
              switch ($$typeof) {
                case REACT_ELEMENT_TYPE:
                  var type3 = object.type;
                  switch (type3) {
                    case REACT_FRAGMENT_TYPE:
                    case REACT_PROFILER_TYPE:
                    case REACT_STRICT_MODE_TYPE:
                    case REACT_SUSPENSE_TYPE:
                    case REACT_SUSPENSE_LIST_TYPE:
                      return type3;
                    default:
                      var $$typeofType = type3 && type3.$$typeof;
                      switch ($$typeofType) {
                        case REACT_CONTEXT_TYPE:
                        case REACT_FORWARD_REF_TYPE:
                        case REACT_LAZY_TYPE:
                        case REACT_MEMO_TYPE:
                        case REACT_PROVIDER_TYPE:
                          return $$typeofType;
                        default:
                          return $$typeof;
                      }
                  }
                case REACT_PORTAL_TYPE:
                  return $$typeof;
              }
            }
            return void 0;
          }
          var ContextConsumer = REACT_CONTEXT_TYPE;
          var ContextProvider = REACT_PROVIDER_TYPE;
          var Element = REACT_ELEMENT_TYPE;
          var ForwardRef = REACT_FORWARD_REF_TYPE;
          var Fragment = REACT_FRAGMENT_TYPE;
          var Lazy = REACT_LAZY_TYPE;
          var Memo = REACT_MEMO_TYPE;
          var Portal = REACT_PORTAL_TYPE;
          var Profiler = REACT_PROFILER_TYPE;
          var StrictMode = REACT_STRICT_MODE_TYPE;
          var Suspense = REACT_SUSPENSE_TYPE;
          var hasWarnedAboutDeprecatedIsAsyncMode = false;
          var hasWarnedAboutDeprecatedIsConcurrentMode = false;
          function isAsyncMode(object) {
            {
              if (!hasWarnedAboutDeprecatedIsAsyncMode) {
                hasWarnedAboutDeprecatedIsAsyncMode = true;
                console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.");
              }
            }
            return false;
          }
          function isConcurrentMode(object) {
            {
              if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
                hasWarnedAboutDeprecatedIsConcurrentMode = true;
                console["warn"]("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.");
              }
            }
            return false;
          }
          function isContextConsumer(object) {
            return typeOf(object) === REACT_CONTEXT_TYPE;
          }
          function isContextProvider(object) {
            return typeOf(object) === REACT_PROVIDER_TYPE;
          }
          function isElement4(object) {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
          function isForwardRef(object) {
            return typeOf(object) === REACT_FORWARD_REF_TYPE;
          }
          function isFragment(object) {
            return typeOf(object) === REACT_FRAGMENT_TYPE;
          }
          function isLazy(object) {
            return typeOf(object) === REACT_LAZY_TYPE;
          }
          function isMemo(object) {
            return typeOf(object) === REACT_MEMO_TYPE;
          }
          function isPortal(object) {
            return typeOf(object) === REACT_PORTAL_TYPE;
          }
          function isProfiler(object) {
            return typeOf(object) === REACT_PROFILER_TYPE;
          }
          function isStrictMode(object) {
            return typeOf(object) === REACT_STRICT_MODE_TYPE;
          }
          function isSuspense(object) {
            return typeOf(object) === REACT_SUSPENSE_TYPE;
          }
          exports.ContextConsumer = ContextConsumer;
          exports.ContextProvider = ContextProvider;
          exports.Element = Element;
          exports.ForwardRef = ForwardRef;
          exports.Fragment = Fragment;
          exports.Lazy = Lazy;
          exports.Memo = Memo;
          exports.Portal = Portal;
          exports.Profiler = Profiler;
          exports.StrictMode = StrictMode;
          exports.Suspense = Suspense;
          exports.isAsyncMode = isAsyncMode;
          exports.isConcurrentMode = isConcurrentMode;
          exports.isContextConsumer = isContextConsumer;
          exports.isContextProvider = isContextProvider;
          exports.isElement = isElement4;
          exports.isForwardRef = isForwardRef;
          exports.isFragment = isFragment;
          exports.isLazy = isLazy;
          exports.isMemo = isMemo;
          exports.isPortal = isPortal;
          exports.isProfiler = isProfiler;
          exports.isStrictMode = isStrictMode;
          exports.isSuspense = isSuspense;
          exports.isValidElementType = isValidElementType;
          exports.typeOf = typeOf;
        })();
      }
    }
  });

  // ../node_modules/.pnpm/react-is@17.0.2/node_modules/react-is/index.js
  var require_react_is = __commonJS({
    "../node_modules/.pnpm/react-is@17.0.2/node_modules/react-is/index.js"(exports, module2) {
      "use strict";
      if (false) {
        module2.exports = null;
      } else {
        module2.exports = require_react_is_development();
      }
    }
  });

  // ../node_modules/.pnpm/pretty-format@27.5.1/node_modules/pretty-format/build/plugins/ReactElement.js
  var require_ReactElement = __commonJS({
    "../node_modules/.pnpm/pretty-format@27.5.1/node_modules/pretty-format/build/plugins/ReactElement.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.test = exports.serialize = exports.default = void 0;
      var ReactIs = _interopRequireWildcard(require_react_is());
      var _markup = require_markup();
      function _getRequireWildcardCache(nodeInterop) {
        if (typeof WeakMap !== "function")
          return null;
        var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
        var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
        return (_getRequireWildcardCache = function(nodeInterop2) {
          return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
        })(nodeInterop);
      }
      function _interopRequireWildcard(obj, nodeInterop) {
        if (!nodeInterop && obj && obj.__esModule) {
          return obj;
        }
        if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
          return { default: obj };
        }
        var cache = _getRequireWildcardCache(nodeInterop);
        if (cache && cache.has(obj)) {
          return cache.get(obj);
        }
        var newObj = {};
        var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var key in obj) {
          if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
              Object.defineProperty(newObj, key, desc);
            } else {
              newObj[key] = obj[key];
            }
          }
        }
        newObj.default = obj;
        if (cache) {
          cache.set(obj, newObj);
        }
        return newObj;
      }
      var getChildren = (arg, children = []) => {
        if (Array.isArray(arg)) {
          arg.forEach((item) => {
            getChildren(item, children);
          });
        } else if (arg != null && arg !== false) {
          children.push(arg);
        }
        return children;
      };
      var getType = (element) => {
        const type3 = element.type;
        if (typeof type3 === "string") {
          return type3;
        }
        if (typeof type3 === "function") {
          return type3.displayName || type3.name || "Unknown";
        }
        if (ReactIs.isFragment(element)) {
          return "React.Fragment";
        }
        if (ReactIs.isSuspense(element)) {
          return "React.Suspense";
        }
        if (typeof type3 === "object" && type3 !== null) {
          if (ReactIs.isContextProvider(element)) {
            return "Context.Provider";
          }
          if (ReactIs.isContextConsumer(element)) {
            return "Context.Consumer";
          }
          if (ReactIs.isForwardRef(element)) {
            if (type3.displayName) {
              return type3.displayName;
            }
            const functionName = type3.render.displayName || type3.render.name || "";
            return functionName !== "" ? "ForwardRef(" + functionName + ")" : "ForwardRef";
          }
          if (ReactIs.isMemo(element)) {
            const functionName = type3.displayName || type3.type.displayName || type3.type.name || "";
            return functionName !== "" ? "Memo(" + functionName + ")" : "Memo";
          }
        }
        return "UNDEFINED";
      };
      var getPropKeys = (element) => {
        const { props } = element;
        return Object.keys(props).filter((key) => key !== "children" && props[key] !== void 0).sort();
      };
      var serialize = (element, config2, indentation, depth, refs, printer) => ++depth > config2.maxDepth ? (0, _markup.printElementAsLeaf)(getType(element), config2) : (0, _markup.printElement)(
        getType(element),
        (0, _markup.printProps)(
          getPropKeys(element),
          element.props,
          config2,
          indentation + config2.indent,
          depth,
          refs,
          printer
        ),
        (0, _markup.printChildren)(
          getChildren(element.props.children),
          config2,
          indentation + config2.indent,
          depth,
          refs,
          printer
        ),
        config2,
        indentation
      );
      exports.serialize = serialize;
      var test = (val) => val != null && ReactIs.isElement(val);
      exports.test = test;
      var plugin = {
        serialize,
        test
      };
      var _default = plugin;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/pretty-format@27.5.1/node_modules/pretty-format/build/plugins/ReactTestComponent.js
  var require_ReactTestComponent = __commonJS({
    "../node_modules/.pnpm/pretty-format@27.5.1/node_modules/pretty-format/build/plugins/ReactTestComponent.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.test = exports.serialize = exports.default = void 0;
      var _markup = require_markup();
      var global2 = function() {
        if (typeof globalThis !== "undefined") {
          return globalThis;
        } else if (typeof global2 !== "undefined") {
          return global2;
        } else if (typeof self !== "undefined") {
          return self;
        } else if (typeof window !== "undefined") {
          return window;
        } else {
          return Function("return this")();
        }
      }();
      var Symbol2 = global2["jest-symbol-do-not-touch"] || global2.Symbol;
      var testSymbol = typeof Symbol2 === "function" && Symbol2.for ? Symbol2.for("react.test.json") : 245830487;
      var getPropKeys = (object) => {
        const { props } = object;
        return props ? Object.keys(props).filter((key) => props[key] !== void 0).sort() : [];
      };
      var serialize = (object, config2, indentation, depth, refs, printer) => ++depth > config2.maxDepth ? (0, _markup.printElementAsLeaf)(object.type, config2) : (0, _markup.printElement)(
        object.type,
        object.props ? (0, _markup.printProps)(
          getPropKeys(object),
          object.props,
          config2,
          indentation + config2.indent,
          depth,
          refs,
          printer
        ) : "",
        object.children ? (0, _markup.printChildren)(
          object.children,
          config2,
          indentation + config2.indent,
          depth,
          refs,
          printer
        ) : "",
        config2,
        indentation
      );
      exports.serialize = serialize;
      var test = (val) => val && val.$$typeof === testSymbol;
      exports.test = test;
      var plugin = {
        serialize,
        test
      };
      var _default = plugin;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/pretty-format@27.5.1/node_modules/pretty-format/build/index.js
  var require_build = __commonJS({
    "../node_modules/.pnpm/pretty-format@27.5.1/node_modules/pretty-format/build/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = exports.DEFAULT_OPTIONS = void 0;
      exports.format = format2;
      exports.plugins = void 0;
      var _ansiStyles = _interopRequireDefault(require_ansi_styles());
      var _collections = require_collections();
      var _AsymmetricMatcher = _interopRequireDefault(
        require_AsymmetricMatcher()
      );
      var _ConvertAnsi = _interopRequireDefault(require_ConvertAnsi());
      var _DOMCollection = _interopRequireDefault(require_DOMCollection());
      var _DOMElement = _interopRequireDefault(require_DOMElement());
      var _Immutable = _interopRequireDefault(require_Immutable());
      var _ReactElement = _interopRequireDefault(require_ReactElement());
      var _ReactTestComponent = _interopRequireDefault(
        require_ReactTestComponent()
      );
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var toString = Object.prototype.toString;
      var toISOString = Date.prototype.toISOString;
      var errorToString = Error.prototype.toString;
      var regExpToString = RegExp.prototype.toString;
      var getConstructorName = (val) => typeof val.constructor === "function" && val.constructor.name || "Object";
      var isWindow = (val) => typeof window !== "undefined" && val === window;
      var SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
      var NEWLINE_REGEXP = /\n/gi;
      var PrettyFormatPluginError = class extends Error {
        constructor(message, stack) {
          super(message);
          this.stack = stack;
          this.name = this.constructor.name;
        }
      };
      function isToStringedArrayType(toStringed) {
        return toStringed === "[object Array]" || toStringed === "[object ArrayBuffer]" || toStringed === "[object DataView]" || toStringed === "[object Float32Array]" || toStringed === "[object Float64Array]" || toStringed === "[object Int8Array]" || toStringed === "[object Int16Array]" || toStringed === "[object Int32Array]" || toStringed === "[object Uint8Array]" || toStringed === "[object Uint8ClampedArray]" || toStringed === "[object Uint16Array]" || toStringed === "[object Uint32Array]";
      }
      function printNumber(val) {
        return Object.is(val, -0) ? "-0" : String(val);
      }
      function printBigInt(val) {
        return String(`${val}n`);
      }
      function printFunction(val, printFunctionName) {
        if (!printFunctionName) {
          return "[Function]";
        }
        return "[Function " + (val.name || "anonymous") + "]";
      }
      function printSymbol(val) {
        return String(val).replace(SYMBOL_REGEXP, "Symbol($1)");
      }
      function printError(val) {
        return "[" + errorToString.call(val) + "]";
      }
      function printBasicValue(val, printFunctionName, escapeRegex, escapeString) {
        if (val === true || val === false) {
          return "" + val;
        }
        if (val === void 0) {
          return "undefined";
        }
        if (val === null) {
          return "null";
        }
        const typeOf = typeof val;
        if (typeOf === "number") {
          return printNumber(val);
        }
        if (typeOf === "bigint") {
          return printBigInt(val);
        }
        if (typeOf === "string") {
          if (escapeString) {
            return '"' + val.replace(/"|\\/g, "\\$&") + '"';
          }
          return '"' + val + '"';
        }
        if (typeOf === "function") {
          return printFunction(val, printFunctionName);
        }
        if (typeOf === "symbol") {
          return printSymbol(val);
        }
        const toStringed = toString.call(val);
        if (toStringed === "[object WeakMap]") {
          return "WeakMap {}";
        }
        if (toStringed === "[object WeakSet]") {
          return "WeakSet {}";
        }
        if (toStringed === "[object Function]" || toStringed === "[object GeneratorFunction]") {
          return printFunction(val, printFunctionName);
        }
        if (toStringed === "[object Symbol]") {
          return printSymbol(val);
        }
        if (toStringed === "[object Date]") {
          return isNaN(+val) ? "Date { NaN }" : toISOString.call(val);
        }
        if (toStringed === "[object Error]") {
          return printError(val);
        }
        if (toStringed === "[object RegExp]") {
          if (escapeRegex) {
            return regExpToString.call(val).replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
          }
          return regExpToString.call(val);
        }
        if (val instanceof Error) {
          return printError(val);
        }
        return null;
      }
      function printComplexValue(val, config2, indentation, depth, refs, hasCalledToJSON) {
        if (refs.indexOf(val) !== -1) {
          return "[Circular]";
        }
        refs = refs.slice();
        refs.push(val);
        const hitMaxDepth = ++depth > config2.maxDepth;
        const min = config2.min;
        if (config2.callToJSON && !hitMaxDepth && val.toJSON && typeof val.toJSON === "function" && !hasCalledToJSON) {
          return printer(val.toJSON(), config2, indentation, depth, refs, true);
        }
        const toStringed = toString.call(val);
        if (toStringed === "[object Arguments]") {
          return hitMaxDepth ? "[Arguments]" : (min ? "" : "Arguments ") + "[" + (0, _collections.printListItems)(
            val,
            config2,
            indentation,
            depth,
            refs,
            printer
          ) + "]";
        }
        if (isToStringedArrayType(toStringed)) {
          return hitMaxDepth ? "[" + val.constructor.name + "]" : (min ? "" : !config2.printBasicPrototype && val.constructor.name === "Array" ? "" : val.constructor.name + " ") + "[" + (0, _collections.printListItems)(
            val,
            config2,
            indentation,
            depth,
            refs,
            printer
          ) + "]";
        }
        if (toStringed === "[object Map]") {
          return hitMaxDepth ? "[Map]" : "Map {" + (0, _collections.printIteratorEntries)(
            val.entries(),
            config2,
            indentation,
            depth,
            refs,
            printer,
            " => "
          ) + "}";
        }
        if (toStringed === "[object Set]") {
          return hitMaxDepth ? "[Set]" : "Set {" + (0, _collections.printIteratorValues)(
            val.values(),
            config2,
            indentation,
            depth,
            refs,
            printer
          ) + "}";
        }
        return hitMaxDepth || isWindow(val) ? "[" + getConstructorName(val) + "]" : (min ? "" : !config2.printBasicPrototype && getConstructorName(val) === "Object" ? "" : getConstructorName(val) + " ") + "{" + (0, _collections.printObjectProperties)(
          val,
          config2,
          indentation,
          depth,
          refs,
          printer
        ) + "}";
      }
      function isNewPlugin(plugin) {
        return plugin.serialize != null;
      }
      function printPlugin(plugin, val, config2, indentation, depth, refs) {
        let printed;
        try {
          printed = isNewPlugin(plugin) ? plugin.serialize(val, config2, indentation, depth, refs, printer) : plugin.print(
            val,
            (valChild) => printer(valChild, config2, indentation, depth, refs),
            (str) => {
              const indentationNext = indentation + config2.indent;
              return indentationNext + str.replace(NEWLINE_REGEXP, "\n" + indentationNext);
            },
            {
              edgeSpacing: config2.spacingOuter,
              min: config2.min,
              spacing: config2.spacingInner
            },
            config2.colors
          );
        } catch (error) {
          throw new PrettyFormatPluginError(error.message, error.stack);
        }
        if (typeof printed !== "string") {
          throw new Error(
            `pretty-format: Plugin must return type "string" but instead returned "${typeof printed}".`
          );
        }
        return printed;
      }
      function findPlugin(plugins3, val) {
        for (let p = 0; p < plugins3.length; p++) {
          try {
            if (plugins3[p].test(val)) {
              return plugins3[p];
            }
          } catch (error) {
            throw new PrettyFormatPluginError(error.message, error.stack);
          }
        }
        return null;
      }
      function printer(val, config2, indentation, depth, refs, hasCalledToJSON) {
        const plugin = findPlugin(config2.plugins, val);
        if (plugin !== null) {
          return printPlugin(plugin, val, config2, indentation, depth, refs);
        }
        const basicResult = printBasicValue(
          val,
          config2.printFunctionName,
          config2.escapeRegex,
          config2.escapeString
        );
        if (basicResult !== null) {
          return basicResult;
        }
        return printComplexValue(
          val,
          config2,
          indentation,
          depth,
          refs,
          hasCalledToJSON
        );
      }
      var DEFAULT_THEME = {
        comment: "gray",
        content: "reset",
        prop: "yellow",
        tag: "cyan",
        value: "green"
      };
      var DEFAULT_THEME_KEYS = Object.keys(DEFAULT_THEME);
      var DEFAULT_OPTIONS = {
        callToJSON: true,
        compareKeys: void 0,
        escapeRegex: false,
        escapeString: true,
        highlight: false,
        indent: 2,
        maxDepth: Infinity,
        min: false,
        plugins: [],
        printBasicPrototype: true,
        printFunctionName: true,
        theme: DEFAULT_THEME
      };
      exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
      function validateOptions(options) {
        Object.keys(options).forEach((key) => {
          if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
            throw new Error(`pretty-format: Unknown option "${key}".`);
          }
        });
        if (options.min && options.indent !== void 0 && options.indent !== 0) {
          throw new Error(
            'pretty-format: Options "min" and "indent" cannot be used together.'
          );
        }
        if (options.theme !== void 0) {
          if (options.theme === null) {
            throw new Error('pretty-format: Option "theme" must not be null.');
          }
          if (typeof options.theme !== "object") {
            throw new Error(
              `pretty-format: Option "theme" must be of type "object" but instead received "${typeof options.theme}".`
            );
          }
        }
      }
      var getColorsHighlight = (options) => DEFAULT_THEME_KEYS.reduce((colors, key) => {
        const value = options.theme && options.theme[key] !== void 0 ? options.theme[key] : DEFAULT_THEME[key];
        const color = value && _ansiStyles.default[value];
        if (color && typeof color.close === "string" && typeof color.open === "string") {
          colors[key] = color;
        } else {
          throw new Error(
            `pretty-format: Option "theme" has a key "${key}" whose value "${value}" is undefined in ansi-styles.`
          );
        }
        return colors;
      }, /* @__PURE__ */ Object.create(null));
      var getColorsEmpty = () => DEFAULT_THEME_KEYS.reduce((colors, key) => {
        colors[key] = {
          close: "",
          open: ""
        };
        return colors;
      }, /* @__PURE__ */ Object.create(null));
      var getPrintFunctionName = (options) => options && options.printFunctionName !== void 0 ? options.printFunctionName : DEFAULT_OPTIONS.printFunctionName;
      var getEscapeRegex = (options) => options && options.escapeRegex !== void 0 ? options.escapeRegex : DEFAULT_OPTIONS.escapeRegex;
      var getEscapeString = (options) => options && options.escapeString !== void 0 ? options.escapeString : DEFAULT_OPTIONS.escapeString;
      var getConfig5 = (options) => {
        var _options$printBasicPr;
        return {
          callToJSON: options && options.callToJSON !== void 0 ? options.callToJSON : DEFAULT_OPTIONS.callToJSON,
          colors: options && options.highlight ? getColorsHighlight(options) : getColorsEmpty(),
          compareKeys: options && typeof options.compareKeys === "function" ? options.compareKeys : DEFAULT_OPTIONS.compareKeys,
          escapeRegex: getEscapeRegex(options),
          escapeString: getEscapeString(options),
          indent: options && options.min ? "" : createIndent(
            options && options.indent !== void 0 ? options.indent : DEFAULT_OPTIONS.indent
          ),
          maxDepth: options && options.maxDepth !== void 0 ? options.maxDepth : DEFAULT_OPTIONS.maxDepth,
          min: options && options.min !== void 0 ? options.min : DEFAULT_OPTIONS.min,
          plugins: options && options.plugins !== void 0 ? options.plugins : DEFAULT_OPTIONS.plugins,
          printBasicPrototype: (_options$printBasicPr = options === null || options === void 0 ? void 0 : options.printBasicPrototype) !== null && _options$printBasicPr !== void 0 ? _options$printBasicPr : true,
          printFunctionName: getPrintFunctionName(options),
          spacingInner: options && options.min ? " " : "\n",
          spacingOuter: options && options.min ? "" : "\n"
        };
      };
      function createIndent(indent) {
        return new Array(indent + 1).join(" ");
      }
      function format2(val, options) {
        if (options) {
          validateOptions(options);
          if (options.plugins) {
            const plugin = findPlugin(options.plugins, val);
            if (plugin !== null) {
              return printPlugin(plugin, val, getConfig5(options), "", 0, []);
            }
          }
        }
        const basicResult = printBasicValue(
          val,
          getPrintFunctionName(options),
          getEscapeRegex(options),
          getEscapeString(options)
        );
        if (basicResult !== null) {
          return basicResult;
        }
        return printComplexValue(val, getConfig5(options), "", 0, []);
      }
      var plugins2 = {
        AsymmetricMatcher: _AsymmetricMatcher.default,
        ConvertAnsi: _ConvertAnsi.default,
        DOMCollection: _DOMCollection.default,
        DOMElement: _DOMElement.default,
        Immutable: _Immutable.default,
        ReactElement: _ReactElement.default,
        ReactTestComponent: _ReactTestComponent.default
      };
      exports.plugins = plugins2;
      var _default = format2;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/util/iteratorProxy.js
  var require_iteratorProxy = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/util/iteratorProxy.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      function iteratorProxy() {
        var values = this;
        var index = 0;
        var iter = {
          "@@iterator": function iterator() {
            return iter;
          },
          next: function next() {
            if (index < values.length) {
              var value = values[index];
              index = index + 1;
              return {
                done: false,
                value
              };
            } else {
              return {
                done: true
              };
            }
          }
        };
        return iter;
      }
      var _default = iteratorProxy;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/util/iterationDecorator.js
  var require_iterationDecorator = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/util/iterationDecorator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = iterationDecorator;
      var _iteratorProxy = _interopRequireDefault(require_iteratorProxy());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function _typeof3(obj) {
        "@babel/helpers - typeof";
        return _typeof3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
          return typeof obj2;
        } : function(obj2) {
          return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        }, _typeof3(obj);
      }
      function iterationDecorator(collection, entries) {
        if (typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol") {
          Object.defineProperty(collection, Symbol.iterator, {
            value: _iteratorProxy.default.bind(entries)
          });
        }
        return collection;
      }
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/ariaPropsMap.js
  var require_ariaPropsMap = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/ariaPropsMap.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _iterationDecorator = _interopRequireDefault(require_iterationDecorator());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
      }
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _iterableToArrayLimit(arr, i) {
        var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
        if (_i == null)
          return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _s, _e;
        try {
          for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i)
              break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null)
              _i["return"]();
          } finally {
            if (_d)
              throw _e;
          }
        }
        return _arr;
      }
      function _arrayWithHoles(arr) {
        if (Array.isArray(arr))
          return arr;
      }
      function _createForOfIteratorHelper(o, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
        if (!it) {
          if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it)
              o = it;
            var i = 0;
            var F = function F2() {
            };
            return { s: F, n: function n() {
              if (i >= o.length)
                return { done: true };
              return { done: false, value: o[i++] };
            }, e: function e(_e2) {
              throw _e2;
            }, f: F };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var normalCompletion = true, didErr = false, err;
        return { s: function s() {
          it = it.call(o);
        }, n: function n() {
          var step = it.next();
          normalCompletion = step.done;
          return step;
        }, e: function e(_e3) {
          didErr = true;
          err = _e3;
        }, f: function f() {
          try {
            if (!normalCompletion && it.return != null)
              it.return();
          } finally {
            if (didErr)
              throw err;
          }
        } };
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o)
          return;
        if (typeof o === "string")
          return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor)
          n = o.constructor.name;
        if (n === "Map" || n === "Set")
          return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
          return _arrayLikeToArray(o, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length)
          len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      }
      var properties = [["aria-activedescendant", {
        "type": "id"
      }], ["aria-atomic", {
        "type": "boolean"
      }], ["aria-autocomplete", {
        "type": "token",
        "values": ["inline", "list", "both", "none"]
      }], ["aria-busy", {
        "type": "boolean"
      }], ["aria-checked", {
        "type": "tristate"
      }], ["aria-colcount", {
        type: "integer"
      }], ["aria-colindex", {
        type: "integer"
      }], ["aria-colspan", {
        type: "integer"
      }], ["aria-controls", {
        "type": "idlist"
      }], ["aria-current", {
        type: "token",
        values: ["page", "step", "location", "date", "time", true, false]
      }], ["aria-describedby", {
        "type": "idlist"
      }], ["aria-details", {
        "type": "id"
      }], ["aria-disabled", {
        "type": "boolean"
      }], ["aria-dropeffect", {
        "type": "tokenlist",
        "values": ["copy", "execute", "link", "move", "none", "popup"]
      }], ["aria-errormessage", {
        "type": "id"
      }], ["aria-expanded", {
        "type": "boolean",
        "allowundefined": true
      }], ["aria-flowto", {
        "type": "idlist"
      }], ["aria-grabbed", {
        "type": "boolean",
        "allowundefined": true
      }], ["aria-haspopup", {
        "type": "token",
        "values": [false, true, "menu", "listbox", "tree", "grid", "dialog"]
      }], ["aria-hidden", {
        "type": "boolean",
        "allowundefined": true
      }], ["aria-invalid", {
        "type": "token",
        "values": ["grammar", false, "spelling", true]
      }], ["aria-keyshortcuts", {
        type: "string"
      }], ["aria-label", {
        "type": "string"
      }], ["aria-labelledby", {
        "type": "idlist"
      }], ["aria-level", {
        "type": "integer"
      }], ["aria-live", {
        "type": "token",
        "values": ["assertive", "off", "polite"]
      }], ["aria-modal", {
        type: "boolean"
      }], ["aria-multiline", {
        "type": "boolean"
      }], ["aria-multiselectable", {
        "type": "boolean"
      }], ["aria-orientation", {
        "type": "token",
        "values": ["vertical", "undefined", "horizontal"]
      }], ["aria-owns", {
        "type": "idlist"
      }], ["aria-placeholder", {
        type: "string"
      }], ["aria-posinset", {
        "type": "integer"
      }], ["aria-pressed", {
        "type": "tristate"
      }], ["aria-readonly", {
        "type": "boolean"
      }], ["aria-relevant", {
        "type": "tokenlist",
        "values": ["additions", "all", "removals", "text"]
      }], ["aria-required", {
        "type": "boolean"
      }], ["aria-roledescription", {
        type: "string"
      }], ["aria-rowcount", {
        type: "integer"
      }], ["aria-rowindex", {
        type: "integer"
      }], ["aria-rowspan", {
        type: "integer"
      }], ["aria-selected", {
        "type": "boolean",
        "allowundefined": true
      }], ["aria-setsize", {
        "type": "integer"
      }], ["aria-sort", {
        "type": "token",
        "values": ["ascending", "descending", "none", "other"]
      }], ["aria-valuemax", {
        "type": "number"
      }], ["aria-valuemin", {
        "type": "number"
      }], ["aria-valuenow", {
        "type": "number"
      }], ["aria-valuetext", {
        "type": "string"
      }]];
      var ariaPropsMap = {
        entries: function entries() {
          return properties;
        },
        forEach: function forEach(fn) {
          var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
          var _iterator = _createForOfIteratorHelper(properties), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], values = _step$value[1];
              fn.call(thisArg, values, key, properties);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        },
        get: function get(key) {
          var item = properties.find(function(tuple) {
            return tuple[0] === key ? true : false;
          });
          return item && item[1];
        },
        has: function has(key) {
          return !!ariaPropsMap.get(key);
        },
        keys: function keys() {
          return properties.map(function(_ref) {
            var _ref2 = _slicedToArray(_ref, 1), key = _ref2[0];
            return key;
          });
        },
        values: function values() {
          return properties.map(function(_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
            return values2;
          });
        }
      };
      var _default = (0, _iterationDecorator.default)(ariaPropsMap, ariaPropsMap.entries());
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/domMap.js
  var require_domMap = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/domMap.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _iterationDecorator = _interopRequireDefault(require_iterationDecorator());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
      }
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _iterableToArrayLimit(arr, i) {
        var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
        if (_i == null)
          return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _s, _e;
        try {
          for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i)
              break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null)
              _i["return"]();
          } finally {
            if (_d)
              throw _e;
          }
        }
        return _arr;
      }
      function _arrayWithHoles(arr) {
        if (Array.isArray(arr))
          return arr;
      }
      function _createForOfIteratorHelper(o, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
        if (!it) {
          if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it)
              o = it;
            var i = 0;
            var F = function F2() {
            };
            return { s: F, n: function n() {
              if (i >= o.length)
                return { done: true };
              return { done: false, value: o[i++] };
            }, e: function e(_e2) {
              throw _e2;
            }, f: F };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var normalCompletion = true, didErr = false, err;
        return { s: function s() {
          it = it.call(o);
        }, n: function n() {
          var step = it.next();
          normalCompletion = step.done;
          return step;
        }, e: function e(_e3) {
          didErr = true;
          err = _e3;
        }, f: function f() {
          try {
            if (!normalCompletion && it.return != null)
              it.return();
          } finally {
            if (didErr)
              throw err;
          }
        } };
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o)
          return;
        if (typeof o === "string")
          return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor)
          n = o.constructor.name;
        if (n === "Map" || n === "Set")
          return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
          return _arrayLikeToArray(o, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length)
          len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      }
      var dom = [["a", {
        reserved: false
      }], ["abbr", {
        reserved: false
      }], ["acronym", {
        reserved: false
      }], ["address", {
        reserved: false
      }], ["applet", {
        reserved: false
      }], ["area", {
        reserved: false
      }], ["article", {
        reserved: false
      }], ["aside", {
        reserved: false
      }], ["audio", {
        reserved: false
      }], ["b", {
        reserved: false
      }], ["base", {
        reserved: true
      }], ["bdi", {
        reserved: false
      }], ["bdo", {
        reserved: false
      }], ["big", {
        reserved: false
      }], ["blink", {
        reserved: false
      }], ["blockquote", {
        reserved: false
      }], ["body", {
        reserved: false
      }], ["br", {
        reserved: false
      }], ["button", {
        reserved: false
      }], ["canvas", {
        reserved: false
      }], ["caption", {
        reserved: false
      }], ["center", {
        reserved: false
      }], ["cite", {
        reserved: false
      }], ["code", {
        reserved: false
      }], ["col", {
        reserved: true
      }], ["colgroup", {
        reserved: true
      }], ["content", {
        reserved: false
      }], ["data", {
        reserved: false
      }], ["datalist", {
        reserved: false
      }], ["dd", {
        reserved: false
      }], ["del", {
        reserved: false
      }], ["details", {
        reserved: false
      }], ["dfn", {
        reserved: false
      }], ["dialog", {
        reserved: false
      }], ["dir", {
        reserved: false
      }], ["div", {
        reserved: false
      }], ["dl", {
        reserved: false
      }], ["dt", {
        reserved: false
      }], ["em", {
        reserved: false
      }], ["embed", {
        reserved: false
      }], ["fieldset", {
        reserved: false
      }], ["figcaption", {
        reserved: false
      }], ["figure", {
        reserved: false
      }], ["font", {
        reserved: false
      }], ["footer", {
        reserved: false
      }], ["form", {
        reserved: false
      }], ["frame", {
        reserved: false
      }], ["frameset", {
        reserved: false
      }], ["h1", {
        reserved: false
      }], ["h2", {
        reserved: false
      }], ["h3", {
        reserved: false
      }], ["h4", {
        reserved: false
      }], ["h5", {
        reserved: false
      }], ["h6", {
        reserved: false
      }], ["head", {
        reserved: true
      }], ["header", {
        reserved: false
      }], ["hgroup", {
        reserved: false
      }], ["hr", {
        reserved: false
      }], ["html", {
        reserved: true
      }], ["i", {
        reserved: false
      }], ["iframe", {
        reserved: false
      }], ["img", {
        reserved: false
      }], ["input", {
        reserved: false
      }], ["ins", {
        reserved: false
      }], ["kbd", {
        reserved: false
      }], ["keygen", {
        reserved: false
      }], ["label", {
        reserved: false
      }], ["legend", {
        reserved: false
      }], ["li", {
        reserved: false
      }], ["link", {
        reserved: true
      }], ["main", {
        reserved: false
      }], ["map", {
        reserved: false
      }], ["mark", {
        reserved: false
      }], ["marquee", {
        reserved: false
      }], ["menu", {
        reserved: false
      }], ["menuitem", {
        reserved: false
      }], ["meta", {
        reserved: true
      }], ["meter", {
        reserved: false
      }], ["nav", {
        reserved: false
      }], ["noembed", {
        reserved: true
      }], ["noscript", {
        reserved: true
      }], ["object", {
        reserved: false
      }], ["ol", {
        reserved: false
      }], ["optgroup", {
        reserved: false
      }], ["option", {
        reserved: false
      }], ["output", {
        reserved: false
      }], ["p", {
        reserved: false
      }], ["param", {
        reserved: true
      }], ["picture", {
        reserved: true
      }], ["pre", {
        reserved: false
      }], ["progress", {
        reserved: false
      }], ["q", {
        reserved: false
      }], ["rp", {
        reserved: false
      }], ["rt", {
        reserved: false
      }], ["rtc", {
        reserved: false
      }], ["ruby", {
        reserved: false
      }], ["s", {
        reserved: false
      }], ["samp", {
        reserved: false
      }], ["script", {
        reserved: true
      }], ["section", {
        reserved: false
      }], ["select", {
        reserved: false
      }], ["small", {
        reserved: false
      }], ["source", {
        reserved: true
      }], ["spacer", {
        reserved: false
      }], ["span", {
        reserved: false
      }], ["strike", {
        reserved: false
      }], ["strong", {
        reserved: false
      }], ["style", {
        reserved: true
      }], ["sub", {
        reserved: false
      }], ["summary", {
        reserved: false
      }], ["sup", {
        reserved: false
      }], ["table", {
        reserved: false
      }], ["tbody", {
        reserved: false
      }], ["td", {
        reserved: false
      }], ["textarea", {
        reserved: false
      }], ["tfoot", {
        reserved: false
      }], ["th", {
        reserved: false
      }], ["thead", {
        reserved: false
      }], ["time", {
        reserved: false
      }], ["title", {
        reserved: true
      }], ["tr", {
        reserved: false
      }], ["track", {
        reserved: true
      }], ["tt", {
        reserved: false
      }], ["u", {
        reserved: false
      }], ["ul", {
        reserved: false
      }], ["var", {
        reserved: false
      }], ["video", {
        reserved: false
      }], ["wbr", {
        reserved: false
      }], ["xmp", {
        reserved: false
      }]];
      var domMap = {
        entries: function entries() {
          return dom;
        },
        forEach: function forEach(fn) {
          var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
          var _iterator = _createForOfIteratorHelper(dom), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], values = _step$value[1];
              fn.call(thisArg, values, key, dom);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        },
        get: function get(key) {
          var item = dom.find(function(tuple) {
            return tuple[0] === key ? true : false;
          });
          return item && item[1];
        },
        has: function has(key) {
          return !!domMap.get(key);
        },
        keys: function keys() {
          return dom.map(function(_ref) {
            var _ref2 = _slicedToArray(_ref, 1), key = _ref2[0];
            return key;
          });
        },
        values: function values() {
          return dom.map(function(_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
            return values2;
          });
        }
      };
      var _default = (0, _iterationDecorator.default)(domMap, domMap.entries());
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/commandRole.js
  var require_commandRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/commandRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var commandRole = {
        abstract: true,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            name: "menuitem"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "widget"]]
      };
      var _default = commandRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/compositeRole.js
  var require_compositeRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/compositeRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var compositeRole = {
        abstract: true,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-activedescendant": null,
          "aria-disabled": null
        },
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "widget"]]
      };
      var _default = compositeRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/inputRole.js
  var require_inputRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/inputRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var inputRole = {
        abstract: true,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null
        },
        relatedConcepts: [{
          concept: {
            name: "input"
          },
          module: "XForms"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "widget"]]
      };
      var _default = inputRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/landmarkRole.js
  var require_landmarkRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/landmarkRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var landmarkRole = {
        abstract: true,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = landmarkRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/rangeRole.js
  var require_rangeRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/rangeRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var rangeRole = {
        abstract: true,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-valuemax": null,
          "aria-valuemin": null,
          "aria-valuenow": null
        },
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure"]]
      };
      var _default = rangeRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/roletypeRole.js
  var require_roletypeRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/roletypeRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var roletypeRole = {
        abstract: true,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: [],
        prohibitedProps: [],
        props: {
          "aria-atomic": null,
          "aria-busy": null,
          "aria-controls": null,
          "aria-current": null,
          "aria-describedby": null,
          "aria-details": null,
          "aria-dropeffect": null,
          "aria-flowto": null,
          "aria-grabbed": null,
          "aria-hidden": null,
          "aria-keyshortcuts": null,
          "aria-label": null,
          "aria-labelledby": null,
          "aria-live": null,
          "aria-owns": null,
          "aria-relevant": null,
          "aria-roledescription": null
        },
        relatedConcepts: [{
          concept: {
            name: "rel"
          },
          module: "HTML"
        }, {
          concept: {
            name: "role"
          },
          module: "XHTML"
        }, {
          concept: {
            name: "type"
          },
          module: "Dublin Core"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: []
      };
      var _default = roletypeRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/sectionRole.js
  var require_sectionRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/sectionRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var sectionRole = {
        abstract: true,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: [],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            name: "frontmatter"
          },
          module: "DTB"
        }, {
          concept: {
            name: "level"
          },
          module: "DTB"
        }, {
          concept: {
            name: "level"
          },
          module: "SMIL"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure"]]
      };
      var _default = sectionRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/sectionheadRole.js
  var require_sectionheadRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/sectionheadRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var sectionheadRole = {
        abstract: true,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure"]]
      };
      var _default = sectionheadRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/selectRole.js
  var require_selectRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/selectRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var selectRole = {
        abstract: true,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-orientation": null
        },
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "widget", "composite"], ["roletype", "structure", "section", "group"]]
      };
      var _default = selectRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/structureRole.js
  var require_structureRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/structureRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var structureRole = {
        abstract: true,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: [],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype"]]
      };
      var _default = structureRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/widgetRole.js
  var require_widgetRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/widgetRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var widgetRole = {
        abstract: true,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: [],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype"]]
      };
      var _default = widgetRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/windowRole.js
  var require_windowRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/abstract/windowRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var windowRole = {
        abstract: true,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-modal": null
        },
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype"]]
      };
      var _default = windowRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/ariaAbstractRoles.js
  var require_ariaAbstractRoles = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/ariaAbstractRoles.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _commandRole = _interopRequireDefault(require_commandRole());
      var _compositeRole = _interopRequireDefault(require_compositeRole());
      var _inputRole = _interopRequireDefault(require_inputRole());
      var _landmarkRole = _interopRequireDefault(require_landmarkRole());
      var _rangeRole = _interopRequireDefault(require_rangeRole());
      var _roletypeRole = _interopRequireDefault(require_roletypeRole());
      var _sectionRole = _interopRequireDefault(require_sectionRole());
      var _sectionheadRole = _interopRequireDefault(require_sectionheadRole());
      var _selectRole = _interopRequireDefault(require_selectRole());
      var _structureRole = _interopRequireDefault(require_structureRole());
      var _widgetRole = _interopRequireDefault(require_widgetRole());
      var _windowRole = _interopRequireDefault(require_windowRole());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var ariaAbstractRoles = [["command", _commandRole.default], ["composite", _compositeRole.default], ["input", _inputRole.default], ["landmark", _landmarkRole.default], ["range", _rangeRole.default], ["roletype", _roletypeRole.default], ["section", _sectionRole.default], ["sectionhead", _sectionheadRole.default], ["select", _selectRole.default], ["structure", _structureRole.default], ["widget", _widgetRole.default], ["window", _windowRole.default]];
      var _default = ariaAbstractRoles;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/alertRole.js
  var require_alertRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/alertRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var alertRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-atomic": "true",
          "aria-live": "assertive"
        },
        relatedConcepts: [{
          concept: {
            name: "alert"
          },
          module: "XForms"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = alertRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/alertdialogRole.js
  var require_alertdialogRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/alertdialogRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var alertdialogRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            name: "alert"
          },
          module: "XForms"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "alert"], ["roletype", "window", "dialog"]]
      };
      var _default = alertdialogRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/applicationRole.js
  var require_applicationRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/applicationRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var applicationRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-activedescendant": null,
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "Device Independence Delivery Unit"
          }
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure"]]
      };
      var _default = applicationRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/articleRole.js
  var require_articleRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/articleRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var articleRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-posinset": null,
          "aria-setsize": null
        },
        relatedConcepts: [{
          concept: {
            name: "article"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "document"]]
      };
      var _default = articleRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/bannerRole.js
  var require_bannerRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/bannerRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var bannerRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            constraints: ["direct descendant of document"],
            name: "header"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = bannerRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/blockquoteRole.js
  var require_blockquoteRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/blockquoteRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var blockquoteRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = blockquoteRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/buttonRole.js
  var require_buttonRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/buttonRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var buttonRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: true,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-pressed": null
        },
        relatedConcepts: [{
          concept: {
            attributes: [{
              constraints: ["set"],
              name: "aria-pressed"
            }, {
              name: "type",
              value: "checkbox"
            }],
            name: "input"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              name: "aria-expanded",
              value: "false"
            }],
            name: "summary"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              name: "aria-expanded",
              value: "true"
            }],
            constraints: ["direct descendant of details element with the open attribute defined"],
            name: "summary"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              name: "type",
              value: "button"
            }],
            name: "input"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              name: "type",
              value: "image"
            }],
            name: "input"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              name: "type",
              value: "reset"
            }],
            name: "input"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              name: "type",
              value: "submit"
            }],
            name: "input"
          },
          module: "HTML"
        }, {
          concept: {
            name: "button"
          },
          module: "HTML"
        }, {
          concept: {
            name: "trigger"
          },
          module: "XForms"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "widget", "command"]]
      };
      var _default = buttonRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/captionRole.js
  var require_captionRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/captionRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var captionRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["prohibited"],
        prohibitedProps: ["aria-label", "aria-labelledby"],
        props: {},
        relatedConcepts: [],
        requireContextRole: ["figure", "grid", "table"],
        requiredContextRole: ["figure", "grid", "table"],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = captionRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/cellRole.js
  var require_cellRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/cellRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var cellRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {
          "aria-colindex": null,
          "aria-colspan": null,
          "aria-rowindex": null,
          "aria-rowspan": null
        },
        relatedConcepts: [{
          concept: {
            constraints: ["descendant of table"],
            name: "td"
          },
          module: "HTML"
        }],
        requireContextRole: ["row"],
        requiredContextRole: ["row"],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = cellRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/checkboxRole.js
  var require_checkboxRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/checkboxRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var checkboxRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: true,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {
          "aria-checked": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-invalid": null,
          "aria-readonly": null,
          "aria-required": null
        },
        relatedConcepts: [{
          concept: {
            attributes: [{
              name: "type",
              value: "checkbox"
            }],
            name: "input"
          },
          module: "HTML"
        }, {
          concept: {
            name: "option"
          },
          module: "ARIA"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {
          "aria-checked": null
        },
        superClass: [["roletype", "widget", "input"]]
      };
      var _default = checkboxRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/codeRole.js
  var require_codeRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/codeRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var codeRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["prohibited"],
        prohibitedProps: ["aria-label", "aria-labelledby"],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = codeRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/columnheaderRole.js
  var require_columnheaderRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/columnheaderRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var columnheaderRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {
          "aria-sort": null
        },
        relatedConcepts: [{
          attributes: [{
            name: "scope",
            value: "col"
          }],
          concept: {
            name: "th"
          },
          module: "HTML"
        }],
        requireContextRole: ["row"],
        requiredContextRole: ["row"],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "cell"], ["roletype", "structure", "section", "cell", "gridcell"], ["roletype", "widget", "gridcell"], ["roletype", "structure", "sectionhead"]]
      };
      var _default = columnheaderRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/comboboxRole.js
  var require_comboboxRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/comboboxRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var comboboxRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-activedescendant": null,
          "aria-autocomplete": null,
          "aria-errormessage": null,
          "aria-invalid": null,
          "aria-readonly": null,
          "aria-required": null,
          "aria-expanded": "false",
          "aria-haspopup": "listbox"
        },
        relatedConcepts: [{
          concept: {
            attributes: [{
              constraints: ["set"],
              name: "list"
            }, {
              name: "type",
              value: "email"
            }],
            name: "input"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              constraints: ["set"],
              name: "list"
            }, {
              name: "type",
              value: "search"
            }],
            name: "input"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              constraints: ["set"],
              name: "list"
            }, {
              name: "type",
              value: "tel"
            }],
            name: "input"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              constraints: ["set"],
              name: "list"
            }, {
              name: "type",
              value: "text"
            }],
            name: "input"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              constraints: ["set"],
              name: "list"
            }, {
              name: "type",
              value: "url"
            }],
            name: "input"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              constraints: ["set"],
              name: "list"
            }, {
              name: "type",
              value: "url"
            }],
            name: "input"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              constraints: ["undefined"],
              name: "multiple"
            }, {
              constraints: ["undefined"],
              name: "size"
            }],
            name: "select"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              constraints: ["undefined"],
              name: "multiple"
            }, {
              name: "size",
              value: 1
            }],
            name: "select"
          },
          module: "HTML"
        }, {
          concept: {
            name: "select"
          },
          module: "XForms"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {
          "aria-controls": null,
          "aria-expanded": "false"
        },
        superClass: [["roletype", "widget", "input"]]
      };
      var _default = comboboxRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/complementaryRole.js
  var require_complementaryRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/complementaryRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var complementaryRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            name: "aside"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = complementaryRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/contentinfoRole.js
  var require_contentinfoRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/contentinfoRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var contentinfoRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            constraints: ["direct descendant of document"],
            name: "footer"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = contentinfoRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/definitionRole.js
  var require_definitionRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/definitionRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var definitionRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            name: "dd"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = definitionRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/deletionRole.js
  var require_deletionRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/deletionRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var deletionRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["prohibited"],
        prohibitedProps: ["aria-label", "aria-labelledby"],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = deletionRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/dialogRole.js
  var require_dialogRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/dialogRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var dialogRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            name: "dialog"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "window"]]
      };
      var _default = dialogRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/directoryRole.js
  var require_directoryRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/directoryRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var directoryRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          module: "DAISY Guide"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "list"]]
      };
      var _default = directoryRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/documentRole.js
  var require_documentRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/documentRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var documentRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            name: "Device Independence Delivery Unit"
          }
        }, {
          concept: {
            name: "body"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure"]]
      };
      var _default = documentRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/emphasisRole.js
  var require_emphasisRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/emphasisRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var emphasisRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["prohibited"],
        prohibitedProps: ["aria-label", "aria-labelledby"],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = emphasisRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/feedRole.js
  var require_feedRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/feedRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var feedRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [["article"]],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "list"]]
      };
      var _default = feedRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/figureRole.js
  var require_figureRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/figureRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var figureRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            name: "figure"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = figureRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/formRole.js
  var require_formRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/formRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var formRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            attributes: [{
              constraints: ["set"],
              name: "aria-label"
            }],
            name: "form"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              constraints: ["set"],
              name: "aria-labelledby"
            }],
            name: "form"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              constraints: ["set"],
              name: "name"
            }],
            name: "form"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = formRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/genericRole.js
  var require_genericRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/genericRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var genericRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["prohibited"],
        prohibitedProps: ["aria-label", "aria-labelledby"],
        props: {},
        relatedConcepts: [{
          concept: {
            name: "span"
          },
          module: "HTML"
        }, {
          concept: {
            name: "div"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure"]]
      };
      var _default = genericRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/gridRole.js
  var require_gridRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/gridRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var gridRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-multiselectable": null,
          "aria-readonly": null
        },
        relatedConcepts: [{
          concept: {
            attributes: [{
              name: "role",
              value: "grid"
            }],
            name: "table"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [["row"], ["row", "rowgroup"]],
        requiredProps: {},
        superClass: [["roletype", "widget", "composite"], ["roletype", "structure", "section", "table"]]
      };
      var _default = gridRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/gridcellRole.js
  var require_gridcellRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/gridcellRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var gridcellRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null,
          "aria-readonly": null,
          "aria-required": null,
          "aria-selected": null
        },
        relatedConcepts: [{
          concept: {
            attributes: [{
              name: "role",
              value: "gridcell"
            }],
            name: "td"
          },
          module: "HTML"
        }],
        requireContextRole: ["row"],
        requiredContextRole: ["row"],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "cell"], ["roletype", "widget"]]
      };
      var _default = gridcellRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/groupRole.js
  var require_groupRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/groupRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var groupRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-activedescendant": null,
          "aria-disabled": null
        },
        relatedConcepts: [{
          concept: {
            name: "details"
          },
          module: "HTML"
        }, {
          concept: {
            name: "fieldset"
          },
          module: "HTML"
        }, {
          concept: {
            name: "optgroup"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = groupRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/headingRole.js
  var require_headingRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/headingRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var headingRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {
          "aria-level": "2"
        },
        relatedConcepts: [{
          concept: {
            name: "h1"
          },
          module: "HTML"
        }, {
          concept: {
            name: "h2"
          },
          module: "HTML"
        }, {
          concept: {
            name: "h3"
          },
          module: "HTML"
        }, {
          concept: {
            name: "h4"
          },
          module: "HTML"
        }, {
          concept: {
            name: "h5"
          },
          module: "HTML"
        }, {
          concept: {
            name: "h6"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {
          "aria-level": "2"
        },
        superClass: [["roletype", "structure", "sectionhead"]]
      };
      var _default = headingRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/imgRole.js
  var require_imgRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/imgRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var imgRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: true,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            attributes: [{
              constraints: ["set"],
              name: "alt"
            }],
            name: "img"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              constraints: ["undefined"],
              name: "alt"
            }],
            name: "img"
          },
          module: "HTML"
        }, {
          concept: {
            name: "imggroup"
          },
          module: "DTB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = imgRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/insertionRole.js
  var require_insertionRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/insertionRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var insertionRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["prohibited"],
        prohibitedProps: ["aria-label", "aria-labelledby"],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = insertionRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/linkRole.js
  var require_linkRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/linkRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var linkRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-expanded": null,
          "aria-haspopup": null
        },
        relatedConcepts: [{
          concept: {
            attributes: [{
              name: "href"
            }],
            name: "a"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              name: "href"
            }],
            name: "area"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              name: "href"
            }],
            name: "link"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "widget", "command"]]
      };
      var _default = linkRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/listRole.js
  var require_listRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/listRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var listRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            name: "menu"
          },
          module: "HTML"
        }, {
          concept: {
            name: "ol"
          },
          module: "HTML"
        }, {
          concept: {
            name: "ul"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [["listitem"]],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = listRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/listboxRole.js
  var require_listboxRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/listboxRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var listboxRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-invalid": null,
          "aria-multiselectable": null,
          "aria-readonly": null,
          "aria-required": null,
          "aria-orientation": "vertical"
        },
        relatedConcepts: [{
          concept: {
            attributes: [{
              constraints: [">1"],
              name: "size"
            }, {
              name: "multiple"
            }],
            name: "select"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              constraints: [">1"],
              name: "size"
            }],
            name: "select"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              name: "multiple"
            }],
            name: "select"
          },
          module: "HTML"
        }, {
          concept: {
            name: "datalist"
          },
          module: "HTML"
        }, {
          concept: {
            name: "list"
          },
          module: "ARIA"
        }, {
          concept: {
            name: "select"
          },
          module: "XForms"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [["option", "group"], ["option"]],
        requiredProps: {},
        superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
      };
      var _default = listboxRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/listitemRole.js
  var require_listitemRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/listitemRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var listitemRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-level": null,
          "aria-posinset": null,
          "aria-setsize": null
        },
        relatedConcepts: [{
          concept: {
            constraints: ["direct descendant of ol, ul or menu"],
            name: "li"
          },
          module: "HTML"
        }, {
          concept: {
            name: "item"
          },
          module: "XForms"
        }],
        requireContextRole: ["directory", "list"],
        requiredContextRole: ["directory", "list"],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = listitemRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/logRole.js
  var require_logRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/logRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var logRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-live": "polite"
        },
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = logRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/mainRole.js
  var require_mainRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/mainRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var mainRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            name: "main"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = mainRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/marqueeRole.js
  var require_marqueeRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/marqueeRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var marqueeRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = marqueeRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/mathRole.js
  var require_mathRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/mathRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var mathRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            name: "math"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = mathRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/menuRole.js
  var require_menuRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/menuRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var menuRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-orientation": "vertical"
        },
        relatedConcepts: [{
          concept: {
            name: "MENU"
          },
          module: "JAPI"
        }, {
          concept: {
            name: "list"
          },
          module: "ARIA"
        }, {
          concept: {
            name: "select"
          },
          module: "XForms"
        }, {
          concept: {
            name: "sidebar"
          },
          module: "DTB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [["menuitem", "group"], ["menuitemradio", "group"], ["menuitemcheckbox", "group"], ["menuitem"], ["menuitemcheckbox"], ["menuitemradio"]],
        requiredProps: {},
        superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
      };
      var _default = menuRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/menubarRole.js
  var require_menubarRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/menubarRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var menubarRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-orientation": "horizontal"
        },
        relatedConcepts: [{
          concept: {
            name: "toolbar"
          },
          module: "ARIA"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [["menuitem", "group"], ["menuitemradio", "group"], ["menuitemcheckbox", "group"], ["menuitem"], ["menuitemcheckbox"], ["menuitemradio"]],
        requiredProps: {},
        superClass: [["roletype", "widget", "composite", "select", "menu"], ["roletype", "structure", "section", "group", "select", "menu"]]
      };
      var _default = menubarRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/menuitemRole.js
  var require_menuitemRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/menuitemRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var menuitemRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-posinset": null,
          "aria-setsize": null
        },
        relatedConcepts: [{
          concept: {
            name: "MENU_ITEM"
          },
          module: "JAPI"
        }, {
          concept: {
            name: "listitem"
          },
          module: "ARIA"
        }, {
          concept: {
            name: "menuitem"
          },
          module: "HTML"
        }, {
          concept: {
            name: "option"
          },
          module: "ARIA"
        }],
        requireContextRole: ["group", "menu", "menubar"],
        requiredContextRole: ["group", "menu", "menubar"],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "widget", "command"]]
      };
      var _default = menuitemRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/menuitemcheckboxRole.js
  var require_menuitemcheckboxRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/menuitemcheckboxRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var menuitemcheckboxRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: true,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            name: "menuitem"
          },
          module: "ARIA"
        }],
        requireContextRole: ["group", "menu", "menubar"],
        requiredContextRole: ["group", "menu", "menubar"],
        requiredOwnedElements: [],
        requiredProps: {
          "aria-checked": null
        },
        superClass: [["roletype", "widget", "input", "checkbox"], ["roletype", "widget", "command", "menuitem"]]
      };
      var _default = menuitemcheckboxRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/menuitemradioRole.js
  var require_menuitemradioRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/menuitemradioRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var menuitemradioRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: true,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            name: "menuitem"
          },
          module: "ARIA"
        }],
        requireContextRole: ["group", "menu", "menubar"],
        requiredContextRole: ["group", "menu", "menubar"],
        requiredOwnedElements: [],
        requiredProps: {
          "aria-checked": null
        },
        superClass: [["roletype", "widget", "input", "checkbox", "menuitemcheckbox"], ["roletype", "widget", "command", "menuitem", "menuitemcheckbox"], ["roletype", "widget", "input", "radio"]]
      };
      var _default = menuitemradioRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/meterRole.js
  var require_meterRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/meterRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var meterRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: true,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-valuetext": null,
          "aria-valuemax": "100",
          "aria-valuemin": "0"
        },
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {
          "aria-valuenow": null
        },
        superClass: [["roletype", "structure", "range"]]
      };
      var _default = meterRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/navigationRole.js
  var require_navigationRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/navigationRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var navigationRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            name: "nav"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = navigationRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/noneRole.js
  var require_noneRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/noneRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var noneRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: [],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: []
      };
      var _default = noneRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/noteRole.js
  var require_noteRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/noteRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var noteRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = noteRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/optionRole.js
  var require_optionRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/optionRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var optionRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: true,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {
          "aria-checked": null,
          "aria-posinset": null,
          "aria-setsize": null,
          "aria-selected": "false"
        },
        relatedConcepts: [{
          concept: {
            name: "item"
          },
          module: "XForms"
        }, {
          concept: {
            name: "listitem"
          },
          module: "ARIA"
        }, {
          concept: {
            name: "option"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {
          "aria-selected": "false"
        },
        superClass: [["roletype", "widget", "input"]]
      };
      var _default = optionRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/paragraphRole.js
  var require_paragraphRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/paragraphRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var paragraphRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["prohibited"],
        prohibitedProps: ["aria-label", "aria-labelledby"],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = paragraphRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/presentationRole.js
  var require_presentationRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/presentationRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var presentationRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["prohibited"],
        prohibitedProps: ["aria-label", "aria-labelledby"],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure"]]
      };
      var _default = presentationRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/progressbarRole.js
  var require_progressbarRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/progressbarRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var progressbarRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: true,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-valuetext": null
        },
        relatedConcepts: [{
          concept: {
            name: "progress"
          },
          module: "HTML"
        }, {
          concept: {
            name: "status"
          },
          module: "ARIA"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "range"], ["roletype", "widget"]]
      };
      var _default = progressbarRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/radioRole.js
  var require_radioRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/radioRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var radioRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: true,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {
          "aria-checked": null,
          "aria-posinset": null,
          "aria-setsize": null
        },
        relatedConcepts: [{
          concept: {
            attributes: [{
              name: "type",
              value: "radio"
            }],
            name: "input"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {
          "aria-checked": null
        },
        superClass: [["roletype", "widget", "input"]]
      };
      var _default = radioRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/radiogroupRole.js
  var require_radiogroupRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/radiogroupRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var radiogroupRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-errormessage": null,
          "aria-invalid": null,
          "aria-readonly": null,
          "aria-required": null
        },
        relatedConcepts: [{
          concept: {
            name: "list"
          },
          module: "ARIA"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [["radio"]],
        requiredProps: {},
        superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
      };
      var _default = radiogroupRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/regionRole.js
  var require_regionRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/regionRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var regionRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            attributes: [{
              constraints: ["set"],
              name: "aria-label"
            }],
            name: "section"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              constraints: ["set"],
              name: "aria-labelledby"
            }],
            name: "section"
          },
          module: "HTML"
        }, {
          concept: {
            name: "Device Independence Glossart perceivable unit"
          }
        }, {
          concept: {
            name: "frame"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = regionRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/rowRole.js
  var require_rowRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/rowRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var rowRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {
          "aria-colindex": null,
          "aria-expanded": null,
          "aria-level": null,
          "aria-posinset": null,
          "aria-rowindex": null,
          "aria-selected": null,
          "aria-setsize": null
        },
        relatedConcepts: [{
          concept: {
            name: "tr"
          },
          module: "HTML"
        }],
        requireContextRole: ["grid", "rowgroup", "table", "treegrid"],
        requiredContextRole: ["grid", "rowgroup", "table", "treegrid"],
        requiredOwnedElements: [["cell"], ["columnheader"], ["gridcell"], ["rowheader"]],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "group"], ["roletype", "widget"]]
      };
      var _default = rowRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/rowgroupRole.js
  var require_rowgroupRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/rowgroupRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var rowgroupRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            name: "tbody"
          },
          module: "HTML"
        }, {
          concept: {
            name: "tfoot"
          },
          module: "HTML"
        }, {
          concept: {
            name: "thead"
          },
          module: "HTML"
        }],
        requireContextRole: ["grid", "table", "treegrid"],
        requiredContextRole: ["grid", "table", "treegrid"],
        requiredOwnedElements: [["row"]],
        requiredProps: {},
        superClass: [["roletype", "structure"]]
      };
      var _default = rowgroupRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/rowheaderRole.js
  var require_rowheaderRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/rowheaderRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var rowheaderRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {
          "aria-sort": null
        },
        relatedConcepts: [{
          concept: {
            attributes: [{
              name: "scope",
              value: "row"
            }],
            name: "th"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              name: "scope",
              value: "rowgroup"
            }],
            name: "th"
          },
          module: "HTML"
        }],
        requireContextRole: ["row", "rowgroup"],
        requiredContextRole: ["row", "rowgroup"],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "cell"], ["roletype", "structure", "section", "cell", "gridcell"], ["roletype", "widget", "gridcell"], ["roletype", "structure", "sectionhead"]]
      };
      var _default = rowheaderRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/scrollbarRole.js
  var require_scrollbarRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/scrollbarRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var scrollbarRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: true,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-valuetext": null,
          "aria-orientation": "vertical",
          "aria-valuemax": "100",
          "aria-valuemin": "0"
        },
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {
          "aria-controls": null,
          "aria-valuenow": null
        },
        superClass: [["roletype", "structure", "range"], ["roletype", "widget"]]
      };
      var _default = scrollbarRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/searchRole.js
  var require_searchRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/searchRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var searchRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = searchRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/searchboxRole.js
  var require_searchboxRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/searchboxRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var searchboxRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            attributes: [{
              constraints: ["undefined"],
              name: "list"
            }, {
              name: "type",
              value: "search"
            }],
            name: "input"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "widget", "input", "textbox"]]
      };
      var _default = searchboxRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/separatorRole.js
  var require_separatorRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/separatorRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var separatorRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: true,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-orientation": "horizontal",
          "aria-valuemax": "100",
          "aria-valuemin": "0",
          "aria-valuenow": null,
          "aria-valuetext": null
        },
        relatedConcepts: [{
          concept: {
            name: "hr"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure"]]
      };
      var _default = separatorRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/sliderRole.js
  var require_sliderRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/sliderRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var sliderRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: true,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-errormessage": null,
          "aria-haspopup": null,
          "aria-invalid": null,
          "aria-readonly": null,
          "aria-valuetext": null,
          "aria-orientation": "horizontal",
          "aria-valuemax": "100",
          "aria-valuemin": "0"
        },
        relatedConcepts: [{
          concept: {
            attributes: [{
              name: "type",
              value: "range"
            }],
            name: "input"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {
          "aria-valuenow": null
        },
        superClass: [["roletype", "widget", "input"], ["roletype", "structure", "range"]]
      };
      var _default = sliderRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/spinbuttonRole.js
  var require_spinbuttonRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/spinbuttonRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var spinbuttonRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-errormessage": null,
          "aria-invalid": null,
          "aria-readonly": null,
          "aria-required": null,
          "aria-valuetext": null,
          "aria-valuenow": "0"
        },
        relatedConcepts: [{
          concept: {
            attributes: [{
              name: "type",
              value: "number"
            }],
            name: "input"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "widget", "composite"], ["roletype", "widget", "input"], ["roletype", "structure", "range"]]
      };
      var _default = spinbuttonRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/statusRole.js
  var require_statusRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/statusRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var statusRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-atomic": "true",
          "aria-live": "polite"
        },
        relatedConcepts: [{
          concept: {
            name: "output"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = statusRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/strongRole.js
  var require_strongRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/strongRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var strongRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["prohibited"],
        prohibitedProps: ["aria-label", "aria-labelledby"],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = strongRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/subscriptRole.js
  var require_subscriptRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/subscriptRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var subscriptRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["prohibited"],
        prohibitedProps: ["aria-label", "aria-labelledby"],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = subscriptRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/superscriptRole.js
  var require_superscriptRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/superscriptRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var superscriptRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["prohibited"],
        prohibitedProps: ["aria-label", "aria-labelledby"],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = superscriptRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/switchRole.js
  var require_switchRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/switchRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var switchRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: true,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            name: "button"
          },
          module: "ARIA"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {
          "aria-checked": null
        },
        superClass: [["roletype", "widget", "input", "checkbox"]]
      };
      var _default = switchRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/tabRole.js
  var require_tabRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/tabRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var tabRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: true,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-posinset": null,
          "aria-setsize": null,
          "aria-selected": "false"
        },
        relatedConcepts: [],
        requireContextRole: ["tablist"],
        requiredContextRole: ["tablist"],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "sectionhead"], ["roletype", "widget"]]
      };
      var _default = tabRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/tableRole.js
  var require_tableRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/tableRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var tableRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-colcount": null,
          "aria-rowcount": null
        },
        relatedConcepts: [{
          concept: {
            name: "table"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [["row"], ["row", "rowgroup"]],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = tableRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/tablistRole.js
  var require_tablistRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/tablistRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var tablistRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-level": null,
          "aria-multiselectable": null,
          "aria-orientation": "horizontal"
        },
        relatedConcepts: [{
          module: "DAISY",
          concept: {
            name: "guide"
          }
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [["tab"]],
        requiredProps: {},
        superClass: [["roletype", "widget", "composite"]]
      };
      var _default = tablistRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/tabpanelRole.js
  var require_tabpanelRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/tabpanelRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var tabpanelRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = tabpanelRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/termRole.js
  var require_termRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/termRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var termRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            name: "dfn"
          },
          module: "HTML"
        }, {
          concept: {
            name: "dt"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = termRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/textboxRole.js
  var require_textboxRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/textboxRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var textboxRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-activedescendant": null,
          "aria-autocomplete": null,
          "aria-errormessage": null,
          "aria-haspopup": null,
          "aria-invalid": null,
          "aria-multiline": null,
          "aria-placeholder": null,
          "aria-readonly": null,
          "aria-required": null
        },
        relatedConcepts: [{
          concept: {
            attributes: [{
              constraints: ["undefined"],
              name: "type"
            }, {
              constraints: ["undefined"],
              name: "list"
            }],
            name: "input"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              constraints: ["undefined"],
              name: "list"
            }, {
              name: "type",
              value: "email"
            }],
            name: "input"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              constraints: ["undefined"],
              name: "list"
            }, {
              name: "type",
              value: "tel"
            }],
            name: "input"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              constraints: ["undefined"],
              name: "list"
            }, {
              name: "type",
              value: "text"
            }],
            name: "input"
          },
          module: "HTML"
        }, {
          concept: {
            attributes: [{
              constraints: ["undefined"],
              name: "list"
            }, {
              name: "type",
              value: "url"
            }],
            name: "input"
          },
          module: "HTML"
        }, {
          concept: {
            name: "input"
          },
          module: "XForms"
        }, {
          concept: {
            name: "textarea"
          },
          module: "HTML"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "widget", "input"]]
      };
      var _default = textboxRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/timeRole.js
  var require_timeRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/timeRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var timeRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = timeRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/timerRole.js
  var require_timerRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/timerRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var timerRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "status"]]
      };
      var _default = timerRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/toolbarRole.js
  var require_toolbarRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/toolbarRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var toolbarRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-orientation": "horizontal"
        },
        relatedConcepts: [{
          concept: {
            name: "menubar"
          },
          module: "ARIA"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "group"]]
      };
      var _default = toolbarRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/tooltipRole.js
  var require_tooltipRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/tooltipRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var tooltipRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = tooltipRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/treeRole.js
  var require_treeRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/treeRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var treeRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-errormessage": null,
          "aria-invalid": null,
          "aria-multiselectable": null,
          "aria-required": null,
          "aria-orientation": "vertical"
        },
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [["treeitem", "group"], ["treeitem"]],
        requiredProps: {},
        superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
      };
      var _default = treeRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/treegridRole.js
  var require_treegridRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/treegridRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var treegridRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [["row"], ["row", "rowgroup"]],
        requiredProps: {},
        superClass: [["roletype", "widget", "composite", "grid"], ["roletype", "structure", "section", "table", "grid"], ["roletype", "widget", "composite", "select", "tree"], ["roletype", "structure", "section", "group", "select", "tree"]]
      };
      var _default = treegridRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/treeitemRole.js
  var require_treeitemRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/literal/treeitemRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var treeitemRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {
          "aria-expanded": null,
          "aria-haspopup": null
        },
        relatedConcepts: [],
        requireContextRole: ["group", "tree"],
        requiredContextRole: ["group", "tree"],
        requiredOwnedElements: [],
        requiredProps: {
          "aria-selected": null
        },
        superClass: [["roletype", "structure", "section", "listitem"], ["roletype", "widget", "input", "option"]]
      };
      var _default = treeitemRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/ariaLiteralRoles.js
  var require_ariaLiteralRoles = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/ariaLiteralRoles.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _alertRole = _interopRequireDefault(require_alertRole());
      var _alertdialogRole = _interopRequireDefault(require_alertdialogRole());
      var _applicationRole = _interopRequireDefault(require_applicationRole());
      var _articleRole = _interopRequireDefault(require_articleRole());
      var _bannerRole = _interopRequireDefault(require_bannerRole());
      var _blockquoteRole = _interopRequireDefault(require_blockquoteRole());
      var _buttonRole = _interopRequireDefault(require_buttonRole());
      var _captionRole = _interopRequireDefault(require_captionRole());
      var _cellRole = _interopRequireDefault(require_cellRole());
      var _checkboxRole = _interopRequireDefault(require_checkboxRole());
      var _codeRole = _interopRequireDefault(require_codeRole());
      var _columnheaderRole = _interopRequireDefault(require_columnheaderRole());
      var _comboboxRole = _interopRequireDefault(require_comboboxRole());
      var _complementaryRole = _interopRequireDefault(require_complementaryRole());
      var _contentinfoRole = _interopRequireDefault(require_contentinfoRole());
      var _definitionRole = _interopRequireDefault(require_definitionRole());
      var _deletionRole = _interopRequireDefault(require_deletionRole());
      var _dialogRole = _interopRequireDefault(require_dialogRole());
      var _directoryRole = _interopRequireDefault(require_directoryRole());
      var _documentRole = _interopRequireDefault(require_documentRole());
      var _emphasisRole = _interopRequireDefault(require_emphasisRole());
      var _feedRole = _interopRequireDefault(require_feedRole());
      var _figureRole = _interopRequireDefault(require_figureRole());
      var _formRole = _interopRequireDefault(require_formRole());
      var _genericRole = _interopRequireDefault(require_genericRole());
      var _gridRole = _interopRequireDefault(require_gridRole());
      var _gridcellRole = _interopRequireDefault(require_gridcellRole());
      var _groupRole = _interopRequireDefault(require_groupRole());
      var _headingRole = _interopRequireDefault(require_headingRole());
      var _imgRole = _interopRequireDefault(require_imgRole());
      var _insertionRole = _interopRequireDefault(require_insertionRole());
      var _linkRole = _interopRequireDefault(require_linkRole());
      var _listRole = _interopRequireDefault(require_listRole());
      var _listboxRole = _interopRequireDefault(require_listboxRole());
      var _listitemRole = _interopRequireDefault(require_listitemRole());
      var _logRole = _interopRequireDefault(require_logRole());
      var _mainRole = _interopRequireDefault(require_mainRole());
      var _marqueeRole = _interopRequireDefault(require_marqueeRole());
      var _mathRole = _interopRequireDefault(require_mathRole());
      var _menuRole = _interopRequireDefault(require_menuRole());
      var _menubarRole = _interopRequireDefault(require_menubarRole());
      var _menuitemRole = _interopRequireDefault(require_menuitemRole());
      var _menuitemcheckboxRole = _interopRequireDefault(require_menuitemcheckboxRole());
      var _menuitemradioRole = _interopRequireDefault(require_menuitemradioRole());
      var _meterRole = _interopRequireDefault(require_meterRole());
      var _navigationRole = _interopRequireDefault(require_navigationRole());
      var _noneRole = _interopRequireDefault(require_noneRole());
      var _noteRole = _interopRequireDefault(require_noteRole());
      var _optionRole = _interopRequireDefault(require_optionRole());
      var _paragraphRole = _interopRequireDefault(require_paragraphRole());
      var _presentationRole = _interopRequireDefault(require_presentationRole());
      var _progressbarRole = _interopRequireDefault(require_progressbarRole());
      var _radioRole = _interopRequireDefault(require_radioRole());
      var _radiogroupRole = _interopRequireDefault(require_radiogroupRole());
      var _regionRole = _interopRequireDefault(require_regionRole());
      var _rowRole = _interopRequireDefault(require_rowRole());
      var _rowgroupRole = _interopRequireDefault(require_rowgroupRole());
      var _rowheaderRole = _interopRequireDefault(require_rowheaderRole());
      var _scrollbarRole = _interopRequireDefault(require_scrollbarRole());
      var _searchRole = _interopRequireDefault(require_searchRole());
      var _searchboxRole = _interopRequireDefault(require_searchboxRole());
      var _separatorRole = _interopRequireDefault(require_separatorRole());
      var _sliderRole = _interopRequireDefault(require_sliderRole());
      var _spinbuttonRole = _interopRequireDefault(require_spinbuttonRole());
      var _statusRole = _interopRequireDefault(require_statusRole());
      var _strongRole = _interopRequireDefault(require_strongRole());
      var _subscriptRole = _interopRequireDefault(require_subscriptRole());
      var _superscriptRole = _interopRequireDefault(require_superscriptRole());
      var _switchRole = _interopRequireDefault(require_switchRole());
      var _tabRole = _interopRequireDefault(require_tabRole());
      var _tableRole = _interopRequireDefault(require_tableRole());
      var _tablistRole = _interopRequireDefault(require_tablistRole());
      var _tabpanelRole = _interopRequireDefault(require_tabpanelRole());
      var _termRole = _interopRequireDefault(require_termRole());
      var _textboxRole = _interopRequireDefault(require_textboxRole());
      var _timeRole = _interopRequireDefault(require_timeRole());
      var _timerRole = _interopRequireDefault(require_timerRole());
      var _toolbarRole = _interopRequireDefault(require_toolbarRole());
      var _tooltipRole = _interopRequireDefault(require_tooltipRole());
      var _treeRole = _interopRequireDefault(require_treeRole());
      var _treegridRole = _interopRequireDefault(require_treegridRole());
      var _treeitemRole = _interopRequireDefault(require_treeitemRole());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var ariaLiteralRoles = [["alert", _alertRole.default], ["alertdialog", _alertdialogRole.default], ["application", _applicationRole.default], ["article", _articleRole.default], ["banner", _bannerRole.default], ["blockquote", _blockquoteRole.default], ["button", _buttonRole.default], ["caption", _captionRole.default], ["cell", _cellRole.default], ["checkbox", _checkboxRole.default], ["code", _codeRole.default], ["columnheader", _columnheaderRole.default], ["combobox", _comboboxRole.default], ["complementary", _complementaryRole.default], ["contentinfo", _contentinfoRole.default], ["definition", _definitionRole.default], ["deletion", _deletionRole.default], ["dialog", _dialogRole.default], ["directory", _directoryRole.default], ["document", _documentRole.default], ["emphasis", _emphasisRole.default], ["feed", _feedRole.default], ["figure", _figureRole.default], ["form", _formRole.default], ["generic", _genericRole.default], ["grid", _gridRole.default], ["gridcell", _gridcellRole.default], ["group", _groupRole.default], ["heading", _headingRole.default], ["img", _imgRole.default], ["insertion", _insertionRole.default], ["link", _linkRole.default], ["list", _listRole.default], ["listbox", _listboxRole.default], ["listitem", _listitemRole.default], ["log", _logRole.default], ["main", _mainRole.default], ["marquee", _marqueeRole.default], ["math", _mathRole.default], ["menu", _menuRole.default], ["menubar", _menubarRole.default], ["menuitem", _menuitemRole.default], ["menuitemcheckbox", _menuitemcheckboxRole.default], ["menuitemradio", _menuitemradioRole.default], ["meter", _meterRole.default], ["navigation", _navigationRole.default], ["none", _noneRole.default], ["note", _noteRole.default], ["option", _optionRole.default], ["paragraph", _paragraphRole.default], ["presentation", _presentationRole.default], ["progressbar", _progressbarRole.default], ["radio", _radioRole.default], ["radiogroup", _radiogroupRole.default], ["region", _regionRole.default], ["row", _rowRole.default], ["rowgroup", _rowgroupRole.default], ["rowheader", _rowheaderRole.default], ["scrollbar", _scrollbarRole.default], ["search", _searchRole.default], ["searchbox", _searchboxRole.default], ["separator", _separatorRole.default], ["slider", _sliderRole.default], ["spinbutton", _spinbuttonRole.default], ["status", _statusRole.default], ["strong", _strongRole.default], ["subscript", _subscriptRole.default], ["superscript", _superscriptRole.default], ["switch", _switchRole.default], ["tab", _tabRole.default], ["table", _tableRole.default], ["tablist", _tablistRole.default], ["tabpanel", _tabpanelRole.default], ["term", _termRole.default], ["textbox", _textboxRole.default], ["time", _timeRole.default], ["timer", _timerRole.default], ["toolbar", _toolbarRole.default], ["tooltip", _tooltipRole.default], ["tree", _treeRole.default], ["treegrid", _treegridRole.default], ["treeitem", _treeitemRole.default]];
      var _default = ariaLiteralRoles;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docAbstractRole.js
  var require_docAbstractRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docAbstractRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docAbstractRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "abstract [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = docAbstractRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docAcknowledgmentsRole.js
  var require_docAcknowledgmentsRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docAcknowledgmentsRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docAcknowledgmentsRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "acknowledgments [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = docAcknowledgmentsRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docAfterwordRole.js
  var require_docAfterwordRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docAfterwordRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docAfterwordRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "afterword [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = docAfterwordRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docAppendixRole.js
  var require_docAppendixRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docAppendixRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docAppendixRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "appendix [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = docAppendixRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docBacklinkRole.js
  var require_docBacklinkRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docBacklinkRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docBacklinkRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author", "content"],
        prohibitedProps: [],
        props: {
          "aria-errormessage": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "referrer [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "widget", "command", "link"]]
      };
      var _default = docBacklinkRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docBiblioentryRole.js
  var require_docBiblioentryRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docBiblioentryRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docBiblioentryRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "EPUB biblioentry [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: ["doc-bibliography"],
        requiredContextRole: ["doc-bibliography"],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "listitem"]]
      };
      var _default = docBiblioentryRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docBibliographyRole.js
  var require_docBibliographyRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docBibliographyRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docBibliographyRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "bibliography [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [["doc-biblioentry"]],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = docBibliographyRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docBibliorefRole.js
  var require_docBibliorefRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docBibliorefRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docBibliorefRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {
          "aria-errormessage": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "biblioref [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "widget", "command", "link"]]
      };
      var _default = docBibliorefRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docChapterRole.js
  var require_docChapterRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docChapterRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docChapterRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "chapter [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = docChapterRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docColophonRole.js
  var require_docColophonRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docColophonRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docColophonRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "colophon [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = docColophonRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docConclusionRole.js
  var require_docConclusionRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docConclusionRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docConclusionRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "conclusion [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = docConclusionRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docCoverRole.js
  var require_docCoverRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docCoverRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docCoverRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "cover [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "img"]]
      };
      var _default = docCoverRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docCreditRole.js
  var require_docCreditRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docCreditRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docCreditRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "credit [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = docCreditRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docCreditsRole.js
  var require_docCreditsRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docCreditsRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docCreditsRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "credits [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = docCreditsRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docDedicationRole.js
  var require_docDedicationRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docDedicationRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docDedicationRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "dedication [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = docDedicationRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docEndnoteRole.js
  var require_docEndnoteRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docEndnoteRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docEndnoteRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "rearnote [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: ["doc-endnotes"],
        requiredContextRole: ["doc-endnotes"],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "listitem"]]
      };
      var _default = docEndnoteRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docEndnotesRole.js
  var require_docEndnotesRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docEndnotesRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docEndnotesRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "rearnotes [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [["doc-endnote"]],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = docEndnotesRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docEpigraphRole.js
  var require_docEpigraphRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docEpigraphRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docEpigraphRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "epigraph [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = docEpigraphRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docEpilogueRole.js
  var require_docEpilogueRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docEpilogueRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docEpilogueRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "epilogue [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = docEpilogueRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docErrataRole.js
  var require_docErrataRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docErrataRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docErrataRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "errata [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = docErrataRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docExampleRole.js
  var require_docExampleRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docExampleRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docExampleRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = docExampleRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docFootnoteRole.js
  var require_docFootnoteRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docFootnoteRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docFootnoteRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "footnote [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = docFootnoteRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docForewordRole.js
  var require_docForewordRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docForewordRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docForewordRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "foreword [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = docForewordRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docGlossaryRole.js
  var require_docGlossaryRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docGlossaryRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docGlossaryRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "glossary [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [["definition"], ["term"]],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = docGlossaryRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docGlossrefRole.js
  var require_docGlossrefRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docGlossrefRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docGlossrefRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {
          "aria-errormessage": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "glossref [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "widget", "command", "link"]]
      };
      var _default = docGlossrefRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docIndexRole.js
  var require_docIndexRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docIndexRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docIndexRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "index [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
      };
      var _default = docIndexRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docIntroductionRole.js
  var require_docIntroductionRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docIntroductionRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docIntroductionRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "introduction [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = docIntroductionRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docNoterefRole.js
  var require_docNoterefRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docNoterefRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docNoterefRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {
          "aria-errormessage": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "noteref [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "widget", "command", "link"]]
      };
      var _default = docNoterefRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docNoticeRole.js
  var require_docNoticeRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docNoticeRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docNoticeRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "notice [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "note"]]
      };
      var _default = docNoticeRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docPagebreakRole.js
  var require_docPagebreakRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docPagebreakRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docPagebreakRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: true,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "pagebreak [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "separator"]]
      };
      var _default = docPagebreakRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docPagelistRole.js
  var require_docPagelistRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docPagelistRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docPagelistRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "page-list [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
      };
      var _default = docPagelistRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docPartRole.js
  var require_docPartRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docPartRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docPartRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "part [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = docPartRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docPrefaceRole.js
  var require_docPrefaceRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docPrefaceRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docPrefaceRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "preface [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = docPrefaceRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docPrologueRole.js
  var require_docPrologueRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docPrologueRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docPrologueRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "prologue [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark"]]
      };
      var _default = docPrologueRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docPullquoteRole.js
  var require_docPullquoteRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docPullquoteRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docPullquoteRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {},
        relatedConcepts: [{
          concept: {
            name: "pullquote [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["none"]]
      };
      var _default = docPullquoteRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docQnaRole.js
  var require_docQnaRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docQnaRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docQnaRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "qna [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section"]]
      };
      var _default = docQnaRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docSubtitleRole.js
  var require_docSubtitleRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docSubtitleRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docSubtitleRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "subtitle [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "sectionhead"]]
      };
      var _default = docSubtitleRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docTipRole.js
  var require_docTipRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docTipRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docTipRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "help [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "note"]]
      };
      var _default = docTipRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docTocRole.js
  var require_docTocRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/dpub/docTocRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var docTocRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          concept: {
            name: "toc [EPUB-SSV]"
          },
          module: "EPUB"
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
      };
      var _default = docTocRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/ariaDpubRoles.js
  var require_ariaDpubRoles = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/ariaDpubRoles.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _docAbstractRole = _interopRequireDefault(require_docAbstractRole());
      var _docAcknowledgmentsRole = _interopRequireDefault(require_docAcknowledgmentsRole());
      var _docAfterwordRole = _interopRequireDefault(require_docAfterwordRole());
      var _docAppendixRole = _interopRequireDefault(require_docAppendixRole());
      var _docBacklinkRole = _interopRequireDefault(require_docBacklinkRole());
      var _docBiblioentryRole = _interopRequireDefault(require_docBiblioentryRole());
      var _docBibliographyRole = _interopRequireDefault(require_docBibliographyRole());
      var _docBibliorefRole = _interopRequireDefault(require_docBibliorefRole());
      var _docChapterRole = _interopRequireDefault(require_docChapterRole());
      var _docColophonRole = _interopRequireDefault(require_docColophonRole());
      var _docConclusionRole = _interopRequireDefault(require_docConclusionRole());
      var _docCoverRole = _interopRequireDefault(require_docCoverRole());
      var _docCreditRole = _interopRequireDefault(require_docCreditRole());
      var _docCreditsRole = _interopRequireDefault(require_docCreditsRole());
      var _docDedicationRole = _interopRequireDefault(require_docDedicationRole());
      var _docEndnoteRole = _interopRequireDefault(require_docEndnoteRole());
      var _docEndnotesRole = _interopRequireDefault(require_docEndnotesRole());
      var _docEpigraphRole = _interopRequireDefault(require_docEpigraphRole());
      var _docEpilogueRole = _interopRequireDefault(require_docEpilogueRole());
      var _docErrataRole = _interopRequireDefault(require_docErrataRole());
      var _docExampleRole = _interopRequireDefault(require_docExampleRole());
      var _docFootnoteRole = _interopRequireDefault(require_docFootnoteRole());
      var _docForewordRole = _interopRequireDefault(require_docForewordRole());
      var _docGlossaryRole = _interopRequireDefault(require_docGlossaryRole());
      var _docGlossrefRole = _interopRequireDefault(require_docGlossrefRole());
      var _docIndexRole = _interopRequireDefault(require_docIndexRole());
      var _docIntroductionRole = _interopRequireDefault(require_docIntroductionRole());
      var _docNoterefRole = _interopRequireDefault(require_docNoterefRole());
      var _docNoticeRole = _interopRequireDefault(require_docNoticeRole());
      var _docPagebreakRole = _interopRequireDefault(require_docPagebreakRole());
      var _docPagelistRole = _interopRequireDefault(require_docPagelistRole());
      var _docPartRole = _interopRequireDefault(require_docPartRole());
      var _docPrefaceRole = _interopRequireDefault(require_docPrefaceRole());
      var _docPrologueRole = _interopRequireDefault(require_docPrologueRole());
      var _docPullquoteRole = _interopRequireDefault(require_docPullquoteRole());
      var _docQnaRole = _interopRequireDefault(require_docQnaRole());
      var _docSubtitleRole = _interopRequireDefault(require_docSubtitleRole());
      var _docTipRole = _interopRequireDefault(require_docTipRole());
      var _docTocRole = _interopRequireDefault(require_docTocRole());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var ariaDpubRoles = [["doc-abstract", _docAbstractRole.default], ["doc-acknowledgments", _docAcknowledgmentsRole.default], ["doc-afterword", _docAfterwordRole.default], ["doc-appendix", _docAppendixRole.default], ["doc-backlink", _docBacklinkRole.default], ["doc-biblioentry", _docBiblioentryRole.default], ["doc-bibliography", _docBibliographyRole.default], ["doc-biblioref", _docBibliorefRole.default], ["doc-chapter", _docChapterRole.default], ["doc-colophon", _docColophonRole.default], ["doc-conclusion", _docConclusionRole.default], ["doc-cover", _docCoverRole.default], ["doc-credit", _docCreditRole.default], ["doc-credits", _docCreditsRole.default], ["doc-dedication", _docDedicationRole.default], ["doc-endnote", _docEndnoteRole.default], ["doc-endnotes", _docEndnotesRole.default], ["doc-epigraph", _docEpigraphRole.default], ["doc-epilogue", _docEpilogueRole.default], ["doc-errata", _docErrataRole.default], ["doc-example", _docExampleRole.default], ["doc-footnote", _docFootnoteRole.default], ["doc-foreword", _docForewordRole.default], ["doc-glossary", _docGlossaryRole.default], ["doc-glossref", _docGlossrefRole.default], ["doc-index", _docIndexRole.default], ["doc-introduction", _docIntroductionRole.default], ["doc-noteref", _docNoterefRole.default], ["doc-notice", _docNoticeRole.default], ["doc-pagebreak", _docPagebreakRole.default], ["doc-pagelist", _docPagelistRole.default], ["doc-part", _docPartRole.default], ["doc-preface", _docPrefaceRole.default], ["doc-prologue", _docPrologueRole.default], ["doc-pullquote", _docPullquoteRole.default], ["doc-qna", _docQnaRole.default], ["doc-subtitle", _docSubtitleRole.default], ["doc-tip", _docTipRole.default], ["doc-toc", _docTocRole.default]];
      var _default = ariaDpubRoles;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/graphics/graphicsDocumentRole.js
  var require_graphicsDocumentRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/graphics/graphicsDocumentRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var graphicsDocumentRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          module: "GRAPHICS",
          concept: {
            name: "graphics-object"
          }
        }, {
          module: "ARIA",
          concept: {
            name: "img"
          }
        }, {
          module: "ARIA",
          concept: {
            name: "article"
          }
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "document"]]
      };
      var _default = graphicsDocumentRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/graphics/graphicsObjectRole.js
  var require_graphicsObjectRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/graphics/graphicsObjectRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var graphicsObjectRole = {
        abstract: false,
        accessibleNameRequired: false,
        baseConcepts: [],
        childrenPresentational: false,
        nameFrom: ["author", "contents"],
        prohibitedProps: [],
        props: {
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [{
          module: "GRAPHICS",
          concept: {
            name: "graphics-document"
          }
        }, {
          module: "ARIA",
          concept: {
            name: "group"
          }
        }, {
          module: "ARIA",
          concept: {
            name: "img"
          }
        }, {
          module: "GRAPHICS",
          concept: {
            name: "graphics-symbol"
          }
        }],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "group"]]
      };
      var _default = graphicsObjectRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/graphics/graphicsSymbolRole.js
  var require_graphicsSymbolRole = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/graphics/graphicsSymbolRole.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var graphicsSymbolRole = {
        abstract: false,
        accessibleNameRequired: true,
        baseConcepts: [],
        childrenPresentational: true,
        nameFrom: ["author"],
        prohibitedProps: [],
        props: {
          "aria-disabled": null,
          "aria-errormessage": null,
          "aria-expanded": null,
          "aria-haspopup": null,
          "aria-invalid": null
        },
        relatedConcepts: [],
        requireContextRole: [],
        requiredContextRole: [],
        requiredOwnedElements: [],
        requiredProps: {},
        superClass: [["roletype", "structure", "section", "img"]]
      };
      var _default = graphicsSymbolRole;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/ariaGraphicsRoles.js
  var require_ariaGraphicsRoles = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/etc/roles/ariaGraphicsRoles.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _graphicsDocumentRole = _interopRequireDefault(require_graphicsDocumentRole());
      var _graphicsObjectRole = _interopRequireDefault(require_graphicsObjectRole());
      var _graphicsSymbolRole = _interopRequireDefault(require_graphicsSymbolRole());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var ariaGraphicsRoles = [["graphics-document", _graphicsDocumentRole.default], ["graphics-object", _graphicsObjectRole.default], ["graphics-symbol", _graphicsSymbolRole.default]];
      var _default = ariaGraphicsRoles;
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/rolesMap.js
  var require_rolesMap = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/rolesMap.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _ariaAbstractRoles = _interopRequireDefault(require_ariaAbstractRoles());
      var _ariaLiteralRoles = _interopRequireDefault(require_ariaLiteralRoles());
      var _ariaDpubRoles = _interopRequireDefault(require_ariaDpubRoles());
      var _ariaGraphicsRoles = _interopRequireDefault(require_ariaGraphicsRoles());
      var _iterationDecorator = _interopRequireDefault(require_iterationDecorator());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function _defineProperty3(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      function _createForOfIteratorHelper(o, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
        if (!it) {
          if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it)
              o = it;
            var i = 0;
            var F = function F2() {
            };
            return { s: F, n: function n() {
              if (i >= o.length)
                return { done: true };
              return { done: false, value: o[i++] };
            }, e: function e(_e2) {
              throw _e2;
            }, f: F };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var normalCompletion = true, didErr = false, err;
        return { s: function s() {
          it = it.call(o);
        }, n: function n() {
          var step = it.next();
          normalCompletion = step.done;
          return step;
        }, e: function e(_e3) {
          didErr = true;
          err = _e3;
        }, f: function f() {
          try {
            if (!normalCompletion && it.return != null)
              it.return();
          } finally {
            if (didErr)
              throw err;
          }
        } };
      }
      function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
      }
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o)
          return;
        if (typeof o === "string")
          return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor)
          n = o.constructor.name;
        if (n === "Map" || n === "Set")
          return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
          return _arrayLikeToArray(o, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length)
          len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      }
      function _iterableToArrayLimit(arr, i) {
        var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
        if (_i == null)
          return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _s, _e;
        try {
          for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i)
              break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null)
              _i["return"]();
          } finally {
            if (_d)
              throw _e;
          }
        }
        return _arr;
      }
      function _arrayWithHoles(arr) {
        if (Array.isArray(arr))
          return arr;
      }
      var roles2 = [].concat(_ariaAbstractRoles.default, _ariaLiteralRoles.default, _ariaDpubRoles.default, _ariaGraphicsRoles.default);
      roles2.forEach(function(_ref) {
        var _ref2 = _slicedToArray(_ref, 2), roleDefinition = _ref2[1];
        var _iterator = _createForOfIteratorHelper(roleDefinition.superClass), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var superClassIter = _step.value;
            var _iterator2 = _createForOfIteratorHelper(superClassIter), _step2;
            try {
              var _loop = function _loop2() {
                var superClassName = _step2.value;
                var superClassRoleTuple = roles2.find(function(_ref3) {
                  var _ref4 = _slicedToArray(_ref3, 1), name = _ref4[0];
                  return name === superClassName;
                });
                if (superClassRoleTuple) {
                  var superClassDefinition = superClassRoleTuple[1];
                  for (var _i2 = 0, _Object$keys = Object.keys(superClassDefinition.props); _i2 < _Object$keys.length; _i2++) {
                    var prop = _Object$keys[_i2];
                    if (
                      // $FlowIssue Accessing the hasOwnProperty on the Object prototype is fine.
                      !Object.prototype.hasOwnProperty.call(roleDefinition.props, prop)
                    ) {
                      Object.assign(roleDefinition.props, _defineProperty3({}, prop, superClassDefinition.props[prop]));
                    }
                  }
                }
              };
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                _loop();
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });
      var rolesMap = {
        entries: function entries() {
          return roles2;
        },
        forEach: function forEach(fn) {
          var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
          var _iterator3 = _createForOfIteratorHelper(roles2), _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
              var _step3$value = _slicedToArray(_step3.value, 2), key = _step3$value[0], values = _step3$value[1];
              fn.call(thisArg, values, key, roles2);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        },
        get: function get(key) {
          var item = roles2.find(function(tuple) {
            return tuple[0] === key ? true : false;
          });
          return item && item[1];
        },
        has: function has(key) {
          return !!rolesMap.get(key);
        },
        keys: function keys() {
          return roles2.map(function(_ref5) {
            var _ref6 = _slicedToArray(_ref5, 1), key = _ref6[0];
            return key;
          });
        },
        values: function values() {
          return roles2.map(function(_ref7) {
            var _ref8 = _slicedToArray(_ref7, 2), values2 = _ref8[1];
            return values2;
          });
        }
      };
      var _default = (0, _iterationDecorator.default)(rolesMap, rolesMap.entries());
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/isArguments.js
  var require_isArguments = __commonJS({
    "../node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/isArguments.js"(exports, module2) {
      "use strict";
      var toStr2 = Object.prototype.toString;
      module2.exports = function isArguments(value) {
        var str = toStr2.call(value);
        var isArgs = str === "[object Arguments]";
        if (!isArgs) {
          isArgs = str !== "[object Array]" && value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && toStr2.call(value.callee) === "[object Function]";
        }
        return isArgs;
      };
    }
  });

  // ../node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/implementation.js
  var require_implementation = __commonJS({
    "../node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/implementation.js"(exports, module2) {
      "use strict";
      var keysShim;
      if (!Object.keys) {
        has = Object.prototype.hasOwnProperty;
        toStr2 = Object.prototype.toString;
        isArgs = require_isArguments();
        isEnumerable = Object.prototype.propertyIsEnumerable;
        hasDontEnumBug = !isEnumerable.call({ toString: null }, "toString");
        hasProtoEnumBug = isEnumerable.call(function() {
        }, "prototype");
        dontEnums = [
          "toString",
          "toLocaleString",
          "valueOf",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "constructor"
        ];
        equalsConstructorPrototype = function(o) {
          var ctor = o.constructor;
          return ctor && ctor.prototype === o;
        };
        excludedKeys = {
          $applicationCache: true,
          $console: true,
          $external: true,
          $frame: true,
          $frameElement: true,
          $frames: true,
          $innerHeight: true,
          $innerWidth: true,
          $onmozfullscreenchange: true,
          $onmozfullscreenerror: true,
          $outerHeight: true,
          $outerWidth: true,
          $pageXOffset: true,
          $pageYOffset: true,
          $parent: true,
          $scrollLeft: true,
          $scrollTop: true,
          $scrollX: true,
          $scrollY: true,
          $self: true,
          $webkitIndexedDB: true,
          $webkitStorageInfo: true,
          $window: true
        };
        hasAutomationEqualityBug = function() {
          if (typeof window === "undefined") {
            return false;
          }
          for (var k in window) {
            try {
              if (!excludedKeys["$" + k] && has.call(window, k) && window[k] !== null && typeof window[k] === "object") {
                try {
                  equalsConstructorPrototype(window[k]);
                } catch (e) {
                  return true;
                }
              }
            } catch (e) {
              return true;
            }
          }
          return false;
        }();
        equalsConstructorPrototypeIfNotBuggy = function(o) {
          if (typeof window === "undefined" || !hasAutomationEqualityBug) {
            return equalsConstructorPrototype(o);
          }
          try {
            return equalsConstructorPrototype(o);
          } catch (e) {
            return false;
          }
        };
        keysShim = function keys(object) {
          var isObject = object !== null && typeof object === "object";
          var isFunction = toStr2.call(object) === "[object Function]";
          var isArguments = isArgs(object);
          var isString = isObject && toStr2.call(object) === "[object String]";
          var theKeys = [];
          if (!isObject && !isFunction && !isArguments) {
            throw new TypeError("Object.keys called on a non-object");
          }
          var skipProto = hasProtoEnumBug && isFunction;
          if (isString && object.length > 0 && !has.call(object, 0)) {
            for (var i = 0; i < object.length; ++i) {
              theKeys.push(String(i));
            }
          }
          if (isArguments && object.length > 0) {
            for (var j = 0; j < object.length; ++j) {
              theKeys.push(String(j));
            }
          } else {
            for (var name in object) {
              if (!(skipProto && name === "prototype") && has.call(object, name)) {
                theKeys.push(String(name));
              }
            }
          }
          if (hasDontEnumBug) {
            var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
            for (var k = 0; k < dontEnums.length; ++k) {
              if (!(skipConstructor && dontEnums[k] === "constructor") && has.call(object, dontEnums[k])) {
                theKeys.push(dontEnums[k]);
              }
            }
          }
          return theKeys;
        };
      }
      var has;
      var toStr2;
      var isArgs;
      var isEnumerable;
      var hasDontEnumBug;
      var hasProtoEnumBug;
      var dontEnums;
      var equalsConstructorPrototype;
      var excludedKeys;
      var hasAutomationEqualityBug;
      var equalsConstructorPrototypeIfNotBuggy;
      module2.exports = keysShim;
    }
  });

  // ../node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/index.js
  var require_object_keys = __commonJS({
    "../node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/index.js"(exports, module2) {
      "use strict";
      var slice = Array.prototype.slice;
      var isArgs = require_isArguments();
      var origKeys = Object.keys;
      var keysShim = origKeys ? function keys(o) {
        return origKeys(o);
      } : require_implementation();
      var originalKeys = Object.keys;
      keysShim.shim = function shimObjectKeys() {
        if (Object.keys) {
          var keysWorksWithArguments = function() {
            var args = Object.keys(arguments);
            return args && args.length === arguments.length;
          }(1, 2);
          if (!keysWorksWithArguments) {
            Object.keys = function keys(object) {
              if (isArgs(object)) {
                return originalKeys(slice.call(object));
              }
              return originalKeys(object);
            };
          }
        } else {
          Object.keys = keysShim;
        }
        return Object.keys || keysShim;
      };
      module2.exports = keysShim;
    }
  });

  // ../node_modules/.pnpm/has-symbols@1.0.3/node_modules/has-symbols/shams.js
  var require_shams = __commonJS({
    "../node_modules/.pnpm/has-symbols@1.0.3/node_modules/has-symbols/shams.js"(exports, module2) {
      "use strict";
      module2.exports = function hasSymbols() {
        if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
          return false;
        }
        if (typeof Symbol.iterator === "symbol") {
          return true;
        }
        var obj = {};
        var sym = Symbol("test");
        var symObj = Object(sym);
        if (typeof sym === "string") {
          return false;
        }
        if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
          return false;
        }
        if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
          return false;
        }
        var symVal = 42;
        obj[sym] = symVal;
        for (sym in obj) {
          return false;
        }
        if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
          return false;
        }
        if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
          return false;
        }
        var syms = Object.getOwnPropertySymbols(obj);
        if (syms.length !== 1 || syms[0] !== sym) {
          return false;
        }
        if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
          return false;
        }
        if (typeof Object.getOwnPropertyDescriptor === "function") {
          var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
          if (descriptor.value !== symVal || descriptor.enumerable !== true) {
            return false;
          }
        }
        return true;
      };
    }
  });

  // ../node_modules/.pnpm/has-symbols@1.0.3/node_modules/has-symbols/index.js
  var require_has_symbols = __commonJS({
    "../node_modules/.pnpm/has-symbols@1.0.3/node_modules/has-symbols/index.js"(exports, module2) {
      "use strict";
      var origSymbol = typeof Symbol !== "undefined" && Symbol;
      var hasSymbolSham = require_shams();
      module2.exports = function hasNativeSymbols() {
        if (typeof origSymbol !== "function") {
          return false;
        }
        if (typeof Symbol !== "function") {
          return false;
        }
        if (typeof origSymbol("foo") !== "symbol") {
          return false;
        }
        if (typeof Symbol("bar") !== "symbol") {
          return false;
        }
        return hasSymbolSham();
      };
    }
  });

  // ../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/implementation.js
  var require_implementation2 = __commonJS({
    "../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/implementation.js"(exports, module2) {
      "use strict";
      var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
      var toStr2 = Object.prototype.toString;
      var max = Math.max;
      var funcType = "[object Function]";
      var concatty = function concatty2(a, b) {
        var arr = [];
        for (var i = 0; i < a.length; i += 1) {
          arr[i] = a[i];
        }
        for (var j = 0; j < b.length; j += 1) {
          arr[j + a.length] = b[j];
        }
        return arr;
      };
      var slicy = function slicy2(arrLike, offset) {
        var arr = [];
        for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
          arr[j] = arrLike[i];
        }
        return arr;
      };
      var joiny = function(arr, joiner) {
        var str = "";
        for (var i = 0; i < arr.length; i += 1) {
          str += arr[i];
          if (i + 1 < arr.length) {
            str += joiner;
          }
        }
        return str;
      };
      module2.exports = function bind(that) {
        var target = this;
        if (typeof target !== "function" || toStr2.apply(target) !== funcType) {
          throw new TypeError(ERROR_MESSAGE + target);
        }
        var args = slicy(arguments, 1);
        var bound;
        var binder = function() {
          if (this instanceof bound) {
            var result = target.apply(
              this,
              concatty(args, arguments)
            );
            if (Object(result) === result) {
              return result;
            }
            return this;
          }
          return target.apply(
            that,
            concatty(args, arguments)
          );
        };
        var boundLength = max(0, target.length - args.length);
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
          boundArgs[i] = "$" + i;
        }
        bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
        if (target.prototype) {
          var Empty = function Empty2() {
          };
          Empty.prototype = target.prototype;
          bound.prototype = new Empty();
          Empty.prototype = null;
        }
        return bound;
      };
    }
  });

  // ../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js
  var require_function_bind = __commonJS({
    "../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js"(exports, module2) {
      "use strict";
      var implementation = require_implementation2();
      module2.exports = Function.prototype.bind || implementation;
    }
  });

  // ../node_modules/.pnpm/function-bind@1.1.1/node_modules/function-bind/implementation.js
  var require_implementation3 = __commonJS({
    "../node_modules/.pnpm/function-bind@1.1.1/node_modules/function-bind/implementation.js"(exports, module2) {
      "use strict";
      var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
      var slice = Array.prototype.slice;
      var toStr2 = Object.prototype.toString;
      var funcType = "[object Function]";
      module2.exports = function bind(that) {
        var target = this;
        if (typeof target !== "function" || toStr2.call(target) !== funcType) {
          throw new TypeError(ERROR_MESSAGE + target);
        }
        var args = slice.call(arguments, 1);
        var bound;
        var binder = function() {
          if (this instanceof bound) {
            var result = target.apply(
              this,
              args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
              return result;
            }
            return this;
          } else {
            return target.apply(
              that,
              args.concat(slice.call(arguments))
            );
          }
        };
        var boundLength = Math.max(0, target.length - args.length);
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
          boundArgs.push("$" + i);
        }
        bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
        if (target.prototype) {
          var Empty = function Empty2() {
          };
          Empty.prototype = target.prototype;
          bound.prototype = new Empty();
          Empty.prototype = null;
        }
        return bound;
      };
    }
  });

  // ../node_modules/.pnpm/function-bind@1.1.1/node_modules/function-bind/index.js
  var require_function_bind2 = __commonJS({
    "../node_modules/.pnpm/function-bind@1.1.1/node_modules/function-bind/index.js"(exports, module2) {
      "use strict";
      var implementation = require_implementation3();
      module2.exports = Function.prototype.bind || implementation;
    }
  });

  // ../node_modules/.pnpm/has@1.0.3/node_modules/has/src/index.js
  var require_src = __commonJS({
    "../node_modules/.pnpm/has@1.0.3/node_modules/has/src/index.js"(exports, module2) {
      "use strict";
      var bind = require_function_bind2();
      module2.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
    }
  });

  // ../node_modules/.pnpm/get-intrinsic@1.1.3/node_modules/get-intrinsic/index.js
  var require_get_intrinsic = __commonJS({
    "../node_modules/.pnpm/get-intrinsic@1.1.3/node_modules/get-intrinsic/index.js"(exports, module2) {
      "use strict";
      var undefined2;
      var $SyntaxError = SyntaxError;
      var $Function = Function;
      var $TypeError = TypeError;
      var getEvalledConstructor = function(expressionSyntax) {
        try {
          return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
        } catch (e) {
        }
      };
      var $gOPD = Object.getOwnPropertyDescriptor;
      if ($gOPD) {
        try {
          $gOPD({}, "");
        } catch (e) {
          $gOPD = null;
        }
      }
      var throwTypeError = function() {
        throw new $TypeError();
      };
      var ThrowTypeError = $gOPD ? function() {
        try {
          arguments.callee;
          return throwTypeError;
        } catch (calleeThrows) {
          try {
            return $gOPD(arguments, "callee").get;
          } catch (gOPDthrows) {
            return throwTypeError;
          }
        }
      }() : throwTypeError;
      var hasSymbols = require_has_symbols()();
      var getProto = Object.getPrototypeOf || function(x) {
        return x.__proto__;
      };
      var needsEval = {};
      var TypedArray = typeof Uint8Array === "undefined" ? undefined2 : getProto(Uint8Array);
      var INTRINSICS = {
        "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
        "%Array%": Array,
        "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
        "%ArrayIteratorPrototype%": hasSymbols ? getProto([][Symbol.iterator]()) : undefined2,
        "%AsyncFromSyncIteratorPrototype%": undefined2,
        "%AsyncFunction%": needsEval,
        "%AsyncGenerator%": needsEval,
        "%AsyncGeneratorFunction%": needsEval,
        "%AsyncIteratorPrototype%": needsEval,
        "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
        "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
        "%Boolean%": Boolean,
        "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
        "%Date%": Date,
        "%decodeURI%": decodeURI,
        "%decodeURIComponent%": decodeURIComponent,
        "%encodeURI%": encodeURI,
        "%encodeURIComponent%": encodeURIComponent,
        "%Error%": Error,
        "%eval%": eval,
        // eslint-disable-line no-eval
        "%EvalError%": EvalError,
        "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
        "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
        "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
        "%Function%": $Function,
        "%GeneratorFunction%": needsEval,
        "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
        "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
        "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
        "%isFinite%": isFinite,
        "%isNaN%": isNaN,
        "%IteratorPrototype%": hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined2,
        "%JSON%": typeof JSON === "object" ? JSON : undefined2,
        "%Map%": typeof Map === "undefined" ? undefined2 : Map,
        "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
        "%Math%": Math,
        "%Number%": Number,
        "%Object%": Object,
        "%parseFloat%": parseFloat,
        "%parseInt%": parseInt,
        "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
        "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
        "%RangeError%": RangeError,
        "%ReferenceError%": ReferenceError,
        "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
        "%RegExp%": RegExp,
        "%Set%": typeof Set === "undefined" ? undefined2 : Set,
        "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
        "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
        "%String%": String,
        "%StringIteratorPrototype%": hasSymbols ? getProto(""[Symbol.iterator]()) : undefined2,
        "%Symbol%": hasSymbols ? Symbol : undefined2,
        "%SyntaxError%": $SyntaxError,
        "%ThrowTypeError%": ThrowTypeError,
        "%TypedArray%": TypedArray,
        "%TypeError%": $TypeError,
        "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
        "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
        "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
        "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
        "%URIError%": URIError,
        "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
        "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
        "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet
      };
      var doEval = function doEval2(name) {
        var value;
        if (name === "%AsyncFunction%") {
          value = getEvalledConstructor("async function () {}");
        } else if (name === "%GeneratorFunction%") {
          value = getEvalledConstructor("function* () {}");
        } else if (name === "%AsyncGeneratorFunction%") {
          value = getEvalledConstructor("async function* () {}");
        } else if (name === "%AsyncGenerator%") {
          var fn = doEval2("%AsyncGeneratorFunction%");
          if (fn) {
            value = fn.prototype;
          }
        } else if (name === "%AsyncIteratorPrototype%") {
          var gen = doEval2("%AsyncGenerator%");
          if (gen) {
            value = getProto(gen.prototype);
          }
        }
        INTRINSICS[name] = value;
        return value;
      };
      var LEGACY_ALIASES = {
        "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
        "%ArrayPrototype%": ["Array", "prototype"],
        "%ArrayProto_entries%": ["Array", "prototype", "entries"],
        "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
        "%ArrayProto_keys%": ["Array", "prototype", "keys"],
        "%ArrayProto_values%": ["Array", "prototype", "values"],
        "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
        "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
        "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
        "%BooleanPrototype%": ["Boolean", "prototype"],
        "%DataViewPrototype%": ["DataView", "prototype"],
        "%DatePrototype%": ["Date", "prototype"],
        "%ErrorPrototype%": ["Error", "prototype"],
        "%EvalErrorPrototype%": ["EvalError", "prototype"],
        "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
        "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
        "%FunctionPrototype%": ["Function", "prototype"],
        "%Generator%": ["GeneratorFunction", "prototype"],
        "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
        "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
        "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
        "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
        "%JSONParse%": ["JSON", "parse"],
        "%JSONStringify%": ["JSON", "stringify"],
        "%MapPrototype%": ["Map", "prototype"],
        "%NumberPrototype%": ["Number", "prototype"],
        "%ObjectPrototype%": ["Object", "prototype"],
        "%ObjProto_toString%": ["Object", "prototype", "toString"],
        "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
        "%PromisePrototype%": ["Promise", "prototype"],
        "%PromiseProto_then%": ["Promise", "prototype", "then"],
        "%Promise_all%": ["Promise", "all"],
        "%Promise_reject%": ["Promise", "reject"],
        "%Promise_resolve%": ["Promise", "resolve"],
        "%RangeErrorPrototype%": ["RangeError", "prototype"],
        "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
        "%RegExpPrototype%": ["RegExp", "prototype"],
        "%SetPrototype%": ["Set", "prototype"],
        "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
        "%StringPrototype%": ["String", "prototype"],
        "%SymbolPrototype%": ["Symbol", "prototype"],
        "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
        "%TypedArrayPrototype%": ["TypedArray", "prototype"],
        "%TypeErrorPrototype%": ["TypeError", "prototype"],
        "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
        "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
        "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
        "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
        "%URIErrorPrototype%": ["URIError", "prototype"],
        "%WeakMapPrototype%": ["WeakMap", "prototype"],
        "%WeakSetPrototype%": ["WeakSet", "prototype"]
      };
      var bind = require_function_bind();
      var hasOwn = require_src();
      var $concat = bind.call(Function.call, Array.prototype.concat);
      var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
      var $replace = bind.call(Function.call, String.prototype.replace);
      var $strSlice = bind.call(Function.call, String.prototype.slice);
      var $exec = bind.call(Function.call, RegExp.prototype.exec);
      var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
      var reEscapeChar = /\\(\\)?/g;
      var stringToPath = function stringToPath2(string) {
        var first = $strSlice(string, 0, 1);
        var last = $strSlice(string, -1);
        if (first === "%" && last !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
        } else if (last === "%" && first !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
        }
        var result = [];
        $replace(string, rePropName, function(match, number, quote, subString) {
          result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
        });
        return result;
      };
      var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
        var intrinsicName = name;
        var alias;
        if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
          alias = LEGACY_ALIASES[intrinsicName];
          intrinsicName = "%" + alias[0] + "%";
        }
        if (hasOwn(INTRINSICS, intrinsicName)) {
          var value = INTRINSICS[intrinsicName];
          if (value === needsEval) {
            value = doEval(intrinsicName);
          }
          if (typeof value === "undefined" && !allowMissing) {
            throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
          }
          return {
            alias,
            name: intrinsicName,
            value
          };
        }
        throw new $SyntaxError("intrinsic " + name + " does not exist!");
      };
      module2.exports = function GetIntrinsic(name, allowMissing) {
        if (typeof name !== "string" || name.length === 0) {
          throw new $TypeError("intrinsic name must be a non-empty string");
        }
        if (arguments.length > 1 && typeof allowMissing !== "boolean") {
          throw new $TypeError('"allowMissing" argument must be a boolean');
        }
        if ($exec(/^%?[^%]*%?$/, name) === null) {
          throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
        }
        var parts = stringToPath(name);
        var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
        var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
        var intrinsicRealName = intrinsic.name;
        var value = intrinsic.value;
        var skipFurtherCaching = false;
        var alias = intrinsic.alias;
        if (alias) {
          intrinsicBaseName = alias[0];
          $spliceApply(parts, $concat([0, 1], alias));
        }
        for (var i = 1, isOwn = true; i < parts.length; i += 1) {
          var part = parts[i];
          var first = $strSlice(part, 0, 1);
          var last = $strSlice(part, -1);
          if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
            throw new $SyntaxError("property names with quotes must have matching quotes");
          }
          if (part === "constructor" || !isOwn) {
            skipFurtherCaching = true;
          }
          intrinsicBaseName += "." + part;
          intrinsicRealName = "%" + intrinsicBaseName + "%";
          if (hasOwn(INTRINSICS, intrinsicRealName)) {
            value = INTRINSICS[intrinsicRealName];
          } else if (value != null) {
            if (!(part in value)) {
              if (!allowMissing) {
                throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
              }
              return void 0;
            }
            if ($gOPD && i + 1 >= parts.length) {
              var desc = $gOPD(value, part);
              isOwn = !!desc;
              if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
                value = desc.get;
              } else {
                value = value[part];
              }
            } else {
              isOwn = hasOwn(value, part);
              value = value[part];
            }
            if (isOwn && !skipFurtherCaching) {
              INTRINSICS[intrinsicRealName] = value;
            }
          }
        }
        return value;
      };
    }
  });

  // ../node_modules/.pnpm/has-property-descriptors@1.0.0/node_modules/has-property-descriptors/index.js
  var require_has_property_descriptors = __commonJS({
    "../node_modules/.pnpm/has-property-descriptors@1.0.0/node_modules/has-property-descriptors/index.js"(exports, module2) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
      var hasPropertyDescriptors = function hasPropertyDescriptors2() {
        if ($defineProperty) {
          try {
            $defineProperty({}, "a", { value: 1 });
            return true;
          } catch (e) {
            return false;
          }
        }
        return false;
      };
      hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
        if (!hasPropertyDescriptors()) {
          return null;
        }
        try {
          return $defineProperty([], "length", { value: 1 }).length !== 1;
        } catch (e) {
          return true;
        }
      };
      module2.exports = hasPropertyDescriptors;
    }
  });

  // ../node_modules/.pnpm/define-properties@1.1.4/node_modules/define-properties/index.js
  var require_define_properties = __commonJS({
    "../node_modules/.pnpm/define-properties@1.1.4/node_modules/define-properties/index.js"(exports, module2) {
      "use strict";
      var keys = require_object_keys();
      var hasSymbols = typeof Symbol === "function" && typeof Symbol("foo") === "symbol";
      var toStr2 = Object.prototype.toString;
      var concat = Array.prototype.concat;
      var origDefineProperty = Object.defineProperty;
      var isFunction = function(fn) {
        return typeof fn === "function" && toStr2.call(fn) === "[object Function]";
      };
      var hasPropertyDescriptors = require_has_property_descriptors()();
      var supportsDescriptors = origDefineProperty && hasPropertyDescriptors;
      var defineProperty = function(object, name, value, predicate) {
        if (name in object && (!isFunction(predicate) || !predicate())) {
          return;
        }
        if (supportsDescriptors) {
          origDefineProperty(object, name, {
            configurable: true,
            enumerable: false,
            value,
            writable: true
          });
        } else {
          object[name] = value;
        }
      };
      var defineProperties = function(object, map) {
        var predicates = arguments.length > 2 ? arguments[2] : {};
        var props = keys(map);
        if (hasSymbols) {
          props = concat.call(props, Object.getOwnPropertySymbols(map));
        }
        for (var i = 0; i < props.length; i += 1) {
          defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
        }
      };
      defineProperties.supportsDescriptors = !!supportsDescriptors;
      module2.exports = defineProperties;
    }
  });

  // ../node_modules/.pnpm/call-bind@1.0.2/node_modules/call-bind/index.js
  var require_call_bind = __commonJS({
    "../node_modules/.pnpm/call-bind@1.0.2/node_modules/call-bind/index.js"(exports, module2) {
      "use strict";
      var bind = require_function_bind();
      var GetIntrinsic = require_get_intrinsic();
      var $apply = GetIntrinsic("%Function.prototype.apply%");
      var $call = GetIntrinsic("%Function.prototype.call%");
      var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
      var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
      var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
      var $max = GetIntrinsic("%Math.max%");
      if ($defineProperty) {
        try {
          $defineProperty({}, "a", { value: 1 });
        } catch (e) {
          $defineProperty = null;
        }
      }
      module2.exports = function callBind(originalFunction) {
        var func = $reflectApply(bind, $call, arguments);
        if ($gOPD && $defineProperty) {
          var desc = $gOPD(func, "length");
          if (desc.configurable) {
            $defineProperty(
              func,
              "length",
              { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
            );
          }
        }
        return func;
      };
      var applyBind = function applyBind2() {
        return $reflectApply(bind, $apply, arguments);
      };
      if ($defineProperty) {
        $defineProperty(module2.exports, "apply", { value: applyBind });
      } else {
        module2.exports.apply = applyBind;
      }
    }
  });

  // ../node_modules/.pnpm/call-bind@1.0.2/node_modules/call-bind/callBound.js
  var require_callBound = __commonJS({
    "../node_modules/.pnpm/call-bind@1.0.2/node_modules/call-bind/callBound.js"(exports, module2) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var callBind = require_call_bind();
      var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
      module2.exports = function callBoundIntrinsic(name, allowMissing) {
        var intrinsic = GetIntrinsic(name, !!allowMissing);
        if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
          return callBind(intrinsic);
        }
        return intrinsic;
      };
    }
  });

  // ../node_modules/.pnpm/object.assign@4.1.4/node_modules/object.assign/implementation.js
  var require_implementation4 = __commonJS({
    "../node_modules/.pnpm/object.assign@4.1.4/node_modules/object.assign/implementation.js"(exports, module2) {
      "use strict";
      var objectKeys = require_object_keys();
      var hasSymbols = require_shams()();
      var callBound = require_callBound();
      var toObject = Object;
      var $push = callBound("Array.prototype.push");
      var $propIsEnumerable = callBound("Object.prototype.propertyIsEnumerable");
      var originalGetSymbols = hasSymbols ? Object.getOwnPropertySymbols : null;
      module2.exports = function assign(target, source1) {
        if (target == null) {
          throw new TypeError("target must be an object");
        }
        var to = toObject(target);
        if (arguments.length === 1) {
          return to;
        }
        for (var s = 1; s < arguments.length; ++s) {
          var from = toObject(arguments[s]);
          var keys = objectKeys(from);
          var getSymbols = hasSymbols && (Object.getOwnPropertySymbols || originalGetSymbols);
          if (getSymbols) {
            var syms = getSymbols(from);
            for (var j = 0; j < syms.length; ++j) {
              var key = syms[j];
              if ($propIsEnumerable(from, key)) {
                $push(keys, key);
              }
            }
          }
          for (var i = 0; i < keys.length; ++i) {
            var nextKey = keys[i];
            if ($propIsEnumerable(from, nextKey)) {
              var propValue = from[nextKey];
              to[nextKey] = propValue;
            }
          }
        }
        return to;
      };
    }
  });

  // ../node_modules/.pnpm/object.assign@4.1.4/node_modules/object.assign/polyfill.js
  var require_polyfill = __commonJS({
    "../node_modules/.pnpm/object.assign@4.1.4/node_modules/object.assign/polyfill.js"(exports, module2) {
      "use strict";
      var implementation = require_implementation4();
      var lacksProperEnumerationOrder = function() {
        if (!Object.assign) {
          return false;
        }
        var str = "abcdefghijklmnopqrst";
        var letters = str.split("");
        var map = {};
        for (var i = 0; i < letters.length; ++i) {
          map[letters[i]] = letters[i];
        }
        var obj = Object.assign({}, map);
        var actual = "";
        for (var k in obj) {
          actual += k;
        }
        return str !== actual;
      };
      var assignHasPendingExceptions = function() {
        if (!Object.assign || !Object.preventExtensions) {
          return false;
        }
        var thrower = Object.preventExtensions({ 1: 2 });
        try {
          Object.assign(thrower, "xy");
        } catch (e) {
          return thrower[1] === "y";
        }
        return false;
      };
      module2.exports = function getPolyfill() {
        if (!Object.assign) {
          return implementation;
        }
        if (lacksProperEnumerationOrder()) {
          return implementation;
        }
        if (assignHasPendingExceptions()) {
          return implementation;
        }
        return Object.assign;
      };
    }
  });

  // ../node_modules/.pnpm/object.assign@4.1.4/node_modules/object.assign/shim.js
  var require_shim = __commonJS({
    "../node_modules/.pnpm/object.assign@4.1.4/node_modules/object.assign/shim.js"(exports, module2) {
      "use strict";
      var define2 = require_define_properties();
      var getPolyfill = require_polyfill();
      module2.exports = function shimAssign() {
        var polyfill = getPolyfill();
        define2(
          Object,
          { assign: polyfill },
          { assign: function() {
            return Object.assign !== polyfill;
          } }
        );
        return polyfill;
      };
    }
  });

  // ../node_modules/.pnpm/object.assign@4.1.4/node_modules/object.assign/index.js
  var require_object = __commonJS({
    "../node_modules/.pnpm/object.assign@4.1.4/node_modules/object.assign/index.js"(exports, module2) {
      "use strict";
      var defineProperties = require_define_properties();
      var callBind = require_call_bind();
      var implementation = require_implementation4();
      var getPolyfill = require_polyfill();
      var shim = require_shim();
      var polyfill = callBind.apply(getPolyfill());
      var bound = function assign(target, source1) {
        return polyfill(Object, arguments);
      };
      defineProperties(bound, {
        getPolyfill,
        implementation,
        shim
      });
      module2.exports = bound;
    }
  });

  // ../node_modules/.pnpm/functions-have-names@1.2.3/node_modules/functions-have-names/index.js
  var require_functions_have_names = __commonJS({
    "../node_modules/.pnpm/functions-have-names@1.2.3/node_modules/functions-have-names/index.js"(exports, module2) {
      "use strict";
      var functionsHaveNames = function functionsHaveNames2() {
        return typeof function f() {
        }.name === "string";
      };
      var gOPD = Object.getOwnPropertyDescriptor;
      if (gOPD) {
        try {
          gOPD([], "length");
        } catch (e) {
          gOPD = null;
        }
      }
      functionsHaveNames.functionsHaveConfigurableNames = function functionsHaveConfigurableNames() {
        if (!functionsHaveNames() || !gOPD) {
          return false;
        }
        var desc = gOPD(function() {
        }, "name");
        return !!desc && !!desc.configurable;
      };
      var $bind = Function.prototype.bind;
      functionsHaveNames.boundFunctionsHaveNames = function boundFunctionsHaveNames() {
        return functionsHaveNames() && typeof $bind === "function" && function f() {
        }.bind().name !== "";
      };
      module2.exports = functionsHaveNames;
    }
  });

  // ../node_modules/.pnpm/regexp.prototype.flags@1.4.3/node_modules/regexp.prototype.flags/implementation.js
  var require_implementation5 = __commonJS({
    "../node_modules/.pnpm/regexp.prototype.flags@1.4.3/node_modules/regexp.prototype.flags/implementation.js"(exports, module2) {
      "use strict";
      var functionsHaveConfigurableNames = require_functions_have_names().functionsHaveConfigurableNames();
      var $Object = Object;
      var $TypeError = TypeError;
      module2.exports = function flags() {
        if (this != null && this !== $Object(this)) {
          throw new $TypeError("RegExp.prototype.flags getter called on non-object");
        }
        var result = "";
        if (this.hasIndices) {
          result += "d";
        }
        if (this.global) {
          result += "g";
        }
        if (this.ignoreCase) {
          result += "i";
        }
        if (this.multiline) {
          result += "m";
        }
        if (this.dotAll) {
          result += "s";
        }
        if (this.unicode) {
          result += "u";
        }
        if (this.sticky) {
          result += "y";
        }
        return result;
      };
      if (functionsHaveConfigurableNames && Object.defineProperty) {
        Object.defineProperty(module2.exports, "name", { value: "get flags" });
      }
    }
  });

  // ../node_modules/.pnpm/regexp.prototype.flags@1.4.3/node_modules/regexp.prototype.flags/polyfill.js
  var require_polyfill2 = __commonJS({
    "../node_modules/.pnpm/regexp.prototype.flags@1.4.3/node_modules/regexp.prototype.flags/polyfill.js"(exports, module2) {
      "use strict";
      var implementation = require_implementation5();
      var supportsDescriptors = require_define_properties().supportsDescriptors;
      var $gOPD = Object.getOwnPropertyDescriptor;
      module2.exports = function getPolyfill() {
        if (supportsDescriptors && /a/mig.flags === "gim") {
          var descriptor = $gOPD(RegExp.prototype, "flags");
          if (descriptor && typeof descriptor.get === "function" && typeof RegExp.prototype.dotAll === "boolean" && typeof RegExp.prototype.hasIndices === "boolean") {
            var calls = "";
            var o = {};
            Object.defineProperty(o, "hasIndices", {
              get: function() {
                calls += "d";
              }
            });
            Object.defineProperty(o, "sticky", {
              get: function() {
                calls += "y";
              }
            });
            if (calls === "dy") {
              return descriptor.get;
            }
          }
        }
        return implementation;
      };
    }
  });

  // ../node_modules/.pnpm/regexp.prototype.flags@1.4.3/node_modules/regexp.prototype.flags/shim.js
  var require_shim2 = __commonJS({
    "../node_modules/.pnpm/regexp.prototype.flags@1.4.3/node_modules/regexp.prototype.flags/shim.js"(exports, module2) {
      "use strict";
      var supportsDescriptors = require_define_properties().supportsDescriptors;
      var getPolyfill = require_polyfill2();
      var gOPD = Object.getOwnPropertyDescriptor;
      var defineProperty = Object.defineProperty;
      var TypeErr = TypeError;
      var getProto = Object.getPrototypeOf;
      var regex = /a/;
      module2.exports = function shimFlags() {
        if (!supportsDescriptors || !getProto) {
          throw new TypeErr("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors");
        }
        var polyfill = getPolyfill();
        var proto = getProto(regex);
        var descriptor = gOPD(proto, "flags");
        if (!descriptor || descriptor.get !== polyfill) {
          defineProperty(proto, "flags", {
            configurable: true,
            enumerable: false,
            get: polyfill
          });
        }
        return polyfill;
      };
    }
  });

  // ../node_modules/.pnpm/regexp.prototype.flags@1.4.3/node_modules/regexp.prototype.flags/index.js
  var require_regexp_prototype = __commonJS({
    "../node_modules/.pnpm/regexp.prototype.flags@1.4.3/node_modules/regexp.prototype.flags/index.js"(exports, module2) {
      "use strict";
      var define2 = require_define_properties();
      var callBind = require_call_bind();
      var implementation = require_implementation5();
      var getPolyfill = require_polyfill2();
      var shim = require_shim2();
      var flagsBound = callBind(getPolyfill());
      define2(flagsBound, {
        getPolyfill,
        implementation,
        shim
      });
      module2.exports = flagsBound;
    }
  });

  // ../node_modules/.pnpm/has-tostringtag@1.0.0/node_modules/has-tostringtag/shams.js
  var require_shams2 = __commonJS({
    "../node_modules/.pnpm/has-tostringtag@1.0.0/node_modules/has-tostringtag/shams.js"(exports, module2) {
      "use strict";
      var hasSymbols = require_shams();
      module2.exports = function hasToStringTagShams() {
        return hasSymbols() && !!Symbol.toStringTag;
      };
    }
  });

  // ../node_modules/.pnpm/is-arguments@1.1.1/node_modules/is-arguments/index.js
  var require_is_arguments = __commonJS({
    "../node_modules/.pnpm/is-arguments@1.1.1/node_modules/is-arguments/index.js"(exports, module2) {
      "use strict";
      var hasToStringTag = require_shams2()();
      var callBound = require_callBound();
      var $toString = callBound("Object.prototype.toString");
      var isStandardArguments = function isArguments(value) {
        if (hasToStringTag && value && typeof value === "object" && Symbol.toStringTag in value) {
          return false;
        }
        return $toString(value) === "[object Arguments]";
      };
      var isLegacyArguments = function isArguments(value) {
        if (isStandardArguments(value)) {
          return true;
        }
        return value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && $toString(value) !== "[object Array]" && $toString(value.callee) === "[object Function]";
      };
      var supportsStandardArguments = function() {
        return isStandardArguments(arguments);
      }();
      isStandardArguments.isLegacyArguments = isLegacyArguments;
      module2.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
    }
  });

  // ../node_modules/.pnpm/isarray@2.0.5/node_modules/isarray/index.js
  var require_isarray = __commonJS({
    "../node_modules/.pnpm/isarray@2.0.5/node_modules/isarray/index.js"(exports, module2) {
      var toString = {}.toString;
      module2.exports = Array.isArray || function(arr) {
        return toString.call(arr) == "[object Array]";
      };
    }
  });

  // ../node_modules/.pnpm/is-string@1.0.7/node_modules/is-string/index.js
  var require_is_string = __commonJS({
    "../node_modules/.pnpm/is-string@1.0.7/node_modules/is-string/index.js"(exports, module2) {
      "use strict";
      var strValue = String.prototype.valueOf;
      var tryStringObject = function tryStringObject2(value) {
        try {
          strValue.call(value);
          return true;
        } catch (e) {
          return false;
        }
      };
      var toStr2 = Object.prototype.toString;
      var strClass = "[object String]";
      var hasToStringTag = require_shams2()();
      module2.exports = function isString(value) {
        if (typeof value === "string") {
          return true;
        }
        if (typeof value !== "object") {
          return false;
        }
        return hasToStringTag ? tryStringObject(value) : toStr2.call(value) === strClass;
      };
    }
  });

  // ../node_modules/.pnpm/is-map@2.0.2/node_modules/is-map/index.js
  var require_is_map = __commonJS({
    "../node_modules/.pnpm/is-map@2.0.2/node_modules/is-map/index.js"(exports, module2) {
      "use strict";
      var $Map = typeof Map === "function" && Map.prototype ? Map : null;
      var $Set = typeof Set === "function" && Set.prototype ? Set : null;
      var exported;
      if (!$Map) {
        exported = function isMap(x) {
          return false;
        };
      }
      var $mapHas = $Map ? Map.prototype.has : null;
      var $setHas = $Set ? Set.prototype.has : null;
      if (!exported && !$mapHas) {
        exported = function isMap(x) {
          return false;
        };
      }
      module2.exports = exported || function isMap(x) {
        if (!x || typeof x !== "object") {
          return false;
        }
        try {
          $mapHas.call(x);
          if ($setHas) {
            try {
              $setHas.call(x);
            } catch (e) {
              return true;
            }
          }
          return x instanceof $Map;
        } catch (e) {
        }
        return false;
      };
    }
  });

  // ../node_modules/.pnpm/is-set@2.0.2/node_modules/is-set/index.js
  var require_is_set = __commonJS({
    "../node_modules/.pnpm/is-set@2.0.2/node_modules/is-set/index.js"(exports, module2) {
      "use strict";
      var $Map = typeof Map === "function" && Map.prototype ? Map : null;
      var $Set = typeof Set === "function" && Set.prototype ? Set : null;
      var exported;
      if (!$Set) {
        exported = function isSet(x) {
          return false;
        };
      }
      var $mapHas = $Map ? Map.prototype.has : null;
      var $setHas = $Set ? Set.prototype.has : null;
      if (!exported && !$setHas) {
        exported = function isSet(x) {
          return false;
        };
      }
      module2.exports = exported || function isSet(x) {
        if (!x || typeof x !== "object") {
          return false;
        }
        try {
          $setHas.call(x);
          if ($mapHas) {
            try {
              $mapHas.call(x);
            } catch (e) {
              return true;
            }
          }
          return x instanceof $Set;
        } catch (e) {
        }
        return false;
      };
    }
  });

  // ../node_modules/.pnpm/es-get-iterator@1.1.2/node_modules/es-get-iterator/index.js
  var require_es_get_iterator = __commonJS({
    "../node_modules/.pnpm/es-get-iterator@1.1.2/node_modules/es-get-iterator/index.js"(exports, module2) {
      "use strict";
      var isArguments = require_is_arguments();
      if (require_has_symbols()() || require_shams()()) {
        $iterator = Symbol.iterator;
        module2.exports = function getIterator(iterable) {
          if (iterable != null && typeof iterable[$iterator] !== "undefined") {
            return iterable[$iterator]();
          }
          if (isArguments(iterable)) {
            return Array.prototype[$iterator].call(iterable);
          }
        };
      } else {
        isArray = require_isarray();
        isString = require_is_string();
        GetIntrinsic = require_get_intrinsic();
        $Map = GetIntrinsic("%Map%", true);
        $Set = GetIntrinsic("%Set%", true);
        callBound = require_callBound();
        $arrayPush = callBound("Array.prototype.push");
        $charCodeAt = callBound("String.prototype.charCodeAt");
        $stringSlice = callBound("String.prototype.slice");
        advanceStringIndex = function advanceStringIndex2(S, index) {
          var length = S.length;
          if (index + 1 >= length) {
            return index + 1;
          }
          var first = $charCodeAt(S, index);
          if (first < 55296 || first > 56319) {
            return index + 1;
          }
          var second = $charCodeAt(S, index + 1);
          if (second < 56320 || second > 57343) {
            return index + 1;
          }
          return index + 2;
        };
        getArrayIterator = function getArrayIterator2(arraylike) {
          var i = 0;
          return {
            next: function next() {
              var done = i >= arraylike.length;
              var value;
              if (!done) {
                value = arraylike[i];
                i += 1;
              }
              return {
                done,
                value
              };
            }
          };
        };
        getNonCollectionIterator = function getNonCollectionIterator2(iterable, noPrimordialCollections) {
          if (isArray(iterable) || isArguments(iterable)) {
            return getArrayIterator(iterable);
          }
          if (isString(iterable)) {
            var i = 0;
            return {
              next: function next() {
                var nextIndex = advanceStringIndex(iterable, i);
                var value = $stringSlice(iterable, i, nextIndex);
                i = nextIndex;
                return {
                  done: nextIndex > iterable.length,
                  value
                };
              }
            };
          }
          if (noPrimordialCollections && typeof iterable["_es6-shim iterator_"] !== "undefined") {
            return iterable["_es6-shim iterator_"]();
          }
        };
        if (!$Map && !$Set) {
          module2.exports = function getIterator(iterable) {
            if (iterable != null) {
              return getNonCollectionIterator(iterable, true);
            }
          };
        } else {
          isMap = require_is_map();
          isSet = require_is_set();
          $mapForEach = callBound("Map.prototype.forEach", true);
          $setForEach = callBound("Set.prototype.forEach", true);
          if (typeof process === "undefined" || !process.versions || !process.versions.node) {
            $mapIterator = callBound("Map.prototype.iterator", true);
            $setIterator = callBound("Set.prototype.iterator", true);
            getStopIterationIterator = function(iterator) {
              var done = false;
              return {
                next: function next() {
                  try {
                    return {
                      done,
                      value: done ? void 0 : iterator.next()
                    };
                  } catch (e) {
                    done = true;
                    return {
                      done: true,
                      value: void 0
                    };
                  }
                }
              };
            };
          }
          $mapAtAtIterator = callBound("Map.prototype.@@iterator", true) || callBound("Map.prototype._es6-shim iterator_", true);
          $setAtAtIterator = callBound("Set.prototype.@@iterator", true) || callBound("Set.prototype._es6-shim iterator_", true);
          getCollectionIterator = function getCollectionIterator2(iterable) {
            if (isMap(iterable)) {
              if ($mapIterator) {
                return getStopIterationIterator($mapIterator(iterable));
              }
              if ($mapAtAtIterator) {
                return $mapAtAtIterator(iterable);
              }
              if ($mapForEach) {
                var entries = [];
                $mapForEach(iterable, function(v, k) {
                  $arrayPush(entries, [k, v]);
                });
                return getArrayIterator(entries);
              }
            }
            if (isSet(iterable)) {
              if ($setIterator) {
                return getStopIterationIterator($setIterator(iterable));
              }
              if ($setAtAtIterator) {
                return $setAtAtIterator(iterable);
              }
              if ($setForEach) {
                var values = [];
                $setForEach(iterable, function(v) {
                  $arrayPush(values, v);
                });
                return getArrayIterator(values);
              }
            }
          };
          module2.exports = function getIterator(iterable) {
            return getCollectionIterator(iterable) || getNonCollectionIterator(iterable);
          };
        }
      }
      var $iterator;
      var isArray;
      var isString;
      var GetIntrinsic;
      var $Map;
      var $Set;
      var callBound;
      var $arrayPush;
      var $charCodeAt;
      var $stringSlice;
      var advanceStringIndex;
      var getArrayIterator;
      var getNonCollectionIterator;
      var isMap;
      var isSet;
      var $mapForEach;
      var $setForEach;
      var $mapIterator;
      var $setIterator;
      var getStopIterationIterator;
      var $mapAtAtIterator;
      var $setAtAtIterator;
      var getCollectionIterator;
    }
  });

  // (disabled):../node_modules/.pnpm/object-inspect@1.12.2/node_modules/object-inspect/util.inspect
  var require_util = __commonJS({
    "(disabled):../node_modules/.pnpm/object-inspect@1.12.2/node_modules/object-inspect/util.inspect"() {
    }
  });

  // ../node_modules/.pnpm/object-inspect@1.12.2/node_modules/object-inspect/index.js
  var require_object_inspect = __commonJS({
    "../node_modules/.pnpm/object-inspect@1.12.2/node_modules/object-inspect/index.js"(exports, module2) {
      var hasMap = typeof Map === "function" && Map.prototype;
      var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
      var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
      var mapForEach = hasMap && Map.prototype.forEach;
      var hasSet = typeof Set === "function" && Set.prototype;
      var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
      var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
      var setForEach = hasSet && Set.prototype.forEach;
      var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
      var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
      var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
      var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
      var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
      var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
      var booleanValueOf = Boolean.prototype.valueOf;
      var objectToString = Object.prototype.toString;
      var functionToString = Function.prototype.toString;
      var $match = String.prototype.match;
      var $slice = String.prototype.slice;
      var $replace = String.prototype.replace;
      var $toUpperCase = String.prototype.toUpperCase;
      var $toLowerCase = String.prototype.toLowerCase;
      var $test = RegExp.prototype.test;
      var $concat = Array.prototype.concat;
      var $join = Array.prototype.join;
      var $arrSlice = Array.prototype.slice;
      var $floor = Math.floor;
      var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
      var gOPS = Object.getOwnPropertySymbols;
      var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
      var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
      var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
      var isEnumerable = Object.prototype.propertyIsEnumerable;
      var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
        return O.__proto__;
      } : null);
      function addNumericSeparator(num, str) {
        if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
          return str;
        }
        var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
        if (typeof num === "number") {
          var int = num < 0 ? -$floor(-num) : $floor(num);
          if (int !== num) {
            var intStr = String(int);
            var dec = $slice.call(str, intStr.length + 1);
            return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
          }
        }
        return $replace.call(str, sepRegex, "$&_");
      }
      var utilInspect = require_util();
      var inspectCustom = utilInspect.custom;
      var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
      module2.exports = function inspect_(obj, options, depth, seen) {
        var opts = options || {};
        if (has(opts, "quoteStyle") && (opts.quoteStyle !== "single" && opts.quoteStyle !== "double")) {
          throw new TypeError('option "quoteStyle" must be "single" or "double"');
        }
        if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
          throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
        }
        var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
        if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
          throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
        }
        if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
          throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
        }
        if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
          throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
        }
        var numericSeparator = opts.numericSeparator;
        if (typeof obj === "undefined") {
          return "undefined";
        }
        if (obj === null) {
          return "null";
        }
        if (typeof obj === "boolean") {
          return obj ? "true" : "false";
        }
        if (typeof obj === "string") {
          return inspectString(obj, opts);
        }
        if (typeof obj === "number") {
          if (obj === 0) {
            return Infinity / obj > 0 ? "0" : "-0";
          }
          var str = String(obj);
          return numericSeparator ? addNumericSeparator(obj, str) : str;
        }
        if (typeof obj === "bigint") {
          var bigIntStr = String(obj) + "n";
          return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
        }
        var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
        if (typeof depth === "undefined") {
          depth = 0;
        }
        if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
          return isArray(obj) ? "[Array]" : "[Object]";
        }
        var indent = getIndent(opts, depth);
        if (typeof seen === "undefined") {
          seen = [];
        } else if (indexOf(seen, obj) >= 0) {
          return "[Circular]";
        }
        function inspect(value, from, noIndent) {
          if (from) {
            seen = $arrSlice.call(seen);
            seen.push(from);
          }
          if (noIndent) {
            var newOpts = {
              depth: opts.depth
            };
            if (has(opts, "quoteStyle")) {
              newOpts.quoteStyle = opts.quoteStyle;
            }
            return inspect_(value, newOpts, depth + 1, seen);
          }
          return inspect_(value, opts, depth + 1, seen);
        }
        if (typeof obj === "function" && !isRegExp(obj)) {
          var name = nameOf(obj);
          var keys = arrObjKeys(obj, inspect);
          return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
        }
        if (isSymbol(obj)) {
          var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
          return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
        }
        if (isElement4(obj)) {
          var s = "<" + $toLowerCase.call(String(obj.nodeName));
          var attrs = obj.attributes || [];
          for (var i = 0; i < attrs.length; i++) {
            s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
          }
          s += ">";
          if (obj.childNodes && obj.childNodes.length) {
            s += "...";
          }
          s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
          return s;
        }
        if (isArray(obj)) {
          if (obj.length === 0) {
            return "[]";
          }
          var xs = arrObjKeys(obj, inspect);
          if (indent && !singleLineValues(xs)) {
            return "[" + indentedJoin(xs, indent) + "]";
          }
          return "[ " + $join.call(xs, ", ") + " ]";
        }
        if (isError(obj)) {
          var parts = arrObjKeys(obj, inspect);
          if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
            return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect(obj.cause), parts), ", ") + " }";
          }
          if (parts.length === 0) {
            return "[" + String(obj) + "]";
          }
          return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
        }
        if (typeof obj === "object" && customInspect) {
          if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
            return utilInspect(obj, { depth: maxDepth - depth });
          } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
            return obj.inspect();
          }
        }
        if (isMap(obj)) {
          var mapParts = [];
          mapForEach.call(obj, function(value, key) {
            mapParts.push(inspect(key, obj, true) + " => " + inspect(value, obj));
          });
          return collectionOf("Map", mapSize.call(obj), mapParts, indent);
        }
        if (isSet(obj)) {
          var setParts = [];
          setForEach.call(obj, function(value) {
            setParts.push(inspect(value, obj));
          });
          return collectionOf("Set", setSize.call(obj), setParts, indent);
        }
        if (isWeakMap(obj)) {
          return weakCollectionOf("WeakMap");
        }
        if (isWeakSet(obj)) {
          return weakCollectionOf("WeakSet");
        }
        if (isWeakRef(obj)) {
          return weakCollectionOf("WeakRef");
        }
        if (isNumber(obj)) {
          return markBoxed(inspect(Number(obj)));
        }
        if (isBigInt(obj)) {
          return markBoxed(inspect(bigIntValueOf.call(obj)));
        }
        if (isBoolean(obj)) {
          return markBoxed(booleanValueOf.call(obj));
        }
        if (isString(obj)) {
          return markBoxed(inspect(String(obj)));
        }
        if (!isDate(obj) && !isRegExp(obj)) {
          var ys = arrObjKeys(obj, inspect);
          var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
          var protoTag = obj instanceof Object ? "" : "null prototype";
          var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr2(obj), 8, -1) : protoTag ? "Object" : "";
          var constructorTag = isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
          var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
          if (ys.length === 0) {
            return tag + "{}";
          }
          if (indent) {
            return tag + "{" + indentedJoin(ys, indent) + "}";
          }
          return tag + "{ " + $join.call(ys, ", ") + " }";
        }
        return String(obj);
      };
      function wrapQuotes(s, defaultStyle, opts) {
        var quoteChar = (opts.quoteStyle || defaultStyle) === "double" ? '"' : "'";
        return quoteChar + s + quoteChar;
      }
      function quote(s) {
        return $replace.call(String(s), /"/g, "&quot;");
      }
      function isArray(obj) {
        return toStr2(obj) === "[object Array]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isDate(obj) {
        return toStr2(obj) === "[object Date]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isRegExp(obj) {
        return toStr2(obj) === "[object RegExp]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isError(obj) {
        return toStr2(obj) === "[object Error]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isString(obj) {
        return toStr2(obj) === "[object String]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isNumber(obj) {
        return toStr2(obj) === "[object Number]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isBoolean(obj) {
        return toStr2(obj) === "[object Boolean]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isSymbol(obj) {
        if (hasShammedSymbols) {
          return obj && typeof obj === "object" && obj instanceof Symbol;
        }
        if (typeof obj === "symbol") {
          return true;
        }
        if (!obj || typeof obj !== "object" || !symToString) {
          return false;
        }
        try {
          symToString.call(obj);
          return true;
        } catch (e) {
        }
        return false;
      }
      function isBigInt(obj) {
        if (!obj || typeof obj !== "object" || !bigIntValueOf) {
          return false;
        }
        try {
          bigIntValueOf.call(obj);
          return true;
        } catch (e) {
        }
        return false;
      }
      var hasOwn = Object.prototype.hasOwnProperty || function(key) {
        return key in this;
      };
      function has(obj, key) {
        return hasOwn.call(obj, key);
      }
      function toStr2(obj) {
        return objectToString.call(obj);
      }
      function nameOf(f) {
        if (f.name) {
          return f.name;
        }
        var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
        if (m) {
          return m[1];
        }
        return null;
      }
      function indexOf(xs, x) {
        if (xs.indexOf) {
          return xs.indexOf(x);
        }
        for (var i = 0, l = xs.length; i < l; i++) {
          if (xs[i] === x) {
            return i;
          }
        }
        return -1;
      }
      function isMap(x) {
        if (!mapSize || !x || typeof x !== "object") {
          return false;
        }
        try {
          mapSize.call(x);
          try {
            setSize.call(x);
          } catch (s) {
            return true;
          }
          return x instanceof Map;
        } catch (e) {
        }
        return false;
      }
      function isWeakMap(x) {
        if (!weakMapHas || !x || typeof x !== "object") {
          return false;
        }
        try {
          weakMapHas.call(x, weakMapHas);
          try {
            weakSetHas.call(x, weakSetHas);
          } catch (s) {
            return true;
          }
          return x instanceof WeakMap;
        } catch (e) {
        }
        return false;
      }
      function isWeakRef(x) {
        if (!weakRefDeref || !x || typeof x !== "object") {
          return false;
        }
        try {
          weakRefDeref.call(x);
          return true;
        } catch (e) {
        }
        return false;
      }
      function isSet(x) {
        if (!setSize || !x || typeof x !== "object") {
          return false;
        }
        try {
          setSize.call(x);
          try {
            mapSize.call(x);
          } catch (m) {
            return true;
          }
          return x instanceof Set;
        } catch (e) {
        }
        return false;
      }
      function isWeakSet(x) {
        if (!weakSetHas || !x || typeof x !== "object") {
          return false;
        }
        try {
          weakSetHas.call(x, weakSetHas);
          try {
            weakMapHas.call(x, weakMapHas);
          } catch (s) {
            return true;
          }
          return x instanceof WeakSet;
        } catch (e) {
        }
        return false;
      }
      function isElement4(x) {
        if (!x || typeof x !== "object") {
          return false;
        }
        if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
          return true;
        }
        return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
      }
      function inspectString(str, opts) {
        if (str.length > opts.maxStringLength) {
          var remaining = str.length - opts.maxStringLength;
          var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
          return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
        }
        var s = $replace.call($replace.call(str, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, lowbyte);
        return wrapQuotes(s, "single", opts);
      }
      function lowbyte(c) {
        var n = c.charCodeAt(0);
        var x = {
          8: "b",
          9: "t",
          10: "n",
          12: "f",
          13: "r"
        }[n];
        if (x) {
          return "\\" + x;
        }
        return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
      }
      function markBoxed(str) {
        return "Object(" + str + ")";
      }
      function weakCollectionOf(type3) {
        return type3 + " { ? }";
      }
      function collectionOf(type3, size, entries, indent) {
        var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
        return type3 + " (" + size + ") {" + joinedEntries + "}";
      }
      function singleLineValues(xs) {
        for (var i = 0; i < xs.length; i++) {
          if (indexOf(xs[i], "\n") >= 0) {
            return false;
          }
        }
        return true;
      }
      function getIndent(opts, depth) {
        var baseIndent;
        if (opts.indent === "	") {
          baseIndent = "	";
        } else if (typeof opts.indent === "number" && opts.indent > 0) {
          baseIndent = $join.call(Array(opts.indent + 1), " ");
        } else {
          return null;
        }
        return {
          base: baseIndent,
          prev: $join.call(Array(depth + 1), baseIndent)
        };
      }
      function indentedJoin(xs, indent) {
        if (xs.length === 0) {
          return "";
        }
        var lineJoiner = "\n" + indent.prev + indent.base;
        return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
      }
      function arrObjKeys(obj, inspect) {
        var isArr = isArray(obj);
        var xs = [];
        if (isArr) {
          xs.length = obj.length;
          for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : "";
          }
        }
        var syms = typeof gOPS === "function" ? gOPS(obj) : [];
        var symMap;
        if (hasShammedSymbols) {
          symMap = {};
          for (var k = 0; k < syms.length; k++) {
            symMap["$" + syms[k]] = syms[k];
          }
        }
        for (var key in obj) {
          if (!has(obj, key)) {
            continue;
          }
          if (isArr && String(Number(key)) === key && key < obj.length) {
            continue;
          }
          if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
            continue;
          } else if ($test.call(/[^\w$]/, key)) {
            xs.push(inspect(key, obj) + ": " + inspect(obj[key], obj));
          } else {
            xs.push(key + ": " + inspect(obj[key], obj));
          }
        }
        if (typeof gOPS === "function") {
          for (var j = 0; j < syms.length; j++) {
            if (isEnumerable.call(obj, syms[j])) {
              xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
            }
          }
        }
        return xs;
      }
    }
  });

  // ../node_modules/.pnpm/side-channel@1.0.4/node_modules/side-channel/index.js
  var require_side_channel = __commonJS({
    "../node_modules/.pnpm/side-channel@1.0.4/node_modules/side-channel/index.js"(exports, module2) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var callBound = require_callBound();
      var inspect = require_object_inspect();
      var $TypeError = GetIntrinsic("%TypeError%");
      var $WeakMap = GetIntrinsic("%WeakMap%", true);
      var $Map = GetIntrinsic("%Map%", true);
      var $weakMapGet = callBound("WeakMap.prototype.get", true);
      var $weakMapSet = callBound("WeakMap.prototype.set", true);
      var $weakMapHas = callBound("WeakMap.prototype.has", true);
      var $mapGet = callBound("Map.prototype.get", true);
      var $mapSet = callBound("Map.prototype.set", true);
      var $mapHas = callBound("Map.prototype.has", true);
      var listGetNode = function(list, key) {
        for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
          if (curr.key === key) {
            prev.next = curr.next;
            curr.next = list.next;
            list.next = curr;
            return curr;
          }
        }
      };
      var listGet = function(objects, key) {
        var node = listGetNode(objects, key);
        return node && node.value;
      };
      var listSet = function(objects, key, value) {
        var node = listGetNode(objects, key);
        if (node) {
          node.value = value;
        } else {
          objects.next = {
            // eslint-disable-line no-param-reassign
            key,
            next: objects.next,
            value
          };
        }
      };
      var listHas = function(objects, key) {
        return !!listGetNode(objects, key);
      };
      module2.exports = function getSideChannel() {
        var $wm;
        var $m;
        var $o;
        var channel = {
          assert: function(key) {
            if (!channel.has(key)) {
              throw new $TypeError("Side channel does not contain " + inspect(key));
            }
          },
          get: function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if ($wm) {
                return $weakMapGet($wm, key);
              }
            } else if ($Map) {
              if ($m) {
                return $mapGet($m, key);
              }
            } else {
              if ($o) {
                return listGet($o, key);
              }
            }
          },
          has: function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if ($wm) {
                return $weakMapHas($wm, key);
              }
            } else if ($Map) {
              if ($m) {
                return $mapHas($m, key);
              }
            } else {
              if ($o) {
                return listHas($o, key);
              }
            }
            return false;
          },
          set: function(key, value) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if (!$wm) {
                $wm = new $WeakMap();
              }
              $weakMapSet($wm, key, value);
            } else if ($Map) {
              if (!$m) {
                $m = new $Map();
              }
              $mapSet($m, key, value);
            } else {
              if (!$o) {
                $o = { key: {}, next: null };
              }
              listSet($o, key, value);
            }
          }
        };
        return channel;
      };
    }
  });

  // ../node_modules/.pnpm/object-is@1.1.5/node_modules/object-is/implementation.js
  var require_implementation6 = __commonJS({
    "../node_modules/.pnpm/object-is@1.1.5/node_modules/object-is/implementation.js"(exports, module2) {
      "use strict";
      var numberIsNaN = function(value) {
        return value !== value;
      };
      module2.exports = function is(a, b) {
        if (a === 0 && b === 0) {
          return 1 / a === 1 / b;
        }
        if (a === b) {
          return true;
        }
        if (numberIsNaN(a) && numberIsNaN(b)) {
          return true;
        }
        return false;
      };
    }
  });

  // ../node_modules/.pnpm/object-is@1.1.5/node_modules/object-is/polyfill.js
  var require_polyfill3 = __commonJS({
    "../node_modules/.pnpm/object-is@1.1.5/node_modules/object-is/polyfill.js"(exports, module2) {
      "use strict";
      var implementation = require_implementation6();
      module2.exports = function getPolyfill() {
        return typeof Object.is === "function" ? Object.is : implementation;
      };
    }
  });

  // ../node_modules/.pnpm/object-is@1.1.5/node_modules/object-is/shim.js
  var require_shim3 = __commonJS({
    "../node_modules/.pnpm/object-is@1.1.5/node_modules/object-is/shim.js"(exports, module2) {
      "use strict";
      var getPolyfill = require_polyfill3();
      var define2 = require_define_properties();
      module2.exports = function shimObjectIs() {
        var polyfill = getPolyfill();
        define2(Object, { is: polyfill }, {
          is: function testObjectIs() {
            return Object.is !== polyfill;
          }
        });
        return polyfill;
      };
    }
  });

  // ../node_modules/.pnpm/object-is@1.1.5/node_modules/object-is/index.js
  var require_object_is = __commonJS({
    "../node_modules/.pnpm/object-is@1.1.5/node_modules/object-is/index.js"(exports, module2) {
      "use strict";
      var define2 = require_define_properties();
      var callBind = require_call_bind();
      var implementation = require_implementation6();
      var getPolyfill = require_polyfill3();
      var shim = require_shim3();
      var polyfill = callBind(getPolyfill(), Object);
      define2(polyfill, {
        getPolyfill,
        implementation,
        shim
      });
      module2.exports = polyfill;
    }
  });

  // ../node_modules/.pnpm/is-callable@1.2.7/node_modules/is-callable/index.js
  var require_is_callable = __commonJS({
    "../node_modules/.pnpm/is-callable@1.2.7/node_modules/is-callable/index.js"(exports, module2) {
      "use strict";
      var fnToStr = Function.prototype.toString;
      var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
      var badArrayLike;
      var isCallableMarker;
      if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
        try {
          badArrayLike = Object.defineProperty({}, "length", {
            get: function() {
              throw isCallableMarker;
            }
          });
          isCallableMarker = {};
          reflectApply(function() {
            throw 42;
          }, null, badArrayLike);
        } catch (_) {
          if (_ !== isCallableMarker) {
            reflectApply = null;
          }
        }
      } else {
        reflectApply = null;
      }
      var constructorRegex = /^\s*class\b/;
      var isES6ClassFn = function isES6ClassFunction(value) {
        try {
          var fnStr = fnToStr.call(value);
          return constructorRegex.test(fnStr);
        } catch (e) {
          return false;
        }
      };
      var tryFunctionObject = function tryFunctionToStr(value) {
        try {
          if (isES6ClassFn(value)) {
            return false;
          }
          fnToStr.call(value);
          return true;
        } catch (e) {
          return false;
        }
      };
      var toStr2 = Object.prototype.toString;
      var objectClass = "[object Object]";
      var fnClass = "[object Function]";
      var genClass = "[object GeneratorFunction]";
      var ddaClass = "[object HTMLAllCollection]";
      var ddaClass2 = "[object HTML document.all class]";
      var ddaClass3 = "[object HTMLCollection]";
      var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
      var isIE68 = !(0 in [,]);
      var isDDA = function isDocumentDotAll() {
        return false;
      };
      if (typeof document === "object") {
        all = document.all;
        if (toStr2.call(all) === toStr2.call(document.all)) {
          isDDA = function isDocumentDotAll(value) {
            if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
              try {
                var str = toStr2.call(value);
                return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
              } catch (e) {
              }
            }
            return false;
          };
        }
      }
      var all;
      module2.exports = reflectApply ? function isCallable2(value) {
        if (isDDA(value)) {
          return true;
        }
        if (!value) {
          return false;
        }
        if (typeof value !== "function" && typeof value !== "object") {
          return false;
        }
        try {
          reflectApply(value, null, badArrayLike);
        } catch (e) {
          if (e !== isCallableMarker) {
            return false;
          }
        }
        return !isES6ClassFn(value) && tryFunctionObject(value);
      } : function isCallable2(value) {
        if (isDDA(value)) {
          return true;
        }
        if (!value) {
          return false;
        }
        if (typeof value !== "function" && typeof value !== "object") {
          return false;
        }
        if (hasToStringTag) {
          return tryFunctionObject(value);
        }
        if (isES6ClassFn(value)) {
          return false;
        }
        var strClass = toStr2.call(value);
        if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
          return false;
        }
        return tryFunctionObject(value);
      };
    }
  });

  // ../node_modules/.pnpm/for-each@0.3.3/node_modules/for-each/index.js
  var require_for_each = __commonJS({
    "../node_modules/.pnpm/for-each@0.3.3/node_modules/for-each/index.js"(exports, module2) {
      "use strict";
      var isCallable2 = require_is_callable();
      var toStr2 = Object.prototype.toString;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var forEachArray = function forEachArray2(array, iterator, receiver) {
        for (var i = 0, len = array.length; i < len; i++) {
          if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
              iterator(array[i], i, array);
            } else {
              iterator.call(receiver, array[i], i, array);
            }
          }
        }
      };
      var forEachString = function forEachString2(string, iterator, receiver) {
        for (var i = 0, len = string.length; i < len; i++) {
          if (receiver == null) {
            iterator(string.charAt(i), i, string);
          } else {
            iterator.call(receiver, string.charAt(i), i, string);
          }
        }
      };
      var forEachObject = function forEachObject2(object, iterator, receiver) {
        for (var k in object) {
          if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
              iterator(object[k], k, object);
            } else {
              iterator.call(receiver, object[k], k, object);
            }
          }
        }
      };
      var forEach = function forEach2(list, iterator, thisArg) {
        if (!isCallable2(iterator)) {
          throw new TypeError("iterator must be a function");
        }
        var receiver;
        if (arguments.length >= 3) {
          receiver = thisArg;
        }
        if (toStr2.call(list) === "[object Array]") {
          forEachArray(list, iterator, receiver);
        } else if (typeof list === "string") {
          forEachString(list, iterator, receiver);
        } else {
          forEachObject(list, iterator, receiver);
        }
      };
      module2.exports = forEach;
    }
  });

  // ../node_modules/.pnpm/available-typed-arrays@1.0.5/node_modules/available-typed-arrays/index.js
  var require_available_typed_arrays = __commonJS({
    "../node_modules/.pnpm/available-typed-arrays@1.0.5/node_modules/available-typed-arrays/index.js"(exports, module2) {
      "use strict";
      var possibleNames = [
        "BigInt64Array",
        "BigUint64Array",
        "Float32Array",
        "Float64Array",
        "Int16Array",
        "Int32Array",
        "Int8Array",
        "Uint16Array",
        "Uint32Array",
        "Uint8Array",
        "Uint8ClampedArray"
      ];
      var g2 = typeof globalThis === "undefined" ? global : globalThis;
      module2.exports = function availableTypedArrays() {
        var out = [];
        for (var i = 0; i < possibleNames.length; i++) {
          if (typeof g2[possibleNames[i]] === "function") {
            out[out.length] = possibleNames[i];
          }
        }
        return out;
      };
    }
  });

  // ../node_modules/.pnpm/gopd@1.0.1/node_modules/gopd/index.js
  var require_gopd = __commonJS({
    "../node_modules/.pnpm/gopd@1.0.1/node_modules/gopd/index.js"(exports, module2) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
      if ($gOPD) {
        try {
          $gOPD([], "length");
        } catch (e) {
          $gOPD = null;
        }
      }
      module2.exports = $gOPD;
    }
  });

  // ../node_modules/.pnpm/is-typed-array@1.1.10/node_modules/is-typed-array/index.js
  var require_is_typed_array = __commonJS({
    "../node_modules/.pnpm/is-typed-array@1.1.10/node_modules/is-typed-array/index.js"(exports, module2) {
      "use strict";
      var forEach = require_for_each();
      var availableTypedArrays = require_available_typed_arrays();
      var callBound = require_callBound();
      var $toString = callBound("Object.prototype.toString");
      var hasToStringTag = require_shams2()();
      var gOPD = require_gopd();
      var g2 = typeof globalThis === "undefined" ? global : globalThis;
      var typedArrays = availableTypedArrays();
      var $indexOf = callBound("Array.prototype.indexOf", true) || function indexOf(array, value) {
        for (var i = 0; i < array.length; i += 1) {
          if (array[i] === value) {
            return i;
          }
        }
        return -1;
      };
      var $slice = callBound("String.prototype.slice");
      var toStrTags = {};
      var getPrototypeOf = Object.getPrototypeOf;
      if (hasToStringTag && gOPD && getPrototypeOf) {
        forEach(typedArrays, function(typedArray) {
          var arr = new g2[typedArray]();
          if (Symbol.toStringTag in arr) {
            var proto = getPrototypeOf(arr);
            var descriptor = gOPD(proto, Symbol.toStringTag);
            if (!descriptor) {
              var superProto = getPrototypeOf(proto);
              descriptor = gOPD(superProto, Symbol.toStringTag);
            }
            toStrTags[typedArray] = descriptor.get;
          }
        });
      }
      var tryTypedArrays = function tryAllTypedArrays(value) {
        var anyTrue = false;
        forEach(toStrTags, function(getter, typedArray) {
          if (!anyTrue) {
            try {
              anyTrue = getter.call(value) === typedArray;
            } catch (e) {
            }
          }
        });
        return anyTrue;
      };
      module2.exports = function isTypedArray(value) {
        if (!value || typeof value !== "object") {
          return false;
        }
        if (!hasToStringTag || !(Symbol.toStringTag in value)) {
          var tag = $slice($toString(value), 8, -1);
          return $indexOf(typedArrays, tag) > -1;
        }
        if (!gOPD) {
          return false;
        }
        return tryTypedArrays(value);
      };
    }
  });

  // ../node_modules/.pnpm/is-array-buffer@3.0.1/node_modules/is-array-buffer/index.js
  var require_is_array_buffer = __commonJS({
    "../node_modules/.pnpm/is-array-buffer@3.0.1/node_modules/is-array-buffer/index.js"(exports, module2) {
      "use strict";
      var callBind = require_call_bind();
      var callBound = require_callBound();
      var GetIntrinsic = require_get_intrinsic();
      var isTypedArray = require_is_typed_array();
      var $ArrayBuffer = GetIntrinsic("ArrayBuffer", true);
      var $Float32Array = GetIntrinsic("Float32Array", true);
      var $byteLength = callBound("ArrayBuffer.prototype.byteLength", true);
      var abSlice = $ArrayBuffer && !$byteLength && new $ArrayBuffer().slice;
      var $abSlice = abSlice && callBind(abSlice);
      module2.exports = $byteLength || $abSlice ? function isArrayBuffer(obj) {
        if (!obj || typeof obj !== "object") {
          return false;
        }
        try {
          if ($byteLength) {
            $byteLength(obj);
          } else {
            $abSlice(obj, 0);
          }
          return true;
        } catch (e) {
          return false;
        }
      } : $Float32Array ? function IsArrayBuffer(obj) {
        try {
          return new $Float32Array(obj).buffer === obj && !isTypedArray(obj);
        } catch (e) {
          return false;
        }
      } : function isArrayBuffer(obj) {
        return false;
      };
    }
  });

  // ../node_modules/.pnpm/is-date-object@1.0.5/node_modules/is-date-object/index.js
  var require_is_date_object = __commonJS({
    "../node_modules/.pnpm/is-date-object@1.0.5/node_modules/is-date-object/index.js"(exports, module2) {
      "use strict";
      var getDay = Date.prototype.getDay;
      var tryDateObject = function tryDateGetDayCall(value) {
        try {
          getDay.call(value);
          return true;
        } catch (e) {
          return false;
        }
      };
      var toStr2 = Object.prototype.toString;
      var dateClass = "[object Date]";
      var hasToStringTag = require_shams2()();
      module2.exports = function isDateObject(value) {
        if (typeof value !== "object" || value === null) {
          return false;
        }
        return hasToStringTag ? tryDateObject(value) : toStr2.call(value) === dateClass;
      };
    }
  });

  // ../node_modules/.pnpm/is-regex@1.1.4/node_modules/is-regex/index.js
  var require_is_regex = __commonJS({
    "../node_modules/.pnpm/is-regex@1.1.4/node_modules/is-regex/index.js"(exports, module2) {
      "use strict";
      var callBound = require_callBound();
      var hasToStringTag = require_shams2()();
      var has;
      var $exec;
      var isRegexMarker;
      var badStringifier;
      if (hasToStringTag) {
        has = callBound("Object.prototype.hasOwnProperty");
        $exec = callBound("RegExp.prototype.exec");
        isRegexMarker = {};
        throwRegexMarker = function() {
          throw isRegexMarker;
        };
        badStringifier = {
          toString: throwRegexMarker,
          valueOf: throwRegexMarker
        };
        if (typeof Symbol.toPrimitive === "symbol") {
          badStringifier[Symbol.toPrimitive] = throwRegexMarker;
        }
      }
      var throwRegexMarker;
      var $toString = callBound("Object.prototype.toString");
      var gOPD = Object.getOwnPropertyDescriptor;
      var regexClass = "[object RegExp]";
      module2.exports = hasToStringTag ? function isRegex(value) {
        if (!value || typeof value !== "object") {
          return false;
        }
        var descriptor = gOPD(value, "lastIndex");
        var hasLastIndexDataProperty = descriptor && has(descriptor, "value");
        if (!hasLastIndexDataProperty) {
          return false;
        }
        try {
          $exec(value, badStringifier);
        } catch (e) {
          return e === isRegexMarker;
        }
      } : function isRegex(value) {
        if (!value || typeof value !== "object" && typeof value !== "function") {
          return false;
        }
        return $toString(value) === regexClass;
      };
    }
  });

  // ../node_modules/.pnpm/is-shared-array-buffer@1.0.2/node_modules/is-shared-array-buffer/index.js
  var require_is_shared_array_buffer = __commonJS({
    "../node_modules/.pnpm/is-shared-array-buffer@1.0.2/node_modules/is-shared-array-buffer/index.js"(exports, module2) {
      "use strict";
      var callBound = require_callBound();
      var $byteLength = callBound("SharedArrayBuffer.prototype.byteLength", true);
      module2.exports = $byteLength ? function isSharedArrayBuffer(obj) {
        if (!obj || typeof obj !== "object") {
          return false;
        }
        try {
          $byteLength(obj);
          return true;
        } catch (e) {
          return false;
        }
      } : function isSharedArrayBuffer(obj) {
        return false;
      };
    }
  });

  // ../node_modules/.pnpm/is-number-object@1.0.7/node_modules/is-number-object/index.js
  var require_is_number_object = __commonJS({
    "../node_modules/.pnpm/is-number-object@1.0.7/node_modules/is-number-object/index.js"(exports, module2) {
      "use strict";
      var numToStr = Number.prototype.toString;
      var tryNumberObject = function tryNumberObject2(value) {
        try {
          numToStr.call(value);
          return true;
        } catch (e) {
          return false;
        }
      };
      var toStr2 = Object.prototype.toString;
      var numClass = "[object Number]";
      var hasToStringTag = require_shams2()();
      module2.exports = function isNumberObject(value) {
        if (typeof value === "number") {
          return true;
        }
        if (typeof value !== "object") {
          return false;
        }
        return hasToStringTag ? tryNumberObject(value) : toStr2.call(value) === numClass;
      };
    }
  });

  // ../node_modules/.pnpm/is-boolean-object@1.1.2/node_modules/is-boolean-object/index.js
  var require_is_boolean_object = __commonJS({
    "../node_modules/.pnpm/is-boolean-object@1.1.2/node_modules/is-boolean-object/index.js"(exports, module2) {
      "use strict";
      var callBound = require_callBound();
      var $boolToStr = callBound("Boolean.prototype.toString");
      var $toString = callBound("Object.prototype.toString");
      var tryBooleanObject = function booleanBrandCheck(value) {
        try {
          $boolToStr(value);
          return true;
        } catch (e) {
          return false;
        }
      };
      var boolClass = "[object Boolean]";
      var hasToStringTag = require_shams2()();
      module2.exports = function isBoolean(value) {
        if (typeof value === "boolean") {
          return true;
        }
        if (value === null || typeof value !== "object") {
          return false;
        }
        return hasToStringTag && Symbol.toStringTag in value ? tryBooleanObject(value) : $toString(value) === boolClass;
      };
    }
  });

  // ../node_modules/.pnpm/is-symbol@1.0.4/node_modules/is-symbol/index.js
  var require_is_symbol = __commonJS({
    "../node_modules/.pnpm/is-symbol@1.0.4/node_modules/is-symbol/index.js"(exports, module2) {
      "use strict";
      var toStr2 = Object.prototype.toString;
      var hasSymbols = require_has_symbols()();
      if (hasSymbols) {
        symToStr = Symbol.prototype.toString;
        symStringRegex = /^Symbol\(.*\)$/;
        isSymbolObject = function isRealSymbolObject(value) {
          if (typeof value.valueOf() !== "symbol") {
            return false;
          }
          return symStringRegex.test(symToStr.call(value));
        };
        module2.exports = function isSymbol(value) {
          if (typeof value === "symbol") {
            return true;
          }
          if (toStr2.call(value) !== "[object Symbol]") {
            return false;
          }
          try {
            return isSymbolObject(value);
          } catch (e) {
            return false;
          }
        };
      } else {
        module2.exports = function isSymbol(value) {
          return false;
        };
      }
      var symToStr;
      var symStringRegex;
      var isSymbolObject;
    }
  });

  // ../node_modules/.pnpm/has-bigints@1.0.2/node_modules/has-bigints/index.js
  var require_has_bigints = __commonJS({
    "../node_modules/.pnpm/has-bigints@1.0.2/node_modules/has-bigints/index.js"(exports, module2) {
      "use strict";
      var $BigInt = typeof BigInt !== "undefined" && BigInt;
      module2.exports = function hasNativeBigInts() {
        return typeof $BigInt === "function" && typeof BigInt === "function" && typeof $BigInt(42) === "bigint" && typeof BigInt(42) === "bigint";
      };
    }
  });

  // ../node_modules/.pnpm/is-bigint@1.0.4/node_modules/is-bigint/index.js
  var require_is_bigint = __commonJS({
    "../node_modules/.pnpm/is-bigint@1.0.4/node_modules/is-bigint/index.js"(exports, module2) {
      "use strict";
      var hasBigInts = require_has_bigints()();
      if (hasBigInts) {
        bigIntValueOf = BigInt.prototype.valueOf;
        tryBigInt = function tryBigIntObject(value) {
          try {
            bigIntValueOf.call(value);
            return true;
          } catch (e) {
          }
          return false;
        };
        module2.exports = function isBigInt(value) {
          if (value === null || typeof value === "undefined" || typeof value === "boolean" || typeof value === "string" || typeof value === "number" || typeof value === "symbol" || typeof value === "function") {
            return false;
          }
          if (typeof value === "bigint") {
            return true;
          }
          return tryBigInt(value);
        };
      } else {
        module2.exports = function isBigInt(value) {
          return false;
        };
      }
      var bigIntValueOf;
      var tryBigInt;
    }
  });

  // ../node_modules/.pnpm/which-boxed-primitive@1.0.2/node_modules/which-boxed-primitive/index.js
  var require_which_boxed_primitive = __commonJS({
    "../node_modules/.pnpm/which-boxed-primitive@1.0.2/node_modules/which-boxed-primitive/index.js"(exports, module2) {
      "use strict";
      var isString = require_is_string();
      var isNumber = require_is_number_object();
      var isBoolean = require_is_boolean_object();
      var isSymbol = require_is_symbol();
      var isBigInt = require_is_bigint();
      module2.exports = function whichBoxedPrimitive(value) {
        if (value == null || typeof value !== "object" && typeof value !== "function") {
          return null;
        }
        if (isString(value)) {
          return "String";
        }
        if (isNumber(value)) {
          return "Number";
        }
        if (isBoolean(value)) {
          return "Boolean";
        }
        if (isSymbol(value)) {
          return "Symbol";
        }
        if (isBigInt(value)) {
          return "BigInt";
        }
      };
    }
  });

  // ../node_modules/.pnpm/is-weakmap@2.0.1/node_modules/is-weakmap/index.js
  var require_is_weakmap = __commonJS({
    "../node_modules/.pnpm/is-weakmap@2.0.1/node_modules/is-weakmap/index.js"(exports, module2) {
      "use strict";
      var $WeakMap = typeof WeakMap === "function" && WeakMap.prototype ? WeakMap : null;
      var $WeakSet = typeof WeakSet === "function" && WeakSet.prototype ? WeakSet : null;
      var exported;
      if (!$WeakMap) {
        exported = function isWeakMap(x) {
          return false;
        };
      }
      var $mapHas = $WeakMap ? $WeakMap.prototype.has : null;
      var $setHas = $WeakSet ? $WeakSet.prototype.has : null;
      if (!exported && !$mapHas) {
        exported = function isWeakMap(x) {
          return false;
        };
      }
      module2.exports = exported || function isWeakMap(x) {
        if (!x || typeof x !== "object") {
          return false;
        }
        try {
          $mapHas.call(x, $mapHas);
          if ($setHas) {
            try {
              $setHas.call(x, $setHas);
            } catch (e) {
              return true;
            }
          }
          return x instanceof $WeakMap;
        } catch (e) {
        }
        return false;
      };
    }
  });

  // ../node_modules/.pnpm/is-weakset@2.0.2/node_modules/is-weakset/index.js
  var require_is_weakset = __commonJS({
    "../node_modules/.pnpm/is-weakset@2.0.2/node_modules/is-weakset/index.js"(exports, module2) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var callBound = require_callBound();
      var $WeakSet = GetIntrinsic("%WeakSet%", true);
      var $setHas = callBound("WeakSet.prototype.has", true);
      if ($setHas) {
        $mapHas = callBound("WeakMap.prototype.has", true);
        module2.exports = function isWeakSet(x) {
          if (!x || typeof x !== "object") {
            return false;
          }
          try {
            $setHas(x, $setHas);
            if ($mapHas) {
              try {
                $mapHas(x, $mapHas);
              } catch (e) {
                return true;
              }
            }
            return x instanceof $WeakSet;
          } catch (e) {
          }
          return false;
        };
      } else {
        module2.exports = function isWeakSet(x) {
          return false;
        };
      }
      var $mapHas;
    }
  });

  // ../node_modules/.pnpm/which-collection@1.0.1/node_modules/which-collection/index.js
  var require_which_collection = __commonJS({
    "../node_modules/.pnpm/which-collection@1.0.1/node_modules/which-collection/index.js"(exports, module2) {
      "use strict";
      var isMap = require_is_map();
      var isSet = require_is_set();
      var isWeakMap = require_is_weakmap();
      var isWeakSet = require_is_weakset();
      module2.exports = function whichCollection(value) {
        if (value && typeof value === "object") {
          if (isMap(value)) {
            return "Map";
          }
          if (isSet(value)) {
            return "Set";
          }
          if (isWeakMap(value)) {
            return "WeakMap";
          }
          if (isWeakSet(value)) {
            return "WeakSet";
          }
        }
        return false;
      };
    }
  });

  // ../node_modules/.pnpm/which-typed-array@1.1.9/node_modules/which-typed-array/index.js
  var require_which_typed_array = __commonJS({
    "../node_modules/.pnpm/which-typed-array@1.1.9/node_modules/which-typed-array/index.js"(exports, module2) {
      "use strict";
      var forEach = require_for_each();
      var availableTypedArrays = require_available_typed_arrays();
      var callBound = require_callBound();
      var gOPD = require_gopd();
      var $toString = callBound("Object.prototype.toString");
      var hasToStringTag = require_shams2()();
      var g2 = typeof globalThis === "undefined" ? global : globalThis;
      var typedArrays = availableTypedArrays();
      var $slice = callBound("String.prototype.slice");
      var toStrTags = {};
      var getPrototypeOf = Object.getPrototypeOf;
      if (hasToStringTag && gOPD && getPrototypeOf) {
        forEach(typedArrays, function(typedArray) {
          if (typeof g2[typedArray] === "function") {
            var arr = new g2[typedArray]();
            if (Symbol.toStringTag in arr) {
              var proto = getPrototypeOf(arr);
              var descriptor = gOPD(proto, Symbol.toStringTag);
              if (!descriptor) {
                var superProto = getPrototypeOf(proto);
                descriptor = gOPD(superProto, Symbol.toStringTag);
              }
              toStrTags[typedArray] = descriptor.get;
            }
          }
        });
      }
      var tryTypedArrays = function tryAllTypedArrays(value) {
        var foundName = false;
        forEach(toStrTags, function(getter, typedArray) {
          if (!foundName) {
            try {
              var name = getter.call(value);
              if (name === typedArray) {
                foundName = name;
              }
            } catch (e) {
            }
          }
        });
        return foundName;
      };
      var isTypedArray = require_is_typed_array();
      module2.exports = function whichTypedArray(value) {
        if (!isTypedArray(value)) {
          return false;
        }
        if (!hasToStringTag || !(Symbol.toStringTag in value)) {
          return $slice($toString(value), 8, -1);
        }
        return tryTypedArrays(value);
      };
    }
  });

  // ../node_modules/.pnpm/deep-equal@2.2.0/node_modules/deep-equal/index.js
  var require_deep_equal = __commonJS({
    "../node_modules/.pnpm/deep-equal@2.2.0/node_modules/deep-equal/index.js"(exports, module2) {
      "use strict";
      var assign = require_object();
      var callBound = require_callBound();
      var flags = require_regexp_prototype();
      var GetIntrinsic = require_get_intrinsic();
      var getIterator = require_es_get_iterator();
      var getSideChannel = require_side_channel();
      var is = require_object_is();
      var isArguments = require_is_arguments();
      var isArray = require_isarray();
      var isArrayBuffer = require_is_array_buffer();
      var isDate = require_is_date_object();
      var isRegex = require_is_regex();
      var isSharedArrayBuffer = require_is_shared_array_buffer();
      var objectKeys = require_object_keys();
      var whichBoxedPrimitive = require_which_boxed_primitive();
      var whichCollection = require_which_collection();
      var whichTypedArray = require_which_typed_array();
      var byteLength = callBound("ArrayBuffer.prototype.byteLength", true) || function byteLength2(ab) {
        return ab.byteLength;
      };
      var sabByteLength = callBound("SharedArrayBuffer.prototype.byteLength", true);
      var $getTime = callBound("Date.prototype.getTime");
      var gPO = Object.getPrototypeOf;
      var $objToString = callBound("Object.prototype.toString");
      var $Set = GetIntrinsic("%Set%", true);
      var $mapHas = callBound("Map.prototype.has", true);
      var $mapGet = callBound("Map.prototype.get", true);
      var $mapSize = callBound("Map.prototype.size", true);
      var $setAdd = callBound("Set.prototype.add", true);
      var $setDelete = callBound("Set.prototype.delete", true);
      var $setHas = callBound("Set.prototype.has", true);
      var $setSize = callBound("Set.prototype.size", true);
      function setHasEqualElement(set, val1, opts, channel) {
        var i = getIterator(set);
        var result;
        while ((result = i.next()) && !result.done) {
          if (internalDeepEqual(val1, result.value, opts, channel)) {
            $setDelete(set, result.value);
            return true;
          }
        }
        return false;
      }
      function findLooseMatchingPrimitives(prim) {
        if (typeof prim === "undefined") {
          return null;
        }
        if (typeof prim === "object") {
          return void 0;
        }
        if (typeof prim === "symbol") {
          return false;
        }
        if (typeof prim === "string" || typeof prim === "number") {
          return +prim === +prim;
        }
        return true;
      }
      function mapMightHaveLoosePrim(a, b, prim, item, opts, channel) {
        var altValue = findLooseMatchingPrimitives(prim);
        if (altValue != null) {
          return altValue;
        }
        var curB = $mapGet(b, altValue);
        var looseOpts = assign({}, opts, { strict: false });
        if (typeof curB === "undefined" && !$mapHas(b, altValue) || !internalDeepEqual(item, curB, looseOpts, channel)) {
          return false;
        }
        return !$mapHas(a, altValue) && internalDeepEqual(item, curB, looseOpts, channel);
      }
      function setMightHaveLoosePrim(a, b, prim) {
        var altValue = findLooseMatchingPrimitives(prim);
        if (altValue != null) {
          return altValue;
        }
        return $setHas(b, altValue) && !$setHas(a, altValue);
      }
      function mapHasEqualEntry(set, map, key1, item1, opts, channel) {
        var i = getIterator(set);
        var result;
        var key2;
        while ((result = i.next()) && !result.done) {
          key2 = result.value;
          if (
            // eslint-disable-next-line no-use-before-define
            internalDeepEqual(key1, key2, opts, channel) && internalDeepEqual(item1, $mapGet(map, key2), opts, channel)
          ) {
            $setDelete(set, key2);
            return true;
          }
        }
        return false;
      }
      function internalDeepEqual(actual, expected, options, channel) {
        var opts = options || {};
        if (opts.strict ? is(actual, expected) : actual === expected) {
          return true;
        }
        var actualBoxed = whichBoxedPrimitive(actual);
        var expectedBoxed = whichBoxedPrimitive(expected);
        if (actualBoxed !== expectedBoxed) {
          return false;
        }
        if (!actual || !expected || typeof actual !== "object" && typeof expected !== "object") {
          return opts.strict ? is(actual, expected) : actual == expected;
        }
        var hasActual = channel.has(actual);
        var hasExpected = channel.has(expected);
        var sentinel;
        if (hasActual && hasExpected) {
          if (channel.get(actual) === channel.get(expected)) {
            return true;
          }
        } else {
          sentinel = {};
        }
        if (!hasActual) {
          channel.set(actual, sentinel);
        }
        if (!hasExpected) {
          channel.set(expected, sentinel);
        }
        return objEquiv(actual, expected, opts, channel);
      }
      function isBuffer(x) {
        if (!x || typeof x !== "object" || typeof x.length !== "number") {
          return false;
        }
        if (typeof x.copy !== "function" || typeof x.slice !== "function") {
          return false;
        }
        if (x.length > 0 && typeof x[0] !== "number") {
          return false;
        }
        return !!(x.constructor && x.constructor.isBuffer && x.constructor.isBuffer(x));
      }
      function setEquiv(a, b, opts, channel) {
        if ($setSize(a) !== $setSize(b)) {
          return false;
        }
        var iA = getIterator(a);
        var iB = getIterator(b);
        var resultA;
        var resultB;
        var set;
        while ((resultA = iA.next()) && !resultA.done) {
          if (resultA.value && typeof resultA.value === "object") {
            if (!set) {
              set = new $Set();
            }
            $setAdd(set, resultA.value);
          } else if (!$setHas(b, resultA.value)) {
            if (opts.strict) {
              return false;
            }
            if (!setMightHaveLoosePrim(a, b, resultA.value)) {
              return false;
            }
            if (!set) {
              set = new $Set();
            }
            $setAdd(set, resultA.value);
          }
        }
        if (set) {
          while ((resultB = iB.next()) && !resultB.done) {
            if (resultB.value && typeof resultB.value === "object") {
              if (!setHasEqualElement(set, resultB.value, opts.strict, channel)) {
                return false;
              }
            } else if (!opts.strict && !$setHas(a, resultB.value) && !setHasEqualElement(set, resultB.value, opts.strict, channel)) {
              return false;
            }
          }
          return $setSize(set) === 0;
        }
        return true;
      }
      function mapEquiv(a, b, opts, channel) {
        if ($mapSize(a) !== $mapSize(b)) {
          return false;
        }
        var iA = getIterator(a);
        var iB = getIterator(b);
        var resultA;
        var resultB;
        var set;
        var key;
        var item1;
        var item2;
        while ((resultA = iA.next()) && !resultA.done) {
          key = resultA.value[0];
          item1 = resultA.value[1];
          if (key && typeof key === "object") {
            if (!set) {
              set = new $Set();
            }
            $setAdd(set, key);
          } else {
            item2 = $mapGet(b, key);
            if (typeof item2 === "undefined" && !$mapHas(b, key) || !internalDeepEqual(item1, item2, opts, channel)) {
              if (opts.strict) {
                return false;
              }
              if (!mapMightHaveLoosePrim(a, b, key, item1, opts, channel)) {
                return false;
              }
              if (!set) {
                set = new $Set();
              }
              $setAdd(set, key);
            }
          }
        }
        if (set) {
          while ((resultB = iB.next()) && !resultB.done) {
            key = resultB.value[0];
            item2 = resultB.value[1];
            if (key && typeof key === "object") {
              if (!mapHasEqualEntry(set, a, key, item2, opts, channel)) {
                return false;
              }
            } else if (!opts.strict && (!a.has(key) || !internalDeepEqual($mapGet(a, key), item2, opts, channel)) && !mapHasEqualEntry(set, a, key, item2, assign({}, opts, { strict: false }), channel)) {
              return false;
            }
          }
          return $setSize(set) === 0;
        }
        return true;
      }
      function objEquiv(a, b, opts, channel) {
        var i, key;
        if (typeof a !== typeof b) {
          return false;
        }
        if (a == null || b == null) {
          return false;
        }
        if ($objToString(a) !== $objToString(b)) {
          return false;
        }
        if (isArguments(a) !== isArguments(b)) {
          return false;
        }
        var aIsArray = isArray(a);
        var bIsArray = isArray(b);
        if (aIsArray !== bIsArray) {
          return false;
        }
        var aIsError = a instanceof Error;
        var bIsError = b instanceof Error;
        if (aIsError !== bIsError) {
          return false;
        }
        if (aIsError || bIsError) {
          if (a.name !== b.name || a.message !== b.message) {
            return false;
          }
        }
        var aIsRegex = isRegex(a);
        var bIsRegex = isRegex(b);
        if (aIsRegex !== bIsRegex) {
          return false;
        }
        if ((aIsRegex || bIsRegex) && (a.source !== b.source || flags(a) !== flags(b))) {
          return false;
        }
        var aIsDate = isDate(a);
        var bIsDate = isDate(b);
        if (aIsDate !== bIsDate) {
          return false;
        }
        if (aIsDate || bIsDate) {
          if ($getTime(a) !== $getTime(b)) {
            return false;
          }
        }
        if (opts.strict && gPO && gPO(a) !== gPO(b)) {
          return false;
        }
        var aWhich = whichTypedArray(a);
        var bWhich = whichTypedArray(b);
        if ((aWhich || bWhich) && aWhich !== bWhich) {
          return false;
        }
        var aIsBuffer = isBuffer(a);
        var bIsBuffer = isBuffer(b);
        if (aIsBuffer !== bIsBuffer) {
          return false;
        }
        if (aIsBuffer || bIsBuffer) {
          if (a.length !== b.length) {
            return false;
          }
          for (i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
              return false;
            }
          }
          return true;
        }
        var aIsArrayBuffer = isArrayBuffer(a);
        var bIsArrayBuffer = isArrayBuffer(b);
        if (aIsArrayBuffer !== bIsArrayBuffer) {
          return false;
        }
        if (aIsArrayBuffer || bIsArrayBuffer) {
          if (byteLength(a) !== byteLength(b)) {
            return false;
          }
          return typeof Uint8Array === "function" && internalDeepEqual(new Uint8Array(a), new Uint8Array(b), opts, channel);
        }
        var aIsSAB = isSharedArrayBuffer(a);
        var bIsSAB = isSharedArrayBuffer(b);
        if (aIsSAB !== bIsSAB) {
          return false;
        }
        if (aIsSAB || bIsSAB) {
          if (sabByteLength(a) !== sabByteLength(b)) {
            return false;
          }
          return typeof Uint8Array === "function" && internalDeepEqual(new Uint8Array(a), new Uint8Array(b), opts, channel);
        }
        if (typeof a !== typeof b) {
          return false;
        }
        var ka = objectKeys(a);
        var kb = objectKeys(b);
        if (ka.length !== kb.length) {
          return false;
        }
        ka.sort();
        kb.sort();
        for (i = ka.length - 1; i >= 0; i--) {
          if (ka[i] != kb[i]) {
            return false;
          }
        }
        for (i = ka.length - 1; i >= 0; i--) {
          key = ka[i];
          if (!internalDeepEqual(a[key], b[key], opts, channel)) {
            return false;
          }
        }
        var aCollection = whichCollection(a);
        var bCollection = whichCollection(b);
        if (aCollection !== bCollection) {
          return false;
        }
        if (aCollection === "Set" || bCollection === "Set") {
          return setEquiv(a, b, opts, channel);
        }
        if (aCollection === "Map") {
          return mapEquiv(a, b, opts, channel);
        }
        return true;
      }
      module2.exports = function deepEqual(a, b, opts) {
        return internalDeepEqual(a, b, opts, getSideChannel());
      };
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/elementRoleMap.js
  var require_elementRoleMap = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/elementRoleMap.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _deepEqual = _interopRequireDefault(require_deep_equal());
      var _iterationDecorator = _interopRequireDefault(require_iterationDecorator());
      var _rolesMap = _interopRequireDefault(require_rolesMap());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function _slicedToArray(arr, i2) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i2) || _unsupportedIterableToArray(arr, i2) || _nonIterableRest();
      }
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _iterableToArrayLimit(arr, i2) {
        var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
        if (_i == null)
          return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _s, _e;
        try {
          for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i2 && _arr.length === i2)
              break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null)
              _i["return"]();
          } finally {
            if (_d)
              throw _e;
          }
        }
        return _arr;
      }
      function _arrayWithHoles(arr) {
        if (Array.isArray(arr))
          return arr;
      }
      function _createForOfIteratorHelper(o, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
        if (!it) {
          if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it)
              o = it;
            var i2 = 0;
            var F = function F2() {
            };
            return { s: F, n: function n() {
              if (i2 >= o.length)
                return { done: true };
              return { done: false, value: o[i2++] };
            }, e: function e(_e2) {
              throw _e2;
            }, f: F };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var normalCompletion = true, didErr = false, err;
        return { s: function s() {
          it = it.call(o);
        }, n: function n() {
          var step = it.next();
          normalCompletion = step.done;
          return step;
        }, e: function e(_e3) {
          didErr = true;
          err = _e3;
        }, f: function f() {
          try {
            if (!normalCompletion && it.return != null)
              it.return();
          } finally {
            if (didErr)
              throw err;
          }
        } };
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o)
          return;
        if (typeof o === "string")
          return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor)
          n = o.constructor.name;
        if (n === "Map" || n === "Set")
          return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
          return _arrayLikeToArray(o, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length)
          len = arr.length;
        for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
          arr2[i2] = arr[i2];
        }
        return arr2;
      }
      var elementRoles2 = [];
      var keys = _rolesMap.default.keys();
      for (i = 0; i < keys.length; i++) {
        key = keys[i];
        role = _rolesMap.default.get(key);
        if (role) {
          concepts = [].concat(role.baseConcepts, role.relatedConcepts);
          for (k = 0; k < concepts.length; k++) {
            relation = concepts[k];
            if (relation.module === "HTML") {
              concept = relation.concept;
              if (concept) {
                (function() {
                  var conceptStr = JSON.stringify(concept);
                  var elementRoleRelation = elementRoles2.find(function(relation2) {
                    return JSON.stringify(relation2[0]) === conceptStr;
                  });
                  var roles2 = void 0;
                  if (elementRoleRelation) {
                    roles2 = elementRoleRelation[1];
                  } else {
                    roles2 = [];
                  }
                  var isUnique = true;
                  for (var _i = 0; _i < roles2.length; _i++) {
                    if (roles2[_i] === key) {
                      isUnique = false;
                      break;
                    }
                  }
                  if (isUnique) {
                    roles2.push(key);
                  }
                  elementRoles2.push([concept, roles2]);
                })();
              }
            }
          }
        }
      }
      var key;
      var role;
      var concepts;
      var relation;
      var concept;
      var k;
      var i;
      var elementRoleMap = {
        entries: function entries() {
          return elementRoles2;
        },
        forEach: function forEach(fn) {
          var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
          var _iterator = _createForOfIteratorHelper(elementRoles2), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var _step$value = _slicedToArray(_step.value, 2), _key = _step$value[0], values = _step$value[1];
              fn.call(thisArg, values, _key, elementRoles2);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        },
        get: function get(key2) {
          var item = elementRoles2.find(function(tuple) {
            return (0, _deepEqual.default)(key2, tuple[0]);
          });
          return item && item[1];
        },
        has: function has(key2) {
          return !!elementRoleMap.get(key2);
        },
        keys: function keys2() {
          return elementRoles2.map(function(_ref) {
            var _ref2 = _slicedToArray(_ref, 1), key2 = _ref2[0];
            return key2;
          });
        },
        values: function values() {
          return elementRoles2.map(function(_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
            return values2;
          });
        }
      };
      var _default = (0, _iterationDecorator.default)(elementRoleMap, elementRoleMap.entries());
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/roleElementMap.js
  var require_roleElementMap = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/roleElementMap.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _iterationDecorator = _interopRequireDefault(require_iterationDecorator());
      var _rolesMap = _interopRequireDefault(require_rolesMap());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function _slicedToArray(arr, i2) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i2) || _unsupportedIterableToArray(arr, i2) || _nonIterableRest();
      }
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _iterableToArrayLimit(arr, i2) {
        var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
        if (_i == null)
          return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _s, _e;
        try {
          for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i2 && _arr.length === i2)
              break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null)
              _i["return"]();
          } finally {
            if (_d)
              throw _e;
          }
        }
        return _arr;
      }
      function _arrayWithHoles(arr) {
        if (Array.isArray(arr))
          return arr;
      }
      function _createForOfIteratorHelper(o, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
        if (!it) {
          if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it)
              o = it;
            var i2 = 0;
            var F = function F2() {
            };
            return { s: F, n: function n() {
              if (i2 >= o.length)
                return { done: true };
              return { done: false, value: o[i2++] };
            }, e: function e(_e2) {
              throw _e2;
            }, f: F };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var normalCompletion = true, didErr = false, err;
        return { s: function s() {
          it = it.call(o);
        }, n: function n() {
          var step = it.next();
          normalCompletion = step.done;
          return step;
        }, e: function e(_e3) {
          didErr = true;
          err = _e3;
        }, f: function f() {
          try {
            if (!normalCompletion && it.return != null)
              it.return();
          } finally {
            if (didErr)
              throw err;
          }
        } };
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o)
          return;
        if (typeof o === "string")
          return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor)
          n = o.constructor.name;
        if (n === "Map" || n === "Set")
          return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
          return _arrayLikeToArray(o, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length)
          len = arr.length;
        for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
          arr2[i2] = arr[i2];
        }
        return arr2;
      }
      var roleElement = [];
      var keys = _rolesMap.default.keys();
      var _loop = function _loop2(i2) {
        var key = keys[i2];
        var role = _rolesMap.default.get(key);
        if (role) {
          var concepts = [].concat(role.baseConcepts, role.relatedConcepts);
          for (var k = 0; k < concepts.length; k++) {
            var relation = concepts[k];
            if (relation.module === "HTML") {
              var concept = relation.concept;
              if (concept) {
                var roleElementRelation = roleElement.find(function(item) {
                  return item[0] === key;
                });
                var relationConcepts = void 0;
                if (roleElementRelation) {
                  relationConcepts = roleElementRelation[1];
                } else {
                  relationConcepts = [];
                }
                relationConcepts.push(concept);
                roleElement.push([key, relationConcepts]);
              }
            }
          }
        }
      };
      for (i = 0; i < keys.length; i++) {
        _loop(i);
      }
      var i;
      var roleElementMap = {
        entries: function entries() {
          return roleElement;
        },
        forEach: function forEach(fn) {
          var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
          var _iterator = _createForOfIteratorHelper(roleElement), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], values = _step$value[1];
              fn.call(thisArg, values, key, roleElement);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        },
        get: function get(key) {
          var item = roleElement.find(function(tuple) {
            return tuple[0] === key ? true : false;
          });
          return item && item[1];
        },
        has: function has(key) {
          return !!roleElementMap.get(key);
        },
        keys: function keys2() {
          return roleElement.map(function(_ref) {
            var _ref2 = _slicedToArray(_ref, 1), key = _ref2[0];
            return key;
          });
        },
        values: function values() {
          return roleElement.map(function(_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
            return values2;
          });
        }
      };
      var _default = (0, _iterationDecorator.default)(roleElementMap, roleElementMap.entries());
      exports.default = _default;
    }
  });

  // ../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/index.js
  var require_lib = __commonJS({
    "../node_modules/.pnpm/aria-query@5.1.3/node_modules/aria-query/lib/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.roles = exports.roleElements = exports.elementRoles = exports.dom = exports.aria = void 0;
      var _ariaPropsMap = _interopRequireDefault(require_ariaPropsMap());
      var _domMap = _interopRequireDefault(require_domMap());
      var _rolesMap = _interopRequireDefault(require_rolesMap());
      var _elementRoleMap = _interopRequireDefault(require_elementRoleMap());
      var _roleElementMap = _interopRequireDefault(require_roleElementMap());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var aria = _ariaPropsMap.default;
      exports.aria = aria;
      var dom = _domMap.default;
      exports.dom = dom;
      var roles2 = _rolesMap.default;
      exports.roles = roles2;
      var elementRoles2 = _elementRoleMap.default;
      exports.elementRoles = elementRoles2;
      var roleElements2 = _roleElementMap.default;
      exports.roleElements = roleElements2;
    }
  });

  // ../node_modules/.pnpm/lz-string@1.5.0/node_modules/lz-string/libs/lz-string.js
  var require_lz_string = __commonJS({
    "../node_modules/.pnpm/lz-string@1.5.0/node_modules/lz-string/libs/lz-string.js"(exports, module2) {
      var LZString = function() {
        var f = String.fromCharCode;
        var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
        var baseReverseDic = {};
        function getBaseValue(alphabet, character) {
          if (!baseReverseDic[alphabet]) {
            baseReverseDic[alphabet] = {};
            for (var i = 0; i < alphabet.length; i++) {
              baseReverseDic[alphabet][alphabet.charAt(i)] = i;
            }
          }
          return baseReverseDic[alphabet][character];
        }
        var LZString2 = {
          compressToBase64: function(input2) {
            if (input2 == null)
              return "";
            var res = LZString2._compress(input2, 6, function(a) {
              return keyStrBase64.charAt(a);
            });
            switch (res.length % 4) {
              default:
              case 0:
                return res;
              case 1:
                return res + "===";
              case 2:
                return res + "==";
              case 3:
                return res + "=";
            }
          },
          decompressFromBase64: function(input2) {
            if (input2 == null)
              return "";
            if (input2 == "")
              return null;
            return LZString2._decompress(input2.length, 32, function(index) {
              return getBaseValue(keyStrBase64, input2.charAt(index));
            });
          },
          compressToUTF16: function(input2) {
            if (input2 == null)
              return "";
            return LZString2._compress(input2, 15, function(a) {
              return f(a + 32);
            }) + " ";
          },
          decompressFromUTF16: function(compressed) {
            if (compressed == null)
              return "";
            if (compressed == "")
              return null;
            return LZString2._decompress(compressed.length, 16384, function(index) {
              return compressed.charCodeAt(index) - 32;
            });
          },
          //compress into uint8array (UCS-2 big endian format)
          compressToUint8Array: function(uncompressed) {
            var compressed = LZString2.compress(uncompressed);
            var buf = new Uint8Array(compressed.length * 2);
            for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
              var current_value = compressed.charCodeAt(i);
              buf[i * 2] = current_value >>> 8;
              buf[i * 2 + 1] = current_value % 256;
            }
            return buf;
          },
          //decompress from uint8array (UCS-2 big endian format)
          decompressFromUint8Array: function(compressed) {
            if (compressed === null || compressed === void 0) {
              return LZString2.decompress(compressed);
            } else {
              var buf = new Array(compressed.length / 2);
              for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
                buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
              }
              var result = [];
              buf.forEach(function(c) {
                result.push(f(c));
              });
              return LZString2.decompress(result.join(""));
            }
          },
          //compress into a string that is already URI encoded
          compressToEncodedURIComponent: function(input2) {
            if (input2 == null)
              return "";
            return LZString2._compress(input2, 6, function(a) {
              return keyStrUriSafe.charAt(a);
            });
          },
          //decompress from an output of compressToEncodedURIComponent
          decompressFromEncodedURIComponent: function(input2) {
            if (input2 == null)
              return "";
            if (input2 == "")
              return null;
            input2 = input2.replace(/ /g, "+");
            return LZString2._decompress(input2.length, 32, function(index) {
              return getBaseValue(keyStrUriSafe, input2.charAt(index));
            });
          },
          compress: function(uncompressed) {
            return LZString2._compress(uncompressed, 16, function(a) {
              return f(a);
            });
          },
          _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
            if (uncompressed == null)
              return "";
            var i, value, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0, ii;
            for (ii = 0; ii < uncompressed.length; ii += 1) {
              context_c = uncompressed.charAt(ii);
              if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
                context_dictionary[context_c] = context_dictSize++;
                context_dictionaryToCreate[context_c] = true;
              }
              context_wc = context_w + context_c;
              if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
                context_w = context_wc;
              } else {
                if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                  if (context_w.charCodeAt(0) < 256) {
                    for (i = 0; i < context_numBits; i++) {
                      context_data_val = context_data_val << 1;
                      if (context_data_position == bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                      } else {
                        context_data_position++;
                      }
                    }
                    value = context_w.charCodeAt(0);
                    for (i = 0; i < 8; i++) {
                      context_data_val = context_data_val << 1 | value & 1;
                      if (context_data_position == bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                      } else {
                        context_data_position++;
                      }
                      value = value >> 1;
                    }
                  } else {
                    value = 1;
                    for (i = 0; i < context_numBits; i++) {
                      context_data_val = context_data_val << 1 | value;
                      if (context_data_position == bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                      } else {
                        context_data_position++;
                      }
                      value = 0;
                    }
                    value = context_w.charCodeAt(0);
                    for (i = 0; i < 16; i++) {
                      context_data_val = context_data_val << 1 | value & 1;
                      if (context_data_position == bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                      } else {
                        context_data_position++;
                      }
                      value = value >> 1;
                    }
                  }
                  context_enlargeIn--;
                  if (context_enlargeIn == 0) {
                    context_enlargeIn = Math.pow(2, context_numBits);
                    context_numBits++;
                  }
                  delete context_dictionaryToCreate[context_w];
                } else {
                  value = context_dictionary[context_w];
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) {
                  context_enlargeIn = Math.pow(2, context_numBits);
                  context_numBits++;
                }
                context_dictionary[context_wc] = context_dictSize++;
                context_w = String(context_c);
              }
            }
            if (context_w !== "") {
              if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                if (context_w.charCodeAt(0) < 256) {
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 8; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                } else {
                  value = 1;
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1 | value;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = 0;
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 16; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) {
                  context_enlargeIn = Math.pow(2, context_numBits);
                  context_numBits++;
                }
                delete context_dictionaryToCreate[context_w];
              } else {
                value = context_dictionary[context_w];
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
            }
            value = 2;
            for (i = 0; i < context_numBits; i++) {
              context_data_val = context_data_val << 1 | value & 1;
              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
            while (true) {
              context_data_val = context_data_val << 1;
              if (context_data_position == bitsPerChar - 1) {
                context_data.push(getCharFromInt(context_data_val));
                break;
              } else
                context_data_position++;
            }
            return context_data.join("");
          },
          decompress: function(compressed) {
            if (compressed == null)
              return "";
            if (compressed == "")
              return null;
            return LZString2._decompress(compressed.length, 32768, function(index) {
              return compressed.charCodeAt(index);
            });
          },
          _decompress: function(length, resetValue, getNextValue) {
            var dictionary = [], next, enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i, w, bits, resb, maxpower, power, c, data = { val: getNextValue(0), position: resetValue, index: 1 };
            for (i = 0; i < 3; i += 1) {
              dictionary[i] = i;
            }
            bits = 0;
            maxpower = Math.pow(2, 2);
            power = 1;
            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            switch (next = bits) {
              case 0:
                bits = 0;
                maxpower = Math.pow(2, 8);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                c = f(bits);
                break;
              case 1:
                bits = 0;
                maxpower = Math.pow(2, 16);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                c = f(bits);
                break;
              case 2:
                return "";
            }
            dictionary[3] = c;
            w = c;
            result.push(c);
            while (true) {
              if (data.index > length) {
                return "";
              }
              bits = 0;
              maxpower = Math.pow(2, numBits);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              switch (c = bits) {
                case 0:
                  bits = 0;
                  maxpower = Math.pow(2, 8);
                  power = 1;
                  while (power != maxpower) {
                    resb = data.val & data.position;
                    data.position >>= 1;
                    if (data.position == 0) {
                      data.position = resetValue;
                      data.val = getNextValue(data.index++);
                    }
                    bits |= (resb > 0 ? 1 : 0) * power;
                    power <<= 1;
                  }
                  dictionary[dictSize++] = f(bits);
                  c = dictSize - 1;
                  enlargeIn--;
                  break;
                case 1:
                  bits = 0;
                  maxpower = Math.pow(2, 16);
                  power = 1;
                  while (power != maxpower) {
                    resb = data.val & data.position;
                    data.position >>= 1;
                    if (data.position == 0) {
                      data.position = resetValue;
                      data.val = getNextValue(data.index++);
                    }
                    bits |= (resb > 0 ? 1 : 0) * power;
                    power <<= 1;
                  }
                  dictionary[dictSize++] = f(bits);
                  c = dictSize - 1;
                  enlargeIn--;
                  break;
                case 2:
                  return result.join("");
              }
              if (enlargeIn == 0) {
                enlargeIn = Math.pow(2, numBits);
                numBits++;
              }
              if (dictionary[c]) {
                entry = dictionary[c];
              } else {
                if (c === dictSize) {
                  entry = w + w.charAt(0);
                } else {
                  return null;
                }
              }
              result.push(entry);
              dictionary[dictSize++] = w + entry.charAt(0);
              enlargeIn--;
              w = entry;
              if (enlargeIn == 0) {
                enlargeIn = Math.pow(2, numBits);
                numBits++;
              }
            }
          }
        };
        return LZString2;
      }();
      if (typeof define === "function" && define.amd) {
        define(function() {
          return LZString;
        });
      } else if (typeof module2 !== "undefined" && module2 != null) {
        module2.exports = LZString;
      } else if (typeof angular !== "undefined" && angular != null) {
        angular.module("LZString", []).factory("LZString", function() {
          return LZString;
        });
      }
    }
  });

  // ../node_modules/.pnpm/@testing-library+dom@9.3.3/node_modules/@testing-library/dom/dist/helpers.js
  var require_helpers = __commonJS({
    "../node_modules/.pnpm/@testing-library+dom@9.3.3/node_modules/@testing-library/dom/dist/helpers.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TEXT_NODE = void 0;
      exports.checkContainerType = checkContainerType2;
      exports.getDocument = getDocument3;
      exports.getWindowFromNode = getWindowFromNode3;
      exports.jestFakeTimersAreEnabled = jestFakeTimersAreEnabled2;
      var TEXT_NODE2 = 3;
      exports.TEXT_NODE = TEXT_NODE2;
      function jestFakeTimersAreEnabled2() {
        if (typeof jest !== "undefined" && jest !== null) {
          return (
            // legacy timers
            setTimeout._isMockFunction === true || // modern timers
            // eslint-disable-next-line prefer-object-has-own -- not supported by our support matrix
            Object.prototype.hasOwnProperty.call(setTimeout, "clock")
          );
        }
        return false;
      }
      function getDocument3() {
        if (typeof window === "undefined") {
          throw new Error("Could not find default container");
        }
        return window.document;
      }
      function getWindowFromNode3(node) {
        if (node.defaultView) {
          return node.defaultView;
        } else if (node.ownerDocument && node.ownerDocument.defaultView) {
          return node.ownerDocument.defaultView;
        } else if (node.window) {
          return node.window;
        } else if (node.ownerDocument && node.ownerDocument.defaultView === null) {
          throw new Error(`It looks like the window object is not available for the provided node.`);
        } else if (node.then instanceof Function) {
          throw new Error(`It looks like you passed a Promise object instead of a DOM node. Did you do something like \`fireEvent.click(screen.findBy...\` when you meant to use a \`getBy\` query \`fireEvent.click(screen.getBy...\`, or await the findBy query \`fireEvent.click(await screen.findBy...\`?`);
        } else if (Array.isArray(node)) {
          throw new Error(`It looks like you passed an Array instead of a DOM node. Did you do something like \`fireEvent.click(screen.getAllBy...\` when you meant to use a \`getBy\` query \`fireEvent.click(screen.getBy...\`?`);
        } else if (typeof node.debug === "function" && typeof node.logTestingPlaygroundURL === "function") {
          throw new Error(`It looks like you passed a \`screen\` object. Did you do something like \`fireEvent.click(screen, ...\` when you meant to use a query, e.g. \`fireEvent.click(screen.getBy..., \`?`);
        } else {
          throw new Error(`The given node is not an Element, the node type is: ${typeof node}.`);
        }
      }
      function checkContainerType2(container) {
        if (!container || !(typeof container.querySelector === "function") || !(typeof container.querySelectorAll === "function")) {
          throw new TypeError(`Expected container to be an Element, a Document or a DocumentFragment but got ${getTypeName(container)}.`);
        }
        function getTypeName(object) {
          if (typeof object === "object") {
            return object === null ? "null" : object.constructor.name;
          }
          return typeof object;
        }
      }
    }
  });

  // ../node_modules/.pnpm/@testing-library+dom@9.3.3/node_modules/@testing-library/dom/dist/event-map.js
  var require_event_map = __commonJS({
    "../node_modules/.pnpm/@testing-library+dom@9.3.3/node_modules/@testing-library/dom/dist/event-map.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.eventMap = exports.eventAliasMap = void 0;
      var eventMap4 = {
        // Clipboard Events
        copy: {
          EventType: "ClipboardEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        cut: {
          EventType: "ClipboardEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        paste: {
          EventType: "ClipboardEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        // Composition Events
        compositionEnd: {
          EventType: "CompositionEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        compositionStart: {
          EventType: "CompositionEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        compositionUpdate: {
          EventType: "CompositionEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        // Keyboard Events
        keyDown: {
          EventType: "KeyboardEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            charCode: 0,
            composed: true
          }
        },
        keyPress: {
          EventType: "KeyboardEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            charCode: 0,
            composed: true
          }
        },
        keyUp: {
          EventType: "KeyboardEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            charCode: 0,
            composed: true
          }
        },
        // Focus Events
        focus: {
          EventType: "FocusEvent",
          defaultInit: {
            bubbles: false,
            cancelable: false,
            composed: true
          }
        },
        blur: {
          EventType: "FocusEvent",
          defaultInit: {
            bubbles: false,
            cancelable: false,
            composed: true
          }
        },
        focusIn: {
          EventType: "FocusEvent",
          defaultInit: {
            bubbles: true,
            cancelable: false,
            composed: true
          }
        },
        focusOut: {
          EventType: "FocusEvent",
          defaultInit: {
            bubbles: true,
            cancelable: false,
            composed: true
          }
        },
        // Form Events
        change: {
          EventType: "Event",
          defaultInit: {
            bubbles: true,
            cancelable: false
          }
        },
        input: {
          EventType: "InputEvent",
          defaultInit: {
            bubbles: true,
            cancelable: false,
            composed: true
          }
        },
        invalid: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: true
          }
        },
        submit: {
          EventType: "Event",
          defaultInit: {
            bubbles: true,
            cancelable: true
          }
        },
        reset: {
          EventType: "Event",
          defaultInit: {
            bubbles: true,
            cancelable: true
          }
        },
        // Mouse Events
        click: {
          EventType: "MouseEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            button: 0,
            composed: true
          }
        },
        contextMenu: {
          EventType: "MouseEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        dblClick: {
          EventType: "MouseEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        drag: {
          EventType: "DragEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        dragEnd: {
          EventType: "DragEvent",
          defaultInit: {
            bubbles: true,
            cancelable: false,
            composed: true
          }
        },
        dragEnter: {
          EventType: "DragEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        dragExit: {
          EventType: "DragEvent",
          defaultInit: {
            bubbles: true,
            cancelable: false,
            composed: true
          }
        },
        dragLeave: {
          EventType: "DragEvent",
          defaultInit: {
            bubbles: true,
            cancelable: false,
            composed: true
          }
        },
        dragOver: {
          EventType: "DragEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        dragStart: {
          EventType: "DragEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        drop: {
          EventType: "DragEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        mouseDown: {
          EventType: "MouseEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        mouseEnter: {
          EventType: "MouseEvent",
          defaultInit: {
            bubbles: false,
            cancelable: false,
            composed: true
          }
        },
        mouseLeave: {
          EventType: "MouseEvent",
          defaultInit: {
            bubbles: false,
            cancelable: false,
            composed: true
          }
        },
        mouseMove: {
          EventType: "MouseEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        mouseOut: {
          EventType: "MouseEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        mouseOver: {
          EventType: "MouseEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        mouseUp: {
          EventType: "MouseEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        // Selection Events
        select: {
          EventType: "Event",
          defaultInit: {
            bubbles: true,
            cancelable: false
          }
        },
        // Touch Events
        touchCancel: {
          EventType: "TouchEvent",
          defaultInit: {
            bubbles: true,
            cancelable: false,
            composed: true
          }
        },
        touchEnd: {
          EventType: "TouchEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        touchMove: {
          EventType: "TouchEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        touchStart: {
          EventType: "TouchEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        // UI Events
        resize: {
          EventType: "UIEvent",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        scroll: {
          EventType: "UIEvent",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        // Wheel Events
        wheel: {
          EventType: "WheelEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        // Media Events
        abort: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        canPlay: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        canPlayThrough: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        durationChange: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        emptied: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        encrypted: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        ended: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        loadedData: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        loadedMetadata: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        loadStart: {
          EventType: "ProgressEvent",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        pause: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        play: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        playing: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        progress: {
          EventType: "ProgressEvent",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        rateChange: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        seeked: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        seeking: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        stalled: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        suspend: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        timeUpdate: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        volumeChange: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        waiting: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        // Events
        load: {
          // TODO: load events can be UIEvent or Event depending on what generated them
          // This is where this abstraction breaks down.
          // But the common targets are <img />, <script /> and window.
          // Neither of these targets receive a UIEvent
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        error: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        // Animation Events
        animationStart: {
          EventType: "AnimationEvent",
          defaultInit: {
            bubbles: true,
            cancelable: false
          }
        },
        animationEnd: {
          EventType: "AnimationEvent",
          defaultInit: {
            bubbles: true,
            cancelable: false
          }
        },
        animationIteration: {
          EventType: "AnimationEvent",
          defaultInit: {
            bubbles: true,
            cancelable: false
          }
        },
        // Transition Events
        transitionCancel: {
          EventType: "TransitionEvent",
          defaultInit: {
            bubbles: true,
            cancelable: false
          }
        },
        transitionEnd: {
          EventType: "TransitionEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true
          }
        },
        transitionRun: {
          EventType: "TransitionEvent",
          defaultInit: {
            bubbles: true,
            cancelable: false
          }
        },
        transitionStart: {
          EventType: "TransitionEvent",
          defaultInit: {
            bubbles: true,
            cancelable: false
          }
        },
        // pointer events
        pointerOver: {
          EventType: "PointerEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        pointerEnter: {
          EventType: "PointerEvent",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        pointerDown: {
          EventType: "PointerEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        pointerMove: {
          EventType: "PointerEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        pointerUp: {
          EventType: "PointerEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        pointerCancel: {
          EventType: "PointerEvent",
          defaultInit: {
            bubbles: true,
            cancelable: false,
            composed: true
          }
        },
        pointerOut: {
          EventType: "PointerEvent",
          defaultInit: {
            bubbles: true,
            cancelable: true,
            composed: true
          }
        },
        pointerLeave: {
          EventType: "PointerEvent",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        gotPointerCapture: {
          EventType: "PointerEvent",
          defaultInit: {
            bubbles: true,
            cancelable: false,
            composed: true
          }
        },
        lostPointerCapture: {
          EventType: "PointerEvent",
          defaultInit: {
            bubbles: true,
            cancelable: false,
            composed: true
          }
        },
        // history events
        popState: {
          EventType: "PopStateEvent",
          defaultInit: {
            bubbles: true,
            cancelable: false
          }
        },
        // window events
        offline: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        },
        online: {
          EventType: "Event",
          defaultInit: {
            bubbles: false,
            cancelable: false
          }
        }
      };
      exports.eventMap = eventMap4;
      var eventAliasMap2 = {
        doubleClick: "dblClick"
      };
      exports.eventAliasMap = eventAliasMap2;
    }
  });

  // ../node_modules/.pnpm/@testing-library+dom@9.3.3/node_modules/@testing-library/dom/dist/@testing-library/dom.esm.js
  var dom_esm_exports = {};
  __export(dom_esm_exports, {
    buildQueries: () => buildQueries,
    configure: () => configure,
    createEvent: () => createEvent,
    findAllByAltText: () => findAllByAltText,
    findAllByDisplayValue: () => findAllByDisplayValue,
    findAllByLabelText: () => findAllByLabelText,
    findAllByPlaceholderText: () => findAllByPlaceholderText,
    findAllByRole: () => findAllByRole,
    findAllByTestId: () => findAllByTestId,
    findAllByText: () => findAllByText,
    findAllByTitle: () => findAllByTitle,
    findByAltText: () => findByAltText,
    findByDisplayValue: () => findByDisplayValue,
    findByLabelText: () => findByLabelText,
    findByPlaceholderText: () => findByPlaceholderText,
    findByRole: () => findByRole,
    findByTestId: () => findByTestId,
    findByText: () => findByText,
    findByTitle: () => findByTitle,
    fireEvent: () => fireEvent,
    getAllByAltText: () => getAllByAltText,
    getAllByDisplayValue: () => getAllByDisplayValue,
    getAllByLabelText: () => getAllByLabelTextWithSuggestions,
    getAllByPlaceholderText: () => getAllByPlaceholderText,
    getAllByRole: () => getAllByRole,
    getAllByTestId: () => getAllByTestId,
    getAllByText: () => getAllByText,
    getAllByTitle: () => getAllByTitle,
    getByAltText: () => getByAltText,
    getByDisplayValue: () => getByDisplayValue,
    getByLabelText: () => getByLabelTextWithSuggestions,
    getByPlaceholderText: () => getByPlaceholderText,
    getByRole: () => getByRole,
    getByTestId: () => getByTestId,
    getByText: () => getByText,
    getByTitle: () => getByTitle,
    getConfig: () => getConfig,
    getDefaultNormalizer: () => getDefaultNormalizer,
    getElementError: () => getElementError,
    getMultipleElementsFoundError: () => getMultipleElementsFoundError,
    getNodeText: () => getNodeText,
    getQueriesForElement: () => getQueriesForElement,
    getRoles: () => getRoles,
    getSuggestedQuery: () => getSuggestedQuery,
    isInaccessible: () => isInaccessible,
    logDOM: () => logDOM,
    logRoles: () => logRoles,
    makeFindQuery: () => makeFindQuery,
    makeGetAllQuery: () => makeGetAllQuery,
    makeSingleQuery: () => makeSingleQuery,
    prettyDOM: () => prettyDOM,
    prettyFormat: () => prettyFormat,
    queries: () => queries,
    queryAllByAltText: () => queryAllByAltTextWithSuggestions,
    queryAllByAttribute: () => queryAllByAttribute,
    queryAllByDisplayValue: () => queryAllByDisplayValueWithSuggestions,
    queryAllByLabelText: () => queryAllByLabelTextWithSuggestions,
    queryAllByPlaceholderText: () => queryAllByPlaceholderTextWithSuggestions,
    queryAllByRole: () => queryAllByRoleWithSuggestions,
    queryAllByTestId: () => queryAllByTestIdWithSuggestions,
    queryAllByText: () => queryAllByTextWithSuggestions,
    queryAllByTitle: () => queryAllByTitleWithSuggestions,
    queryByAltText: () => queryByAltText,
    queryByAttribute: () => queryByAttribute,
    queryByDisplayValue: () => queryByDisplayValue,
    queryByLabelText: () => queryByLabelText,
    queryByPlaceholderText: () => queryByPlaceholderText,
    queryByRole: () => queryByRole,
    queryByTestId: () => queryByTestId,
    queryByText: () => queryByText,
    queryByTitle: () => queryByTitle,
    queryHelpers: () => queryHelpers,
    screen: () => screen,
    waitFor: () => waitForWrapper,
    waitForElementToBeRemoved: () => waitForElementToBeRemoved,
    within: () => getQueriesForElement,
    wrapAllByQueryWithSuggestion: () => wrapAllByQueryWithSuggestion,
    wrapSingleQueryWithSuggestion: () => wrapSingleQueryWithSuggestion
  });
  var prettyFormat = __toESM(require_build());

  // ../node_modules/.pnpm/dom-accessibility-api@0.5.15/node_modules/dom-accessibility-api/dist/polyfills/array.from.mjs
  var toStr = Object.prototype.toString;
  function isCallable(fn) {
    return typeof fn === "function" || toStr.call(fn) === "[object Function]";
  }
  function toInteger(value) {
    var number = Number(value);
    if (isNaN(number)) {
      return 0;
    }
    if (number === 0 || !isFinite(number)) {
      return number;
    }
    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
  }
  var maxSafeInteger = Math.pow(2, 53) - 1;
  function toLength(value) {
    var len = toInteger(value);
    return Math.min(Math.max(len, 0), maxSafeInteger);
  }
  function arrayFrom(arrayLike, mapFn) {
    var C = Array;
    var items = Object(arrayLike);
    if (arrayLike == null) {
      throw new TypeError("Array.from requires an array-like object - not null or undefined");
    }
    if (typeof mapFn !== "undefined") {
      if (!isCallable(mapFn)) {
        throw new TypeError("Array.from: when provided, the second argument must be a function");
      }
    }
    var len = toLength(items.length);
    var A = isCallable(C) ? Object(new C(len)) : new Array(len);
    var k = 0;
    var kValue;
    while (k < len) {
      kValue = items[k];
      if (mapFn) {
        A[k] = mapFn(kValue, k);
      } else {
        A[k] = kValue;
      }
      k += 1;
    }
    A.length = len;
    return A;
  }

  // ../node_modules/.pnpm/dom-accessibility-api@0.5.15/node_modules/dom-accessibility-api/dist/polyfills/SetLike.mjs
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input2, hint) {
    if (_typeof(input2) !== "object" || input2 === null)
      return input2;
    var prim = input2[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input2, hint || "default");
      if (_typeof(res) !== "object")
        return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input2);
  }
  var SetLike = /* @__PURE__ */ function() {
    function SetLike2() {
      var items = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      _classCallCheck(this, SetLike2);
      _defineProperty(this, "items", void 0);
      this.items = items;
    }
    _createClass(SetLike2, [{
      key: "add",
      value: function add(value) {
        if (this.has(value) === false) {
          this.items.push(value);
        }
        return this;
      }
    }, {
      key: "clear",
      value: function clear3() {
        this.items = [];
      }
    }, {
      key: "delete",
      value: function _delete(value) {
        var previousLength = this.items.length;
        this.items = this.items.filter(function(item) {
          return item !== value;
        });
        return previousLength !== this.items.length;
      }
    }, {
      key: "forEach",
      value: function forEach(callbackfn) {
        var _this = this;
        this.items.forEach(function(item) {
          callbackfn(item, item, _this);
        });
      }
    }, {
      key: "has",
      value: function has(value) {
        return this.items.indexOf(value) !== -1;
      }
    }, {
      key: "size",
      get: function get() {
        return this.items.length;
      }
    }]);
    return SetLike2;
  }();
  var SetLike_default = typeof Set === "undefined" ? Set : SetLike;

  // ../node_modules/.pnpm/dom-accessibility-api@0.5.15/node_modules/dom-accessibility-api/dist/getRole.mjs
  function getLocalName(element) {
    var _element$localName;
    return (
      // eslint-disable-next-line no-restricted-properties -- actual guard for environments without localName
      (_element$localName = element.localName) !== null && _element$localName !== void 0 ? _element$localName : (
        // eslint-disable-next-line no-restricted-properties -- required for the fallback
        element.tagName.toLowerCase()
      )
    );
  }
  var localNameToRoleMappings = {
    article: "article",
    aside: "complementary",
    button: "button",
    datalist: "listbox",
    dd: "definition",
    details: "group",
    dialog: "dialog",
    dt: "term",
    fieldset: "group",
    figure: "figure",
    // WARNING: Only with an accessible name
    form: "form",
    footer: "contentinfo",
    h1: "heading",
    h2: "heading",
    h3: "heading",
    h4: "heading",
    h5: "heading",
    h6: "heading",
    header: "banner",
    hr: "separator",
    html: "document",
    legend: "legend",
    li: "listitem",
    math: "math",
    main: "main",
    menu: "list",
    nav: "navigation",
    ol: "list",
    optgroup: "group",
    // WARNING: Only in certain context
    option: "option",
    output: "status",
    progress: "progressbar",
    // WARNING: Only with an accessible name
    section: "region",
    summary: "button",
    table: "table",
    tbody: "rowgroup",
    textarea: "textbox",
    tfoot: "rowgroup",
    // WARNING: Only in certain context
    td: "cell",
    th: "columnheader",
    thead: "rowgroup",
    tr: "row",
    ul: "list"
  };
  var prohibitedAttributes = {
    caption: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
    code: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
    deletion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
    emphasis: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
    generic: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby", "aria-roledescription"]),
    insertion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
    paragraph: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
    presentation: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
    strong: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
    subscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
    superscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"])
  };
  function hasGlobalAriaAttributes(element, role) {
    return [
      "aria-atomic",
      "aria-busy",
      "aria-controls",
      "aria-current",
      "aria-describedby",
      "aria-details",
      // "disabled",
      "aria-dropeffect",
      // "errormessage",
      "aria-flowto",
      "aria-grabbed",
      // "haspopup",
      "aria-hidden",
      // "invalid",
      "aria-keyshortcuts",
      "aria-label",
      "aria-labelledby",
      "aria-live",
      "aria-owns",
      "aria-relevant",
      "aria-roledescription"
    ].some(function(attributeName) {
      var _prohibitedAttributes;
      return element.hasAttribute(attributeName) && !((_prohibitedAttributes = prohibitedAttributes[role]) !== null && _prohibitedAttributes !== void 0 && _prohibitedAttributes.has(attributeName));
    });
  }
  function ignorePresentationalRole(element, implicitRole) {
    return hasGlobalAriaAttributes(element, implicitRole);
  }
  function getRole(element) {
    var explicitRole = getExplicitRole(element);
    if (explicitRole === null || explicitRole === "presentation") {
      var implicitRole = getImplicitRole(element);
      if (explicitRole !== "presentation" || ignorePresentationalRole(element, implicitRole || "")) {
        return implicitRole;
      }
    }
    return explicitRole;
  }
  function getImplicitRole(element) {
    var mappedByTag = localNameToRoleMappings[getLocalName(element)];
    if (mappedByTag !== void 0) {
      return mappedByTag;
    }
    switch (getLocalName(element)) {
      case "a":
      case "area":
      case "link":
        if (element.hasAttribute("href")) {
          return "link";
        }
        break;
      case "img":
        if (element.getAttribute("alt") === "" && !ignorePresentationalRole(element, "img")) {
          return "presentation";
        }
        return "img";
      case "input": {
        var _ref = element, type3 = _ref.type;
        switch (type3) {
          case "button":
          case "image":
          case "reset":
          case "submit":
            return "button";
          case "checkbox":
          case "radio":
            return type3;
          case "range":
            return "slider";
          case "email":
          case "tel":
          case "text":
          case "url":
            if (element.hasAttribute("list")) {
              return "combobox";
            }
            return "textbox";
          case "search":
            if (element.hasAttribute("list")) {
              return "combobox";
            }
            return "searchbox";
          case "number":
            return "spinbutton";
          default:
            return null;
        }
      }
      case "select":
        if (element.hasAttribute("multiple") || element.size > 1) {
          return "listbox";
        }
        return "combobox";
    }
    return null;
  }
  function getExplicitRole(element) {
    var role = element.getAttribute("role");
    if (role !== null) {
      var explicitRole = role.trim().split(" ")[0];
      if (explicitRole.length > 0) {
        return explicitRole;
      }
    }
    return null;
  }

  // ../node_modules/.pnpm/dom-accessibility-api@0.5.15/node_modules/dom-accessibility-api/dist/util.mjs
  function isElement(node) {
    return node !== null && node.nodeType === node.ELEMENT_NODE;
  }
  function isHTMLTableCaptionElement(node) {
    return isElement(node) && getLocalName(node) === "caption";
  }
  function isHTMLInputElement(node) {
    return isElement(node) && getLocalName(node) === "input";
  }
  function isHTMLOptGroupElement(node) {
    return isElement(node) && getLocalName(node) === "optgroup";
  }
  function isHTMLSelectElement(node) {
    return isElement(node) && getLocalName(node) === "select";
  }
  function isHTMLTableElement(node) {
    return isElement(node) && getLocalName(node) === "table";
  }
  function isHTMLTextAreaElement(node) {
    return isElement(node) && getLocalName(node) === "textarea";
  }
  function safeWindow(node) {
    var _ref = node.ownerDocument === null ? node : node.ownerDocument, defaultView = _ref.defaultView;
    if (defaultView === null) {
      throw new TypeError("no window available");
    }
    return defaultView;
  }
  function isHTMLFieldSetElement(node) {
    return isElement(node) && getLocalName(node) === "fieldset";
  }
  function isHTMLLegendElement(node) {
    return isElement(node) && getLocalName(node) === "legend";
  }
  function isHTMLSlotElement(node) {
    return isElement(node) && getLocalName(node) === "slot";
  }
  function isSVGElement(node) {
    return isElement(node) && node.ownerSVGElement !== void 0;
  }
  function isSVGSVGElement(node) {
    return isElement(node) && getLocalName(node) === "svg";
  }
  function isSVGTitleElement(node) {
    return isSVGElement(node) && getLocalName(node) === "title";
  }
  function queryIdRefs(node, attributeName) {
    if (isElement(node) && node.hasAttribute(attributeName)) {
      var ids = node.getAttribute(attributeName).split(" ");
      var root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
      return ids.map(function(id) {
        return root.getElementById(id);
      }).filter(
        function(element) {
          return element !== null;
        }
        // TODO: why does this not narrow?
      );
    }
    return [];
  }
  function hasAnyConcreteRoles(node, roles2) {
    if (isElement(node)) {
      return roles2.indexOf(getRole(node)) !== -1;
    }
    return false;
  }

  // ../node_modules/.pnpm/dom-accessibility-api@0.5.15/node_modules/dom-accessibility-api/dist/accessible-name-and-description.mjs
  function asFlatString(s) {
    return s.trim().replace(/\s\s+/g, " ");
  }
  function isHidden(node, getComputedStyleImplementation) {
    if (!isElement(node)) {
      return false;
    }
    if (node.hasAttribute("hidden") || node.getAttribute("aria-hidden") === "true") {
      return true;
    }
    var style = getComputedStyleImplementation(node);
    return style.getPropertyValue("display") === "none" || style.getPropertyValue("visibility") === "hidden";
  }
  function isControl(node) {
    return hasAnyConcreteRoles(node, ["button", "combobox", "listbox", "textbox"]) || hasAbstractRole(node, "range");
  }
  function hasAbstractRole(node, role) {
    if (!isElement(node)) {
      return false;
    }
    switch (role) {
      case "range":
        return hasAnyConcreteRoles(node, ["meter", "progressbar", "scrollbar", "slider", "spinbutton"]);
      default:
        throw new TypeError("No knowledge about abstract role '".concat(role, "'. This is likely a bug :("));
    }
  }
  function querySelectorAllSubtree(element, selectors) {
    var elements = arrayFrom(element.querySelectorAll(selectors));
    queryIdRefs(element, "aria-owns").forEach(function(root) {
      elements.push.apply(elements, arrayFrom(root.querySelectorAll(selectors)));
    });
    return elements;
  }
  function querySelectedOptions(listbox) {
    if (isHTMLSelectElement(listbox)) {
      return listbox.selectedOptions || querySelectorAllSubtree(listbox, "[selected]");
    }
    return querySelectorAllSubtree(listbox, '[aria-selected="true"]');
  }
  function isMarkedPresentational(node) {
    return hasAnyConcreteRoles(node, ["none", "presentation"]);
  }
  function isNativeHostLanguageTextAlternativeElement(node) {
    return isHTMLTableCaptionElement(node);
  }
  function allowsNameFromContent(node) {
    return hasAnyConcreteRoles(node, ["button", "cell", "checkbox", "columnheader", "gridcell", "heading", "label", "legend", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "row", "rowheader", "switch", "tab", "tooltip", "treeitem"]);
  }
  function isDescendantOfNativeHostLanguageTextAlternativeElement(node) {
    return false;
  }
  function getValueOfTextbox(element) {
    if (isHTMLInputElement(element) || isHTMLTextAreaElement(element)) {
      return element.value;
    }
    return element.textContent || "";
  }
  function getTextualContent(declaration) {
    var content = declaration.getPropertyValue("content");
    if (/^["'].*["']$/.test(content)) {
      return content.slice(1, -1);
    }
    return "";
  }
  function isLabelableElement(element) {
    var localName = getLocalName(element);
    return localName === "button" || localName === "input" && element.getAttribute("type") !== "hidden" || localName === "meter" || localName === "output" || localName === "progress" || localName === "select" || localName === "textarea";
  }
  function findLabelableElement(element) {
    if (isLabelableElement(element)) {
      return element;
    }
    var labelableElement = null;
    element.childNodes.forEach(function(childNode) {
      if (labelableElement === null && isElement(childNode)) {
        var descendantLabelableElement = findLabelableElement(childNode);
        if (descendantLabelableElement !== null) {
          labelableElement = descendantLabelableElement;
        }
      }
    });
    return labelableElement;
  }
  function getControlOfLabel(label) {
    if (label.control !== void 0) {
      return label.control;
    }
    var htmlFor = label.getAttribute("for");
    if (htmlFor !== null) {
      return label.ownerDocument.getElementById(htmlFor);
    }
    return findLabelableElement(label);
  }
  function getLabels(element) {
    var labelsProperty = element.labels;
    if (labelsProperty === null) {
      return labelsProperty;
    }
    if (labelsProperty !== void 0) {
      return arrayFrom(labelsProperty);
    }
    if (!isLabelableElement(element)) {
      return null;
    }
    var document2 = element.ownerDocument;
    return arrayFrom(document2.querySelectorAll("label")).filter(function(label) {
      return getControlOfLabel(label) === element;
    });
  }
  function getSlotContents(slot) {
    var assignedNodes = slot.assignedNodes();
    if (assignedNodes.length === 0) {
      return arrayFrom(slot.childNodes);
    }
    return assignedNodes;
  }
  function computeTextAlternative(root) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var consultedNodes = new SetLike_default();
    var window2 = safeWindow(root);
    var _options$compute = options.compute, compute = _options$compute === void 0 ? "name" : _options$compute, _options$computedStyl = options.computedStyleSupportsPseudoElements, computedStyleSupportsPseudoElements = _options$computedStyl === void 0 ? options.getComputedStyle !== void 0 : _options$computedStyl, _options$getComputedS = options.getComputedStyle, getComputedStyle = _options$getComputedS === void 0 ? window2.getComputedStyle.bind(window2) : _options$getComputedS, _options$hidden = options.hidden, hidden = _options$hidden === void 0 ? false : _options$hidden;
    function computeMiscTextAlternative(node, context) {
      var accumulatedText = "";
      if (isElement(node) && computedStyleSupportsPseudoElements) {
        var pseudoBefore = getComputedStyle(node, "::before");
        var beforeContent = getTextualContent(pseudoBefore);
        accumulatedText = "".concat(beforeContent, " ").concat(accumulatedText);
      }
      var childNodes = isHTMLSlotElement(node) ? getSlotContents(node) : arrayFrom(node.childNodes).concat(queryIdRefs(node, "aria-owns"));
      childNodes.forEach(function(child) {
        var result = computeTextAlternative2(child, {
          isEmbeddedInLabel: context.isEmbeddedInLabel,
          isReferenced: false,
          recursion: true
        });
        var display = isElement(child) ? getComputedStyle(child).getPropertyValue("display") : "inline";
        var separator = display !== "inline" ? " " : "";
        accumulatedText += "".concat(separator).concat(result).concat(separator);
      });
      if (isElement(node) && computedStyleSupportsPseudoElements) {
        var pseudoAfter = getComputedStyle(node, "::after");
        var afterContent = getTextualContent(pseudoAfter);
        accumulatedText = "".concat(accumulatedText, " ").concat(afterContent);
      }
      return accumulatedText.trim();
    }
    function useAttribute(element, attributeName) {
      var attribute = element.getAttributeNode(attributeName);
      if (attribute !== null && !consultedNodes.has(attribute) && attribute.value.trim() !== "") {
        consultedNodes.add(attribute);
        return attribute.value;
      }
      return null;
    }
    function computeTooltipAttributeValue(node) {
      if (!isElement(node)) {
        return null;
      }
      return useAttribute(node, "title");
    }
    function computeElementTextAlternative(node) {
      if (!isElement(node)) {
        return null;
      }
      if (isHTMLFieldSetElement(node)) {
        consultedNodes.add(node);
        var children = arrayFrom(node.childNodes);
        for (var i = 0; i < children.length; i += 1) {
          var child = children[i];
          if (isHTMLLegendElement(child)) {
            return computeTextAlternative2(child, {
              isEmbeddedInLabel: false,
              isReferenced: false,
              recursion: false
            });
          }
        }
      } else if (isHTMLTableElement(node)) {
        consultedNodes.add(node);
        var _children = arrayFrom(node.childNodes);
        for (var _i = 0; _i < _children.length; _i += 1) {
          var _child = _children[_i];
          if (isHTMLTableCaptionElement(_child)) {
            return computeTextAlternative2(_child, {
              isEmbeddedInLabel: false,
              isReferenced: false,
              recursion: false
            });
          }
        }
      } else if (isSVGSVGElement(node)) {
        consultedNodes.add(node);
        var _children2 = arrayFrom(node.childNodes);
        for (var _i2 = 0; _i2 < _children2.length; _i2 += 1) {
          var _child2 = _children2[_i2];
          if (isSVGTitleElement(_child2)) {
            return _child2.textContent;
          }
        }
        return null;
      } else if (getLocalName(node) === "img" || getLocalName(node) === "area") {
        var nameFromAlt = useAttribute(node, "alt");
        if (nameFromAlt !== null) {
          return nameFromAlt;
        }
      } else if (isHTMLOptGroupElement(node)) {
        var nameFromLabel = useAttribute(node, "label");
        if (nameFromLabel !== null) {
          return nameFromLabel;
        }
      }
      if (isHTMLInputElement(node) && (node.type === "button" || node.type === "submit" || node.type === "reset")) {
        var nameFromValue = useAttribute(node, "value");
        if (nameFromValue !== null) {
          return nameFromValue;
        }
        if (node.type === "submit") {
          return "Submit";
        }
        if (node.type === "reset") {
          return "Reset";
        }
      }
      var labels = getLabels(node);
      if (labels !== null && labels.length !== 0) {
        consultedNodes.add(node);
        return arrayFrom(labels).map(function(element) {
          return computeTextAlternative2(element, {
            isEmbeddedInLabel: true,
            isReferenced: false,
            recursion: true
          });
        }).filter(function(label) {
          return label.length > 0;
        }).join(" ");
      }
      if (isHTMLInputElement(node) && node.type === "image") {
        var _nameFromAlt = useAttribute(node, "alt");
        if (_nameFromAlt !== null) {
          return _nameFromAlt;
        }
        var nameFromTitle = useAttribute(node, "title");
        if (nameFromTitle !== null) {
          return nameFromTitle;
        }
        return "Submit Query";
      }
      if (hasAnyConcreteRoles(node, ["button"])) {
        var nameFromSubTree = computeMiscTextAlternative(node, {
          isEmbeddedInLabel: false,
          isReferenced: false
        });
        if (nameFromSubTree !== "") {
          return nameFromSubTree;
        }
      }
      return null;
    }
    function computeTextAlternative2(current, context) {
      if (consultedNodes.has(current)) {
        return "";
      }
      if (!hidden && isHidden(current, getComputedStyle) && !context.isReferenced) {
        consultedNodes.add(current);
        return "";
      }
      var labelElements = queryIdRefs(current, "aria-labelledby");
      if (compute === "name" && !context.isReferenced && labelElements.length > 0) {
        return labelElements.map(function(element) {
          return computeTextAlternative2(element, {
            isEmbeddedInLabel: context.isEmbeddedInLabel,
            isReferenced: true,
            // thais isn't recursion as specified, otherwise we would skip
            // `aria-label` in
            // <input id="myself" aria-label="foo" aria-labelledby="myself"
            recursion: false
          });
        }).join(" ");
      }
      var skipToStep2E = context.recursion && isControl(current) && compute === "name";
      if (!skipToStep2E) {
        var ariaLabel = (isElement(current) && current.getAttribute("aria-label") || "").trim();
        if (ariaLabel !== "" && compute === "name") {
          consultedNodes.add(current);
          return ariaLabel;
        }
        if (!isMarkedPresentational(current)) {
          var elementTextAlternative = computeElementTextAlternative(current);
          if (elementTextAlternative !== null) {
            consultedNodes.add(current);
            return elementTextAlternative;
          }
        }
      }
      if (hasAnyConcreteRoles(current, ["menu"])) {
        consultedNodes.add(current);
        return "";
      }
      if (skipToStep2E || context.isEmbeddedInLabel || context.isReferenced) {
        if (hasAnyConcreteRoles(current, ["combobox", "listbox"])) {
          consultedNodes.add(current);
          var selectedOptions = querySelectedOptions(current);
          if (selectedOptions.length === 0) {
            return isHTMLInputElement(current) ? current.value : "";
          }
          return arrayFrom(selectedOptions).map(function(selectedOption) {
            return computeTextAlternative2(selectedOption, {
              isEmbeddedInLabel: context.isEmbeddedInLabel,
              isReferenced: false,
              recursion: true
            });
          }).join(" ");
        }
        if (hasAbstractRole(current, "range")) {
          consultedNodes.add(current);
          if (current.hasAttribute("aria-valuetext")) {
            return current.getAttribute("aria-valuetext");
          }
          if (current.hasAttribute("aria-valuenow")) {
            return current.getAttribute("aria-valuenow");
          }
          return current.getAttribute("value") || "";
        }
        if (hasAnyConcreteRoles(current, ["textbox"])) {
          consultedNodes.add(current);
          return getValueOfTextbox(current);
        }
      }
      if (allowsNameFromContent(current) || isElement(current) && context.isReferenced || isNativeHostLanguageTextAlternativeElement(current) || isDescendantOfNativeHostLanguageTextAlternativeElement(current)) {
        var accumulatedText2F = computeMiscTextAlternative(current, {
          isEmbeddedInLabel: context.isEmbeddedInLabel,
          isReferenced: false
        });
        if (accumulatedText2F !== "") {
          consultedNodes.add(current);
          return accumulatedText2F;
        }
      }
      if (current.nodeType === current.TEXT_NODE) {
        consultedNodes.add(current);
        return current.textContent || "";
      }
      if (context.recursion) {
        consultedNodes.add(current);
        return computeMiscTextAlternative(current, {
          isEmbeddedInLabel: context.isEmbeddedInLabel,
          isReferenced: false
        });
      }
      var tooltipAttributeValue = computeTooltipAttributeValue(current);
      if (tooltipAttributeValue !== null) {
        consultedNodes.add(current);
        return tooltipAttributeValue;
      }
      consultedNodes.add(current);
      return "";
    }
    return asFlatString(computeTextAlternative2(root, {
      isEmbeddedInLabel: false,
      // by spec computeAccessibleDescription starts with the referenced elements as roots
      isReferenced: compute === "description",
      recursion: false
    }));
  }

  // ../node_modules/.pnpm/dom-accessibility-api@0.5.15/node_modules/dom-accessibility-api/dist/accessible-description.mjs
  function _typeof2(obj) {
    "@babel/helpers - typeof";
    return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof2(obj);
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty2(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty2(obj, key, value) {
    key = _toPropertyKey2(key);
    if (key in obj) {
      Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toPropertyKey2(arg) {
    var key = _toPrimitive2(arg, "string");
    return _typeof2(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive2(input2, hint) {
    if (_typeof2(input2) !== "object" || input2 === null)
      return input2;
    var prim = input2[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input2, hint || "default");
      if (_typeof2(res) !== "object")
        return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input2);
  }
  function computeAccessibleDescription(root) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var description = queryIdRefs(root, "aria-describedby").map(function(element) {
      return computeTextAlternative(element, _objectSpread(_objectSpread({}, options), {}, {
        compute: "description"
      }));
    }).join(" ");
    if (description === "") {
      var title = root.getAttribute("title");
      description = title === null ? "" : title;
    }
    return description;
  }

  // ../node_modules/.pnpm/dom-accessibility-api@0.5.15/node_modules/dom-accessibility-api/dist/accessible-name.mjs
  function prohibitsNaming(node) {
    return hasAnyConcreteRoles(node, ["caption", "code", "deletion", "emphasis", "generic", "insertion", "paragraph", "presentation", "strong", "subscript", "superscript"]);
  }
  function computeAccessibleName(root) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (prohibitsNaming(root)) {
      return "";
    }
    return computeTextAlternative(root, options);
  }

  // ../node_modules/.pnpm/@testing-library+dom@9.3.3/node_modules/@testing-library/dom/dist/@testing-library/dom.esm.js
  var import_aria_query = __toESM(require_lib());
  var import_lz_string = __toESM(require_lz_string());
  function escapeHTML(str) {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  var printProps = (keys, props, config2, indentation, depth, refs, printer) => {
    const indentationNext = indentation + config2.indent;
    const colors = config2.colors;
    return keys.map((key) => {
      const value = props[key];
      let printed = printer(value, config2, indentationNext, depth, refs);
      if (typeof value !== "string") {
        if (printed.indexOf("\n") !== -1) {
          printed = config2.spacingOuter + indentationNext + printed + config2.spacingOuter + indentation;
        }
        printed = "{" + printed + "}";
      }
      return config2.spacingInner + indentation + colors.prop.open + key + colors.prop.close + "=" + colors.value.open + printed + colors.value.close;
    }).join("");
  };
  var NodeTypeTextNode = 3;
  var printChildren = (children, config2, indentation, depth, refs, printer) => children.map((child) => {
    const printedChild = typeof child === "string" ? printText(child, config2) : printer(child, config2, indentation, depth, refs);
    if (printedChild === "" && typeof child === "object" && child !== null && child.nodeType !== NodeTypeTextNode) {
      return "";
    }
    return config2.spacingOuter + indentation + printedChild;
  }).join("");
  var printText = (text, config2) => {
    const contentColor = config2.colors.content;
    return contentColor.open + escapeHTML(text) + contentColor.close;
  };
  var printComment = (comment, config2) => {
    const commentColor = config2.colors.comment;
    return commentColor.open + "<!--" + escapeHTML(comment) + "-->" + commentColor.close;
  };
  var printElement = (type3, printedProps, printedChildren, config2, indentation) => {
    const tagColor = config2.colors.tag;
    return tagColor.open + "<" + type3 + (printedProps && tagColor.close + printedProps + config2.spacingOuter + indentation + tagColor.open) + (printedChildren ? ">" + tagColor.close + printedChildren + config2.spacingOuter + indentation + tagColor.open + "</" + type3 : (printedProps && !config2.min ? "" : " ") + "/") + ">" + tagColor.close;
  };
  var printElementAsLeaf = (type3, config2) => {
    const tagColor = config2.colors.tag;
    return tagColor.open + "<" + type3 + tagColor.close + " \u2026" + tagColor.open + " />" + tagColor.close;
  };
  var ELEMENT_NODE$1 = 1;
  var TEXT_NODE$1 = 3;
  var COMMENT_NODE$1 = 8;
  var FRAGMENT_NODE = 11;
  var ELEMENT_REGEXP = /^((HTML|SVG)\w*)?Element$/;
  var testNode = (val) => {
    const constructorName = val.constructor.name;
    const {
      nodeType,
      tagName
    } = val;
    const isCustomElement = typeof tagName === "string" && tagName.includes("-") || typeof val.hasAttribute === "function" && val.hasAttribute("is");
    return nodeType === ELEMENT_NODE$1 && (ELEMENT_REGEXP.test(constructorName) || isCustomElement) || nodeType === TEXT_NODE$1 && constructorName === "Text" || nodeType === COMMENT_NODE$1 && constructorName === "Comment" || nodeType === FRAGMENT_NODE && constructorName === "DocumentFragment";
  };
  function nodeIsText(node) {
    return node.nodeType === TEXT_NODE$1;
  }
  function nodeIsComment(node) {
    return node.nodeType === COMMENT_NODE$1;
  }
  function nodeIsFragment(node) {
    return node.nodeType === FRAGMENT_NODE;
  }
  function createDOMElementFilter(filterNode) {
    return {
      test: (val) => {
        var _val$constructor2;
        return (val == null || (_val$constructor2 = val.constructor) == null ? void 0 : _val$constructor2.name) && testNode(val);
      },
      serialize: (node, config2, indentation, depth, refs, printer) => {
        if (nodeIsText(node)) {
          return printText(node.data, config2);
        }
        if (nodeIsComment(node)) {
          return printComment(node.data, config2);
        }
        const type3 = nodeIsFragment(node) ? "DocumentFragment" : node.tagName.toLowerCase();
        if (++depth > config2.maxDepth) {
          return printElementAsLeaf(type3, config2);
        }
        return printElement(type3, printProps(nodeIsFragment(node) ? [] : Array.from(node.attributes).map((attr) => attr.name).sort(), nodeIsFragment(node) ? {} : Array.from(node.attributes).reduce((props, attribute) => {
          props[attribute.name] = attribute.value;
          return props;
        }, {}), config2, indentation + config2.indent, depth, refs, printer), printChildren(Array.prototype.slice.call(node.childNodes || node.children).filter(filterNode), config2, indentation + config2.indent, depth, refs, printer), config2, indentation);
      }
    };
  }
  var chalk = null;
  var readFileSync = null;
  var codeFrameColumns = null;
  try {
    const nodeRequire = module && module.require;
    readFileSync = nodeRequire.call(module, "fs").readFileSync;
    codeFrameColumns = nodeRequire.call(module, "@babel/code-frame").codeFrameColumns;
    chalk = nodeRequire.call(module, "chalk");
  } catch {
  }
  function getCodeFrame(frame) {
    const locationStart = frame.indexOf("(") + 1;
    const locationEnd = frame.indexOf(")");
    const frameLocation = frame.slice(locationStart, locationEnd);
    const frameLocationElements = frameLocation.split(":");
    const [filename, line, column] = [frameLocationElements[0], parseInt(frameLocationElements[1], 10), parseInt(frameLocationElements[2], 10)];
    let rawFileContents = "";
    try {
      rawFileContents = readFileSync(filename, "utf-8");
    } catch {
      return "";
    }
    const codeFrame = codeFrameColumns(rawFileContents, {
      start: {
        line,
        column
      }
    }, {
      highlightCode: true,
      linesBelow: 0
    });
    return chalk.dim(frameLocation) + "\n" + codeFrame + "\n";
  }
  function getUserCodeFrame() {
    if (!readFileSync || !codeFrameColumns) {
      return "";
    }
    const err = new Error();
    const firstClientCodeFrame = err.stack.split("\n").slice(1).find((frame) => !frame.includes("node_modules/"));
    return getCodeFrame(firstClientCodeFrame);
  }
  var TEXT_NODE = 3;
  function jestFakeTimersAreEnabled() {
    if (typeof jest !== "undefined" && jest !== null) {
      return (
        // legacy timers
        setTimeout._isMockFunction === true || // modern timers
        // eslint-disable-next-line prefer-object-has-own -- not supported by our support matrix
        Object.prototype.hasOwnProperty.call(setTimeout, "clock")
      );
    }
    return false;
  }
  function getDocument() {
    if (typeof window === "undefined") {
      throw new Error("Could not find default container");
    }
    return window.document;
  }
  function getWindowFromNode(node) {
    if (node.defaultView) {
      return node.defaultView;
    } else if (node.ownerDocument && node.ownerDocument.defaultView) {
      return node.ownerDocument.defaultView;
    } else if (node.window) {
      return node.window;
    } else if (node.ownerDocument && node.ownerDocument.defaultView === null) {
      throw new Error("It looks like the window object is not available for the provided node.");
    } else if (node.then instanceof Function) {
      throw new Error("It looks like you passed a Promise object instead of a DOM node. Did you do something like `fireEvent.click(screen.findBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`, or await the findBy query `fireEvent.click(await screen.findBy...`?");
    } else if (Array.isArray(node)) {
      throw new Error("It looks like you passed an Array instead of a DOM node. Did you do something like `fireEvent.click(screen.getAllBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`?");
    } else if (typeof node.debug === "function" && typeof node.logTestingPlaygroundURL === "function") {
      throw new Error("It looks like you passed a `screen` object. Did you do something like `fireEvent.click(screen, ...` when you meant to use a query, e.g. `fireEvent.click(screen.getBy..., `?");
    } else {
      throw new Error("The given node is not an Element, the node type is: " + typeof node + ".");
    }
  }
  function checkContainerType(container) {
    if (!container || !(typeof container.querySelector === "function") || !(typeof container.querySelectorAll === "function")) {
      throw new TypeError("Expected container to be an Element, a Document or a DocumentFragment but got " + getTypeName(container) + ".");
    }
    function getTypeName(object) {
      if (typeof object === "object") {
        return object === null ? "null" : object.constructor.name;
      }
      return typeof object;
    }
  }
  var shouldHighlight = () => {
    let colors;
    try {
      var _process;
      colors = JSON.parse((_process = process) == null || (_process = _process.env) == null ? void 0 : _process.COLORS);
    } catch (e) {
    }
    if (typeof colors === "boolean") {
      return colors;
    } else {
      return typeof process !== "undefined" && process.versions !== void 0 && process.versions.node !== void 0;
    }
  };
  var {
    DOMCollection
  } = prettyFormat.plugins;
  var ELEMENT_NODE = 1;
  var COMMENT_NODE = 8;
  function filterCommentsAndDefaultIgnoreTagsTags(value) {
    return value.nodeType !== COMMENT_NODE && (value.nodeType !== ELEMENT_NODE || !value.matches(getConfig().defaultIgnore));
  }
  function prettyDOM(dom, maxLength, options) {
    if (options === void 0) {
      options = {};
    }
    if (!dom) {
      dom = getDocument().body;
    }
    if (typeof maxLength !== "number") {
      maxLength = typeof process !== "undefined" && process.env.DEBUG_PRINT_LIMIT || 7e3;
    }
    if (maxLength === 0) {
      return "";
    }
    if (dom.documentElement) {
      dom = dom.documentElement;
    }
    let domTypeName = typeof dom;
    if (domTypeName === "object") {
      domTypeName = dom.constructor.name;
    } else {
      dom = {};
    }
    if (!("outerHTML" in dom)) {
      throw new TypeError("Expected an element or document but got " + domTypeName);
    }
    const {
      filterNode = filterCommentsAndDefaultIgnoreTagsTags,
      ...prettyFormatOptions
    } = options;
    const debugContent = prettyFormat.format(dom, {
      plugins: [createDOMElementFilter(filterNode), DOMCollection],
      printFunctionName: false,
      highlight: shouldHighlight(),
      ...prettyFormatOptions
    });
    return maxLength !== void 0 && dom.outerHTML.length > maxLength ? debugContent.slice(0, maxLength) + "..." : debugContent;
  }
  var logDOM = function() {
    const userCodeFrame = getUserCodeFrame();
    if (userCodeFrame) {
      console.log(prettyDOM(...arguments) + "\n\n" + userCodeFrame);
    } else {
      console.log(prettyDOM(...arguments));
    }
  };
  var config = {
    testIdAttribute: "data-testid",
    asyncUtilTimeout: 1e3,
    // asyncWrapper and advanceTimersWrapper is to support React's async `act` function.
    // forcing react-testing-library to wrap all async functions would've been
    // a total nightmare (consider wrapping every findBy* query and then also
    // updating `within` so those would be wrapped too. Total nightmare).
    // so we have this config option that's really only intended for
    // react-testing-library to use. For that reason, this feature will remain
    // undocumented.
    asyncWrapper: (cb) => cb(),
    unstable_advanceTimersWrapper: (cb) => cb(),
    eventWrapper: (cb) => cb(),
    // default value for the `hidden` option in `ByRole` queries
    defaultHidden: false,
    // default value for the `ignore` option in `ByText` queries
    defaultIgnore: "script, style",
    // showOriginalStackTrace flag to show the full error stack traces for async errors
    showOriginalStackTrace: false,
    // throw errors w/ suggestions for better queries. Opt in so off by default.
    throwSuggestions: false,
    // called when getBy* queries fail. (message, container) => Error
    getElementError(message, container) {
      const prettifiedDOM = prettyDOM(container);
      const error = new Error([message, "Ignored nodes: comments, " + config.defaultIgnore + "\n" + prettifiedDOM].filter(Boolean).join("\n\n"));
      error.name = "TestingLibraryElementError";
      return error;
    },
    _disableExpensiveErrorDiagnostics: false,
    computedStyleSupportsPseudoElements: false
  };
  function runWithExpensiveErrorDiagnosticsDisabled(callback) {
    try {
      config._disableExpensiveErrorDiagnostics = true;
      return callback();
    } finally {
      config._disableExpensiveErrorDiagnostics = false;
    }
  }
  function configure(newConfig) {
    if (typeof newConfig === "function") {
      newConfig = newConfig(config);
    }
    config = {
      ...config,
      ...newConfig
    };
  }
  function getConfig() {
    return config;
  }
  var labelledNodeNames = ["button", "meter", "output", "progress", "select", "textarea", "input"];
  function getTextContent(node) {
    if (labelledNodeNames.includes(node.nodeName.toLowerCase())) {
      return "";
    }
    if (node.nodeType === TEXT_NODE)
      return node.textContent;
    return Array.from(node.childNodes).map((childNode) => getTextContent(childNode)).join("");
  }
  function getLabelContent(element) {
    let textContent;
    if (element.tagName.toLowerCase() === "label") {
      textContent = getTextContent(element);
    } else {
      textContent = element.value || element.textContent;
    }
    return textContent;
  }
  function getRealLabels(element) {
    if (element.labels !== void 0) {
      var _labels;
      return (_labels = element.labels) != null ? _labels : [];
    }
    if (!isLabelable(element))
      return [];
    const labels = element.ownerDocument.querySelectorAll("label");
    return Array.from(labels).filter((label) => label.control === element);
  }
  function isLabelable(element) {
    return /BUTTON|METER|OUTPUT|PROGRESS|SELECT|TEXTAREA/.test(element.tagName) || element.tagName === "INPUT" && element.getAttribute("type") !== "hidden";
  }
  function getLabels2(container, element, _temp) {
    let {
      selector = "*"
    } = _temp === void 0 ? {} : _temp;
    const ariaLabelledBy = element.getAttribute("aria-labelledby");
    const labelsId = ariaLabelledBy ? ariaLabelledBy.split(" ") : [];
    return labelsId.length ? labelsId.map((labelId) => {
      const labellingElement = container.querySelector('[id="' + labelId + '"]');
      return labellingElement ? {
        content: getLabelContent(labellingElement),
        formControl: null
      } : {
        content: "",
        formControl: null
      };
    }) : Array.from(getRealLabels(element)).map((label) => {
      const textToMatch = getLabelContent(label);
      const formControlSelector = "button, input, meter, output, progress, select, textarea";
      const labelledFormControl = Array.from(label.querySelectorAll(formControlSelector)).filter((formControlElement) => formControlElement.matches(selector))[0];
      return {
        content: textToMatch,
        formControl: labelledFormControl
      };
    });
  }
  function assertNotNullOrUndefined(matcher) {
    if (matcher === null || matcher === void 0) {
      throw new Error(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- implicitly converting `T` to `string`
        "It looks like " + matcher + " was passed instead of a matcher. Did you do something like getByText(" + matcher + ")?"
      );
    }
  }
  function fuzzyMatches(textToMatch, node, matcher, normalizer) {
    if (typeof textToMatch !== "string") {
      return false;
    }
    assertNotNullOrUndefined(matcher);
    const normalizedText = normalizer(textToMatch);
    if (typeof matcher === "string" || typeof matcher === "number") {
      return normalizedText.toLowerCase().includes(matcher.toString().toLowerCase());
    } else if (typeof matcher === "function") {
      return matcher(normalizedText, node);
    } else {
      return matchRegExp(matcher, normalizedText);
    }
  }
  function matches(textToMatch, node, matcher, normalizer) {
    if (typeof textToMatch !== "string") {
      return false;
    }
    assertNotNullOrUndefined(matcher);
    const normalizedText = normalizer(textToMatch);
    if (matcher instanceof Function) {
      return matcher(normalizedText, node);
    } else if (matcher instanceof RegExp) {
      return matchRegExp(matcher, normalizedText);
    } else {
      return normalizedText === String(matcher);
    }
  }
  function getDefaultNormalizer(_temp) {
    let {
      trim = true,
      collapseWhitespace = true
    } = _temp === void 0 ? {} : _temp;
    return (text) => {
      let normalizedText = text;
      normalizedText = trim ? normalizedText.trim() : normalizedText;
      normalizedText = collapseWhitespace ? normalizedText.replace(/\s+/g, " ") : normalizedText;
      return normalizedText;
    };
  }
  function makeNormalizer(_ref) {
    let {
      trim,
      collapseWhitespace,
      normalizer
    } = _ref;
    if (!normalizer) {
      return getDefaultNormalizer({
        trim,
        collapseWhitespace
      });
    }
    if (typeof trim !== "undefined" || typeof collapseWhitespace !== "undefined") {
      throw new Error('trim and collapseWhitespace are not supported with a normalizer. If you want to use the default trim and collapseWhitespace logic in your normalizer, use "getDefaultNormalizer({trim, collapseWhitespace})" and compose that into your normalizer');
    }
    return normalizer;
  }
  function matchRegExp(matcher, text) {
    const match = matcher.test(text);
    if (matcher.global && matcher.lastIndex !== 0) {
      console.warn("To match all elements we had to reset the lastIndex of the RegExp because the global flag is enabled. We encourage to remove the global flag from the RegExp.");
      matcher.lastIndex = 0;
    }
    return match;
  }
  function getNodeText(node) {
    if (node.matches("input[type=submit], input[type=button], input[type=reset]")) {
      return node.value;
    }
    return Array.from(node.childNodes).filter((child) => child.nodeType === TEXT_NODE && Boolean(child.textContent)).map((c) => c.textContent).join("");
  }
  var elementRoleList = buildElementRoleList(import_aria_query.elementRoles);
  function isSubtreeInaccessible(element) {
    if (element.hidden === true) {
      return true;
    }
    if (element.getAttribute("aria-hidden") === "true") {
      return true;
    }
    const window2 = element.ownerDocument.defaultView;
    if (window2.getComputedStyle(element).display === "none") {
      return true;
    }
    return false;
  }
  function isInaccessible(element, options) {
    if (options === void 0) {
      options = {};
    }
    const {
      isSubtreeInaccessible: isSubtreeInaccessibleImpl = isSubtreeInaccessible
    } = options;
    const window2 = element.ownerDocument.defaultView;
    if (window2.getComputedStyle(element).visibility === "hidden") {
      return true;
    }
    let currentElement = element;
    while (currentElement) {
      if (isSubtreeInaccessibleImpl(currentElement)) {
        return true;
      }
      currentElement = currentElement.parentElement;
    }
    return false;
  }
  function getImplicitAriaRoles(currentNode) {
    for (const {
      match,
      roles: roles2
    } of elementRoleList) {
      if (match(currentNode)) {
        return [...roles2];
      }
    }
    return [];
  }
  function buildElementRoleList(elementRolesMap) {
    function makeElementSelector(_ref) {
      let {
        name,
        attributes
      } = _ref;
      return "" + name + attributes.map((_ref2) => {
        let {
          name: attributeName,
          value,
          constraints = []
        } = _ref2;
        const shouldNotExist = constraints.indexOf("undefined") !== -1;
        if (shouldNotExist) {
          return ":not([" + attributeName + "])";
        } else if (value) {
          return "[" + attributeName + '="' + value + '"]';
        } else {
          return "[" + attributeName + "]";
        }
      }).join("");
    }
    function getSelectorSpecificity(_ref3) {
      let {
        attributes = []
      } = _ref3;
      return attributes.length;
    }
    function bySelectorSpecificity(_ref4, _ref5) {
      let {
        specificity: leftSpecificity
      } = _ref4;
      let {
        specificity: rightSpecificity
      } = _ref5;
      return rightSpecificity - leftSpecificity;
    }
    function match(element) {
      let {
        attributes = []
      } = element;
      const typeTextIndex = attributes.findIndex((attribute) => attribute.value && attribute.name === "type" && attribute.value === "text");
      if (typeTextIndex >= 0) {
        attributes = [...attributes.slice(0, typeTextIndex), ...attributes.slice(typeTextIndex + 1)];
      }
      const selector = makeElementSelector({
        ...element,
        attributes
      });
      return (node) => {
        if (typeTextIndex >= 0 && node.type !== "text") {
          return false;
        }
        return node.matches(selector);
      };
    }
    let result = [];
    for (const [element, roles2] of elementRolesMap.entries()) {
      result = [...result, {
        match: match(element),
        roles: Array.from(roles2),
        specificity: getSelectorSpecificity(element)
      }];
    }
    return result.sort(bySelectorSpecificity);
  }
  function getRoles(container, _temp) {
    let {
      hidden = false
    } = _temp === void 0 ? {} : _temp;
    function flattenDOM(node) {
      return [node, ...Array.from(node.children).reduce((acc, child) => [...acc, ...flattenDOM(child)], [])];
    }
    return flattenDOM(container).filter((element) => {
      return hidden === false ? isInaccessible(element) === false : true;
    }).reduce((acc, node) => {
      let roles2 = [];
      if (node.hasAttribute("role")) {
        roles2 = node.getAttribute("role").split(" ").slice(0, 1);
      } else {
        roles2 = getImplicitAriaRoles(node);
      }
      return roles2.reduce((rolesAcc, role) => Array.isArray(rolesAcc[role]) ? {
        ...rolesAcc,
        [role]: [...rolesAcc[role], node]
      } : {
        ...rolesAcc,
        [role]: [node]
      }, acc);
    }, {});
  }
  function prettyRoles(dom, _ref6) {
    let {
      hidden,
      includeDescription
    } = _ref6;
    const roles2 = getRoles(dom, {
      hidden
    });
    return Object.entries(roles2).filter((_ref7) => {
      let [role] = _ref7;
      return role !== "generic";
    }).map((_ref8) => {
      let [role, elements] = _ref8;
      const delimiterBar = "-".repeat(50);
      const elementsString = elements.map((el) => {
        const nameString = 'Name "' + computeAccessibleName(el, {
          computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
        }) + '":\n';
        const domString = prettyDOM(el.cloneNode(false));
        if (includeDescription) {
          const descriptionString = 'Description "' + computeAccessibleDescription(el, {
            computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
          }) + '":\n';
          return "" + nameString + descriptionString + domString;
        }
        return "" + nameString + domString;
      }).join("\n\n");
      return role + ":\n\n" + elementsString + "\n\n" + delimiterBar;
    }).join("\n");
  }
  var logRoles = function(dom, _temp2) {
    let {
      hidden = false
    } = _temp2 === void 0 ? {} : _temp2;
    return console.log(prettyRoles(dom, {
      hidden
    }));
  };
  function computeAriaSelected(element) {
    if (element.tagName === "OPTION") {
      return element.selected;
    }
    return checkBooleanAttribute(element, "aria-selected");
  }
  function computeAriaBusy(element) {
    return element.getAttribute("aria-busy") === "true";
  }
  function computeAriaChecked(element) {
    if ("indeterminate" in element && element.indeterminate) {
      return void 0;
    }
    if ("checked" in element) {
      return element.checked;
    }
    return checkBooleanAttribute(element, "aria-checked");
  }
  function computeAriaPressed(element) {
    return checkBooleanAttribute(element, "aria-pressed");
  }
  function computeAriaCurrent(element) {
    var _ref9, _checkBooleanAttribut;
    return (_ref9 = (_checkBooleanAttribut = checkBooleanAttribute(element, "aria-current")) != null ? _checkBooleanAttribut : element.getAttribute("aria-current")) != null ? _ref9 : false;
  }
  function computeAriaExpanded(element) {
    return checkBooleanAttribute(element, "aria-expanded");
  }
  function checkBooleanAttribute(element, attribute) {
    const attributeValue = element.getAttribute(attribute);
    if (attributeValue === "true") {
      return true;
    }
    if (attributeValue === "false") {
      return false;
    }
    return void 0;
  }
  function computeHeadingLevel(element) {
    const implicitHeadingLevels = {
      H1: 1,
      H2: 2,
      H3: 3,
      H4: 4,
      H5: 5,
      H6: 6
    };
    const ariaLevelAttribute = element.getAttribute("aria-level") && Number(element.getAttribute("aria-level"));
    return ariaLevelAttribute || implicitHeadingLevels[element.tagName];
  }
  function computeAriaValueNow(element) {
    const valueNow = element.getAttribute("aria-valuenow");
    return valueNow === null ? void 0 : +valueNow;
  }
  function computeAriaValueMax(element) {
    const valueMax = element.getAttribute("aria-valuemax");
    return valueMax === null ? void 0 : +valueMax;
  }
  function computeAriaValueMin(element) {
    const valueMin = element.getAttribute("aria-valuemin");
    return valueMin === null ? void 0 : +valueMin;
  }
  function computeAriaValueText(element) {
    const valueText = element.getAttribute("aria-valuetext");
    return valueText === null ? void 0 : valueText;
  }
  var normalize = getDefaultNormalizer();
  function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
  }
  function getRegExpMatcher(string) {
    return new RegExp(escapeRegExp(string.toLowerCase()), "i");
  }
  function makeSuggestion(queryName, element, content, _ref) {
    let {
      variant,
      name
    } = _ref;
    let warning = "";
    const queryOptions = {};
    const queryArgs = [["Role", "TestId"].includes(queryName) ? content : getRegExpMatcher(content)];
    if (name) {
      queryOptions.name = getRegExpMatcher(name);
    }
    if (queryName === "Role" && isInaccessible(element)) {
      queryOptions.hidden = true;
      warning = "Element is inaccessible. This means that the element and all its children are invisible to screen readers.\n    If you are using the aria-hidden prop, make sure this is the right choice for your case.\n    ";
    }
    if (Object.keys(queryOptions).length > 0) {
      queryArgs.push(queryOptions);
    }
    const queryMethod = variant + "By" + queryName;
    return {
      queryName,
      queryMethod,
      queryArgs,
      variant,
      warning,
      toString() {
        if (warning) {
          console.warn(warning);
        }
        let [text, options] = queryArgs;
        text = typeof text === "string" ? "'" + text + "'" : text;
        options = options ? ", { " + Object.entries(options).map((_ref2) => {
          let [k, v] = _ref2;
          return k + ": " + v;
        }).join(", ") + " }" : "";
        return queryMethod + "(" + text + options + ")";
      }
    };
  }
  function canSuggest(currentMethod, requestedMethod, data) {
    return data && (!requestedMethod || requestedMethod.toLowerCase() === currentMethod.toLowerCase());
  }
  function getSuggestedQuery(element, variant, method) {
    var _element$getAttribute, _getImplicitAriaRoles;
    if (variant === void 0) {
      variant = "get";
    }
    if (element.matches(getConfig().defaultIgnore)) {
      return void 0;
    }
    const role = (_element$getAttribute = element.getAttribute("role")) != null ? _element$getAttribute : (_getImplicitAriaRoles = getImplicitAriaRoles(element)) == null ? void 0 : _getImplicitAriaRoles[0];
    if (role !== "generic" && canSuggest("Role", method, role)) {
      return makeSuggestion("Role", element, role, {
        variant,
        name: computeAccessibleName(element, {
          computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
        })
      });
    }
    const labelText = getLabels2(document, element).map((label) => label.content).join(" ");
    if (canSuggest("LabelText", method, labelText)) {
      return makeSuggestion("LabelText", element, labelText, {
        variant
      });
    }
    const placeholderText = element.getAttribute("placeholder");
    if (canSuggest("PlaceholderText", method, placeholderText)) {
      return makeSuggestion("PlaceholderText", element, placeholderText, {
        variant
      });
    }
    const textContent = normalize(getNodeText(element));
    if (canSuggest("Text", method, textContent)) {
      return makeSuggestion("Text", element, textContent, {
        variant
      });
    }
    if (canSuggest("DisplayValue", method, element.value)) {
      return makeSuggestion("DisplayValue", element, normalize(element.value), {
        variant
      });
    }
    const alt = element.getAttribute("alt");
    if (canSuggest("AltText", method, alt)) {
      return makeSuggestion("AltText", element, alt, {
        variant
      });
    }
    const title = element.getAttribute("title");
    if (canSuggest("Title", method, title)) {
      return makeSuggestion("Title", element, title, {
        variant
      });
    }
    const testId = element.getAttribute(getConfig().testIdAttribute);
    if (canSuggest("TestId", method, testId)) {
      return makeSuggestion("TestId", element, testId, {
        variant
      });
    }
    return void 0;
  }
  function copyStackTrace(target, source) {
    target.stack = source.stack.replace(source.message, target.message);
  }
  function waitFor(callback, _ref) {
    let {
      container = getDocument(),
      timeout = getConfig().asyncUtilTimeout,
      showOriginalStackTrace = getConfig().showOriginalStackTrace,
      stackTraceError,
      interval = 50,
      onTimeout = (error) => {
        Object.defineProperty(error, "message", {
          value: getConfig().getElementError(error.message, container).message
        });
        return error;
      },
      mutationObserverOptions = {
        subtree: true,
        childList: true,
        attributes: true,
        characterData: true
      }
    } = _ref;
    if (typeof callback !== "function") {
      throw new TypeError("Received `callback` arg must be a function");
    }
    return new Promise(async (resolve, reject) => {
      let lastError, intervalId, observer;
      let finished = false;
      let promiseStatus = "idle";
      const overallTimeoutTimer = setTimeout(handleTimeout, timeout);
      const usingJestFakeTimers = jestFakeTimersAreEnabled();
      if (usingJestFakeTimers) {
        const {
          unstable_advanceTimersWrapper: advanceTimersWrapper
        } = getConfig();
        checkCallback();
        while (!finished) {
          if (!jestFakeTimersAreEnabled()) {
            const error = new Error("Changed from using fake timers to real timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to real timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830");
            if (!showOriginalStackTrace)
              copyStackTrace(error, stackTraceError);
            reject(error);
            return;
          }
          await advanceTimersWrapper(async () => {
            jest.advanceTimersByTime(interval);
          });
          checkCallback();
          if (finished) {
            break;
          }
        }
      } else {
        try {
          checkContainerType(container);
        } catch (e) {
          reject(e);
          return;
        }
        intervalId = setInterval(checkRealTimersCallback, interval);
        const {
          MutationObserver
        } = getWindowFromNode(container);
        observer = new MutationObserver(checkRealTimersCallback);
        observer.observe(container, mutationObserverOptions);
        checkCallback();
      }
      function onDone(error, result) {
        finished = true;
        clearTimeout(overallTimeoutTimer);
        if (!usingJestFakeTimers) {
          clearInterval(intervalId);
          observer.disconnect();
        }
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
      function checkRealTimersCallback() {
        if (jestFakeTimersAreEnabled()) {
          const error = new Error("Changed from using real timers to fake timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to fake timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830");
          if (!showOriginalStackTrace)
            copyStackTrace(error, stackTraceError);
          return reject(error);
        } else {
          return checkCallback();
        }
      }
      function checkCallback() {
        if (promiseStatus === "pending")
          return;
        try {
          const result = runWithExpensiveErrorDiagnosticsDisabled(callback);
          if (typeof (result == null ? void 0 : result.then) === "function") {
            promiseStatus = "pending";
            result.then((resolvedValue) => {
              promiseStatus = "resolved";
              onDone(null, resolvedValue);
            }, (rejectedValue) => {
              promiseStatus = "rejected";
              lastError = rejectedValue;
            });
          } else {
            onDone(null, result);
          }
        } catch (error) {
          lastError = error;
        }
      }
      function handleTimeout() {
        let error;
        if (lastError) {
          error = lastError;
          if (!showOriginalStackTrace && error.name === "TestingLibraryElementError") {
            copyStackTrace(error, stackTraceError);
          }
        } else {
          error = new Error("Timed out in waitFor.");
          if (!showOriginalStackTrace) {
            copyStackTrace(error, stackTraceError);
          }
        }
        onDone(onTimeout(error), null);
      }
    });
  }
  function waitForWrapper(callback, options) {
    const stackTraceError = new Error("STACK_TRACE_MESSAGE");
    return getConfig().asyncWrapper(() => waitFor(callback, {
      stackTraceError,
      ...options
    }));
  }
  function getElementError(message, container) {
    return getConfig().getElementError(message, container);
  }
  function getMultipleElementsFoundError(message, container) {
    return getElementError(message + "\n\n(If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).", container);
  }
  function queryAllByAttribute(attribute, container, text, _temp) {
    let {
      exact = true,
      collapseWhitespace,
      trim,
      normalizer
    } = _temp === void 0 ? {} : _temp;
    const matcher = exact ? matches : fuzzyMatches;
    const matchNormalizer = makeNormalizer({
      collapseWhitespace,
      trim,
      normalizer
    });
    return Array.from(container.querySelectorAll("[" + attribute + "]")).filter((node) => matcher(node.getAttribute(attribute), node, text, matchNormalizer));
  }
  function queryByAttribute(attribute, container, text, options) {
    const els = queryAllByAttribute(attribute, container, text, options);
    if (els.length > 1) {
      throw getMultipleElementsFoundError("Found multiple elements by [" + attribute + "=" + text + "]", container);
    }
    return els[0] || null;
  }
  function makeSingleQuery(allQuery, getMultipleError2) {
    return function(container) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      const els = allQuery(container, ...args);
      if (els.length > 1) {
        const elementStrings = els.map((element) => getElementError(null, element).message).join("\n\n");
        throw getMultipleElementsFoundError(getMultipleError2(container, ...args) + "\n\nHere are the matching elements:\n\n" + elementStrings, container);
      }
      return els[0] || null;
    };
  }
  function getSuggestionError(suggestion, container) {
    return getConfig().getElementError("A better query is available, try this:\n" + suggestion.toString() + "\n", container);
  }
  function makeGetAllQuery(allQuery, getMissingError2) {
    return function(container) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      const els = allQuery(container, ...args);
      if (!els.length) {
        throw getConfig().getElementError(getMissingError2(container, ...args), container);
      }
      return els;
    };
  }
  function makeFindQuery(getter) {
    return (container, text, options, waitForOptions) => {
      return waitForWrapper(() => {
        return getter(container, text, options);
      }, {
        container,
        ...waitForOptions
      });
    };
  }
  var wrapSingleQueryWithSuggestion = (query, queryAllByName, variant) => function(container) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    const element = query(container, ...args);
    const [{
      suggest = getConfig().throwSuggestions
    } = {}] = args.slice(-1);
    if (element && suggest) {
      const suggestion = getSuggestedQuery(element, variant);
      if (suggestion && !queryAllByName.endsWith(suggestion.queryName)) {
        throw getSuggestionError(suggestion.toString(), container);
      }
    }
    return element;
  };
  var wrapAllByQueryWithSuggestion = (query, queryAllByName, variant) => function(container) {
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }
    const els = query(container, ...args);
    const [{
      suggest = getConfig().throwSuggestions
    } = {}] = args.slice(-1);
    if (els.length && suggest) {
      const uniqueSuggestionMessages = [...new Set(els.map((element) => {
        var _getSuggestedQuery;
        return (_getSuggestedQuery = getSuggestedQuery(element, variant)) == null ? void 0 : _getSuggestedQuery.toString();
      }))];
      if (
        // only want to suggest if all the els have the same suggestion.
        uniqueSuggestionMessages.length === 1 && !queryAllByName.endsWith(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- TODO: Can this be null at runtime?
          getSuggestedQuery(els[0], variant).queryName
        )
      ) {
        throw getSuggestionError(uniqueSuggestionMessages[0], container);
      }
    }
    return els;
  };
  function buildQueries(queryAllBy, getMultipleError2, getMissingError2) {
    const queryBy = wrapSingleQueryWithSuggestion(makeSingleQuery(queryAllBy, getMultipleError2), queryAllBy.name, "query");
    const getAllBy = makeGetAllQuery(queryAllBy, getMissingError2);
    const getBy = makeSingleQuery(getAllBy, getMultipleError2);
    const getByWithSuggestions = wrapSingleQueryWithSuggestion(getBy, queryAllBy.name, "get");
    const getAllWithSuggestions = wrapAllByQueryWithSuggestion(getAllBy, queryAllBy.name.replace("query", "get"), "getAll");
    const findAllBy = makeFindQuery(wrapAllByQueryWithSuggestion(getAllBy, queryAllBy.name, "findAll"));
    const findBy = makeFindQuery(wrapSingleQueryWithSuggestion(getBy, queryAllBy.name, "find"));
    return [queryBy, getAllWithSuggestions, getByWithSuggestions, findAllBy, findBy];
  }
  var queryHelpers = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    getElementError,
    wrapAllByQueryWithSuggestion,
    wrapSingleQueryWithSuggestion,
    getMultipleElementsFoundError,
    queryAllByAttribute,
    queryByAttribute,
    makeSingleQuery,
    makeGetAllQuery,
    makeFindQuery,
    buildQueries
  });
  function queryAllLabels(container) {
    return Array.from(container.querySelectorAll("label,input")).map((node) => {
      return {
        node,
        textToMatch: getLabelContent(node)
      };
    }).filter((_ref) => {
      let {
        textToMatch
      } = _ref;
      return textToMatch !== null;
    });
  }
  var queryAllLabelsByText = function(container, text, _temp) {
    let {
      exact = true,
      trim,
      collapseWhitespace,
      normalizer
    } = _temp === void 0 ? {} : _temp;
    const matcher = exact ? matches : fuzzyMatches;
    const matchNormalizer = makeNormalizer({
      collapseWhitespace,
      trim,
      normalizer
    });
    const textToMatchByLabels = queryAllLabels(container);
    return textToMatchByLabels.filter((_ref2) => {
      let {
        node,
        textToMatch
      } = _ref2;
      return matcher(textToMatch, node, text, matchNormalizer);
    }).map((_ref3) => {
      let {
        node
      } = _ref3;
      return node;
    });
  };
  var queryAllByLabelText = function(container, text, _temp2) {
    let {
      selector = "*",
      exact = true,
      collapseWhitespace,
      trim,
      normalizer
    } = _temp2 === void 0 ? {} : _temp2;
    checkContainerType(container);
    const matcher = exact ? matches : fuzzyMatches;
    const matchNormalizer = makeNormalizer({
      collapseWhitespace,
      trim,
      normalizer
    });
    const matchingLabelledElements = Array.from(container.querySelectorAll("*")).filter((element) => {
      return getRealLabels(element).length || element.hasAttribute("aria-labelledby");
    }).reduce((labelledElements, labelledElement) => {
      const labelList = getLabels2(container, labelledElement, {
        selector
      });
      labelList.filter((label) => Boolean(label.formControl)).forEach((label) => {
        if (matcher(label.content, label.formControl, text, matchNormalizer) && label.formControl) {
          labelledElements.push(label.formControl);
        }
      });
      const labelsValue = labelList.filter((label) => Boolean(label.content)).map((label) => label.content);
      if (matcher(labelsValue.join(" "), labelledElement, text, matchNormalizer)) {
        labelledElements.push(labelledElement);
      }
      if (labelsValue.length > 1) {
        labelsValue.forEach((labelValue, index) => {
          if (matcher(labelValue, labelledElement, text, matchNormalizer)) {
            labelledElements.push(labelledElement);
          }
          const labelsFiltered = [...labelsValue];
          labelsFiltered.splice(index, 1);
          if (labelsFiltered.length > 1) {
            if (matcher(labelsFiltered.join(" "), labelledElement, text, matchNormalizer)) {
              labelledElements.push(labelledElement);
            }
          }
        });
      }
      return labelledElements;
    }, []).concat(queryAllByAttribute("aria-label", container, text, {
      exact,
      normalizer: matchNormalizer
    }));
    return Array.from(new Set(matchingLabelledElements)).filter((element) => element.matches(selector));
  };
  var getAllByLabelText = function(container, text) {
    for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      rest[_key - 2] = arguments[_key];
    }
    const els = queryAllByLabelText(container, text, ...rest);
    if (!els.length) {
      const labels = queryAllLabelsByText(container, text, ...rest);
      if (labels.length) {
        const tagNames = labels.map((label) => getTagNameOfElementAssociatedWithLabelViaFor(container, label)).filter((tagName) => !!tagName);
        if (tagNames.length) {
          throw getConfig().getElementError(tagNames.map((tagName) => "Found a label with the text of: " + text + ", however the element associated with this label (<" + tagName + " />) is non-labellable [https://html.spec.whatwg.org/multipage/forms.html#category-label]. If you really need to label a <" + tagName + " />, you can use aria-label or aria-labelledby instead.").join("\n\n"), container);
        } else {
          throw getConfig().getElementError("Found a label with the text of: " + text + `, however no form control was found associated to that label. Make sure you're using the "for" attribute or "aria-labelledby" attribute correctly.`, container);
        }
      } else {
        throw getConfig().getElementError("Unable to find a label with the text of: " + text, container);
      }
    }
    return els;
  };
  function getTagNameOfElementAssociatedWithLabelViaFor(container, label) {
    const htmlFor = label.getAttribute("for");
    if (!htmlFor) {
      return null;
    }
    const element = container.querySelector('[id="' + htmlFor + '"]');
    return element ? element.tagName.toLowerCase() : null;
  }
  var getMultipleError$7 = (c, text) => "Found multiple elements with the text of: " + text;
  var queryByLabelText = wrapSingleQueryWithSuggestion(makeSingleQuery(queryAllByLabelText, getMultipleError$7), queryAllByLabelText.name, "query");
  var getByLabelText = makeSingleQuery(getAllByLabelText, getMultipleError$7);
  var findAllByLabelText = makeFindQuery(wrapAllByQueryWithSuggestion(getAllByLabelText, getAllByLabelText.name, "findAll"));
  var findByLabelText = makeFindQuery(wrapSingleQueryWithSuggestion(getByLabelText, getAllByLabelText.name, "find"));
  var getAllByLabelTextWithSuggestions = wrapAllByQueryWithSuggestion(getAllByLabelText, getAllByLabelText.name, "getAll");
  var getByLabelTextWithSuggestions = wrapSingleQueryWithSuggestion(getByLabelText, getAllByLabelText.name, "get");
  var queryAllByLabelTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByLabelText, queryAllByLabelText.name, "queryAll");
  var queryAllByPlaceholderText = function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    checkContainerType(args[0]);
    return queryAllByAttribute("placeholder", ...args);
  };
  var getMultipleError$6 = (c, text) => "Found multiple elements with the placeholder text of: " + text;
  var getMissingError$6 = (c, text) => "Unable to find an element with the placeholder text of: " + text;
  var queryAllByPlaceholderTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByPlaceholderText, queryAllByPlaceholderText.name, "queryAll");
  var [queryByPlaceholderText, getAllByPlaceholderText, getByPlaceholderText, findAllByPlaceholderText, findByPlaceholderText] = buildQueries(queryAllByPlaceholderText, getMultipleError$6, getMissingError$6);
  var queryAllByText = function(container, text, _temp) {
    let {
      selector = "*",
      exact = true,
      collapseWhitespace,
      trim,
      ignore = getConfig().defaultIgnore,
      normalizer
    } = _temp === void 0 ? {} : _temp;
    checkContainerType(container);
    const matcher = exact ? matches : fuzzyMatches;
    const matchNormalizer = makeNormalizer({
      collapseWhitespace,
      trim,
      normalizer
    });
    let baseArray = [];
    if (typeof container.matches === "function" && container.matches(selector)) {
      baseArray = [container];
    }
    return [...baseArray, ...Array.from(container.querySelectorAll(selector))].filter((node) => !ignore || !node.matches(ignore)).filter((node) => matcher(getNodeText(node), node, text, matchNormalizer));
  };
  var getMultipleError$5 = (c, text) => "Found multiple elements with the text: " + text;
  var getMissingError$5 = function(c, text, options) {
    if (options === void 0) {
      options = {};
    }
    const {
      collapseWhitespace,
      trim,
      normalizer,
      selector
    } = options;
    const matchNormalizer = makeNormalizer({
      collapseWhitespace,
      trim,
      normalizer
    });
    const normalizedText = matchNormalizer(text.toString());
    const isNormalizedDifferent = normalizedText !== text.toString();
    const isCustomSelector = (selector != null ? selector : "*") !== "*";
    return "Unable to find an element with the text: " + (isNormalizedDifferent ? normalizedText + " (normalized from '" + text + "')" : text) + (isCustomSelector ? ", which matches selector '" + selector + "'" : "") + ". This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.";
  };
  var queryAllByTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByText, queryAllByText.name, "queryAll");
  var [queryByText, getAllByText, getByText, findAllByText, findByText] = buildQueries(queryAllByText, getMultipleError$5, getMissingError$5);
  var queryAllByDisplayValue = function(container, value, _temp) {
    let {
      exact = true,
      collapseWhitespace,
      trim,
      normalizer
    } = _temp === void 0 ? {} : _temp;
    checkContainerType(container);
    const matcher = exact ? matches : fuzzyMatches;
    const matchNormalizer = makeNormalizer({
      collapseWhitespace,
      trim,
      normalizer
    });
    return Array.from(container.querySelectorAll("input,textarea,select")).filter((node) => {
      if (node.tagName === "SELECT") {
        const selectedOptions = Array.from(node.options).filter((option) => option.selected);
        return selectedOptions.some((optionNode) => matcher(getNodeText(optionNode), optionNode, value, matchNormalizer));
      } else {
        return matcher(node.value, node, value, matchNormalizer);
      }
    });
  };
  var getMultipleError$4 = (c, value) => "Found multiple elements with the display value: " + value + ".";
  var getMissingError$4 = (c, value) => "Unable to find an element with the display value: " + value + ".";
  var queryAllByDisplayValueWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByDisplayValue, queryAllByDisplayValue.name, "queryAll");
  var [queryByDisplayValue, getAllByDisplayValue, getByDisplayValue, findAllByDisplayValue, findByDisplayValue] = buildQueries(queryAllByDisplayValue, getMultipleError$4, getMissingError$4);
  var VALID_TAG_REGEXP = /^(img|input|area|.+-.+)$/i;
  var queryAllByAltText = function(container, alt, options) {
    if (options === void 0) {
      options = {};
    }
    checkContainerType(container);
    return queryAllByAttribute("alt", container, alt, options).filter((node) => VALID_TAG_REGEXP.test(node.tagName));
  };
  var getMultipleError$3 = (c, alt) => "Found multiple elements with the alt text: " + alt;
  var getMissingError$3 = (c, alt) => "Unable to find an element with the alt text: " + alt;
  var queryAllByAltTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByAltText, queryAllByAltText.name, "queryAll");
  var [queryByAltText, getAllByAltText, getByAltText, findAllByAltText, findByAltText] = buildQueries(queryAllByAltText, getMultipleError$3, getMissingError$3);
  var isSvgTitle = (node) => {
    var _node$parentElement;
    return node.tagName.toLowerCase() === "title" && ((_node$parentElement = node.parentElement) == null ? void 0 : _node$parentElement.tagName.toLowerCase()) === "svg";
  };
  var queryAllByTitle = function(container, text, _temp) {
    let {
      exact = true,
      collapseWhitespace,
      trim,
      normalizer
    } = _temp === void 0 ? {} : _temp;
    checkContainerType(container);
    const matcher = exact ? matches : fuzzyMatches;
    const matchNormalizer = makeNormalizer({
      collapseWhitespace,
      trim,
      normalizer
    });
    return Array.from(container.querySelectorAll("[title], svg > title")).filter((node) => matcher(node.getAttribute("title"), node, text, matchNormalizer) || isSvgTitle(node) && matcher(getNodeText(node), node, text, matchNormalizer));
  };
  var getMultipleError$2 = (c, title) => "Found multiple elements with the title: " + title + ".";
  var getMissingError$2 = (c, title) => "Unable to find an element with the title: " + title + ".";
  var queryAllByTitleWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByTitle, queryAllByTitle.name, "queryAll");
  var [queryByTitle, getAllByTitle, getByTitle, findAllByTitle, findByTitle] = buildQueries(queryAllByTitle, getMultipleError$2, getMissingError$2);
  var queryAllByRole = function(container, role, _temp) {
    let {
      hidden = getConfig().defaultHidden,
      name,
      description,
      queryFallbacks = false,
      selected,
      busy,
      checked,
      pressed,
      current,
      level,
      expanded,
      value: {
        now: valueNow,
        min: valueMin,
        max: valueMax,
        text: valueText
      } = {}
    } = _temp === void 0 ? {} : _temp;
    checkContainerType(container);
    if (selected !== void 0) {
      var _allRoles$get;
      if (((_allRoles$get = import_aria_query.roles.get(role)) == null ? void 0 : _allRoles$get.props["aria-selected"]) === void 0) {
        throw new Error('"aria-selected" is not supported on role "' + role + '".');
      }
    }
    if (busy !== void 0) {
      var _allRoles$get2;
      if (((_allRoles$get2 = import_aria_query.roles.get(role)) == null ? void 0 : _allRoles$get2.props["aria-busy"]) === void 0) {
        throw new Error('"aria-busy" is not supported on role "' + role + '".');
      }
    }
    if (checked !== void 0) {
      var _allRoles$get3;
      if (((_allRoles$get3 = import_aria_query.roles.get(role)) == null ? void 0 : _allRoles$get3.props["aria-checked"]) === void 0) {
        throw new Error('"aria-checked" is not supported on role "' + role + '".');
      }
    }
    if (pressed !== void 0) {
      var _allRoles$get4;
      if (((_allRoles$get4 = import_aria_query.roles.get(role)) == null ? void 0 : _allRoles$get4.props["aria-pressed"]) === void 0) {
        throw new Error('"aria-pressed" is not supported on role "' + role + '".');
      }
    }
    if (current !== void 0) {
      var _allRoles$get5;
      if (((_allRoles$get5 = import_aria_query.roles.get(role)) == null ? void 0 : _allRoles$get5.props["aria-current"]) === void 0) {
        throw new Error('"aria-current" is not supported on role "' + role + '".');
      }
    }
    if (level !== void 0) {
      if (role !== "heading") {
        throw new Error('Role "' + role + '" cannot have "level" property.');
      }
    }
    if (valueNow !== void 0) {
      var _allRoles$get6;
      if (((_allRoles$get6 = import_aria_query.roles.get(role)) == null ? void 0 : _allRoles$get6.props["aria-valuenow"]) === void 0) {
        throw new Error('"aria-valuenow" is not supported on role "' + role + '".');
      }
    }
    if (valueMax !== void 0) {
      var _allRoles$get7;
      if (((_allRoles$get7 = import_aria_query.roles.get(role)) == null ? void 0 : _allRoles$get7.props["aria-valuemax"]) === void 0) {
        throw new Error('"aria-valuemax" is not supported on role "' + role + '".');
      }
    }
    if (valueMin !== void 0) {
      var _allRoles$get8;
      if (((_allRoles$get8 = import_aria_query.roles.get(role)) == null ? void 0 : _allRoles$get8.props["aria-valuemin"]) === void 0) {
        throw new Error('"aria-valuemin" is not supported on role "' + role + '".');
      }
    }
    if (valueText !== void 0) {
      var _allRoles$get9;
      if (((_allRoles$get9 = import_aria_query.roles.get(role)) == null ? void 0 : _allRoles$get9.props["aria-valuetext"]) === void 0) {
        throw new Error('"aria-valuetext" is not supported on role "' + role + '".');
      }
    }
    if (expanded !== void 0) {
      var _allRoles$get10;
      if (((_allRoles$get10 = import_aria_query.roles.get(role)) == null ? void 0 : _allRoles$get10.props["aria-expanded"]) === void 0) {
        throw new Error('"aria-expanded" is not supported on role "' + role + '".');
      }
    }
    const subtreeIsInaccessibleCache = /* @__PURE__ */ new WeakMap();
    function cachedIsSubtreeInaccessible(element) {
      if (!subtreeIsInaccessibleCache.has(element)) {
        subtreeIsInaccessibleCache.set(element, isSubtreeInaccessible(element));
      }
      return subtreeIsInaccessibleCache.get(element);
    }
    return Array.from(container.querySelectorAll(
      // Only query elements that can be matched by the following filters
      makeRoleSelector(role)
    )).filter((node) => {
      const isRoleSpecifiedExplicitly = node.hasAttribute("role");
      if (isRoleSpecifiedExplicitly) {
        const roleValue = node.getAttribute("role");
        if (queryFallbacks) {
          return roleValue.split(" ").filter(Boolean).some((roleAttributeToken) => roleAttributeToken === role);
        }
        const [firstRoleAttributeToken] = roleValue.split(" ");
        return firstRoleAttributeToken === role;
      }
      const implicitRoles = getImplicitAriaRoles(node);
      return implicitRoles.some((implicitRole) => {
        return implicitRole === role;
      });
    }).filter((element) => {
      if (selected !== void 0) {
        return selected === computeAriaSelected(element);
      }
      if (busy !== void 0) {
        return busy === computeAriaBusy(element);
      }
      if (checked !== void 0) {
        return checked === computeAriaChecked(element);
      }
      if (pressed !== void 0) {
        return pressed === computeAriaPressed(element);
      }
      if (current !== void 0) {
        return current === computeAriaCurrent(element);
      }
      if (expanded !== void 0) {
        return expanded === computeAriaExpanded(element);
      }
      if (level !== void 0) {
        return level === computeHeadingLevel(element);
      }
      if (valueNow !== void 0 || valueMax !== void 0 || valueMin !== void 0 || valueText !== void 0) {
        let valueMatches = true;
        if (valueNow !== void 0) {
          valueMatches && (valueMatches = valueNow === computeAriaValueNow(element));
        }
        if (valueMax !== void 0) {
          valueMatches && (valueMatches = valueMax === computeAriaValueMax(element));
        }
        if (valueMin !== void 0) {
          valueMatches && (valueMatches = valueMin === computeAriaValueMin(element));
        }
        if (valueText !== void 0) {
          var _computeAriaValueText;
          valueMatches && (valueMatches = matches((_computeAriaValueText = computeAriaValueText(element)) != null ? _computeAriaValueText : null, element, valueText, (text) => text));
        }
        return valueMatches;
      }
      return true;
    }).filter((element) => {
      if (name === void 0) {
        return true;
      }
      return matches(computeAccessibleName(element, {
        computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
      }), element, name, (text) => text);
    }).filter((element) => {
      if (description === void 0) {
        return true;
      }
      return matches(computeAccessibleDescription(element, {
        computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
      }), element, description, (text) => text);
    }).filter((element) => {
      return hidden === false ? isInaccessible(element, {
        isSubtreeInaccessible: cachedIsSubtreeInaccessible
      }) === false : true;
    });
  };
  function makeRoleSelector(role) {
    var _roleElements$get;
    const explicitRoleSelector = '*[role~="' + role + '"]';
    const roleRelations = (_roleElements$get = import_aria_query.roleElements.get(role)) != null ? _roleElements$get : /* @__PURE__ */ new Set();
    const implicitRoleSelectors = new Set(Array.from(roleRelations).map((_ref) => {
      let {
        name
      } = _ref;
      return name;
    }));
    return [explicitRoleSelector].concat(Array.from(implicitRoleSelectors)).join(",");
  }
  var getNameHint = (name) => {
    let nameHint = "";
    if (name === void 0) {
      nameHint = "";
    } else if (typeof name === "string") {
      nameHint = ' and name "' + name + '"';
    } else {
      nameHint = " and name `" + name + "`";
    }
    return nameHint;
  };
  var getMultipleError$1 = function(c, role, _temp2) {
    let {
      name
    } = _temp2 === void 0 ? {} : _temp2;
    return 'Found multiple elements with the role "' + role + '"' + getNameHint(name);
  };
  var getMissingError$1 = function(container, role, _temp3) {
    let {
      hidden = getConfig().defaultHidden,
      name,
      description
    } = _temp3 === void 0 ? {} : _temp3;
    if (getConfig()._disableExpensiveErrorDiagnostics) {
      return 'Unable to find role="' + role + '"' + getNameHint(name);
    }
    let roles2 = "";
    Array.from(container.children).forEach((childElement) => {
      roles2 += prettyRoles(childElement, {
        hidden,
        includeDescription: description !== void 0
      });
    });
    let roleMessage;
    if (roles2.length === 0) {
      if (hidden === false) {
        roleMessage = "There are no accessible roles. But there might be some inaccessible roles. If you wish to access them, then set the `hidden` option to `true`. Learn more about this here: https://testing-library.com/docs/dom-testing-library/api-queries#byrole";
      } else {
        roleMessage = "There are no available roles.";
      }
    } else {
      roleMessage = ("\nHere are the " + (hidden === false ? "accessible" : "available") + " roles:\n\n  " + roles2.replace(/\n/g, "\n  ").replace(/\n\s\s\n/g, "\n\n") + "\n").trim();
    }
    let nameHint = "";
    if (name === void 0) {
      nameHint = "";
    } else if (typeof name === "string") {
      nameHint = ' and name "' + name + '"';
    } else {
      nameHint = " and name `" + name + "`";
    }
    let descriptionHint = "";
    if (description === void 0) {
      descriptionHint = "";
    } else if (typeof description === "string") {
      descriptionHint = ' and description "' + description + '"';
    } else {
      descriptionHint = " and description `" + description + "`";
    }
    return ("\nUnable to find an " + (hidden === false ? "accessible " : "") + 'element with the role "' + role + '"' + nameHint + descriptionHint + "\n\n" + roleMessage).trim();
  };
  var queryAllByRoleWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByRole, queryAllByRole.name, "queryAll");
  var [queryByRole, getAllByRole, getByRole, findAllByRole, findByRole] = buildQueries(queryAllByRole, getMultipleError$1, getMissingError$1);
  var getTestIdAttribute = () => getConfig().testIdAttribute;
  var queryAllByTestId = function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    checkContainerType(args[0]);
    return queryAllByAttribute(getTestIdAttribute(), ...args);
  };
  var getMultipleError = (c, id) => "Found multiple elements by: [" + getTestIdAttribute() + '="' + id + '"]';
  var getMissingError = (c, id) => "Unable to find an element by: [" + getTestIdAttribute() + '="' + id + '"]';
  var queryAllByTestIdWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByTestId, queryAllByTestId.name, "queryAll");
  var [queryByTestId, getAllByTestId, getByTestId, findAllByTestId, findByTestId] = buildQueries(queryAllByTestId, getMultipleError, getMissingError);
  var queries = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    queryAllByLabelText: queryAllByLabelTextWithSuggestions,
    queryByLabelText,
    getAllByLabelText: getAllByLabelTextWithSuggestions,
    getByLabelText: getByLabelTextWithSuggestions,
    findAllByLabelText,
    findByLabelText,
    queryByPlaceholderText,
    queryAllByPlaceholderText: queryAllByPlaceholderTextWithSuggestions,
    getByPlaceholderText,
    getAllByPlaceholderText,
    findAllByPlaceholderText,
    findByPlaceholderText,
    queryByText,
    queryAllByText: queryAllByTextWithSuggestions,
    getByText,
    getAllByText,
    findAllByText,
    findByText,
    queryByDisplayValue,
    queryAllByDisplayValue: queryAllByDisplayValueWithSuggestions,
    getByDisplayValue,
    getAllByDisplayValue,
    findAllByDisplayValue,
    findByDisplayValue,
    queryByAltText,
    queryAllByAltText: queryAllByAltTextWithSuggestions,
    getByAltText,
    getAllByAltText,
    findAllByAltText,
    findByAltText,
    queryByTitle,
    queryAllByTitle: queryAllByTitleWithSuggestions,
    getByTitle,
    getAllByTitle,
    findAllByTitle,
    findByTitle,
    queryByRole,
    queryAllByRole: queryAllByRoleWithSuggestions,
    getAllByRole,
    getByRole,
    findAllByRole,
    findByRole,
    queryByTestId,
    queryAllByTestId: queryAllByTestIdWithSuggestions,
    getByTestId,
    getAllByTestId,
    findAllByTestId,
    findByTestId
  });
  function getQueriesForElement(element, queries$1, initialValue2) {
    if (queries$1 === void 0) {
      queries$1 = queries;
    }
    if (initialValue2 === void 0) {
      initialValue2 = {};
    }
    return Object.keys(queries$1).reduce((helpers, key) => {
      const fn = queries$1[key];
      helpers[key] = fn.bind(null, element);
      return helpers;
    }, initialValue2);
  }
  var isRemoved = (result) => !result || Array.isArray(result) && !result.length;
  function initialCheck(elements) {
    if (isRemoved(elements)) {
      throw new Error("The element(s) given to waitForElementToBeRemoved are already removed. waitForElementToBeRemoved requires that the element(s) exist(s) before waiting for removal.");
    }
  }
  async function waitForElementToBeRemoved(callback, options) {
    const timeoutError = new Error("Timed out in waitForElementToBeRemoved.");
    if (typeof callback !== "function") {
      initialCheck(callback);
      const elements = Array.isArray(callback) ? callback : [callback];
      const getRemainingElements = elements.map((element) => {
        let parent = element.parentElement;
        if (parent === null)
          return () => null;
        while (parent.parentElement)
          parent = parent.parentElement;
        return () => parent.contains(element) ? element : null;
      });
      callback = () => getRemainingElements.map((c) => c()).filter(Boolean);
    }
    initialCheck(callback());
    return waitForWrapper(() => {
      let result;
      try {
        result = callback();
      } catch (error) {
        if (error.name === "TestingLibraryElementError") {
          return void 0;
        }
        throw error;
      }
      if (!isRemoved(result)) {
        throw timeoutError;
      }
      return void 0;
    }, options);
  }
  var eventMap = {
    // Clipboard Events
    copy: {
      EventType: "ClipboardEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    cut: {
      EventType: "ClipboardEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    paste: {
      EventType: "ClipboardEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    // Composition Events
    compositionEnd: {
      EventType: "CompositionEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    compositionStart: {
      EventType: "CompositionEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    compositionUpdate: {
      EventType: "CompositionEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    // Keyboard Events
    keyDown: {
      EventType: "KeyboardEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        charCode: 0,
        composed: true
      }
    },
    keyPress: {
      EventType: "KeyboardEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        charCode: 0,
        composed: true
      }
    },
    keyUp: {
      EventType: "KeyboardEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        charCode: 0,
        composed: true
      }
    },
    // Focus Events
    focus: {
      EventType: "FocusEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false,
        composed: true
      }
    },
    blur: {
      EventType: "FocusEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false,
        composed: true
      }
    },
    focusIn: {
      EventType: "FocusEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    focusOut: {
      EventType: "FocusEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    // Form Events
    change: {
      EventType: "Event",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    input: {
      EventType: "InputEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    invalid: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: true
      }
    },
    submit: {
      EventType: "Event",
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    reset: {
      EventType: "Event",
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    // Mouse Events
    click: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        button: 0,
        composed: true
      }
    },
    contextMenu: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    dblClick: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    drag: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    dragEnd: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    dragEnter: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    dragExit: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    dragLeave: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    dragOver: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    dragStart: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    drop: {
      EventType: "DragEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    mouseDown: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    mouseEnter: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false,
        composed: true
      }
    },
    mouseLeave: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false,
        composed: true
      }
    },
    mouseMove: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    mouseOut: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    mouseOver: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    mouseUp: {
      EventType: "MouseEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    // Selection Events
    select: {
      EventType: "Event",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    // Touch Events
    touchCancel: {
      EventType: "TouchEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    touchEnd: {
      EventType: "TouchEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    touchMove: {
      EventType: "TouchEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    touchStart: {
      EventType: "TouchEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    // UI Events
    resize: {
      EventType: "UIEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    scroll: {
      EventType: "UIEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    // Wheel Events
    wheel: {
      EventType: "WheelEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    // Media Events
    abort: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    canPlay: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    canPlayThrough: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    durationChange: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    emptied: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    encrypted: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    ended: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    loadedData: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    loadedMetadata: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    loadStart: {
      EventType: "ProgressEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    pause: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    play: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    playing: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    progress: {
      EventType: "ProgressEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    rateChange: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    seeked: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    seeking: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    stalled: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    suspend: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    timeUpdate: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    volumeChange: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    waiting: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    // Events
    load: {
      // TODO: load events can be UIEvent or Event depending on what generated them
      // This is where this abstraction breaks down.
      // But the common targets are <img />, <script /> and window.
      // Neither of these targets receive a UIEvent
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    error: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    // Animation Events
    animationStart: {
      EventType: "AnimationEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    animationEnd: {
      EventType: "AnimationEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    animationIteration: {
      EventType: "AnimationEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    // Transition Events
    transitionCancel: {
      EventType: "TransitionEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    transitionEnd: {
      EventType: "TransitionEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    transitionRun: {
      EventType: "TransitionEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    transitionStart: {
      EventType: "TransitionEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    // pointer events
    pointerOver: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    pointerEnter: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    pointerDown: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    pointerMove: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    pointerUp: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    pointerCancel: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    pointerOut: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    pointerLeave: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    gotPointerCapture: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    lostPointerCapture: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    // history events
    popState: {
      EventType: "PopStateEvent",
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    // window events
    offline: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    online: {
      EventType: "Event",
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    }
  };
  var eventAliasMap = {
    doubleClick: "dblClick"
  };
  function fireEvent(element, event) {
    return getConfig().eventWrapper(() => {
      if (!event) {
        throw new Error("Unable to fire an event - please provide an event object.");
      }
      if (!element) {
        throw new Error('Unable to fire a "' + event.type + '" event - please provide a DOM element.');
      }
      return element.dispatchEvent(event);
    });
  }
  function createEvent(eventName, node, init, _temp) {
    let {
      EventType = "Event",
      defaultInit = {}
    } = _temp === void 0 ? {} : _temp;
    if (!node) {
      throw new Error('Unable to fire a "' + eventName + '" event - please provide a DOM element.');
    }
    const eventInit = {
      ...defaultInit,
      ...init
    };
    const {
      target: {
        value,
        files,
        ...targetProperties
      } = {}
    } = eventInit;
    if (value !== void 0) {
      setNativeValue(node, value);
    }
    if (files !== void 0) {
      Object.defineProperty(node, "files", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: files
      });
    }
    Object.assign(node, targetProperties);
    const window2 = getWindowFromNode(node);
    const EventConstructor = window2[EventType] || window2.Event;
    let event;
    if (typeof EventConstructor === "function") {
      event = new EventConstructor(eventName, eventInit);
    } else {
      event = window2.document.createEvent(EventType);
      const {
        bubbles,
        cancelable,
        detail,
        ...otherInit
      } = eventInit;
      event.initEvent(eventName, bubbles, cancelable, detail);
      Object.keys(otherInit).forEach((eventKey) => {
        event[eventKey] = otherInit[eventKey];
      });
    }
    const dataTransferProperties = ["dataTransfer", "clipboardData"];
    dataTransferProperties.forEach((dataTransferKey) => {
      const dataTransferValue = eventInit[dataTransferKey];
      if (typeof dataTransferValue === "object") {
        if (typeof window2.DataTransfer === "function") {
          Object.defineProperty(event, dataTransferKey, {
            value: Object.getOwnPropertyNames(dataTransferValue).reduce((acc, propName) => {
              Object.defineProperty(acc, propName, {
                value: dataTransferValue[propName]
              });
              return acc;
            }, new window2.DataTransfer())
          });
        } else {
          Object.defineProperty(event, dataTransferKey, {
            value: dataTransferValue
          });
        }
      }
    });
    return event;
  }
  Object.keys(eventMap).forEach((key) => {
    const {
      EventType,
      defaultInit
    } = eventMap[key];
    const eventName = key.toLowerCase();
    createEvent[key] = (node, init) => createEvent(eventName, node, init, {
      EventType,
      defaultInit
    });
    fireEvent[key] = (node, init) => fireEvent(node, createEvent[key](node, init));
  });
  function setNativeValue(element, value) {
    const {
      set: valueSetter
    } = Object.getOwnPropertyDescriptor(element, "value") || {};
    const prototype = Object.getPrototypeOf(element);
    const {
      set: prototypeValueSetter
    } = Object.getOwnPropertyDescriptor(prototype, "value") || {};
    if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(element, value);
    } else {
      if (valueSetter) {
        valueSetter.call(element, value);
      } else {
        throw new Error("The given element does not have a value setter");
      }
    }
  }
  Object.keys(eventAliasMap).forEach((aliasKey) => {
    const key = eventAliasMap[aliasKey];
    fireEvent[aliasKey] = function() {
      return fireEvent[key](...arguments);
    };
  });
  function unindent(string) {
    return string.replace(/[ \t]*[\n][ \t]*/g, "\n");
  }
  function encode(value) {
    return import_lz_string.default.compressToEncodedURIComponent(unindent(value));
  }
  function getPlaygroundUrl(markup) {
    return "https://testing-playground.com/#markup=" + encode(markup);
  }
  var debug = (element, maxLength, options) => Array.isArray(element) ? element.forEach((el) => logDOM(el, maxLength, options)) : logDOM(element, maxLength, options);
  var logTestingPlaygroundURL = function(element) {
    if (element === void 0) {
      element = getDocument().body;
    }
    if (!element || !("innerHTML" in element)) {
      console.log("The element you're providing isn't a valid DOM element.");
      return;
    }
    if (!element.innerHTML) {
      console.log("The provided element doesn't have any children.");
      return;
    }
    const playgroundUrl = getPlaygroundUrl(element.innerHTML);
    console.log("Open this URL in your browser\n\n" + playgroundUrl);
    return playgroundUrl;
  };
  var initialValue = {
    debug,
    logTestingPlaygroundURL
  };
  var screen = typeof document !== "undefined" && document.body ? getQueriesForElement(document.body, queries, initialValue) : Object.keys(queries).reduce((helpers, key) => {
    helpers[key] = () => {
      throw new TypeError("For queries bound to document.body a global document has to be available... Learn more: https://testing-library.com/s/screen-global-error");
    };
    return helpers;
  }, initialValue);

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/misc/isElementType.js
  function isElementType(element, tag, props) {
    if (element.namespaceURI && element.namespaceURI !== "http://www.w3.org/1999/xhtml") {
      return false;
    }
    tag = Array.isArray(tag) ? tag : [
      tag
    ];
    if (!tag.includes(element.tagName.toLowerCase())) {
      return false;
    }
    if (props) {
      return Object.entries(props).every(([k, v]) => element[k] === v);
    }
    return true;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/click/isClickableInput.js
  var clickableInputTypes;
  (function(clickableInputTypes2) {
    clickableInputTypes2["button"] = "button";
    clickableInputTypes2["color"] = "color";
    clickableInputTypes2["file"] = "file";
    clickableInputTypes2["image"] = "image";
    clickableInputTypes2["reset"] = "reset";
    clickableInputTypes2["submit"] = "submit";
    clickableInputTypes2["checkbox"] = "checkbox";
    clickableInputTypes2["radio"] = "radio";
  })(clickableInputTypes || (clickableInputTypes = {}));
  function isClickableInput(element) {
    return isElementType(element, "button") || isElementType(element, "input") && element.type in clickableInputTypes;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/misc/getWindow.js
  var named = __toESM(require_helpers(), 1);
  var { getWindowFromNode: getWindowFromNode2 } = named;
  function getWindow(node) {
    return getWindowFromNode2(node);
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/dataTransfer/Blob.js
  function readBlobText(blob, FileReader) {
    return new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onerror = rej;
      fr.onabort = rej;
      fr.onload = () => {
        res(String(fr.result));
      };
      fr.readAsText(blob);
    });
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/dataTransfer/FileList.js
  function createFileList(window2, files) {
    const list = {
      ...files,
      length: files.length,
      item: (index) => list[index],
      [Symbol.iterator]: function* nextFile() {
        for (let i = 0; i < list.length; i++) {
          yield list[i];
        }
      }
    };
    list.constructor = window2.FileList;
    if (window2.FileList) {
      Object.setPrototypeOf(list, window2.FileList.prototype);
    }
    Object.freeze(list);
    return list;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/dataTransfer/DataTransfer.js
  function _define_property(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var DataTransferItemStub = class {
    getAsFile() {
      return this.file;
    }
    getAsString(callback) {
      if (typeof this.data === "string") {
        callback(this.data);
      }
    }
    /* istanbul ignore next */
    webkitGetAsEntry() {
      throw new Error("not implemented");
    }
    constructor(dataOrFile, type3) {
      _define_property(this, "kind", void 0);
      _define_property(this, "type", void 0);
      _define_property(this, "file", null);
      _define_property(this, "data", void 0);
      if (typeof dataOrFile === "string") {
        this.kind = "string";
        this.type = String(type3);
        this.data = dataOrFile;
      } else {
        this.kind = "file";
        this.type = dataOrFile.type;
        this.file = dataOrFile;
      }
    }
  };
  var DataTransferItemListStub = class extends Array {
    add(...args) {
      const item = new DataTransferItemStub(args[0], args[1]);
      this.push(item);
      return item;
    }
    clear() {
      this.splice(0, this.length);
    }
    remove(index) {
      this.splice(index, 1);
    }
  };
  function getTypeMatcher(type3, exact) {
    const [group, sub] = type3.split("/");
    const isGroup = !sub || sub === "*";
    return (item) => {
      return exact ? item.type === (isGroup ? group : type3) : isGroup ? item.type.startsWith(`${group}/`) : item.type === group;
    };
  }
  function createDataTransferStub(window2) {
    return new class DataTransferStub {
      getData(format2) {
        var _this_items_find;
        const match = (_this_items_find = this.items.find(getTypeMatcher(format2, true))) !== null && _this_items_find !== void 0 ? _this_items_find : this.items.find(getTypeMatcher(format2, false));
        let text = "";
        match === null || match === void 0 ? void 0 : match.getAsString((t) => {
          text = t;
        });
        return text;
      }
      setData(format2, data) {
        const matchIndex = this.items.findIndex(getTypeMatcher(format2, true));
        const item = new DataTransferItemStub(data, format2);
        if (matchIndex >= 0) {
          this.items.splice(matchIndex, 1, item);
        } else {
          this.items.push(item);
        }
      }
      clearData(format2) {
        if (format2) {
          const matchIndex = this.items.findIndex(getTypeMatcher(format2, true));
          if (matchIndex >= 0) {
            this.items.remove(matchIndex);
          }
        } else {
          this.items.clear();
        }
      }
      get types() {
        const t = [];
        if (this.files.length) {
          t.push("Files");
        }
        this.items.forEach((i) => t.push(i.type));
        Object.freeze(t);
        return t;
      }
      /* istanbul ignore next */
      setDragImage() {
      }
      constructor() {
        _define_property(this, "dropEffect", "none");
        _define_property(this, "effectAllowed", "uninitialized");
        _define_property(this, "items", new DataTransferItemListStub());
        _define_property(this, "files", createFileList(window2, []));
      }
    }();
  }
  function createDataTransfer(window2, files = []) {
    const dt = typeof window2.DataTransfer === "undefined" ? createDataTransferStub(window2) : (
      /* istanbul ignore next */
      new window2.DataTransfer()
    );
    Object.defineProperty(dt, "files", {
      get: () => createFileList(window2, files)
    });
    return dt;
  }
  function getBlobFromDataTransferItem(window2, item) {
    if (item.kind === "file") {
      return item.getAsFile();
    }
    let data = "";
    item.getAsString((s) => {
      data = s;
    });
    return new window2.Blob([
      data
    ], {
      type: item.type
    });
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/dataTransfer/Clipboard.js
  function _define_property2(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function createClipboardItem(window2, ...blobs) {
    const dataMap = Object.fromEntries(blobs.map((b) => [
      typeof b === "string" ? "text/plain" : b.type,
      Promise.resolve(b)
    ]));
    if (typeof window2.ClipboardItem !== "undefined") {
      return new window2.ClipboardItem(dataMap);
    }
    return new class ClipboardItem {
      get types() {
        return Array.from(Object.keys(this.data));
      }
      async getType(type3) {
        const value = await this.data[type3];
        if (!value) {
          throw new Error(`${type3} is not one of the available MIME types on this item.`);
        }
        return value instanceof window2.Blob ? value : new window2.Blob([
          value
        ], {
          type: type3
        });
      }
      constructor(d) {
        _define_property2(this, "data", void 0);
        this.data = d;
      }
    }(dataMap);
  }
  var ClipboardStubControl = Symbol("Manage ClipboardSub");
  function createClipboardStub(window2, control) {
    return Object.assign(new class Clipboard extends window2.EventTarget {
      async read() {
        return Array.from(this.items);
      }
      async readText() {
        let text = "";
        for (const item of this.items) {
          const type3 = item.types.includes("text/plain") ? "text/plain" : item.types.find((t) => t.startsWith("text/"));
          if (type3) {
            text += await item.getType(type3).then((b) => readBlobText(b, window2.FileReader));
          }
        }
        return text;
      }
      async write(data) {
        this.items = data;
      }
      async writeText(text) {
        this.items = [
          createClipboardItem(window2, text)
        ];
      }
      constructor(...args) {
        super(...args);
        _define_property2(this, "items", []);
      }
    }(), {
      [ClipboardStubControl]: control
    });
  }
  function isClipboardStub(clipboard) {
    return !!(clipboard === null || clipboard === void 0 ? void 0 : clipboard[ClipboardStubControl]);
  }
  function attachClipboardStubToView(window2) {
    if (isClipboardStub(window2.navigator.clipboard)) {
      return window2.navigator.clipboard[ClipboardStubControl];
    }
    const realClipboard = Object.getOwnPropertyDescriptor(window2.navigator, "clipboard");
    let stub;
    const control = {
      resetClipboardStub: () => {
        stub = createClipboardStub(window2, control);
      },
      detachClipboardStub: () => {
        if (realClipboard) {
          Object.defineProperty(window2.navigator, "clipboard", realClipboard);
        } else {
          Object.defineProperty(window2.navigator, "clipboard", {
            value: void 0,
            configurable: true
          });
        }
      }
    };
    stub = createClipboardStub(window2, control);
    Object.defineProperty(window2.navigator, "clipboard", {
      get: () => stub,
      configurable: true
    });
    return stub[ClipboardStubControl];
  }
  function resetClipboardStubOnView(window2) {
    if (isClipboardStub(window2.navigator.clipboard)) {
      window2.navigator.clipboard[ClipboardStubControl].resetClipboardStub();
    }
  }
  function detachClipboardStubFromView(window2) {
    if (isClipboardStub(window2.navigator.clipboard)) {
      window2.navigator.clipboard[ClipboardStubControl].detachClipboardStub();
    }
  }
  async function readDataTransferFromClipboard(document2) {
    const window2 = document2.defaultView;
    const clipboard = window2 === null || window2 === void 0 ? void 0 : window2.navigator.clipboard;
    const items = clipboard && await clipboard.read();
    if (!items) {
      throw new Error("The Clipboard API is unavailable.");
    }
    const dt = createDataTransfer(window2);
    for (const item of items) {
      for (const type3 of item.types) {
        dt.setData(type3, await item.getType(type3).then((b) => readBlobText(b, window2.FileReader)));
      }
    }
    return dt;
  }
  async function writeDataTransferToClipboard(document2, clipboardData) {
    const window2 = getWindow(document2);
    const clipboard = window2.navigator.clipboard;
    const items = [];
    for (let i = 0; i < clipboardData.items.length; i++) {
      const dtItem = clipboardData.items[i];
      const blob = getBlobFromDataTransferItem(window2, dtItem);
      items.push(createClipboardItem(window2, blob));
    }
    const written = clipboard && await clipboard.write(items).then(
      () => true,
      // Can happen with other implementations that e.g. require permissions
      /* istanbul ignore next */
      () => false
    );
    if (!written) {
      throw new Error("The Clipboard API is unavailable.");
    }
  }
  var g = globalThis;
  if (typeof g.afterEach === "function") {
    g.afterEach(() => resetClipboardStubOnView(globalThis.window));
  }
  if (typeof g.afterAll === "function") {
    g.afterAll(() => detachClipboardStubFromView(globalThis.window));
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/edit/isContentEditable.js
  function isContentEditable(element) {
    return element.hasAttribute("contenteditable") && (element.getAttribute("contenteditable") == "true" || element.getAttribute("contenteditable") == "");
  }
  function getContentEditable(node) {
    const element = getElement(node);
    return element && (element.closest('[contenteditable=""]') || element.closest('[contenteditable="true"]'));
  }
  function getElement(node) {
    return node.nodeType === 1 ? node : node.parentElement;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/edit/isEditable.js
  function isEditable(element) {
    return isEditableInputOrTextArea(element) && !element.readOnly || isContentEditable(element);
  }
  var editableInputTypes;
  (function(editableInputTypes2) {
    editableInputTypes2["text"] = "text";
    editableInputTypes2["date"] = "date";
    editableInputTypes2["datetime-local"] = "datetime-local";
    editableInputTypes2["email"] = "email";
    editableInputTypes2["month"] = "month";
    editableInputTypes2["number"] = "number";
    editableInputTypes2["password"] = "password";
    editableInputTypes2["search"] = "search";
    editableInputTypes2["tel"] = "tel";
    editableInputTypes2["time"] = "time";
    editableInputTypes2["url"] = "url";
    editableInputTypes2["week"] = "week";
  })(editableInputTypes || (editableInputTypes = {}));
  function isEditableInputOrTextArea(element) {
    return isElementType(element, "textarea") || isElementType(element, "input") && element.type in editableInputTypes;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/edit/maxLength.js
  var maxLengthSupportedTypes;
  (function(maxLengthSupportedTypes2) {
    maxLengthSupportedTypes2["email"] = "email";
    maxLengthSupportedTypes2["password"] = "password";
    maxLengthSupportedTypes2["search"] = "search";
    maxLengthSupportedTypes2["telephone"] = "telephone";
    maxLengthSupportedTypes2["text"] = "text";
    maxLengthSupportedTypes2["url"] = "url";
  })(maxLengthSupportedTypes || (maxLengthSupportedTypes = {}));
  function getMaxLength(element) {
    var _element_getAttribute;
    const attr = (_element_getAttribute = element.getAttribute("maxlength")) !== null && _element_getAttribute !== void 0 ? _element_getAttribute : "";
    return /^\d+$/.test(attr) && Number(attr) >= 0 ? Number(attr) : void 0;
  }
  function supportsMaxLength(element) {
    return isElementType(element, "textarea") || isElementType(element, "input") && element.type in maxLengthSupportedTypes;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/focus/selector.js
  var FOCUSABLE_SELECTOR = [
    "input:not([type=hidden]):not([disabled])",
    "button:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[contenteditable=""]',
    '[contenteditable="true"]',
    "a[href]",
    "[tabindex]:not([disabled])"
  ].join(", ");

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/focus/isFocusable.js
  function isFocusable(element) {
    return element.matches(FOCUSABLE_SELECTOR);
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/keyDef/readNextDescriptor.js
  var bracketDict;
  (function(bracketDict2) {
    bracketDict2["{"] = "}";
    bracketDict2["["] = "]";
  })(bracketDict || (bracketDict = {}));
  function readNextDescriptor(text, context) {
    let pos = 0;
    const startBracket = text[pos] in bracketDict ? text[pos] : "";
    pos += startBracket.length;
    const isEscapedChar = new RegExp(`^\\${startBracket}{2}`).test(text);
    const type3 = isEscapedChar ? "" : startBracket;
    return {
      type: type3,
      ...type3 === "" ? readPrintableChar(text, pos, context) : readTag(text, pos, type3, context)
    };
  }
  function readPrintableChar(text, pos, context) {
    const descriptor = text[pos];
    assertDescriptor(descriptor, text, pos, context);
    pos += descriptor.length;
    return {
      consumedLength: pos,
      descriptor,
      releasePrevious: false,
      releaseSelf: true,
      repeat: 1
    };
  }
  function readTag(text, pos, startBracket, context) {
    var _text_slice_match, _text_slice_match1;
    const releasePreviousModifier = text[pos] === "/" ? "/" : "";
    pos += releasePreviousModifier.length;
    const escapedDescriptor = startBracket === "{" && text[pos] === "\\";
    pos += Number(escapedDescriptor);
    const descriptor = escapedDescriptor ? text[pos] : (_text_slice_match = text.slice(pos).match(startBracket === "{" ? /^\w+|^[^}>/]/ : /^\w+/)) === null || _text_slice_match === void 0 ? void 0 : _text_slice_match[0];
    assertDescriptor(descriptor, text, pos, context);
    pos += descriptor.length;
    var _text_slice_match_;
    const repeatModifier = (_text_slice_match_ = (_text_slice_match1 = text.slice(pos).match(/^>\d+/)) === null || _text_slice_match1 === void 0 ? void 0 : _text_slice_match1[0]) !== null && _text_slice_match_ !== void 0 ? _text_slice_match_ : "";
    pos += repeatModifier.length;
    const releaseSelfModifier = text[pos] === "/" || !repeatModifier && text[pos] === ">" ? text[pos] : "";
    pos += releaseSelfModifier.length;
    const expectedEndBracket = bracketDict[startBracket];
    const endBracket = text[pos] === expectedEndBracket ? expectedEndBracket : "";
    if (!endBracket) {
      throw new Error(getErrorMessage([
        !repeatModifier && "repeat modifier",
        !releaseSelfModifier && "release modifier",
        `"${expectedEndBracket}"`
      ].filter(Boolean).join(" or "), text[pos], text, context));
    }
    pos += endBracket.length;
    return {
      consumedLength: pos,
      descriptor,
      releasePrevious: !!releasePreviousModifier,
      repeat: repeatModifier ? Math.max(Number(repeatModifier.substr(1)), 1) : 1,
      releaseSelf: hasReleaseSelf(releaseSelfModifier, repeatModifier)
    };
  }
  function assertDescriptor(descriptor, text, pos, context) {
    if (!descriptor) {
      throw new Error(getErrorMessage("key descriptor", text[pos], text, context));
    }
  }
  function hasReleaseSelf(releaseSelfModifier, repeatModifier) {
    if (releaseSelfModifier) {
      return releaseSelfModifier === "/";
    }
    if (repeatModifier) {
      return false;
    }
  }
  function getErrorMessage(expected, found, text, context) {
    return `Expected ${expected} but found "${found !== null && found !== void 0 ? found : ""}" in "${text}"
    See ${context === "pointer" ? `https://testing-library.com/docs/user-event/pointer#pressing-a-button-or-touching-the-screen` : `https://testing-library.com/docs/user-event/keyboard`}
    for more information about how userEvent parses your input.`;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/misc/cloneEvent.js
  function cloneEvent(event) {
    return new event.constructor(event.type, event);
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/misc/level.js
  var ApiLevel;
  (function(ApiLevel2) {
    ApiLevel2[ApiLevel2["Trigger"] = 2] = "Trigger";
    ApiLevel2[ApiLevel2["Call"] = 1] = "Call";
  })(ApiLevel || (ApiLevel = {}));
  function setLevelRef(instance, level) {
    instance.levelRefs[level] = {};
  }
  function getLevelRef(instance, level) {
    return instance.levelRefs[level];
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/options.js
  var PointerEventsCheckLevel;
  (function(PointerEventsCheckLevel2) {
    PointerEventsCheckLevel2[PointerEventsCheckLevel2[
      /**
      * Check pointer events on every user interaction that triggers a bunch of events.
      * E.g. once for releasing a mouse button even though this triggers `pointerup`, `mouseup`, `click`, etc...
      */
      "EachTrigger"
    ] = 4] = "EachTrigger";
    PointerEventsCheckLevel2[PointerEventsCheckLevel2[
      /** Check each target once per call to pointer (related) API */
      "EachApiCall"
    ] = 2] = "EachApiCall";
    PointerEventsCheckLevel2[PointerEventsCheckLevel2[
      /** Check each event target once */
      "EachTarget"
    ] = 1] = "EachTarget";
    PointerEventsCheckLevel2[PointerEventsCheckLevel2[
      /** No pointer events check */
      "Never"
    ] = 0] = "Never";
  })(PointerEventsCheckLevel || (PointerEventsCheckLevel = {}));

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/misc/isDisabled.js
  function isDisabled(element) {
    for (let el = element; el; el = el.parentElement) {
      if (isElementType(el, [
        "button",
        "input",
        "select",
        "textarea",
        "optgroup",
        "option"
      ])) {
        if (el.hasAttribute("disabled")) {
          return true;
        }
      } else if (isElementType(el, "fieldset")) {
        var _el_querySelector;
        if (el.hasAttribute("disabled") && !((_el_querySelector = el.querySelector(":scope > legend")) === null || _el_querySelector === void 0 ? void 0 : _el_querySelector.contains(element))) {
          return true;
        }
      } else if (el.tagName.includes("-")) {
        if (el.constructor.formAssociated && el.hasAttribute("disabled")) {
          return true;
        }
      }
    }
    return false;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/focus/getActiveElement.js
  function getActiveElement(document2) {
    const activeElement = document2.activeElement;
    if (activeElement === null || activeElement === void 0 ? void 0 : activeElement.shadowRoot) {
      return getActiveElement(activeElement.shadowRoot);
    } else {
      if (isDisabled(activeElement)) {
        return document2.ownerDocument ? (
          /* istanbul ignore next */
          document2.ownerDocument.body
        ) : document2.body;
      }
      return activeElement;
    }
  }
  function getActiveElementOrBody(document2) {
    var _getActiveElement;
    return (_getActiveElement = getActiveElement(document2)) !== null && _getActiveElement !== void 0 ? _getActiveElement : (
      /* istanbul ignore next */
      document2.body
    );
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/focus.js
  var import_helpers2 = __toESM(require_helpers(), 1);

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/misc/findClosest.js
  function findClosest(element, callback) {
    let el = element;
    do {
      if (callback(el)) {
        return el;
      }
      el = el.parentElement;
    } while (el && el !== element.ownerDocument.body);
    return void 0;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/selection/updateSelectionOnFocus.js
  var import_helpers = __toESM(require_helpers(), 1);

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/focus/selection.js
  function hasOwnSelection(node) {
    return isElement2(node) && isEditableInputOrTextArea(node);
  }
  function hasNoSelection(node) {
    return isElement2(node) && isClickableInput(node);
  }
  function isElement2(node) {
    return node.nodeType === 1;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/selection/updateSelectionOnFocus.js
  function updateSelectionOnFocus(element) {
    const selection = element.ownerDocument.getSelection();
    if (!(selection === null || selection === void 0 ? void 0 : selection.focusNode)) {
      return;
    }
    if (hasOwnSelection(element)) {
      const contenteditable = getContentEditable(selection.focusNode);
      if (contenteditable) {
        if (!selection.isCollapsed) {
          var _contenteditable_firstChild;
          const focusNode = ((_contenteditable_firstChild = contenteditable.firstChild) === null || _contenteditable_firstChild === void 0 ? void 0 : _contenteditable_firstChild.nodeType) === 3 ? contenteditable.firstChild : contenteditable;
          selection.setBaseAndExtent(focusNode, 0, focusNode, 0);
        }
      } else {
        selection.setBaseAndExtent(element, 0, element, 0);
      }
    }
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/wrapEvent.js
  var { getConfig: getConfig2 } = dom_esm_exports;
  function wrapEvent(cb, _element) {
    return getConfig2().eventWrapper(cb);
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/focus.js
  function focusElement(element) {
    const target = findClosest(element, isFocusable);
    const activeElement = getActiveElement(element.ownerDocument);
    if ((target !== null && target !== void 0 ? target : element.ownerDocument.body) === activeElement) {
      return;
    } else if (target) {
      wrapEvent(() => target.focus());
    } else {
      wrapEvent(() => activeElement === null || activeElement === void 0 ? void 0 : activeElement.blur());
    }
    updateSelectionOnFocus(target !== null && target !== void 0 ? target : element.ownerDocument.body);
  }
  function blurElement(element) {
    if (!isFocusable(element))
      return;
    const wasActive = getActiveElement(element.ownerDocument) === element;
    if (!wasActive)
      return;
    wrapEvent(() => element.blur());
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/behavior/registry.js
  var behavior = {};

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/behavior/click.js
  behavior.click = (event, target, instance) => {
    const context = target.closest("button,input,label,select,textarea");
    const control = context && isElementType(context, "label") && context.control;
    if (control) {
      return () => {
        if (isFocusable(control)) {
          focusElement(control);
        }
        instance.dispatchEvent(control, cloneEvent(event));
      };
    } else if (isElementType(target, "input", {
      type: "file"
    })) {
      return () => {
        blurElement(target);
        target.dispatchEvent(new (getWindow(target)).Event("fileDialog"));
        focusElement(target);
      };
    }
  };

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/behavior/cut.js
  var import_helpers6 = __toESM(require_helpers(), 1);

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/document/UI.js
  var UIValue = Symbol("Displayed value in UI");
  var UISelection = Symbol("Displayed selection in UI");
  var InitialValue = Symbol("Initial value to compare on blur");
  function isUIValue(value) {
    return typeof value === "object" && UIValue in value;
  }
  function isUISelectionStart(start) {
    return !!start && typeof start === "object" && UISelection in start;
  }
  function setUIValue(element, value) {
    if (element[InitialValue] === void 0) {
      element[InitialValue] = element.value;
    }
    element[UIValue] = value;
    element.value = Object.assign(new String(value), {
      [UIValue]: true
    });
  }
  function getUIValue(element) {
    return element[UIValue] === void 0 ? element.value : String(element[UIValue]);
  }
  function setUIValueClean(element) {
    element[UIValue] = void 0;
  }
  function clearInitialValue(element) {
    element[InitialValue] = void 0;
  }
  function getInitialValue(element) {
    return element[InitialValue];
  }
  function setUISelectionRaw(element, selection) {
    element[UISelection] = selection;
  }
  function setUISelection(element, { focusOffset: focusOffsetParam, anchorOffset: anchorOffsetParam = focusOffsetParam }, mode = "replace") {
    const valueLength = getUIValue(element).length;
    const sanitizeOffset = (o) => Math.max(0, Math.min(valueLength, o));
    const anchorOffset = mode === "replace" || element[UISelection] === void 0 ? sanitizeOffset(anchorOffsetParam) : element[UISelection].anchorOffset;
    const focusOffset = sanitizeOffset(focusOffsetParam);
    const startOffset = Math.min(anchorOffset, focusOffset);
    const endOffset = Math.max(anchorOffset, focusOffset);
    element[UISelection] = {
      anchorOffset,
      focusOffset
    };
    if (element.selectionStart === startOffset && element.selectionEnd === endOffset) {
      return;
    }
    const startObj = Object.assign(new Number(startOffset), {
      [UISelection]: true
    });
    try {
      element.setSelectionRange(startObj, endOffset);
    } catch {
    }
  }
  function getUISelection(element) {
    var _element_selectionStart, _element_selectionEnd, _element_UISelection;
    const sel = (_element_UISelection = element[UISelection]) !== null && _element_UISelection !== void 0 ? _element_UISelection : {
      anchorOffset: (_element_selectionStart = element.selectionStart) !== null && _element_selectionStart !== void 0 ? _element_selectionStart : 0,
      focusOffset: (_element_selectionEnd = element.selectionEnd) !== null && _element_selectionEnd !== void 0 ? _element_selectionEnd : 0
    };
    return {
      ...sel,
      startOffset: Math.min(sel.anchorOffset, sel.focusOffset),
      endOffset: Math.max(sel.anchorOffset, sel.focusOffset)
    };
  }
  function hasUISelection(element) {
    return !!element[UISelection];
  }
  function setUISelectionClean(element) {
    element[UISelection] = void 0;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/edit/timeValue.js
  var parseInt2 = globalThis.parseInt;
  function buildTimeValue(value) {
    const onlyDigitsValue = value.replace(/\D/g, "");
    if (onlyDigitsValue.length < 2) {
      return value;
    }
    const firstDigit = parseInt2(onlyDigitsValue[0], 10);
    const secondDigit = parseInt2(onlyDigitsValue[1], 10);
    if (firstDigit >= 3 || firstDigit === 2 && secondDigit >= 4) {
      let index;
      if (firstDigit >= 3) {
        index = 1;
      } else {
        index = 2;
      }
      return build(onlyDigitsValue, index);
    }
    if (value.length === 2) {
      return value;
    }
    return build(onlyDigitsValue, 2);
  }
  function build(onlyDigitsValue, index) {
    const hours = onlyDigitsValue.slice(0, index);
    const validHours = Math.min(parseInt2(hours, 10), 23);
    const minuteCharacters = onlyDigitsValue.slice(index);
    const parsedMinutes = parseInt2(minuteCharacters, 10);
    const validMinutes = Math.min(parsedMinutes, 59);
    return `${validHours.toString().padStart(2, "0")}:${validMinutes.toString().padStart(2, "0")}`;
  }
  function isValidDateOrTimeValue(element, value) {
    const clone = element.cloneNode();
    clone.value = value;
    return clone.value === value;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/focus/cursor.js
  function getNextCursorPosition(node, offset, direction, inputType) {
    if (isTextNode(node) && offset + direction >= 0 && offset + direction <= node.nodeValue.length) {
      return {
        node,
        offset: offset + direction
      };
    }
    const nextNode = getNextCharacterContentNode(node, offset, direction);
    if (nextNode) {
      if (isTextNode(nextNode)) {
        return {
          node: nextNode,
          offset: direction > 0 ? Math.min(1, nextNode.nodeValue.length) : Math.max(nextNode.nodeValue.length - 1, 0)
        };
      } else if (isElementType(nextNode, "br")) {
        const nextPlusOne = getNextCharacterContentNode(nextNode, void 0, direction);
        if (!nextPlusOne) {
          if (direction < 0 && inputType === "deleteContentBackward") {
            return {
              node: nextNode.parentNode,
              offset: getOffset(nextNode)
            };
          }
          return void 0;
        } else if (isTextNode(nextPlusOne)) {
          return {
            node: nextPlusOne,
            offset: direction > 0 ? 0 : nextPlusOne.nodeValue.length
          };
        } else if (direction < 0 && isElementType(nextPlusOne, "br")) {
          return {
            node: nextNode.parentNode,
            offset: getOffset(nextNode)
          };
        } else {
          return {
            node: nextPlusOne.parentNode,
            offset: getOffset(nextPlusOne) + (direction > 0 ? 0 : 1)
          };
        }
      } else {
        return {
          node: nextNode.parentNode,
          offset: getOffset(nextNode) + (direction > 0 ? 1 : 0)
        };
      }
    }
  }
  function getNextCharacterContentNode(node, offset, direction) {
    const nextOffset = Number(offset) + (direction < 0 ? -1 : 0);
    if (offset !== void 0 && isElement3(node) && nextOffset >= 0 && nextOffset < node.children.length) {
      node = node.children[nextOffset];
    }
    return walkNodes(node, direction === 1 ? "next" : "previous", isTreatedAsCharacterContent);
  }
  function isTreatedAsCharacterContent(node) {
    if (isTextNode(node)) {
      return true;
    }
    if (isElement3(node)) {
      if (isElementType(node, [
        "input",
        "textarea"
      ])) {
        return node.type !== "hidden";
      } else if (isElementType(node, "br")) {
        return true;
      }
    }
    return false;
  }
  function getOffset(node) {
    let i = 0;
    while (node.previousSibling) {
      i++;
      node = node.previousSibling;
    }
    return i;
  }
  function isElement3(node) {
    return node.nodeType === 1;
  }
  function isTextNode(node) {
    return node.nodeType === 3;
  }
  function walkNodes(node, direction, callback) {
    for (; ; ) {
      var _node_ownerDocument;
      const sibling = node[`${direction}Sibling`];
      if (sibling) {
        node = getDescendant(sibling, direction === "next" ? "first" : "last");
        if (callback(node)) {
          return node;
        }
      } else if (node.parentNode && (!isElement3(node.parentNode) || !isContentEditable(node.parentNode) && node.parentNode !== ((_node_ownerDocument = node.ownerDocument) === null || _node_ownerDocument === void 0 ? void 0 : _node_ownerDocument.body))) {
        node = node.parentNode;
      } else {
        break;
      }
    }
  }
  function getDescendant(node, direction) {
    while (node.hasChildNodes()) {
      node = node[`${direction}Child`];
    }
    return node;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/input.js
  var import_helpers5 = __toESM(require_helpers(), 1);

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/document/trackValue.js
  var TrackChanges = Symbol("Track programmatic changes for React workaround");
  function isReact17Element(element) {
    return Object.getOwnPropertyNames(element).some((k) => k.startsWith("__react")) && getWindow(element).REACT_VERSION === 17;
  }
  function startTrackValue(element) {
    if (!isReact17Element(element)) {
      return;
    }
    element[TrackChanges] = {
      previousValue: String(element.value),
      tracked: []
    };
  }
  function trackOrSetValue(element, v) {
    var _element_TrackChanges_tracked, _element_TrackChanges;
    (_element_TrackChanges = element[TrackChanges]) === null || _element_TrackChanges === void 0 ? void 0 : (_element_TrackChanges_tracked = _element_TrackChanges.tracked) === null || _element_TrackChanges_tracked === void 0 ? void 0 : _element_TrackChanges_tracked.push(v);
    if (!element[TrackChanges]) {
      setUIValueClean(element);
      setUISelection(element, {
        focusOffset: v.length
      });
    }
  }
  function commitValueAfterInput(element, cursorOffset) {
    var _changes_tracked;
    const changes = element[TrackChanges];
    element[TrackChanges] = void 0;
    if (!(changes === null || changes === void 0 ? void 0 : (_changes_tracked = changes.tracked) === null || _changes_tracked === void 0 ? void 0 : _changes_tracked.length)) {
      return;
    }
    const isJustReactStateUpdate = changes.tracked.length === 2 && changes.tracked[0] === changes.previousValue && changes.tracked[1] === element.value;
    if (!isJustReactStateUpdate) {
      setUIValueClean(element);
    }
    if (hasUISelection(element)) {
      setUISelection(element, {
        focusOffset: isJustReactStateUpdate ? cursorOffset : element.value.length
      });
    }
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/selection/getTargetTypeAndSelection.js
  var import_helpers3 = __toESM(require_helpers(), 1);
  function getTargetTypeAndSelection(node) {
    const element = getElement2(node);
    if (element && hasOwnSelection(element)) {
      return {
        type: "input",
        selection: getUISelection(element)
      };
    }
    const selection = element === null || element === void 0 ? void 0 : element.ownerDocument.getSelection();
    const isCE = getContentEditable(node) && (selection === null || selection === void 0 ? void 0 : selection.anchorNode) && getContentEditable(selection.anchorNode);
    return {
      type: isCE ? "contenteditable" : "default",
      selection
    };
  }
  function getElement2(node) {
    return node.nodeType === 1 ? node : node.parentElement;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/selection/getInputRange.js
  function getInputRange(focusNode) {
    const typeAndSelection = getTargetTypeAndSelection(focusNode);
    if (typeAndSelection.type === "input") {
      return typeAndSelection.selection;
    } else if (typeAndSelection.type === "contenteditable") {
      var _typeAndSelection_selection;
      return (_typeAndSelection_selection = typeAndSelection.selection) === null || _typeAndSelection_selection === void 0 ? void 0 : _typeAndSelection_selection.getRangeAt(0);
    }
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/selection/setSelection.js
  var import_helpers4 = __toESM(require_helpers(), 1);
  function setSelection({ focusNode, focusOffset, anchorNode = focusNode, anchorOffset = focusOffset }) {
    var _anchorNode_ownerDocument_getSelection, _anchorNode_ownerDocument;
    const typeAndSelection = getTargetTypeAndSelection(focusNode);
    if (typeAndSelection.type === "input") {
      return setUISelection(focusNode, {
        anchorOffset,
        focusOffset
      });
    }
    (_anchorNode_ownerDocument = anchorNode.ownerDocument) === null || _anchorNode_ownerDocument === void 0 ? void 0 : (_anchorNode_ownerDocument_getSelection = _anchorNode_ownerDocument.getSelection()) === null || _anchorNode_ownerDocument_getSelection === void 0 ? void 0 : _anchorNode_ownerDocument_getSelection.setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/input.js
  function isDateOrTime(element) {
    return isElementType(element, "input") && [
      "date",
      "time"
    ].includes(element.type);
  }
  function input(instance, element, data, inputType = "insertText") {
    const inputRange = getInputRange(element);
    if (!inputRange) {
      return;
    }
    if (!isDateOrTime(element)) {
      const unprevented = instance.dispatchUIEvent(element, "beforeinput", {
        inputType,
        data
      });
      if (!unprevented) {
        return;
      }
    }
    if ("startContainer" in inputRange) {
      editContenteditable(instance, element, inputRange, data, inputType);
    } else {
      editInputElement(instance, element, inputRange, data, inputType);
    }
  }
  function editContenteditable(instance, element, inputRange, data, inputType) {
    let del = false;
    if (!inputRange.collapsed) {
      del = true;
      inputRange.deleteContents();
    } else if ([
      "deleteContentBackward",
      "deleteContentForward"
    ].includes(inputType)) {
      const nextPosition = getNextCursorPosition(inputRange.startContainer, inputRange.startOffset, inputType === "deleteContentBackward" ? -1 : 1, inputType);
      if (nextPosition) {
        del = true;
        const delRange = inputRange.cloneRange();
        if (delRange.comparePoint(nextPosition.node, nextPosition.offset) < 0) {
          delRange.setStart(nextPosition.node, nextPosition.offset);
        } else {
          delRange.setEnd(nextPosition.node, nextPosition.offset);
        }
        delRange.deleteContents();
      }
    }
    if (data) {
      if (inputRange.endContainer.nodeType === 3) {
        const offset = inputRange.endOffset;
        inputRange.endContainer.insertData(offset, data);
        inputRange.setStart(inputRange.endContainer, offset + data.length);
        inputRange.setEnd(inputRange.endContainer, offset + data.length);
      } else {
        const text = element.ownerDocument.createTextNode(data);
        inputRange.insertNode(text);
        inputRange.setStart(text, data.length);
        inputRange.setEnd(text, data.length);
      }
    }
    if (del || data) {
      instance.dispatchUIEvent(element, "input", {
        inputType
      });
    }
  }
  function editInputElement(instance, element, inputRange, data, inputType) {
    let dataToInsert = data;
    if (supportsMaxLength(element)) {
      const maxLength = getMaxLength(element);
      if (maxLength !== void 0 && data.length > 0) {
        const spaceUntilMaxLength = maxLength - element.value.length;
        if (spaceUntilMaxLength > 0) {
          dataToInsert = data.substring(0, spaceUntilMaxLength);
        } else {
          return;
        }
      }
    }
    const { newValue, newOffset, oldValue } = calculateNewValue(dataToInsert, element, inputRange, inputType);
    if (newValue === oldValue && newOffset === inputRange.startOffset && newOffset === inputRange.endOffset) {
      return;
    }
    if (isElementType(element, "input", {
      type: "number"
    }) && !isValidNumberInput(newValue)) {
      return;
    }
    setUIValue(element, newValue);
    setSelection({
      focusNode: element,
      anchorOffset: newOffset,
      focusOffset: newOffset
    });
    if (isDateOrTime(element)) {
      if (isValidDateOrTimeValue(element, newValue)) {
        commitInput(instance, element, newOffset, {});
        instance.dispatchUIEvent(element, "change");
        clearInitialValue(element);
      }
    } else {
      commitInput(instance, element, newOffset, {
        data,
        inputType
      });
    }
  }
  function calculateNewValue(inputData, node, { startOffset, endOffset }, inputType) {
    const value = getUIValue(node);
    const prologEnd = Math.max(0, startOffset === endOffset && inputType === "deleteContentBackward" ? startOffset - 1 : startOffset);
    const prolog = value.substring(0, prologEnd);
    const epilogStart = Math.min(value.length, startOffset === endOffset && inputType === "deleteContentForward" ? startOffset + 1 : endOffset);
    const epilog = value.substring(epilogStart, value.length);
    let newValue = `${prolog}${inputData}${epilog}`;
    let newOffset = prologEnd + inputData.length;
    if (isElementType(node, "input", {
      type: "time"
    })) {
      const builtValue = buildTimeValue(newValue);
      if (builtValue !== "" && isValidDateOrTimeValue(node, builtValue)) {
        newValue = builtValue;
        newOffset = builtValue.length;
      }
    }
    return {
      oldValue: value,
      newValue,
      newOffset
    };
  }
  function commitInput(instance, element, newOffset, inputInit) {
    instance.dispatchUIEvent(element, "input", inputInit);
    commitValueAfterInput(element, newOffset);
  }
  function isValidNumberInput(value) {
    var _value_match, _value_match1;
    const valueParts = value.split("e", 2);
    return !(/[^\d.\-e]/.test(value) || Number((_value_match = value.match(/-/g)) === null || _value_match === void 0 ? void 0 : _value_match.length) > 2 || Number((_value_match1 = value.match(/\./g)) === null || _value_match1 === void 0 ? void 0 : _value_match1.length) > 1 || valueParts[1] && !/^-?\d*$/.test(valueParts[1]));
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/behavior/cut.js
  behavior.cut = (event, target, instance) => {
    return () => {
      if (isEditable(target)) {
        input(instance, target, "", "deleteByCut");
      }
    };
  };

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/document/getValueOrTextContent.js
  var import_helpers7 = __toESM(require_helpers(), 1);
  function getValueOrTextContent(element) {
    if (!element) {
      return null;
    }
    if (isContentEditable(element)) {
      return element.textContent;
    }
    return getUIValue(element);
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/misc/isVisible.js
  function isVisible(element) {
    const window2 = getWindow(element);
    for (let el = element; el === null || el === void 0 ? void 0 : el.ownerDocument; el = el.parentElement) {
      const { display, visibility } = window2.getComputedStyle(el);
      if (display === "none") {
        return false;
      }
      if (visibility === "hidden") {
        return false;
      }
    }
    return true;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/focus/getTabDestination.js
  function getTabDestination(activeElement, shift) {
    const document2 = activeElement.ownerDocument;
    const focusableElements = document2.querySelectorAll(FOCUSABLE_SELECTOR);
    const enabledElements = Array.from(focusableElements).filter((el) => el === activeElement || !(Number(el.getAttribute("tabindex")) < 0 || isDisabled(el)));
    if (Number(activeElement.getAttribute("tabindex")) >= 0) {
      enabledElements.sort((a, b) => {
        const i = Number(a.getAttribute("tabindex"));
        const j = Number(b.getAttribute("tabindex"));
        if (i === j) {
          return 0;
        } else if (i === 0) {
          return 1;
        } else if (j === 0) {
          return -1;
        }
        return i - j;
      });
    }
    const checkedRadio = {};
    let prunedElements = [
      document2.body
    ];
    const activeRadioGroup = isElementType(activeElement, "input", {
      type: "radio"
    }) ? activeElement.name : void 0;
    enabledElements.forEach((currentElement) => {
      const el = currentElement;
      if (isElementType(el, "input", {
        type: "radio"
      }) && el.name) {
        if (el === activeElement) {
          prunedElements.push(el);
          return;
        } else if (el.name === activeRadioGroup) {
          return;
        }
        if (el.checked) {
          prunedElements = prunedElements.filter((e) => !isElementType(e, "input", {
            type: "radio",
            name: el.name
          }));
          prunedElements.push(el);
          checkedRadio[el.name] = el;
          return;
        }
        if (typeof checkedRadio[el.name] !== "undefined") {
          return;
        }
      }
      prunedElements.push(el);
    });
    for (let index = prunedElements.findIndex((el) => el === activeElement); ; ) {
      index += shift ? -1 : 1;
      if (index === prunedElements.length) {
        index = 0;
      } else if (index === -1) {
        index = prunedElements.length - 1;
      }
      if (prunedElements[index] === activeElement || prunedElements[index] === document2.body || isVisible(prunedElements[index])) {
        return prunedElements[index];
      }
    }
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/behavior/keydown.js
  var import_helpers11 = __toESM(require_helpers(), 1);

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/selection/moveSelection.js
  var import_helpers8 = __toESM(require_helpers(), 1);
  function moveSelection(node, direction) {
    if (hasOwnSelection(node)) {
      const selection = getUISelection(node);
      setSelection({
        focusNode: node,
        focusOffset: selection.startOffset === selection.endOffset ? selection.focusOffset + direction : direction < 0 ? selection.startOffset : selection.endOffset
      });
    } else {
      const selection = node.ownerDocument.getSelection();
      if (!(selection === null || selection === void 0 ? void 0 : selection.focusNode)) {
        return;
      }
      if (selection.isCollapsed) {
        const nextPosition = getNextCursorPosition(selection.focusNode, selection.focusOffset, direction);
        if (nextPosition) {
          setSelection({
            focusNode: nextPosition.node,
            focusOffset: nextPosition.offset
          });
        }
      } else {
        selection[direction < 0 ? "collapseToStart" : "collapseToEnd"]();
      }
    }
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/selection/selectAll.js
  var import_helpers9 = __toESM(require_helpers(), 1);
  function selectAll(target) {
    if (hasOwnSelection(target)) {
      return setSelection({
        focusNode: target,
        anchorOffset: 0,
        focusOffset: getUIValue(target).length
      });
    }
    var _getContentEditable;
    const focusNode = (_getContentEditable = getContentEditable(target)) !== null && _getContentEditable !== void 0 ? _getContentEditable : target.ownerDocument.body;
    setSelection({
      focusNode,
      anchorOffset: 0,
      focusOffset: focusNode.childNodes.length
    });
  }
  function isAllSelected(target) {
    if (hasOwnSelection(target)) {
      return getUISelection(target).startOffset === 0 && getUISelection(target).endOffset === getUIValue(target).length;
    }
    var _getContentEditable;
    const focusNode = (_getContentEditable = getContentEditable(target)) !== null && _getContentEditable !== void 0 ? _getContentEditable : target.ownerDocument.body;
    const selection = target.ownerDocument.getSelection();
    return (selection === null || selection === void 0 ? void 0 : selection.anchorNode) === focusNode && selection.focusNode === focusNode && selection.anchorOffset === 0 && selection.focusOffset === focusNode.childNodes.length;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/selection/setSelectionRange.js
  var import_helpers10 = __toESM(require_helpers(), 1);
  function setSelectionRange(element, anchorOffset, focusOffset) {
    var _element_firstChild;
    if (hasOwnSelection(element)) {
      return setSelection({
        focusNode: element,
        anchorOffset,
        focusOffset
      });
    }
    if (isContentEditable(element) && ((_element_firstChild = element.firstChild) === null || _element_firstChild === void 0 ? void 0 : _element_firstChild.nodeType) === 3) {
      return setSelection({
        focusNode: element.firstChild,
        anchorOffset,
        focusOffset
      });
    }
    throw new Error("Not implemented. The result of this interaction is unreliable.");
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/radio.js
  function walkRadio(instance, el, direction) {
    const window2 = getWindow(el);
    const group = Array.from(el.ownerDocument.querySelectorAll(el.name ? `input[type="radio"][name="${window2.CSS.escape(el.name)}"]` : `input[type="radio"][name=""], input[type="radio"]:not([name])`));
    for (let i = group.findIndex((e) => e === el) + direction; ; i += direction) {
      if (!group[i]) {
        i = direction > 0 ? 0 : group.length - 1;
      }
      if (group[i] === el) {
        return;
      }
      if (isDisabled(group[i])) {
        continue;
      }
      focusElement(group[i]);
      instance.dispatchUIEvent(group[i], "click");
    }
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/behavior/keydown.js
  behavior.keydown = (event, target, instance) => {
    var _keydownBehavior_event_key;
    var _keydownBehavior_event_key1;
    return (_keydownBehavior_event_key1 = (_keydownBehavior_event_key = keydownBehavior[event.key]) === null || _keydownBehavior_event_key === void 0 ? void 0 : _keydownBehavior_event_key.call(keydownBehavior, event, target, instance)) !== null && _keydownBehavior_event_key1 !== void 0 ? _keydownBehavior_event_key1 : combinationBehavior(event, target, instance);
  };
  var keydownBehavior = {
    ArrowDown: (event, target, instance) => {
      if (isElementType(target, "input", {
        type: "radio"
      })) {
        return () => walkRadio(instance, target, -1);
      }
    },
    ArrowLeft: (event, target, instance) => {
      if (isElementType(target, "input", {
        type: "radio"
      })) {
        return () => walkRadio(instance, target, -1);
      }
      return () => moveSelection(target, -1);
    },
    ArrowRight: (event, target, instance) => {
      if (isElementType(target, "input", {
        type: "radio"
      })) {
        return () => walkRadio(instance, target, 1);
      }
      return () => moveSelection(target, 1);
    },
    ArrowUp: (event, target, instance) => {
      if (isElementType(target, "input", {
        type: "radio"
      })) {
        return () => walkRadio(instance, target, 1);
      }
    },
    Backspace: (event, target, instance) => {
      if (isEditable(target)) {
        return () => {
          input(instance, target, "", "deleteContentBackward");
        };
      }
    },
    Delete: (event, target, instance) => {
      if (isEditable(target)) {
        return () => {
          input(instance, target, "", "deleteContentForward");
        };
      }
    },
    End: (event, target) => {
      if (isElementType(target, [
        "input",
        "textarea"
      ]) || isContentEditable(target)) {
        return () => {
          var _getValueOrTextContent;
          var _getValueOrTextContent_length;
          const newPos = (_getValueOrTextContent_length = (_getValueOrTextContent = getValueOrTextContent(target)) === null || _getValueOrTextContent === void 0 ? void 0 : _getValueOrTextContent.length) !== null && _getValueOrTextContent_length !== void 0 ? _getValueOrTextContent_length : (
            /* istanbul ignore next */
            0
          );
          setSelectionRange(target, newPos, newPos);
        };
      }
    },
    Home: (event, target) => {
      if (isElementType(target, [
        "input",
        "textarea"
      ]) || isContentEditable(target)) {
        return () => {
          setSelectionRange(target, 0, 0);
        };
      }
    },
    PageDown: (event, target) => {
      if (isElementType(target, [
        "input"
      ])) {
        return () => {
          const newPos = getUIValue(target).length;
          setSelectionRange(target, newPos, newPos);
        };
      }
    },
    PageUp: (event, target) => {
      if (isElementType(target, [
        "input"
      ])) {
        return () => {
          setSelectionRange(target, 0, 0);
        };
      }
    },
    Tab: (event, target, instance) => {
      return () => {
        const dest = getTabDestination(target, instance.system.keyboard.modifiers.Shift);
        focusElement(dest);
        if (hasOwnSelection(dest)) {
          setUISelection(dest, {
            anchorOffset: 0,
            focusOffset: dest.value.length
          });
        }
      };
    }
  };
  var combinationBehavior = (event, target, instance) => {
    if (event.code === "KeyA" && instance.system.keyboard.modifiers.Control) {
      return () => selectAll(target);
    }
  };

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/behavior/keypress.js
  var import_helpers12 = __toESM(require_helpers(), 1);
  behavior.keypress = (event, target, instance) => {
    if (event.key === "Enter") {
      if (isElementType(target, "button") || isElementType(target, "input") && ClickInputOnEnter.includes(target.type) || isElementType(target, "a") && Boolean(target.href)) {
        return () => {
          instance.dispatchUIEvent(target, "click");
        };
      } else if (isElementType(target, "input")) {
        const form = target.form;
        const submit = form === null || form === void 0 ? void 0 : form.querySelector('input[type="submit"], button:not([type]), button[type="submit"]');
        if (submit) {
          return () => instance.dispatchUIEvent(submit, "click");
        } else if (form && SubmitSingleInputOnEnter.includes(target.type) && form.querySelectorAll("input").length === 1) {
          return () => instance.dispatchUIEvent(form, "submit");
        } else {
          return;
        }
      }
    }
    if (isEditable(target)) {
      const inputType = event.key === "Enter" ? isContentEditable(target) && !instance.system.keyboard.modifiers.Shift ? "insertParagraph" : "insertLineBreak" : "insertText";
      const inputData = event.key === "Enter" ? "\n" : event.key;
      return () => input(instance, target, inputData, inputType);
    }
  };
  var ClickInputOnEnter = [
    "button",
    "color",
    "file",
    "image",
    "reset",
    "submit"
  ];
  var SubmitSingleInputOnEnter = [
    "email",
    "month",
    "password",
    "search",
    "tel",
    "text",
    "url",
    "week"
  ];

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/behavior/keyup.js
  var import_helpers13 = __toESM(require_helpers(), 1);
  behavior.keyup = (event, target, instance) => {
    var _keyupBehavior_event_key;
    return (_keyupBehavior_event_key = keyupBehavior[event.key]) === null || _keyupBehavior_event_key === void 0 ? void 0 : _keyupBehavior_event_key.call(keyupBehavior, event, target, instance);
  };
  var keyupBehavior = {
    " ": (event, target, instance) => {
      if (isClickableInput(target)) {
        return () => instance.dispatchUIEvent(target, "click");
      }
    }
  };

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/behavior/paste.js
  var import_helpers14 = __toESM(require_helpers(), 1);
  behavior.paste = (event, target, instance) => {
    if (isEditable(target)) {
      return () => {
        var _event_clipboardData;
        const insertData = (_event_clipboardData = event.clipboardData) === null || _event_clipboardData === void 0 ? void 0 : _event_clipboardData.getData("text");
        if (insertData) {
          input(instance, target, insertData, "insertFromPaste");
        }
      };
    }
  };

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/eventMap.js
  var named2 = __toESM(require_event_map(), 1);
  var eventMap3 = {
    ...named2.eventMap,
    click: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    auxclick: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    contextmenu: {
      EventType: "PointerEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    beforeInput: {
      EventType: "InputEvent",
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    }
  };
  var eventMapKeys = Object.fromEntries(Object.keys(eventMap3).map((k) => [
    k.toLowerCase(),
    k
  ]));
  function getEventClass(type3) {
    const k = eventMapKeys[type3];
    return k && eventMap3[k].EventType;
  }
  var mouseEvents = [
    "MouseEvent",
    "PointerEvent"
  ];
  function isMouseEvent(type3) {
    return mouseEvents.includes(getEventClass(type3));
  }
  function isKeyboardEvent(type3) {
    return getEventClass(type3) === "KeyboardEvent";
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/createEvent.js
  var eventInitializer = {
    ClipboardEvent: [
      initClipboardEvent
    ],
    InputEvent: [
      initUIEvent,
      initInputEvent
    ],
    MouseEvent: [
      initUIEvent,
      initUIEventModififiers,
      initMouseEvent
    ],
    PointerEvent: [
      initUIEvent,
      initUIEventModififiers,
      initMouseEvent,
      initPointerEvent
    ],
    KeyboardEvent: [
      initUIEvent,
      initUIEventModififiers,
      initKeyboardEvent
    ]
  };
  function createEvent2(type3, target, init) {
    var _eventInitializer_EventType;
    const window2 = getWindow(target);
    const { EventType, defaultInit } = eventMap3[eventMapKeys[type3]];
    const event = new (getEventConstructors(window2))[EventType](type3, defaultInit);
    (_eventInitializer_EventType = eventInitializer[EventType]) === null || _eventInitializer_EventType === void 0 ? void 0 : _eventInitializer_EventType.forEach((f) => f(event, init !== null && init !== void 0 ? init : {}));
    return event;
  }
  function getEventConstructors(window2) {
    var _window_Event;
    const Event = (_window_Event = window2.Event) !== null && _window_Event !== void 0 ? _window_Event : class Event {
    };
    var _window_AnimationEvent;
    const AnimationEvent = (_window_AnimationEvent = window2.AnimationEvent) !== null && _window_AnimationEvent !== void 0 ? _window_AnimationEvent : class AnimationEvent extends Event {
    };
    var _window_ClipboardEvent;
    const ClipboardEvent = (_window_ClipboardEvent = window2.ClipboardEvent) !== null && _window_ClipboardEvent !== void 0 ? _window_ClipboardEvent : class ClipboardEvent extends Event {
    };
    var _window_PopStateEvent;
    const PopStateEvent = (_window_PopStateEvent = window2.PopStateEvent) !== null && _window_PopStateEvent !== void 0 ? _window_PopStateEvent : class PopStateEvent extends Event {
    };
    var _window_ProgressEvent;
    const ProgressEvent = (_window_ProgressEvent = window2.ProgressEvent) !== null && _window_ProgressEvent !== void 0 ? _window_ProgressEvent : class ProgressEvent extends Event {
    };
    var _window_TransitionEvent;
    const TransitionEvent = (_window_TransitionEvent = window2.TransitionEvent) !== null && _window_TransitionEvent !== void 0 ? _window_TransitionEvent : class TransitionEvent extends Event {
    };
    var _window_UIEvent;
    const UIEvent = (_window_UIEvent = window2.UIEvent) !== null && _window_UIEvent !== void 0 ? _window_UIEvent : class UIEvent extends Event {
    };
    var _window_CompositionEvent;
    const CompositionEvent = (_window_CompositionEvent = window2.CompositionEvent) !== null && _window_CompositionEvent !== void 0 ? _window_CompositionEvent : class CompositionEvent extends UIEvent {
    };
    var _window_FocusEvent;
    const FocusEvent = (_window_FocusEvent = window2.FocusEvent) !== null && _window_FocusEvent !== void 0 ? _window_FocusEvent : class FocusEvent extends UIEvent {
    };
    var _window_InputEvent;
    const InputEvent = (_window_InputEvent = window2.InputEvent) !== null && _window_InputEvent !== void 0 ? _window_InputEvent : class InputEvent extends UIEvent {
    };
    var _window_KeyboardEvent;
    const KeyboardEvent = (_window_KeyboardEvent = window2.KeyboardEvent) !== null && _window_KeyboardEvent !== void 0 ? _window_KeyboardEvent : class KeyboardEvent extends UIEvent {
    };
    var _window_MouseEvent;
    const MouseEvent = (_window_MouseEvent = window2.MouseEvent) !== null && _window_MouseEvent !== void 0 ? _window_MouseEvent : class MouseEvent extends UIEvent {
    };
    var _window_DragEvent;
    const DragEvent = (_window_DragEvent = window2.DragEvent) !== null && _window_DragEvent !== void 0 ? _window_DragEvent : class DragEvent extends MouseEvent {
    };
    var _window_PointerEvent;
    const PointerEvent = (_window_PointerEvent = window2.PointerEvent) !== null && _window_PointerEvent !== void 0 ? _window_PointerEvent : class PointerEvent extends MouseEvent {
    };
    var _window_TouchEvent;
    const TouchEvent = (_window_TouchEvent = window2.TouchEvent) !== null && _window_TouchEvent !== void 0 ? _window_TouchEvent : class TouchEvent extends UIEvent {
    };
    return {
      Event,
      AnimationEvent,
      ClipboardEvent,
      PopStateEvent,
      ProgressEvent,
      TransitionEvent,
      UIEvent,
      CompositionEvent,
      FocusEvent,
      InputEvent,
      KeyboardEvent,
      MouseEvent,
      DragEvent,
      PointerEvent,
      TouchEvent
    };
  }
  function assignProps(obj, props) {
    for (const [key, value] of Object.entries(props)) {
      Object.defineProperty(obj, key, {
        get: () => value !== null && value !== void 0 ? value : null
      });
    }
  }
  function sanitizeNumber(n) {
    return Number(n !== null && n !== void 0 ? n : 0);
  }
  function initClipboardEvent(event, { clipboardData }) {
    assignProps(event, {
      clipboardData
    });
  }
  function initInputEvent(event, { data, inputType, isComposing }) {
    assignProps(event, {
      data,
      isComposing: Boolean(isComposing),
      inputType: String(inputType)
    });
  }
  function initUIEvent(event, { view, detail }) {
    assignProps(event, {
      view,
      detail: sanitizeNumber(detail !== null && detail !== void 0 ? detail : 0)
    });
  }
  function initUIEventModififiers(event, { altKey, ctrlKey, metaKey, shiftKey, modifierAltGraph, modifierCapsLock, modifierFn, modifierFnLock, modifierNumLock, modifierScrollLock, modifierSymbol, modifierSymbolLock }) {
    assignProps(event, {
      altKey: Boolean(altKey),
      ctrlKey: Boolean(ctrlKey),
      metaKey: Boolean(metaKey),
      shiftKey: Boolean(shiftKey),
      getModifierState(k) {
        return Boolean({
          Alt: altKey,
          AltGraph: modifierAltGraph,
          CapsLock: modifierCapsLock,
          Control: ctrlKey,
          Fn: modifierFn,
          FnLock: modifierFnLock,
          Meta: metaKey,
          NumLock: modifierNumLock,
          ScrollLock: modifierScrollLock,
          Shift: shiftKey,
          Symbol: modifierSymbol,
          SymbolLock: modifierSymbolLock
        }[k]);
      }
    });
  }
  function initKeyboardEvent(event, { key, code, location, repeat, isComposing, charCode }) {
    assignProps(event, {
      key: String(key),
      code: String(code),
      location: sanitizeNumber(location),
      repeat: Boolean(repeat),
      isComposing: Boolean(isComposing),
      charCode
    });
  }
  function initMouseEvent(event, { x, y, screenX, screenY, clientX = x, clientY = y, button, buttons, relatedTarget }) {
    assignProps(event, {
      screenX: sanitizeNumber(screenX),
      screenY: sanitizeNumber(screenY),
      clientX: sanitizeNumber(clientX),
      x: sanitizeNumber(clientX),
      clientY: sanitizeNumber(clientY),
      y: sanitizeNumber(clientY),
      button: sanitizeNumber(button),
      buttons: sanitizeNumber(buttons),
      relatedTarget
    });
  }
  function initPointerEvent(event, { pointerId, width, height, pressure, tangentialPressure, tiltX, tiltY, twist, pointerType, isPrimary }) {
    assignProps(event, {
      pointerId: sanitizeNumber(pointerId),
      width: sanitizeNumber(width),
      height: sanitizeNumber(height),
      pressure: sanitizeNumber(pressure),
      tangentialPressure: sanitizeNumber(tangentialPressure),
      tiltX: sanitizeNumber(tiltX),
      tiltY: sanitizeNumber(tiltY),
      twist: sanitizeNumber(twist),
      pointerType: String(pointerType),
      isPrimary: Boolean(isPrimary)
    });
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/dispatchEvent.js
  function dispatchUIEvent(target, type3, init, preventDefault = false) {
    if (isMouseEvent(type3) || isKeyboardEvent(type3)) {
      init = {
        ...init,
        ...this.system.getUIEventModifiers()
      };
    }
    const event = createEvent2(type3, target, init);
    return dispatchEvent.call(this, target, event, preventDefault);
  }
  function dispatchEvent(target, event, preventDefault = false) {
    var _behavior_type;
    const type3 = event.type;
    const behaviorImplementation = preventDefault ? () => {
    } : (_behavior_type = behavior[type3]) === null || _behavior_type === void 0 ? void 0 : _behavior_type.call(behavior, event, target, this);
    if (behaviorImplementation) {
      event.preventDefault();
      let defaultPrevented = false;
      Object.defineProperty(event, "defaultPrevented", {
        get: () => defaultPrevented
      });
      Object.defineProperty(event, "preventDefault", {
        value: () => {
          defaultPrevented = event.cancelable;
        }
      });
      wrapEvent(() => target.dispatchEvent(event));
      if (!defaultPrevented) {
        behaviorImplementation();
      }
      return !defaultPrevented;
    }
    return wrapEvent(() => target.dispatchEvent(event));
  }
  function dispatchDOMEvent(target, type3, init) {
    const event = createEvent2(type3, target, init);
    wrapEvent(() => target.dispatchEvent(event));
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/document/prepareDocument.js
  var import_helpers16 = __toESM(require_helpers(), 1);

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/document/interceptor.js
  var import_helpers15 = __toESM(require_helpers(), 1);
  var Interceptor = Symbol("Interceptor for programmatical calls");
  function prepareInterceptor(element, propName, interceptorImpl) {
    const prototypeDescriptor = Object.getOwnPropertyDescriptor(element.constructor.prototype, propName);
    const objectDescriptor = Object.getOwnPropertyDescriptor(element, propName);
    const target = (prototypeDescriptor === null || prototypeDescriptor === void 0 ? void 0 : prototypeDescriptor.set) ? "set" : "value";
    if (typeof (prototypeDescriptor === null || prototypeDescriptor === void 0 ? void 0 : prototypeDescriptor[target]) !== "function" || prototypeDescriptor[target][Interceptor]) {
      throw new Error(`Element ${element.tagName} does not implement "${String(propName)}".`);
    }
    function intercept(...args) {
      const { applyNative = false, realArgs, then } = interceptorImpl.call(this, ...args);
      const realFunc = (!applyNative && objectDescriptor || prototypeDescriptor)[target];
      if (target === "set") {
        realFunc.call(this, realArgs);
      } else {
        realFunc.call(this, ...realArgs);
      }
      then === null || then === void 0 ? void 0 : then();
    }
    intercept[Interceptor] = Interceptor;
    Object.defineProperty(element, propName, {
      ...objectDescriptor !== null && objectDescriptor !== void 0 ? objectDescriptor : prototypeDescriptor,
      [target]: intercept
    });
  }
  function prepareValueInterceptor(element) {
    prepareInterceptor(element, "value", function interceptorImpl(v) {
      const isUI = isUIValue(v);
      if (isUI) {
        startTrackValue(this);
      }
      return {
        applyNative: !!isUI,
        realArgs: sanitizeValue(this, v),
        then: isUI ? void 0 : () => trackOrSetValue(this, String(v))
      };
    });
  }
  function sanitizeValue(element, v) {
    if (isElementType(element, "input", {
      type: "number"
    }) && String(v) !== "" && !Number.isNaN(Number(v))) {
      return String(Number(v));
    }
    return String(v);
  }
  function prepareSelectionInterceptor(element) {
    prepareInterceptor(element, "setSelectionRange", function interceptorImpl(start, ...others) {
      const isUI = isUISelectionStart(start);
      return {
        applyNative: !!isUI,
        realArgs: [
          Number(start),
          ...others
        ],
        then: () => isUI ? void 0 : setUISelectionClean(element)
      };
    });
    prepareInterceptor(element, "selectionStart", function interceptorImpl(v) {
      return {
        realArgs: v,
        then: () => setUISelectionClean(element)
      };
    });
    prepareInterceptor(element, "selectionEnd", function interceptorImpl(v) {
      return {
        realArgs: v,
        then: () => setUISelectionClean(element)
      };
    });
    prepareInterceptor(element, "select", function interceptorImpl() {
      return {
        realArgs: [],
        then: () => setUISelectionRaw(element, {
          anchorOffset: 0,
          focusOffset: getUIValue(element).length
        })
      };
    });
  }
  function prepareRangeTextInterceptor(element) {
    prepareInterceptor(element, "setRangeText", function interceptorImpl(...realArgs) {
      return {
        realArgs,
        then: () => {
          setUIValueClean(element);
          setUISelectionClean(element);
        }
      };
    });
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/document/prepareDocument.js
  var isPrepared = Symbol("Node prepared with document state workarounds");
  function prepareDocument(document2) {
    if (document2[isPrepared]) {
      return;
    }
    document2.addEventListener("focus", (e) => {
      const el = e.target;
      prepareElement(el);
    }, {
      capture: true,
      passive: true
    });
    if (document2.activeElement) {
      prepareElement(document2.activeElement);
    }
    document2.addEventListener("blur", (e) => {
      const el = e.target;
      const initialValue2 = getInitialValue(el);
      if (initialValue2 !== void 0) {
        if (el.value !== initialValue2) {
          dispatchDOMEvent(el, "change");
        }
        clearInitialValue(el);
      }
    }, {
      capture: true,
      passive: true
    });
    document2[isPrepared] = isPrepared;
  }
  function prepareElement(el) {
    if (el[isPrepared]) {
      return;
    }
    if (isElementType(el, [
      "input",
      "textarea"
    ])) {
      prepareValueInterceptor(el);
      prepareSelectionInterceptor(el);
      prepareRangeTextInterceptor(el);
    }
    el[isPrepared] = isPrepared;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/setup/setup.js
  var import_helpers33 = __toESM(require_helpers(), 1);

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/misc/getDocumentFromNode.js
  function getDocumentFromNode(el) {
    return isDocument(el) ? el : el.ownerDocument;
  }
  function isDocument(node) {
    return node.nodeType === 9;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/misc/wait.js
  function wait(config2) {
    const delay = config2.delay;
    if (typeof delay !== "number") {
      return;
    }
    return Promise.all([
      new Promise((resolve) => globalThis.setTimeout(() => resolve(), delay)),
      config2.advanceTimers(delay)
    ]);
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/system/keyboard.js
  var import_helpers17 = __toESM(require_helpers(), 1);
  function _define_property3(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var DOM_KEY_LOCATION;
  (function(DOM_KEY_LOCATION2) {
    DOM_KEY_LOCATION2[DOM_KEY_LOCATION2["STANDARD"] = 0] = "STANDARD";
    DOM_KEY_LOCATION2[DOM_KEY_LOCATION2["LEFT"] = 1] = "LEFT";
    DOM_KEY_LOCATION2[DOM_KEY_LOCATION2["RIGHT"] = 2] = "RIGHT";
    DOM_KEY_LOCATION2[DOM_KEY_LOCATION2["NUMPAD"] = 3] = "NUMPAD";
  })(DOM_KEY_LOCATION || (DOM_KEY_LOCATION = {}));
  var modifierKeys = [
    "Alt",
    "AltGraph",
    "Control",
    "Fn",
    "Meta",
    "Shift",
    "Symbol"
  ];
  function isModifierKey(key) {
    return modifierKeys.includes(key);
  }
  var modifierLocks = [
    "CapsLock",
    "FnLock",
    "NumLock",
    "ScrollLock",
    "SymbolLock"
  ];
  function isModifierLock(key) {
    return modifierLocks.includes(key);
  }
  var KeyboardHost = class {
    isKeyPressed(keyDef) {
      return !!this.pressed[String(keyDef.code)];
    }
    getPressedKeys() {
      return Object.values(this.pressed).map((p) => p.keyDef);
    }
    /** Press a key */
    async keydown(instance, keyDef) {
      var _this_pressed, _code, _this_pressed_code;
      const key = String(keyDef.key);
      const code = String(keyDef.code);
      const target = getActiveElementOrBody(instance.config.document);
      this.setKeydownTarget(target);
      var _;
      (_ = (_this_pressed = this.pressed)[_code = code]) !== null && _ !== void 0 ? _ : _this_pressed[_code] = {
        keyDef,
        unpreventedDefault: false
      };
      if (isModifierKey(key)) {
        this.modifiers[key] = true;
      }
      const unprevented = instance.dispatchUIEvent(target, "keydown", {
        key,
        code
      });
      if (isModifierLock(key) && !this.modifiers[key]) {
        this.modifiers[key] = true;
        this.modifierLockStart[key] = true;
      }
      (_this_pressed_code = this.pressed[code]).unpreventedDefault || (_this_pressed_code.unpreventedDefault = unprevented);
      if (unprevented && this.hasKeyPress(key)) {
        instance.dispatchUIEvent(getActiveElementOrBody(instance.config.document), "keypress", {
          key,
          code,
          charCode: keyDef.key === "Enter" ? 13 : String(keyDef.key).charCodeAt(0)
        });
      }
    }
    /** Release a key */
    async keyup(instance, keyDef) {
      const key = String(keyDef.key);
      const code = String(keyDef.code);
      const unprevented = this.pressed[code].unpreventedDefault;
      delete this.pressed[code];
      if (isModifierKey(key) && !Object.values(this.pressed).find((p) => p.keyDef.key === key)) {
        this.modifiers[key] = false;
      }
      instance.dispatchUIEvent(getActiveElementOrBody(instance.config.document), "keyup", {
        key,
        code
      }, !unprevented);
      if (isModifierLock(key) && this.modifiers[key]) {
        if (this.modifierLockStart[key]) {
          this.modifierLockStart[key] = false;
        } else {
          this.modifiers[key] = false;
        }
      }
    }
    setKeydownTarget(target) {
      if (target !== this.lastKeydownTarget) {
        this.carryChar = "";
      }
      this.lastKeydownTarget = target;
    }
    hasKeyPress(key) {
      return (key.length === 1 || key === "Enter") && !this.modifiers.Control && !this.modifiers.Alt;
    }
    constructor(system) {
      _define_property3(this, "system", void 0);
      _define_property3(this, "modifiers", {
        Alt: false,
        AltGraph: false,
        CapsLock: false,
        Control: false,
        Fn: false,
        FnLock: false,
        Meta: false,
        NumLock: false,
        ScrollLock: false,
        Shift: false,
        Symbol: false,
        SymbolLock: false
      });
      _define_property3(this, "pressed", {});
      _define_property3(this, "carryChar", "");
      _define_property3(this, "lastKeydownTarget", void 0);
      _define_property3(this, "modifierLockStart", {});
      this.system = system;
    }
  };

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/keyboard/keyMap.js
  var defaultKeyMap = [
    // alphanumeric keys
    ..."0123456789".split("").map((c) => ({
      code: `Digit${c}`,
      key: c
    })),
    ...")!@#$%^&*(".split("").map((c, i) => ({
      code: `Digit${i}`,
      key: c,
      shiftKey: true
    })),
    ..."abcdefghijklmnopqrstuvwxyz".split("").map((c) => ({
      code: `Key${c.toUpperCase()}`,
      key: c
    })),
    ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((c) => ({
      code: `Key${c}`,
      key: c,
      shiftKey: true
    })),
    // alphanumeric block - functional
    {
      code: "Space",
      key: " "
    },
    {
      code: "AltLeft",
      key: "Alt",
      location: DOM_KEY_LOCATION.LEFT
    },
    {
      code: "AltRight",
      key: "Alt",
      location: DOM_KEY_LOCATION.RIGHT
    },
    {
      code: "ShiftLeft",
      key: "Shift",
      location: DOM_KEY_LOCATION.LEFT
    },
    {
      code: "ShiftRight",
      key: "Shift",
      location: DOM_KEY_LOCATION.RIGHT
    },
    {
      code: "ControlLeft",
      key: "Control",
      location: DOM_KEY_LOCATION.LEFT
    },
    {
      code: "ControlRight",
      key: "Control",
      location: DOM_KEY_LOCATION.RIGHT
    },
    {
      code: "MetaLeft",
      key: "Meta",
      location: DOM_KEY_LOCATION.LEFT
    },
    {
      code: "MetaRight",
      key: "Meta",
      location: DOM_KEY_LOCATION.RIGHT
    },
    {
      code: "OSLeft",
      key: "OS",
      location: DOM_KEY_LOCATION.LEFT
    },
    {
      code: "OSRight",
      key: "OS",
      location: DOM_KEY_LOCATION.RIGHT
    },
    {
      code: "Tab",
      key: "Tab"
    },
    {
      code: "CapsLock",
      key: "CapsLock"
    },
    {
      code: "Backspace",
      key: "Backspace"
    },
    {
      code: "Enter",
      key: "Enter"
    },
    // function
    {
      code: "Escape",
      key: "Escape"
    },
    // arrows
    {
      code: "ArrowUp",
      key: "ArrowUp"
    },
    {
      code: "ArrowDown",
      key: "ArrowDown"
    },
    {
      code: "ArrowLeft",
      key: "ArrowLeft"
    },
    {
      code: "ArrowRight",
      key: "ArrowRight"
    },
    // control pad
    {
      code: "Home",
      key: "Home"
    },
    {
      code: "End",
      key: "End"
    },
    {
      code: "Delete",
      key: "Delete"
    },
    {
      code: "PageUp",
      key: "PageUp"
    },
    {
      code: "PageDown",
      key: "PageDown"
    },
    // Special keys that are not part of a default US-layout but included for specific behavior
    {
      code: "Fn",
      key: "Fn"
    },
    {
      code: "Symbol",
      key: "Symbol"
    },
    {
      code: "AltRight",
      key: "AltGraph"
    }
  ];

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/pointer/keyMap.js
  var defaultKeyMap2 = [
    {
      name: "MouseLeft",
      pointerType: "mouse",
      button: "primary"
    },
    {
      name: "MouseRight",
      pointerType: "mouse",
      button: "secondary"
    },
    {
      name: "MouseMiddle",
      pointerType: "mouse",
      button: "auxiliary"
    },
    {
      name: "TouchA",
      pointerType: "touch"
    },
    {
      name: "TouchB",
      pointerType: "touch"
    },
    {
      name: "TouchC",
      pointerType: "touch"
    }
  ];

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/system/pointer/buttons.js
  function _define_property4(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var Buttons = class {
    getButtons() {
      let v = 0;
      for (const button of Object.keys(this.pressed)) {
        v |= 2 ** Number(button);
      }
      return v;
    }
    down(keyDef) {
      const button = getMouseButtonId(keyDef.button);
      if (button in this.pressed) {
        this.pressed[button].push(keyDef);
        return void 0;
      }
      this.pressed[button] = [
        keyDef
      ];
      return button;
    }
    up(keyDef) {
      const button = getMouseButtonId(keyDef.button);
      if (button in this.pressed) {
        this.pressed[button] = this.pressed[button].filter((k) => k.name !== keyDef.name);
        if (this.pressed[button].length === 0) {
          delete this.pressed[button];
          return button;
        }
      }
      return void 0;
    }
    constructor() {
      _define_property4(this, "pressed", {});
    }
  };
  var MouseButton = {
    primary: 0,
    secondary: 1,
    auxiliary: 2,
    back: 3,
    X1: 3,
    forward: 4,
    X2: 4
  };
  function getMouseButtonId(button = 0) {
    if (button in MouseButton) {
      return MouseButton[button];
    }
    return Number(button);
  }
  var MouseButtonFlip = {
    1: 2,
    2: 1
  };
  function getMouseEventButton(button) {
    button = getMouseButtonId(button);
    if (button in MouseButtonFlip) {
      return MouseButtonFlip[button];
    }
    return button;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/system/pointer/device.js
  function _define_property5(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var Device = class {
    get countPressed() {
      return this.pressedKeys.size;
    }
    isPressed(keyDef) {
      return this.pressedKeys.has(keyDef.name);
    }
    addPressed(keyDef) {
      return this.pressedKeys.add(keyDef.name);
    }
    removePressed(keyDef) {
      return this.pressedKeys.delete(keyDef.name);
    }
    constructor() {
      _define_property5(this, "pressedKeys", /* @__PURE__ */ new Set());
    }
  };

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/system/pointer/mouse.js
  var import_helpers21 = __toESM(require_helpers(), 1);

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/misc/getTreeDiff.js
  function getTreeDiff(a, b) {
    const treeA = [];
    for (let el = a; el; el = el.parentElement) {
      treeA.push(el);
    }
    const treeB = [];
    for (let el = b; el; el = el.parentElement) {
      treeB.push(el);
    }
    let i = 0;
    for (; ; i++) {
      if (i >= treeA.length || i >= treeB.length || treeA[treeA.length - 1 - i] !== treeB[treeB.length - 1 - i]) {
        break;
      }
    }
    return [
      treeA.slice(0, treeA.length - i),
      treeB.slice(0, treeB.length - i),
      treeB.slice(treeB.length - i)
    ];
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/selection/setSelectionPerMouse.js
  var import_helpers19 = __toESM(require_helpers(), 1);

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/selection/resolveCaretPosition.js
  var import_helpers18 = __toESM(require_helpers(), 1);
  function resolveCaretPosition({ target, node, offset }) {
    if (hasOwnSelection(target)) {
      return {
        node: target,
        offset: offset !== null && offset !== void 0 ? offset : getUIValue(target).length
      };
    } else if (node) {
      return {
        node,
        offset: offset !== null && offset !== void 0 ? offset : node.nodeType === 3 ? node.nodeValue.length : node.childNodes.length
      };
    }
    return findNodeAtTextOffset(target, offset);
  }
  function findNodeAtTextOffset(node, offset, isRoot = true) {
    let i = offset === void 0 ? node.childNodes.length - 1 : 0;
    const step = offset === void 0 ? -1 : 1;
    while (offset === void 0 ? i >= (isRoot ? Math.max(node.childNodes.length - 1, 0) : 0) : i <= node.childNodes.length) {
      if (offset && i === node.childNodes.length) {
        throw new Error("The given offset is out of bounds.");
      }
      const c = node.childNodes.item(i);
      const text = String(c.textContent);
      if (text.length) {
        if (offset !== void 0 && text.length < offset) {
          offset -= text.length;
        } else if (c.nodeType === 1) {
          return findNodeAtTextOffset(c, offset, false);
        } else {
          if (c.nodeType === 3) {
            return {
              node: c,
              offset: offset !== null && offset !== void 0 ? offset : c.nodeValue.length
            };
          }
        }
      }
      i += step;
    }
    return {
      node,
      offset: node.childNodes.length
    };
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/selection/setSelectionPerMouse.js
  function setSelectionPerMouseDown({ document: document2, target, clickCount, node, offset }) {
    if (hasNoSelection(target)) {
      return;
    }
    const targetHasOwnSelection = hasOwnSelection(target);
    const text = String(targetHasOwnSelection ? getUIValue(target) : target.textContent);
    const [start, end] = node ? (
      // which elements might be considered in the same line of text.
      // TODO: support expanding initial range on multiple clicks if node is given
      [
        offset,
        offset
      ]
    ) : getTextRange(text, offset, clickCount);
    if (targetHasOwnSelection) {
      setUISelection(target, {
        anchorOffset: start !== null && start !== void 0 ? start : text.length,
        focusOffset: end !== null && end !== void 0 ? end : text.length
      });
      return {
        node: target,
        start: start !== null && start !== void 0 ? start : 0,
        end: end !== null && end !== void 0 ? end : text.length
      };
    } else {
      const { node: startNode, offset: startOffset } = resolveCaretPosition({
        target,
        node,
        offset: start
      });
      const { node: endNode, offset: endOffset } = resolveCaretPosition({
        target,
        node,
        offset: end
      });
      const range = target.ownerDocument.createRange();
      try {
        range.setStart(startNode, startOffset);
        range.setEnd(endNode, endOffset);
      } catch (e) {
        throw new Error("The given offset is out of bounds.");
      }
      const selection = document2.getSelection();
      selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
      selection === null || selection === void 0 ? void 0 : selection.addRange(range.cloneRange());
      return range;
    }
  }
  function getTextRange(text, pos, clickCount) {
    if (clickCount % 3 === 1 || text.length === 0) {
      return [
        pos,
        pos
      ];
    }
    const textPos = pos !== null && pos !== void 0 ? pos : text.length;
    if (clickCount % 3 === 2) {
      return [
        textPos - text.substr(0, pos).match(/(\w+|\s+|\W)?$/)[0].length,
        pos === void 0 ? pos : pos + text.substr(pos).match(/^(\w+|\s+|\W)?/)[0].length
      ];
    }
    return [
      textPos - text.substr(0, pos).match(/[^\r\n]*$/)[0].length,
      pos === void 0 ? pos : pos + text.substr(pos).match(/^[^\r\n]*/)[0].length
    ];
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/event/selection/modifySelectionPerMouse.js
  var import_helpers20 = __toESM(require_helpers(), 1);
  function modifySelectionPerMouseMove(selectionRange, { document: document2, target, node, offset }) {
    const selectionFocus = resolveCaretPosition({
      target,
      node,
      offset
    });
    if ("node" in selectionRange) {
      if (selectionFocus.node === selectionRange.node) {
        const anchorOffset = selectionFocus.offset < selectionRange.start ? selectionRange.end : selectionRange.start;
        const focusOffset = selectionFocus.offset > selectionRange.end || selectionFocus.offset < selectionRange.start ? selectionFocus.offset : selectionRange.end;
        setUISelection(selectionRange.node, {
          anchorOffset,
          focusOffset
        });
      }
    } else {
      const range = selectionRange.cloneRange();
      const cmp = range.comparePoint(selectionFocus.node, selectionFocus.offset);
      if (cmp < 0) {
        range.setStart(selectionFocus.node, selectionFocus.offset);
      } else if (cmp > 0) {
        range.setEnd(selectionFocus.node, selectionFocus.offset);
      }
      const selection = document2.getSelection();
      selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
      selection === null || selection === void 0 ? void 0 : selection.addRange(range.cloneRange());
    }
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/system/pointer/shared.js
  function isDifferentPointerPosition(positionA, positionB) {
    var _positionA_coords, _positionB_coords, _positionA_coords1, _positionB_coords1, _positionA_caret, _positionB_caret, _positionA_caret1, _positionB_caret1;
    return positionA.target !== positionB.target || ((_positionA_coords = positionA.coords) === null || _positionA_coords === void 0 ? void 0 : _positionA_coords.x) !== ((_positionB_coords = positionB.coords) === null || _positionB_coords === void 0 ? void 0 : _positionB_coords.y) || ((_positionA_coords1 = positionA.coords) === null || _positionA_coords1 === void 0 ? void 0 : _positionA_coords1.y) !== ((_positionB_coords1 = positionB.coords) === null || _positionB_coords1 === void 0 ? void 0 : _positionB_coords1.y) || ((_positionA_caret = positionA.caret) === null || _positionA_caret === void 0 ? void 0 : _positionA_caret.node) !== ((_positionB_caret = positionB.caret) === null || _positionB_caret === void 0 ? void 0 : _positionB_caret.node) || ((_positionA_caret1 = positionA.caret) === null || _positionA_caret1 === void 0 ? void 0 : _positionA_caret1.offset) !== ((_positionB_caret1 = positionB.caret) === null || _positionB_caret1 === void 0 ? void 0 : _positionB_caret1.offset);
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/system/pointer/mouse.js
  function _define_property6(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var Mouse = class {
    move(instance, position) {
      const prevPosition = this.position;
      const prevTarget = this.getTarget(instance);
      this.position = position;
      if (!isDifferentPointerPosition(prevPosition, position)) {
        return;
      }
      const nextTarget = this.getTarget(instance);
      const init = this.getEventInit("mousemove");
      const [leave, enter] = getTreeDiff(prevTarget, nextTarget);
      return {
        leave: () => {
          if (prevTarget !== nextTarget) {
            instance.dispatchUIEvent(prevTarget, "mouseout", init);
            leave.forEach((el) => instance.dispatchUIEvent(el, "mouseleave", init));
          }
        },
        enter: () => {
          if (prevTarget !== nextTarget) {
            instance.dispatchUIEvent(nextTarget, "mouseover", init);
            enter.forEach((el) => instance.dispatchUIEvent(el, "mouseenter", init));
          }
        },
        move: () => {
          instance.dispatchUIEvent(nextTarget, "mousemove", init);
          this.modifySelecting(instance);
        }
      };
    }
    down(instance, keyDef, pointer3) {
      const button = this.buttons.down(keyDef);
      if (button === void 0) {
        return;
      }
      const target = this.getTarget(instance);
      this.buttonDownTarget[button] = target;
      const disabled = isDisabled(target);
      const init = this.getEventInit("mousedown", keyDef.button);
      if (disabled || instance.dispatchUIEvent(target, "mousedown", init)) {
        this.startSelecting(instance, init.detail);
        focusElement(target);
      }
      if (!disabled && getMouseEventButton(keyDef.button) === 2) {
        instance.dispatchUIEvent(target, "contextmenu", this.getEventInit("contextmenu", keyDef.button, pointer3));
      }
    }
    up(instance, keyDef, pointer3) {
      const button = this.buttons.up(keyDef);
      if (button === void 0) {
        return;
      }
      const target = this.getTarget(instance);
      if (!isDisabled(target)) {
        instance.dispatchUIEvent(target, "mouseup", this.getEventInit("mouseup", keyDef.button));
        this.endSelecting();
        const clickTarget = getTreeDiff(this.buttonDownTarget[button], target)[2][0];
        if (clickTarget) {
          const init = this.getEventInit("click", keyDef.button, pointer3);
          if (init.detail) {
            instance.dispatchUIEvent(clickTarget, init.button === 0 ? "click" : "auxclick", init);
            if (init.button === 0 && init.detail === 2) {
              instance.dispatchUIEvent(clickTarget, "dblclick", {
                ...this.getEventInit("dblclick", keyDef.button),
                detail: init.detail
              });
            }
          }
        }
      }
    }
    resetClickCount() {
      this.clickCount.reset();
    }
    getEventInit(type3, button, pointer3) {
      const init = {
        ...this.position.coords
      };
      if (pointer3) {
        init.pointerId = pointer3.pointerId;
        init.pointerType = pointer3.pointerType;
        init.isPrimary = pointer3.isPrimary;
      }
      init.button = getMouseEventButton(button);
      init.buttons = this.buttons.getButtons();
      if (type3 === "mousedown") {
        init.detail = this.clickCount.getOnDown(init.button);
      } else if (type3 === "mouseup") {
        init.detail = this.clickCount.getOnUp(init.button);
      } else if (type3 === "click" || type3 === "auxclick") {
        init.detail = this.clickCount.incOnClick(init.button);
      }
      return init;
    }
    getTarget(instance) {
      var _this_position_target;
      return (_this_position_target = this.position.target) !== null && _this_position_target !== void 0 ? _this_position_target : instance.config.document.body;
    }
    startSelecting(instance, clickCount) {
      var _this_position_caret, _this_position_caret1;
      this.selecting = setSelectionPerMouseDown({
        document: instance.config.document,
        target: this.getTarget(instance),
        node: (_this_position_caret = this.position.caret) === null || _this_position_caret === void 0 ? void 0 : _this_position_caret.node,
        offset: (_this_position_caret1 = this.position.caret) === null || _this_position_caret1 === void 0 ? void 0 : _this_position_caret1.offset,
        clickCount
      });
    }
    modifySelecting(instance) {
      var _this_position_caret, _this_position_caret1;
      if (!this.selecting) {
        return;
      }
      modifySelectionPerMouseMove(this.selecting, {
        document: instance.config.document,
        target: this.getTarget(instance),
        node: (_this_position_caret = this.position.caret) === null || _this_position_caret === void 0 ? void 0 : _this_position_caret.node,
        offset: (_this_position_caret1 = this.position.caret) === null || _this_position_caret1 === void 0 ? void 0 : _this_position_caret1.offset
      });
    }
    endSelecting() {
      this.selecting = void 0;
    }
    constructor() {
      _define_property6(this, "position", {});
      _define_property6(this, "buttons", new Buttons());
      _define_property6(this, "selecting", void 0);
      _define_property6(this, "buttonDownTarget", {});
      _define_property6(this, "clickCount", new class {
        incOnClick(button) {
          const current = this.down[button] === void 0 ? void 0 : Number(this.down[button]) + 1;
          this.count = this.count[button] === void 0 ? {} : {
            [button]: Number(this.count[button]) + 1
          };
          return current;
        }
        getOnDown(button) {
          var _this_count_button;
          this.down = {
            [button]: (_this_count_button = this.count[button]) !== null && _this_count_button !== void 0 ? _this_count_button : 0
          };
          var _this_count_button1;
          this.count = {
            [button]: (_this_count_button1 = this.count[button]) !== null && _this_count_button1 !== void 0 ? _this_count_button1 : 0
          };
          return Number(this.count[button]) + 1;
        }
        getOnUp(button) {
          return this.down[button] === void 0 ? void 0 : Number(this.down[button]) + 1;
        }
        reset() {
          this.count = {};
        }
        constructor() {
          _define_property6(this, "down", {});
          _define_property6(this, "count", {});
        }
      }());
    }
  };

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/system/pointer/pointer.js
  var import_helpers22 = __toESM(require_helpers(), 1);

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/pointer/cssPointerEvents.js
  function hasPointerEvents(instance, element) {
    var _checkPointerEvents;
    return ((_checkPointerEvents = checkPointerEvents(instance, element)) === null || _checkPointerEvents === void 0 ? void 0 : _checkPointerEvents.pointerEvents) !== "none";
  }
  function closestPointerEventsDeclaration(element) {
    const window2 = getWindow(element);
    for (let el = element, tree = []; el === null || el === void 0 ? void 0 : el.ownerDocument; el = el.parentElement) {
      tree.push(el);
      const pointerEvents = window2.getComputedStyle(el).pointerEvents;
      if (pointerEvents && ![
        "inherit",
        "unset"
      ].includes(pointerEvents)) {
        return {
          pointerEvents,
          tree
        };
      }
    }
    return void 0;
  }
  var PointerEventsCheck = Symbol("Last check for pointer-events");
  function checkPointerEvents(instance, element) {
    const lastCheck = element[PointerEventsCheck];
    const needsCheck = instance.config.pointerEventsCheck !== PointerEventsCheckLevel.Never && (!lastCheck || hasBitFlag(instance.config.pointerEventsCheck, PointerEventsCheckLevel.EachApiCall) && lastCheck[ApiLevel.Call] !== getLevelRef(instance, ApiLevel.Call) || hasBitFlag(instance.config.pointerEventsCheck, PointerEventsCheckLevel.EachTrigger) && lastCheck[ApiLevel.Trigger] !== getLevelRef(instance, ApiLevel.Trigger));
    if (!needsCheck) {
      return lastCheck === null || lastCheck === void 0 ? void 0 : lastCheck.result;
    }
    const declaration = closestPointerEventsDeclaration(element);
    element[PointerEventsCheck] = {
      [ApiLevel.Call]: getLevelRef(instance, ApiLevel.Call),
      [ApiLevel.Trigger]: getLevelRef(instance, ApiLevel.Trigger),
      result: declaration
    };
    return declaration;
  }
  function assertPointerEvents(instance, element) {
    const declaration = checkPointerEvents(instance, element);
    if ((declaration === null || declaration === void 0 ? void 0 : declaration.pointerEvents) === "none") {
      throw new Error([
        `Unable to perform pointer interaction as the element ${declaration.tree.length > 1 ? "inherits" : "has"} \`pointer-events: none\`:`,
        "",
        printTree(declaration.tree)
      ].join("\n"));
    }
  }
  function printTree(tree) {
    return tree.reverse().map((el, i) => [
      "".padEnd(i),
      el.tagName,
      el.id && `#${el.id}`,
      el.hasAttribute("data-testid") && `(testId=${el.getAttribute("data-testid")})`,
      getLabelDescr(el),
      tree.length > 1 && i === 0 && "  <-- This element declared `pointer-events: none`",
      tree.length > 1 && i === tree.length - 1 && "  <-- Asserted pointer events here"
    ].filter(Boolean).join("")).join("\n");
  }
  function getLabelDescr(element) {
    var _element_labels;
    let label;
    if (element.hasAttribute("aria-label")) {
      label = element.getAttribute("aria-label");
    } else if (element.hasAttribute("aria-labelledby")) {
      var _element_ownerDocument_getElementById_textContent, _element_ownerDocument_getElementById;
      label = (_element_ownerDocument_getElementById = element.ownerDocument.getElementById(element.getAttribute("aria-labelledby"))) === null || _element_ownerDocument_getElementById === void 0 ? void 0 : (_element_ownerDocument_getElementById_textContent = _element_ownerDocument_getElementById.textContent) === null || _element_ownerDocument_getElementById_textContent === void 0 ? void 0 : _element_ownerDocument_getElementById_textContent.trim();
    } else if (isElementType(element, [
      "button",
      "input",
      "meter",
      "output",
      "progress",
      "select",
      "textarea"
    ]) && ((_element_labels = element.labels) === null || _element_labels === void 0 ? void 0 : _element_labels.length)) {
      label = Array.from(element.labels).map((el) => {
        var _el_textContent;
        return (_el_textContent = el.textContent) === null || _el_textContent === void 0 ? void 0 : _el_textContent.trim();
      }).join("|");
    } else if (isElementType(element, "button")) {
      var _element_textContent;
      label = (_element_textContent = element.textContent) === null || _element_textContent === void 0 ? void 0 : _element_textContent.trim();
    }
    label = label === null || label === void 0 ? void 0 : label.replace(/\n/g, "  ");
    if (Number(label === null || label === void 0 ? void 0 : label.length) > 30) {
      label = `${label === null || label === void 0 ? void 0 : label.substring(0, 29)}\u2026`;
    }
    return label ? `(label=${label})` : "";
  }
  function hasBitFlag(conf, flag) {
    return (conf & flag) > 0;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/system/pointer/pointer.js
  function _define_property7(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var Pointer = class {
    init(instance, position) {
      this.position = position;
      const target = this.getTarget(instance);
      const [, enter] = getTreeDiff(null, target);
      const init = this.getEventInit();
      assertPointerEvents(instance, target);
      instance.dispatchUIEvent(target, "pointerover", init);
      enter.forEach((el) => instance.dispatchUIEvent(el, "pointerenter", init));
      return this;
    }
    move(instance, position) {
      const prevPosition = this.position;
      const prevTarget = this.getTarget(instance);
      this.position = position;
      if (!isDifferentPointerPosition(prevPosition, position)) {
        return;
      }
      const nextTarget = this.getTarget(instance);
      const init = this.getEventInit();
      const [leave, enter] = getTreeDiff(prevTarget, nextTarget);
      return {
        leave: () => {
          if (hasPointerEvents(instance, prevTarget)) {
            if (prevTarget !== nextTarget) {
              instance.dispatchUIEvent(prevTarget, "pointerout", init);
              leave.forEach((el) => instance.dispatchUIEvent(el, "pointerleave", init));
            }
          }
        },
        enter: () => {
          assertPointerEvents(instance, nextTarget);
          if (prevTarget !== nextTarget) {
            instance.dispatchUIEvent(nextTarget, "pointerover", init);
            enter.forEach((el) => instance.dispatchUIEvent(el, "pointerenter", init));
          }
        },
        move: () => {
          instance.dispatchUIEvent(nextTarget, "pointermove", init);
        }
      };
    }
    down(instance, _keyDef) {
      if (this.isDown) {
        return;
      }
      const target = this.getTarget(instance);
      assertPointerEvents(instance, target);
      this.isDown = true;
      this.isPrevented = !instance.dispatchUIEvent(target, "pointerdown", this.getEventInit());
    }
    up(instance, _keyDef) {
      if (!this.isDown) {
        return;
      }
      const target = this.getTarget(instance);
      assertPointerEvents(instance, target);
      this.isDown = false;
      instance.dispatchUIEvent(target, "pointerup", this.getEventInit());
    }
    release(instance) {
      const target = this.getTarget(instance);
      const [leave] = getTreeDiff(target, null);
      const init = this.getEventInit();
      if (hasPointerEvents(instance, target)) {
        instance.dispatchUIEvent(target, "pointerout", init);
        leave.forEach((el) => instance.dispatchUIEvent(el, "pointerleave", init));
      }
      this.isCancelled = true;
    }
    getTarget(instance) {
      var _this_position_target;
      return (_this_position_target = this.position.target) !== null && _this_position_target !== void 0 ? _this_position_target : instance.config.document.body;
    }
    getEventInit() {
      return {
        ...this.position.coords,
        pointerId: this.pointerId,
        pointerType: this.pointerType,
        isPrimary: this.isPrimary
      };
    }
    constructor({ pointerId, pointerType, isPrimary }) {
      _define_property7(this, "pointerId", void 0);
      _define_property7(this, "pointerType", void 0);
      _define_property7(this, "isPrimary", void 0);
      _define_property7(this, "isMultitouch", false);
      _define_property7(this, "isCancelled", false);
      _define_property7(this, "isDown", false);
      _define_property7(this, "isPrevented", false);
      _define_property7(this, "position", {});
      this.pointerId = pointerId;
      this.pointerType = pointerType;
      this.isPrimary = isPrimary;
      this.isMultitouch = !isPrimary;
    }
  };

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/system/pointer/index.js
  function _define_property8(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var PointerHost = class {
    isKeyPressed(keyDef) {
      return this.devices.get(keyDef.pointerType).isPressed(keyDef);
    }
    async press(instance, keyDef, position) {
      const pointerName = this.getPointerName(keyDef);
      const pointer3 = keyDef.pointerType === "touch" ? this.pointers.new(pointerName, keyDef).init(instance, position) : this.pointers.get(pointerName);
      pointer3.position = position;
      if (pointer3.pointerType !== "touch") {
        this.mouse.position = position;
      }
      this.devices.get(keyDef.pointerType).addPressed(keyDef);
      this.buttons.down(keyDef);
      pointer3.down(instance, keyDef);
      if (pointer3.pointerType !== "touch" && !pointer3.isPrevented) {
        this.mouse.down(instance, keyDef, pointer3);
      }
    }
    async move(instance, pointerName, position) {
      const pointer3 = this.pointers.get(pointerName);
      const pointermove = pointer3.move(instance, position);
      const mousemove = pointer3.pointerType === "touch" || pointer3.isPrevented && pointer3.isDown ? void 0 : this.mouse.move(instance, position);
      pointermove === null || pointermove === void 0 ? void 0 : pointermove.leave();
      mousemove === null || mousemove === void 0 ? void 0 : mousemove.leave();
      pointermove === null || pointermove === void 0 ? void 0 : pointermove.enter();
      mousemove === null || mousemove === void 0 ? void 0 : mousemove.enter();
      pointermove === null || pointermove === void 0 ? void 0 : pointermove.move();
      mousemove === null || mousemove === void 0 ? void 0 : mousemove.move();
    }
    async release(instance, keyDef, position) {
      const device = this.devices.get(keyDef.pointerType);
      device.removePressed(keyDef);
      this.buttons.up(keyDef);
      const pointer3 = this.pointers.get(this.getPointerName(keyDef));
      pointer3.position = position;
      if (pointer3.pointerType !== "touch") {
        this.mouse.position = position;
      }
      if (device.countPressed === 0) {
        pointer3.up(instance, keyDef);
      }
      if (pointer3.pointerType === "touch") {
        pointer3.release(instance);
      }
      if (!pointer3.isPrevented) {
        if (pointer3.pointerType === "touch" && !pointer3.isMultitouch) {
          const mousemove = this.mouse.move(instance, pointer3.position);
          mousemove === null || mousemove === void 0 ? void 0 : mousemove.leave();
          mousemove === null || mousemove === void 0 ? void 0 : mousemove.enter();
          mousemove === null || mousemove === void 0 ? void 0 : mousemove.move();
          this.mouse.down(instance, keyDef, pointer3);
        }
        if (!pointer3.isMultitouch) {
          const mousemove = this.mouse.move(instance, pointer3.position);
          mousemove === null || mousemove === void 0 ? void 0 : mousemove.leave();
          mousemove === null || mousemove === void 0 ? void 0 : mousemove.enter();
          mousemove === null || mousemove === void 0 ? void 0 : mousemove.move();
          this.mouse.up(instance, keyDef, pointer3);
        }
      }
    }
    getPointerName(keyDef) {
      return keyDef.pointerType === "touch" ? keyDef.name : keyDef.pointerType;
    }
    getPreviousPosition(pointerName) {
      return this.pointers.has(pointerName) ? this.pointers.get(pointerName).position : void 0;
    }
    resetClickCount() {
      this.mouse.resetClickCount();
    }
    getMouseTarget(instance) {
      var _this_mouse_position_target;
      return (_this_mouse_position_target = this.mouse.position.target) !== null && _this_mouse_position_target !== void 0 ? _this_mouse_position_target : instance.config.document.body;
    }
    setMousePosition(position) {
      this.mouse.position = position;
      this.pointers.get("mouse").position = position;
    }
    constructor(system) {
      _define_property8(this, "system", void 0);
      _define_property8(this, "mouse", void 0);
      _define_property8(this, "buttons", void 0);
      _define_property8(this, "devices", new class {
        get(k) {
          var _this_registry, _k;
          var _;
          (_ = (_this_registry = this.registry)[_k = k]) !== null && _ !== void 0 ? _ : _this_registry[_k] = new Device();
          return this.registry[k];
        }
        constructor() {
          _define_property8(this, "registry", {});
        }
      }());
      _define_property8(this, "pointers", new class {
        new(pointerName, keyDef) {
          const isPrimary = keyDef.pointerType !== "touch" || !Object.values(this.registry).some((p) => p.pointerType === "touch" && !p.isCancelled);
          if (!isPrimary) {
            Object.values(this.registry).forEach((p) => {
              if (p.pointerType === keyDef.pointerType && !p.isCancelled) {
                p.isMultitouch = true;
              }
            });
          }
          this.registry[pointerName] = new Pointer({
            pointerId: this.nextId++,
            pointerType: keyDef.pointerType,
            isPrimary
          });
          return this.registry[pointerName];
        }
        get(pointerName) {
          if (!this.has(pointerName)) {
            throw new Error(`Trying to access pointer "${pointerName}" which does not exist.`);
          }
          return this.registry[pointerName];
        }
        has(pointerName) {
          return pointerName in this.registry;
        }
        constructor() {
          _define_property8(this, "registry", {
            mouse: new Pointer({
              pointerId: 1,
              pointerType: "mouse",
              isPrimary: true
            })
          });
          _define_property8(this, "nextId", 2);
        }
      }());
      this.system = system;
      this.buttons = new Buttons();
      this.mouse = new Mouse();
    }
  };

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/system/index.js
  function _define_property9(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var System = class {
    getUIEventModifiers() {
      return {
        altKey: this.keyboard.modifiers.Alt,
        ctrlKey: this.keyboard.modifiers.Control,
        metaKey: this.keyboard.modifiers.Meta,
        shiftKey: this.keyboard.modifiers.Shift,
        modifierAltGraph: this.keyboard.modifiers.AltGraph,
        modifierCapsLock: this.keyboard.modifiers.CapsLock,
        modifierFn: this.keyboard.modifiers.Fn,
        modifierFnLock: this.keyboard.modifiers.FnLock,
        modifierNumLock: this.keyboard.modifiers.NumLock,
        modifierScrollLock: this.keyboard.modifiers.ScrollLock,
        modifierSymbol: this.keyboard.modifiers.Symbol,
        modifierSymbolLock: this.keyboard.modifiers.SymbolLock
      };
    }
    constructor() {
      _define_property9(this, "keyboard", new KeyboardHost(this));
      _define_property9(this, "pointer", new PointerHost(this));
    }
  };

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/convenience/click.js
  async function click(element) {
    const pointerIn = [];
    if (!this.config.skipHover) {
      pointerIn.push({
        target: element
      });
    }
    pointerIn.push({
      keys: "[MouseLeft]",
      target: element
    });
    return this.pointer(pointerIn);
  }
  async function dblClick(element) {
    return this.pointer([
      {
        target: element
      },
      "[MouseLeft][MouseLeft]"
    ]);
  }
  async function tripleClick(element) {
    return this.pointer([
      {
        target: element
      },
      "[MouseLeft][MouseLeft][MouseLeft]"
    ]);
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/convenience/hover.js
  var import_helpers23 = __toESM(require_helpers(), 1);
  async function hover(element) {
    return this.pointer({
      target: element
    });
  }
  async function unhover(element) {
    assertPointerEvents(this, this.system.pointer.getMouseTarget(this));
    return this.pointer({
      target: element.ownerDocument.body
    });
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/convenience/tab.js
  async function tab({ shift } = {}) {
    return this.keyboard(shift === true ? "{Shift>}{Tab}{/Shift}" : shift === false ? "[/ShiftLeft][/ShiftRight]{Tab}" : "{Tab}");
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/keyboard/index.js
  var import_helpers25 = __toESM(require_helpers(), 1);

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/keyboard/parseKeyDef.js
  var import_helpers24 = __toESM(require_helpers(), 1);
  function parseKeyDef(keyboardMap, text) {
    const defs = [];
    do {
      const { type: type3, descriptor, consumedLength, releasePrevious, releaseSelf = true, repeat } = readNextDescriptor(text, "keyboard");
      var _keyboardMap_find;
      const keyDef = (_keyboardMap_find = keyboardMap.find((def) => {
        if (type3 === "[") {
          var _def_code;
          return ((_def_code = def.code) === null || _def_code === void 0 ? void 0 : _def_code.toLowerCase()) === descriptor.toLowerCase();
        } else if (type3 === "{") {
          var _def_key;
          return ((_def_key = def.key) === null || _def_key === void 0 ? void 0 : _def_key.toLowerCase()) === descriptor.toLowerCase();
        }
        return def.key === descriptor;
      })) !== null && _keyboardMap_find !== void 0 ? _keyboardMap_find : {
        key: "Unknown",
        code: "Unknown",
        [type3 === "[" ? "code" : "key"]: descriptor
      };
      defs.push({
        keyDef,
        releasePrevious,
        releaseSelf,
        repeat
      });
      text = text.slice(consumedLength);
    } while (text);
    return defs;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/keyboard/index.js
  async function keyboard(text) {
    const actions = parseKeyDef(this.config.keyboardMap, text);
    for (let i = 0; i < actions.length; i++) {
      await wait(this.config);
      await keyboardAction(this, actions[i]);
    }
  }
  async function keyboardAction(instance, { keyDef, releasePrevious, releaseSelf, repeat }) {
    const { system } = instance;
    if (system.keyboard.isKeyPressed(keyDef)) {
      await system.keyboard.keyup(instance, keyDef);
    }
    if (!releasePrevious) {
      for (let i = 1; i <= repeat; i++) {
        await system.keyboard.keydown(instance, keyDef);
        if (i < repeat) {
          await wait(instance.config);
        }
      }
      if (releaseSelf) {
        await system.keyboard.keyup(instance, keyDef);
      }
    }
  }
  async function releaseAllKeys(instance) {
    for (const k of instance.system.keyboard.getPressedKeys()) {
      await instance.system.keyboard.keyup(instance, k);
    }
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/clipboard/copy.js
  var import_helpers26 = __toESM(require_helpers(), 1);

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/document/copySelection.js
  function copySelection(target) {
    const data = hasOwnSelection(target) ? {
      "text/plain": readSelectedValueFromInput(target)
    } : {
      "text/plain": String(target.ownerDocument.getSelection())
    };
    const dt = createDataTransfer(getWindow(target));
    for (const type3 in data) {
      if (data[type3]) {
        dt.setData(type3, data[type3]);
      }
    }
    return dt;
  }
  function readSelectedValueFromInput(target) {
    const sel = getUISelection(target);
    const val = getUIValue(target);
    return val.substring(sel.startOffset, sel.endOffset);
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/clipboard/copy.js
  async function copy() {
    const doc = this.config.document;
    var _doc_activeElement;
    const target = (_doc_activeElement = doc.activeElement) !== null && _doc_activeElement !== void 0 ? _doc_activeElement : (
      /* istanbul ignore next */
      doc.body
    );
    const clipboardData = copySelection(target);
    if (clipboardData.items.length === 0) {
      return;
    }
    if (this.dispatchUIEvent(target, "copy", {
      clipboardData
    }) && this.config.writeToClipboard) {
      await writeDataTransferToClipboard(doc, clipboardData);
    }
    return clipboardData;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/clipboard/cut.js
  var import_helpers27 = __toESM(require_helpers(), 1);
  async function cut() {
    const doc = this.config.document;
    var _doc_activeElement;
    const target = (_doc_activeElement = doc.activeElement) !== null && _doc_activeElement !== void 0 ? _doc_activeElement : (
      /* istanbul ignore next */
      doc.body
    );
    const clipboardData = copySelection(target);
    if (clipboardData.items.length === 0) {
      return;
    }
    if (this.dispatchUIEvent(target, "cut", {
      clipboardData
    }) && this.config.writeToClipboard) {
      await writeDataTransferToClipboard(target.ownerDocument, clipboardData);
    }
    return clipboardData;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/clipboard/paste.js
  async function paste(clipboardData) {
    const doc = this.config.document;
    var _doc_activeElement;
    const target = (_doc_activeElement = doc.activeElement) !== null && _doc_activeElement !== void 0 ? _doc_activeElement : (
      /* istanbul ignore next */
      doc.body
    );
    var _ref;
    const dataTransfer = (_ref = typeof clipboardData === "string" ? getClipboardDataFromString(doc, clipboardData) : clipboardData) !== null && _ref !== void 0 ? _ref : await readDataTransferFromClipboard(doc).catch(() => {
      throw new Error("`userEvent.paste()` without `clipboardData` requires the `ClipboardAPI` to be available.");
    });
    this.dispatchUIEvent(target, "paste", {
      clipboardData: dataTransfer
    });
  }
  function getClipboardDataFromString(doc, text) {
    const dt = createDataTransfer(getWindow(doc));
    dt.setData("text", text);
    return dt;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/pointer/index.js
  var import_helpers29 = __toESM(require_helpers(), 1);

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/pointer/parseKeyDef.js
  var import_helpers28 = __toESM(require_helpers(), 1);
  function parseKeyDef2(pointerMap, keys) {
    const defs = [];
    do {
      const { descriptor, consumedLength, releasePrevious, releaseSelf = true } = readNextDescriptor(keys, "pointer");
      const keyDef = pointerMap.find((p) => p.name === descriptor);
      if (keyDef) {
        defs.push({
          keyDef,
          releasePrevious,
          releaseSelf
        });
      }
      keys = keys.slice(consumedLength);
    } while (keys);
    return defs;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/pointer/index.js
  async function pointer(input2) {
    const { pointerMap } = this.config;
    const actions = [];
    (Array.isArray(input2) ? input2 : [
      input2
    ]).forEach((actionInput) => {
      if (typeof actionInput === "string") {
        actions.push(...parseKeyDef2(pointerMap, actionInput));
      } else if ("keys" in actionInput) {
        actions.push(...parseKeyDef2(pointerMap, actionInput.keys).map((i) => ({
          ...actionInput,
          ...i
        })));
      } else {
        actions.push(actionInput);
      }
    });
    for (let i = 0; i < actions.length; i++) {
      await wait(this.config);
      await pointerAction(this, actions[i]);
    }
    this.system.pointer.resetClickCount();
  }
  async function pointerAction(instance, action) {
    var _previousPosition_caret, _previousPosition_caret1;
    const pointerName = "pointerName" in action && action.pointerName ? action.pointerName : "keyDef" in action ? instance.system.pointer.getPointerName(action.keyDef) : "mouse";
    const previousPosition = instance.system.pointer.getPreviousPosition(pointerName);
    var _action_target, _action_coords, _action_node, _action_offset;
    const position = {
      target: (_action_target = action.target) !== null && _action_target !== void 0 ? _action_target : getPrevTarget(instance, previousPosition),
      coords: (_action_coords = action.coords) !== null && _action_coords !== void 0 ? _action_coords : previousPosition === null || previousPosition === void 0 ? void 0 : previousPosition.coords,
      caret: {
        node: (_action_node = action.node) !== null && _action_node !== void 0 ? _action_node : hasCaretPosition(action) ? void 0 : previousPosition === null || previousPosition === void 0 ? void 0 : (_previousPosition_caret = previousPosition.caret) === null || _previousPosition_caret === void 0 ? void 0 : _previousPosition_caret.node,
        offset: (_action_offset = action.offset) !== null && _action_offset !== void 0 ? _action_offset : hasCaretPosition(action) ? void 0 : previousPosition === null || previousPosition === void 0 ? void 0 : (_previousPosition_caret1 = previousPosition.caret) === null || _previousPosition_caret1 === void 0 ? void 0 : _previousPosition_caret1.offset
      }
    };
    if ("keyDef" in action) {
      if (instance.system.pointer.isKeyPressed(action.keyDef)) {
        setLevelRef(instance, ApiLevel.Trigger);
        await instance.system.pointer.release(instance, action.keyDef, position);
      }
      if (!action.releasePrevious) {
        setLevelRef(instance, ApiLevel.Trigger);
        await instance.system.pointer.press(instance, action.keyDef, position);
        if (action.releaseSelf) {
          setLevelRef(instance, ApiLevel.Trigger);
          await instance.system.pointer.release(instance, action.keyDef, position);
        }
      }
    } else {
      setLevelRef(instance, ApiLevel.Trigger);
      await instance.system.pointer.move(instance, pointerName, position);
    }
  }
  function hasCaretPosition(action) {
    var _action_target, _ref;
    return !!((_ref = (_action_target = action.target) !== null && _action_target !== void 0 ? _action_target : action.node) !== null && _ref !== void 0 ? _ref : action.offset !== void 0);
  }
  function getPrevTarget(instance, position) {
    if (!position) {
      throw new Error("This pointer has no previous position. Provide a target property!");
    }
    var _position_target;
    return (_position_target = position.target) !== null && _position_target !== void 0 ? _position_target : instance.config.document.body;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utility/clear.js
  var import_helpers30 = __toESM(require_helpers(), 1);
  async function clear(element) {
    if (!isEditable(element) || isDisabled(element)) {
      throw new Error("clear()` is only supported on editable elements.");
    }
    focusElement(element);
    if (element.ownerDocument.activeElement !== element) {
      throw new Error("The element to be cleared could not be focused.");
    }
    selectAll(element);
    if (!isAllSelected(element)) {
      throw new Error("The element content to be cleared could not be selected.");
    }
    input(this, element, "", "deleteContentBackward");
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utility/selectOptions.js
  var import_helpers31 = __toESM(require_helpers(), 1);
  var { getConfig: getConfig3 } = dom_esm_exports;
  async function selectOptions(select, values) {
    return selectOptionsBase.call(this, true, select, values);
  }
  async function deselectOptions(select, values) {
    return selectOptionsBase.call(this, false, select, values);
  }
  async function selectOptionsBase(newValue, select, values) {
    if (!newValue && !select.multiple) {
      throw getConfig3().getElementError(`Unable to deselect an option in a non-multiple select. Use selectOptions to change the selection instead.`, select);
    }
    const valArray = Array.isArray(values) ? values : [
      values
    ];
    const allOptions = Array.from(select.querySelectorAll('option, [role="option"]'));
    const selectedOptions = valArray.map((val) => {
      if (typeof val !== "string" && allOptions.includes(val)) {
        return val;
      } else {
        const matchingOption = allOptions.find((o) => o.value === val || o.innerHTML === val);
        if (matchingOption) {
          return matchingOption;
        } else {
          throw getConfig3().getElementError(`Value "${String(val)}" not found in options`, select);
        }
      }
    }).filter((option) => !isDisabled(option));
    if (isDisabled(select) || !selectedOptions.length)
      return;
    const selectOption = (option) => {
      option.selected = newValue;
      this.dispatchUIEvent(select, "input", {
        bubbles: true,
        cancelable: false,
        composed: true
      });
      this.dispatchUIEvent(select, "change");
    };
    if (isElementType(select, "select")) {
      if (select.multiple) {
        for (const option of selectedOptions) {
          const withPointerEvents = this.config.pointerEventsCheck === 0 ? true : hasPointerEvents(this, option);
          if (withPointerEvents) {
            this.dispatchUIEvent(option, "pointerover");
            this.dispatchUIEvent(select, "pointerenter");
            this.dispatchUIEvent(option, "mouseover");
            this.dispatchUIEvent(select, "mouseenter");
            this.dispatchUIEvent(option, "pointermove");
            this.dispatchUIEvent(option, "mousemove");
            this.dispatchUIEvent(option, "pointerdown");
            this.dispatchUIEvent(option, "mousedown");
          }
          focusElement(select);
          if (withPointerEvents) {
            this.dispatchUIEvent(option, "pointerup");
            this.dispatchUIEvent(option, "mouseup");
          }
          selectOption(option);
          if (withPointerEvents) {
            this.dispatchUIEvent(option, "click");
          }
          await wait(this.config);
        }
      } else if (selectedOptions.length === 1) {
        const withPointerEvents = this.config.pointerEventsCheck === 0 ? true : hasPointerEvents(this, select);
        if (withPointerEvents) {
          await this.click(select);
        } else {
          focusElement(select);
        }
        selectOption(selectedOptions[0]);
        if (withPointerEvents) {
          this.dispatchUIEvent(select, "pointerover");
          this.dispatchUIEvent(select, "pointerenter");
          this.dispatchUIEvent(select, "mouseover");
          this.dispatchUIEvent(select, "mouseenter");
          this.dispatchUIEvent(select, "pointerup");
          this.dispatchUIEvent(select, "mouseup");
          this.dispatchUIEvent(select, "click");
        }
        await wait(this.config);
      } else {
        throw getConfig3().getElementError(`Cannot select multiple options on a non-multiple select`, select);
      }
    } else if (select.getAttribute("role") === "listbox") {
      for (const option of selectedOptions) {
        await this.click(option);
        await this.unhover(option);
      }
    } else {
      throw getConfig3().getElementError(`Cannot select options on elements that are neither select nor listbox elements`, select);
    }
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utility/type.js
  var import_helpers32 = __toESM(require_helpers(), 1);
  async function type(element, text, { skipClick = this.config.skipClick, skipAutoClose = this.config.skipAutoClose, initialSelectionStart, initialSelectionEnd } = {}) {
    if (element.disabled)
      return;
    if (!skipClick) {
      await this.click(element);
    }
    if (initialSelectionStart !== void 0) {
      setSelectionRange(element, initialSelectionStart, initialSelectionEnd !== null && initialSelectionEnd !== void 0 ? initialSelectionEnd : initialSelectionStart);
    }
    await this.keyboard(text);
    if (!skipAutoClose) {
      await releaseAllKeys(this);
    }
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utils/edit/setFiles.js
  var fakeFiles = Symbol("files and value properties are mocked");
  function restoreProperty(obj, prop, descriptor) {
    if (descriptor) {
      Object.defineProperty(obj, prop, descriptor);
    } else {
      delete obj[prop];
    }
  }
  function setFiles(el, files) {
    var _el_fakeFiles;
    (_el_fakeFiles = el[fakeFiles]) === null || _el_fakeFiles === void 0 ? void 0 : _el_fakeFiles.restore();
    const typeDescr = Object.getOwnPropertyDescriptor(el, "type");
    const valueDescr = Object.getOwnPropertyDescriptor(el, "value");
    const filesDescr = Object.getOwnPropertyDescriptor(el, "files");
    function restore() {
      restoreProperty(el, "type", typeDescr);
      restoreProperty(el, "value", valueDescr);
      restoreProperty(el, "files", filesDescr);
    }
    el[fakeFiles] = {
      restore
    };
    Object.defineProperties(el, {
      files: {
        configurable: true,
        get: () => files
      },
      value: {
        configurable: true,
        get: () => files.length ? `C:\\fakepath\\${files[0].name}` : "",
        set(v) {
          if (v === "") {
            restore();
          } else {
            var _valueDescr_set;
            valueDescr === null || valueDescr === void 0 ? void 0 : (_valueDescr_set = valueDescr.set) === null || _valueDescr_set === void 0 ? void 0 : _valueDescr_set.call(el, v);
          }
        }
      },
      type: {
        configurable: true,
        get: () => "file",
        set(v) {
          if (v !== "file") {
            restore();
            el.type = v;
          }
        }
      }
    });
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/utility/upload.js
  async function upload(element, fileOrFiles) {
    const input2 = isElementType(element, "label") ? element.control : element;
    if (!input2 || !isElementType(input2, "input", {
      type: "file"
    })) {
      throw new TypeError(`The ${input2 === element ? "given" : "associated"} ${input2 === null || input2 === void 0 ? void 0 : input2.tagName} element does not accept file uploads`);
    }
    if (isDisabled(element))
      return;
    const files = (Array.isArray(fileOrFiles) ? fileOrFiles : [
      fileOrFiles
    ]).filter((file) => !this.config.applyAccept || isAcceptableFile(file, input2.accept)).slice(0, input2.multiple ? void 0 : 1);
    const fileDialog = () => {
      var _input_files;
      if (files.length === ((_input_files = input2.files) === null || _input_files === void 0 ? void 0 : _input_files.length) && files.every((f, i) => {
        var _input_files2;
        return f === ((_input_files2 = input2.files) === null || _input_files2 === void 0 ? void 0 : _input_files2.item(i));
      })) {
        return;
      }
      setFiles(input2, createFileList(getWindow(element), files));
      this.dispatchUIEvent(input2, "input");
      this.dispatchUIEvent(input2, "change");
    };
    input2.addEventListener("fileDialog", fileDialog);
    await this.click(element);
    input2.removeEventListener("fileDialog", fileDialog);
  }
  function isAcceptableFile(file, accept) {
    if (!accept) {
      return true;
    }
    const wildcards = [
      "audio/*",
      "image/*",
      "video/*"
    ];
    return accept.split(",").some((acceptToken) => {
      if (acceptToken.startsWith(".")) {
        return file.name.endsWith(acceptToken);
      } else if (wildcards.includes(acceptToken)) {
        return file.type.startsWith(acceptToken.substr(0, acceptToken.length - 1));
      }
      return file.type === acceptToken;
    });
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/setup/api.js
  var userEventApi = {
    click,
    dblClick,
    tripleClick,
    hover,
    unhover,
    tab,
    keyboard,
    copy,
    cut,
    paste,
    pointer,
    clear,
    deselectOptions,
    selectOptions,
    type,
    upload
  };

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/setup/wrapAsync.js
  var { getConfig: getConfig4 } = dom_esm_exports;
  function wrapAsync(implementation) {
    return getConfig4().asyncWrapper(implementation);
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/setup/setup.js
  var defaultOptionsDirect = {
    applyAccept: true,
    autoModify: true,
    delay: 0,
    document: globalThis.document,
    keyboardMap: defaultKeyMap,
    pointerMap: defaultKeyMap2,
    pointerEventsCheck: PointerEventsCheckLevel.EachApiCall,
    skipAutoClose: false,
    skipClick: false,
    skipHover: false,
    writeToClipboard: false,
    advanceTimers: () => Promise.resolve()
  };
  var defaultOptionsSetup = {
    ...defaultOptionsDirect,
    writeToClipboard: true
  };
  function createConfig(options = {}, defaults = defaultOptionsSetup, node) {
    const document2 = getDocument2(options, node, defaults);
    return {
      ...defaults,
      ...options,
      document: document2
    };
  }
  function setupMain(options = {}) {
    const config2 = createConfig(options);
    prepareDocument(config2.document);
    var _config_document_defaultView;
    const view = (_config_document_defaultView = config2.document.defaultView) !== null && _config_document_defaultView !== void 0 ? _config_document_defaultView : (
      /* istanbul ignore next */
      globalThis.window
    );
    attachClipboardStubToView(view);
    return createInstance(config2).api;
  }
  function setupDirect({ keyboardState, pointerState, ...options } = {}, node) {
    const config2 = createConfig(options, defaultOptionsDirect, node);
    prepareDocument(config2.document);
    var _ref;
    const system = (_ref = pointerState !== null && pointerState !== void 0 ? pointerState : keyboardState) !== null && _ref !== void 0 ? _ref : new System();
    return {
      api: createInstance(config2, system).api,
      system
    };
  }
  function setupSub(options) {
    return createInstance({
      ...this.config,
      ...options
    }, this.system).api;
  }
  function wrapAndBindImpl(instance, impl) {
    function method(...args) {
      setLevelRef(instance, ApiLevel.Call);
      return wrapAsync(() => impl.apply(instance, args).then(async (ret) => {
        await wait(instance.config);
        return ret;
      }));
    }
    Object.defineProperty(method, "name", {
      get: () => impl.name
    });
    return method;
  }
  function createInstance(config2, system = new System()) {
    const instance = {};
    Object.assign(instance, {
      config: config2,
      dispatchEvent: dispatchEvent.bind(instance),
      dispatchUIEvent: dispatchUIEvent.bind(instance),
      system,
      levelRefs: {},
      ...userEventApi
    });
    return {
      instance,
      api: {
        ...Object.fromEntries(Object.entries(userEventApi).map(([name, api]) => [
          name,
          wrapAndBindImpl(instance, api)
        ])),
        setup: setupSub.bind(instance)
      }
    };
  }
  function getDocument2(options, node, defaults) {
    var _options_document, _ref;
    return (_ref = (_options_document = options.document) !== null && _options_document !== void 0 ? _options_document : node && getDocumentFromNode(node)) !== null && _ref !== void 0 ? _ref : defaults.document;
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/setup/directApi.js
  var directApi_exports = {};
  __export(directApi_exports, {
    clear: () => clear2,
    click: () => click2,
    copy: () => copy2,
    cut: () => cut2,
    dblClick: () => dblClick2,
    deselectOptions: () => deselectOptions2,
    hover: () => hover2,
    keyboard: () => keyboard2,
    paste: () => paste2,
    pointer: () => pointer2,
    selectOptions: () => selectOptions2,
    tab: () => tab2,
    tripleClick: () => tripleClick2,
    type: () => type2,
    unhover: () => unhover2,
    upload: () => upload2
  });
  function clear2(element) {
    return setupDirect().api.clear(element);
  }
  function click2(element, options = {}) {
    return setupDirect(options, element).api.click(element);
  }
  function copy2(options = {}) {
    return setupDirect(options).api.copy();
  }
  function cut2(options = {}) {
    return setupDirect(options).api.cut();
  }
  function dblClick2(element, options = {}) {
    return setupDirect(options).api.dblClick(element);
  }
  function deselectOptions2(select, values, options = {}) {
    return setupDirect(options).api.deselectOptions(select, values);
  }
  function hover2(element, options = {}) {
    return setupDirect(options).api.hover(element);
  }
  async function keyboard2(text, options = {}) {
    const { api, system } = setupDirect(options);
    return api.keyboard(text).then(() => system);
  }
  async function pointer2(input2, options = {}) {
    const { api, system } = setupDirect(options);
    return api.pointer(input2).then(() => system);
  }
  function paste2(clipboardData, options) {
    return setupDirect(options).api.paste(clipboardData);
  }
  function selectOptions2(select, values, options = {}) {
    return setupDirect(options).api.selectOptions(select, values);
  }
  function tripleClick2(element, options = {}) {
    return setupDirect(options).api.tripleClick(element);
  }
  function type2(element, text, options = {}) {
    return setupDirect(options, element).api.type(element, text, options);
  }
  function unhover2(element, options = {}) {
    const { api, system } = setupDirect(options);
    system.pointer.setMousePosition({
      target: element
    });
    return api.unhover(element);
  }
  function upload2(element, fileOrFiles, options = {}) {
    return setupDirect(options).api.upload(element, fileOrFiles);
  }
  function tab2(options = {}) {
    return setupDirect().api.tab(options);
  }

  // ../node_modules/.pnpm/@testing-library+user-event@14.5.1_@testing-library+dom@9.3.3/node_modules/@testing-library/user-event/dist/esm/setup/index.js
  var userEvent = {
    ...directApi_exports,
    setup: setupMain
  };

  // ../ts/testing-library-user-event.user.ts
  console.log("@testing-library/user-event");
  globalThis.dom = dom_esm_exports;
  globalThis.userEvent = userEvent;
  console.log("testing-library", { dom: dom_esm_exports, userEvent });
})();
/*! Bundled license information:

react-is/cjs/react-is.development.js:
  (** @license React v17.0.2
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
