<ul class="product-title clearfix">
    <li class="product-select">
        {{#allChecked}}
        <input type="checkbox" class="select-all" checked />
        {{/allChecked}}
        {{^allChecked}}
        <input type="checkbox" class="select-all" />
        {{/allChecked}}        
        <span>全选</span>
    </li>
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
    <li class="product-opreation">
        操作
    </li>
</ul>
{{#cartList}}
<ul class="product-item" data-product-id="{{product._id}}">
    <li class="product-select">
        {{#checked}}
        <input type="checkbox" class="select-one" checked />
        {{/checked}}
        {{^checked}}
        <input type="checkbox" class="select-one" />
        {{/checked}}        
    </li>
    <li class="product-info text-ellipsis">
        <a href="./detail.html?productId={{product._id}}" class="link" target="_blank">
            <img src="{{product.mainImage}}" alt="">
            <span>{{product.name}}</span>
        </a>
    </li>
    <li class="product-price">
        ￥{{product.price}}
    </li>
    <li class="product-count">
        <span class="count-btn minus">-</span><input type="text" value="{{count}}" data-stock="{{product.stock}}" class="count-input" /><span class="count-btn plus">+</span>
    </li>
    <li class="product-totalPrice">
        ￥{{totalPrice}}
    </li>
    <li class="product-opreation">
        <span class="delete-one link">
            <i class="fa fa-trash-o"></i> 删除
        </span>
    </li>   
</ul>
{{/cartList}}
<ul class="product-footer">
    <li class="product-select">
        {{#allChecked}}
        <input type="checkbox" class="select-all" checked />
        {{/allChecked}}
        {{^allChecked}}
        <input type="checkbox" class="select-all" />
        {{/allChecked}} 
        <span>全选</span>
    </li>
    <li class="product-opreation">
        <span class="delete-selected link">
            <i class="fa fa-trash-o"></i> 删除选中
        </span>
    </li>   
    <li class="product-submit">
        <span class="total-price-text">总价:</span>
        <span class="total-price">￥{{totalCartPrice}}</span>
        <a href="javascript:;" class="btn btn-submit">去结算</a>
    </li>
</ul>