import { useState } from 'react';
import { ShowModel } from '../models/Show';
import { ShowCollection } from '../shows/ShowCollection/ShowCollection';
import './Search.scss'

interface ExtendedShowModel {
    score: number;
    show: ShowModel;
}

export const Search = () => {
    const [shows, setShows] = useState([] as ExtendedShowModel[]);
    const [searchedShowName, setSearchedShowName] = useState('');

    async function handleShowSearch(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchedShowName}`);
        const results = await response.json();
        setShows(results);
    }

    return (
        <main className='search'>
            <h2 className='heading-secondary u-margin-bottom-small'>Search for shows</h2>
            <form className='search__search-group u-margin-bottom'>
                <input className='search__input' placeholder='Show name' type='text' onChange={(e) => setSearchedShowName(e.target.value)}/>
                <button className='btn btn--form' onClick={(e) => handleShowSearch(e)}>Search</button>
            </form>
            {
            shows.length > 0
            ?
            <ShowCollection title="Search results" showCollection={shows.map(showInfo => showInfo.show)}/>
            :
            ''
            }
        </main>
    );
};