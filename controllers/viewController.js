const User=require( "../models/userModel" );
const Admin=require( "../models/adminModel" );
const AppError=require( "../utils/appError" );
const catchAsync=require( "../utils/catchAsync" );

exports.getOverview=catchAsync( async ( req, res, next ) => {
  res.status( 200 ).render( "overview", {
  } );
} );

exports.login=catchAsync( async ( req, res, next ) => {
  res.status( 200 ).render( "login", {
  } );
} );

exports.adminDashboard=catchAsync( async ( req, res, next ) => {
  const users=await User.find();
  if ( !req.headers.cookie ) {
    res.status( 401 ).render( "error", {
      message: "You are not logged in ! Please Login!",
      status: 401,
      link: "/admin/login",
      pageName: "Login",
      users,
    } );
  } else {
    res.status( 200 ).render( "admin", {
      users
    } );
  }
} );
