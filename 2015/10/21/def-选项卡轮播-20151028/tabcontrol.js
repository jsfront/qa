(function(w){
  w.onload=init;
})(window);

function init(){
  //document.getElementById("test").className = "active";
  //alert("test");
  var tabctls = getElementsByClassName("tabcontrol");
  
  for(var i=0;i < tabctls.length;i++){
    var tabcaps = getElementsByClassName("tab-captain",tabctls[i]);
	for(var j=0;j < tabcaps.length;j++){
	  var tabs = tabcaps[j].getElementsByTagName('li');
	  for(var k=0;k < tabs.length;k++){
	    tabs[k].onclick=tab_click_handler;
	  }
	}
  }
}

function getElementsByClassName(className,context){
		//如果有指定从某个元素里寻找
        context = context || document;

		//如果浏览器支持原生的方法，则直接用原生的方法
        if(context.getElementsByClassName){                               
            return context.getElementsByClassName(className);
        }
		
		//遍历
        var nodes = context.getElementsByTagName("*"); 

		//存放匹配到的节点
        var rets = [];                                                     
        for(var i = 0; i < nodes.length; i++){
			//hasClass派上用场了
            if(hasClass(className,nodes[i])){                      
                rets.push(nodes[i]);
            }
        }
       return rets;
}

function tab_click_handler(){
  //console.log('tab_click');
  var pNode = this.parentNode;
  var preTab = getElementsByClassName("active",pNode);
  var tabctl = pNode.parentNode;
  var items = getElementsByClassName("item",tabctl);
  var curItemIdx = this.getAttribute("data-switch-to");
  
  if(preTab){
  for(var i=0;i< preTab.length;i++){
    preTab[i].className = preTab[i].className.replace(/active/g," ");
	
	var preItemIdx = preTab[i].getAttribute("data-switch-to");
	items[preItemIdx].className = items[preItemIdx].className.replace(/active/g,"");	
  }
  }
  
  /*
  var subNodes = pNode.childNodes;
  for(var i=0;i < subNodes.length;i++){
    if(subNodes[i].hasClass("active")){
	  subNodes[i].className.replace(/active/,"");
	}
  }*/
  this.className = this.className + " active";
  items[curItemIdx].className = items[curItemIdx].className + " active";
}