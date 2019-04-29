/*
router.js 路由模块 
*/
var fs = require('fs');

var Student = require('./student');

var express = require('express');

var router = express.Router();

router.get('/students',function(req,res){
        // fs.readFile("./db.json","utf8",function(err,data){
            
        // })
        Student.find(function(err,students){
            if(err){
                return res.status(500).send('Server error');
            }
            res.render('index.html',{
                fruits:[
                    '唱歌',
                    '跳舞',
                    'rap',
                    '篮球'
                ],
                students:students
            });
        })

    });

router.get('/students/new',function(req,res){

    res.render('new.html');
        
    });
    
router.post('/students/new',function(req,res){
    //先读取数据，转成对象，在push数据，然后转为字符串写入文件   
    
    Student.save(req.body,function(err){
        if(err){
            return res.status(500).send('Server error')
        }
        res.redirect('/students');
    })
        
    });
    
/**
 * 渲染编辑学生页面
 */
router.get('/students/edit',function(req,res){
    Student.findById(parseInt(req.query.id),function(err,student){
        if(err){
            return res.status(500).send('Server error');
        }
        res.render('edit.html',{
            student:student
        });

    })
       
        
    });     
/**
 * 编辑学生信息
 */
router.post('/students/edit',function(req,res){
        Student.updateById(req.body,function(err){
            if(err){
                return res.status(500).send('Server error');
            }
            res.redirect('/students');
        })
        
    });     

router.get('/students/delete',function(req,res){
    Student.deleteById(req.query.id,function(err){
        if(err){
            return res.status(500).send('Server error');
        }
        res.redirect('/students');
    })
        
    });       

module.exports = router;