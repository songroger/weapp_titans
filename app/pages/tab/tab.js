const api = require('../../lib/api.js');
var inittitle = "沁园春·雪"
var initData = '北国风光，千里冰封，万里雪飘。望长城内外，惟余莽莽；大河上下，顿失滔滔。山舞银蛇，原驰蜡象，欲与天公试比高。须晴日，看红装素裹，分外妖娆。\n\n江山如此多娇，引无数英雄竞折腰。惜秦皇汉武，略输文采；唐宗宋祖，稍逊风骚。一代天骄，成吉思汗，只识弯弓射大雕。俱往矣，数风流人物，还看今朝。'
var extraLine = [];
Page({
  data: {
    text: initData
  },
  onLoad: function(options) {
    // Do some initialize when page load.
    },
  add: function(e) {
    extraLine.push('other line')
    this.setData({
      text: initData + '\n' + extraLine.join('\n')
    })
  },
  remove: function(e) {
    if (extraLine.length > 0) {
      extraLine.pop()
      this.setData({
        text: initData + '\n' + extraLine.join('\n')
      })
    }
  },
  onShow: function() {
        // Do something when page show.
        var that = this
        wx.request({
            url: api.getUrl('/random_line'),
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                // console.log(res.data)
                that.setData({
                    title: res.data.work + " - " + res.data.author,
                    text: res.data.quote
                })
            },
            fail: function(res) {
                that.setData({
                    title: inittitle,
                    text: initData
                })
            }
        })
    },
})