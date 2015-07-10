//use: 
//$.prototype.each
//$.prototype.data

(function($){
	
	$.prototype.extend({
		on:bindEvent,
		off:unBindEvent
	});
	
	function bindEvent(eventName,eventHandler){
		var $elements=this,
			handler=function(e){
				
				//because jQuery wrap original e with event.originalEvent property.
				var event={
					originalEvent:e,
					
					//preventDefault or stopPropagation must bind 'this' to original e.
					preventDefault:e.preventDefault.bind(e),
					stopPropagation:e.stopPropagation.bind(e)
				};
			
				return eventHandler.call(this,event);
			};
		
		$elements.each(function(){
			var htmlElement=this;
			
			htmlElement.addEventListener(eventName,handler,false);
			$(htmlElement).data(eventName,handler);
		});
		
		return this;
	}
	
	function unBindEvent(eventName){
		var $elements=this,
			eventHandler=$elements.data(eventName);
		
		$elements.each(function(){
			var htmlElement=this;
			
			htmlElement.removeEventListener(eventName,eventHandler,false);
		});
		
		return this;
	}
}(jQuery));