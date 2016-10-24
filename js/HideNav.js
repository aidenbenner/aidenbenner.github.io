(function ($) {
  $(document).ready(function(){
	$(".cust-nav").hide();
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 1001) {
				$('.cust-nav').fadeIn();
			} else {
				$('.cust-nav').fadeOut();
			}
		});
	});
});
  }(jQuery));
