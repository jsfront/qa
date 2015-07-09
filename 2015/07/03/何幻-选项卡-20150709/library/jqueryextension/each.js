(function($){
	
	$.prototype.extend({
		each:each
	});
	
	function each(callback){
		var $elements=this;
				
		[].every.call($elements,function(v){
			var result=callback.call(v);
			
			if(result===false){
				return false;
			}
			
			return true;
		});
		
		return this;
	}
}(jQuery));