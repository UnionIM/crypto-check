import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../content/svg/Logo.svg';
import magnifier from '../../content/svg/Magnifier-white.svg';
import useDebounce from '../../hooks/useDebounce';
import { ISearchedCoin } from '../../models/crypto';
import List from '../List/List';
import CryptoController from '../../controllers/crypto.controller';
import LightItem from '../List/ListItems/LightItem/LightItem';

const Navbar = () => {
    const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchedCoins, setSearchedCoins] = useState<ISearchedCoin[]>([]);
    const nav = useNavigate();

    const debounce = useDebounce(searchValue, 500);

    useEffect(() => {
        if (debounce) {
            CryptoController.searchForCrypto(debounce).then((r) => {
                setSearchedCoins(r.coins);
            });
        } else {
            setSearchedCoins([]);
        }
    }, [debounce]);

    const searchHandler = (value: string) => {
        nav(`coin-list/${value}`);
    };

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
                            <Link to={'/coin-list'}>
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
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter') {
                                        searchHandler(searchValue);
                                    }
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
                    <div
                        className="navbar__searched_container"
                        style={
                            searchValue &&
                            isSearchClicked &&
                            searchedCoins.length > 0
                                ? { opacity: 1 }
                                : { opacity: 0 }
                        }
                    >
                        <div className="navbar__searched_list">
                            <List
                                items={searchedCoins.filter((coin) => {
                                    return coin.name
                                        .toLowerCase()
                                        .startsWith(searchValue);
                                })}
                                renderItem={(item) => (
                                    <Link
                                        className="navbar__coin_item"
                                        to={`coins/${item.id}/overview`}
                                    >
                                        <LightItem coin={item} />
                                    </Link>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
