import express from 'express';
import {getpost,createpost,updatepost,deletepost,likepost} from '../controllers/posts.js'
const router = express.Router();

router.get('/',getpost);
router.post('/',createpost);
router.patch('/:id',updatepost);
router.delete('/:id',deletepost);
router.patch('/:id/likePost',likepost);


export default router;

// first  route
// second controller 
// clint api