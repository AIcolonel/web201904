<ul class="pagination">
    <!--
    <li class="page-item disabled"  data-value="0">上一页</li>
    <li class="page-item active"  data-value="1">1</li>
    <li class="page-item"  data-value="2">2</li>
    <li class="page-item"  data-value="3">3</li>
    <li class="page-item"  data-value="4">4</li>
    <li class="page-item"  data-value="5">5</li>
    <li class="page-item"  data-value="2">下一页</li>
    <li class="page-summ">1/5</li>
    -->
    {{#pageArray}}
        {{#disabled}}
            <li class="page-item disabled"  data-value="{{value}}">{{name}}</li>
        {{/disabled}}
        {{^disabled}}
            {{#active}}
            <li class="page-item active"  data-value="{{value}}">{{name}}</li>
            {{/active}}
            {{^active}}
            <li class="page-item"  data-value="{{value}}">{{name}}</li>
            {{/active}}            
        {{/disabled}}        
    {{/pageArray}}
    <li class="page-summ">{{current}}/{{pages}}</li>
</ul>