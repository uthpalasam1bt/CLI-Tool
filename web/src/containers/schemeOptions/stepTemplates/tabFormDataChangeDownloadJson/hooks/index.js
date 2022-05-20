//when the developer  wants to define some custom validation developer has to import the function here and export it

import { OnSubmitHook } from './onSubmitHooks';
import { OnFormDataChangeHook } from './onFormDataChangeHooks';
import { OnSaveHook } from './onSaveHooks';

export { OnSubmitHook, OnFormDataChangeHook, OnSaveHook };
