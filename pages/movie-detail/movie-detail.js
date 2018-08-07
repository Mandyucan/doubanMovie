// pages/movie-detail/movie-detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: [],
    showAllDesc: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数 id
    console.log(options)
    var id = options.id;
    var url = app.globalData.doubanBase + app.globalData.subject + id;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: (res) => {
        console.log(res)
        this.dealData(res.data)
      },
      fail: (err) => {
        console.log(err)
      },
      complete() {
        wx.hideToast()
      }
    })
  },
  // 组装详情数据
  dealData: function (lists) {
    var resultList = {};
    // 渲染导演、演员
    var directorsAndCasts = [];
    for (let i in lists.directors[i]) {
      directorsAndCasts.push(lists.directors[i]);
    }
    for (let j in lists.casts) {
      directorsAndCasts.push(lists.casts[j]);
    }
    // 题材
    var genres = "";
    var separate = "/";
    for (let k in lists.genres) {
      genres += lists.genres[k] + separate;
    }
    genres = genres.substring(0, genres.length - separate.length);
    console.log(genres)
    var countries = "国家：";
    for (let g in lists.countries) {
      countries += lists.countries[g] + separate;
    }
    countries = countries.substring(0, countries.length - separate.length);
    resultList["movie"] = { // 给resultList设置movie属性
      id: lists.id,
      title: lists.title,
      images: lists.images,
      directorsAndCasts: directorsAndCasts,
      collectCount: lists.collect_count,
      commentsCount: lists.comments_count,
      wishCount: lists.wish_count,
      reviewsCount: lists.reviews_count,
      countries: countries,
      doCount: lists.do_count,
      genres: genres,
      originalTitle: "原名：" + lists.original_title,
      rating: lists.rating,
      ratingsCount: lists.ratings_count + "人",
      subtype: lists.subtype,
      summary: lists.summary,
      shareUrl: lists.share_url,
      year: lists.year,
    };
    this.setData(resultList);
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

  // 展开简介
  handleExtensiontap: function (e) {
    console.log(e)
    var resultList = {
      "showAllDesc": true
    };
    this.setData(resultList);
  },
  // 用户点击想看
  handleWishtap: function (e) {
    wx.showModal({
      title: '提示',
      content: '一起去看吧',
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      },
      showCancel: false
    })
  },
  // 用户点击看过
  handleDotap: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/movie-detail/rating/rating?id=' + id
    })
  }
})