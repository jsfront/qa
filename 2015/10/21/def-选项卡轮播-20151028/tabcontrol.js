(function(w){
  if(w.onload){
    var oldfunc = w.onload;
    w.onload = function(){
	  oldfunc();
	  init();
	}
  } else {
    w.onload = init;
  }
})(window);

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

function init(){
  //document.getElementById("test").className = "active";
  //alert("test");
  var tabctls = getElementsByClassName("tabcontrol");
  
  for(var i=0;i < tabctls.length;i++){
    var tabcaps = getElementsByClassName("tab-captain",tabctls[i]);
	for(var j=0;j < tabcaps.length;j++){
	  var tabs = tabcaps[j].getElementsByTagName('li');
	  for(var k=0;k < tabs.length;k++){
	    tabs[k].onclick=this.tab_click_handler;
	  }
	}
	
	if(/carousel/.test(tabctls[i].getAttribute("class"))){
	  //setTimeout(carousel(tabctls[i].getAttribute("id")),1000);
	  //console.log("add carousel");
	  var tabctl = document.getElementById(tabctls[i].getAttribute("id"));
      var tabcaps = getElementsByClassName("tab-captain",tabctl);
	  
	  //定义全局变量，避免递归死循环
      items = tabcaps[0].getElementsByTagName("li");
	  index = 0;
	  //setTimeout(carousel(items,0),2000);
	  setTimeout(carousel,2000);
	}
  }
}

function switch_to(obj){
  var pNode = obj.parentNode;
  var preTab = getElementsByClassName("active",pNode);
  var tabctl = pNode.parentNode;
  var items = getElementsByClassName("item",tabctl);
  var curItemIdx = obj.getAttribute("data-switch-to");
  //console.log("curItemIdx:"+curItemIdx);

  //从当前选项卡往后轮播
  index = curItemIdx * 1 + 1;
  
  //for(var i=0;i< preTab.length;i++){
	var preItemIdx = preTab[0].getAttribute("data-switch-to");
		
	//console.log("preTab.length:"+preTab.length+":"+preTab[0].innerHTML);
    preTab[0].className = preTab[0].className.replace(/active/ig,"");
	//console.log("preTab.length:"+preTab.length);
	items[preItemIdx].className = items[preItemIdx].className.replace(/active/ig,"");
  //}
  
  /*
  var subNodes = pNode.childNodes;
  for(var i=0;i < subNodes.length;i++){
    if(subNodes[i].hasClass("active")){
	  subNodes[i].className.replace(/active/,"");
	}
  }*/
  obj.className = obj.className + " active";
  items[curItemIdx].className = items[curItemIdx].className + " active";
}

function tab_click_handler(){/*
  //console.log('tab_click');
  var pNode = this.parentNode;
  var preTab = getElementsByClassName("active",pNode);
  var tabctl = pNode.parentNode;
  var items = getElementsByClassName("item",tabctl);
  var curItemIdx = this.getAttribute("data-switch-to");
  //console.log("curItemIdx:"+curItemIdx);
  
  //for(var i=0;i< preTab.length;i++){
	var preItemIdx = preTab[0].getAttribute("data-switch-to");
		
	//console.log("preTab.length:"+preTab.length+":"+preTab[0].innerHTML);
    preTab[0].className = preTab[0].className.replace(/active/ig,"");
	//console.log("preTab.length:"+preTab.length);
	items[preItemIdx].className = items[preItemIdx].className.replace(/active/ig,"");
  //}
  
  /*
  var subNodes = pNode.childNodes;
  for(var i=0;i < subNodes.length;i++){
    if(subNodes[i].hasClass("active")){
	  subNodes[i].className.replace(/active/,"");
	}
  }
  this.className = this.className + " active";
  items[curItemIdx].className = items[curItemIdx].className + " active";*/
  switch_to(this);
}

function carousel(){
  //var tabctl = document.getElementById(id);
  //var tabcaps = getElementsByClassName("tab-captain",tabctl);
  //var items = tabcaps[0].getElementsByTagName("li");
  //console.log(items.length);
  //if(index > items.length - 1){
  //  index = 0;
  //}
  
  //tab_click_handler(items[index++]);
  //items[index].click();
  //switch_to(items[index]);
  var curIdx = index>=items.length?0:index;
  var preIdx = curIdx-1<0?items.length-1:curIdx-1;
  //console.log("preIdx:"+preIdx);
  //console.log("curIdx:"+curIdx);
  
  items[preIdx].className = "";
  items[curIdx].className = "active";
  
  //console.log(items[curIdx].parentNode.parentNode.childNodes[3].getElementsByTagName("div")[items[preIdx].getAttribute("data-switch-to")].className);
  items[preIdx].parentNode.parentNode.childNodes[3].getElementsByTagName("div")[items[preIdx].getAttribute("data-switch-to")].className = "item";
  items[curIdx].parentNode.parentNode.childNodes[3].getElementsByTagName("div")[items[curIdx].getAttribute("data-switch-to")].className = "item active";
  
  index = curIdx + 1;
  setTimeout(carousel,2000);
  //alert("carousel opt");
  //setTimeout(carousel,2000);
}