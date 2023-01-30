const express=require('express')
const cors=require('cors')
const sha1=require('js-sha1')
const utf8=require('utf8')
const crypto=require('crypto')
const fetch=require('node-fetch')
const { response } = require('express')


const app=express()

app.use(express.json())
app.use(cors())

const PORT=3000

app.post('/process',async(req,res)=>{
    const {message}=req.body

    const encoder=new TextEncoder()

    const encMsgArr=encoder.encode(message)
    

    const hash=crypto.createHash('sha1')
    hash.update(encMsgArr)

    const hex_digest=hash.digest('hex')

    console.log(hex_digest);

    res.json({hex:hex_digest})
})

app.post('/hash',async(req,res)=>{
    const {message}=req.body

    
    // let final_time = toString(parseInt(Math.round()))

    let response= await (await fetch('https://raw.githubusercontent.com/DATAHOARDERS/dynamic-rules/main/onlyfans.json')).json()


    let messager=utf8.encode(message)

    // let hash_object = hashlib.sha1(messager)
    let sha_1_sign = sha1.create()
    sha_1_sign=sha_1_sign.update(messager)
    sha_1_sign=sha_1_sign.hex()
    
    let sha_1_b =Buffer.from(sha_1_sign, "ascii");

    console.log(sha_1_b);
    
    res.json({sha_1_b:sha_1_b,sha_1_sign:sha_1_sign})

})

// app.use('/files',require('./routes/files'))

app.listen(PORT,()=>{
    console.log(`Pdf converter running on port ${PORT}`);
})