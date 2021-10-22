import {setUserInfo, db} from '../../firebase';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../reducers/root';
import './Profile.scss';
import { set_new_user_data } from '../../actions';
import { UserModel } from '../models/User';

export const Profile = () => {
    const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);

    const userId = useSelector((state: RootState) => state.user._id);
    const initialEmail = useSelector((state: RootState) => state.user.email);
    const initialPassword = useSelector((state: RootState) => state.user.password);
    const initialUsername = useSelector((state: RootState) => state.user.username);
    const initialAge = useSelector((state: RootState) => state.user.age);

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');

    useEffect(() => {
        setEmail(initialEmail);
        setPassword(initialPassword);
        setAge(initialAge);
        setUsername(initialUsername);
    }, [])

    function handleNewUserData(e) {
        e.preventDefault();
        const user: UserModel = {
            _id: userId,
            email,
            password,
            username,
            age: +age
        };
        (async function () {
            await setUserInfo(db, user);
        })();
        dispatch(set_new_user_data(user));
    }

    return (
        <main className='profile' style={{backgroundImage: "url('./assets/bg.jpeg')"}}>
            <div className='profile__bg-corrector'>
                {
                    isLoggedIn
                    ?
                    <form className='profile__form'>
                        <h2 className='profile__heading'>Edit Profile Info</h2>
                        <input className='profile__input' placeholder='Email Address' type='email' defaultValue={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input className='profile__input' placeholder='Password' type='password' defaultValue={password} onChange={(e) => setPassword(e.target.value)}/>
                        <input className='profile__input' placeholder='User Name' type='text' defaultValue={username} onChange={(e) => setUsername(e.target.value)}/>
                        <input className='profile__input' placeholder='Age' type='number' defaultValue={age} onChange={(e) => setAge(e.target.value)}/>
                        <button className='profile__button' onClick={(e) => handleNewUserData(e)}>Submit</button>
                    </form>
                    :
                    <form className='profile__form'>
                        <h2 className='profile__heading'>Sign in to view your profile</h2>
                        <Link to='/signin'>
                            <button className='profile__button'>Sign In</button>
                        </Link>
                    </form>
                }
            </div>
        </main>
    );
};