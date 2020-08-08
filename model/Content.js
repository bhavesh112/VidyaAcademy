const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin'
  },
  subject:{
      type:String,
      required:true 
  },
  topic:{
          type:String,
          required:true
      },
  name:{
    type:String,
    required : true
  },
      type:{
        type:String,
        required: true
      },
    link:{
            type:String,
            required:true
    }  
});

module.exports = mongoose.model('content', ContentSchema);