(function(global){
	
	//export
	global.Inturn=Inturn;
	
	//private region
	
	function Inturn(length){
		var instance=this;
		
		instance.index=0;
		instance.length=length;
	}
	
	Inturn.prototype={
		setIndex:function(index){
			var instance=this;
			
			instance.index=index;
			return this;
		},
		getIndex:function(){
			var instance=this;
			
			return instance.index;
		},
		prev:function(){
			var instance=this;
			
			instance.index=instance.index===0
				?instance.length-1
				:instance.index-1;
				
			return this;
		},
		next:function(){
			var instance=this;
			
			instance.index=instance.index===instance.length-1
				?0
				:instance.index+1;
				
			return this;
		}
	};
	
}(window));