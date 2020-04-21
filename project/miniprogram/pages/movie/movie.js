var { getMovieList } = require('../../utils/util.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app)
    var _this = this;
    var baseUrl = app.GLOBAL_DATA.baseUrl;
    var inTheatersUrl = baseUrl+'in_theaters?start=0&count=3';
    var comingSoonUrl = baseUrl +'coming_soon?start=0&count=3';
    var top250Url = baseUrl +'top250?start=0&count=3'
    /*
    wx.request({
      url:'http://t.yushu.im/v2/movie/in_theaters?start=0&count=3',
      success:function(res){
        // console.log(res)
        var data = res.data.subjects.map(function(item){
          return {
            title: item.original_title,
            coverImage:item.images.large,
            score:item.rating.average,
            stars:item.rating.stars
          }
        })
        // console.log(data)
        _this.setData({inTheatersMovies:data})
      }
    }),
    wx.request({
      url: 'http://t.yushu.im/v2/movie/coming_soon?start=0&count=3',
      success: function (res) {
        // console.log(res)
        var data = res.data.subjects.map(function (item) {
          return {
            title: item.original_title,
            coverImage: item.images.large,
            score: item.rating.average,
            stars: item.rating.stars
          }
        })
        // console.log(data)
        _this.setData({ comingSoonMovies: data })
      }
    })
    */
    getMovieList(inTheatersUrl, function (data) {
      _this.setData({ inTheatersMovies: data })
    })
    getMovieList(comingSoonUrl, function (data) {
      _this.setData({ comingSoonMovies: data })
    })
    getMovieList(top250Url, function (data) {
      _this.setData({ top250Movies: data })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 点击加载更多页面
   */
  tapMore:function(ev){
    // console.log(ev.currentTarget.dataset)
    var type = ev.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/movie/movie-more/movie-more?type='+type,
    })
  }
})