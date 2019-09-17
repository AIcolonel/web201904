/*
 * @Author: TomChen
 * @Date:   2018-08-04 17:14:00
 * @Last Modified by:   Tom
 * @Last Modified time: 2019-07-04 15:09:39
 */
const mongoose = require('mongoose');
const pagination = require('../util/pagination.js');
const { unlimitedForTree } = require('../util/unlimitedCategory.js');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String
    },
    mobileName:{
        type: String
    },
    pid: {
        type: String,
        default: 0 //0-顶级分类
    },
    level:{
        type:Number,
        default:1
    },
    isShow: {
        type: String,
        default: '0' //是否在前台页面显示(分类,楼层) 0-不显示 1-显示
    },
    order: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

CategorySchema.statics.getPaginationCategories = function(page=1, query = {}) {
    return new Promise((resolve, reject) => {
        this
        .find({}, '-createdAt -updatedAt -__v')
        .sort({ order: -1 })
        .then(categories => {
            const pageSize = 2;
            /*
                第 1 页: 0 2
                第 2 页: 2 2
                第 3 页: 4 2
                第 n 页: (n - 1)*pageSize,pageSize
             */
            let treeData = unlimitedForTree(categories);
            let current = page;
            let total =  treeData.length;
            resolve({
                current:current*1,
                total:total,
                pageSize:pageSize,
                list:treeData.splice((current-1)*pageSize,pageSize)
            })

        })
    })
}
const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel;