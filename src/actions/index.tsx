import { UserModel } from "../app/models/User";

export const signin = () => {
    return {
        type: 'SING_IN'
    }
};

export const signout = () => {
    return {
        type: 'SIGN_OUT'
    };
};

export const save_user_data = (user: UserModel) => {
    return {
        type: 'SAVE_USER_DATA',
        payload: user
    }
};

export const clear_user_data = () => {
    return {
        type: 'CLEAR_USER_DATA'
    }
};

export const add_show_to_favorites = (showId: number) => {
    return {
        type: 'ADD_SHOW_TO_FAVORITES',
        payload: {
            showId
        },
    }
};

export const set_new_user_data = (user: UserModel) => {
    return {
        type: 'SET_NEW_USER_DATA',
        payload: {
            ...user
        }
    }
};

export const set_friends = (users: UserModel[]) => {
    return {
        type: 'SET_FRIENDS',
        payload: [...users]
    };
};