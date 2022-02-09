const express=require( "express" );
const viewController=require( "../controllers/viewController" );
const adminController=require( "../controllers/adminController" );

const router=express.Router();

const CSP='Content-Security-Policy';
const POLICY=
  "default-src 'self' https://* ;"+
  "base-uri 'self';block-all-mixed-content;"+
  "font-src 'self' https: data:;"+
  "frame-ancestors 'self';"+
  "img-src http://localhost:3000 'self' blob: data:;"+
  "object-src 'none';"+
  "script-src https: cdn.jsdelivr.net cdnjs.cloudflare.com api.mapbox.com 'self' blob: ;"+
  "script-src-attr 'none';"+
  "style-src 'self' https: 'unsafe-inline';"+
  'upgrade-insecure-requests;';

router.use( ( req, res, next ) => {
  res.setHeader( CSP, POLICY );
  next();
} );


router.get( "/", viewController.getOverview );
router.get( "/admin", viewController.login );
router.get( "/dashboard", viewController.adminDashboard );
router.get( "/:ref_id", viewController.getOverview );

module.exports=router;