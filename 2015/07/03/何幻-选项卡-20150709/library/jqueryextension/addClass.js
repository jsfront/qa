//use: 
//$.prototype.each

(function($){
	
	$.prototype.extend({
		addClass:addClass,
		removeClass:removeClass
	});
	
	function addClass(className){
		var $elements=this;
		
		$elements.each(function(){
			var htmlElement=this,
				classAttribute=htmlElement.getAttribute('class');
				
			if(classAttribute==null){
				htmlElement.setAttribute('class',className);
				return;
			}
			
			var classList=getClassList(classAttribute),
				isContain=classList.some(function(v){
					return v===className;
				});		
			
			if(isContain){
				return;
			}
			
			htmlElement.setAttribute('class',classAttribute+' '+className);
		});
		
		return this;
	}
	
	function removeClass(className){
		var $elements=this;
		
		$elements.each(function(){
			var htmlElement=this,
				classAttribute=htmlElement.getAttribute('class');
				
			if(classAttribute==null){
				return;
			}
			
			if(className==null){
				htmlElement.removeAttribute('class');
				return;
			}
			
			var classList=getClassList(classAttribute),
				newClassList=classList.reduce(function(memo,val){
					if(val===className){
						return memo;
					}
					
					memo.push(val);
					return memo;
				},[]);
				
			if(newClassList.length===0){
				htmlElement.removeAttribute('class');
				return;
			}
				
			htmlElement.setAttribute('class',newClassList.join(' '));	
		});
		
		return this;
	}
	
	function getClassList(classAttribute){
		var regexp=/ *([^ ]+) */g,
			match,
			classList=[];
			
		while((match=regexp.exec(classAttribute))!=null){
			classList.push(match[1]);
		}
		
		return classList;
	}
	
	
	
}(jQuery));