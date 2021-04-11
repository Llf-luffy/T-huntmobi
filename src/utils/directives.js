import Vue from 'vue'
/* eslint-disable*/
// 注册双击指令
var sepcialcount = 0
function vueDoubliClick (el,binding,type) {
  var _this=this
  this.obj=el
  this.binding=binding
  this.touchType=type
  this.doubleClick = true
  this.vueCallBack=typeof(binding.value)=="object"?binding.value.fn:binding.value
  this.obj.addEventListener("click",function(e){
    _this.start(e);
    
  },false)
}
vueDoubliClick.prototype={
  start: function (e){
    sepcialcount++
    var that = this
    console.log('vueDoubliClick' + sepcialcount)
    setTimeout(function () {
      if (sepcialcount === 2) {
        console.log(JSON.stringify(that.binding))
        that.touchType=="doubleclick"&&that.vueCallBack(that.binding.value,e);
        that.doubleClick=false;
      }
      sepcialcount = 0
    }, 500)
  }
}
Vue.directive("doubleclick",{
  bind:function(el,binding){
    new vueDoubliClick(el,binding,"doubleclick");
  }
})
// v-dialogDrag: 弹窗拖拽
Vue.directive('dialogDrag', {
  bind (el, binding, vnode, oldVnode) {
    // const dialogHeaderEl = el.querySelector('.el-dialog__header')
    // const dragDom = el.querySelector('.el-dialog')
    // dialogHeaderEl.style.cursor = 'move'
    // dialogHeaderEl.classList.add("el-tag--dark")

    // // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    // const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)
    // dialogHeaderEl.onmousedown = (e) => {
    // // 鼠标按下，计算当前元素距离可视区的距离
    //   const disX = e.clientX - dialogHeaderEl.offsetLeft
    //   const disY = e.clientY - dialogHeaderEl.offsetTop

    //   // 获取到的值带px 正则匹配替换
    //   let styL, styT

    //   // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
    //   if (sty.left.includes('%')) {
    //     styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
    //     styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
    //   } else {
    //     styL = +sty.left.replace(/\px/g, '')
    //     styT = +sty.top.replace(/\px/g, '')
    //   };

    //   document.onmousemove = function (e) {
    //     // 通过事件委托，计算移动的距离
    //     const l = e.clientX - disX
    //     const t = e.clientY - disY

    //     // 移动当前元素
    //     dragDom.style.left = `${l + styL}px`
    //     dragDom.style.top = `${t + styT}px`

    //     // 将此时的位置传出去
    //     // binding.value({x:e.pageX,y:e.pageY})
    //   }
      
    //   document.onmouseup = function (e) {
    //     document.onmousemove = null
    //     document.onmouseup = null
    //   }
    // }
    //弹框可拉伸最小宽高
    let minWidth = 400;
    let minHeight = 300;
    //初始非全屏
    let isFullScreen = false;
    //当前宽高
    let nowWidth = 0;
    let nowHight = 0;
    //当前顶部高度
    let nowMarginTop = 0;
    //获取弹框头部（这部分可双击全屏）
    const dialogHeaderEl = el.querySelector('.el-dialog__header');
    let hasSetBodyHight = false;
    //弹窗
    const dragDom = el.querySelector('.el-dialog');
    dialogHeaderEl.style.cursor = 'move'
    dialogHeaderEl.classList.add("el-tag--dark")
    //给弹窗加上overflow auto；不然缩小时框内的标签可能超出dialog；
    dragDom.style.overflow = "auto";
    //清除选择头部文字效果
    dialogHeaderEl.onselectstart = new Function("return false");
    //头部加上可拖动cursor
    dialogHeaderEl.style.cursor = 'move';
    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
    //头部插入最大化最小化元素
    let maxMin = document.createElement("button");
    maxMin.className +=' el-dialog__headerbtn el-dialog__minmax';
    maxMin.style.right = '40px';
    maxMin.style.color = '#ffffff';
    maxMin.title='最大化';
    maxMin.innerHTML = '<i class="el-icon-full-screen" onMouseOver="this.style.color=\'#ffffff\'" onMouseOut="this.style.color=\'inherit\'"></i>';
    dialogHeaderEl.insertBefore(maxMin,dialogHeaderEl.childNodes[1]);
    let moveDown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;
      // 获取到的值带px 正则匹配替换
      let styL, styT;
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
      } else {
        styL = +sty.left.replace(/\px/g, '');
        styT = +sty.top.replace(/\px/g, '');
      };
      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX;
        const t = e.clientY - disY;
        // 移动当前元素
        dragDom.style.left = `${l + styL}px`;
        dragDom.style.top = `${t + styT}px`;
        //将此时的位置传出去
        //binding.value({x:e.pageX,y:e.pageY})
      };
      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
    dialogHeaderEl.onmousedown = moveDown;
    let bodyHeight = 'auto';
    function setMaxMin(){
      if (isFullScreen == false) {
        let i = maxMin.querySelector('.el-icon-full-screen');
        i.classList.remove('el-icon-full-screen');
        i.classList.add('el-icon-crop');
        maxMin.title = '还原';
        bodyHeight = dragDom.querySelector('.el-dialog__body').offsetHeight+'px';
        nowHight = dragDom.clientHeight;
        nowWidth = dragDom.clientWidth;
        nowMarginTop = dragDom.style.marginTop;
        dragDom.style.left = 0;
        dragDom.style.top = 0;
        dragDom.style.height = "100VH";
        dragDom.style.width = "100VW";
        dragDom.style.marginTop = 0;
        isFullScreen = true;
        dialogHeaderEl.style.cursor = 'initial';
        dialogHeaderEl.onmousedown = null;
        if(!hasSetBodyHight) {
          // dragDom.querySelector('.el-dialog__body').style.height = 'calc(100% - '+dialogHeaderEl.offsetHeight+'px)';
          // dragDom.querySelector('.el-dialog__body').style.height = '86%';
          hasSetBodyHight = true;
        }
      } else {
        let i = maxMin.querySelector('.el-icon-crop');
        i.classList.remove('el-icon-crop');
        i.classList.add('el-icon-full-screen');
        maxMin.innerHTML = '<i class="el-icon-full-screen"></i>';
        maxMin.title = '最大化';
        dragDom.style.height = "auto";
        dragDom.style.width = nowWidth + 'px';
        dragDom.style.marginTop = nowMarginTop;
        isFullScreen = false;
        dialogHeaderEl.style.cursor = 'move';
        dialogHeaderEl.onmousedown = moveDown;
        // dragDom.querySelector('.el-dialog__body').style.height = bodyHeight;
        hasSetBodyHight = false;
      }
    }
    //点击放大缩小效果
    maxMin.onclick = setMaxMin;
    //双击头部效果
    dialogHeaderEl.ondblclick = setMaxMin;
    //拉伸
    let resizeEl=document.createElement("div");
    dragDom.appendChild(resizeEl);
    //在弹窗右下角加上一个10-10px的控制块
    resizeEl.style.cursor = 'se-resize';
    resizeEl.style.position = 'absolute';
    resizeEl.style.height = '10px';
    resizeEl.style.width = '10px';
    resizeEl.style.right = '0px';
    resizeEl.style.bottom = '0px';
    //鼠标拉伸弹窗
    resizeEl.onmousedown = (e) => {
      // 记录初始x位置
      const clientX = e.clientX;
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - resizeEl.offsetLeft;
      const disY = e.clientY - resizeEl.offsetTop;
      document.onmousemove = function (e) {
        e.preventDefault(); // 移动时禁用默认事件
        // 通过事件委托，计算移动的距离
        const x = e.clientX - disX + (e.clientX - clientX);//这里 由于elementUI的dialog控制居中的，所以水平拉伸效果是双倍
        const y = e.clientY - disY;
        //比较是否小于最小宽高
        dragDom.style.width = x > minWidth ? `${x}px` : minWidth + 'px';
        dragDom.style.height = y > minHeight ? `${y}px` : minHeight + 'px';
        if(!hasSetBodyHight) {
          // dragDom.querySelector('.el-dialog__body').style.height = 'calc(100% - '+dialogHeaderEl.offsetHeight+'px)';
          hasSetBodyHight = true;
        }
      };
      //拉伸结束
      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
})
// v-dialogDragWidth: 弹窗宽度拖大 拖小
Vue.directive('dialogDragWidth', {
  bind (el, binding, vnode, oldVnode) {
    const dragDom = binding.value.$el.querySelector('.el-dialog')
    el.style.cursor = 'ew-resize'
    el.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      // const disX = e.clientX - el.offsetLeft
      const currentwidth = el.offsetWidth
      const disX = e.clientX
      // console.log('e.clientX:'+e.clientX+ 'el.offsetLeft:'+ el.offsetLeft+ 'currentwidth:' +currentwidth)
      document.onmousemove = function (e) {
        e.preventDefault() // 移动时禁用默认事件

        // 通过事件委托，计算移动的距离
        const l = currentwidth + e.clientX - disX
        // console.log('e.clientX:'+e.clientX+ 'disX:'+ disX + 'l:' + l)
        dragDom.style.width = `${l}px`
      }

      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})
// el-select搜索
Vue.directive(
  'el-select-loadmore', {
    bind(el, binding) {
      // 获取element-ui定义好的scroll盒子
      const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
      SELECTWRAP_DOM.addEventListener('scroll', function () {
        /**
        * scrollHeight 获取元素内容高度(只读)
        * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
        * clientHeight 读取元素的可见高度(只读)
        * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
        * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
        */
        const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
        if (condition) binding.value()
      });
    }
  }
)

/* 全局TableHeight */
Vue.prototype.$baseTableHeight = (formType) => {
  // let height = window.innerHeight
  // let paddingHeight = 300
  // const formHeight = 50

  // if ('number' == typeof formType) {
  //   height = height - paddingHeight - formHeight * formType
  // } else {
  //   height = height - paddingHeight
  // }
  // if (height < 600) {
  //   height = 600
  // }
  return ''
}
