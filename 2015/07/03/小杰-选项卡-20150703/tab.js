;(function(){
	var defaultConf={
		selector:"", //选择符
		index:0	//初始化的起始位置
	};

	function Tab(options){
		this.$container;
		this.$tabs;
        this.tabsArr;
		this.$contents;
        this.contentsArr;
		this.config=extend(defaultConf,options);
        this.curIndex=this.config.index;
		this.init();
	}

	// 初始化它们
	Tab.prototype.init=function(){
		var self=this,
			config=self.config;

		self.$container=$S(config.selector)[0];

		if(!self.$container) return;

		self.$tabs=$S(".tab > a",self.$container);
		self.$contents=$S(".tab-content > .tc",self.$container);
		self.changeTo(config.index);

        self.tabsArr=Array.prototype.slice.call(self.$tabs,0);
        self.contentsArr=Array.prototype.slice.call(self.$contents,0);

		// 事件绑定一下
		$S(".tab",self.$container)[0].addEventListener("click",function(e){
            var $target=e.target;

            self.tabsArr.forEach(function(tab,index){
                if($target===tab){
                    self.changeTo(index);
                    self.curIndex=index;
                }
            })
		},false);

        console.log(self)
	}

	// 切换到第X个选项卡
	Tab.prototype.changeTo=function(changeto){
		var self=this

		if(changeto!=self.curIndex){
			self.$tabs[self.curIndex].classList.remove("active");
			self.$contents[self.curIndex].style.display="none";
		}

		self.$tabs[changeto].classList.add("active");
		self.$contents[changeto].style.display="block";
	}

	// 这是选择器呀
    function $S(selector, parentsNode) {
        parentsNode ? parentsNode = parentsNode : parentsNode = document;
        var ele = parentsNode.querySelectorAll(selector);
        return ele;
    }

    // 合并对象呗
    function extend() {
        var _extend = function(dest, source) {
            for (var name in dest) {
                if (dest.hasOwnProperty(name)) {
                    //当前属性是否为对象,如果为对象，则进行递归
                    if ((dest[name] instanceof Object) && (source[name] instanceof Object)) {
                        arguments.callee(dest[name], source[name]);
                    }
                    //检测该属性是否存在
                    if (source.hasOwnProperty(name)) {
                        continue;
                    } else {
                        source[name] = dest[name];
                    }
                }
            }
        }
        var _result = {},
            arr = arguments;
        //遍历属性，至后向前
        if (!arr.length) return {};
        for (var i = arr.length - 1; i >= 0; i--) {
            _extend(arr[i], _result);
        }
        arr[0] = _result;
        return _result;
    }

    // CommonJS
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = Tab;
    } else {
        window.Tab = Tab;
    }
})();