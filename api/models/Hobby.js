module.exports = {

  attributes: {
    User:{
       type: 'string',
      required: true
     
    },
    
    hobby:{
      type:'string'
    }
  },
  connection: 'mongod'
};


