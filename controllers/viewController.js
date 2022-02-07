const User=require( "../models/userModel" );
const Admin=require( "../models/adminModel" );
const AppError=require( "../utils/appError" );
const catchAsync=require( "../utils/catchAsync" );
const querystring=require( 'querystring' );


exports.getOverview=catchAsync( async ( req, res, next ) => {
  // console.log( req.params );
  // console.log( querystring.parse( req.originalUrl ) );
  // console.log( "=>>> ", req.originalUrl )

  // const urlParameter=req.originalUrl.split( '/' )[ 1 ];
  // let reference_id;
  // if ( urlParameter.split( '-' )[ 0 ].length===24 ) {
  //   reference_id=urlParameter.split( '-' )[ 0 ];
  // }

  res.status( 200 ).render( "overview", {
  } );
} );

exports.login=catchAsync( async ( req, res, next ) => {
  res.status( 200 ).render( "login", {
  } );
} );

exports.adminDashboard=catchAsync( async ( req, res, next ) => {


  res.status( 200 ).render( "admin", {} )
} );
