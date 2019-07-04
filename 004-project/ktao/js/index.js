(function($){
	var $dropdown = $('.dropdown');
	$dropdown
	.hover(function(){
		// console.log($(this).data('active'));
		var activeClass = $(this).data('active') + "-active"
		$(this).addClass(activeClass);
	},function(){
		var activeClass = $(this).data('active') + "-active"
		$(this).removeClass(activeClass);
	})
})(jQuery);