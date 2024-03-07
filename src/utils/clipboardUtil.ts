import * as vscode from 'vscode';

/**
 * @description : 复制到剪切板
 * @param {string} text
 */
export const writeText2Clipboard = (text: string) => {
  vscode.env.clipboard.writeText(text);
};
