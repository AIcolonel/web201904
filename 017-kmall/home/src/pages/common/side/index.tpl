{{#list}}
    {{#isActive}}
    <li class="side-item active">
    {{/isActive}}
    {{^isActive}}
    <li class="side-item">
    {{/isActive}}
        <a class="link" href="{{link}}">{{desc}}</a>
    </li>
{{/list}}