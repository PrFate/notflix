import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import { addFriend, db, deleteFriend } from "../../../../firebase";
import { RootState } from "../../../../reducers/root";
import { UserModel } from "../../../models/User";
import { Avatar } from "./Avatar/Avatar";

interface Props {
    user: UserModel;
    isFriend: boolean;
    setFriends: React.Dispatch<React.SetStateAction<UserModel[]>>;
    friends: UserModel[];
}

export const FriendCard = ({user, isFriend, setFriends, friends}: Props) => {

    const mainUserId = useSelector((state: RootState) => state.user._id);
    const mainUserEmail = useSelector((state: RootState) => state.user.email);

    const history = useHistory();

    async function handleAddFriend() {
        const newFriend = {
            _id: user._id,
            email: user.email,
            username: user.username,
            age: user.age
        };
        setFriends([...friends, newFriend]);
        await addFriend(db, mainUserId, user.email);
    }

    function handleViewGallery() {
        history.push(`/library/${user._id}`);
    }

    async function handleDeleteFriend() {
        if (window.confirm("Are you sure you want to delete this friend?")) {
            const deletedFriendIndex = friends.findIndex(friend => friend._id === user._id);
            setFriends(
                [
                    ...friends.slice(0, deletedFriendIndex),
                    ...friends.slice(deletedFriendIndex + 1, friends.length)
                ]
            );
            await deleteFriend(db, mainUserId, mainUserEmail, user.email);
        }
    }

    return (
        <div className='friends__friend u-margin-bottom'>
            <div className='friends__friend-group'>
                <Avatar/>
                <div className='friends__friend-info'>
                    <p className='subheading'>{user.username || user.email}</p>
                    {user.username ? <p className='friends__par'>{user.email}</p> : ''}
                    {user.age ? <p className='friends__par'>Age: {user.age}</p> : ''}
                </div>
            </div>
            {
                isFriend
                ?
                <span className="btn-sliding-cont">
                    <span className='btn btn-sliding btn--purple' onClick={() => handleViewGallery()}>View gallery</span>
                    <span className='btn btn-sliding btn--red' onClick={() => handleDeleteFriend()}>Remove</span>
                </span>
                :
                <span className='btn btn-sliding btn--green' onClick={() => handleAddFriend()}>Add</span>
            }
        </div>
    );
};