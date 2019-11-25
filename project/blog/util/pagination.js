/*
* @Author: Chen
* @Date:   2019-11-13 17:01:28
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-19 11:15:29
*/

/*
	options:{
		page:当前显示的页码
		model:需要操作的文档模型
		query:查询条件
		projection:需要显示字段信息
		sort:排序
		populates:数组,关联查询信息
	}


*/

async function pagination(options){
	/*
	分页分析:前提条件:得知道要显示第几页的数据,由前端传递参数page
	约定:每一页显示几条数据limit = 2
	规律:
		第1页 显示 1-2 	skip=(1-1)*2 limit = 2
		第2页 显示 2-4	skip=(2-1)*2 limit = 2
		第3页 显示 5-6	skip=(3-1)*2 limit = 2
		......
		第page页 显示   	skip=(page-1)*2 limit = 2
	

	*/

	//获取用户信息渲染到模板
	const limit = 2
	let { page,model,query,projection,sort,populates } = options



	if(isNaN(page)){
		page = 1
	}
	//上一页边界控制
	if(page == 0){
		page = 1
	}

	const count = await model.countDocuments(query)
	const pages = Math.ceil(count/limit)
	//下一页边界控制
	if(page > pages){
		page = pages
	}
	//防止没有数据时pages=0出现问题
	if(page == 0){
		page = 1
	}
	//由于在swig中不能直接进行数字循环因此需要生成页码数组并传递给前台
	let list = []
	for(let i = 1;i<=pages;i++){
		list.push(i)
	}

	const skip = (page - 1)*limit

	//关联查询
	let result = model.find(query,projection)
	if(populates){
		populates.forEach(populate=>{
			result.populate(populate)
		})
	}



	const docs = await result.sort(sort).skip(skip).limit(limit)
	return {
		docs:docs,
		page:page,
		list:list,
		pages:pages
	}
}



module.exports = pagination
