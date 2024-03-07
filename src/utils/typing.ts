export interface OPERATOR_ITEM {
  value: string | OPERATOR_ITEM[]
  type: 'text' | 'question' | 'colon' | 'leaf'
}