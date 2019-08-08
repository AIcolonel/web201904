//分页处理
/*
page:显示页码
model:数据模型
query:查询条件
projection:映射字段
sort:排序
*/
async function pagination(options){
	let { page,model,query,projection,sort } = options;
	const limit = 2;

	page = parseInt(page);
	if(isNaN(page)){
		page = 1;
	}

	if(page == 0){
		page = 1;
	}

	//获取数据总条数
	const count = await model.countDocuments(query);
	//计算总页数
	const pages = Math.ceil(count / limit);
	if(page > pages){
		page = pages;
	}
	if(pages == 0){
		page = 1;
	}
	//生成页码组
	let list = [];
	for(let i =1;i<=pages;i++){
		list.push(i);
	}
	//每页显示条数
	const skip = (page -1)*limit;

	const docs = await model.find(query,projection)
	.sort(sort)
	.skip(skip)
	.limit(limit)

	return {
		docs,
		page,
		list,
		pages
	}
}

module.exports = pagination;