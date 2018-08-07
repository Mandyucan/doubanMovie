// pages/movie-more/movie-more.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showInTheater: true,
    showComingSoon: false,
    intheater: {
      // offset,total,movies
    },
    comingsoon: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options) // 获取typeId
    var typeId = options.typeId;
    if (typeId == 'intheater') {
      this.setData({ showInTheater: true, showComingSoon: false })
    } else {
      this.setData({ showInTheater: false, showComingSoon: true })
    }
    this.getMovieList(typeId)
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
  // 获取电影清单
  getMovieList: function (typeId) {
    let url;
    if (typeId == 'intheater') {
      url = app.globalData.doubanBase + app.globalData.inTheaters
    } else {
      url = app.globalData.doubanBase + app.globalData.comingSoon
    }

    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })

    // 数据加载个数
    var offset = this.data[typeId].offset || 0;
    var total = this.data[typeId].total || 999;
    if (offset >= total) {
      return
    }
    
    wx.request({
      url,
      type: 'GET',
      header: { 'content-type': 'json' },
      data: {
        start: offset,
        count: 5
      },
      success: res => {
        // console.log(res)
        var subjects = res.data.subjects;
        var movies = this.data[typeId].movies || []; //性能。将获取的电影存下来，避免每次重新获取
        var total = res.data.total;
        var offset = this.data[typeId].offset || 0;
        offset += subjects.length;
        // 渲染电影信息
        subjects.forEach(item => {
          let allCasts = item.casts.map(i => i.name).join('/');
          let allDirs = item.directors.map(i => i.name).join('/');
          let allGenres = item.genres.join('/');
          let movie = {
            ...item,
            allCasts,
            allDirs,
            allGenres,
            typeId
          }
          movies.push(movie)
        })
        this.setData({ [typeId]: { offset, total, movies } })  // es6语法，通过变量名，转化成intheater、comingsoon
      },
      fail: err => console.log(err),
      complete() {
        wx.hideToast()
      }
    })
  },
  selectTab: function (e) {
    // console.log(e)
    var tabId = e.target.dataset.tabId;
    if (tabId == 'intheater') {
      this.setData({ showInTheater: true, showComingSoon: false })
    } else {
      this.setData({ showInTheater: false, showComingSoon: true })
    }
    // 如果没有tabId，需做如下处理；如果有tabId，说明movies已经获取了，不用处理。可避免重复加载。
    if (!this.data[tabId].movies) {
      this.getMovieList(tabId)
    }
  },

  // 下拉加载更多
  loadMore: function () {
    console.log('loadMore')
    var typeId;
    if (this.data.showInTheater) {
      typeId = 'intheater';
    } else {
      typeId = 'comingsoon'
    }
    console.log(typeId)
    this.getMovieList(typeId)
  },

  // 购票
  handleTicket: function(){
    wx.showModal({
      title: '提示',
      content: '用户点击购票',
      success(res) {
        console.log(res)
      },
      fail(err) {
        console.log(err)
      }
    })
  },

  // 想看
  handleWish: function () {
    wx.showModal({
      title: '提示',
      content: '那就去看吧',
    })
  },

  // 跳转至详情页
  bindToDetail: function(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + id,
    })
  }
})