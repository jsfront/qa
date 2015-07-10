(function($){
	
	$.prototype.extend({
		eq:eq
	});
	
	function eq(index){
		var $elements=this;
		
		return $($elements[index]);
	}
	
}(jQuery));