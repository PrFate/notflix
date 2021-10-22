import { useEffect, useState } from 'react';
import { GENRE, genres, ShowModel } from '../../models/Show';
import { ShowCard } from './ShowCard/ShowCard';
import {Show} from './Show/Show';

interface Props {
    showCollection: ShowModel[];
    title: string;
}

export const ShowCollection = ({showCollection, title}: Props) => {
    const [displayedShows, setDisplayedShows] = useState([] as ShowModel[])
    const [selectedShowId, setSelectedShowId] = useState(0);
<<<<<<< HEAD
    const [selectedShow, setSelectedShow] = useState({} as ShowModel);
=======
>>>>>>> a7dcf95201f76ca2ec863d00507fcde1bf155189
    const offset = 10;
    const [lastShowIndex, setLastShowIndex] = useState(offset);
    const [pageNum, setPageNum] = useState(2);
    let firstShowIndex = 0;

<<<<<<< HEAD
    // useEffect(() => {
    //     setDisplayedShows(showCollection.slice(firstShowIndex, lastShowIndex));
    // }, [showCollection]);
=======
    useEffect(() => {
        setDisplayedShows(showCollection.slice(firstShowIndex, lastShowIndex));
    }, [showCollection]);
>>>>>>> a7dcf95201f76ca2ec863d00507fcde1bf155189

    useEffect(() => {
        setDisplayedShows(showCollection.slice(firstShowIndex, lastShowIndex));
    }, []);

    function handleLoadMoreClick() {
<<<<<<< HEAD
        const newLastShowIndex = lastShowIndex + offset;
        setLastShowIndex(newLastShowIndex);
        if (lastShowIndex >= showCollection.length) {
            fetchMoreShows();
        } else {
            setDisplayedShows(showCollection.slice(firstShowIndex, newLastShowIndex));
        }
=======
        setLastShowIndex(lastShowIndex + offset);
        if (lastShowIndex >= showCollection.length) {
            fetchMoreShows();
            return;
        } 
        setDisplayedShows(showCollection.slice(firstShowIndex, lastShowIndex));
>>>>>>> a7dcf95201f76ca2ec863d00507fcde1bf155189
    }

    function fetchMoreShows() {

        fetch(`https://api.tvmaze.com/shows?page=${pageNum}`)
        .then(response => response.json())
        .then(shows => {
            const filteredShows = shows.filter((show: ShowModel) => {
                for (let j = 0; j < show.genres.length; j++) {
                    if (genres.includes(show.genres[j])) {
                        return show;
                    }
                }
            });
            const resultingShows = sortShows(filteredShows);
            setDisplayedShows([...displayedShows, ...resultingShows]);
        })
        .catch(() => {
            alert('No more shows in this category!');
        });
        setPageNum(pageNum + 1);
    }

    function sortShows(shows: ShowModel[]): ShowModel[] {
        const resultingShows: ShowModel[] = [];
        shows.forEach((show: ShowModel) => {
            if (show.genres.includes(title as GENRE)) {
                resultingShows.push(show);
            }
        })
        return resultingShows;
    }    

    return (
        <section className='shows__collection'>
            <h3 className='shows__category'>{title}</h3>
            <div className='shows__cards-and-info-cont'>
                <div className='shows__show-cards'>
                    {
                        displayedShows.length > 0
                        ?
                        displayedShows.map((show) => {
<<<<<<< HEAD
                            return <ShowCard key={show.id} showInfo={show} showSetter={setSelectedShow} showIdSetter={setSelectedShowId}/>
=======
                            return <ShowCard key={show.id} showInfo={show} showSetter={setSelectedShowId}></ShowCard>
>>>>>>> a7dcf95201f76ca2ec863d00507fcde1bf155189
                        })
                        :
                        'No shows available'
                    }
                </div>
                {
<<<<<<< HEAD
                    selectedShow && selectedShowId !== 0
                    ?
                    <Show show={selectedShow} showSetter={setSelectedShowId}/>
=======
                    selectedShowId !== 0 
                    ?
                    <Show show={showCollection.find(show => show.id === selectedShowId) as ShowModel} showSetter={setSelectedShowId}/>
>>>>>>> a7dcf95201f76ca2ec863d00507fcde1bf155189
                    :
                    ''
                }
                {
                    selectedShowId === 0 && displayedShows.length > 0
                    ?
                    <button className='btn btn--form u-margin-right-small u-margin-top-small' onClick={handleLoadMoreClick}>Load more</button>
                    :
                    ''
                }
            </div>
        </section>
    );
};