// // // import React, { useState, useEffect } from 'react';

// // // const MeetList = () => {
// // //   const [meetings, setMeetings] = useState([]);

// // //   const fetchMeetings = async () => {
// // //     try {
// // //       const response = await fetch('your-api-endpoint');
// // //       const data = await response.json();

// // //       setMeetings(data);
// // //     } catch (error) {
// // //       console.error('Error fetching meetings:', error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchMeetings();
// // //   }, []);

// // //   const handleGetMeetInfo = (meetingId) => {
// // //     console.log(`Redirect to get meeting info for meeting with id: ${meetingId}`);
// // //   };

// // //   return (
// // //     <div className="meet-list-container">
// // //       <h2>Meeting List</h2>
// // //       <div className="meetings-container">
// // //         {meetings.map(meeting => (
// // //           <div key={meeting.code} className="meeting-item">
// // //             <p>{meeting.date}</p>
// // //             <button onClick={() => handleGetMeetInfo(meeting.id)}>Get Info</button>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default MeetList;
// // import React from 'react';
// // import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// // import Dashboard from './Dashboard';
// // import MeetList from './MeetList';
// // import MeetInfo from './MeetInfo';
// // import './logout.css';

// // export default function LogoutPage({ user, onSignOut }) {
// //   const handleNewMeetClick = () => {
// //     console.log("Starting a new meet...");
// //   };

// //   return (
// //     <Router>
// //       <div className="logout-container">
// //         {user && (
// //           <>
// //             <div className='Navbar'>
// //               <div className='dashboard-section'>
// //                 <span className='dashboard-title'>DASHBOARD</span>
// //               </div>
// //               <div className='new-meet-section'>
// //                 <button className='new-meet-button' onClick={handleNewMeetClick}>NEW</button>
// //               </div>
// //               <div className='user-info-section'>
// //                 <div className='user-info'>
// //                   <span className='username'>{user.name}</span>
// //                   <span className='email'>{user.email}</span>
// //                 </div>
// //               </div>
// //               <div className='profile-picture-section'>
// //                 <img src={user.picture} alt="Profile" className='profile-photo' />
// //               </div>
// //             </div>
// //             <hr className='line'></hr>
// //             <Route exact path="/" component={MeetList} />
// //             <Route path="/meetinfo/:id" component={MeetInfo} />
// //             <hr className='line'></hr>
// //             <button onClick={onSignOut} className="sign-out-button">Sign Out</button>
// //             <Dashboard user={user} />
// //           </>
// //         )}
// //       </div>
// //     </Router>
// //   );
// // }
// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';

// // const MeetList = () => {
// //   const [meetings, setMeetings] = useState([]);

// //   const fetchMeetings = async () => {
// //     try {
// //       // Make an API call to fetch meetings from MongoDB
// //       const response = await fetch('mongodb+srv://kaloa2025:aalok21004@cluster0.xgpa9vt.mongodb.net/meetdata?retryWrites=true&w=majority&appName=Cluster0');
// //       const data = await response.json();
// //       setMeetings(data);
// //     } catch (error) {
// //       console.error('Error fetching meetings:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchMeetings();
// //   }, []);

// //   return (
// //     <div className="meet-list-container">
// //       <h2>Meeting List</h2>
// //       <div className="meetings-container">
// //         {meetings.map(meeting => (
// //           <div key={meeting.title} className="meeting-item">
// //             <p>{meeting.date}</p>
// //             <Link to={`/meetinfo/${meeting.title}`}>
// //               <button>Get Info</button>
// //             </Link>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MeetList;

// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';

// // const MeetList = () => {
// //   const [meetings, setMeetings] = useState([]);

// //   useEffect(() => {
// //     const fetchMeetings = async () => {
// //       try {
// //         const response = await fetch('http://localhost:5000/api/meetinfo'); // Update URL as per your backend
// //         const data = await response.json();
// //         setMeetings(data);
// //       } catch (error) {
// //         console.error('Error fetching meetings:', error);
// //       }
// //     };
// //     fetchMeetings();
// //   }, []);

// //   return (
// //     <div className="meet-list-container">
// //       <h2>Meeting List</h2>
// //       <div className="meetings-container">
// //         {meetings.map(meeting => (
// //           <div key={meeting._id} className="meeting-item"> {/* Assuming _id is the unique identifier */}
// //             <p>{meeting.title}</p>
// //             <p>{meeting.date}</p>
// //             <Link to={`/meetinfo/${meeting._id}`}>
// //               <button>Get Info</button>
// //             </Link>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MeetList;


import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function MeetList() {
  const[meets,setMeet]=useState([])
  useEffect(()=>{
    axios.get('http://localhost:5000/meetinfo')
    .then(meets=>setMeet(meets.data))
    .catch(err=>console.log(err))
  },[])

  return (
    <div className="meet-list-container">
       <h2>Meeting List</h2>
       <div className="meetings-container">
       <ul>
        {meets.map(meet => (
          <li key={meet.code}>
            {meet.title} on {meet.date}
            <Link to={`/meetinfo/${meet.code}`}>
              <button>Get Info</button>
            </Link>
            </li>
        ))}
        </ul>
      </div>
    </div>
  )
}
