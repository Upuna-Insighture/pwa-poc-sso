const storeNoteLocally = (note) => {
  const dbName = 'notesDB';
  const dbVersion = 1;
  const objectStoreName = 'notes';
  const request = indexedDB.open(dbName, dbVersion);

  request.onerror = (event) => {
    console.error('Failed to open IndexedDB:', event.target.error);
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction([objectStoreName], 'readwrite');
    const store = transaction.objectStore(objectStoreName);
    const newNote = {
      text: note.text,
      timestamp: Date.now(),
      type: "note",
    };

    store.add(newNote);
    transaction.oncomplete = () => {
      console.log('Note saved locally to IndexedDB:', newNote);
    };
  };

  request.onupgradeneeded = (event) => {
    const db = event.target.result;

    if (!db.objectStoreNames.contains(objectStoreName)) {
      db.createObjectStore(objectStoreName, { keyPath: 'timestamp' });
    }
  };
};

const storeImageLocally = (base64Image) =>{
  const dbName = 'imagesDB';
  const dbVersion = 1;
  const objectStoreName = 'images';
  const request = indexedDB.open(dbName, dbVersion);

  request.onerror = (event) => {
    console.error('Failed to open IndexedDB:', event.target.error);
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction([objectStoreName], 'readwrite');
    const store = transaction.objectStore(objectStoreName);
    const newImage = {
      data: base64Image,
      timestamp: Date.now(),
      type: "image",
    };

    store.add(newImage);
    transaction.oncomplete = () => {
      console.log('Image saved locally to IndexedDB:', newImage);
    };
  };

  request.onupgradeneeded = (event) => {
    const db = event.target.result;

    if (!db.objectStoreNames.contains(objectStoreName)) {
      db.createObjectStore(objectStoreName, { keyPath: 'timestamp' });
    }
  };
}


export { storeNoteLocally, storeImageLocally };