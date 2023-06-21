var dbConfig = require('../util/dbconfig')

// 获取用户
getUser = (req, res) => {
    let sql1 = 'select * from testtable'
    let sqlArr = []
    let callBack = (err, data) => {
        if (err) {
            console.log('连接失败')
        }
        else {
            res.send({
                'code': 200,
                'list': data
            })
        }
    }
    dbConfig.sqlConnect(sql1, sqlArr, callBack)
}
module.exports = {
    getUser,
}