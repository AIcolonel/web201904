//这个文件时为了导出该login的store中的reducer和action,方便外部文件引用

import reducer from './reducer.js';
import * as actionCreaters from './actionCreates.js';

export { reducer,actionCreaters }