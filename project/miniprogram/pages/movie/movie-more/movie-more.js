var { getMovieList } = require('../../../utils/util.js')
var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestUrl:'',
    totalCount:0,
    totalData:[],
    isEnd:false
  },
  /**
   * 处理获取电影列表数据
   */
  handleMovieList:function(data){
    if(data.length == 0){//数据加载完毕
      // 没有数据后隐藏loading
      wx.hideNavigationBarLoading()
      //数据加载完毕则不再发送请求
      this.data.isEnd = true
      wx.showToast({
        title: '到底啦....',
      })
      return
    }
    // 改变加载数据的起始
    this.data.totalCount = this.data.totalCount + data.length;
    // 数组进行合并显示
    this.data.totalData = this.data.totalData.concat(data)
    
    this.setData({ movies: this.data.totalData }, function () {
      // 成功获取数据后隐藏loading
      wx.hideNavigationBarLoading()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.type)
    var _this = this;
    var baseUrl = app.GLOBAL_DATA.baseUrl;
    var type = options.type
    var requestUrl = ''
    var navigationBarTitleText = ''
    if (type == 'inTheaters'){
      requestUrl = baseUrl +'in_theaters'
      navigationBarTitleText = '正在热映'
    } else if (type == 'comingSoon'){
      requestUrl = baseUrl + 'coming_soon'
      navigationBarTitleText = '即将上映'
    } else if (type == 'top250'){
      requestUrl = baseUrl + 'top250'
      navigationBarTitleText = '豆瓣Top250'
    }
    // console.log(requestUrl)
    // 保存请求数据地址
    this.setData({ requestUrl: requestUrl})
    // 设置更多页面标题
    wx.setNavigationBarTitle({
      title: navigationBarTitleText
    })
    // 设置加载loading动画
    wx.showNavigationBarLoading()
    /*
    getMovieList(requestUrl, function (data) {
      _this.setData({movies: data },function(){
        // 成功获取数据后隐藏loading
        wx.hideNavigationBarLoading()
      })
    })
    */
    getMovieList(requestUrl,this.handleMovieList)
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
   * 下拉刷新页面数据
   */
  onPullDownRefresh: function () {
    var _this = this;
    if(this.data.isEnd){
      wx.showToast({
        title: '到底啦....',
      })
      return ;
    }
    // 设置加载loading动画
    wx.showNavigationBarLoading()
    /*
    getMovieList(this.data.requestUrl, function (data) {
      _this.setData({ movies: data }, function () {
        // 成功获取数据后隐藏loading
        wx.hideNavigationBarLoading()
      })
    })
    */
    getMovieList(this.data.requestUrl, this.handleMovieList)
  },

  /**
   * 页面上拉触底事件的处理函数
   * 加载更多
   */
  onReachBottom: function () {
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount+"&count=20"
    // 设置加载loading动画
    wx.showNavigationBarLoading()
    getMovieList(nextUrl, this.handleMovieList)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})