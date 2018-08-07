// pages/search/search.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultList: []
  },
  // 点击取消，返回home页
  backToHome: function() {
    wx.navigateBack({
      // url:'../home/home'
      delta:1
    })
  },
  // 绑定input事件
  searchMovie: function(e) {
    var value = e.detail.value;// 获取输入的值
    var url = app.globalData.doubanBase + app.globalData.searchURL + value;
    wx.request({
      url,
      method: 'GET',
      header: {'content-type': 'json'},
      success: (res) => {
        // title, images, year, directors, average 
        console.log(res)
        this.arrangeData(res.data.subjects)
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },

  // 处理获取的数据
  arrangeData: function(lists) {
    var resultList = [];
    lists.forEach(item => { // 遍历获取的数组
      var directors = item.directors.map(i => i.name).join('/');// 有多名导演时，通过'/'拼接
      var description = item.rating.average + '分/' + item.year + '/' + directors; // 电影描述
      resultList.push({
        title: item.title,
        image: item.images.small,
        description,
        id: item.id
      })
    })
    this.setData({resultList})
  },

  // 跳转至详情页
  bindToDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.redirectTo({
      url: '../movie-detail/movie-detail?id=' + id,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  }
})