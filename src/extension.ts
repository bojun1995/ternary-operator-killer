import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const doParseByClipboard = vscode.commands.registerCommand('ternary-operator-killer.doParseByClipboard', (uri: vscode.Uri | undefined) => {
		const editor = vscode.window.activeTextEditor;
		const doc = editor?.document;
		const selection = editor?.selection;
		const selectedWords = doc?.getText(selection) || [''];

		if ((selectedWords ?? '') === '') {
			vscode.window.showErrorMessage('请选择三元运算符再执行');
			return;
		}

		if (selectedWords.includes('?') === false || selectedWords.includes(':') === false) {
			vscode.window.showErrorMessage('请选择三元运算符再执行');
			return;
		}

		if (selectedWords.length > 0) {
			const wordsList: string[] = Array.from(selectedWords);
			let wordCache = '';
			// 按照条件分词
			const ternaryOpList: string[] = [];
			const questionIndexList: number[] = [];

			wordsList.forEach((word, wordIdx) => {
				let isText = true;

				// 过滤 `` '' "" 中夹带?:的情况
				let isStringMod = false;
				let stringMod = 'none';
				if (['\`', '\'', '\"'].includes(word)) {
					isStringMod = true;
					if (stringMod === 'none') {
						// 打开字符串模式
						stringMod = word;
					} else {
						// 关闭
						stringMod = 'none';
					}
				}

				if (['?', ':'].includes(word)) {
					isText = false;
					ternaryOpList.push(wordCache);
					ternaryOpList.push(word);
					if (word === '?') {
						questionIndexList.push(wordIdx);
					}
					wordCache = '';
				}
				if (isText) {
					wordCache += word;
				}
			});
			debugger;
		}
		vscode.window.showInformationMessage('');
	});

	context.subscriptions.push(doParseByClipboard);
}

export function deactivate() {
	vscode.window.showInformationMessage('exit');
}
