import { UserModel } from "../../models/User";
import { FriendCard } from "./FriendCard/FriendCard";

interface Props {
    users: UserModel[];
    friends: UserModel[];
    isFriendsList: boolean;
    setFriends: React.Dispatch<React.SetStateAction<UserModel[]>>;
}

export const FriendsList = ({users, isFriendsList, setFriends, friends}: Props) => {
<<<<<<< HEAD

=======
>>>>>>> a7dcf95201f76ca2ec863d00507fcde1bf155189
    return (
        <section className='friends__list'>
            {users.length > 0
            ?
            users.map((user: UserModel) => <FriendCard key={user.email} user={user} isFriend={isFriendsList} setFriends={setFriends} friends={friends}/>)
            :
            'You have no friends yet. Add them, so you can see them here'}
        </section>
    );
};