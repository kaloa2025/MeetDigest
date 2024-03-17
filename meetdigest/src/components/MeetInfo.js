// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';

// const MeetInfo = () => {
//   const { id } = useParams();
//   const [meetingDetails, setMeetingDetails] = useState(null);

//   useEffect(() => {
//     // Fetch meeting details from MongoDB or any other data source
//     const fetchMeetingDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/meetinfo/${id}`); // Update URL as per your backend
//         const data = await response.json();
//         setMeetingDetails(data);
//       } catch (error) {
//         console.error('Error fetching meeting details:', error);
//       }
//     };
    

//     fetchMeetingDetails();
//   }, [id]);

//   if (!meetingDetails) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="meet-info-container">
//       <h2>Meeting Information</h2>
//       <div className="row">
//         <div className="column" style={{ width: "75%" }}>
//           <h3>Summary</h3>
//           <p>{meetingDetails.summary}</p>
//           <h3>Participants</h3>
//           <ul>
//             {meetingDetails.participants.map((participant, index) => (
//               <li key={index}>{participant}</li>
//             ))}
//           </ul>
//         </div>
//         <div className="column" style={{ width: "25%" }}>
//           <h3>Duration</h3>
//           <p>{meetingDetails.duration}</p>
//           <h3>Download Audio</h3>
//           <a href={meetingDetails.audioFileUrl} download>Download</a>
//         </div>
//       </div>
//       <div className="row">
//         <div className="column">
//           <h3>Speakers Time</h3>
//           <div>
//             {/* Display bar chart or other visualization for speakers time */}
//           </div>
//         </div>
//         <div className="column">
//           <h3>Other Hosts</h3>
//           <ul>
//             {/* {meetingDetails.otherHosts.map((host, index) => (
//               <li key={index}>{host}</li>
//             ))} */}
//           </ul>
//         </div>
//       </div>
//       {/* Audio player */}
//       {/* <audio controls>
//         <source src={meetingDetails.audioFileUrl} type="audio/mp3" />
//         Your browser does not support the audio element.
//       </audio> */}
//       <Link to="/">Back</Link>
//     </div>
//   );
// };

// export default MeetInfo;

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const MeetInfo = () => {
    const { code } = useParams();
    const [meetingDetails, setMeetingDetails] = useState(null);

    useEffect(() => {
        const fetchMeetingDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/meetinfo/${code}`); // Update URL as per your backend
                const data = await response.json();
                setMeetingDetails(data);
            } catch (error) {
                console.error('Error fetching meeting details:', error);
            }
        };

        fetchMeetingDetails();
    }, [id]);

    if (!meetingDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="meet-info-container">
            <h2>Meeting Information</h2>
            <h3>Title: {meetingDetails.title}</h3>
            <p>Date: {meetingDetails.date}</p>
            {/* Display other meeting details */}
            <Link to="/">Back</Link>
        </div>
    );
};

export default MeetInfo;
