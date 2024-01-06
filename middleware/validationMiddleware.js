import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js'

// this is express.js code to validate errors
// this is something we can use from project to project
// now we wont touch this, only touch the export conditions by putting values. 
const withValidateErrors = (validateValues) => {
    return [
        validateValues, (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                const errorMessages = errors.array().map((error) => error.msg);
                if (errorMessages[0].startsWith('No job')) {
                    throw new NotFoundError(errorMessages);
                }
                if (errorMessages[0].startsWith('not authorized')) {
                    throw new UnauthorizedError('not authorized to access this route');
                }
                throw new BadRequestError(errorMessages);
            }
            next();
        },
    ];
}

export const validateJobInput = withValidateErrors([
    body('company').notEmpty().withMessage('company is required'),
    body('position').notEmpty().withMessage('position is required'),
    body('jobLocation').notEmpty().withMessage('job location is required'),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('invalid status value'),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid job type value'),
])

export const validateIdParam = withValidateErrors([
    param('id').custom(async (value, { req }) => {
        // we will need to do this manually because it is an async function
        const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
        if (!isValidMongoId) throw new BadRequestError('invalid MongoDB id');
        const job = await Job.findById(value);
        if (!job) throw new NotFoundError(`No job with id ${value}`);

        const isAdmin = req.user.role === 'admin';
        const isOwner = req.user.userId === job.createdBy.toString();
        if (!isAdmin && !isOwner) throw new UnauthorizedError('not authorized to access this route');
    }),
]);

export const validateRegisterInput = withValidateErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format').custom(async (email) => {
        const user = await User.findOne({ email })
        if (user) {
            throw new BadRequestError('email already exists');
        }
    }),
    body('password').notEmpty().withMessage('password is required').isLength({ min: 8 }).withMessage('password must be at least 8 characters long'),
    body('location').notEmpty().withMessage('location is required'),
    body('lastName').notEmpty().withMessage('last name is required'),
]);


export const validateLoginInput = withValidateErrors([
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format'),
    body('password').notEmpty().withMessage('password is required'),
]);

// check
export const validateUpdateUserInput = withValidateErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format').custom(async (email, { req }) => {
        const user = await User.findOne({ email });
        if (user && user._id.toString() !== req.user.userId) {
            throw new BadRequestError('email already exists');
        }
    }),
    body('lastName').notEmpty().withMessage('last name is required'),
    body('location').notEmpty().withMessage('location is required'),
]);