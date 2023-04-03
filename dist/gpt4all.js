"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.GPT4All = void 0;
var child_process_1 = require("child_process");
var util_1 = require("util");
var fs = require("fs");
var os = require("os");
var axios_1 = require("axios");
var ProgressBar = require("progress");
var GPT4All = /** @class */ (function () {
    function GPT4All(model, forceDownload, decoderConfig) {
        if (model === void 0) { model = 'gpt4all-lora-quantized'; }
        if (forceDownload === void 0) { forceDownload = false; }
        if (decoderConfig === void 0) { decoderConfig = {}; }
        this.bot = null;
        this.model = model;
        this.decoderConfig = decoderConfig;
        /*
        allowed models:
        M1 Mac/OSX: cd chat;./gpt4all-lora-quantized-OSX-m1
    Linux: cd chat;./gpt4all-lora-quantized-linux-x86
    Windows (PowerShell): cd chat;./gpt4all-lora-quantized-win64.exe
    Intel Mac/OSX: cd chat;./gpt4all-lora-quantized-OSX-intel
        */
        if ('gpt4all-lora-quantized' !== model &&
            'gpt4all-lora-unfiltered-quantized' !== model) {
            throw new Error("Model ".concat(model, " is not supported. Current models supported are: \n                gpt4all-lora-quantized\n                gpt4all-lora-unfiltered-quantized"));
        }
        this.executablePath = "".concat(os.homedir(), "/.nomic/gpt4all");
        this.modelPath = "".concat(os.homedir(), "/.nomic/").concat(model, ".bin");
    }
    GPT4All.prototype.init = function (forceDownload) {
        if (forceDownload === void 0) { forceDownload = false; }
        return __awaiter(this, void 0, void 0, function () {
            var downloadPromises;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        downloadPromises = [];
                        if (forceDownload || !fs.existsSync(this.executablePath)) {
                            downloadPromises.push(this.downloadExecutable());
                        }
                        if (forceDownload || !fs.existsSync(this.modelPath)) {
                            downloadPromises.push(this.downloadModel());
                        }
                        return [4 /*yield*/, Promise.all(downloadPromises)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GPT4All.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            var spawnArgs, _i, _a, _b, key, value;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.bot !== null) {
                            this.close();
                        }
                        spawnArgs = [this.executablePath, '--model', this.modelPath];
                        for (_i = 0, _a = Object.entries(this.decoderConfig); _i < _a.length; _i++) {
                            _b = _a[_i], key = _b[0], value = _b[1];
                            spawnArgs.push("--".concat(key), value.toString());
                        }
                        this.bot = (0, child_process_1.spawn)(spawnArgs[0], spawnArgs.slice(1), { stdio: ['pipe', 'pipe', 'ignore'] });
                        // wait for the bot to be ready
                        return [4 /*yield*/, new Promise(function (resolve) {
                                var _a, _b;
                                (_b = (_a = _this.bot) === null || _a === void 0 ? void 0 : _a.stdout) === null || _b === void 0 ? void 0 : _b.on('data', function (data) {
                                    if (data.toString().includes('>')) {
                                        resolve(true);
                                    }
                                });
                            })];
                    case 1:
                        // wait for the bot to be ready
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GPT4All.prototype.close = function () {
        if (this.bot !== null) {
            this.bot.kill();
            this.bot = null;
        }
    };
    GPT4All.prototype.downloadExecutable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var upstream, platform, stdout;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = os.platform();
                        if (!(platform === 'darwin')) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, util_1.promisify)(child_process_1.exec)('uname -m')];
                    case 1:
                        stdout = (_a.sent()).stdout;
                        if (stdout.trim() === 'arm64') {
                            upstream = 'https://github.com/nomic-ai/gpt4all/blob/main/chat/gpt4all-lora-quantized-OSX-m1?raw=true';
                        }
                        else {
                            upstream = 'https://github.com/nomic-ai/gpt4all/blob/main/chat/gpt4all-lora-quantized-OSX-intel?raw=true';
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        if (platform === 'linux') {
                            upstream = 'https://github.com/nomic-ai/gpt4all/blob/main/chat/gpt4all-lora-quantized-linux-x86?raw=true';
                        }
                        else if (platform === 'win32') {
                            upstream = 'https://github.com/nomic-ai/gpt4all/blob/main/chat/gpt4all-lora-quantized-win64.exe?raw=true';
                        }
                        else {
                            throw new Error("Your platform is not supported: ".concat(platform, ". Current binaries supported are for OSX (ARM and Intel), Linux and Windows."));
                        }
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.downloadFile(upstream, this.executablePath)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, fs.chmod(this.executablePath, 493, function (err) {
                                if (err) {
                                    throw err;
                                }
                            })];
                    case 5:
                        _a.sent();
                        console.log("File downloaded successfully to ".concat(this.executablePath));
                        return [2 /*return*/];
                }
            });
        });
    };
    GPT4All.prototype.downloadModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modelUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        modelUrl = "https://the-eye.eu/public/AI/models/nomic-ai/gpt4all/".concat(this.model, ".bin");
                        return [4 /*yield*/, this.downloadFile(modelUrl, this.modelPath)];
                    case 1:
                        _a.sent();
                        console.log("File downloaded successfully to ".concat(this.modelPath));
                        return [2 /*return*/];
                }
            });
        });
    };
    GPT4All.prototype.downloadFile = function (url, destination) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, headers, totalSize, progressBar, dir, writer;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get(url, { responseType: 'stream' })];
                    case 1:
                        _a = _b.sent(), data = _a.data, headers = _a.headers;
                        totalSize = parseInt(headers['content-length'], 10);
                        progressBar = new ProgressBar('[:bar] :percent :etas', {
                            complete: '=',
                            incomplete: ' ',
                            width: 20,
                            total: totalSize
                        });
                        dir = new URL("file://".concat(os.homedir(), "/.nomic/"));
                        return [4 /*yield*/, fs.mkdir(dir, { recursive: true }, function (err) {
                                if (err) {
                                    throw err;
                                }
                            })];
                    case 2:
                        _b.sent();
                        writer = fs.createWriteStream(destination);
                        data.on('data', function (chunk) {
                            progressBar.tick(chunk.length);
                        });
                        data.pipe(writer);
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                writer.on('finish', resolve);
                                writer.on('error', reject);
                            })];
                }
            });
        });
    };
    GPT4All.prototype.prompt = function (prompt) {
        var _this = this;
        if (this.bot === null) {
            throw new Error("Bot is not initialized.");
        }
        this.bot.stdin.write(prompt + "\n");
        return new Promise(function (resolve, reject) {
            var response = "";
            var timeoutId;
            var onStdoutData = function (data) {
                var text = data.toString();
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                if (text.includes(">")) {
                    // console.log('Response starts with >, end of message - Resolving...'); // Debug log: Indicate that the response ends with "\\f"
                    terminateAndResolve(response); // Remove the trailing "\f" delimiter
                }
                else {
                    timeoutId = setTimeout(function () {
                        // console.log('Timeout reached - Resolving...'); // Debug log: Indicate that the timeout has been reached
                        terminateAndResolve(response);
                    }, 4000); // Set a timeout of 4000ms to wait for more data
                }
                // console.log('Received text:', text); // Debug log: Show the received text
                response += text;
                // console.log('Updated response:', response); // Debug log: Show the updated response
            };
            var onStdoutError = function (err) {
                _this.bot.stdout.removeListener("data", onStdoutData);
                _this.bot.stdout.removeListener("error", onStdoutError);
                reject(err);
            };
            var terminateAndResolve = function (finalResponse) {
                _this.bot.stdout.removeListener("data", onStdoutData);
                _this.bot.stdout.removeListener("error", onStdoutError);
                // check for > at the end and remove it
                if (finalResponse.endsWith(">")) {
                    finalResponse = finalResponse.slice(0, -1);
                }
                resolve(finalResponse);
            };
            _this.bot.stdout.on("data", onStdoutData);
            _this.bot.stdout.on("error", onStdoutError);
        });
    };
    return GPT4All;
}());
exports.GPT4All = GPT4All;
