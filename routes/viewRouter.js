const express=require( "express" );
const viewController=require( "../controllers/viewController" );
const adminController=require( "../controllers/adminController" );

const router=express.Router();

router.get( "/", viewController.getOverview );
router.get( "/admin", viewController.login );
router.get( "/dashboard", adminController.protect, viewController.adminDashboard );

module.exports=router;