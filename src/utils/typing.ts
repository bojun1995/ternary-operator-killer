export interface OPERATOR_ITEM {
  value: string | OPERATOR_ITEM[]
  type: 'leaf' | 'question' | 'colon' | 'leafList'
}