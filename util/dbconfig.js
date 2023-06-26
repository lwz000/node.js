const mysql = require('mysql')
 
module.exports = {
    // 数据库配置
    config:{
        port:'3328',
        user:'root',          //用户名
        password:'123456',	//密码
        host:'127.0.0.1',		//主机（默认都是local host）
        database:'test'       //数据库名
    },
    // 连接数据库,选用mysql连接池的方式
    // 连接池对象
    sqlConnect:function(sql,sqlArr,callBack){
        var pool = mysql.createPool(this.config)
        pool.getConnection((err,conn)=>{
            if(err){
                console.log('连接失败')
                return
            }
            // 事件驱动回调
            conn.query(sql,sqlArr,callBack)
            // 释放连接
            conn.release()
        })
    }
}