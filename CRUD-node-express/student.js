 /*
student.js 数据操作文件模块
操作文件中数据，只处理数据，不关心业务
 */
var fs = require('fs');

var dbpath = './db.json';
 /*
 获取所有学生列表
 */
exports.find = function(callback){
    //第一个参数始终是err，成功是null，错误是错误对象
    //第二个参数是结果，成功是数组，错误是undefined
    fs.readFile(dbpath,'utf8',function(err,data){
        if(err){
            return callback(err);
        }
        callback(null,JSON.parse(data).students);
    });
}
/**
 * 根据id获取学生对象
 */
exports.findById = function(id,callback){
    fs.readFile(dbpath,'utf8',function(err,data){
        if(err){
            return callback(err);
        }
        var students = JSON.parse(data).students;
        var ret = students.find(function(item){
            return item.id === parseInt(id);
        });
        callback(null,ret);
    });
}

 /*
 添加保存学生
 */
exports.save = function(student,callback){
    fs.readFile(dbpath,'utf8',function(err,data){
        if(err){
            return callback(err);
        }
        var students = JSON.parse(data).students;

        student.id=students[students.length-1].id+1;

        students.push(student);
        var fileData = JSON.stringify({
            students:students
        })
        fs.writeFile(dbpath,fileData,function(err){
            //错误就把错误对象传给它
            if(err){
                return callback(err);
            }
            //成功就是没有错，错误对象是null
            callback(null);
        })
    })

    
    
}
 /*
 更新学生
 */
exports.updateById = function(student,callback){
    fs.readFile(dbpath,'utf8',function(err,data){
        if(err){
            return callback(err);
        }
        var students = JSON.parse(data).students;

        //保存的id必须统一为数字
        student.id=parseInt(student.id);

        var stu=students.find(function(item){
            return item.id===student.id;
        })

        for(var key in student){
            stu[key]=student[key];
        }

        var fileData = JSON.stringify({
            students:students
        })
        fs.writeFile(dbpath,fileData,function(err){
            //错误就把错误对象传给它
            if(err){
                return callback(err);
            }
            //成功就是没有错，错误对象是null
            callback(null);
        })

    })
}
 /*
 删除学生
 */
exports.deleteById = function(id,callback){
    fs.readFile(dbpath,'utf8',function(err,data){
        if(err){
            return callback(err);
        }
        var students = JSON.parse(data).students;
        //findindex专门根据条件查找元素下标
        var deleteId = students.findIndex(function(item){
            return item.id===parseInt(id);
        })
        //根据下标从数组中删除对应下标
        students.splice(deleteId,1);
        //对象转换成字符串
        var fileData = JSON.stringify({
            students:students
        })
        fs.writeFile(dbpath,fileData,function(err){
            //错误就把错误对象传给它
            if(err){
                return callback(err);
            }
            //成功就是没有错，错误对象是null
            callback(null);
        })

    })
}
