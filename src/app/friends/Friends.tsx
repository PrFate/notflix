import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { FriendsList } from './FriendsList/FriendsList';
import { RootState } from '../../reducers/root';
import { UserModel } from '../models/User';
import './Friends.scss';
import { db, getPotentialFriends, getUsersFriends } from '../../firebase';

export const Friends = () => {
    const [users, setUsers] = useState([] as UserModel[]);
    const [friends, setFriends] = useState([] as UserModel[]);
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [isInSearch, setIsInSearch] = useState(false);

    const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);
    const userId = useSelector((state: RootState) => state.user._id);

    useEffect(() => {
        if (isLoggedIn) {
            (async () => {
                const userFriends = await getUsersFriends(db, userId) as UserModel[];
                setFriends(userFriends);
            })();
        }
    }, []);

    async function findPotentialFriends() {
        const potentialFriends = await getPotentialFriends(db, usernameOrEmail);
        setUsers(potentialFriends as UserModel[]);
    }

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        setIsInSearch(true);
        findPotentialFriends();
    }

    return (
        <main className='friends'>
            {
                isLoggedIn
                ?
                <article className='friends__section'>
                    <h2 className='heading-secondary'>Search for new friends</h2>
                    <form className='friends__search-group'>
                        <input className='friends__input' placeholder='Email Address or User Name' type='text' onChange={(e) => {
                            setUsernameOrEmail(e.target.value);
                            if (e.target.value === '') {
                                setIsInSearch(false);
                            }
                        }}/>
                        <button onClick = {(e) => handleSubmit(e)} className='btn btn--form'>Search</button>
                    </form>
                    <h2 className='heading-secondary'>{isInSearch ? 'Search results' : 'My friends'}</h2>
                    {
                        isInSearch
                        ?
                        <FriendsList users={users} friends={friends} isFriendsList={false} setFriends={setFriends}/>
                        :
                        <FriendsList users={friends} friends={friends} isFriendsList={true} setFriends={setFriends}/>
                    }
                </article>
                :
                <h2 className='heading-secondary'>Sign In to view your friends list</h2>
            }
            <img className='friends__img' src='./assets/addFriends.svg' alt='Social media friends'/>
        </main>
    );
};