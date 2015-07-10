//use: 
//$.prototype.find
//$.prototype.on

(function($){
	
	$.prototype.extend({
		delegate:delegate,
		undelegate:undelegate
	});
	
	function delegate(selector,eventName,eventHandler){
		var $elements=this,
			$targetElements=$elements.find(selector);
		
		$elements.on(eventName,function(e){
			
			//e is jQuery event.
			//use e.originalEvent to get html event.
			var targetElement=e.originalEvent.target,
				isContain=[].some.call($targetElements,function(current){
					return current===targetElement;
				});
				
			if(!isContain){
				return;
			}
			
			eventHandler.call(targetElement,e);
		});
				
		return this;
	}
	
	function undelegate(eventName){
		var $elements=this;
			
		$elements.off(eventName);		
		return this;
	}
	
}(jQuery));