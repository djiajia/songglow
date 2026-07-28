const songForm = document.getElementById("song-form");
const libraryCount = document.getElementById("library-count");
const libraryListContainer = document.getElementById("library-list-container");
const saveStatus = document.getElementById("save-status");

function parseTextLines(text) {
  return text
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseLyrics(text) {
  const rows = parseTextLines(text);
  return rows.map((row) => {
    const [start, end, en, zh] = row.split("|");
    return {
      start: Number(start || 0),
      end: Number(end || 0),
      title: (en || "").trim() || "未填写歌词",
      subtitle: (zh || "").trim() || "未填写翻译",
      summary: "这首歌来自后台上传，建议继续在后台补充逐句精讲内容。",
      vocab: "可在后续版本里为后台增加逐句词汇编辑能力。",
      phrase: "可在后续版本里为后台增加逐句词组编辑能力。",
      background: "当前版本已支持从后台上传音频并在前台读取播放。"
    };
  });
}

async function renderLibrary() {
  const songs = await window.MusicLibraryDB.getAllSongs();
  libraryCount.textContent = `${songs.length} 首`;

  if (!songs.length) {
    libraryListContainer.innerHTML = `
      <div class="empty-library">
        <h3>还没有上传歌曲</h3>
        <p>先上传一首你自己的音频文件，前台就会把它加入歌曲列表并支持播放。</p>
      </div>
    `;
    return;
  }

  libraryListContainer.innerHTML = songs
    .map(
      (song) => `
        <article class="library-card">
          <div class="library-meta">
            <div class="mini-label">后台曲库</div>
            <h3>${song.title}</h3>
            <p>${song.artist} · ${song.difficulty || "未设置难度"}</p>
            <p>音频文件：${song.audioFileName || "未命名文件"}</p>
            <p>歌词行数：${Array.isArray(song.lines) ? song.lines.length : 0}</p>
          </div>
          <div class="library-actions">
            <button class="secondary-button library-delete" data-id="${song.id}">删除</button>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll(".library-delete").forEach((button) => {
    button.addEventListener("click", async () => {
      await window.MusicLibraryDB.deleteSong(button.dataset.id);
      saveStatus.textContent = "已删除歌曲，前台刷新后会同步更新曲库。";
      renderLibrary();
    });
  });
}

if (songForm) {
  songForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(songForm);
    const audioFile = formData.get("audio");
    const coverFile = formData.get("cover");

    if (!(audioFile instanceof File) || !audioFile.size) {
      saveStatus.textContent = "请先选择一个音频文件。";
      return;
    }

    const song = {
      title: String(formData.get("title") || "").trim(),
      artist: String(formData.get("artist") || "").trim(),
      difficulty: String(formData.get("difficulty") || "").trim(),
      tags: String(formData.get("tags") || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      focus: String(formData.get("focus") || "").trim(),
      goal: String(formData.get("goal") || "").trim(),
      context: String(formData.get("context") || "").trim(),
      lines: parseLyrics(String(formData.get("lyrics") || "")),
      exercises: parseTextLines(String(formData.get("exercises") || "")),
      audioBlob: audioFile,
      audioFileName: audioFile.name,
      audioType: audioFile.type,
      coverBlob: coverFile instanceof File && coverFile.size ? coverFile : null,
      coverType: coverFile instanceof File ? coverFile.type : ""
    };

    await window.MusicLibraryDB.saveSong(song);
    songForm.reset();
    saveStatus.textContent = "歌曲已保存到后台曲库。现在回前台刷新页面，就能直接看到并播放这首歌。";
    renderLibrary();
  });
}

renderLibrary();
