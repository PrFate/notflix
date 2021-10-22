const loginReducer = (state: boolean = false, action) => {
    switch (action.type) {
        case 'SING_IN':
            return !state;
        case 'SIGN_OUT':
            return !state;
        default:
            return state;
    }
};

export default loginReducer;