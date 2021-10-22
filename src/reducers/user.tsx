import {UserModel} from '../app/models/User';

const initialState: UserModel = {
    _id: '',
    email: '',
    password: '',
    username: '',
    age: 0
};

const userReducer = (state: UserModel = initialState, action) => {
    switch (action.type) {
        case 'SAVE_USER_DATA':
            return {
                ...state,
                ...action.payload
            };
        case 'CLEAR_USER_DATA':
            return {};
        case 'ADD_SHOW_TO_FAVORITES':
            const newState = {...state};
            if (!newState.favorites) {
                newState.favorites = [];
            }
            newState.favorites.push(action.payload.showId);
            return newState;
        case 'SET_NEW_USER_DATA':
            return {
                ...state,
                ...action.payload
            };
        case 'SET_FRIENDS':
            return {
                ...state,
                friends: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;