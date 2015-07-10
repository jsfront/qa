/**
 * Created by GARY on 15/7/4.
 * 支持自定义类名
 * 支持移动端
 * 支持多处使用
 * 注：代码没有使用jQuery。
 * update:  增加滚动方式判断，修复IE8不支持Array.prototype.indexOf的报错。
 */

//log = console.log.bind(console);

var Tab = (function () {
    function Tab(tabName, tabContentName, onName, activeName) {
        'use strict';
        //this.wrapper = wrapperName;
        this.tabName = tabName;
        this.contentName = tabContentName;
        this.onName = onName || 'on';
        this.activeName = activeName || 'active';
        this.init();
    }

    Tab.prototype.init = function () {
        'use strict';
        var tabItem = document.querySelectorAll(this.tabName + '>li'),
            tabDiv = document.querySelectorAll(this.contentName + '>div'),
        // wrapper = tabDiv.parentNode,
            i,
            itemLen = tabItem.length,
            divLen = tabDiv.length,
            oriDivClass = [],
            oriItemClass = [],
            that = this;

        // 移动端变量
        var clientWidth = document.body.clientWidth,
            moveWrapper = tabDiv[0].parentNode,
            tabDivWidth = moveWrapper.parentNode.offsetWidth,
            mobile = clientWidth < 1024;

        function addHandler(element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + type, handler);
            } else {
                element['on' + type] = handler;
            }
        }

        var animateObj = {
            animateCss: 'all 0.2s ease-in-out',
            animateInit: function () {
                moveWrapper.style.webkitTransition = moveWrapper.style.MozTransition = moveWrapper.style.msTransition = moveWrapper.style.transition = '';
            },
            setAnimate: function () {
                moveWrapper.style.webkitTransition = moveWrapper.style.MozTransition = moveWrapper.style.msTransition = moveWrapper.style.transition = animateObj.animateCss;
            }
        };

        // 移动端tab选项卡盒子大小初始化
        function setView() {
            var i;
            for (i = 0; i < divLen; i += 1) {
                tabDiv[i].style.width = tabDivWidth + 'px';
            }
            moveWrapper.style.width = tabDivWidth * divLen + 'px';
            moveWrapper.style.left = 0;
            animateObj.setAnimate();
        }

        var mobileObj = {

            firstX: 0,
            lastX: 0,
            firstY: 0,
            lastY: 0,
            xIng: 0,
            distanceX: 0,
            yIng: 0,
            currentLeft: 0,
            currentIndex: 0,
            direction: 'peace',

            handlerSart: function (event) {
                var touches = event.changedTouches;

                animateObj.animateInit();
                mobileObj.firstX = touches[0].pageX;
                mobileObj.firstY = touches[0].pageY;
            },

            handlerEnd: function (event) {
                var indexOf = Array.prototype.indexOf,
                    idx = indexOf.call(tabDiv, this),
                    touches = event.changedTouches;

                mobileObj.lastX = touches[0].pageX;
                mobileObj.lastY = touches[0].pageY;

                mobileObj.distanceX = mobileObj.lastX - mobileObj.firstX;

                if (mobileObj.distanceX > 0 && Math.abs(mobileObj.distanceX) > 30) {

                    if (idx === 0) {
                        this.parentNode.style.left = 0;
                    } else {
                        this.parentNode.style.left = parseInt(mobileObj.currentLeft) + tabDivWidth + 'px';
                    }

                } else if (mobileObj.distanceX < 0 && Math.abs(mobileObj.distanceX) > 30) {

                    if (idx === (divLen - 1)) {
                        this.parentNode.style.left = '-' + tabDivWidth * idx + 'px';
                    } else {
                        this.parentNode.style.left = '-' + tabDivWidth * (idx + 1) + 'px';
                    }
                } else {
                    this.parentNode.style.left = mobileObj.currentLeft + 'px';
                }

                mobileObj.currentLeft = parseInt(this.parentNode.style.left);

                //log('最后：' + mobileObj.currentLeft);

                /*log('end测试数据开始');
                 log(mobileObj.distance);
                 log(parseInt(this.parentNode.style.left));
                 log(idx);
                 log(Math.abs(mobileObj.currentLeft));
                 log(parseInt(tabDiv[0].parentNode.style.width));
                 log(divLen);
                 log('end测试数据结束');*/

                mobileObj.currentIndex = (Math.abs(parseInt(mobileObj.currentLeft)) / parseInt(moveWrapper.style.width) ) * divLen;
                mobileObj.direction = 'peace';
                mobileObj.xIng = mobileObj.yIng = 0;

                animateObj.setAnimate();
                //log(mobileObj.xIng);
                triggerSwitch(null, mobileObj.currentIndex);
            },

            handleMove: function (event) {
                if (mobileObj.direction === 'y') return;
                event.stopPropagation();

                var touches = event.changedTouches;
                if (touches.length > 1 || event.scale && event.scale !== 1) return;
                mobileObj.xIng = touches[0].pageX - mobileObj.firstX;
                mobileObj.yIng = touches[0].pageY - mobileObj.firstY;

                //log('x轴：' + mobileObj.xIng + '；y轴：' + mobileObj.yIng);
                //log(mobileObj.direction);

                if (Math.abs(mobileObj.yIng) < Math.abs(mobileObj.xIng)) {
                    mobileObj.direction = 'x';
                    event.preventDefault();
                } else {
                    mobileObj.direction = 'y';
                }
                //log(event.defaultPrevented);
                this.parentNode.style.left = parseInt(mobileObj.currentLeft) + mobileObj.xIng + 'px';
                /* log(mobileObj.xIng);
                 log(this.parentNode.style.left);*/
            }
        };

        function clickMove(event) {
            event = event || window.event;
            var target = event.target || event.srcElement,
                idx = target.index;

            //log(idx, moveWrapper.style.left, mobileObj.currentIndex);

            tabDiv[0].parentNode.style.left = parseInt(moveWrapper.style.left) + tabDivWidth * (mobileObj.currentIndex - idx) + 'px';
            mobileObj.currentIndex = idx;
            mobileObj.currentLeft = moveWrapper.style.left;
            mobileObj.distanceX = 0;
            //log(mobileObj.currentLeft);

            // mobile切换class
            triggerSwitch(null, idx);
        }

        function triggerSwitch(event, currentIndex) {
            event = event || window.event;
            var target = event.target || event.srcElement,
                idx = target.index,
                i;

            for (i = 0; i < divLen; i += 1) {
                tabItem[i].className = oriItemClass[i] + '';
                tabDiv[i].className = oriDivClass[i] + '';
            }
            if (typeof currentIndex !== 'undefined') {
                //log(currentIndex);
                tabDiv[currentIndex].className = oriDivClass[currentIndex] + ' ' + that.activeName;
                tabItem[currentIndex].className = oriItemClass[currentIndex] + ' ' + that.onName;
            } else {
                tabDiv[idx].className = oriDivClass[idx] + ' ' + that.activeName;
                target.className = oriItemClass[idx] + ' ' + that.onName;
            }
        }

        for (i = 0; i < itemLen; i += 1) {
            oriDivClass.push(tabDiv[i].className);
            oriItemClass.push(tabItem[i].className);
            // addHandler(tabItem[i], 'click', triggerSwitch);
            tabItem[i].index = tabDiv[i].index = i;

            mobile ? addHandler(tabItem[i], 'click', clickMove) : addHandler(tabItem[i], 'click', triggerSwitch);

            // 移动端事件绑定
            addHandler(tabDiv[i], 'touchstart', mobileObj.handlerSart);
            addHandler(tabDiv[i], 'touchend', mobileObj.handlerEnd);
            addHandler(tabDiv[i], 'touchcancel', mobileObj.handlerEnd);
            addHandler(tabDiv[i], 'touchleave', mobileObj.handlerEnd);
            addHandler(tabDiv[i], 'touchmove', mobileObj.handleMove);
        }

        tabItem[0].className += ' ' + this.onName;
        tabDiv[0].className += ' ' + this.activeName;

        if (mobile) {
            setView();
        }
    };
    return Tab;

})();

window.onload = function () {
    var newstTab = new Tab('.news-list', '.news-content');
    var storyTab = new Tab('.story-list', '.story-content', 'hover', 'current');
};