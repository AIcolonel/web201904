/*
* @Author: Chen
* @Date:   2019-10-31 10:02:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-31 10:04:06
*/
class Controller {
	index(req,res,...args){
		res.setHeader('Content-type','text/html;charset=UTF-8')
		res.end('<a href="/Item/index">go TodoList</a>')
	}
}

module.exports = new Controller()