(function($){
	
	$.prototype.extend({
		index:index
	});
	
	function index(){
		var $elements=this,
			htmlElement=$elements[0],
			parent=htmlElement.parentNode,
			children=parent.children,
			childrenCount=children.length;
			
		for(var i=0;i<childrenCount;i++){
			if(htmlElement===children[i]){
				break;
			}
		}
			
		if(i===childrenCount){
			return -1;
		}
		
		return i;	
	}
	
}(jQuery));