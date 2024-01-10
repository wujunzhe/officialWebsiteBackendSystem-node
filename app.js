const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send('你好')
});
app.listen(8083, ()=>{
    console.log('服务运行在8083端口')
})
