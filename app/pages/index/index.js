const api = require('../../lib/api.js');
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
    onLoad: function(options) {
        // Do some initialize when page load.
    },
    onShow: function() {
        // Do something when page show.
        var that = this
        var appInstance = getApp()
        wx.request({
            url: api.getUrl('/random_poem'),
            data: {
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                // console.log(res.data)
                that.setData({
                    title: res.data.title,
                    text: res.data.content.replace(/<p>(.*?)<\/p>/g,"$1"),
                    author: "\n"+ res.data.author + "("+ res.data.dynasty + ")",
                    intro: "赏析："+ (res.data.intro.replace(/<p>(.*?)<\/p>/g,"$1") ||"暂无，先看看其他内容吧~")
                }),
                wx.setStorageSync('poem_text', res.data.content.replace(/<p>(.*?)<\/p>/g,"$1")),
                wx.setStorageSync('poem_title', res.data.title)
            },
            fail: function(res) {
                that.setData({
                    title: inittitle,
                    text: initData
                })
            }
        })
    },
    // go to detail page
    gotoTab() {
        wx.navigateTo({ url: '../detail/detail' });
    },
    onPullDownRefresh: function() {
        // Do something when pull down
    },
});
