import { OPERATOR_ITEM } from './typing';
import * as vscode from 'vscode';

/**
 * @description : 解析拷贝的三元运算符
 *  [
 *    { value: '1', type: 'leaf' },
 *    { value: '?', type: 'question' },
 *    { value: [], type: 'leafList'}
 *  ]
 * @param {string} selectedWords
 */
export function doParseSelectedWords2OperatorList(selectedWords: string): OPERATOR_ITEM[] {
  const ret: OPERATOR_ITEM[] = [];

  let wordsList: string[] = [];
  let wordCache = '';

  // 过滤 `` '' "" 中夹带?:的情况
  let isStrMod = false;
  let strModOpenWord = 'none';

  if (selectedWords.length > 0) {
    wordsList = Array.from(selectedWords);

    wordsList.forEach((word, wordIdx) => {

      // 检测 并打开stringMod
      if (['\`', '\'', '\"'].includes(word)) {
        if (isStrMod === false) {
          isStrMod = true;
          strModOpenWord = word;
        } else if (strModOpenWord === word) {
          // 检测 并关闭stringMod
          isStrMod = false;
          strModOpenWord = 'none';
        }
      }

      // stringMod直接缓存待push
      if (isStrMod) {
        wordCache += word;
      } else {
        if (['?', ':'].includes(word)) {
          // push上一次缓存
          ret.push({
            type: 'leaf',
            value: wordCache
          });
          wordCache = '';
          // push当前操作符
          ret.push({
            type: word === '?' ? 'question' : 'colon',
            value: word,
          });
        } else {
          // 继续缓存cache
          wordCache += word;
        }
      }

      // 最后一定为text直接push
      if (wordIdx === wordsList.length - 1) {
        ret.push({
          type: 'leaf',
          value: wordCache,
        });
        wordCache = '';
      }
    });

  }
  return ret;
}

/**
 * @description : 按照三元运算符的固定结构校验
 * @param {OPERATOR_ITEM} opList
 * @param {number} index
 */
function doCheck(opList: OPERATOR_ITEM[], index: number): boolean {
  const check0 = ['leaf', 'leafList'].includes(opList[index].type);
  const check1 = ['question'].includes(opList[index + 1].type);
  const check2 = ['leaf', 'leafList'].includes(opList[index + 2].type);
  const check3 = ['colon'].includes(opList[index + 3].type);
  const check4 = ['leaf', 'leafList'].includes(opList[index + 4].type);
  return check0 && check1 && check2 && check3 && check4;
}

/**
 * @description : 合并成一个树形结构
 * @param {OPERATOR_ITEM} opList
 */
export function doParseOperatorList2Tree(opList: OPERATOR_ITEM[]): OPERATOR_ITEM[] {
  let ret: OPERATOR_ITEM[] = [];
  let copyList: OPERATOR_ITEM[] = JSON.parse(JSON.stringify(opList));
  let isContinue = true;
  let lastLength = -1;
  while (isContinue) {
    for (let index = 0; index < copyList.length - 4; index++) {
      if (doCheck(copyList, index)) {
        copyList[index] = {
          type: 'leafList',
          value: [
            copyList[index],
            copyList[index + 1],
            copyList[index + 2],
            copyList[index + 3],
            copyList[index + 4],
          ]
        };
        copyList.splice(index + 1, 4);
      }
    }

    // 正确的情况下会合并为1
    if (copyList.length === 1) {
      isContinue = false;
    }

    // 防止死循环，如果上一轮合并与这一轮合并的结果一样，说明不是正确的三元运算符
    if (lastLength === copyList.length) {
      isContinue = false;
    }
    lastLength = copyList.length;
  }
  if (copyList.length > 1) {
    vscode.window.showErrorMessage('请选择完整的三元运算符再执行');
    return ret;
  }

  if (copyList.length === 1) {
    ret = copyList;
  }

  return ret;
}

function getSpace(num: number): string {
  let ret = '';
  for (let index = 0; index < num * 2; index++) {
    ret += ' ';

  }
  return ret;
}

export function doParseTree2StrList(opTree: OPERATOR_ITEM[], level: number): string[] {
  let ret: string[] = [];
  let ifConditionList: string[] = [];
  let ifList: string[] = [];
  let elseStrList: string[] = [];
  let opList: OPERATOR_ITEM[] = [];
  let curLevel = level + 1;

  if (opTree.length === 1) {
    opList = opTree[0].value as OPERATOR_ITEM[];
  } else {
    opList = opTree;
  }
  if (opList.length === 5) {
    // if ()
    if (opList[0].type === 'leaf') {
      ifConditionList.push(`${opList[0].value.toString().trim()}`);
    } else if (opList[0].type === 'leafList') {
      ifConditionList.push(...doParseTree2StrList(opList[0].value as OPERATOR_ITEM[], curLevel));
    }
    // if {}
    if (opList[2].type === 'leaf') {
      ifList.push(
        `${getSpace(curLevel)}{`,
        `${getSpace(curLevel)}  return ${opList[2].value.toString().trim()}`,
        `${getSpace(curLevel)}}`
      );
    } else if (opList[2].type === 'leafList') {
      ifList.push(
        `${getSpace(curLevel)}{`,
        ...doParseTree2StrList(opList[2].value as OPERATOR_ITEM[], curLevel),
        `${getSpace(curLevel)}}`
      );
    }
    // else
    if (opList[4].type === 'leaf') {
      elseStrList.push(
        `${getSpace(curLevel)}else`,
        `${getSpace(curLevel)}{`,
        `${getSpace(curLevel)}  return ${opList[4].value.toString().trim()}`,
        `${getSpace(curLevel)}}`
      );
    } else if (opList[4].type === 'leafList') {
      elseStrList.push(...doParseTree2StrList(opList[4].value as OPERATOR_ITEM[], curLevel));
    }
  }

  let retIfConditionList: string[] = [];
  if (ifConditionList.length === 1) {
    retIfConditionList = [
      `${getSpace(curLevel)}if (${ifConditionList[0]}) `
    ];
  } else {
    retIfConditionList = ifConditionList;
  }
  ret = [...retIfConditionList, ...ifList, ...elseStrList];
  return ret;
}