(function($){
	
	$.prototype.extend({
		find:find,
		filter:filter
	});
	
	var staticConfig={
			searcher:{
				' ':descendantSearcher,
				'>':childrenSearcher
			},
			filter:{
				'':tagNameFilter,
				'#':idFilter,
				'.':classFilter,
				'[':attrFilter,
				':':formFilter
			}
		},
		
		SEARCHER=' >',
		FILTER='#.\\[:';
		
	//>tag.class #id[attr=value]
	//first split level, levelItems=[{level:'>',selector:'tag.class'},{level:' ',selector:'#id[attr=value]'}]
	//use levelItem.level to decide searching mode: childrenSearcher/descendantSearcher
	
	//for each level, split type, typeItems=[{type:'',selector:'tag'},{type:'.',selector:'class'}]
	//use typeItem to filter elements set
	
	//warning: if there have a problem of efficiency, we can search from tail, instead to use parentSearcher/ancestorSearcher, 
	//and filter by id first.
	function find(selector){
		var $elements=this,
			levelItems=splitLevel(selector,SEARCHER),
			
			result=$elements;
			
		levelItems.forEach(function(levelItem){
			var level=levelItem.level,
				levelSelector=levelItem.selector,
				
				//searcher
				levelSearcherResult=staticConfig.searcher[level].call(result),
				
				//filter
				$typeFilterResult=filter.call(levelSearcherResult,levelSelector);
				
			result=$typeFilterResult;
		});
		
		return result;
	}
	
	function filter(selector){
		var $elements=this,
			typeItems=splitType(selector,FILTER),
			
			typeFilterResult=$elements;
			
		typeItems.forEach(function(typeItem){
			var type=typeItem.type,
				typeSelector=typeItem.selector;
				
			typeFilterResult=staticConfig.filter[type].call(typeFilterResult,typeSelector);
		});
	
		return $(typeFilterResult);
	}
	
	//private region
	
	//level searcher
	//-------------------------------------------------------------
	
	function childrenSearcher(){
		var $elements=this,
			result=[];
		
		[].forEach.call($elements,function(item){
			var children=item.children;
			
			[].forEach.call(children,function(child){				
				var isContain=result.some(function(v){
					return v===child;
				});
				
				if(isContain){
					return;
				}
				
				result.push(child);
			});
		});
		
		return result;
	}
	
	function descendantSearcher(){
		var $elements=this;
		
		[].forEach.call($elements,function(item){
			var children=childrenSearcher.call([item]);	
			if(children.length===0){
				return;
			}
			
			children.forEach(function(child){
				var descendants=descendantSearcher.call([child]);
				
				[].forEach.call(descendants,function(current){
					var isContain=[].some.call($elements,function(v){
						return v===current;
					});
					
					if(isContain){					
						return;
					}
					
					$elements[$elements.length]=current;
					$elements.length++;
				});
			});
		});
		
		return $elements;
	}
	
	//type filter
	//-------------------------------------------------------------
	
	function tagNameFilter(tagName){
		var $elements=this;
		
		return [].filter.call($elements,function(item){
			var tag=item.tagName;
			
			return tag.toLowerCase()===tagName.toLowerCase();
		});
	}
	
	function idFilter(id){
		var $elements=this;
		
		return [].filter.call($elements,function(item){
			var idAttr=item.getAttribute('id');
			
			if(idAttr==null
				||idAttr!==id){
				return false;
			}
			
			return true;
		});
	}
	
	function classFilter(className){
		var $elements=this;
		
		return [].filter.call($elements,function(item){
			var classAttr=item.getAttribute('class');
			
			if(classAttr==null){
				return false;
			}
			
			var classList=getMatchResult(classAttr,/ *([^ ]+) */g,function(eachMatch,name){
					return name;
				}),
				isContain=classList.some(function(classItem){
					return classItem===className;
				});		
			
			if(!isContain){
				return false;
			}
			
			return true;
		});
	}
	
	function attrFilter(attr){
		attr='['+attr;
		
		var $elements=this,
			regexp=/\[(.+?)(?:=(.+))?\]/,
			match=regexp.exec(attr);
			
		if(match==null){
			return $elements;
		}
		
		var attrName=match[1],
			attrValue=match[2];
			
		return [].filter.call($elements,function(item){
			var itemAttr=item.getAttribute(attrName);
			
			if(itemAttr==null){
				return false;
			}
			
			if(attrValue==null){
				return true;
			}
			
			return itemAttr===attrValue;
		});
	}
	
	function formFilter(name){
		var $elements=this;
		
		switch(true){
			case name==='text':
				return $elements.filter('input[type=text]');
				
			case name==='checkbox':
				return $elements.filter('input[type=checkbox]');
			
			case name==='radio':
				return $elements.filter('input[type=radio]');
			
			case name==='checked':
				return $elements.filter('[checked]');
			
			default:
				return $elements;
		}
	}
	
	//split
	//-------------------------------------------------------------
	
	//str='tag#id.class'
	//types='#.'
	//splitType('tag#id.class','#.')
	function splitType(str,types){
		var regexpStr='(['+types+']?)([^'+types+']+)',
			regexp=new RegExp(regexpStr,'g'),
			
			result=getMatchResult(str,regexp,function(eachMatch,type,selector){
				return {
					type:type,
					selector:selector
				};
			});
			
		return result;
	}
	
	//str='tag1#id1.class1>tag2#id2.class2 tag3#id3.class3'
	//levels=' >'
	//splitLevel('tag1#id1.class1>tag2#id2.class2 tag3#id3.class3',' >')
	function splitLevel(str,levels){
		str.slice(0,1)!==''&&(str=' '+str);
		
		var regexpStr='(['+levels+']?)([^'+levels+']+)',
			regexp=new RegExp(regexpStr,'g'),
			
			result=getMatchResult(str,regexp,function(eachMatch,level,selector){
				return {
					level:level,
					selector:selector
				};
			});
			
		return result;
	}
	
	//tool
	//-------------------------------------------------------------
	
	function getMatchResult(str,regexp,matchHandler){
		var match,
			result=[];
			
		while((match=regexp.exec(str))!=null){
			result.push(matchHandler.apply(null,match));
		}
		
		return result;
	}
	
}(jQuery));