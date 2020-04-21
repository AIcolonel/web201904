function getMovieList(url,success){
  wx.request({
    url: url,
    success: function (res) {
      var data = formatMovieData(res.data.subjects)
      // console.log(data)
      success(data)
    }
  })
}

function formatMovieData(data){
  return data.map(function (item) {
    return {
      title: item.original_title,
      coverImage: item.images.large,
      score: item.rating.average,
      stars: coverStarsToArray(item.rating.stars)
    }
  })
}

function coverStarsToArray(stars){
  /**
   * 35
   * [1,1,1,0,0]
   * 45
   * [1,1,1,1,0]
   */
  var arr = [];
  var num = parseInt(stars.substring(0,1))
  for(var i = 1;i<=5;i++){
    if(i <= num){
      arr.push(1)
    }else{
      arr.push(0)
    }
  }
  return arr;
}

module.exports = {
  getMovieList: getMovieList
}
