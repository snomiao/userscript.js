// ==UserScript==
// @name             [SNOLAB] Google Calendar keyboard enhance
// @name:zh          [SNOLAB] Google 日历键盘操作
// @namespace        https://userscript.snomiao.com/
// @version          0.1.0
// @description      Google日历键盘键盘操作，功能：Alt+hjkl 移动日程
// @author           snomiao@gmail.com
// @match            *://calendar.google.com/*
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
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

  // ../node_modules/.pnpm/is-docker@2.2.1/node_modules/is-docker/index.js
  var require_is_docker = __commonJS({
    "../node_modules/.pnpm/is-docker@2.2.1/node_modules/is-docker/index.js"(exports, module) {
      "use strict";
      var fs = __require("fs");
      var isDocker;
      function hasDockerEnv() {
        try {
          fs.statSync("/.dockerenv");
          return true;
        } catch (_) {
          return false;
        }
      }
      function hasDockerCGroup() {
        try {
          return fs.readFileSync("/proc/self/cgroup", "utf8").includes("docker");
        } catch (_) {
          return false;
        }
      }
      module.exports = () => {
        if (isDocker === void 0) {
          isDocker = hasDockerEnv() || hasDockerCGroup();
        }
        return isDocker;
      };
    }
  });

  // ../node_modules/.pnpm/is-wsl@2.2.0/node_modules/is-wsl/index.js
  var require_is_wsl = __commonJS({
    "../node_modules/.pnpm/is-wsl@2.2.0/node_modules/is-wsl/index.js"(exports, module) {
      "use strict";
      var os = __require("os");
      var fs = __require("fs");
      var isDocker = require_is_docker();
      var isWsl = () => {
        if (process.platform !== "linux") {
          return false;
        }
        if (os.release().toLowerCase().includes("microsoft")) {
          if (isDocker()) {
            return false;
          }
          return true;
        }
        try {
          return fs.readFileSync("/proc/version", "utf8").toLowerCase().includes("microsoft") ? !isDocker() : false;
        } catch (_) {
          return false;
        }
      };
      if (process.env.__IS_WSL_TEST__) {
        module.exports = isWsl;
      } else {
        module.exports = isWsl();
      }
    }
  });

  // ../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/windows.js
  var require_windows = __commonJS({
    "../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/windows.js"(exports, module) {
      module.exports = isexe;
      isexe.sync = sync;
      var fs = __require("fs");
      function checkPathExt(path4, options) {
        var pathext = options.pathExt !== void 0 ? options.pathExt : process.env.PATHEXT;
        if (!pathext) {
          return true;
        }
        pathext = pathext.split(";");
        if (pathext.indexOf("") !== -1) {
          return true;
        }
        for (var i = 0; i < pathext.length; i++) {
          var p = pathext[i].toLowerCase();
          if (p && path4.substr(-p.length).toLowerCase() === p) {
            return true;
          }
        }
        return false;
      }
      function checkStat(stat, path4, options) {
        if (!stat.isSymbolicLink() && !stat.isFile()) {
          return false;
        }
        return checkPathExt(path4, options);
      }
      function isexe(path4, options, cb) {
        fs.stat(path4, function(er, stat) {
          cb(er, er ? false : checkStat(stat, path4, options));
        });
      }
      function sync(path4, options) {
        return checkStat(fs.statSync(path4), path4, options);
      }
    }
  });

  // ../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/mode.js
  var require_mode = __commonJS({
    "../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/mode.js"(exports, module) {
      module.exports = isexe;
      isexe.sync = sync;
      var fs = __require("fs");
      function isexe(path4, options, cb) {
        fs.stat(path4, function(er, stat) {
          cb(er, er ? false : checkStat(stat, options));
        });
      }
      function sync(path4, options) {
        return checkStat(fs.statSync(path4), options);
      }
      function checkStat(stat, options) {
        return stat.isFile() && checkMode(stat, options);
      }
      function checkMode(stat, options) {
        var mod = stat.mode;
        var uid = stat.uid;
        var gid = stat.gid;
        var myUid = options.uid !== void 0 ? options.uid : process.getuid && process.getuid();
        var myGid = options.gid !== void 0 ? options.gid : process.getgid && process.getgid();
        var u = parseInt("100", 8);
        var g = parseInt("010", 8);
        var o = parseInt("001", 8);
        var ug = u | g;
        var ret = mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
        return ret;
      }
    }
  });

  // ../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js
  var require_isexe = __commonJS({
    "../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js"(exports, module) {
      var fs = __require("fs");
      var core;
      if (process.platform === "win32" || global.TESTING_WINDOWS) {
        core = require_windows();
      } else {
        core = require_mode();
      }
      module.exports = isexe;
      isexe.sync = sync;
      function isexe(path4, options, cb) {
        if (typeof options === "function") {
          cb = options;
          options = {};
        }
        if (!cb) {
          if (typeof Promise !== "function") {
            throw new TypeError("callback not provided");
          }
          return new Promise(function(resolve, reject) {
            isexe(path4, options || {}, function(er, is2) {
              if (er) {
                reject(er);
              } else {
                resolve(is2);
              }
            });
          });
        }
        core(path4, options || {}, function(er, is2) {
          if (er) {
            if (er.code === "EACCES" || options && options.ignoreErrors) {
              er = null;
              is2 = false;
            }
          }
          cb(er, is2);
        });
      }
      function sync(path4, options) {
        try {
          return core.sync(path4, options || {});
        } catch (er) {
          if (options && options.ignoreErrors || er.code === "EACCES") {
            return false;
          } else {
            throw er;
          }
        }
      }
    }
  });

  // ../node_modules/.pnpm/which@2.0.2/node_modules/which/which.js
  var require_which = __commonJS({
    "../node_modules/.pnpm/which@2.0.2/node_modules/which/which.js"(exports, module) {
      var isWindows = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";
      var path4 = __require("path");
      var COLON = isWindows ? ";" : ":";
      var isexe = require_isexe();
      var getNotFoundError = (cmd) => Object.assign(new Error(`not found: ${cmd}`), { code: "ENOENT" });
      var getPathInfo = (cmd, opt) => {
        const colon = opt.colon || COLON;
        const pathEnv = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? [""] : [
          // windows always checks the cwd first
          ...isWindows ? [process.cwd()] : [],
          ...(opt.path || process.env.PATH || /* istanbul ignore next: very unusual */
          "").split(colon)
        ];
        const pathExtExe = isWindows ? opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "";
        const pathExt = isWindows ? pathExtExe.split(colon) : [""];
        if (isWindows) {
          if (cmd.indexOf(".") !== -1 && pathExt[0] !== "")
            pathExt.unshift("");
        }
        return {
          pathEnv,
          pathExt,
          pathExtExe
        };
      };
      var which = (cmd, opt, cb) => {
        if (typeof opt === "function") {
          cb = opt;
          opt = {};
        }
        if (!opt)
          opt = {};
        const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
        const found = [];
        const step = (i) => new Promise((resolve, reject) => {
          if (i === pathEnv.length)
            return opt.all && found.length ? resolve(found) : reject(getNotFoundError(cmd));
          const ppRaw = pathEnv[i];
          const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
          const pCmd = path4.join(pathPart, cmd);
          const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
          resolve(subStep(p, i, 0));
        });
        const subStep = (p, i, ii) => new Promise((resolve, reject) => {
          if (ii === pathExt.length)
            return resolve(step(i + 1));
          const ext = pathExt[ii];
          isexe(p + ext, { pathExt: pathExtExe }, (er, is2) => {
            if (!er && is2) {
              if (opt.all)
                found.push(p + ext);
              else
                return resolve(p + ext);
            }
            return resolve(subStep(p, i, ii + 1));
          });
        });
        return cb ? step(0).then((res) => cb(null, res), cb) : step(0);
      };
      var whichSync = (cmd, opt) => {
        opt = opt || {};
        const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
        const found = [];
        for (let i = 0; i < pathEnv.length; i++) {
          const ppRaw = pathEnv[i];
          const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
          const pCmd = path4.join(pathPart, cmd);
          const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
          for (let j = 0; j < pathExt.length; j++) {
            const cur = p + pathExt[j];
            try {
              const is2 = isexe.sync(cur, { pathExt: pathExtExe });
              if (is2) {
                if (opt.all)
                  found.push(cur);
                else
                  return cur;
              }
            } catch (ex) {
            }
          }
        }
        if (opt.all && found.length)
          return found;
        if (opt.nothrow)
          return null;
        throw getNotFoundError(cmd);
      };
      module.exports = which;
      which.sync = whichSync;
    }
  });

  // ../node_modules/.pnpm/path-key@3.1.1/node_modules/path-key/index.js
  var require_path_key = __commonJS({
    "../node_modules/.pnpm/path-key@3.1.1/node_modules/path-key/index.js"(exports, module) {
      "use strict";
      var pathKey = (options = {}) => {
        const environment = options.env || process.env;
        const platform = options.platform || process.platform;
        if (platform !== "win32") {
          return "PATH";
        }
        return Object.keys(environment).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
      };
      module.exports = pathKey;
      module.exports.default = pathKey;
    }
  });

  // ../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/resolveCommand.js
  var require_resolveCommand = __commonJS({
    "../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/resolveCommand.js"(exports, module) {
      "use strict";
      var path4 = __require("path");
      var which = require_which();
      var getPathKey = require_path_key();
      function resolveCommandAttempt(parsed, withoutPathExt) {
        const env2 = parsed.options.env || process.env;
        const cwd = process.cwd();
        const hasCustomCwd = parsed.options.cwd != null;
        const shouldSwitchCwd = hasCustomCwd && process.chdir !== void 0 && !process.chdir.disabled;
        if (shouldSwitchCwd) {
          try {
            process.chdir(parsed.options.cwd);
          } catch (err) {
          }
        }
        let resolved;
        try {
          resolved = which.sync(parsed.command, {
            path: env2[getPathKey({ env: env2 })],
            pathExt: withoutPathExt ? path4.delimiter : void 0
          });
        } catch (e) {
        } finally {
          if (shouldSwitchCwd) {
            process.chdir(cwd);
          }
        }
        if (resolved) {
          resolved = path4.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
        }
        return resolved;
      }
      function resolveCommand(parsed) {
        return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
      }
      module.exports = resolveCommand;
    }
  });

  // ../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/escape.js
  var require_escape = __commonJS({
    "../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/escape.js"(exports, module) {
      "use strict";
      var metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
      function escapeCommand(arg) {
        arg = arg.replace(metaCharsRegExp, "^$1");
        return arg;
      }
      function escapeArgument(arg, doubleEscapeMetaChars) {
        arg = `${arg}`;
        arg = arg.replace(/(\\*)"/g, '$1$1\\"');
        arg = arg.replace(/(\\*)$/, "$1$1");
        arg = `"${arg}"`;
        arg = arg.replace(metaCharsRegExp, "^$1");
        if (doubleEscapeMetaChars) {
          arg = arg.replace(metaCharsRegExp, "^$1");
        }
        return arg;
      }
      module.exports.command = escapeCommand;
      module.exports.argument = escapeArgument;
    }
  });

  // ../node_modules/.pnpm/shebang-regex@3.0.0/node_modules/shebang-regex/index.js
  var require_shebang_regex = __commonJS({
    "../node_modules/.pnpm/shebang-regex@3.0.0/node_modules/shebang-regex/index.js"(exports, module) {
      "use strict";
      module.exports = /^#!(.*)/;
    }
  });

  // ../node_modules/.pnpm/shebang-command@2.0.0/node_modules/shebang-command/index.js
  var require_shebang_command = __commonJS({
    "../node_modules/.pnpm/shebang-command@2.0.0/node_modules/shebang-command/index.js"(exports, module) {
      "use strict";
      var shebangRegex = require_shebang_regex();
      module.exports = (string = "") => {
        const match = string.match(shebangRegex);
        if (!match) {
          return null;
        }
        const [path4, argument] = match[0].replace(/#! ?/, "").split(" ");
        const binary = path4.split("/").pop();
        if (binary === "env") {
          return argument;
        }
        return argument ? `${binary} ${argument}` : binary;
      };
    }
  });

  // ../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/readShebang.js
  var require_readShebang = __commonJS({
    "../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/readShebang.js"(exports, module) {
      "use strict";
      var fs = __require("fs");
      var shebangCommand = require_shebang_command();
      function readShebang(command) {
        const size = 150;
        const buffer = Buffer.alloc(size);
        let fd;
        try {
          fd = fs.openSync(command, "r");
          fs.readSync(fd, buffer, 0, size, 0);
          fs.closeSync(fd);
        } catch (e) {
        }
        return shebangCommand(buffer.toString());
      }
      module.exports = readShebang;
    }
  });

  // ../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/parse.js
  var require_parse = __commonJS({
    "../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/parse.js"(exports, module) {
      "use strict";
      var path4 = __require("path");
      var resolveCommand = require_resolveCommand();
      var escape = require_escape();
      var readShebang = require_readShebang();
      var isWin = process.platform === "win32";
      var isExecutableRegExp = /\.(?:com|exe)$/i;
      var isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
      function detectShebang(parsed) {
        parsed.file = resolveCommand(parsed);
        const shebang = parsed.file && readShebang(parsed.file);
        if (shebang) {
          parsed.args.unshift(parsed.file);
          parsed.command = shebang;
          return resolveCommand(parsed);
        }
        return parsed.file;
      }
      function parseNonShell(parsed) {
        if (!isWin) {
          return parsed;
        }
        const commandFile = detectShebang(parsed);
        const needsShell = !isExecutableRegExp.test(commandFile);
        if (parsed.options.forceShell || needsShell) {
          const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
          parsed.command = path4.normalize(parsed.command);
          parsed.command = escape.command(parsed.command);
          parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));
          const shellCommand = [parsed.command].concat(parsed.args).join(" ");
          parsed.args = ["/d", "/s", "/c", `"${shellCommand}"`];
          parsed.command = process.env.comspec || "cmd.exe";
          parsed.options.windowsVerbatimArguments = true;
        }
        return parsed;
      }
      function parse(command, args, options) {
        if (args && !Array.isArray(args)) {
          options = args;
          args = null;
        }
        args = args ? args.slice(0) : [];
        options = Object.assign({}, options);
        const parsed = {
          command,
          args,
          options,
          file: void 0,
          original: {
            command,
            args
          }
        };
        return options.shell ? parsed : parseNonShell(parsed);
      }
      module.exports = parse;
    }
  });

  // ../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/enoent.js
  var require_enoent = __commonJS({
    "../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/enoent.js"(exports, module) {
      "use strict";
      var isWin = process.platform === "win32";
      function notFoundError(original, syscall) {
        return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
          code: "ENOENT",
          errno: "ENOENT",
          syscall: `${syscall} ${original.command}`,
          path: original.command,
          spawnargs: original.args
        });
      }
      function hookChildProcess(cp, parsed) {
        if (!isWin) {
          return;
        }
        const originalEmit = cp.emit;
        cp.emit = function(name, arg1) {
          if (name === "exit") {
            const err = verifyENOENT(arg1, parsed, "spawn");
            if (err) {
              return originalEmit.call(cp, "error", err);
            }
          }
          return originalEmit.apply(cp, arguments);
        };
      }
      function verifyENOENT(status, parsed) {
        if (isWin && status === 1 && !parsed.file) {
          return notFoundError(parsed.original, "spawn");
        }
        return null;
      }
      function verifyENOENTSync(status, parsed) {
        if (isWin && status === 1 && !parsed.file) {
          return notFoundError(parsed.original, "spawnSync");
        }
        return null;
      }
      module.exports = {
        hookChildProcess,
        verifyENOENT,
        verifyENOENTSync,
        notFoundError
      };
    }
  });

  // ../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/index.js
  var require_cross_spawn = __commonJS({
    "../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/index.js"(exports, module) {
      "use strict";
      var cp = __require("child_process");
      var parse = require_parse();
      var enoent = require_enoent();
      function spawn(command, args, options) {
        const parsed = parse(command, args, options);
        const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
        enoent.hookChildProcess(spawned, parsed);
        return spawned;
      }
      function spawnSync(command, args, options) {
        const parsed = parse(command, args, options);
        const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
        result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
        return result;
      }
      module.exports = spawn;
      module.exports.spawn = spawn;
      module.exports.sync = spawnSync;
      module.exports._parse = parse;
      module.exports._enoent = enoent;
    }
  });

  // ../node_modules/.pnpm/strip-final-newline@2.0.0/node_modules/strip-final-newline/index.js
  var require_strip_final_newline = __commonJS({
    "../node_modules/.pnpm/strip-final-newline@2.0.0/node_modules/strip-final-newline/index.js"(exports, module) {
      "use strict";
      module.exports = (input) => {
        const LF = typeof input === "string" ? "\n" : "\n".charCodeAt();
        const CR = typeof input === "string" ? "\r" : "\r".charCodeAt();
        if (input[input.length - 1] === LF) {
          input = input.slice(0, input.length - 1);
        }
        if (input[input.length - 1] === CR) {
          input = input.slice(0, input.length - 1);
        }
        return input;
      };
    }
  });

  // ../node_modules/.pnpm/npm-run-path@4.0.1/node_modules/npm-run-path/index.js
  var require_npm_run_path = __commonJS({
    "../node_modules/.pnpm/npm-run-path@4.0.1/node_modules/npm-run-path/index.js"(exports, module) {
      "use strict";
      var path4 = __require("path");
      var pathKey = require_path_key();
      var npmRunPath = (options) => {
        options = {
          cwd: process.cwd(),
          path: process.env[pathKey()],
          execPath: process.execPath,
          ...options
        };
        let previous;
        let cwdPath = path4.resolve(options.cwd);
        const result = [];
        while (previous !== cwdPath) {
          result.push(path4.join(cwdPath, "node_modules/.bin"));
          previous = cwdPath;
          cwdPath = path4.resolve(cwdPath, "..");
        }
        const execPathDir = path4.resolve(options.cwd, options.execPath, "..");
        result.push(execPathDir);
        return result.concat(options.path).join(path4.delimiter);
      };
      module.exports = npmRunPath;
      module.exports.default = npmRunPath;
      module.exports.env = (options) => {
        options = {
          env: process.env,
          ...options
        };
        const env2 = { ...options.env };
        const path5 = pathKey({ env: env2 });
        options.path = env2[path5];
        env2[path5] = module.exports(options);
        return env2;
      };
    }
  });

  // ../node_modules/.pnpm/mimic-fn@2.1.0/node_modules/mimic-fn/index.js
  var require_mimic_fn = __commonJS({
    "../node_modules/.pnpm/mimic-fn@2.1.0/node_modules/mimic-fn/index.js"(exports, module) {
      "use strict";
      var mimicFn = (to, from) => {
        for (const prop2 of Reflect.ownKeys(from)) {
          Object.defineProperty(to, prop2, Object.getOwnPropertyDescriptor(from, prop2));
        }
        return to;
      };
      module.exports = mimicFn;
      module.exports.default = mimicFn;
    }
  });

  // ../node_modules/.pnpm/onetime@5.1.2/node_modules/onetime/index.js
  var require_onetime = __commonJS({
    "../node_modules/.pnpm/onetime@5.1.2/node_modules/onetime/index.js"(exports, module) {
      "use strict";
      var mimicFn = require_mimic_fn();
      var calledFunctions = /* @__PURE__ */ new WeakMap();
      var onetime = (function_, options = {}) => {
        if (typeof function_ !== "function") {
          throw new TypeError("Expected a function");
        }
        let returnValue;
        let callCount = 0;
        const functionName = function_.displayName || function_.name || "<anonymous>";
        const onetime2 = function(...arguments_) {
          calledFunctions.set(onetime2, ++callCount);
          if (callCount === 1) {
            returnValue = function_.apply(this, arguments_);
            function_ = null;
          } else if (options.throw === true) {
            throw new Error(`Function \`${functionName}\` can only be called once`);
          }
          return returnValue;
        };
        mimicFn(onetime2, function_);
        calledFunctions.set(onetime2, callCount);
        return onetime2;
      };
      module.exports = onetime;
      module.exports.default = onetime;
      module.exports.callCount = (function_) => {
        if (!calledFunctions.has(function_)) {
          throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
        }
        return calledFunctions.get(function_);
      };
    }
  });

  // ../node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/core.js
  var require_core = __commonJS({
    "../node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/core.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SIGNALS = void 0;
      var SIGNALS = [
        {
          name: "SIGHUP",
          number: 1,
          action: "terminate",
          description: "Terminal closed",
          standard: "posix"
        },
        {
          name: "SIGINT",
          number: 2,
          action: "terminate",
          description: "User interruption with CTRL-C",
          standard: "ansi"
        },
        {
          name: "SIGQUIT",
          number: 3,
          action: "core",
          description: "User interruption with CTRL-\\",
          standard: "posix"
        },
        {
          name: "SIGILL",
          number: 4,
          action: "core",
          description: "Invalid machine instruction",
          standard: "ansi"
        },
        {
          name: "SIGTRAP",
          number: 5,
          action: "core",
          description: "Debugger breakpoint",
          standard: "posix"
        },
        {
          name: "SIGABRT",
          number: 6,
          action: "core",
          description: "Aborted",
          standard: "ansi"
        },
        {
          name: "SIGIOT",
          number: 6,
          action: "core",
          description: "Aborted",
          standard: "bsd"
        },
        {
          name: "SIGBUS",
          number: 7,
          action: "core",
          description: "Bus error due to misaligned, non-existing address or paging error",
          standard: "bsd"
        },
        {
          name: "SIGEMT",
          number: 7,
          action: "terminate",
          description: "Command should be emulated but is not implemented",
          standard: "other"
        },
        {
          name: "SIGFPE",
          number: 8,
          action: "core",
          description: "Floating point arithmetic error",
          standard: "ansi"
        },
        {
          name: "SIGKILL",
          number: 9,
          action: "terminate",
          description: "Forced termination",
          standard: "posix",
          forced: true
        },
        {
          name: "SIGUSR1",
          number: 10,
          action: "terminate",
          description: "Application-specific signal",
          standard: "posix"
        },
        {
          name: "SIGSEGV",
          number: 11,
          action: "core",
          description: "Segmentation fault",
          standard: "ansi"
        },
        {
          name: "SIGUSR2",
          number: 12,
          action: "terminate",
          description: "Application-specific signal",
          standard: "posix"
        },
        {
          name: "SIGPIPE",
          number: 13,
          action: "terminate",
          description: "Broken pipe or socket",
          standard: "posix"
        },
        {
          name: "SIGALRM",
          number: 14,
          action: "terminate",
          description: "Timeout or timer",
          standard: "posix"
        },
        {
          name: "SIGTERM",
          number: 15,
          action: "terminate",
          description: "Termination",
          standard: "ansi"
        },
        {
          name: "SIGSTKFLT",
          number: 16,
          action: "terminate",
          description: "Stack is empty or overflowed",
          standard: "other"
        },
        {
          name: "SIGCHLD",
          number: 17,
          action: "ignore",
          description: "Child process terminated, paused or unpaused",
          standard: "posix"
        },
        {
          name: "SIGCLD",
          number: 17,
          action: "ignore",
          description: "Child process terminated, paused or unpaused",
          standard: "other"
        },
        {
          name: "SIGCONT",
          number: 18,
          action: "unpause",
          description: "Unpaused",
          standard: "posix",
          forced: true
        },
        {
          name: "SIGSTOP",
          number: 19,
          action: "pause",
          description: "Paused",
          standard: "posix",
          forced: true
        },
        {
          name: "SIGTSTP",
          number: 20,
          action: "pause",
          description: 'Paused using CTRL-Z or "suspend"',
          standard: "posix"
        },
        {
          name: "SIGTTIN",
          number: 21,
          action: "pause",
          description: "Background process cannot read terminal input",
          standard: "posix"
        },
        {
          name: "SIGBREAK",
          number: 21,
          action: "terminate",
          description: "User interruption with CTRL-BREAK",
          standard: "other"
        },
        {
          name: "SIGTTOU",
          number: 22,
          action: "pause",
          description: "Background process cannot write to terminal output",
          standard: "posix"
        },
        {
          name: "SIGURG",
          number: 23,
          action: "ignore",
          description: "Socket received out-of-band data",
          standard: "bsd"
        },
        {
          name: "SIGXCPU",
          number: 24,
          action: "core",
          description: "Process timed out",
          standard: "bsd"
        },
        {
          name: "SIGXFSZ",
          number: 25,
          action: "core",
          description: "File too big",
          standard: "bsd"
        },
        {
          name: "SIGVTALRM",
          number: 26,
          action: "terminate",
          description: "Timeout or timer",
          standard: "bsd"
        },
        {
          name: "SIGPROF",
          number: 27,
          action: "terminate",
          description: "Timeout or timer",
          standard: "bsd"
        },
        {
          name: "SIGWINCH",
          number: 28,
          action: "ignore",
          description: "Terminal window size changed",
          standard: "bsd"
        },
        {
          name: "SIGIO",
          number: 29,
          action: "terminate",
          description: "I/O is available",
          standard: "other"
        },
        {
          name: "SIGPOLL",
          number: 29,
          action: "terminate",
          description: "Watched event",
          standard: "other"
        },
        {
          name: "SIGINFO",
          number: 29,
          action: "ignore",
          description: "Request for process information",
          standard: "other"
        },
        {
          name: "SIGPWR",
          number: 30,
          action: "terminate",
          description: "Device running out of power",
          standard: "systemv"
        },
        {
          name: "SIGSYS",
          number: 31,
          action: "core",
          description: "Invalid system call",
          standard: "other"
        },
        {
          name: "SIGUNUSED",
          number: 31,
          action: "terminate",
          description: "Invalid system call",
          standard: "other"
        }
      ];
      exports.SIGNALS = SIGNALS;
    }
  });

  // ../node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/realtime.js
  var require_realtime = __commonJS({
    "../node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/realtime.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SIGRTMAX = exports.getRealtimeSignals = void 0;
      var getRealtimeSignals = function() {
        const length = SIGRTMAX - SIGRTMIN + 1;
        return Array.from({ length }, getRealtimeSignal);
      };
      exports.getRealtimeSignals = getRealtimeSignals;
      var getRealtimeSignal = function(value, index) {
        return {
          name: `SIGRT${index + 1}`,
          number: SIGRTMIN + index,
          action: "terminate",
          description: "Application-specific signal (realtime)",
          standard: "posix"
        };
      };
      var SIGRTMIN = 34;
      var SIGRTMAX = 64;
      exports.SIGRTMAX = SIGRTMAX;
    }
  });

  // ../node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/signals.js
  var require_signals = __commonJS({
    "../node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/signals.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getSignals = void 0;
      var _os = __require("os");
      var _core = require_core();
      var _realtime = require_realtime();
      var getSignals = function() {
        const realtimeSignals = (0, _realtime.getRealtimeSignals)();
        const signals = [..._core.SIGNALS, ...realtimeSignals].map(normalizeSignal);
        return signals;
      };
      exports.getSignals = getSignals;
      var normalizeSignal = function({
        name,
        number: defaultNumber,
        description,
        action,
        forced = false,
        standard
      }) {
        const {
          signals: { [name]: constantSignal }
        } = _os.constants;
        const supported = constantSignal !== void 0;
        const number = supported ? constantSignal : defaultNumber;
        return { name, number, description, supported, action, forced, standard };
      };
    }
  });

  // ../node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/main.js
  var require_main = __commonJS({
    "../node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/main.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.signalsByNumber = exports.signalsByName = void 0;
      var _os = __require("os");
      var _signals = require_signals();
      var _realtime = require_realtime();
      var getSignalsByName = function() {
        const signals = (0, _signals.getSignals)();
        return signals.reduce(getSignalByName, {});
      };
      var getSignalByName = function(signalByNameMemo, { name, number, description, supported, action, forced, standard }) {
        return {
          ...signalByNameMemo,
          [name]: { name, number, description, supported, action, forced, standard }
        };
      };
      var signalsByName = getSignalsByName();
      exports.signalsByName = signalsByName;
      var getSignalsByNumber = function() {
        const signals = (0, _signals.getSignals)();
        const length = _realtime.SIGRTMAX + 1;
        const signalsA = Array.from({ length }, (value, number) => getSignalByNumber(number, signals));
        return Object.assign({}, ...signalsA);
      };
      var getSignalByNumber = function(number, signals) {
        const signal = findSignalByNumber(number, signals);
        if (signal === void 0) {
          return {};
        }
        const { name, description, supported, action, forced, standard } = signal;
        return {
          [number]: {
            name,
            number,
            description,
            supported,
            action,
            forced,
            standard
          }
        };
      };
      var findSignalByNumber = function(number, signals) {
        const signal = signals.find(({ name }) => _os.constants.signals[name] === number);
        if (signal !== void 0) {
          return signal;
        }
        return signals.find((signalA) => signalA.number === number);
      };
      var signalsByNumber = getSignalsByNumber();
      exports.signalsByNumber = signalsByNumber;
    }
  });

  // ../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/error.js
  var require_error = __commonJS({
    "../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/error.js"(exports, module) {
      "use strict";
      var { signalsByName } = require_main();
      var getErrorPrefix = ({ timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled }) => {
        if (timedOut) {
          return `timed out after ${timeout} milliseconds`;
        }
        if (isCanceled) {
          return "was canceled";
        }
        if (errorCode !== void 0) {
          return `failed with ${errorCode}`;
        }
        if (signal !== void 0) {
          return `was killed with ${signal} (${signalDescription})`;
        }
        if (exitCode !== void 0) {
          return `failed with exit code ${exitCode}`;
        }
        return "failed";
      };
      var makeError2 = ({
        stdout,
        stderr,
        all,
        error,
        signal,
        exitCode,
        command,
        escapedCommand,
        timedOut,
        isCanceled,
        killed,
        parsed: { options: { timeout } }
      }) => {
        exitCode = exitCode === null ? void 0 : exitCode;
        signal = signal === null ? void 0 : signal;
        const signalDescription = signal === void 0 ? void 0 : signalsByName[signal].description;
        const errorCode = error && error.code;
        const prefix = getErrorPrefix({ timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled });
        const execaMessage = `Command ${prefix}: ${command}`;
        const isError = Object.prototype.toString.call(error) === "[object Error]";
        const shortMessage = isError ? `${execaMessage}
${error.message}` : execaMessage;
        const message = [shortMessage, stderr, stdout].filter(Boolean).join("\n");
        if (isError) {
          error.originalMessage = error.message;
          error.message = message;
        } else {
          error = new Error(message);
        }
        error.shortMessage = shortMessage;
        error.command = command;
        error.escapedCommand = escapedCommand;
        error.exitCode = exitCode;
        error.signal = signal;
        error.signalDescription = signalDescription;
        error.stdout = stdout;
        error.stderr = stderr;
        if (all !== void 0) {
          error.all = all;
        }
        if ("bufferedData" in error) {
          delete error.bufferedData;
        }
        error.failed = true;
        error.timedOut = Boolean(timedOut);
        error.isCanceled = isCanceled;
        error.killed = killed && !timedOut;
        return error;
      };
      module.exports = makeError2;
    }
  });

  // ../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/stdio.js
  var require_stdio = __commonJS({
    "../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/stdio.js"(exports, module) {
      "use strict";
      var aliases = ["stdin", "stdout", "stderr"];
      var hasAlias = (options) => aliases.some((alias) => options[alias] !== void 0);
      var normalizeStdio = (options) => {
        if (!options) {
          return;
        }
        const { stdio } = options;
        if (stdio === void 0) {
          return aliases.map((alias) => options[alias]);
        }
        if (hasAlias(options)) {
          throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${aliases.map((alias) => `\`${alias}\``).join(", ")}`);
        }
        if (typeof stdio === "string") {
          return stdio;
        }
        if (!Array.isArray(stdio)) {
          throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
        }
        const length = Math.max(stdio.length, aliases.length);
        return Array.from({ length }, (value, index) => stdio[index]);
      };
      module.exports = normalizeStdio;
      module.exports.node = (options) => {
        const stdio = normalizeStdio(options);
        if (stdio === "ipc") {
          return "ipc";
        }
        if (stdio === void 0 || typeof stdio === "string") {
          return [stdio, stdio, stdio, "ipc"];
        }
        if (stdio.includes("ipc")) {
          return stdio;
        }
        return [...stdio, "ipc"];
      };
    }
  });

  // ../node_modules/.pnpm/signal-exit@3.0.7/node_modules/signal-exit/signals.js
  var require_signals2 = __commonJS({
    "../node_modules/.pnpm/signal-exit@3.0.7/node_modules/signal-exit/signals.js"(exports, module) {
      module.exports = [
        "SIGABRT",
        "SIGALRM",
        "SIGHUP",
        "SIGINT",
        "SIGTERM"
      ];
      if (process.platform !== "win32") {
        module.exports.push(
          "SIGVTALRM",
          "SIGXCPU",
          "SIGXFSZ",
          "SIGUSR2",
          "SIGTRAP",
          "SIGSYS",
          "SIGQUIT",
          "SIGIOT"
          // should detect profiler and enable/disable accordingly.
          // see #21
          // 'SIGPROF'
        );
      }
      if (process.platform === "linux") {
        module.exports.push(
          "SIGIO",
          "SIGPOLL",
          "SIGPWR",
          "SIGSTKFLT",
          "SIGUNUSED"
        );
      }
    }
  });

  // ../node_modules/.pnpm/signal-exit@3.0.7/node_modules/signal-exit/index.js
  var require_signal_exit = __commonJS({
    "../node_modules/.pnpm/signal-exit@3.0.7/node_modules/signal-exit/index.js"(exports, module) {
      var process3 = global.process;
      var processOk = function(process4) {
        return process4 && typeof process4 === "object" && typeof process4.removeListener === "function" && typeof process4.emit === "function" && typeof process4.reallyExit === "function" && typeof process4.listeners === "function" && typeof process4.kill === "function" && typeof process4.pid === "number" && typeof process4.on === "function";
      };
      if (!processOk(process3)) {
        module.exports = function() {
          return function() {
          };
        };
      } else {
        assert = __require("assert");
        signals = require_signals2();
        isWin = /^win/i.test(process3.platform);
        EE = __require("events");
        if (typeof EE !== "function") {
          EE = EE.EventEmitter;
        }
        if (process3.__signal_exit_emitter__) {
          emitter = process3.__signal_exit_emitter__;
        } else {
          emitter = process3.__signal_exit_emitter__ = new EE();
          emitter.count = 0;
          emitter.emitted = {};
        }
        if (!emitter.infinite) {
          emitter.setMaxListeners(Infinity);
          emitter.infinite = true;
        }
        module.exports = function(cb, opts) {
          if (!processOk(global.process)) {
            return function() {
            };
          }
          assert.equal(typeof cb, "function", "a callback must be provided for exit handler");
          if (loaded === false) {
            load();
          }
          var ev = "exit";
          if (opts && opts.alwaysLast) {
            ev = "afterexit";
          }
          var remove = function() {
            emitter.removeListener(ev, cb);
            if (emitter.listeners("exit").length === 0 && emitter.listeners("afterexit").length === 0) {
              unload();
            }
          };
          emitter.on(ev, cb);
          return remove;
        };
        unload = function unload2() {
          if (!loaded || !processOk(global.process)) {
            return;
          }
          loaded = false;
          signals.forEach(function(sig) {
            try {
              process3.removeListener(sig, sigListeners[sig]);
            } catch (er) {
            }
          });
          process3.emit = originalProcessEmit;
          process3.reallyExit = originalProcessReallyExit;
          emitter.count -= 1;
        };
        module.exports.unload = unload;
        emit = function emit2(event, code, signal) {
          if (emitter.emitted[event]) {
            return;
          }
          emitter.emitted[event] = true;
          emitter.emit(event, code, signal);
        };
        sigListeners = {};
        signals.forEach(function(sig) {
          sigListeners[sig] = function listener() {
            if (!processOk(global.process)) {
              return;
            }
            var listeners = process3.listeners(sig);
            if (listeners.length === emitter.count) {
              unload();
              emit("exit", null, sig);
              emit("afterexit", null, sig);
              if (isWin && sig === "SIGHUP") {
                sig = "SIGINT";
              }
              process3.kill(process3.pid, sig);
            }
          };
        });
        module.exports.signals = function() {
          return signals;
        };
        loaded = false;
        load = function load2() {
          if (loaded || !processOk(global.process)) {
            return;
          }
          loaded = true;
          emitter.count += 1;
          signals = signals.filter(function(sig) {
            try {
              process3.on(sig, sigListeners[sig]);
              return true;
            } catch (er) {
              return false;
            }
          });
          process3.emit = processEmit;
          process3.reallyExit = processReallyExit;
        };
        module.exports.load = load;
        originalProcessReallyExit = process3.reallyExit;
        processReallyExit = function processReallyExit2(code) {
          if (!processOk(global.process)) {
            return;
          }
          process3.exitCode = code || /* istanbul ignore next */
          0;
          emit("exit", process3.exitCode, null);
          emit("afterexit", process3.exitCode, null);
          originalProcessReallyExit.call(process3, process3.exitCode);
        };
        originalProcessEmit = process3.emit;
        processEmit = function processEmit2(ev, arg) {
          if (ev === "exit" && processOk(global.process)) {
            if (arg !== void 0) {
              process3.exitCode = arg;
            }
            var ret = originalProcessEmit.apply(this, arguments);
            emit("exit", process3.exitCode, null);
            emit("afterexit", process3.exitCode, null);
            return ret;
          } else {
            return originalProcessEmit.apply(this, arguments);
          }
        };
      }
      var assert;
      var signals;
      var isWin;
      var EE;
      var emitter;
      var unload;
      var emit;
      var sigListeners;
      var loaded;
      var load;
      var originalProcessReallyExit;
      var processReallyExit;
      var originalProcessEmit;
      var processEmit;
    }
  });

  // ../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/kill.js
  var require_kill = __commonJS({
    "../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/kill.js"(exports, module) {
      "use strict";
      var os = __require("os");
      var onExit = require_signal_exit();
      var DEFAULT_FORCE_KILL_TIMEOUT = 1e3 * 5;
      var spawnedKill = (kill, signal = "SIGTERM", options = {}) => {
        const killResult = kill(signal);
        setKillTimeout(kill, signal, options, killResult);
        return killResult;
      };
      var setKillTimeout = (kill, signal, options, killResult) => {
        if (!shouldForceKill(signal, options, killResult)) {
          return;
        }
        const timeout = getForceKillAfterTimeout(options);
        const t = setTimeout(() => {
          kill("SIGKILL");
        }, timeout);
        if (t.unref) {
          t.unref();
        }
      };
      var shouldForceKill = (signal, { forceKillAfterTimeout }, killResult) => {
        return isSigterm(signal) && forceKillAfterTimeout !== false && killResult;
      };
      var isSigterm = (signal) => {
        return signal === os.constants.signals.SIGTERM || typeof signal === "string" && signal.toUpperCase() === "SIGTERM";
      };
      var getForceKillAfterTimeout = ({ forceKillAfterTimeout = true }) => {
        if (forceKillAfterTimeout === true) {
          return DEFAULT_FORCE_KILL_TIMEOUT;
        }
        if (!Number.isFinite(forceKillAfterTimeout) || forceKillAfterTimeout < 0) {
          throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${forceKillAfterTimeout}\` (${typeof forceKillAfterTimeout})`);
        }
        return forceKillAfterTimeout;
      };
      var spawnedCancel = (spawned, context) => {
        const killResult = spawned.kill();
        if (killResult) {
          context.isCanceled = true;
        }
      };
      var timeoutKill = (spawned, signal, reject) => {
        spawned.kill(signal);
        reject(Object.assign(new Error("Timed out"), { timedOut: true, signal }));
      };
      var setupTimeout = (spawned, { timeout, killSignal = "SIGTERM" }, spawnedPromise) => {
        if (timeout === 0 || timeout === void 0) {
          return spawnedPromise;
        }
        let timeoutId;
        const timeoutPromise = new Promise((resolve, reject) => {
          timeoutId = setTimeout(() => {
            timeoutKill(spawned, killSignal, reject);
          }, timeout);
        });
        const safeSpawnedPromise = spawnedPromise.finally(() => {
          clearTimeout(timeoutId);
        });
        return Promise.race([timeoutPromise, safeSpawnedPromise]);
      };
      var validateTimeout = ({ timeout }) => {
        if (timeout !== void 0 && (!Number.isFinite(timeout) || timeout < 0)) {
          throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${timeout}\` (${typeof timeout})`);
        }
      };
      var setExitHandler = async (spawned, { cleanup, detached }, timedPromise) => {
        if (!cleanup || detached) {
          return timedPromise;
        }
        const removeExitHandler = onExit(() => {
          spawned.kill();
        });
        return timedPromise.finally(() => {
          removeExitHandler();
        });
      };
      module.exports = {
        spawnedKill,
        spawnedCancel,
        setupTimeout,
        validateTimeout,
        setExitHandler
      };
    }
  });

  // ../node_modules/.pnpm/is-stream@2.0.1/node_modules/is-stream/index.js
  var require_is_stream = __commonJS({
    "../node_modules/.pnpm/is-stream@2.0.1/node_modules/is-stream/index.js"(exports, module) {
      "use strict";
      var isStream = (stream) => stream !== null && typeof stream === "object" && typeof stream.pipe === "function";
      isStream.writable = (stream) => isStream(stream) && stream.writable !== false && typeof stream._write === "function" && typeof stream._writableState === "object";
      isStream.readable = (stream) => isStream(stream) && stream.readable !== false && typeof stream._read === "function" && typeof stream._readableState === "object";
      isStream.duplex = (stream) => isStream.writable(stream) && isStream.readable(stream);
      isStream.transform = (stream) => isStream.duplex(stream) && typeof stream._transform === "function";
      module.exports = isStream;
    }
  });

  // ../node_modules/.pnpm/get-stream@6.0.1/node_modules/get-stream/buffer-stream.js
  var require_buffer_stream = __commonJS({
    "../node_modules/.pnpm/get-stream@6.0.1/node_modules/get-stream/buffer-stream.js"(exports, module) {
      "use strict";
      var { PassThrough: PassThroughStream } = __require("stream");
      module.exports = (options) => {
        options = { ...options };
        const { array } = options;
        let { encoding } = options;
        const isBuffer = encoding === "buffer";
        let objectMode = false;
        if (array) {
          objectMode = !(encoding || isBuffer);
        } else {
          encoding = encoding || "utf8";
        }
        if (isBuffer) {
          encoding = null;
        }
        const stream = new PassThroughStream({ objectMode });
        if (encoding) {
          stream.setEncoding(encoding);
        }
        let length = 0;
        const chunks = [];
        stream.on("data", (chunk) => {
          chunks.push(chunk);
          if (objectMode) {
            length = chunks.length;
          } else {
            length += chunk.length;
          }
        });
        stream.getBufferedValue = () => {
          if (array) {
            return chunks;
          }
          return isBuffer ? Buffer.concat(chunks, length) : chunks.join("");
        };
        stream.getBufferedLength = () => length;
        return stream;
      };
    }
  });

  // ../node_modules/.pnpm/get-stream@6.0.1/node_modules/get-stream/index.js
  var require_get_stream = __commonJS({
    "../node_modules/.pnpm/get-stream@6.0.1/node_modules/get-stream/index.js"(exports, module) {
      "use strict";
      var { constants: BufferConstants } = __require("buffer");
      var stream = __require("stream");
      var { promisify } = __require("util");
      var bufferStream = require_buffer_stream();
      var streamPipelinePromisified = promisify(stream.pipeline);
      var MaxBufferError = class extends Error {
        constructor() {
          super("maxBuffer exceeded");
          this.name = "MaxBufferError";
        }
      };
      async function getStream(inputStream, options) {
        if (!inputStream) {
          throw new Error("Expected a stream");
        }
        options = {
          maxBuffer: Infinity,
          ...options
        };
        const { maxBuffer } = options;
        const stream2 = bufferStream(options);
        await new Promise((resolve, reject) => {
          const rejectPromise = (error) => {
            if (error && stream2.getBufferedLength() <= BufferConstants.MAX_LENGTH) {
              error.bufferedData = stream2.getBufferedValue();
            }
            reject(error);
          };
          (async () => {
            try {
              await streamPipelinePromisified(inputStream, stream2);
              resolve();
            } catch (error) {
              rejectPromise(error);
            }
          })();
          stream2.on("data", () => {
            if (stream2.getBufferedLength() > maxBuffer) {
              rejectPromise(new MaxBufferError());
            }
          });
        });
        return stream2.getBufferedValue();
      }
      module.exports = getStream;
      module.exports.buffer = (stream2, options) => getStream(stream2, { ...options, encoding: "buffer" });
      module.exports.array = (stream2, options) => getStream(stream2, { ...options, array: true });
      module.exports.MaxBufferError = MaxBufferError;
    }
  });

  // ../node_modules/.pnpm/merge-stream@2.0.0/node_modules/merge-stream/index.js
  var require_merge_stream = __commonJS({
    "../node_modules/.pnpm/merge-stream@2.0.0/node_modules/merge-stream/index.js"(exports, module) {
      "use strict";
      var { PassThrough } = __require("stream");
      module.exports = function() {
        var sources = [];
        var output = new PassThrough({ objectMode: true });
        output.setMaxListeners(0);
        output.add = add;
        output.isEmpty = isEmpty;
        output.on("unpipe", remove);
        Array.prototype.slice.call(arguments).forEach(add);
        return output;
        function add(source) {
          if (Array.isArray(source)) {
            source.forEach(add);
            return this;
          }
          sources.push(source);
          source.once("end", remove.bind(null, source));
          source.once("error", output.emit.bind(output, "error"));
          source.pipe(output, { end: false });
          return this;
        }
        function isEmpty() {
          return sources.length == 0;
        }
        function remove(source) {
          sources = sources.filter(function(it) {
            return it !== source;
          });
          if (!sources.length && output.readable) {
            output.end();
          }
        }
      };
    }
  });

  // ../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/stream.js
  var require_stream = __commonJS({
    "../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/stream.js"(exports, module) {
      "use strict";
      var isStream = require_is_stream();
      var getStream = require_get_stream();
      var mergeStream = require_merge_stream();
      var handleInput = (spawned, input) => {
        if (input === void 0 || spawned.stdin === void 0) {
          return;
        }
        if (isStream(input)) {
          input.pipe(spawned.stdin);
        } else {
          spawned.stdin.end(input);
        }
      };
      var makeAllStream = (spawned, { all }) => {
        if (!all || !spawned.stdout && !spawned.stderr) {
          return;
        }
        const mixed = mergeStream();
        if (spawned.stdout) {
          mixed.add(spawned.stdout);
        }
        if (spawned.stderr) {
          mixed.add(spawned.stderr);
        }
        return mixed;
      };
      var getBufferedData = async (stream, streamPromise) => {
        if (!stream) {
          return;
        }
        stream.destroy();
        try {
          return await streamPromise;
        } catch (error) {
          return error.bufferedData;
        }
      };
      var getStreamPromise = (stream, { encoding, buffer, maxBuffer }) => {
        if (!stream || !buffer) {
          return;
        }
        if (encoding) {
          return getStream(stream, { encoding, maxBuffer });
        }
        return getStream.buffer(stream, { maxBuffer });
      };
      var getSpawnedResult = async ({ stdout, stderr, all }, { encoding, buffer, maxBuffer }, processDone) => {
        const stdoutPromise = getStreamPromise(stdout, { encoding, buffer, maxBuffer });
        const stderrPromise = getStreamPromise(stderr, { encoding, buffer, maxBuffer });
        const allPromise = getStreamPromise(all, { encoding, buffer, maxBuffer: maxBuffer * 2 });
        try {
          return await Promise.all([processDone, stdoutPromise, stderrPromise, allPromise]);
        } catch (error) {
          return Promise.all([
            { error, signal: error.signal, timedOut: error.timedOut },
            getBufferedData(stdout, stdoutPromise),
            getBufferedData(stderr, stderrPromise),
            getBufferedData(all, allPromise)
          ]);
        }
      };
      var validateInputSync = ({ input }) => {
        if (isStream(input)) {
          throw new TypeError("The `input` option cannot be a stream in sync mode");
        }
      };
      module.exports = {
        handleInput,
        makeAllStream,
        getSpawnedResult,
        validateInputSync
      };
    }
  });

  // ../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/promise.js
  var require_promise = __commonJS({
    "../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/promise.js"(exports, module) {
      "use strict";
      var nativePromisePrototype = (/* @__PURE__ */ (async () => {
      })()).constructor.prototype;
      var descriptors = ["then", "catch", "finally"].map((property) => [
        property,
        Reflect.getOwnPropertyDescriptor(nativePromisePrototype, property)
      ]);
      var mergePromise = (spawned, promise) => {
        for (const [property, descriptor] of descriptors) {
          const value = typeof promise === "function" ? (...args) => Reflect.apply(descriptor.value, promise(), args) : descriptor.value.bind(promise);
          Reflect.defineProperty(spawned, property, { ...descriptor, value });
        }
        return spawned;
      };
      var getSpawnedPromise = (spawned) => {
        return new Promise((resolve, reject) => {
          spawned.on("exit", (exitCode, signal) => {
            resolve({ exitCode, signal });
          });
          spawned.on("error", (error) => {
            reject(error);
          });
          if (spawned.stdin) {
            spawned.stdin.on("error", (error) => {
              reject(error);
            });
          }
        });
      };
      module.exports = {
        mergePromise,
        getSpawnedPromise
      };
    }
  });

  // ../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/command.js
  var require_command = __commonJS({
    "../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/command.js"(exports, module) {
      "use strict";
      var normalizeArgs = (file, args = []) => {
        if (!Array.isArray(args)) {
          return [file];
        }
        return [file, ...args];
      };
      var NO_ESCAPE_REGEXP = /^[\w.-]+$/;
      var DOUBLE_QUOTES_REGEXP = /"/g;
      var escapeArg = (arg) => {
        if (typeof arg !== "string" || NO_ESCAPE_REGEXP.test(arg)) {
          return arg;
        }
        return `"${arg.replace(DOUBLE_QUOTES_REGEXP, '\\"')}"`;
      };
      var joinCommand = (file, args) => {
        return normalizeArgs(file, args).join(" ");
      };
      var getEscapedCommand = (file, args) => {
        return normalizeArgs(file, args).map((arg) => escapeArg(arg)).join(" ");
      };
      var SPACES_REGEXP = / +/g;
      var parseCommand = (command) => {
        const tokens = [];
        for (const token of command.trim().split(SPACES_REGEXP)) {
          const previousToken = tokens[tokens.length - 1];
          if (previousToken && previousToken.endsWith("\\")) {
            tokens[tokens.length - 1] = `${previousToken.slice(0, -1)} ${token}`;
          } else {
            tokens.push(token);
          }
        }
        return tokens;
      };
      module.exports = {
        joinCommand,
        getEscapedCommand,
        parseCommand
      };
    }
  });

  // ../node_modules/.pnpm/execa@5.1.1/node_modules/execa/index.js
  var require_execa = __commonJS({
    "../node_modules/.pnpm/execa@5.1.1/node_modules/execa/index.js"(exports, module) {
      "use strict";
      var path4 = __require("path");
      var childProcess = __require("child_process");
      var crossSpawn = require_cross_spawn();
      var stripFinalNewline = require_strip_final_newline();
      var npmRunPath = require_npm_run_path();
      var onetime = require_onetime();
      var makeError2 = require_error();
      var normalizeStdio = require_stdio();
      var { spawnedKill, spawnedCancel, setupTimeout, validateTimeout, setExitHandler } = require_kill();
      var { handleInput, getSpawnedResult, makeAllStream, validateInputSync } = require_stream();
      var { mergePromise, getSpawnedPromise } = require_promise();
      var { joinCommand, parseCommand, getEscapedCommand } = require_command();
      var DEFAULT_MAX_BUFFER = 1e3 * 1e3 * 100;
      var getEnv = ({ env: envOption, extendEnv, preferLocal, localDir, execPath }) => {
        const env2 = extendEnv ? { ...process.env, ...envOption } : envOption;
        if (preferLocal) {
          return npmRunPath.env({ env: env2, cwd: localDir, execPath });
        }
        return env2;
      };
      var handleArguments = (file, args, options = {}) => {
        const parsed = crossSpawn._parse(file, args, options);
        file = parsed.command;
        args = parsed.args;
        options = parsed.options;
        options = {
          maxBuffer: DEFAULT_MAX_BUFFER,
          buffer: true,
          stripFinalNewline: true,
          extendEnv: true,
          preferLocal: false,
          localDir: options.cwd || process.cwd(),
          execPath: process.execPath,
          encoding: "utf8",
          reject: true,
          cleanup: true,
          all: false,
          windowsHide: true,
          ...options
        };
        options.env = getEnv(options);
        options.stdio = normalizeStdio(options);
        if (process.platform === "win32" && path4.basename(file, ".exe") === "cmd") {
          args.unshift("/q");
        }
        return { file, args, options, parsed };
      };
      var handleOutput = (options, value, error) => {
        if (typeof value !== "string" && !Buffer.isBuffer(value)) {
          return error === void 0 ? void 0 : "";
        }
        if (options.stripFinalNewline) {
          return stripFinalNewline(value);
        }
        return value;
      };
      var execa5 = (file, args, options) => {
        const parsed = handleArguments(file, args, options);
        const command = joinCommand(file, args);
        const escapedCommand = getEscapedCommand(file, args);
        validateTimeout(parsed.options);
        let spawned;
        try {
          spawned = childProcess.spawn(parsed.file, parsed.args, parsed.options);
        } catch (error) {
          const dummySpawned = new childProcess.ChildProcess();
          const errorPromise = Promise.reject(makeError2({
            error,
            stdout: "",
            stderr: "",
            all: "",
            command,
            escapedCommand,
            parsed,
            timedOut: false,
            isCanceled: false,
            killed: false
          }));
          return mergePromise(dummySpawned, errorPromise);
        }
        const spawnedPromise = getSpawnedPromise(spawned);
        const timedPromise = setupTimeout(spawned, parsed.options, spawnedPromise);
        const processDone = setExitHandler(spawned, parsed.options, timedPromise);
        const context = { isCanceled: false };
        spawned.kill = spawnedKill.bind(null, spawned.kill.bind(spawned));
        spawned.cancel = spawnedCancel.bind(null, spawned, context);
        const handlePromise = async () => {
          const [{ error, exitCode, signal, timedOut }, stdoutResult, stderrResult, allResult] = await getSpawnedResult(spawned, parsed.options, processDone);
          const stdout = handleOutput(parsed.options, stdoutResult);
          const stderr = handleOutput(parsed.options, stderrResult);
          const all = handleOutput(parsed.options, allResult);
          if (error || exitCode !== 0 || signal !== null) {
            const returnedError = makeError2({
              error,
              exitCode,
              signal,
              stdout,
              stderr,
              all,
              command,
              escapedCommand,
              parsed,
              timedOut,
              isCanceled: context.isCanceled,
              killed: spawned.killed
            });
            if (!parsed.options.reject) {
              return returnedError;
            }
            throw returnedError;
          }
          return {
            command,
            escapedCommand,
            exitCode: 0,
            stdout,
            stderr,
            all,
            failed: false,
            timedOut: false,
            isCanceled: false,
            killed: false
          };
        };
        const handlePromiseOnce = onetime(handlePromise);
        handleInput(spawned, parsed.options.input);
        spawned.all = makeAllStream(spawned, parsed.options);
        return mergePromise(spawned, handlePromiseOnce);
      };
      module.exports = execa5;
      module.exports.sync = (file, args, options) => {
        const parsed = handleArguments(file, args, options);
        const command = joinCommand(file, args);
        const escapedCommand = getEscapedCommand(file, args);
        validateInputSync(parsed.options);
        let result;
        try {
          result = childProcess.spawnSync(parsed.file, parsed.args, parsed.options);
        } catch (error) {
          throw makeError2({
            error,
            stdout: "",
            stderr: "",
            all: "",
            command,
            escapedCommand,
            parsed,
            timedOut: false,
            isCanceled: false,
            killed: false
          });
        }
        const stdout = handleOutput(parsed.options, result.stdout, result.error);
        const stderr = handleOutput(parsed.options, result.stderr, result.error);
        if (result.error || result.status !== 0 || result.signal !== null) {
          const error = makeError2({
            stdout,
            stderr,
            error: result.error,
            signal: result.signal,
            exitCode: result.status,
            command,
            escapedCommand,
            parsed,
            timedOut: result.error && result.error.code === "ETIMEDOUT",
            isCanceled: false,
            killed: result.signal !== null
          });
          if (!parsed.options.reject) {
            return error;
          }
          throw error;
        }
        return {
          command,
          escapedCommand,
          exitCode: 0,
          stdout,
          stderr,
          failed: false,
          timedOut: false,
          isCanceled: false,
          killed: false
        };
      };
      module.exports.command = (command, options) => {
        const [file, ...args] = parseCommand(command);
        return execa5(file, args, options);
      };
      module.exports.commandSync = (command, options) => {
        const [file, ...args] = parseCommand(command);
        return execa5.sync(file, args, options);
      };
      module.exports.node = (scriptPath, args, options = {}) => {
        if (args && !Array.isArray(args) && typeof args === "object") {
          options = args;
          args = [];
        }
        const stdio = normalizeStdio.node(options);
        const defaultExecArgv = process.execArgv.filter((arg) => !arg.startsWith("--inspect"));
        const {
          nodePath = process.execPath,
          nodeOptions = defaultExecArgv
        } = options;
        return execa5(
          nodePath,
          [
            ...nodeOptions,
            scriptPath,
            ...Array.isArray(args) ? args : []
          ],
          {
            ...options,
            stdin: void 0,
            stdout: void 0,
            stderr: void 0,
            stdio,
            shell: false
          }
        );
      };
    }
  });

  // ../node_modules/.pnpm/arch@2.2.0/node_modules/arch/index.js
  var require_arch = __commonJS({
    "../node_modules/.pnpm/arch@2.2.0/node_modules/arch/index.js"(exports, module) {
      var cp = __require("child_process");
      var fs = __require("fs");
      var path4 = __require("path");
      module.exports = function arch2() {
        if (process.arch === "x64") {
          return "x64";
        }
        if (process.platform === "darwin") {
          return "x64";
        }
        if (process.platform === "win32") {
          var useEnv = false;
          try {
            useEnv = !!(process.env.SYSTEMROOT && fs.statSync(process.env.SYSTEMROOT));
          } catch (err) {
          }
          var sysRoot = useEnv ? process.env.SYSTEMROOT : "C:\\Windows";
          var isWOW64 = false;
          try {
            isWOW64 = !!fs.statSync(path4.join(sysRoot, "sysnative"));
          } catch (err) {
          }
          return isWOW64 ? "x64" : "x86";
        }
        if (process.platform === "linux") {
          var output = cp.execSync("getconf LONG_BIT", { encoding: "utf8" });
          return output === "64\n" ? "x64" : "x86";
        }
        return "x86";
      };
    }
  });

  // ../node_modules/.pnpm/clipboardy@3.0.0/node_modules/clipboardy/index.js
  var import_node_process = __toESM(__require("node:process"), 1);
  var import_is_wsl = __toESM(require_is_wsl(), 1);

  // ../node_modules/.pnpm/clipboardy@3.0.0/node_modules/clipboardy/lib/termux.js
  var import_execa = __toESM(require_execa(), 1);
  var handler = (error) => {
    if (error.code === "ENOENT") {
      throw new Error("Couldn't find the termux-api scripts. You can install them with: apt install termux-api");
    }
    throw error;
  };
  var clipboard = {
    copy: async (options) => {
      try {
        await (0, import_execa.default)("termux-clipboard-set", options);
      } catch (error) {
        handler(error);
      }
    },
    paste: async (options) => {
      try {
        const { stdout } = await (0, import_execa.default)("termux-clipboard-get", options);
        return stdout;
      } catch (error) {
        handler(error);
      }
    },
    copySync: (options) => {
      try {
        import_execa.default.sync("termux-clipboard-set", options);
      } catch (error) {
        handler(error);
      }
    },
    pasteSync: (options) => {
      try {
        return import_execa.default.sync("termux-clipboard-get", options).stdout;
      } catch (error) {
        handler(error);
      }
    }
  };
  var termux_default = clipboard;

  // ../node_modules/.pnpm/clipboardy@3.0.0/node_modules/clipboardy/lib/linux.js
  var import_node_path = __toESM(__require("node:path"), 1);
  var import_node_url = __require("node:url");
  var import_execa2 = __toESM(require_execa(), 1);
  var import_meta = {};
  var __dirname = import_node_path.default.dirname((0, import_node_url.fileURLToPath)(import_meta.url));
  var xsel = "xsel";
  var xselFallback = import_node_path.default.join(__dirname, "../fallbacks/linux/xsel");
  var copyArguments = ["--clipboard", "--input"];
  var pasteArguments = ["--clipboard", "--output"];
  var makeError = (xselError, fallbackError) => {
    let error;
    if (xselError.code === "ENOENT") {
      error = new Error("Couldn't find the `xsel` binary and fallback didn't work. On Debian/Ubuntu you can install xsel with: sudo apt install xsel");
    } else {
      error = new Error("Both xsel and fallback failed");
      error.xselError = xselError;
    }
    error.fallbackError = fallbackError;
    return error;
  };
  var xselWithFallback = async (argumentList, options) => {
    try {
      const { stdout } = await (0, import_execa2.default)(xsel, argumentList, options);
      return stdout;
    } catch (xselError) {
      try {
        const { stdout } = await (0, import_execa2.default)(xselFallback, argumentList, options);
        return stdout;
      } catch (fallbackError) {
        throw makeError(xselError, fallbackError);
      }
    }
  };
  var xselWithFallbackSync = (argumentList, options) => {
    try {
      return import_execa2.default.sync(xsel, argumentList, options).stdout;
    } catch (xselError) {
      try {
        return import_execa2.default.sync(xselFallback, argumentList, options).stdout;
      } catch (fallbackError) {
        throw makeError(xselError, fallbackError);
      }
    }
  };
  var clipboard2 = {
    copy: async (options) => {
      await xselWithFallback(copyArguments, options);
    },
    copySync: (options) => {
      xselWithFallbackSync(copyArguments, options);
    },
    paste: (options) => xselWithFallback(pasteArguments, options),
    pasteSync: (options) => xselWithFallbackSync(pasteArguments, options)
  };
  var linux_default = clipboard2;

  // ../node_modules/.pnpm/clipboardy@3.0.0/node_modules/clipboardy/lib/macos.js
  var import_execa3 = __toESM(require_execa(), 1);
  var env = {
    LC_CTYPE: "UTF-8"
  };
  var clipboard3 = {
    copy: async (options) => (0, import_execa3.default)("pbcopy", { ...options, env }),
    paste: async (options) => {
      const { stdout } = await (0, import_execa3.default)("pbpaste", { ...options, env });
      return stdout;
    },
    copySync: (options) => import_execa3.default.sync("pbcopy", { ...options, env }),
    pasteSync: (options) => import_execa3.default.sync("pbpaste", { ...options, env }).stdout
  };
  var macos_default = clipboard3;

  // ../node_modules/.pnpm/clipboardy@3.0.0/node_modules/clipboardy/lib/windows.js
  var import_node_path2 = __toESM(__require("node:path"), 1);
  var import_node_url2 = __require("node:url");
  var import_execa4 = __toESM(require_execa(), 1);
  var import_arch = __toESM(require_arch(), 1);
  var import_meta2 = {};
  var __dirname2 = import_node_path2.default.dirname((0, import_node_url2.fileURLToPath)(import_meta2.url));
  var binarySuffix = (0, import_arch.default)() === "x64" ? "x86_64" : "i686";
  var windowBinaryPath = import_node_path2.default.join(__dirname2, `../fallbacks/windows/clipboard_${binarySuffix}.exe`);
  var clipboard4 = {
    copy: async (options) => (0, import_execa4.default)(windowBinaryPath, ["--copy"], options),
    paste: async (options) => {
      const { stdout } = await (0, import_execa4.default)(windowBinaryPath, ["--paste"], options);
      return stdout;
    },
    copySync: (options) => import_execa4.default.sync(windowBinaryPath, ["--copy"], options),
    pasteSync: (options) => import_execa4.default.sync(windowBinaryPath, ["--paste"], options).stdout
  };
  var windows_default = clipboard4;

  // ../node_modules/.pnpm/clipboardy@3.0.0/node_modules/clipboardy/index.js
  var platformLib = (() => {
    switch (import_node_process.default.platform) {
      case "darwin":
        return macos_default;
      case "win32":
        return windows_default;
      case "android":
        if (import_node_process.default.env.PREFIX !== "/data/data/com.termux/files/usr") {
          throw new Error("You need to install Termux for this module to work on Android: https://termux.com");
        }
        return termux_default;
      default:
        if (import_is_wsl.default) {
          return windows_default;
        }
        return linux_default;
    }
  })();
  var clipboard5 = {};
  clipboard5.write = async (text) => {
    if (typeof text !== "string") {
      throw new TypeError(`Expected a string, got ${typeof text}`);
    }
    await platformLib.copy({ input: text });
  };
  clipboard5.read = async () => platformLib.paste({ stripFinalNewline: false });
  clipboard5.writeSync = (text) => {
    if (typeof text !== "string") {
      throw new TypeError(`Expected a string, got ${typeof text}`);
    }
    platformLib.copySync({ input: text });
  };
  clipboard5.readSync = () => platformLib.pasteSync({ stripFinalNewline: false });
  var clipboardy_default = clipboard5;

  // ../node_modules/.pnpm/hotkey-mapper@1.2.6/node_modules/hotkey-mapper/dist/index.mjs
  var { keys } = Object;
  function mapObject(fn, obj) {
    if (arguments.length === 1) {
      return (_obj) => mapObject(fn, _obj);
    }
    let index = 0;
    const objKeys = keys(obj);
    const len = objKeys.length;
    const willReturn = {};
    while (index < len) {
      const key = objKeys[index];
      willReturn[key] = fn(
        obj[key],
        key,
        obj
      );
      index++;
    }
    return willReturn;
  }
  var mapObjIndexed = mapObject;
  function hotkeyMapper(mapping, options) {
    const handler2 = (event) => {
      const key = event.key.toLowerCase();
      const code = event.code.toLowerCase();
      const simp = code.replace(/^(?:Key|Digit|Numpad)/, "");
      const map = new Proxy(event, {
        get: (target, p) => Boolean(
          {
            [`${key}Key`]: true,
            [`${code}Key`]: true,
            [`${simp}Key`]: true
          }[p] ?? target[p]
        )
      });
      const mods = "meta+alt+shift+ctrl";
      mapObjIndexed((fn, hotkey) => {
        const conds = `${mods}+${hotkey.toLowerCase()}`.replace(/win|command|search/, "meta").replace(/control/, "ctrl").split("+").map((k, i) => [k, i >= 4 === map[`${k}Key`]]);
        if (!Object.entries(Object.fromEntries(conds)).every(([, ok]) => ok))
          return;
        event.stopPropagation(), event.preventDefault();
        return fn(event);
      }, mapping);
    };
    window.addEventListener(options?.on ?? "keydown", handler2, options);
    return function unload() {
      window.removeEventListener(options?.on ?? "keydown", handler2, options);
    };
  }

  // ../node_modules/.pnpm/rambda@7.3.0/node_modules/rambda/dist/rambda.mjs
  var cloneList = (list) => Array.prototype.slice.call(list);
  function curry(fn, args = []) {
    return (..._args) => ((rest) => rest.length >= fn.length ? fn(...rest) : curry(fn, rest))([...args, ..._args]);
  }
  function adjustFn(index, replaceFn2, list) {
    const actualIndex = index < 0 ? list.length + index : index;
    if (index >= list.length || actualIndex < 0)
      return list;
    const clone = cloneList(list);
    clone[actualIndex] = replaceFn2(clone[actualIndex]);
    return clone;
  }
  var adjust = curry(adjustFn);
  function always(x) {
    return (_) => x;
  }
  var {
    isArray
  } = Array;
  function assocFn(prop2, newValue, obj) {
    return Object.assign({}, obj, {
      [prop2]: newValue
    });
  }
  var assoc = curry(assocFn);
  function _isInteger(n) {
    return n << 0 === n;
  }
  var isInteger = Number.isInteger || _isInteger;
  function assocPathFn(path4, newValue, input) {
    const pathArrValue = typeof path4 === "string" ? path4.split(".").map((x) => isInteger(Number(x)) ? Number(x) : x) : path4;
    if (pathArrValue.length === 0) {
      return newValue;
    }
    const index = pathArrValue[0];
    if (pathArrValue.length > 1) {
      const condition = typeof input !== "object" || input === null || !input.hasOwnProperty(index);
      const nextInput = condition ? isInteger(pathArrValue[1]) ? [] : {} : input[index];
      newValue = assocPathFn(Array.prototype.slice.call(pathArrValue, 1), newValue, nextInput);
    }
    if (isInteger(index) && isArray(input)) {
      const arr = cloneList(input);
      arr[index] = newValue;
      return arr;
    }
    return assoc(index, newValue, input);
  }
  var assocPath = curry(assocPathFn);
  function clampFn(min, max, input) {
    if (min > max) {
      throw new Error("min must not be greater than max in clamp(min, max, value)");
    }
    if (input >= min && input <= max)
      return input;
    if (input > max)
      return max;
    if (input < min)
      return min;
  }
  var clamp = curry(clampFn);
  var ReduceStopper = class {
    constructor(value) {
      this.value = value;
    }
  };
  function reduceFn(reducer, acc, list) {
    if (!isArray(list)) {
      throw new TypeError("reduce: list must be array or iterable");
    }
    let index = 0;
    const len = list.length;
    while (index < len) {
      acc = reducer(acc, list[index], index, list);
      if (acc instanceof ReduceStopper) {
        return acc.value;
      }
      index++;
    }
    return acc;
  }
  var reduce = curry(reduceFn);
  var {
    keys: keys$1
  } = Object;
  function isFalsy(input) {
    return input === void 0 || input === null || Number.isNaN(input) === true;
  }
  function defaultTo(defaultArgument, input) {
    if (arguments.length === 1) {
      return (_input) => defaultTo(defaultArgument, _input);
    }
    return isFalsy(input) ? defaultArgument : input;
  }
  function type(input) {
    if (input === null) {
      return "Null";
    } else if (input === void 0) {
      return "Undefined";
    } else if (Number.isNaN(input)) {
      return "NaN";
    }
    const typeResult = Object.prototype.toString.call(input).slice(8, -1);
    return typeResult === "AsyncFunction" ? "Promise" : typeResult;
  }
  function _indexOf(valueToFind, list) {
    if (!isArray(list)) {
      throw new Error(`Cannot read property 'indexOf' of ${list}`);
    }
    const typeOfValue = type(valueToFind);
    if (!["Object", "Array", "NaN", "RegExp"].includes(typeOfValue))
      return list.indexOf(valueToFind);
    let index = -1;
    let foundIndex = -1;
    const {
      length
    } = list;
    while (++index < length && foundIndex === -1) {
      if (equals(list[index], valueToFind)) {
        foundIndex = index;
      }
    }
    return foundIndex;
  }
  function _arrayFromIterator(iter) {
    const list = [];
    let next;
    while (!(next = iter.next()).done) {
      list.push(next.value);
    }
    return list;
  }
  function _equalsSets(a, b) {
    if (a.size !== b.size) {
      return false;
    }
    const aList = _arrayFromIterator(a.values());
    const bList = _arrayFromIterator(b.values());
    const filtered = aList.filter((aInstance) => _indexOf(aInstance, bList) === -1);
    return filtered.length === 0;
  }
  function parseError(maybeError) {
    const typeofError = maybeError.__proto__.toString();
    if (!["Error", "TypeError"].includes(typeofError))
      return [];
    return [typeofError, maybeError.message];
  }
  function parseDate(maybeDate) {
    if (!maybeDate.toDateString)
      return [false];
    return [true, maybeDate.getTime()];
  }
  function parseRegex(maybeRegex) {
    if (maybeRegex.constructor !== RegExp)
      return [false];
    return [true, maybeRegex.toString()];
  }
  function equals(a, b) {
    if (arguments.length === 1)
      return (_b) => equals(a, _b);
    const aType = type(a);
    if (aType !== type(b))
      return false;
    if (aType === "Function") {
      return a.name === void 0 ? false : a.name === b.name;
    }
    if (["NaN", "Undefined", "Null"].includes(aType))
      return true;
    if (aType === "Number") {
      if (Object.is(-0, a) !== Object.is(-0, b))
        return false;
      return a.toString() === b.toString();
    }
    if (["String", "Boolean"].includes(aType)) {
      return a.toString() === b.toString();
    }
    if (aType === "Array") {
      const aClone = Array.from(a);
      const bClone = Array.from(b);
      if (aClone.toString() !== bClone.toString()) {
        return false;
      }
      let loopArrayFlag = true;
      aClone.forEach((aCloneInstance, aCloneIndex) => {
        if (loopArrayFlag) {
          if (aCloneInstance !== bClone[aCloneIndex] && !equals(aCloneInstance, bClone[aCloneIndex])) {
            loopArrayFlag = false;
          }
        }
      });
      return loopArrayFlag;
    }
    const aRegex = parseRegex(a);
    const bRegex = parseRegex(b);
    if (aRegex[0]) {
      return bRegex[0] ? aRegex[1] === bRegex[1] : false;
    } else if (bRegex[0])
      return false;
    const aDate = parseDate(a);
    const bDate = parseDate(b);
    if (aDate[0]) {
      return bDate[0] ? aDate[1] === bDate[1] : false;
    } else if (bDate[0])
      return false;
    const aError = parseError(a);
    const bError = parseError(b);
    if (aError[0]) {
      return bError[0] ? aError[0] === bError[0] && aError[1] === bError[1] : false;
    }
    if (aType === "Set") {
      return _equalsSets(a, b);
    }
    if (aType === "Object") {
      const aKeys = Object.keys(a);
      if (aKeys.length !== Object.keys(b).length) {
        return false;
      }
      let loopObjectFlag = true;
      aKeys.forEach((aKeyInstance) => {
        if (loopObjectFlag) {
          const aValue = a[aKeyInstance];
          const bValue = b[aKeyInstance];
          if (aValue !== bValue && !equals(aValue, bValue)) {
            loopObjectFlag = false;
          }
        }
      });
      return loopObjectFlag;
    }
    return false;
  }
  function prop(propToFind, obj) {
    if (arguments.length === 1)
      return (_obj) => prop(propToFind, _obj);
    if (!obj)
      return void 0;
    return obj[propToFind];
  }
  function eqPropsFn(property, objA, objB) {
    return equals(prop(property, objA), prop(property, objB));
  }
  var eqProps = curry(eqPropsFn);
  function createPath(path4, delimiter = ".") {
    return typeof path4 === "string" ? path4.split(delimiter) : path4;
  }
  function path3(pathInput, obj) {
    if (arguments.length === 1)
      return (_obj) => path3(pathInput, _obj);
    if (obj === null || obj === void 0) {
      return void 0;
    }
    let willReturn = obj;
    let counter = 0;
    const pathArrValue = createPath(pathInput);
    while (counter < pathArrValue.length) {
      if (willReturn === null || willReturn === void 0) {
        return void 0;
      }
      if (willReturn[pathArrValue[counter]] === null)
        return void 0;
      willReturn = willReturn[pathArrValue[counter]];
      counter++;
    }
    return willReturn;
  }
  function ifElseFn(condition, onTrue, onFalse) {
    return (...input) => {
      const conditionResult = typeof condition === "boolean" ? condition : condition(...input);
      if (conditionResult === true) {
        return onTrue(...input);
      }
      return onFalse(...input);
    };
  }
  var ifElse = curry(ifElseFn);
  function baseSlice(array, start, end) {
    let index = -1;
    let {
      length
    } = array;
    end = end > length ? length : end;
    if (end < 0) {
      end += length;
    }
    length = start > end ? 0 : end - start >>> 0;
    start >>>= 0;
    const result = Array(length);
    while (++index < length) {
      result[index] = array[index + start];
    }
    return result;
  }
  function is(targetPrototype, x) {
    if (arguments.length === 1)
      return (_x) => is(targetPrototype, _x);
    return x != null && x.constructor === targetPrototype || x instanceof targetPrototype;
  }
  function updateFn(index, newValue, list) {
    const clone = cloneList(list);
    if (index === -1)
      return clone.fill(newValue, index);
    return clone.fill(newValue, index, index + 1);
  }
  var update = curry(updateFn);
  function maxByFn(compareFn, x, y) {
    return compareFn(y) > compareFn(x) ? y : x;
  }
  var maxBy = curry(maxByFn);
  function mergeWithFn(mergeFn, a, b) {
    const willReturn = {};
    Object.keys(a).forEach((key) => {
      if (b[key] === void 0) {
        willReturn[key] = a[key];
      } else {
        willReturn[key] = mergeFn(a[key], b[key]);
      }
    });
    Object.keys(b).forEach((key) => {
      if (willReturn[key] !== void 0)
        return;
      if (a[key] === void 0) {
        willReturn[key] = b[key];
      } else {
        willReturn[key] = mergeFn(a[key], b[key]);
      }
    });
    return willReturn;
  }
  var mergeWith = curry(mergeWithFn);
  function minByFn(compareFn, x, y) {
    return compareFn(y) < compareFn(x) ? y : x;
  }
  var minBy = curry(minByFn);
  function ownKeys(object, enumerableOnly) {
    var keys2 = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys2.push.apply(keys2, symbols);
    }
    return keys2;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
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
  function isIterable(input) {
    return Array.isArray(input) || type(input) === "Object";
  }
  function modifyFn(property, fn, iterable) {
    if (!isIterable(iterable))
      return iterable;
    if (iterable[property] === void 0)
      return iterable;
    if (isArray(iterable)) {
      return updateFn(property, fn(iterable[property]), iterable);
    }
    return _objectSpread2(_objectSpread2({}, iterable), {}, {
      [property]: fn(iterable[property])
    });
  }
  var modify = curry(modifyFn);
  function modifyPathFn(pathInput, fn, object) {
    const path$1 = createPath(pathInput);
    if (path$1.length === 1) {
      return _objectSpread2(_objectSpread2({}, object), {}, {
        [path$1[0]]: fn(object[path$1[0]])
      });
    }
    if (path3(path$1, object) === void 0)
      return object;
    const val = modifyPath(Array.prototype.slice.call(path$1, 1), fn, object[path$1[0]]);
    if (val === object[path$1[0]]) {
      return object;
    }
    return assoc(path$1[0], val, object);
  }
  var modifyPath = curry(modifyPathFn);
  function moveFn(fromIndex, toIndex, list) {
    if (fromIndex < 0 || toIndex < 0) {
      throw new Error("Rambda.move does not support negative indexes");
    }
    if (fromIndex > list.length - 1 || toIndex > list.length - 1)
      return list;
    const clone = cloneList(list);
    clone[fromIndex] = list[toIndex];
    clone[toIndex] = list[fromIndex];
    return clone;
  }
  var move = curry(moveFn);
  function multiply(x, y) {
    if (arguments.length === 1)
      return (_y) => multiply(x, _y);
    return x * y;
  }
  var Identity = (x) => ({
    x,
    map: (fn) => Identity(fn(x))
  });
  function overFn(lens, fn, object) {
    return lens((x) => Identity(fn(x)))(object).x;
  }
  var over = curry(overFn);
  function pathEqFn(pathToSearch, target, input) {
    return equals(path3(pathToSearch, input), target);
  }
  var pathEq = curry(pathEqFn);
  function pathOrFn(defaultValue, pathInput, obj) {
    return defaultTo(defaultValue, path3(pathInput, obj));
  }
  var pathOr = curry(pathOrFn);
  var product = reduce(multiply, 1);
  function propEqFn(propToFind, valueToMatch, obj) {
    if (!obj)
      return false;
    return equals(valueToMatch, prop(propToFind, obj));
  }
  var propEq = curry(propEqFn);
  function propIsFn(targetPrototype, property, obj) {
    return is(targetPrototype, obj[property]);
  }
  var propIs = curry(propIsFn);
  function propOrFn(defaultValue, property, obj) {
    if (!obj)
      return defaultValue;
    return defaultTo(defaultValue, obj[property]);
  }
  var propOr = curry(propOrFn);
  function propSatisfiesFn(predicate, property, obj) {
    return predicate(prop(property, obj));
  }
  var propSatisfies = curry(propSatisfiesFn);
  function replaceFn(pattern, replacer, str) {
    return str.replace(pattern, replacer);
  }
  var replace = curry(replaceFn);
  function setFn(lens, replacer, x) {
    return over(lens, always(replacer), x);
  }
  var set = curry(setFn);
  function sliceFn(from, to, list) {
    return list.slice(from, to);
  }
  var slice = curry(sliceFn);
  function take(howMany, listOrString) {
    if (arguments.length === 1)
      return (_listOrString) => take(howMany, _listOrString);
    if (howMany < 0)
      return listOrString.slice();
    if (typeof listOrString === "string")
      return listOrString.slice(0, howMany);
    return baseSlice(listOrString, 0, howMany);
  }
  var isFunction = (x) => ["Promise", "Function"].includes(type(x));
  function tryCatch(fn, fallback) {
    if (!isFunction(fn)) {
      throw new Error(`R.tryCatch | fn '${fn}'`);
    }
    const passFallback = isFunction(fallback);
    return (...inputs) => {
      try {
        return fn(...inputs);
      } catch (e) {
        return passFallback ? fallback(e, ...inputs) : fallback;
      }
    };
  }
  function whenFn(predicate, whenTrueFn, input) {
    if (!predicate(input))
      return input;
    return whenTrueFn(input);
  }
  var when = curry(whenFn);
  function zipWithFn(fn, x, y) {
    return take(x.length > y.length ? y.length : x.length, x).map((xInstance, i) => fn(xInstance, y[i]));
  }
  var zipWith = curry(zipWithFn);

  // ../ts/$$.ts
  function $$(sel2, el = document) {
    return [...el.querySelectorAll(sel2)];
  }

  // ../ts/po2dt.ts
  var SPAN_PRECISION = 15 * 6e4;
  function po2dt([dday, dtime]) {
    return dday * 864e5 + dtime * SPAN_PRECISION;
  }

  // ../ts/google-calendar-keys.user.ts
  var gkcs_unload = globalThis.gkcs_unload;
  gkcs_unload?.();
  globalThis.gkcs_unload = main();
  globalThis.gkcs_verbose = true;
  var { draggingGet: dg, draggingSet: ds } = draggingUse();
  function touchEventConverterEffect() {
    let lastpos = null;
    function touchHandler(event) {
      const touches = event.changedTouches;
      if (touches.length > 1)
        return;
      const first = touches[0];
      const type2 = {
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
      }[event.type];
      if (!type2)
        return;
      var simulatedEvent = new MouseEvent(type2, {
        bubbles: true,
        cancelable: true,
        view: window,
        detail: 1,
        screenX: first.screenX,
        screenY: first.screenY,
        clientX: first.clientX,
        clientY: first.clientY,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        button: 0,
        relatedTarget: null
      });
      first.target.dispatchEvent(simulatedEvent);
      const pos = [first.screenX, first.screenY];
      if (type2 === "mousedown")
        lastpos = pos;
      if (type2 === "mousemove")
        event.preventDefault();
      if (type2 === "mouseup" && equals(lastpos, pos))
        event.preventDefault();
    }
    const e = document.body;
    const styleChild = e.appendChild(
      Object.assign(document.createElement("div"), {
        innerHTML: '<style>[role="presentation"]{touch-action:none}</style>'
      }).children[0]
    );
    e.addEventListener("touchstart", touchHandler, true);
    e.addEventListener("touchmove", touchHandler, true);
    e.addEventListener("touchend", touchHandler, true);
    e.addEventListener("touchcancel", touchHandler, true);
    return () => {
      e.removeEventListener("touchstart", touchHandler, true);
      e.removeEventListener("touchmove", touchHandler, true);
      e.removeEventListener("touchend", touchHandler, true);
      e.removeEventListener("touchcancel", touchHandler, true);
      styleChild.remove();
    };
  }
  function main() {
    console.clear();
    const unloaders = [];
    unloaders.push(touchEventConverterEffect());
    unloaders.push(
      hotkeyMapper(
        {
          "ctrl+b": async () => {
            const menuBtn = $visiable(sel.Menu);
            menuBtn?.click();
          },
          "alt+v": async () => await cpr(),
          "alt+k": () => eventMove([0, -1]),
          "alt+j": () => eventMove([0, 1]),
          "alt+h": () => eventMove([-1, 0]),
          "alt+l": () => eventMove([1, 0]),
          "alt+shift+k": () => eventExpand([0, -1]),
          "alt+shift+j": () => eventExpand([0, 1]),
          "alt+shift+h": () => eventExpand([-1, 0]),
          "alt+shift+l": () => eventExpand([1, 0])
        },
        { capture: true }
      )
    );
    return () => [...unloaders].reverse().forEach((e) => e?.());
  }
  async function cpr() {
    const r = $$("input,[role=button]").map((element) => {
      const { ps, deep } = onlyPatternSelectorGenerate(element);
      const label = element.ariaLabel ?? "";
      return {
        e: element,
        label,
        ps,
        deep
      };
    }).filter((e) => Boolean(e.label));
    const cpr2 = r.map(({ e, ...r2 }) => r2);
    console.table(r);
    globalThis.patternSelectorGenerate = patternSelectorGenerate;
    await clipboardy_default.write(JSON.stringify(cpr2, null, 2));
  }
  function useListener(target = window) {
    return (event, onEvent, options) => {
      target.addEventListener(event, onEvent, options);
      const unload = () => target.removeEventListener(event, onEvent, options);
      return unload;
    };
  }
  async function eventExpand([dx, dy] = [0, 0]) {
    if (dy && await timeAddTry())
      return;
    return tryCatch(
      () => eventDrag([dx, dy], { expand: true }),
      () => inputDateTimeChange(0, po2dt([dx, dy]))
    )(null);
  }
  async function eventMove([dx, dy] = [0, 0]) {
    if (dy && await timeAddTry())
      return;
    return tryCatch(
      () => eventDrag([dx, dy]),
      () => inputDateTimeChange(po2dt([dx, dy]), 0)
    )(null);
  }
  async function inputValueSet(el, value) {
    console.log("inputValueSet", el, value);
    if (!el)
      throw new Error("no element");
    if (void 0 === value)
      throw new Error("no value");
    el.value = value;
    el.dispatchEvent(new InputEvent("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    el.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        keyCode: 13
      })
    );
    el.focus();
    await sleep(0);
    el.blur();
  }
  async function dateInputParse(dateInput, timeInput) {
    const dataDate = dateInput.getAttribute("data-date");
    const dataIcalElement = parentList(dateInput).find(
      (e) => e.getAttribute("data-ical")
    );
    if (!dataIcalElement)
      throw new Error("dataIcalElement not found");
    const dataIcal = dataIcalElement.getAttribute("data-ical");
    const datestringRaw = dataDate || dataIcal;
    if (!datestringRaw)
      throw new Error("no datestring");
    const dateString = datestringRaw.replace(
      /(\d{4})(\d{2})(\d{2})/,
      (_, a, b, c) => [a, b, c].join("-")
    );
    const timeString = timeInput?.value || "00:00";
    return /* @__PURE__ */ new Date(`${dateString} ${timeString} Z`);
  }
  function dateParse(dateObj) {
    const m = dateObj.toISOString().match(/(\d\d\d\d-\d\d-\d\d)T(\d\d:\d\d):\d\d\.\d\d\dZ/);
    if (!m)
      throw m;
    const [date, time] = m.slice(1);
    return [date, time];
  }
  var sel = {
    Menu: '[aria-label="\u30E1\u30A4\u30F3\u30C9\u30ED\u30EF\u30FC"]',
    Summary: [
      '[aria-label="\u30BF\u30A4\u30C8\u30EB\u3068\u65E5\u6642\u3092\u8FFD\u52A0"]',
      '[aria-label="\u30BF\u30A4\u30C8\u30EB\u3092\u8FFD\u52A0"]',
      '[aria-label="\u30BF\u30A4\u30C8\u30EB"]'
    ].join(","),
    StartDate: '[aria-label="\u958B\u59CB\u65E5"]',
    StartTime: '[aria-label="\u958B\u59CB\u6642\u9593"]',
    EndTime: '[aria-label="\u7D42\u4E86\u6642\u9593"]',
    EndDate: '[aria-label="\u7D42\u4E86\u65E5"]',
    AllDay: '[aria-label="\u7D42\u65E5"]',
    TimeZone: '[aria-label="\u30BF\u30A4\u30E0\u30BE\u30FC\u30F3"]',
    Guests: '[aria-label="\u30B2\u30B9\u30C8"]'
  };
  async function inputDateTimeChange(sdt = 0, edt = 0) {
    const startDateInputPeek = $visiable(sel.StartDate);
    if (!startDateInputPeek) {
      const tz = $visiable(sel.TimeZone);
      if (!tz)
        throw new Error("tz not found");
      const editBtn = parentList(tz)?.find((e) => e.querySelector('[role="button"]'))?.querySelector('[role="button"]');
      if (!editBtn)
        throw new Error("No editable input");
      editBtn.click();
      await sleep(64);
    }
    const startDateInput = $visiable(sel.StartDate);
    const startTimeInput = $visiable(sel.StartTime);
    const endTimeInput = $visiable(sel.EndTime);
    const endDateInput = $visiable(sel.EndDate);
    const endDateInput1 = endDateInput ?? startDateInput;
    if (!startDateInput)
      throw new Error("no startDateInput");
    const startDate = await dateInputParse(startDateInput, startTimeInput);
    const endDate = await dateInputParse(endDateInput1, endTimeInput);
    const startDateObj1 = new Date(+startDate + sdt);
    const endDateObj1 = new Date(+endDate + edt);
    const [startDate0, startTime0] = dateParse(startDate);
    const [endDate0, endTime0] = dateParse(endDate);
    const [startDate1, startTime1] = dateParse(startDateObj1);
    const [endDate1, endTime1] = dateParse(endDateObj1);
    if (globalThis.gkcs_verbose)
      console.table({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        startDateObj1: startDateObj1.toISOString(),
        endDateObj1: endDateObj1.toISOString()
      });
    if (globalThis.gkcs_verbose)
      console.table({
        startDateInput: Boolean(startDateInput),
        startTimeInput: Boolean(startTimeInput),
        endDateInput: Boolean(endDateInput),
        endTimeInput: Boolean(endTimeInput),
        startDate0,
        startDate1,
        startTime0,
        startTime1,
        endDate0,
        endDate1,
        endTime0,
        endTime1
      });
    startDateInput && startDate1 !== startDate0 && await inputValueSet(startDateInput, startDate1);
    endDateInput && endDate1 !== endDate0 && await inputValueSet(endDateInput, endDate1);
    startTimeInput && startTime1 !== startTime0 && await inputValueSet(startTimeInput, startTime1);
    endTimeInput && endTime1 !== endTime0 && await inputValueSet(endTimeInput, endTime1);
    $visiable(sel.Summary)?.focus();
  }
  async function timeAddTry() {
    const btn = $$("button").find(
      (e) => ["Add time", "\u6642\u9593\u3092\u8FFD\u52A0"].includes(e.textContent ?? "")
    );
    if (!btn)
      return 0;
    btn.click();
    await sleep(64);
    return 1;
  }
  function eleVisiable(ele) {
    return (ele.getClientRects().length && ele) ?? false;
  }
  function $visiable(sel2, el = document) {
    return $$(sel2, el).filter(eleVisiable)[0] ?? null;
  }
  function parentList(el) {
    const parent = el?.parentElement;
    if (!parent)
      return [];
    return [parent, ...parentList(parent)];
  }
  function sleep(ms = 0) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  function mouseOpt([x, y]) {
    return {
      isTrusted: true,
      bubbles: true,
      button: 0,
      buttons: 1,
      cancelBubble: false,
      cancelable: true,
      clientX: x,
      clientY: y,
      movementX: 0,
      movementY: 0,
      x,
      y
    };
  }
  function centerGet(element) {
    const { x, y, width: w, height: h } = element.getBoundingClientRect();
    return [x + w / 2, y + h / 2];
  }
  function vec2add([x, y], [z, w]) {
    return [x + z, y + w];
  }
  function $(sel2) {
    return document.querySelector(sel2);
  }
  function onlyPatternSelectorGenerate(element) {
    let deep = 0;
    let ps = "";
    while (1) {
      ps = patternSelectorGenerate(element, { deep });
      if ($$(ps).length <= 1)
        break;
      deep++;
    }
    return { ps, deep };
  }
  function patternSelectorGenerate(element, { deep = 0 } = {}) {
    const psg = (e) => patternSelectorGenerate(e, { deep: deep - 1 });
    const tag = element.tagName.toLowerCase();
    const attrs = [
      "aria-label",
      "data-key",
      "role",
      "type"
      // "jsslot",
      // "aria-labelledby",
      // "jsshadow",
    ].map((name) => attrSel(element, name)).filter((e) => !e.match("\n")).join("");
    let base = `${tag}${attrs}`;
    if (!deep)
      return base;
    const next = element.nextElementSibling;
    if (next)
      base = `${base}:has(+${psg(next).replace(/:has\(.*?\)/g, "")})`;
    const prev = element.previousElementSibling;
    if (prev)
      return `${psg(prev)}+${base}`;
    const parent = element.parentElement;
    if (!parent)
      return base;
    const children = [...parent.children];
    const nth = children.findIndex((v) => element === v) + 1;
    const nthl = children.length - nth + 1;
    if (!nth)
      return base;
    const parentSelector = psg(parent);
    return `${parentSelector}>${base}:nth-child(${nth}):nth-last-child(${nthl})`;
  }
  function attrSel(element, name) {
    const attr = element.getAttribute(name);
    const dataKey = attr !== null ? attr ? `[${name}="${attr}"]` : `[${name}]` : "";
    return dataKey;
  }
  function eventDrag([dx, dy] = [0, 0], { expand = false } = {}) {
    const summaryInput = $visiable(sel.Summary);
    summaryInput?.focus();
    if (!dg()) {
      const floatingBtns = [
        .../* @__PURE__ */ new Set([
          ...$$('div[role="button"]').reverse().filter((e) => getComputedStyle(e).zIndex === "5004"),
          ...$$('div:has([role="button"])').reverse().filter((e) => getComputedStyle(e).zIndex === "5004")
        ])
      ];
      if (floatingBtns.length > 1)
        throw new Error("Multiple floating");
      const floatingBtn = floatingBtns[0];
      if (!floatingBtn)
        throw new Error("no event selected");
      const target = expand ? floatingBtn.querySelector('*[data-dragsource-type="3"]') : floatingBtn;
      if (!target)
        throw new Error("no dragTarget exists");
      console.log(target);
      const pos = centerGet(target);
      console.log("cpos", pos);
      ds({ pos, target });
      posHint(pos);
      target.dispatchEvent(new MouseEvent("mousedown", mouseOpt(pos)));
      document.dispatchEvent(new MouseEvent("mousemove", mouseOpt(pos)));
    }
    if (dg()) {
      const container = $('[role="row"][data-dragsource-type="4"]');
      const gridcells = [...container.querySelectorAll('[role="gridcell"]')];
      const containerSize = container.getBoundingClientRect();
      const w = containerSize.width / gridcells.length;
      const h = containerSize.height / 24 / 4;
      ds({
        pos: vec2add(dg().pos, [dx * w, dy * h]),
        target: dg().target
      });
      const pos = dg().pos;
      posHint(pos);
      document.body.dispatchEvent(new MouseEvent("mousemove", mouseOpt(pos)));
    }
    const unload = useListener()("keyup", (e) => {
      if (!["AltLeft", "AltRight"].includes(e.code))
        return;
      unload();
      ds(null);
      document.dispatchEvent(
        new MouseEvent("mouseup", { bubbles: true, cancelable: true })
      );
    });
    return unload;
  }
  function posHint(pos) {
    const div = document.createElement("div");
    div.style.background = "red";
    div.style.position = "absolute";
    div.style.left = pos[0] + "px";
    div.style.top = pos[1] + "px";
    div.style.width = "1px";
    div.style.height = "1px";
    div.style.zIndex = "10000";
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 200);
  }
  function draggingUse() {
    const draggingGet = () => globalThis.gcks_dragging;
    const draggingSet = (s) => globalThis.gcks_dragging = s;
    return { draggingGet, draggingSet };
  }
})();
/*! Bundled license information:

arch/index.js:
  (*! arch. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
