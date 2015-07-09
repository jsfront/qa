(function($){
			
	var spanCount=$('#indicator>div>span').length,
		inturn=new window.Inturn(spanCount);
	
	$('#switchOver').switchOver('init',{
		selector:'>div',
		progress:function(deltaX,deltaY){
			var $element=$(this);
			
			$element.css({
				left:deltaX
			});
		},
		success:function(deltaX,deltaY){
			var $element=$(this);					
			$element.css({
				left:0
			});
			
			if(deltaX===0){
				return;
			}
			
			var index=$('#indicator>div>span.active').index();
				
			inturn.setIndex(index);
			
			var nextIndex=deltaX>0
				?inturn.prev().getIndex()
				:inturn.next().getIndex();
				
			$('#switchOver>div')
				.removeClass('show')
				.eq(nextIndex)
				.addClass('show');
			
			$('#indicator>div>span')
				.removeClass('active')
				.eq(nextIndex)
				.addClass('active');
		}
	});
	
}(jQuery));