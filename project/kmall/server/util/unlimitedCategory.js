/*
* @Author: Tom
* @Date:   2019-06-25 17:04:43
* @Last Modified by:   Tom
* @Last Modified time: 2019-06-28 17:14:52
*/

/**
 * [repeat 重复字符串]
 * @param  {[String]} src [字符串]
 * @param  {[Number]} n   [重复次数]
 * @return {[String]}     [返回重复的字符串]
 */
function repeat(src, n) {
    return (new Array(n + 1)).join(src);
}

/**
 * [unlimitedForLevel2 获取大于2级的分类并且组合一维数组]
 * @param  {[Array]} categories  [从数据库中查询出的所有的分类的数组]
 * @param  {String} html         [分割符]
 * @param  {Number} pid          [父分类ID]
 * @param  {Number} maxLevel     [层级]
 * @return {[Array]}             [数组]
 */
function unlimitedForLevel(categories,html='--',pid=0,maxLevel=2){
    var arr = [];
    categories.forEach((category)=>{
        if(category['pid'] == pid && category['level'] <= maxLevel){
            var cate = {};
            cate['_id']=category._id;
            cate['pid']=category.pid;
            cate['name']=repeat(html,category['level']) + category.name;
            cate['level'] = category['level'];
            arr.push(cate);
            arr = arr.concat(unlimitedForLevel(categories,html,cate['_id'],maxLevel))
        }
    })
    return arr;
}

/**
 * [unlimitedForTree 组合树形结构]
 * @param  {[Array]} categories [从数据库中查询出的所有的分类的数组]
 * @param  {Number} pid         [父分类ID]
 * @return {[Array]}            [包含children数组的树形结构数组]
 */
function unlimitedForTree(categories,pid=0){
    var arr = [];
    categories.forEach((category)=>{
        if(category['pid'] == pid){
            var cate = {};
            cate['_id']=category._id;
            cate['key']=category._id;
            cate['pid']=category.pid;
            cate['name']=category.name;
            cate['level']=category.level;
            cate['mobileName']=category.mobileName;
            cate['isShow']=category.isShow;
            cate['order']=category.order;
            var children = unlimitedForTree(categories,cate['_id']);
            if(children.length > 0){
                cate['children'] = children;
            }
            arr.push(cate);
        }
    })
    return arr;    
}
/**
 * [getChildsId 通过父级ID 返回所有子类ID]
 * @param  {[Array]} categories [从数据库中查询出的所有的分类的数组]
 * @param  {[Number]} pid       [父分类ID]
 * @return {[Array]}            [包含所有子类ID的数组]
 */
function getChildsId(categories,pid=0){
    var arr = [];
    categories.forEach((category)=>{
        if(category['pid'] == pid){          
            arr.push(category._id);
            arr = arr.concat(getChildsId(categories,category._id))
        }
    })
    return arr;   
}

module.exports = {
    unlimitedForLevel,
    unlimitedForTree,
    getChildsId
}