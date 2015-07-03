/**
 * Created by yelingfeng on 2015/7/3.
 */

var Tab = function(){

   var id = "tab" + new Date() - 0 ;
   var defaultOption = {
       animateClass: "fadeIn animated",
       activeClass : "on"
   }

   var tab = function(){
        this._init.apply(this,arguments);
   };
   tab.prototype = {
         //初始化
        _init : function(option){
            this.option = $.extend(defaultOption,{},option);
            this.box = $("<div class='tabWapper' id='"+id+"'/>");
            this._dataCache();
            this._create();
            this._bindEvent();
            this.activeTab(0);
        },
        // 构建
        _create : function(){
           var item,
               tabs = $("<div class='tabs'/>"),
               contents = $("<div class='contents'/>");
           for(var key in this.dataCache){
               item = this.dataCache[key];
               tabs.append('<div class="tab" rel="'+item.id+'">'+item.text+'<i class="arrow"></i></div>');
               contents.append('<div class="content" rel="'+item.id+'"><p>'+item.content+'</p></div>');
           }
           this.box.append(tabs).append(contents);
           $(this.option.parent).append(this.box);
        },
        // 缓存数据
        _dataCache : function(){
            var dataCache = {};
            $.each(this.option.data,function(i,it){
                dataCache[it.id] = it;
            });
            this.dataCache = dataCache;
        },
        // 绑定事件
        _bindEvent : function(){
            var me = this;
                tabs = $(".tab",me.box),
                contents = $(".content",me.box);
            tabs.on('click',function(){
                var $this = $(this),
                    id = $this.attr("rel"),
                    contentRel = $(".contents > [rel='"+id+"']",me.box);
                $this.siblings().removeClass(me.option.activeClass)
                    .end().addClass(me.option.activeClass);
                contentRel.siblings().hide().removeClass(me.option.animateClass)
                    .end().show().addClass(me.option.animateClass);
            });

           if($.isFunction( this.option.callback)) {
               this.option.callback(me);
           }
        },
        activeTab : function(index){
            this.box.find(".tab").eq(index).addClass(this.option.activeClass);
        }
    };
    return tab;
}();

window.Tab = Tab;
