//use:
//$.prototype.each
//$.prototype.attr

(function($){
	
	$.prototype.extend({
		css:css
	});
	
	function css(valueObj){
		var $elements=this;
		
		$elements.each(function(){
			var $element=$(this),
				styleObj=getStyleObject.call($element);
				
			iterateOnObject.call(valueObj,function(p,v){
				var key=convertKey(p),
					value=convertValue(v);
				
				styleObj[key]=value;
			});
			
			setStyleObjectToElement.call($element,styleObj);
		});
		
		return this;
	}
	
	//private region
	
	function getStyleObject(){
		var $element=this,
		
			styleValue=$element.attr('style'),
			regexp=/([^;]+):([^;]+)(?:;)?/g,
			
			result={};
			
		iterateOnMatches.call(regexp,styleValue,function(eachMatch,key,value){
			result[key.trim()]=value.trim();
		});
			
		return result;
	}
	
	function setStyleObjectToElement(styleObj){
		var $element=this,
			result=[];
			
		iterateOnObject.call(styleObj,function(p,v){
			result.push(p+':'+v);
		});
			
		$element.attr('style',result.join(';'));
		return this;
	}
	
	//tool
	//-------------------------------------------------------------
	
	function iterateOnMatches(str,matchHandler){
		var regexp=this,
			match;
			
		while((match=regexp.exec(str))!=null){
			var result=matchHandler.apply(null,match);
			
			if(result===false){
				
				//reset beginning match position
				regexp.lastIndex=0;
				
				break;
			}
		}
		
		return regexp;
	}
	
	function iterateOnObject(callback){
		var obj=this;
		
		for(var p in obj){
			if(!obj.hasOwnProperty(p)){
				continue;
			}
			
			var result=callback.call(obj,p,obj[p]);
			if(result===false){
				break;
			}
		}
		
		return this;
	}
		
	function convertKey(key){
		return key.replace(/[A-Z]/g,function(c){
			return '-'+c.toLowerCase()
		});
	}
	
	function convertValue(value){
		var isNumber=value===+value;
		
		if(isNumber){
			return value+'px';
		}
		
		return value;
	}
	
}(jQuery));