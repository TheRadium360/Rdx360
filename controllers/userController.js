const catchAysnc=require( "./../utils/catchAsync" );
const User=require( "../models/userModel" );
const AppError=require( "../utils/appError" );


//****************** GET ALL USER ****************** 
exports.getAllUsers=catchAysnc(async ( req, res, next ) => {
  
  const users=await User.find().select("-__v");
  if ( !users ) return next( new AppError( 404, "No User Found!" ) );
  const usersData = users.map( usr => [ usr.id, usr.wallet_address, usr.coins,usr.rewards,usr.reffered_count,usr.reffered_id,usr.refrence_link  ] )
  res.status( 200 ).json( {
    data:usersData
  } )
  

})

//****************** CREATE NEW USER ****************** 
exports.createNewUser=catchAysnc(async ( req, res, next ) => {
  const userData = {
    wallet_address:req.body.wallet_address
  };

  
  const newUser=await User.create( userData );

  res.status( 200 ).json( {
    status: "success",
    user:newUser    
  } )
  

})



//****************** CREATE NEW USER WITH REFERENCE LINK ****************** 
exports.createNewUserWithReference = catchAysnc( async ( req, res, next ) => {
  
  // getting reference id
  const ref_id=req.params.ref_id;
  
  const userData={
    wallet_address: req.body.wallet_address
  };

    // Finding refrenced user to give him reward
  const refrenceUser=await User.findOne( { reffered_id: ref_id } );
  
  if ( refrenceUser.reffered_count < 10 ) {
    
    refrenceUser.rewards += 10; 
    refrenceUser.reffered_count+=1;
    refrenceUser.coins+=10; 
    refrenceUser.save();

  }

  // Create user now
  const newUser = await User.create( userData );
  
  res.status( 200 ).json( {
    status: "success",
    user: newUser

  } )

  
} )



//****************** DELETE USER ****************** 
exports.deleteUser=catchAysnc( async ( req, res, next ) => {
  const user=await User.findByIdAndDelete( req.params.id );
  if ( !user ) {
    return next( new AppError( "No such user exist with that ID" ), 404 );
  }
  res.status( 204 ).json( {
    status: "success",
    data: null,
  } );
} );


//****************** UPDATES USER ****************** 
exports.updateUser=catchAysnc( async ( req, res, next ) => {

  const user=await User.findByIdAndUpdate( req.params.id, req.body, {
    new: true,
    // runValidators: true,
  } );
  if ( !user ) {
    return next( new AppError( "No such user exist with that ID" ), 404 );
  }
  res.status( 200 ).json( {
    status: "success",
    data: {
      user,
    },
  } );
} );




