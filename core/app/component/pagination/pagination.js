/*
* 翻页组件js
* 样式基于 kangarooui
* Author: zhoubingqing@meituan.com
* 调用：
* pc = Pagination.create({
*   $pel: $('.J-pagination'),
*   loadData: function (curpage, cb) {
*     getData();//本地取数据方法，传入curpage做参数
*     cb(pageCount);//调用回调方法，传入获取数据时获取到的总页数，渲染翻页页数模版
*   }
* });
*/

function Pagination(settings){
  //this.config={} || $.extend(settings);
  this.$pel=settings.$pel && settings.$pel.length && settings.$pel.length>0?settings.$pel:$(window);
  this.pagenum=/^\d+$/.test(settings.pagenum)?settings.pagenum:1;
  this.curpage = undefined;
  var loadData='[object Function]' == Object.prototype.toString.call(settings.loadData)?settings.loadData:function(){};
  this.loadData = function () {
    var self = this;
    loadData(self.curpage, function(pagecount){
      var $lis = self.$pre.nextAll();
      var len = $lis.size();
      for (var i = 0; i < len-1; i++) {
        $lis.eq(i).remove();
      }
      self.$pre.after(self.getPagesHtml(self.curpage, pagecount));
      self.pagenum = pagecount;

      self.refreshPageJump();
    }, self);
  }
}

Pagination.create=function(settings){
  var pc=new Pagination(settings);
  pc.init();
  return pc;
};

Pagination.prototype.render=function(){
  this.$pre=$('<li><a href="javascript:;" aria-label="Previous"><span aria-hidden="true">«</span></a></li>');
  this.$next=$('<li><a href="javascript:;" aria-label="Next"><span aria-hidden="true">»</span></a></li>');
  this.$pel.append(this.$pre).append(this.$next);
};

Pagination.prototype.getPagesHtml=function(pageIndex,pageNum){
  if (pageNum < pageIndex) {
    this.$pel.hide();
    return ;
  } else {
    this.$pel.show();
  }
  var html=[];
  var temp="";
  var startP,endP;

  startP=pageIndex-3;
  endP=pageIndex+2;
  if(startP<1){
    endP=endP+1-startP;
    startP=1;
  }
  if(endP>pageNum){
    startP=startP-(endP-pageNum);
    startP=startP<1?1:startP;
    endP=pageNum;
  }
  if(startP>1){
    html.push('<li class="page" pindex="1"><a href="javascript:;">1</a></li><li><span class="ellipsis">...</span></li>');
  }
  for(var i=startP;i<=endP;i++){
    temp='<li class="page'+((i==pageIndex)?' active':'')+'" pindex="'+i+'"><a href="javascript:;">'+i+'</a></li>';
    html.push(temp);
  }
  if(endP<pageNum){
    html.push('<li><span class="ellipsis">...</span></li><li class="page" pindex="'+pageNum+'"><a href="javascript:;">'+pageNum+'</a></li>');
  }

  return html.join('');
};

Pagination.prototype.goPage=function(p,_self){
  var num=parseInt(p);
  if(!/^\d+$/.test(p) || num<1){
    alert("请输入正确的页码！");
    return;
  }else{
    if(num==_self.curpage)
      return;
    _self.curpage=num;
    _self.loadData(_self.curpage);
  }
};

Pagination.prototype.refreshPageJump = function () {
  var num = this.curpage;
  if (num == 1) {
    this.$pre.addClass('disabled');
  }
  if (num == this.pagenum) {
    this.$next.addClass('disabled');
  }
  if (num != 1) {
    this.$pre.removeClass('disabled');
  }
  if (num != this.pagenum) {
    this.$next.removeClass('disabled');
  }
};

Pagination.prototype.init=function(){
  var _self=this;
  this.render();
  this.goPage(1, this);
  this.$pel.delegate(".page","click",function(){
    _self.goPage(parseInt($(this).attr("pindex")),_self);
  });
  this.$pre.click(function(){
    if ($(this).hasClass('disabled')) return;
    _self.goPage(_self.curpage==1?1:_self.curpage-1,_self);
  });
  this.$next.click(function(){
    if ($(this).hasClass('disabled')) return;
    _self.goPage(_self.curpage==_self.pagenum?_self.pagenum:_self.curpage+1,_self);
  });
};

Pagination.prototype.refresh=function() {
  this.curpage = undefined;
  this.goPage(1, this);
};

module.exports = Pagination;
