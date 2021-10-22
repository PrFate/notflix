import { Link } from "react-router-dom";

import { RootState } from "../../reducers/root";
import { useSelector } from "react-redux";

import { HeaderLink } from "./HeaderLink/HeaderLink";

import './Header.scss';

export const Header = () => {
    const userId = useSelector((state: RootState) => state.user._id);
    const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);

    return (
        <header className="navigation">
        <nav className="navigation__nav">
            <Link to='/' className="navigation__logo">
                <img src='../assets/logoheader.svg' alt='Notflix logo'/>
            </Link>
            <ul className="navigation__list">
                <HeaderLink path='/'>HOME</HeaderLink>
                <HeaderLink path='/shows'>SHOWS</HeaderLink>
                <HeaderLink path='/friends'>FRIENDS</HeaderLink>
                {isLoggedIn ? <HeaderLink path={`/library/${userId}`}>LIBRARY</HeaderLink> : ''}
                <HeaderLink path='/profile'>PROFILE</HeaderLink>
            </ul>
            <div className="navigation__utilities">
                <Link to='/search' className='navigation__search'>
                    <img className="navigation__search-icon" src='../assets/search.svg' alt='Magnifying glass'/>
                </Link>
                <Link to='/signin'>
                    <button className="btn btn-primary btn--dark-grey">Sign In</button>
                </Link>
            </div>
        </nav>
    </header>
    );
}