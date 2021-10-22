// Hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Redux
import { signin, signout, save_user_data, clear_user_data } from '../../actions';
import '../profile/Profile.scss';
// Firestore
import {db, signUserIn} from '../../firebase';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../reducers/root';
import { UserModel } from '../models/User';

export const SignIn = ({match}) => {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        setEmail(match.params.email || '');
    }, []);

    async function handleSignIn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        const user: UserModel = await signUserIn(db, email, password) as UserModel;
        dispatch(signin());
        dispatch(save_user_data(user));
        history.push('/shows');
    }

    function handleSignOut(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        dispatch(clear_user_data());
        dispatch(signout());
        history.push('/');
    }

    return (
        <main className='profile' style={{backgroundImage: email === '' ? "url('./assets/bg.jpeg')" : "url('../assets/bg.jpeg')"}}>
            <div className='profile__bg-corrector'>
                {
                    isLoggedIn
                    ?
                    <form className="profile__form">
                        <h2 className='profile__heading'>You are signed in</h2>
                        <button className='profile__button' onClick={(e) => handleSignOut(e)}>Sign Out</button>
                    </form>
                    :
                    <form className='profile__form'>
                        <h2 className='profile__heading'>Sign In</h2>
                        <input className='profile__input' placeholder='Email Address' type='text' defaultValue={email || ''} onChange={(e) => setEmail(e.target.value)}/>
                        <input className='profile__input' placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)}/>
                        <button className='profile__button' onClick={(e) => handleSignIn(e)}>Sign In</button>
                    </form>
                }
            </div>
    </main>
    );
};