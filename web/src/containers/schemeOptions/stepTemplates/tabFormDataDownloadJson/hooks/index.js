/* 
when the developer  wants to define some custom validation developer has to import the function here and export it
and pass the exported functions as a formHooks property  
*/

import { conditionHooks } from './conditionHooks';
import { fieldOptionHook } from './fieldOptionHook';

export { conditionHooks, fieldOptionHook };
