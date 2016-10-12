const api = require('../../lib/api.js');
const util = require('../../lib/util.js');
var inittitle = "沁园春·雪"
var initData = '北国风光，千里冰封，万里雪飘。望长城内外，惟余莽莽；大河上下，顿失滔滔。山舞银蛇，原驰蜡象，欲与天公试比高。须晴日，看红装素裹，分外妖娆。\n\n江山如此多娇，引无数英雄竞折腰。惜秦皇汉武，略输文采；唐宗宋祖，稍逊风骚。一代天骄，成吉思汗，只识弯弓射大雕。俱往矣，数风流人物，还看今朝。'
var extraLine = [];
// var reg=new RegExp("/<p>(.*?)<\/p>/g","gmi");
Page({
    //content data
    data: {
        text: "",
        title:"",
        author:""
    },
    onShow: function(options) {
        // Do something when page show.
    },
    onLoad: function() {
        // Do some initialize when page load.
        var that = this
        var appInstance = getApp()
        var rdn = Math.ceil(Math.random()*4)
        this.setData({
            top_style: "background-image: url(../../images/bg" +rdn+".jpg);"
        })
        util.loadBunchData(function(data){
              // console.log(data);
              that.setData({
                title: data.title,
                text: data.content.replace(/<p>(.*?)<\/p>/g,"$1"),
                author: "\n"+ data.author + "("+ data.dynasty + ")",
                intro: "赏析："+ (data.intro.replace(/<p>(.*?)<\/p>/g,"$1") ||"暂无，先看看其他内容吧~")
              }),
              wx.setStorageSync('poem_text', data.content.replace(/<p>(.*?)<\/p>/g,"$1")),
              wx.setStorageSync('poem_title', data.title)
        }); 
    },
    // go to detail page
    gotoTab() {
        wx.navigateTo({ url: '../detail/detail' });
    },
    onPullDownRefresh: function() {
        // Do something when pull down
        var that = this
        var rdn = Math.ceil(Math.random()*4)
        this.setData({
            top_style: "background-image: url(../../images/bg" +rdn+".jpg);"
        })
        util.loadBunchData(function(data){
              // console.log(data);
              that.setData({
                title: data.title,
                text: data.content.replace(/<p>(.*?)<\/p>/g,"$1"),
                author: "\n"+ data.author + "("+ data.dynasty + ")",
                intro: "赏析："+ (data.intro.replace(/<p>(.*?)<\/p>/g,"$1") ||"暂无，先看看其他内容吧~")
              }),
              wx.setStorageSync('poem_text', data.content.replace(/<p>(.*?)<\/p>/g,"$1")),
              wx.setStorageSync('poem_title', data.title)
        }); 
        wx.stopPullDownRefresh()
    },
});
