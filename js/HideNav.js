(function ($) {
  $(document).ready(function(){
	$(".cust-nav-stick").hide();
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 1001) {
				$('.cust-nav-stick').fadeIn();
			} else {
				$('.cust-nav-stick').fadeOut();
			}
		});
	});
});
  }(jQuery));
