const nodemailer = require('nodemailer')

const email = document.getElementById("emailvalue")
const button = document.querySelector(".button")


button.addEventListener("click",()=>{
    let value = email.value
    console.log(value)

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:'caganbey4545@gmail.com',
            pass: 'aCugaNb23."'
    
        }
    })
    
    let mailOption = {
        from:'caganbey4545@gmail.com',
        to: '' + email.value + '',
        subject:'Account mewcut !',
        text: '<h1>TEST</h1>'
    }
    
    transporter.sendMail(mailOption,(err,data)=>{
        if(err) console.log(err)
        else{
    console.log(data)
    }
    })

})


