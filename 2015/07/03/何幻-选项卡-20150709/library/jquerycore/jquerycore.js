(function(global){
	
	//export
	global.jQuery=jQuery;
	
	//private region	
	jQuery.prototype=InstanceCreation.prototype;
	jQuery.extend=jQuery.prototype.extend=extend;
	
	function jQuery(selector){
		return new InstanceCreation(selector);
	}
	
	function InstanceCreation(selector){
		var instance=this,
			elements=select(selector);
			
		[].forEach.call(elements,function(v,i){
			instance[i]=v;
		});
		
		instance.length=elements.length;		
		return this;
	}
	
	function extend(material){
		var depository=this;
	
		for(var property in material){
			if(!material.hasOwnProperty(property)){
				continue;
			}
			
			depository[property]=material[property];
		}
		
		return this;
	};
	
	function select(selector){
		switch(true){
			
			//use case: $('input')
			case typeof selector==='string':
				return global.document.querySelectorAll(selector);
			
			//use case: $([object NodeList])
			case selector.length!=null:
				return selector;
				
			//use case: $([object HTMLInputElement])
			case selector.length==null:
				return [selector];			
		}
	}
}(window));