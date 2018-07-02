
module.exports = {
  
	Signup:function(req, res){

        User.create({name:req.body.name,
            username:req.body.username,
            password:req.body.password,
            phoneno:req.body.phoneno,
            email:req.body.email}).exec(function(err, user){
            if (err){
                res.send(500, {error: 'Database Error', signedUp:false});
                return;
            }
            else{
                res.send({
                    user: user.id,
                    Email: user.email,
                    Phone:user.phoneno,
                    signedUp:true
                });
            }
        
            
        })
    },


    Login:function(req,res){
        Client.findOne({username:req.body.username,
            password:req.body.password}).then(function(client){
            if(client) {
                
                return res.send({
                    user: client.id,
                    Email: client.email,
                    loggedIn: true
                });
            }
            else{
                return res.send({
                    loggedIn : false
                });
            }
  
        })  

    },

 
};

