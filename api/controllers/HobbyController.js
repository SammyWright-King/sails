

module.exports = {

    check: function(req,res){
        Hobby.find({where:{User:req.body.User}}).exec(function(err, hobby){
            if (err){
                return res.send({
                    checked:false 
                });
            }
            else{
                return res.send({
                    checked:true, 
                    hobb:hobby
                }); 
            }
            
        })
    },
    save: function(req,res){
        var nodemailer=require("nodemailer");
        var transporter=nodemailer.createTransport({
            service:"gmail",
            secure: false,
            port: 25,
            auth: {
                user:"SammyWright_01@yahoo.com",
                pass:"smw100MNY"
            },
            tls:{
                rejectUnauthorized:false
            }
        });
        var mailoptions={
            from:"ADDHOBBIES.COM <kayuskeks@gmail.com>",
            to:req.body.email,
            subject:"NEW HOBBY",
            text:"A new hobby has been added to your list: "+req.body.HobbyName
        };

        transporter.sendMail(mailoptions,function(error){
            if(error){
                console.log("email not sent");
                console.log(error);
         
            }
            console.log("success");
        });
        const user = require('twilio')(
            process.env.TWILO_ACCOUNT_SID,
            process.env.TWILO_AUTH_TOKEN
        );
        user.messages.create({
            from:process.env.TWILO_PHONE_NUMBER,
            to:process.env.CELL_PHONE_NUMBER,
            body:"you just added an hobby!sign in to view now"
        }).then((message) => console.log(message.sid));
        // var telesignsdk = require("telesignsdk");
        // var client = new telesignsdk("7446D94B-B815-4C66-BBD2-BA09740C1ACD","A70Xtks6v2y4lioI9+Lix6mIMMw3UWlXn1bFiSU4M4WGvGNubP6ub4yUlTmDMGQkvTY9FOPhH8rV2AS7YSCLKg==");

        // callback = function(err, resBody){
        //     if(err){
        //         req.session.emailTextError +="and Text";
        //         console.error(err);
        //     }
        //     else{
        //         req.session.emailTextError +="and Text";
        //         console.log(resBody);
        //     }
        // }
        // console.log(req.body.UserId)
        // client.sms.message(callback,2348075176592,'A new hobby has been added to your list: '+ req.body.HobbyName,'ARN');

        
        Hobby.create({User:req.body.User,
            hobby:req.body.hobby}).exec(function(err,hobby){
            if (err){
                return res.send(
                    500, {
                        error: 'Error',
                        added: false
                    });
            }
            else{
                console.log("added");
                return res.send({
                    added : true
                });
            }
        })
        
    }
};

