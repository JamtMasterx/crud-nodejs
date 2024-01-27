import {Router} from "express";

const router = Router();

router.get("/add",(req,res)=>{res.render("links/add")});

export default router;
