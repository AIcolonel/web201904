<!--模板-->
<template>
	<div id="Home">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div 
					class="swiper-slide"
					v-for="(ad,index) in homeAds"
				>
					<img :src="ad.image" alt="">
				</div>
			</div>
			<!-- 如果需要分页器 -->
			<div class="swiper-pagination"></div>
		</div>
		<ul class="product-wrap" v-if="homeFloors.length > 0">
            <li class="product-floor" v-for="(floor,floorIndex) in homeFloors" :key="floorIndex">
                <h3 class="floor-title">{{floor.title}}</h3>
                <ul class="product-list">
                    <li class="product-item" v-for="(product,productIndex) in floor.products" :key="productIndex">
                        <img class="product-image" :src="product.mainImage" alt="">
                        <div class="product-content">
                            <h4 class="product-name">{{product.name}}</h4>
                            <p class="product-price">{{product.price | formatPrice}}</p>
                            <span class="btn-buy">购买</span>
                        </div>
                    </li>           
                </ul>
            </li>       
        </ul>
	</div>
</template>
<!--逻辑-->
<script>
	import { mapGetters } from 'vuex'

	import { GET_ADS,GET_FLOORS } from './store/types.js'

	import Swiper from 'swiper'
	import 'swiper/css/swiper.min.css'

	export default {
		name: 'Home',
		mounted(){
			//获取广告数据
			this.$store.dispatch(GET_ADS)
			.then(()=>{
				new Swiper ('.swiper-container', {
					// 循环模式选项
					loop: true,
					autoplay:true,
					//分页器
					pagination: {
					  el: '.swiper-pagination',
					  clickable:true
					},
				})
			})
			//获取楼层数据
			this.$store.dispatch(GET_FLOORS)
		},
		computed:{
			// 使用对象展开运算符将 getter 混入 computed 对象中
		    ...mapGetters([
		      	'homeAds',
		      	'homeFloors',
		    ])
		}
	}
</script>
<!--样式-->
<style scoped lang="less">
	#Home{
        .swiper-slide img{
            width: 100%;
            .rem(height,160px);
        }
        .product-wrap{
            display: flex;
            flex-direction: column;
            .rem(padding,0,10);
            .product-floor{
                margin-bottom: 10px;
                .floor-title{
                    text-align: center;
                    margin-bottom: 5px;
                    .rem(line-height,30);
                    .rem(font-size,18);
                }
                .product-list{
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    .product-item{
                        box-sizing: border-box;
                        text-align: center;
                        background-color: #fff;
                        margin-top: 10px;
                        .rem(padding,10);
                        .product-image{
                            .rem(width,100);
                            .rem(height,100);
                        }
                        .product-content{
                            .rem(height,100);
                            .rem(width,125);
                            .product-name{
                                .rem(height,40);
                                .rem(line-height,20);
                                .rem(font-size,12);
                                overflow: hidden;
                                text-align: left;
                                color: #111;
                            }
                            .product-price{
                                .rem(line-height,20);
                                .rem(font-size,18);
                                text-align: left;
                                color: #f21;
                            }
                            .btn-buy{
                                display: block;
                                .rem(line-height,20);
                                .rem(width,60);
                                .rem(font-size,16);
                                .rem(padding,5);
                                background-color: #f21;
                                color: #fff;
                                border-radius: 5px;
                                margin-top: 10px;
                            }
                        }
                    }
                }
            }
        }           
    }
</style>