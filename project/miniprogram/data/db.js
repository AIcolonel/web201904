var articles = [
  {
    articleId:'0',
    author:'Tom',
    avatar: '/images/avatar/u1.jpg',
    date: '2020-04-15',
    title: '我是文章标题1',
    time:'2天前',
    img: '/images/article/a1.jpg',
    desc: '我是描述111',
    star: '20',
    view: '33',
    content:'我是文章1的内容',
    music:{
      src: 'http://music.163.com/song/media/outer/url?id=20036073.mp3',
      title: 'Crazy Kids',
      coverImgUrl:'http://qukufile2.qianqian.com/data2/pic/df22257154ffdbb5ac4ef38be2721dac/31636233/31636233.jpg@s_1,w_224,h_224'
    }
  },
  {
    articleId:'1',
    author:'Leo',
    avatar: '/images/avatar/u2.jpg',
    date: '2020-04-15',
    title: '我是文章标题2',
    time:'3天前',
    img: '/images/article/a2.jpg',
    desc: '我是描述222',
    star: '20',
    view: '33',
    content:'我是文章2的内容',
    music: {
      src: 'http://music.163.com/song/media/outer/url?id=27969800.mp3',
      title: 'Soldier',
      coverImgUrl: 'http://qukufile2.qianqian.com/data2/pic/f0fe385b7867d27c7ad0d48e49f5da95/583869978/583869978.jpg@s_1,w_224,h_224'
    }
  }
]

module.exports = {
  articles:articles
}

/**
豆瓣api
  
正在热映
http://t.yushu.im/v2/movie/in_theaters?start=0&count=3

即将上映
http://t.yushu.im/v2/movie/coming_soon?start=0&count=3

豆瓣Top250
http://t.yushu.im/v2/movie/top250?start=0&count=3
 */