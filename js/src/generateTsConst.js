"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTsConst = void 0;
var fs = require('fs');
/**
 * 指定されたテキストファイルから TypeScript クラスファイルを生成し、指定された出力ディレクトリに保存する。
 * @param {string} inputFilePath 入力テキストファイルのパス
 * @param {string} outputDirPath 出力ディレクトリのパス
 */
function generateTsConst(inputFilePath, outputDirPath) {
    // 入力ファイルの読み込み
    var fileContent = fs.readFileSync(inputFilePath, 'utf-8');
    // 改行コードでテキストを分割
    var lines = fileContent.split('\n');
    // 各行を処理して出力用オブジェクトを作成
    var outputObj = {};
    lines.forEach(function (line) {
        // 空欄は無視する
        if (!line) {
            return;
        }
        // コメントは無視する
        if (line.startsWith("#")) {
            return;
        }
        // InitFormとgraph_setting_id=undefined
        var _a = line.split('.'), className = _a[0], propName_PropValue = _a[1];
        // graph_setting_idとundefined
        var _b = propName_PropValue.split('='), propName = _b[0], propValue = _b[1];
        if (!outputObj[className]) {
            outputObj[className] = {};
        }
        outputObj[className][propName] = propValue.replace(/"/g, '');
    });
    // 出力用ディレクトリの作成
    if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath);
    }
    // 出力ファイルの作成
    for (var className in outputObj) {
        var outputFileContent = "export const ".concat(className, " = {\n").concat(Object.entries(outputObj[className]).map(function (_a) {
            var propName = _a[0], propValue = _a[1];
            return "   ".concat(propName, ":").concat(propValue, ",");
        }).join('\n'), "\n}");
        fs.writeFileSync("".concat(outputDirPath, "/").concat(className, ".ts"), outputFileContent);
    }
}
exports.generateTsConst = generateTsConst;
