import React from 'react';

export default function NavBar(props) {
  const view = props.view;
  let searchIcon = './images/search-solid.svg';
  let messageIcon = './images/envelope-open-text-solid.svg';
  let createPostIcon = './images/plus-black.png';
  let watchlistIcon = './images/fire-alt-solid.svg';
  let profileIcon = './images/user-alt-solid.svg';

  switch (view) {
    case 'search':
      searchIcon = './images/search-red.png';
      break;
    case 'message':
      messageIcon = './images/message-red.png';
      break;
    case 'create':
      createPostIcon = './images/plusicon-darkred.png';
      break;
    case 'watchlist':
      watchlistIcon = './images/fire-red.png';
      break;
    case 'profile':
      profileIcon = './images/user-red.png';
      break;
  }

  return (
    <div className="navbar bg-white fixed-bottom p-0">
      <div>
        <img id="search" className="nav-icon" src={searchIcon} onClick={() => props.setView('search')}></img>
      </div>
      <div>
        <img id="message" className="nav-icon" src={messageIcon} onClick={() => props.setView('message')}></img>
      </div>
      <div>
        <img id="create" className="nav-icon" src={createPostIcon} onClick={() => props.setView('create')}></img>
      </div>
      <div>
        <img id="watchlist" className="nav-icon" src={watchlistIcon} onClick={() => props.setView('watchlist')}></img>
      </div>
      <div>
        <img id="profile" className="nav-icon" src={profileIcon} onClick={() => props.setView('profile')}></img>
      </div>
    </div>
  );

}