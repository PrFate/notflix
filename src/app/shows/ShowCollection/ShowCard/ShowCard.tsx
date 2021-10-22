import { useEffect, useState } from 'react';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import {ShowModel} from '../../../models/Show';

interface Props {
    showInfo: ShowModel;
<<<<<<< HEAD
    showSetter: React.Dispatch<React.SetStateAction<ShowModel>>;
    showIdSetter: React.Dispatch<React.SetStateAction<number>>;
}

export const ShowCard = ({showInfo, showSetter, showIdSetter}: Props) => {
    // const [show, setShow] = useState({} as ShowModel);

    function handleShowCardClick() {
        showSetter(showInfo);
        showIdSetter(showInfo.id);
    }

    // useEffect(() => {
    //     setShow(showInfo);
    // }, []);
=======
    showSetter: React.Dispatch<React.SetStateAction<number>>;
}

export const ShowCard = ({showInfo, showSetter}: Props) => {
    const [show, setShow] = useState({} as ShowModel);

    function handleShowCardClick() {
        showSetter(show.id);
    }

    useEffect(() => {
        setShow(showInfo);
    }, []);
>>>>>>> a7dcf95201f76ca2ec863d00507fcde1bf155189

    return (
        showInfo.image
        ?
        <div className='shows__card' onClick={handleShowCardClick}>
            <LazyLoadImage
                effect="blur"
                className='shows__card-img'
                src={showInfo.image.original}
                alt={`${showInfo.id}`} />
        </div>
        :
        <div className='shows__card'>
            No poster for this show    
        </div>
    );
};