// メインのアプリケーションロジック
import { FileManager } from './fileManager.js';
import { UIManager } from './uiManager.js';

class App {
    constructor() {
        // FileManagerとUIManagerのインスタンスを作成
        this.fileManager = new FileManager();
        this.uiManager = new UIManager(this.fileManager);
        // イベントリスナーを初期化
        this.initEventListeners();
    }

    // 各ボタンとテキストエリアにイベントリスナーを設定
    initEventListeners() {
        // 新規ファイルボタン
        document.getElementById('newFile').addEventListener('click', () => this.uiManager.handleNewFile());
        // ファイルを開くボタン
        document.getElementById('openFile').addEventListener('click', () => this.uiManager.handleOpenFile());
        // 保存ボタン
        document.getElementById('saveFile').addEventListener('click', () => this.uiManager.handleSaveFile());
        // 名前を付けて保存ボタン
        document.getElementById('saveAsFile').addEventListener('click', () => this.uiManager.handleSaveAsFile());
        // テキストエリアの内容変更イベント
        document.getElementById('memoArea').addEventListener('input', () => this.uiManager.handleTextAreaChange());
        // ページを離れる前のイベント
        window.addEventListener('beforeunload', (e) => this.uiManager.handleBeforeUnload(e));
    }
}

// DOMの読み込みが完了したらアプリケーションを初期化
document.addEventListener('DOMContentLoaded', () => {
    new App();
});