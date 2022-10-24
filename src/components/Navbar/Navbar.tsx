import React, { useState } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import logo from '../../content/svg/Logo.svg';
import magnifier from '../../content/svg/Magnifier-white.svg';

const Navbar = () => {
    const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <div className="navbar__logo_list">
                    <div className="navbar__logo logo">
                        <img className="logo__image" src={logo} alt="Logo" />
                    </div>
                    <ul className="navbar__list">
                        <li className="navbar__item">
                            <Link to={''}>
                                HOME <div />
                            </Link>
                        </li>
                        <li className="navbar__item">
                            <Link to={'/coin'}>
                                COINS LIST <div />
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar__search_bar">
                    {isSearchClicked ? (
                        <div className="search_bar">
                            <input
                                className="search_bar__input"
                                placeholder="Search currency..."
                                value={searchValue}
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                            />
                            <div
                                onClick={() => {
                                    setIsSearchClicked(false);
                                }}
                                className="search_bar__close"
                            >
                                <div className="search_bar__line search_bar__line1" />
                                <div className="search_bar__line search_bar__line2" />
                            </div>
                        </div>
                    ) : (
                        <div
                            onClick={() => {
                                setIsSearchClicked(true);
                            }}
                        >
                            <img
                                className="navbar__magnifier"
                                src={magnifier}
                                alt=""
                            />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
