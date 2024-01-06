import { Router } from 'express';
const router = Router();

import { validateJobInput, validateIdParam } from '../middleware/validationMiddleware.js';
import { getAllJob, createJob, getJob, updateJob, deleteJob, showStats } from '../controllers/jobController.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';


router.route('/')
    .get(getAllJob)
    .post(checkForTestUser, validateJobInput, createJob);

router.route('/stats').get(showStats);
router.route('/:id')
    .get(validateIdParam, getJob)
    .patch(checkForTestUser, validateJobInput, validateIdParam, updateJob)
    .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;