// 组件中用由this.$store.dispatch方法来派发action
//action中用commit来提交mutation
// action中可以包含异步操作


//引入api接口
import api from 'api'

import { GET_ADS,GET_HOME_FLOORS } from './types.js'
export default {
	async [GET_ADS](store){
		//拿到store中commit方法
		//确认修改数据
		//发送请求,获取后台数据
		const result = await api.getPositionAds()
		if(result.code == 0){//成功获取数据
			if(result.data.length == 0){//数据是空
				const data = [
					{image:'http://img4.imgtn.bdimg.com/it/u=2620734193,3698990353&fm=26&gp=0.jpg'},
					{image:'http://img3.imgtn.bdimg.com/it/u=3348649617,4212512728&fm=26&gp=0.jpg'},
					{image:'http://img1.imgtn.bdimg.com/it/u=692773087,2837223024&fm=26&gp=0.jpg'},
					{image:'http://img3.imgtn.bdimg.com/it/u=1360533580,1039973399&fm=26&gp=0.jpg'},
				]
				store.commit(GET_ADS,data);
			}else{
				store.commit(GET_ADS,result.data);
			}
		}		
	},
	async [GET_HOME_FLOORS](store){
		const result = await api.getFloors()
		if(result.code == 0){//成功获取数据
			if(result.data[0].products.length == 0){//商品列表失控,说明数据库没有该数据
				result.data[0].title = '手机 智能';
				result.data[1].title = '生活 箱包';
				result.data[2].title = '健康 家居';
				result.data[0].products = [
						{
							mainImg:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6f2493e6c6fe8e2485c407e5d75e3651.jpg?thumb=1&w=200&h=200&f=webp&q=90',
							name:'Redmi Node 8',
							price:'1399元起'
						},
						{
							mainImg:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/411d540271f6efbdd882fa33daee0de3.jpg?thumb=1&w=200&h=200&f=webp&q=90',
							name:'小米Mix 3',
							price:'2599元'
						},
						{
							mainImg:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/bd25cc614a670f4d5546fe82e239ef86.jpg?thumb=1&w=200&h=200&f=webp&q=90',
							name:'小米CC 9',
							price:'1799元'
						},
						{
							mainImg:'https://resource.smartisan.com/resource/b07b9765e272f866da6acda4ee107d88.png?x-oss-process=image/resize,w_474/format,webp',
							name:'坚果 Pro 2S',
							price:'1799元'
						},
						{
							mainImg:'https://resource.smartisan.com/resource/13e91511f6ba3227ca5378fd2e93c54b.png?x-oss-process=image/resize,w_474/format,webp',
							name:'坚果 3',
							price:'1299元'
						},
						{
							mainImg:'https://resource.smartisan.com/resource/84366aa98fd0659d7809e1b9eed62cb4.png?x-oss-process=image/resize,w_474/format,webp',
							name:'坚果 Pro 2 特别版',
							price:'1899元'
						},
					]
				result.data[1].products = [
					{
						mainImg:'https://i8.mifile.cn/a1/pms_1543908491.84129654.jpg',
						name:'米家智能门锁',
						price:'1199元起'
					},
					{
						mainImg:'https://i8.mifile.cn/a1/pms_1567393585.49577260.jpg',
						name:'小米米家智能摄像机云台版',
						price:'199元'
					},
					{
						mainImg:'https://i8.mifile.cn/a1/pms_1534906375.47962399.jpg',
						name:'90分旅行箱',
						price:'299元'
					},
					{
						mainImg:'https://i8.mifile.cn/a1/pms_1545286134.4027257.jpg',
						name:'米家投影仪',
						price:'2399元'
					}
				]
				result.data[2].products = [
					{
						mainImg:'https://i8.mifile.cn/a1/pms_1558927605.77414956.jpg',
						name:'小米路由器4A',
						price:'99'
					},
					{
						mainImg:'https://i8.mifile.cn/a1/pms_1553928014.05321483.png',
						name:'15.6"笔记本 i3 4G 集显',
						price:'2799'
					},
					{
						mainImg:'https://i8.mifile.cn/a1/pms_1521634907.16181074.jpg',
						name:'小米净水器',
						price:'1599元'
					},
					{
						mainImg:'https://i8.mifile.cn/a1/pms_1541382608.41335243.png',
						name:'米兔折叠婴儿推车',
						price:'669元'
					},
					{
						mainImg:'https://i8.mifile.cn/a1/pms_1527754949.17141338.jpg',
						name:'小米手环3',
						price:'129'
					}
				]
				// console.log(result.data)
				store.commit(GET_HOME_FLOORS,result.data);
			}else{
				store.commit(GET_HOME_FLOORS,result.data);
			}
		}		
	},
	
}