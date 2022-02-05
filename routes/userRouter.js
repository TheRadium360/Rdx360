const express=require( "express" );
const { createNewUser, createNewUserWithReference,updateUser,deleteUser, getAllUsers }=require( "../controllers/userController" );
const router=express.Router();
const cors=require( 'cors' )



//***** ROUTES FOR SIMPLE USERS
router.route( '/' )
  .post( createNewUser )
  
router.post( '/:ref_id', createNewUserWithReference );

router.patch( '/:id', updateUser )
router.delete( '/:id', deleteUser )



//***** ROUTES FOR ADMINS
router.get( '/',cors(),getAllUsers )

module.exports=router;



















