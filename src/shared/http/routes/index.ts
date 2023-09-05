import { Router } from "express";


export const routes = Router();

routes.get('/',(req,res)=>{
  return res.json({
    message: 'Ola Edvaldo'
  });
});


export default routes
