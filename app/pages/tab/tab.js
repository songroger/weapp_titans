const api = require('../../lib/api.js');
const util = require('../../lib/util.js');
Page({
  data: {
    text: ""
  },
  onShow: function(options) {
    // Do something when page show.
    },
  onLoad: function() {
        // Do some initialize when page load.
        var that = this
        util.loadPieceData(function(data){
              // console.log(data);
              that.setData({
                title: data.work + " - " + data.author,
                text: data.quote
              })
        }); 
  },
  onPullDownRefresh: function() {
      // Do something when pull down
      var that = this
      util.loadPieceData(function(data){
              // console.log(data);
              that.setData({
                title: data.work + " - " + data.author,
                text: data.quote
              })
      });
      wx.stopPullDownRefresh()
  },
})