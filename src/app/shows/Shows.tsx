import { useState, useEffect } from 'react';

import { ShowCollection } from './ShowCollection/ShowCollection';

import './Shows.scss';

import {ShowModel, GENRE, genres} from '../models/Show';
import { LoaderBar } from '../LoaderBar/LoaderBar';

export const Shows = () => {
    const initialShows: ShowModel[] = [];

    const [natureShows, setNatureShows] = useState(initialShows);
    const [familyShows, setFamilyShows] = useState(initialShows);
    const [childrenShows, setChildrenShows] = useState(initialShows);
    const [foodShows, setFoodShows] = useState(initialShows);
    const [sportsShows, setSportsShows] = useState(initialShows);
    const [travelShows, setTravelShows] = useState(initialShows);
    const [historyShows, setHistoryShows] = useState(initialShows);
    const [legalShows, setLegalShows] = useState(initialShows);
    const [medicalShows, setMedicalShows] = useState(initialShows);
    const [warShows, setWarShows] = useState(initialShows);
    const [actionShows, setActionShows] = useState(initialShows);
    const [comedyShows, setComedyShows] = useState(initialShows);
    const [crimeShows, setCrimeShows] = useState(initialShows);
    const [dramaShows, setDramaShows] = useState(initialShows);
    const [espionageShows, setEspionageShows] = useState(initialShows);
    const [musicShows, setMusicShows] = useState(initialShows);
    const [romanceShows, setRomanceShows] = useState(initialShows);

    const allShows = [
        {shows: dramaShows, genreName: GENRE.DRAMA}, 
        {shows: natureShows, genreName: GENRE.NATURE}, 
        {shows: familyShows, genreName: GENRE.FAMILY}, 
        {shows: childrenShows, genreName: GENRE.CHILDREN}, 
        {shows: foodShows, genreName: GENRE.FOOD}, 
        {shows: sportsShows, genreName: GENRE.SPORTS}, 
        {shows: historyShows, genreName: GENRE.HISTORY}, 
        {shows: travelShows, genreName: GENRE.TRAVEL}, 
        {shows: legalShows, genreName: GENRE.LEGAL}, 
        {shows: medicalShows, genreName: GENRE.MEDICAL}, 
        {shows: warShows, genreName: GENRE.WAR}, 
        {shows: actionShows, genreName: GENRE.ACTION}, 
        {shows: comedyShows, genreName: GENRE.COMEDY}, 
        {shows: crimeShows, genreName: GENRE.CRIME}, 
        {shows: espionageShows, genreName: GENRE.ESPIONAGE}, 
        {shows: musicShows, genreName: GENRE.MUSIC}, 
        {shows: romanceShows, genreName: GENRE.ROMANCE}
    ];

    function sortShows(shows: ShowModel[]) {
        const localShows = {
            localNatureShows: [] as ShowModel[],
            localFamilyShows: [] as ShowModel[],
            localChildrenShows: [] as ShowModel[],
            localFoodShows: [] as ShowModel[],
            localSportsShows: [] as ShowModel[],
            localTravelShows: [] as ShowModel[],
            localHistoryShows: [] as ShowModel[],
            localLegalShows: [] as ShowModel[],
            localMedicalShows: [] as ShowModel[],
            localWarShows: [] as ShowModel[],
            localActionShows: [] as ShowModel[],
            localComedyShows: [] as ShowModel[],
            localCrimeShows: [] as ShowModel[],
            localDramaShows: [] as ShowModel[],
            localEspionageShows: [] as ShowModel[],
            localMusicShows: [] as ShowModel[],
            localRomanceShows: [] as ShowModel[],
        }

        shows.forEach(show => {
           for (let genre of show.genres) {
            if(genre === GENRE.NATURE){
                localShows.localNatureShows.push(show);
            }
            else if(genre === GENRE.FAMILY){
                localShows.localFamilyShows.push(show);
            }
            else if(genre === GENRE.CHILDREN){
                localShows.localChildrenShows.push(show);
            }
            else if(genre === GENRE.FOOD){
                localShows.localFoodShows.push(show);
            }
            else if(genre === GENRE.SPORTS){
                localShows.localSportsShows.push(show);
            }
            else if(genre === GENRE.TRAVEL){
                localShows.localTravelShows.push(show);
            }
            else if(genre === GENRE.HISTORY){
                localShows.localHistoryShows.push(show);
            }
            else if(genre === GENRE.LEGAL){
                localShows.localLegalShows.push(show);
            }
            else if(genre === GENRE.MEDICAL){
                localShows.localMedicalShows.push(show);
            }
            else if(genre === GENRE.WAR){
                localShows.localWarShows.push(show);
            }
            else if(genre === GENRE.ACTION){
                localShows.localActionShows.push(show);
            }
            else if(genre === GENRE.COMEDY){
                localShows.localComedyShows.push(show);
            }
            else if(genre === GENRE.CRIME){
                localShows.localCrimeShows.push(show);
            }
            else if(genre === GENRE.DRAMA){
                localShows.localDramaShows.push(show);
            }
            else if(genre === GENRE.ESPIONAGE){
                localShows.localEspionageShows.push(show);
            }
            else if(genre === GENRE.MUSIC){
                localShows.localMusicShows.push(show);
            }
            else if(genre === GENRE.ROMANCE){
                localShows.localRomanceShows.push(show);
            }
           }
        });
        
        setNatureShows(localShows.localNatureShows);
        setFamilyShows(localShows.localFamilyShows);
        setChildrenShows(localShows.localChildrenShows);
        setFoodShows(localShows.localFoodShows);
        setSportsShows(localShows.localSportsShows);
        setTravelShows(localShows.localTravelShows);
        setHistoryShows(localShows.localHistoryShows);
        setLegalShows(localShows.localLegalShows);
        setMedicalShows(localShows.localMedicalShows);
        setWarShows(localShows.localWarShows);
        setActionShows(localShows.localActionShows);
        setComedyShows(localShows.localComedyShows);
        setCrimeShows(localShows.localCrimeShows);
        setDramaShows(localShows.localDramaShows);
        setEspionageShows(localShows.localEspionageShows);
        setMusicShows(localShows.localMusicShows);
        setRomanceShows(localShows.localRomanceShows);
    }

    useEffect(() => {
        fetch(`https://api.tvmaze.com/shows?page=${1}`)
        .then(response => response.json())
        .then(shows => {
            const filteredShows = shows.filter((show: ShowModel) => {
                for (let j = 0; j < show.genres.length; j++) {
                    if (genres.includes(show.genres[j])) {
                        return show;
                    }
                }
            });
            sortShows(filteredShows);
        });
    }, []);
    
    return (
        <main className="shows">
            <div className='shows__hero' style={{backgroundImage: "url('./assets/bg.jpeg')"}}>&nbsp;</div>
            <article className='shows__collections'>
                {
                allShows.length !== 0
                ?
                allShows.map((showCollection, index) => {
                    return showCollection.shows.length !== 0 ? <ShowCollection key={index} title={showCollection.genreName} showCollection={showCollection.shows}/> : ''
                })
                :
                <LoaderBar/>
                }
            </article>
        </main>
    );
};