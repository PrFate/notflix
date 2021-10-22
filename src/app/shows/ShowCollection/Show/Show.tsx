
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import parse from 'html-react-parser';

import { ShowModel } from "../../../models/Show";
import { RootState } from "../../../../reducers/root";
import { add_show_to_favorites } from "../../../../actions";
import {db, addShowToFavorites, getShowsLikes, appendShowLikeQuantity} from "../../../../firebase";

interface Props {
    show: ShowModel;
    showSetter: React.Dispatch<React.SetStateAction<number>>;
}

export const Show = ({show, showSetter}: Props) => {
    const usersFavoriteShows = useSelector((state: RootState) => state.user?.favorites) || [];
    const userId = useSelector((state: RootState) => state.user._id);
    const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);
    const dispatch = useDispatch();

    const [isUsersFavorite, setIsUsersFavorite] = useState(false);
    const [showLikeQuantity, setShowLikeQuantity] = useState(0);

    const { id } = useParams<{ id: string }>();
    const showIsInPersonalLibary = id !== '';

    useEffect(() => {
        let showLikeNumber = 0;
        (async function () {
            showLikeNumber = await getShowsLikes(db, show.id);
            setShowLikeQuantity(showLikeNumber);
        })();
        if (usersFavoriteShows.length > 0) {
            setIsUsersFavorite(
                usersFavoriteShows.some(showId => showId === show.id)
            );
        }
    }, []);

    function handleCrossClick() {
        showSetter(0);
    }

    async function handleLike(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
        if (!isLoggedIn) {
            alert('You have to sign in to leave likes');
            return;
        }
        if (isUsersFavorite) {
            alert('You have already liked this show');
            return;
        }
        setIsUsersFavorite(true);
        dispatch(add_show_to_favorites(show.id));
        await addShowToFavorites(db, userId, show.id);
        await appendShowLikeQuantity(db, show.id);
        setShowLikeQuantity(showLikeQuantity + 1);
    }

    return (
        <div className='shows__show'>
            <span className='shows__show-info'>
                <h3 className='subheading u-margin-bottom-small'>{show.name}</h3>
                <span className='shows__show-descr'>{parse(show.summary)}</span>
                <div className='shows__info-group'>
                    <img className='shows__like-img' src={showIsInPersonalLibary ? `../assets/${isUsersFavorite ? 'Like' : 'NoLike'}.svg` : `./assets/${isUsersFavorite ? 'Like' : 'NoLike'}.svg`} alt='Heart' onClick={(e) => handleLike(e)}/>
                    <span className='shows__like-quantity'>{showLikeQuantity}</span>
                    <span className='shows__categories'>
                        {show.genres
                            .slice(0, show.genres.length-1)
                            .reduce((acc, genre) => acc + (genre as string) + ', ', '')} {show.genres[show.genres.length-1]}
                    </span>
                </div>
                <div className='shows__btn-group'>
<<<<<<< HEAD
                    <button className='btn btn--form u-margin-right-small' onClick={() => alert('Loading WannaCry to your machine')}>Play</button>
=======
                    <button className='btn btn--form u-margin-right-small'>Play</button>
>>>>>>> a7dcf95201f76ca2ec863d00507fcde1bf155189
                </div>
                <img onClick={handleCrossClick} className='shows__show-close' src={showIsInPersonalLibary ? '../assets/cross.svg' : './assets/cross.svg'} alt='Close'/>
            </span>
            <img className='shows__show-img' src={show.image.original} alt={show.name}/>
        </div>
    );
};