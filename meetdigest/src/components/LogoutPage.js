import React from 'react';
import MeetList from './MeetList';
import './logout.css';

export default function LogoutPage({ user, onSignOut }) {
  const handleNewMeetClick = () => {
    window.location.href = 'https://meet.google.com/new';
    console.log("Starting a new meet...");
  };

  return (
    <div className="logout-container">
      {user && (
        <>
          <div className='Navbar'>
            <div className='dashboard-section'>
              <span className='dashboard-title'>DASHBOARD</span>
            </div>
            <div className='new-meet-section'>
              <button className='new-meet-button' onClick={handleNewMeetClick}>NEW</button>
            </div>
            <div className='user-info-section'>
              <div className='user-info'>
                <span className='username'>{user.name}</span>
                <span className='email'>{user.email}</span>
              </div>
            </div>
            <div className='profile-picture-section'>
              <img src={user.picture} alt="Profile" className='profile-photo' />
            </div>
          </div>
          <hr className='line'></hr>
          <MeetList/>
          <hr className='line'></hr>
          <button onClick={onSignOut} className="sign-out-button">Sign Out</button>
        </>
      )}
    </div>
  );
}
