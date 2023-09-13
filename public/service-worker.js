importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');
importScripts('https://cdnjs.cloudflare.com/ajax/libs/axios/0.24.0/axios.min.js');

// workbox.routing.registerRoute(
//   new RegExp('/api/.*'),
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: 'api-cache',
//   })
// );

// workbox.routing.registerRoute(
//   /\.(?:css|js|jsx|png|jpg|jpeg|gif|svg|ico)$/,
//   new workbox.strategies.NetworkFirst({
//     cacheName: 'static-assets',
//   })
// );

const maxSyncTimer = 600000; //10 min
const SW_VERSION = '1.0.0';
let syncState = true;
let syncTimer = 1000;

// self.addEventListener('message', (event) => {
//   if (event.data.type === 'GET_VERSION') {
//     event.ports[0].postMessage(SW_VERSION);
//   } else if (event.data.type === 'offline'){
//     syncState = true;
//     console.log("syncState is now " + syncState)
//   } 
// });

self.addEventListener('message', (event) => {
  if (event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage(SW_VERSION);
  } else if (event.data.type === 'offline') {
    syncState = true;
    console.log("syncState is now 66 " + syncState);

    // Reactivate the setInterval when syncState becomes true
    intervalId = setInterval(syncDataIfOnline, syncTimer);
  } 
});



let checkNote = true;
let checkImage = true;


self.addEventListener('install', () => {
  // Skip over the "waiting" lifecycle state, to ensure that our
  // new service worker is activated immediately, even if there's
  // another tab open controlled by our older service worker code.
  self.skipWaiting();
});

// self.clients.matchAll().then((clients) => {
//   clients.forEach((client) => {
//     // Send a message to the client
//     client.postMessage({ type: 'custom-message', data: 'Hello from the service worker!' });
//   });
// });

// Call the custom event function when needed


self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});



function syncNotesWithServer() {
  const dbName = 'notesDB';
  const objectStoreName = 'notes';
  const apiUrl = 'http://localhost:4000/addNote'; // API URL

  const dbRequest = indexedDB.open(dbName);

  dbRequest.onerror = (event) => {
    console.error('Failed to open IndexedDB:', event.target.error);
  };

  dbRequest.onupgradeneeded = (event) => {
    const db = event.target.result;

    if (!db.objectStoreNames.contains(objectStoreName)) {
      db.createObjectStore(objectStoreName, { keyPath: 'timestamp' });
    }
  };

  dbRequest.onsuccess = async (event) => {
    const db = event.target.result;
    

    if (!db.objectStoreNames.contains(objectStoreName)) {
      console.log(`Object store '${objectStoreName}' does not exist :(.`);
      syncState = false;
      notifyClient();
      return;
    }

    const transaction = db.transaction([objectStoreName], 'readonly');
    const store = transaction.objectStore(objectStoreName);
    const request = store.getAll();

    request.onsuccess = async  (e) => {
      const dataToSync = e.target.result;
      if (dataToSync.length > 0) {
        const syncData = async (item) => {
          try {
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ text: item.text, timecode: Date.now() }),
              
            });

            if (response.ok) {
              console.log('Data synced with server:', await response.json());

              // Remove synced data from IndexedDB
              const deleteTransaction = db.transaction([objectStoreName], 'readwrite');
              const deleteStore = deleteTransaction.objectStore(objectStoreName);
              deleteStore.delete(item.timestamp);
              deleteTransaction.oncomplete = () => {
                console.log('Synced data removed from IndexedDB > ' + item.timestamp);
              };
            } else {
              console.error('Error syncing data with server:', response.statusText);
            }
          } catch (error) {
            console.error('Error syncing data with server:', error);
          }
        };
        dataToSync.forEach(syncData);
      }else {
        console.log("No Notes to be synced :)");
        syncState = false;
        notifyClient();
      }
    };
  };
}

function syncImagesWithServer() {
  console.log("image caled!")
  const dbName = 'imagesDB';
  const objectStoreName = 'images';
  const apiUrl = 'http://localhost:4000/uploadImage'; // API URL

  const dbRequest = indexedDB.open(dbName);

  dbRequest.onerror = (event) => {
    console.error('Failed to open IndexedDB:', event.target.error);
  };

  dbRequest.onupgradeneeded = (event) => {
    const db = event.target.result;

    if (!db.objectStoreNames.contains(objectStoreName)) {
      db.createObjectStore(objectStoreName, { keyPath: 'timestamp' });
    }
  };

  dbRequest.onsuccess = async (event) => {
    const db = event.target.result;

    if (!db.objectStoreNames.contains(objectStoreName)) {
      console.log(`Object store '${objectStoreName}' does not exist yet.`);
      syncState = false;
      return;
    }

    const transaction = db.transaction([objectStoreName], 'readonly');
    const store = transaction.objectStore(objectStoreName);
    const request = store.getAll();

    request.onsuccess = async  (e) => {
      const dataToSync = e.target.result;
      if (dataToSync.length > 0) {
        const syncData = async (item) => {
          try {
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ imageText: item.data, timestamp: Date.now() }),
            });

            if (response.ok) {
              console.log('Images synced with server:', await response.json());

              // Remove synced data from IndexedDB
              const deleteTransaction = db.transaction([objectStoreName], 'readwrite');
              const deleteStore = deleteTransaction.objectStore(objectStoreName);
              deleteStore.delete(item.timestamp);
              deleteTransaction.oncomplete = () => {
                console.log('Synced data removed from IndexedDB > ' + item.timestamp);
              };
            } else {
              console.error('Error syncing data with server:', response.statusText);
            }
          } catch (error) {
            console.error('Error syncing data with server:', error);
          }
        };
        dataToSync.forEach(syncData);
      }else {
        console.log("No Images to be synced :)");
        syncState = false;
      }
    };
  };
}

function increaseSyncTimer() {
  if (syncTimer < maxSyncTimer) {
    syncTimer *= 2; // Double the sync timer value
  } else {
    syncTimer = maxSyncTimer; // Set it to the maximum if it exceeds the limit
  }
}

function resetSyncTimer() {
  syncTimer = 1000; // Reset the sync timer to its initial value
}

let intervalId;
const syncDataIfOnline = () => {
  console.log("sync initiated! " + syncState)
  if (navigator.onLine && syncState) {
    syncNotesWithServer();
    syncImagesWithServer();
  } else if(navigator.offLine || !syncState) {
    console.log("Stopping set Interval")
    clearInterval(intervalId);
    resetSyncTimer();
  }
  increaseSyncTimer();
  console.log("Timer is now set to - " + syncTimer);
};

intervalId = setInterval(syncDataIfOnline, syncTimer);

self.addEventListener('message', (event) => {
  if (event.data.type === 'resetSync') {
    resetSyncTimer()
    console.log("Timer is now resetted");
  } 
});


function notifyClient(){
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({ type: 'data-sync-complete', message: 'Data Sync completed' });
    });
  });  
}



