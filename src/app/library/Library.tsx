import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { RootState } from "../../reducers/root";
import { ShowCollection } from "../shows/ShowCollection/ShowCollection";

import '../shows/Shows.scss';
import { ShowModel } from "../models/Show";
import { db, getUserShows } from "../../firebase";

export const Library = () => {
    const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);
    const favoriteShowIds = useSelector((state: RootState) => state.user.favorites);
    const mainUserId = useSelector((state: RootState) => state.user._id);
    const { id } = useParams<{ id: string }>();

    const [favoriteShows, setFavoriteShows] = useState([] as ShowModel[])

    useEffect(() => {
        if (mainUserId === id) {
            (async function () {
                const results = await Promise.all(
                    favoriteShowIds.map(id => {
                        const url = `https://api.tvmaze.com/shows/${id}`;
                        return fetch(url).then(response => response.json());
                    })
                );
                const userShows = results as ShowModel[];
                setFavoriteShows([...userShows]);
            })();
        } else {
            (async function () {
                const results = await getUserShows(db, id);
                const shows = await Promise.all(
                    results.map(id => {
                        const url = `https://api.tvmaze.com/shows/${id}`;
                        return fetch(url).then(response => response.json());
                    })
                );
                const userShows = shows as ShowModel[];
                setFavoriteShows([...userShows]);
            })();
        }
    }, [id]);

    return (
        <main className='shows'>
            {
                isLoggedIn
                ?
                <article className='shows__collections'>
                    {
                    favoriteShows.length > 0
                    ?    
                    <ShowCollection title="Your favorites" showCollection={favoriteShows}/>
                    :
                    <h2 className='heading-secondary'>There are no shows in this library</h2>
                    }
                </article>
                :
                <h2 className='heading-secondary'>Sign In to view your library</h2>
            }
        </main>
    );
};