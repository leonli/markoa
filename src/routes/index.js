import koaRouter from 'koa-router';
// Export the koa-router functions
export const router = koaRouter();

// Import the generator functions from each route
import {welcome} from './welcome';

// Define rules for each route
router.get('/welcome', welcome);
