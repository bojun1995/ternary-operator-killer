import { OPERATOR_ITEM } from './typing';

/**
 * @description : 解析拷贝的三元运算符
 * @result : 
 *  [
 *    { value: '1', type: 'text' },
 *    { value: '?', type: 'question' },
 *    { value: [], type: 'leaf'}
 *  ]
 * @param {string} selectedWords
 */
export function doParseSelectedWords2OperatorList(selectedWords: string): OPERATOR_ITEM[] {
  const ret: OPERATOR_ITEM[] = [];

  let wordsList: string[] = [];
  let wordCache = '';
  // 按照条件分词
  const ternaryOpList: string[] = [];
  const ternaryOpTypeList: string[] = [];
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
          // push之前缓存的text并清空
          ternaryOpList.push(wordCache);
          ternaryOpTypeList.push('text');
          wordCache = '';

          // push当前操作符
          ternaryOpList.push(word);
          if ('?' === word) {
            ternaryOpTypeList.push('question');
          } else if (':' === word) {
            ternaryOpTypeList.push('colon');
          }
        } else {
          // 继续缓存cache
          wordCache += word;
        }
      }

      // 最后一定为text直接push
      if (wordIdx === wordsList.length - 1) {
        ternaryOpList.push(wordCache);
        ternaryOpTypeList.push('text');
        wordCache = '';
      }
    });

  }
  return ret;
}