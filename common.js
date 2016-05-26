$(document).ready(function() {

	$('#product-accordion h4').click(function() {
		$(this).parent().toggleClass('active');
	});
	
	$('.faq h2').click(function() {
		$(this).toggleClass('active');
	});
	
	$('.gallery a').magnificPopup({
		type:'image',
		image: { titleSrc: 'title' },
		gallery: { enabled:true },
		zoom: {
			enabled: true,
			duration: 300,
			easing: 'ease-in-out',
		}
	});

});
/* jQuery.fn.clickToggle = function(a,b) {
	var ab=[b,a];
  	function cb(){ ab[this._tog^=1].call(this); }
  	return this.on("click", cb);
}; */