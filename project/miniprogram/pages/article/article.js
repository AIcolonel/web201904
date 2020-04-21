// pages/article/article.js
var { articles } = require('../../data/db.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*
    text:'text...',
    */
    /*
    articles:[
      {
        avatar:'/images/avatar/u1.jpg',
        date:'2020-04-15',
        title:'我是文章标题1',
        img:'/images/article/a1.jpg',
        desc:'我是描述111',
        star:'20',
        view:'33'
      },
      {
        avatar: '/images/avatar/u2.jpg',
        date: '2020-04-15',
        title: '我是文章标题2',
        img: '/images/article/a2.jpg',
        desc: '我是描述222',
        star: '20',
        view: '33'
      }
    ]
    */
    articles:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log('article onLoad')
    /*
    var articles = [
      {
        avatar: '/images/avatar/u1.jpg',
        date: '2020-04-15',
        title: '我是文章标题1',
        img: '/images/article/a1.jpg',
        desc: '我是描述111',
        star: '20',
        view: '33'
      },
      {
        avatar: '/images/avatar/u2.jpg',
        date: '2020-04-15',
        title: '我是文章标题2',
        img: '/images/article/a2.jpg',
        desc: '我是描述222',
        star: '20',
        view: '33'
      }
    ]
    */
    // console.log(this.data.articles)
    // this.data.articles = articles
    // this.setData({articles:articles},function(){
    //   console.log('2:::',this.data.articles)
    // })
    // console.log('1:::',this.data.articles)
    this.setData({ articles: articles })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //console.log('article onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //console.log('article onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //console.log('article onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    //console.log('article onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //console.log('article onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //console.log('article onReachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    //console.log('article onShareAppMessage')
  },

  /**
   * 点击文章绑定事件
   */
  tapArticleDetail:function(ev){
    var articleId = ev.currentTarget.dataset.articleId
    // console.log(articleId)
    wx.navigateTo({
      url: '/pages/article/article-detail/article-detail?articleId='+articleId,
    })
  }
})