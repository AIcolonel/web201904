/*
 * @Author: TomChen
 * @Date:   2019-08-21 17:42:33
 * @Last Modified by:   TomChen
 * @Last Modified time: 2019-08-23 15:47:03
 */

require('./index.css')

var page = {
    init: function() {
        this.bindEvent()
    },
    bindEvent: function() {
        var _this = this
        $('#btn-search').on('click', function() {
            _this.submit()
        })
        $('#search-input').on('keyup', function(ev) {
            if (ev.keyCode == 13) {
                _this.submit()
            }
        })
    },
    submit: function() {
        //1.获取数据
        var keyword = $.trim($('#search-input').val())
        window.location.href = './list.html?keyword='+keyword
    }
}

$(function() {
    page.init()
})