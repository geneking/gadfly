require('module/common/common.js');

//page1测试
$("#pageContent").append('<h1>这是business1业务的childPage1页面</h1>');

//page1 mock接口测试
$.get('/mock/r/page1/data', function(json) {
    console.log(json);
});
