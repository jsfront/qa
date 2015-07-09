//use:
//$.prototype.each

(function($){
	
	$.prototype.extend({
		attr:attr,
		removeAttr:removeAttr
	});
	
	function attr(key,value){
		var $elements=this;		
		
		if(value==null){
			return getAttr.call($elements,key);
		}
		
		return setAttr.call($elements,key,value);
	}
	
	function removeAttr(key){
		var $elements=this;
		
		$elements.each(function(){
			var item=this;
			
			item.removeAttribute(key);
		});
		
		return this;
	}
	
	//private region
	
	function getAttr(key){
		var $elements=this;
		
		return $elements[0].getAttribute(key);
	}
	
	function setAttr(key,value){
		var $elements=this;
		
		$elements.each(function(){
			var item=this;
			
			item.setAttribute(key,value);
		});
		
		return this;
	}
	
}(jQuery));