// UI操作を管理するクラス
export class UIManager {
    constructor(fileManager) {
        // FileManagerのインスタンスを保持
        this.fileManager = fileManager;
        // テキストエリアの要素を取得
        this.memoArea = document.getElementById('memoArea');
        // ファイル名表示要素を取得
        this.fileNameElement = document.getElementById('currentFileName');
    }

    // ファイル名表示を更新する処理
    updateFileName(fileName) {
        this.fileNameElement.textContent = fileName || '新規ファイル（未保存）';
    }

    // 新規ファイル作成の処理
    async handleNewFile() {
        // 未保存の変更がある場合、確認ダイアログを表示
        if (!this.fileManager.isContentSaved) {
            const confirmNew = confirm("未保存の変更があります。保存せずに新しいファイル作成しますか？");
            if (!confirmNew) return;
        }
        // 新規ファイルを作成
        this.fileManager.newFile();
        this.memoArea.value = '';
        this.updateFileName();
    }

    // ファイルを開く処理
    async handleOpenFile() {
        // 未保存の変更がある場合、確認ダイアログを表示
        if (!this.fileManager.isContentSaved) {
            const confirmOpen = confirm("未保存の変更があります。保存せずに新しいファイルを開きますか？");
            if (!confirmOpen) return;
        }
        try {
            // ファイルを開く
            const file = await this.fileManager.openFile();
            if (file) {
                this.memoArea.value = file.contents;
                this.updateFileName(file.name);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    // ファイルを保存する処理
    async handleSaveFile() {
        try {
            // ファイルを保存
            const fileName = await this.fileManager.saveFile(this.memoArea.value);
            this.updateFileName(fileName);
        } catch (error) {
            alert(error.message);
        }
    }

    // 名前を付けて保存する処理
    async handleSaveAsFile() {
        try {
            // 名前を付けて保存
            const fileName = await this.fileManager.saveAsFile(this.memoArea.value);
            if (fileName) {
                this.updateFileName(fileName);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    // テキストエリアの内容が変更された時の処理
    handleTextAreaChange() {
        // 内容が変更されたことをマーク
        this.fileManager.isContentSaved = false;
        // ファイル名表示を更新（未保存状態を表示）
        this.updateFileName(this.fileManager.currentFileHandle ? this.fileManager.currentFileHandle.name + '（未保存）' : null);
    }

    // ページを離れる前の処理
    handleBeforeUnload(e) {
        // 未保存の変更がある場合、確認ダイアログを表示
        if (!this.fileManager.isContentSaved) {
            e.preventDefault();
            e.returnValue = '';
        }
    }
}