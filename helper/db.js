const db = require("../model/index")


let dataEntry=(data)=>{
    return new Promise((resolve,reject)=>{
        findUrl(data.url)
        .then(r=>{
            if(r){
                if(!(r.ip).includes(data.ip)){
                    update(data)
                    .then(s=>{resolve(s)})
                    .catch(err=>{reject(err)})
                }
                else{
                    resolve()
                }
            }
            else{
                createUrl(data)
                .then(s=>{resolve(s)})
                .catch(err=>{reject(err)})
            }
        })
        .catch(err=>{reject(err)})
    })
}


let createUrl=(data)=>{
    return new Promise((resolve,reject)=>{
        const newdb= new db({
            url:data.url,
            ip:data.ip,
            date:data.date,
            location:data.location
        })
        newdb.save(err=>{
            if(err){
                reject(err)
            }
            else{
                resolve()
            }
        })
    })
}

let findUrl=(url)=>{
    return new Promise((resolve,reject)=>{
        db.findOne({url:url})
        .then(r=>{resolve(r)})
        .catch(err=>{reject(err)})
    })
}


let update=(data)=>{
    return new Promise((resolve,reject)=>{
        db.findOneAndUpdate({"url":data.url},{"$push":{"ip":data.ip,"date":data.date,"location":data.location}})
        .then(data=>{resolve(data)})
        .catch(err=>{reject(err)})
    })
}


let collectData=()=>{
    return db.find({},{"url":1,"ip":1,"date":1})
}


module.exports={
    createUrl,
    update,
    findUrl,
    dataEntry,
    collectData
}