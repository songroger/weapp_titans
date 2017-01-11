const api = require('../../lib/api.js');
const util = require('../../lib/util.js');
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
        String.prototype.format= function(){
           var args = arguments;
           return this.replace(/\{(\d+)\}/g,function(s,i){
             return args[i];
           });}
        var that = this
        var appInstance = getApp()
        var rdn = Math.ceil(Math.random()*4)
        var preUrl = api.getUrl("/static/img/bg")
        var bgPic = "{0}{1}{2}".format(preUrl,rdn,".jpg")
        this.setData({
            top_style: "background-image: url({0});".format(bgPic)
        })
        util.loadBunchData(function(data){
              // console.log(data);
              that.setData({
                title: data.title,
                text: data.content.replace(/<p>(.*?)<\/p>/g,"$1"),
                author: "\n"+ data.author + "("+ data.dynasty + ")",
                intro: "赏析："+ (data.intro ||"暂无，先看看其他内容吧~")
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
        var preUrl = api.getUrl("/static/img/bg")
        var bgPic = "{0}{1}{2}".format(preUrl,rdn,".jpg")
        this.setData({
            top_style: "background-image: url({0});".format(bgPic)
        })
        util.loadBunchData(function(data){
              // console.log(data);
              that.setData({
                title: data.title,
                text: data.content.replace(/<p>(.*?)<\/p>/g,"$1"),
                author: "\n"+ data.author + "("+ data.dynasty + ")",
                intro: "赏析："+ (data.intro ||"暂无，先看看其他内容吧~")
              }),
              wx.setStorageSync('poem_text', data.content.replace(/<p>(.*?)<\/p>/g,"$1")),
              wx.setStorageSync('poem_title', data.title)
        }); 
        wx.stopPullDownRefresh()
    },
});
