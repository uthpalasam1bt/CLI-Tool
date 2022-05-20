/* 
sample hook 
*/
export const conditionHooks = data => {
    return {
        activationCodeTypeEnable: data.activationCode !== '35131' && data.step === 9
    };
};
