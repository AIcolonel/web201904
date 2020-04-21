var { articles } = require('../../../data/db.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlaying:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var articleId = options.articleId
    var article =articles[articleId]
    // 处理收藏
    var isCollected = true;
    // 获取收藏状态
    var articles_collections = wx.getStorageSync('articles_collections')
    if (articles_collections){
      // 有收藏状态则将当前的文章收藏状态进行赋值
      isCollected = !!articles_collections[articleId] 
    }
    //没有收藏状态,进行初始化
    else{
      /**
       * {
       *  '0':false,
       *  '1':true
       * }
       */
      var data = {}
      data[articleId] = false
      wx.setStorageSync('articles_collections', data)
    }

    //处理音乐
    var backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.onPlay(function(){
      this.setData({isPlaying:true})
    }.bind(this))
    backgroundAudioManager.onPause(function () {
      this.setData({ isPlaying: false })
    }.bind(this))


    this.setData({...article,isCollected:isCollected})
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
   * 处理点击收藏
   */
  tapCollection:function(){
    //wx.setStorageSync('key1',{name:'Tom'})
    // var data = wx.getStorageSync('key1')
    // console.log(data)
    // 获取收藏状态
    var articles_collections = wx.getStorageSync('articles_collections')
    // 获取当前文章的收藏状态
    var currentCollected = articles_collections[this.data.articleId]
    // console.log(currentCollected)
    // 改变文章收藏状态
    articles_collections[this.data.articleId] = !currentCollected
    // 重新设置storage收藏状态
    wx.setStorageSync('articles_collections', articles_collections)
    // 重新设置当前收藏状态数据
    this.setData({ isCollected: !currentCollected },function(){
      // 成功提示信息
      wx.showToast({
        title: currentCollected ? '取消收藏' : '收藏成功',
        duration: 2000
      })
    })
    
  },

  /**
   * 点击分享功能
   */
  tapShare:function(){
    var itemList = ['分享到QQ', '分享到朋友圈', '分享到微博']
    wx.showActionSheet({
      itemList: itemList,
      success(res) {
        // 成功提示信息
        wx.showToast({
          title: itemList[res.tapIndex]+'成功',
          duration: 2000
        })
      }
    })
  },
  /**
   * 播放音乐
   */
  tapMusic:function(){
    var backgroundAudioManager = wx.getBackgroundAudioManager()
    if(this.data.isPlaying){//暂停音乐
      backgroundAudioManager.pause()
      // this.setData({ isPlaying: false })
    }else{//播放音乐
      /*
      backgroundAudioManager.src = 'http://music.163.com/song/media/outer/url?id=20036073.mp3';
      backgroundAudioManager.title = 'Crazy Kids';
      */
      backgroundAudioManager.src = this.data.music.src;
      backgroundAudioManager.title = this.data.music.title;
      backgroundAudioManager.coverImgUrl = this.data.music.coverImgUrl;
      // 播放音乐后改变播放状态
      // this.setData({isPlaying:true})
    }
  }
})