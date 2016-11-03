function stylefunction(){

	var winheight;
	var docheight;

	// Include Navigation
	$('.navigation').load('includes/navigation.html', function(){
		// load callback
		if( $(document).height() > $(window).height() ){
			$('.footer').css({'position': 'relative', 'margin-top': '50px'});
		}
	});

	// Initialise selectize dropdown
	$('.select').selectize();

	// Initialise datepicker
	$('.datepicker').datepicker({
		format: 'dd-mm-yyyy'
	});

	// Listproducts.html Specifiek
	$("#tbl_products > tbody > tr:even").addClass("even");
	$("#tbl_products > tbody > tr:odd").hide();
	$("#tbl_products > tbody > tr:first-child").show();

	$("#tbl_products > tbody > tr.even").click(function(){
		$(this).next("tr").toggle();
		$(this).toggleClass('active');
	});

	// Productdetails.html Specifiek
	$('.image_select').selectize({
		render: {
			option: function(item, escape){
				return '<div style="width: 100%; text-align: center"><img src="img/winding_'+item.value+'.jpg"></div>'
			}	
		}
	});

};

//$(document).ready(function(){
//	stylefunction();
//});