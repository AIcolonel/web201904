<div class="panel">
    <h2 class="panel-header">商品清单</h2>
    <div class="pandel-body">
        <ul class="product-title clearfix">
            <li class="product-info">
                商品
            </li>
            <li class="product-price">
                单价
            </li>
            <li class="product-count">
                数量
            </li>
            <li class="product-totalPrice">
                小计
            </li>
        </ul>
        {{#cartList}}
        <ul class="product-item" data-product-id="{{product._id}}">
            <li class="product-info text-ellipsis">
                <a href="./detail.html?productId={{product._id}}" class="link" target="_blank">
                    <img src="{{product.mainImage}}" alt="{{product.name}}">
                    <span>{{product.name}}</span>
                </a>
            </li>
            <li class="product-price">
                ￥{{product.price}}
            </li>
            <li class="product-count">
                {{count}}
            </li>
            <li class="product-totalPrice">
                ￥{{totalPrice}}
            </li>   
        </ul>
        {{/cartList}}
        <ul class="product-footer">
            <li class="product-submit">
                <span class="total-price-text">总价:</span>
                <span class="total-price">￥{{totalCartPrice}}</span>
                <a href="javascript:;" class="btn btn-submit">去支付</a>
            </li>
        </ul>       
    </div>
</div>