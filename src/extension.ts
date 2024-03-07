import * as vscode from 'vscode';
import { doParseSelectedWords2OperatorList} from './utils/parseUtil';
export function activate(context: vscode.ExtensionContext) {

	const doParseByClipboard = vscode.commands.registerCommand('ternary-operator-killer.doParseByClipboard', (uri: vscode.Uri | undefined) => {
		const editor = vscode.window.activeTextEditor;
		const doc = editor?.document;
		const selection = editor?.selection;
		const selectedWords = doc?.getText(selection) || '';

		if ((selectedWords ?? '') === '') {
			vscode.window.showErrorMessage('请选择三元运算符再执行');
			return;
		}

		if (selectedWords.includes('?') === false || selectedWords.includes(':') === false) {
			vscode.window.showErrorMessage('请选择三元运算符再执行');
			return;
		}

		const operatorList = doParseSelectedWords2OperatorList(selectedWords);
		
		debugger;

		// if (selectedWords.length > 0) {
		// 	const wordsList: string[] = Array.from(selectedWords);
		// 	let wordCache = '';
		// 	// 按照条件分词
		// 	const ternaryOpList: string[] = [];
		// 	const ternaryOpTypeList: string[] = [];
		// 	// 过滤 `` '' "" 中夹带?:的情况
		// 	let isStrMod = false;
		// 	let strModOpenWord = 'none';

		// 	wordsList.forEach((word, wordIdx) => {

		// 		// 检测 并打开stringMod
		// 		if (['\`', '\'', '\"'].includes(word)) {
		// 			if (isStrMod === false) {
		// 				isStrMod = true;
		// 				strModOpenWord = word;
		// 			} else if (strModOpenWord === word) {
		// 				// 检测 并关闭stringMod
		// 				isStrMod = false;
		// 				strModOpenWord = 'none';
		// 			}
		// 		}

		// 		// stringMod直接缓存待push
		// 		if (isStrMod) {
		// 			wordCache += word;
		// 		} else {

		// 			if (['?', ':'].includes(word)) {
		// 				// push之前缓存的text并清空
		// 				ternaryOpList.push(wordCache);
		// 				ternaryOpTypeList.push('text');
		// 				wordCache = '';

		// 				// push当前操作符
		// 				ternaryOpList.push(word);
		// 				if ('?' === word) {
		// 					ternaryOpTypeList.push('question');
		// 				} else if (':' === word) {
		// 					ternaryOpTypeList.push('colon');
		// 				}
		// 			} else {
		// 				// 继续缓存cache
		// 				wordCache += word;
		// 			}
		// 		}

		// 		// 最后一定为text直接push
		// 		if (wordIdx === wordsList.length - 1) {
		// 			ternaryOpList.push(wordCache);
		// 			ternaryOpTypeList.push('text');
		// 			wordCache = '';
		// 		}
		// 	});
		// 	debugger;
		// }
		vscode.window.showInformationMessage('');
	});

	context.subscriptions.push(doParseByClipboard);
}

export function deactivate() {
	vscode.window.showInformationMessage('exit');
}
