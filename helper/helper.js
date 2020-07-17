const axios = require("axios")

let ipRegulate=(ip)=>{
    
    var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    value=ip
    if(!value.match(ipformat))
    {
        var split_str = value.split(':');
        value = split_str[6] + split_str[7];

        var ip_1 = ~parseInt(value.substring(0,2),16) & 0xFF;
        var ip_2 =~parseInt(value.substring(2,4),16) & 0xFF;
        var ip_3 =~parseInt(value.substring(4,6),16) & 0xFF;
        var ip_4 =~parseInt(value.substring(6,8),16) & 0xFF;

        value=(ip_1+'.'+ip_2+'.'+ip_3+'.'+ip_4);

    }
    return value
}

let location=(ip)=>{
    return new Promise((resolve,reject)=>{
        var locationUrl="https://api.hackertarget.com/geoip/?q="+ip
        axios(locationUrl)
        .then(data=>{resolve(data)})
        .catch(err=>{reject(err)})
    })
   

}

module.exports={
    ipRegulate,
    location
}