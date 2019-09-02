const SERVER = "http://127.0.0.1:3000/";

export const ADMIN_LOGIN = SERVER + 'sessions/users';
export const USER_LOGOUT = SERVER + 'sessions/users';
export const ADMIN_COUNT = SERVER + 'counts';
export const GET_PAGES = SERVER + 'users/list';
export const ADD_CATEGORY = SERVER + 'categories';
export const GET_LEVEL_CATEGORIES = SERVER + 'categories/levelCategories';
//获取分类信息api
export const GET_CATEGORY_PAGE = SERVER + 'categories/list';
//更新分类名称api
export const UPDATE_CATEGORY_NAME = SERVER + 'categories/name';
//更新手机分类名称api
export const UPDATE_CATEGORY_MOBILE_NAME = SERVER + 'categories/mobileName';
//更新排序api
export const UPDATE_CATEGORY_ORDER = SERVER + 'categories/order';
//更新显示api
export const UPDATE_CATEGORY_SHOW = SERVER + 'categories/isShow';