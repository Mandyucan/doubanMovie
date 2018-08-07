// pages/home/home.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: [],
    comingSoon: []
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersURL = app.globalData.doubanBase + app.globalData.inTheaters + '?start=0&&count=10'  // 获得的是数据可限制， 这里指从0开始，获取10条数据
    var comingSoonURL = app.globalData.doubanBase + app.globalData.comingSoon + '?start=0&&count=10'
    // 获取/正在热映、即将热映
    this.getMovieListData(inTheatersURL, 'inTheaters')
    this.getMovieListData(comingSoonURL, 'comingSoon')
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

  // 点击搜素框，跳转至搜索页面
  bindToSearch: function () {
    wx.navigateTo({ // 暴露当前页面，跳转至另一页面
      url: '../search/search',
    })
  },

  // 获取正在热映
  getMovieListData: function (url, _type) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    wx.request({
      url,
      type: 'GET',
      header: { 'content-type': 'json' },
      success: res => this.setData({ [_type]: res.data.subjects }),
      fail: err => console.log(err),
      complete() {
        wx.hideToast()
      }
    })
  },
  // 跳转至更多
  bindToMore: function(e) {
    console.log(e)
    var typeId = e.target.dataset.typeId;
    console.log(typeId)
    wx.navigateTo({
      url: '../movie-more/movie-more?typeId=' + typeId, // 用typeId判断点击更多后跳转至哪个页面
    })
  },
  // 跳转至详情页
  bindToDetail: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + id,
    })
  }
})