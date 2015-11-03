import koaRouter from 'koa-router';
// Export the koa-router functions
export const router = koaRouter();

// Import the generator functions from each route
import {hello} from './hello';

// Define rules for each route
router.get('/hello', hello);
