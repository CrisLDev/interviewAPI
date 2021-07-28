import {Router} from 'express';
import { validateToken } from 'libs/verifyToken';
import { getMe, login, register } from '../controllers/auth';
/*import { token } from '../middlewares/passport';*/

const router = Router();

router.route('/users')
.post(register);

router.route('/auth')
.post(login)
.get(validateToken, getMe);

export default router;