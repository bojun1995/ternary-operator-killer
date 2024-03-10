import * as vscode from 'vscode';
import { doParseSelectedWords2OperatorList, doParseOperatorList2Tree } from './utils/parseUtil';
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
		if (operatorList.length > 0) {
			const operatorTree = doParseOperatorList2Tree(operatorList);
		}
		debugger;

		vscode.window.showInformationMessage('');
	});

	context.subscriptions.push(doParseByClipboard);
}

export function deactivate() {
	vscode.window.showInformationMessage('exit');
}
