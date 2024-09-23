import { Workbox } from "workbox-window";
const wb = new Workbox('/service-worker.js');
wb.register();

const storeNoteLocally = (note) => {
  const dbName = 'notesDB';
  const dbVersion = 1;
  const objectStoreName = 'notes';
  const request = indexedDB.open(dbName, dbVersion);
 

  request.onerror = (event) => {
    console.error('Failed to open IndexedDB:', event.target.error);
  };

  request.onupgradeneeded = (event) => {
    const db = event.target.result;

    if (!db.objectStoreNames.contains(objectStoreName)) {
      // Create the object store if it doesn't exist
      const objectStore = db.createObjectStore(objectStoreName, { keyPath: 'timestamp' });

      // You can also define indexes for the object store if needed
      // objectStore.createIndex('text', 'text', { unique: false });
    }
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    
    // Check if the object store exists before opening a transaction
    if (db.objectStoreNames.contains(objectStoreName)) {
      const transaction = db.transaction([objectStoreName], 'readwrite');
      const store = transaction.objectStore(objectStoreName);
      const newNote = {
        text: note.text,
        timestamp: Date.now(),
        type: "note",
      };

      store.add(newNote);
      transaction.oncomplete = async () => {
        console.log('Note saved locally to IndexedDB:', newNote);
        const response = await wb.messageSW({type: 'offline'});
      };
    } else {
      console.error(`Object store '${objectStoreName}' does not exist.`);
    }
  };
};

const storeImageLocally = (base64Image) => {
  const dbName = 'imagesDB';
  const dbVersion = 1;
  const objectStoreName = 'images';
  const request = indexedDB.open(dbName, dbVersion);

  request.onerror = (event) => {
    console.error('Failed to open IndexedDB:', event.target.error);
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    
    // Check if the object store exists before opening a transaction
    if (db.objectStoreNames.contains(objectStoreName)) {
      const transaction = db.transaction([objectStoreName], 'readwrite');
      const store = transaction.objectStore(objectStoreName);
      const newImage = {
        data: base64Image,
        timestamp: Date.now(),
        type: "image",
      };

      store.add(newImage);
      transaction.oncomplete = async () => {
        console.log('Image saved locally to IndexedDB:', newImage);
        const response = await wb.messageSW({type: 'offline'});
      };
    } else {
      console.error(`Object store '${objectStoreName}' does not exist.`);
    }
  };
};

export { storeNoteLocally, storeImageLocally };