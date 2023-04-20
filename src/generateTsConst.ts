const fs = require('fs');

/**
 * 指定されたテキストファイルから TypeScript クラスファイルを生成し、指定された出力ディレクトリに保存する。
 * @param {string} inputFilePath 入力テキストファイルのパス
 * @param {string} outputDirPath 出力ディレクトリのパス
 */
export function generateTsConst(inputFilePath, outputDirPath) {
  // 入力ファイルの読み込み
  const fileContent = fs.readFileSync(inputFilePath, 'utf-8');

  // 改行コードでテキストを分割
  const lines = fileContent.split('\n');

  // 各行を処理して出力用オブジェクトを作成
  const outputObj = {};
  lines.forEach(line => {
    // 空欄は無視する
    if(!line){
      return;
    }
    // コメントは無視する
    if (line.startsWith("#")) {
      return;
    }

    // InitFormとgraph_setting_id=undefined
    const [className, propName_PropValue] = line.split('.');
    // graph_setting_idとundefined
    const [propName, propValue] = propName_PropValue.split('=');
    
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
  for (const className in outputObj) {
    const outputFileContent = `export const ${className} = {
${Object.entries(outputObj[className]).map(([propName, propValue]) => `   ${propName}:${propValue},`).join('\n')}
}`;
    fs.writeFileSync(`${outputDirPath}/${className}.ts`, outputFileContent);
  }
}