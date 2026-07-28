(function () {
  const DB_NAME = "songglow_music_library";
  const STORE_NAME = "songs";
  const DB_VERSION = 1;

  function promisifyRequest(request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
          store.createIndex("updatedAt", "updatedAt");
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function withStore(mode, callback) {
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, mode);
    const store = transaction.objectStore(STORE_NAME);
    const result = await callback(store);

    await new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });

    db.close();
    return result;
  }

  function normalizeSong(song) {
    const now = Date.now();
    return {
      id: song.id || `song_${now}`,
      title: song.title || "未命名歌曲",
      artist: song.artist || "未知歌手",
      difficulty: song.difficulty || "未设置",
      tags: Array.isArray(song.tags) ? song.tags : [],
      focus: song.focus || "上传后可在后台继续补充学习重点。",
      goal: song.goal || "上传后可继续配置学习目标。",
      context: song.context || "这是一首来自后台曲库的歌曲，你可以继续补充歌词时间轴和精讲内容。",
      exercises: Array.isArray(song.exercises) ? song.exercises : [],
      lines: Array.isArray(song.lines) ? song.lines : [],
      audioBlob: song.audioBlob || null,
      audioFileName: song.audioFileName || "",
      audioType: song.audioType || "",
      coverBlob: song.coverBlob || null,
      coverType: song.coverType || "",
      createdAt: song.createdAt || now,
      updatedAt: now
    };
  }

  async function saveSong(song) {
    const normalized = normalizeSong(song);
    await withStore("readwrite", (store) => promisifyRequest(store.put(normalized)));
    return normalized;
  }

  async function getAllSongs() {
    const songs = await withStore("readonly", (store) => promisifyRequest(store.getAll()));
    return songs.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  }

  async function getSongById(id) {
    return withStore("readonly", (store) => promisifyRequest(store.get(id)));
  }

  async function deleteSong(id) {
    return withStore("readwrite", (store) => promisifyRequest(store.delete(id)));
  }

  window.MusicLibraryDB = {
    openDatabase,
    saveSong,
    getAllSongs,
    getSongById,
    deleteSong
  };
})();
