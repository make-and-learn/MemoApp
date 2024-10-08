// ファイル操作を管理するクラス
export class FileManager {
    constructor() {
        // 現在開いているファイルのハンドル
        this.currentFileHandle = null;
        // 内容が保存されているかどうかのフラグ
        this.isContentSaved = true;
    }

    // ファイルを開く処理
    async openFile() {
        try {
            // ファイル選択ダイアログを表示
            const [fileHandle] = await window.showOpenFilePicker({
                types: [{ description: 'テキストファイル', accept: {'text/plain': ['.txt']} }],
            });
            // 選択されたファイルの内容を読み込む
            const file = await fileHandle.getFile();
            const contents = await file.text();
            // 現在のファイルハンドルを更新
            this.currentFileHandle = fileHandle;
            this.isContentSaved = true;
            return { name: file.name, contents };
        } catch (error) {
            // ユーザーがキャンセルした場合は何もしない
            if (error.name !== 'AbortError') {
                console.error('ファイルを開く際にエラーが発生しました:', error);
                throw new Error('ファイルを開けませんでした。');
            }
        }
    }

    // ファイルを保存する処理
    async saveFile(content) {
        try {
            // 現在のファイルハンドルがない場合は名前を付けて保存
            if (!this.currentFileHandle) {
                return await this.saveAsFile(content);
            }
            // ファイルに書き込む
            const writable = await this.currentFileHandle.createWritable();
            await writable.write(content);
            await writable.close();
            this.isContentSaved = true;
            return this.currentFileHandle.name;
        } catch (error) {
            console.error('ファイルの保存中にエラーが発生しました:', error);
            throw new Error('ファイルを保存できませんでした。');
        }
    }

    // 名前を付けて保存する処理
    async saveAsFile(content) {
        try {
            // ファイル保存ダイアログを表示
            const fileHandle = await window.showSaveFilePicker({
                types: [{ description: 'テキストファイル', accept: {'text/plain': ['.txt']} }],
            });
            // ファイルに書き込む
            const writable = await fileHandle.createWritable();
            await writable.write(content);
            await writable.close();
            // 現在のファイルハンドルを更新
            this.currentFileHandle = fileHandle;
            this.isContentSaved = true;
            return fileHandle.name;
        } catch (error) {
            // ユーザーがキャンセルした場合は何もしない
            if (error.name !== 'AbortError') {
                console.error('ファイルの保存中にエラーが発生しました:', error);
                throw new Error('ファイルを保存できませんでした。');
            }
        }
    }

    // 新規ファイルを作成する処理
    newFile() {
        // 現在のファイルハンドルをリセット
        this.currentFileHandle = null;
        this.isContentSaved = true;
    }
}