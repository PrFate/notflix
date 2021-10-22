import {Link} from 'react-router-dom';

type Props = {
    children: JSX.Element | string,
    path: string
};

export const HeaderLink = ({children, path}: Props) => {
    return (
        <li className="navigation__item">
            <Link to={path} className="navigation__link">{children}</Link>
        </li>
    );
}