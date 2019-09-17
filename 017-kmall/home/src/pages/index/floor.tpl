{{#floors}}
<div class="floor-box">
    <a href="./list.html?categoryId={{id}}" class="link"><h2 class="floor-title">F{{num}} {{title}}</h2></a>
    <ul class="floor-list clearfix">
        {{#products}}
        <li class="floor-item">
            <a href="./detail.html?productId={{_id}}">
                <img class="floor-img" src="{{mainImage}}" alt="{{name}}" />
                <p class="floor-text text-ellipsis">{{name}}</p>
                <p class="floor-price">{{price}}</p>
            </a>
        </li>
        {{/products}}
    </ul>
</div>
{{/floors}}