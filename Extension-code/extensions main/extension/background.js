const fs = require('fs');
const { MongoClient } = require('mongodb');

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message.type)

    if (message.type == "save_and_download") {
        chrome.storage.local.set(
            {
                transcript: message.transcript,
                meetingTitle: message.meetingTitle,
                meetingStartTimeStamp: message.meetingStartTimeStamp
            },
            async function () {
                console.log("Saved transcript and meta data, downloading now if non empty")
                if (message.transcript.length > 0)
                    downloadTranscript()
                    await sendDataToMongoDB(result.meetingTitle, result.meetingStartTimeStamp);
            })
    }
    if (message.type == "download") {
        downloadTranscript()
        
    }
    return true
})

async function downloadTranscript() {
    chrome.storage.local.get(["transcript", "meetingTitle", "meetingStartTimeStamp"], function (result) {
        if (result.transcript) {
            const fileName = result.meetingTitle && result.meetingStartTimeStamp ? `TranscripTonic/Transcript-${result.meetingTitle} at ${result.meetingStartTimeStamp}.txt` : `TranscripTonic/Transcript.txt`
            

            // Create an array to store lines of the text file
            const lines = [];

            // Iterate through the transcript array and format each entry
            result.transcript.forEach(entry => {
                lines.push(entry.personName + ':');
                lines.push(entry.personTranscript);
                lines.push(''); // Add an empty line between entries
            });

            // lines.push("---")
            // lines.push("Transcript saved using TranscripTonic Chrome extension (https://chromewebstore.google.com/detail/ciepnfnceimjehngolkijpnbappkkiag)")


            // Join the lines into a single string
            const textContent = lines.join('\n');

            // Create a Blob from the text content
            const blob = new Blob([textContent], { type: 'text/plain' });

            sendFile(filename);
            // Create a download
            // Use Chrome Download API
            chrome.downloads.download({
                url: 'data:text/plain;base64,' + encodeUnicodeString(textContent),
                filename: fileName,
                conflictAction: 'uniquify' // Automatically rename the file if it already exists
            }).then(() => {
                console.log("Transcript downloaded to TranscripTonic directory")
            }).catch((error) => {
                console.log(error)
                chrome.downloads.download({
                    url: 'data:text/plain;base64,' + encodeUnicodeString(textContent),
                    filename: "TranscripTonic/Transcript.txt",
                    conflictAction: 'uniquify' // Automatically rename the file if it already exists
                })
                console.log("Invalid file name. Transcript downloaded to TranscripTonic directory with simple file name.")
            })
        }
        else
            console.log("No transcript found")
    })
}

async function sendDataToMongoDB(title, dateTime) {
    try {
        const response = await fetch('http://localhost:5000/meetDetailinsert', {
            method: 'post',
            body: JSON.stringify({ title, dateTime }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error sending data to MongoDB: ${response.statusText}`);
        }

        console.log("Meeting details sent to MongoDB successfully:", await response.json());
    } catch (error) {
        console.error("Error sending data to MongoDB:", error);
        // Handle errors appropriately (e.g., retry, notify user)
    }
}


// Thanks to @ifTNT(https://github.com/vivek-nexus/transcriptonic/pull/4)
function encodeUnicodeString(text) {
    const utf8Bytes = new TextEncoder().encode(text)
    const binaryString = String.fromCodePoint(...utf8Bytes);
    return btoa(binaryString);
}

// await sendDataToMongoDB(title, dateTime);
const sendFile = async (filename) => {
    const filePath = `C:/Users/ASUS/Downloads/TranscripTonic/${filename}`;
    try {
        const fileContent = await readFile(filePath);
        await insertDataToMongoDB(fileContent);
    } catch (err) {
        console.error('Error:', err);
    }
};
const readFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
const insertDataToMongoDB = async (data) => {
    try {
        // Connection URI
        const uri = 'mongodb://localhost:27017';

        // Database Name
        const dbName = 'MeetDigest';

        // Collection Name
        const collectionName = 'meetDetails';

        // Connect to the MongoDB server
        const client = new MongoClient(uri);

        await client.connect();

        // Access the database
        const db = client.db(dbName);

        // Access the collection
        const collection = db.collection(collectionName);

        // Insert the data as a document in the collection
        await collection.insertOne({ content: data });

        console.log('Data inserted successfully');

        // Close the connection
        await client.close();
    } catch (err) {
        console.error('Error:', err);
    }
};