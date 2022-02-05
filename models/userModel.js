// ********* Import Modules *************
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


// ********* User DB Schema *************
const userSchema = new mongoose.Schema({

  wallet_address:{
    type: String,
    unique: true,
    trim: true,
    validate: {
      // runs only when new document is created
      validator: function ( val ) {
        let cond=val.match( /([13]|bc1)[A-HJ-NP-Za-km-z1-9]{27,34}/ );
        if ( cond ) return true;
        else return false;
      },
      message: "Invalid Wallet Address format!"
    }
  },
  coins: {
    type: Number,
    default:0
  },
  rewards: {
    type: Number,
    default:10
  },
  reffered_id: {
    type: String
  },
  reffered_count: {
    type: Number,
    default:0
  }


},
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    },

  }

)



//************  Virtual Properties ***************
userSchema.virtual( 'refrence_link' ).get( function () {

  let domain="127.0.0.1:3000"; // domain name will be modified later(before deployement)
  let protocol="http";      // protocol will be modified later(before deployement)

  // let url=`${protocol}://${domain}/${this.reffered_id}`;
  let url=`${protocol}://${domain}/api/v1/users/${this.reffered_id}`;
  return url;
} )


// *************** DOCUMENT MIDDLEWARE *************
userSchema.pre( 'save', function ( next ) {

  if ( this.isNew ) {

    this.reffered_id=`${this._id.toString()}-${Date.now()}`;
    this.coins = 10;
  
  }

  next();
} )



const User = mongoose.model( "User", userSchema );
module.exports = User;
