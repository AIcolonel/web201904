/*
* @Author: TomChen
* @Date:   2018-08-09 10:22:53
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-21 09:54:47
*/


/*
options = {
	page: //需要显示的页码
	model: //操作的数据模型
	query: //查询条件
	projection: //投影，
	sort: //排序,
	populate:[]
}
*/

let pagination = (options)=>{

	return new Promise((resolve,reject)=>{
		//需要显示的页码
		
		let page = 1;

		if(!isNaN(parseInt(options.page))){
			page = parseInt(options.page);
		}

		if(page <= 0){
			page = 1;
		}

		//每页显示条数
		let limit = options.pageSize || 2;

		/*
		分页:
		假设: 每页显示 2 条  
		limit(2)
		skip()//跳过多少条

		第 1 页 跳过 0 条
		第 2 页 跳过 2 条
		第 3 也 跳过 4 条

		综上发现规律:
		(page - 1) * limit
		*/

		options.model.countDocuments(options.query)
		.then((count)=>{
			let pages = Math.ceil(count / limit);
			if(page > pages){
				page = pages;
			}
			if(pages == 0){
				page = 1;
			}

			let skip = (page - 1)*limit;

			let query = options.model.find(options.query,options.projection);
			
			if(options.populate){
				for(let i = 0;i<options.populate.length;i++){
					query = query.populate(options.populate[i])
				}
			}

			query
			.sort(options.sort)
			.skip(skip)
			.limit(limit)
			.then((docs)=>{
				resolve({
					list:docs,
					current:page*1,
					pageSize:limit,
					total:count
				})		
			})
		})
	});
}

module.exports = pagination;