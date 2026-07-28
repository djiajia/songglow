const defaultSongLibrary = {
  imagine: {
    title: "Imagine",
    artist: "John Lennon · 中级 · 抒情经典",
    focus: "理解抽象表达、入门连读、意群感知",
    goal: "学完后能理解这首歌的核心主题，并记住 6 到 8 个高频表达。",
    tags: ["适合入门", "短句清晰", "主题感强"],
    exercises: [
      "遮住 heaven，尝试听写这一句",
      "跟读两遍，注意 imagine 的轻重音",
      "把 only sky 改写成你自己的表达"
    ],
    context: "这首歌的语言非常简单，但它把抽象主题写得非常容易进入，是非常适合入门用户的学习材料。",
    lines: [
      {
        title: "Imagine there's no heaven",
        subtitle: "想象没有天堂",
        summary: "这里的 imagine 带有邀请听者一起进入设想世界的语气，不只是单纯“想一想”。",
        vocab: "imagine：设想，在脑海中创造一个画面或世界。",
        phrase: "there's no ... 用极简方式建立设定，歌词里很常见，听起来直接又有力量。",
        background: "歌曲通过否定现实中的边界，逐步铺开理想主义世界观。"
      },
      {
        title: "It's easy if you try",
        subtitle: "如果你愿意去想，这并不难",
        summary: "这句用 very simple 的表达降低理解门槛，让听者感觉这种想象并不遥远。",
        vocab: "easy：不仅是“容易”，也有“没那么复杂、可以做到”的语气色彩。",
        phrase: "if you try 是高频条件表达，适合放进日常鼓励语境里。",
        background: "整首歌并不是命令式说教，而是温和地邀请你尝试另一种思考方式。"
      },
      {
        title: "No hell below us",
        subtitle: "我们脚下没有地狱",
        summary: "歌词省略了完整句法，让表达更像一幅快速闪过的画面，具有诗意。",
        vocab: "below：在下方，常见于空间表达，也可延伸到层级和位置。",
        phrase: "below us 把抽象概念拉回身体感受，听起来更有空间感。",
        background: "这里和前一句形成对照，把传统观念中的上下结构一并拆解。"
      },
      {
        title: "Above us, only sky",
        subtitle: "在我们上方，只有天空",
        summary: "only sky 语言极简，但视觉画面很强，适合训练英文里简洁表达的力量。",
        vocab: "above：在上方，和 below 构成成对记忆，非常适合联想学习。",
        phrase: "only + 名词 是很实用的压缩式表达，突出“仅剩、只有”。",
        background: "这一句把复杂议题转成简单自然意象，是这首歌最迷人的地方之一。"
      }
    ]
  },
  yellow: {
    title: "Yellow",
    artist: "Coldplay · 初中级 · 温柔抒情",
    focus: "情绪表达、告白语气、意象理解",
    goal: "学完后能理解抒情歌词里如何用简单词汇创造浪漫感。",
    tags: ["情绪表达", "画面感强", "适合跟读"],
    exercises: [
      "把 stars 和 shine 两个词组写进自己的句子",
      "跟读时拉长 shine 的尾音，体会抒情节奏",
      "思考 yellow 在这首歌里为什么不是字面颜色"
    ],
    context: "Yellow 很适合帮助用户理解流行歌词里那些看起来简单、但情绪密度很高的表达方式。",
    lines: [
      {
        title: "Look at the stars",
        subtitle: "看看那些星星",
        summary: "句子非常短，适合用来训练英语里最自然的祈使句语感。",
        vocab: "look at：看向、注视，是非常基础但很高频的动词短语。",
        phrase: "the stars 在歌词中常被用来表达浪漫、遥远和希望。",
        background: "Coldplay 常用简单词汇制造很大的情绪空间，这首歌尤其典型。"
      },
      {
        title: "Look how they shine for you",
        subtitle: "看它们如何为你闪耀",
        summary: "how 引导感叹式结构，让表达更有情绪起伏，适合学习口语化赞叹。",
        vocab: "shine：发光、闪耀，也常用于形容一个人很出彩。",
        phrase: "for you 在歌词里强化情感指向，让画面和感情都更集中。",
        background: "这句将自然景象转成私人告白，是整首歌最具代表性的表达。"
      },
      {
        title: "And everything you do",
        subtitle: "还有你做的每一件事",
        summary: "everything you do 是很口语的名词性结构，日常表达里也很常见。",
        vocab: "everything：一切，常和 you do / you say / you want 搭配。",
        phrase: "you do 这里不是强调动作，而是在概括一个人的全部行为与特质。",
        background: "歌词通过宽泛的概括增强情绪浓度，避免了太直白的表白方式。"
      },
      {
        title: "It was all yellow",
        subtitle: "一切都染上了 yellow 的颜色",
        summary: "颜色词在英文歌词中常常不是字面义，而是情绪和氛围的象征。",
        vocab: "yellow：字面是黄色，但在艺术表达中往往指温暖、光感和记忆。",
        phrase: "all + 颜色 / 状态 用来把场景整体染上某种气质。",
        background: "这句留下解释空间，也正因此更容易被听众反复回味。"
      }
    ]
  },
  counting: {
    title: "Counting Stars",
    artist: "OneRepublic · 中级 · 节奏流行",
    focus: "弱读听辨、重复节奏、对比表达",
    goal: "学完后能抓到副歌里的高频固定搭配，并感受到流行歌里的节奏推进。",
    tags: ["节奏感强", "副歌记忆点", "适合听辨"],
    exercises: [
      "听写 no more counting dollars 这一组副歌表达",
      "跟着节奏模仿 I've been 的停顿和重复",
      "用 no more ... 造一个你自己的生活句子"
    ],
    context: "这首歌适合做流行英语听力训练，尤其适合练重复结构、弱读和副歌里的情绪推进。",
    lines: [
      {
        title: "Lately, I've been, I've been losing sleep",
        subtitle: "最近，我一直一直睡不好",
        summary: "重复结构配合停顿感，很适合做节奏听力训练，也能学习现在完成进行语感。",
        vocab: "lately：最近，常和现在完成时态一起出现。",
        phrase: "losing sleep 表示因为烦恼或压力而睡不好。",
        background: "流行歌里常通过重复和停顿制造情绪推进，这句就是典型例子。"
      },
      {
        title: "Dreaming about the things that we could be",
        subtitle: "想着我们可能成为的样子",
        summary: "could be 表示可能成为的状态，兼具梦想感和不确定性。",
        vocab: "dream about：梦见、憧憬，是非常实用的表达。",
        phrase: "the things that we could be 是相对从句的轻量型用法。",
        background: "这句把个人焦虑与未来想象并置，是歌曲张力的重要来源。"
      },
      {
        title: "But baby, I've been, I've been praying hard",
        subtitle: "但亲爱的，我一直一直在认真祈求",
        summary: "baby 在歌词里常是亲昵称呼，不一定真的是恋人语境。",
        vocab: "pray：祈祷，也可延伸成强烈期盼某事发生。",
        phrase: "praying hard 表示非常努力、非常强烈地祈求。",
        background: "这里的情绪开始上扬，为副歌的释放做准备。"
      },
      {
        title: "Said no more counting dollars, we'll be counting stars",
        subtitle: "别再数钱了，我们去数星星吧",
        summary: "通过 dollars 和 stars 的对比，把现实主义和理想主义直接对照出来。",
        vocab: "dollar：美元，也常被用作金钱现实的象征。",
        phrase: "no more ... 是非常高频的口语表达，表示“不要再……了”。",
        background: "这是整首歌最有记忆点的一句，也是网站里最适合做重点精讲的句子。"
      }
    ]
  }
};

const personas = {
  student: {
    title: "学生用户",
    text: "他们对英文歌天然有兴趣，但通常缺少稳定的方法把“喜欢”变成“学会”。SongGlow 通过歌曲和学习的连接，降低开始门槛，让背单词、理解歌词和练听力发生在同一个场景里。",
    bullets: [
      "更愿意从熟悉歌曲开始，而不是从教材开始",
      "需要明确告诉他这首歌适合练什么",
      "完成一首歌后的成就感，比做一页题更强"
    ]
  },
  worker: {
    title: "轻学习成人",
    text: "这类用户通常有一定英语基础，但没有稳定整块时间，也不想回到传统课程的压力里。SongGlow 适合他们在通勤、午休和晚间碎片时间里持续练输入。",
    bullets: [
      "更看重低门槛和短时完成感",
      "希望内容有质感，但不想面对大段教材",
      "愿意为完整精讲和复习效率付费"
    ]
  },
  speaker: {
    title: "口语提升用户",
    text: "他们更关注发音、连读、意群和真实语感。歌曲比孤立句子更有节奏和情绪，适合作为跟读和模仿材料，因此这类用户会更常使用复读和跟读能力。",
    bullets: [
      "关注节奏、重音和连读，不满足于看懂字面意思",
      "需要能反复练同一句的功能",
      "更容易被副歌和情绪浓度高的歌曲吸引"
    ]
  }
};

let songLibrary = { ...defaultSongLibrary };
let currentSong = "imagine";
let currentLine = 0;
let playing = false;
let timer = null;
let currentAudioUrl = "";

const lyricButtons = [...document.querySelectorAll(".lyric-line")];
const songGrid = document.getElementById("song-grid");
const personaTabs = [...document.querySelectorAll(".persona-tab")];
const playToggle = document.getElementById("play-toggle");
const recordDisc = document.querySelector(".record-disc");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const trackFocus = document.getElementById("track-focus");
const trackGoal = document.getElementById("track-goal");
const songTagList = document.getElementById("song-tag-list");
const explainTitle = document.getElementById("explain-title");
const explainSummary = document.getElementById("explain-summary");
const explainVocab = document.getElementById("explain-vocab");
const explainPhrase = document.getElementById("explain-phrase");
const explainBackground = document.getElementById("explain-background");
const exerciseList = document.getElementById("exercise-list");
const lineContextText = document.getElementById("line-context-text");
const personaContent = document.getElementById("persona-content");
const menuToggle = document.getElementById("menu-toggle");
const siteNav = document.getElementById("site-nav");
const audioElement = document.getElementById("audio-player");
const audioStatus = document.getElementById("audio-status");

function getSongCards() {
  return [...document.querySelectorAll(".song-card[data-song]")];
}

function ensureSongLines(song) {
  if (Array.isArray(song.lines) && song.lines.length) return song.lines;
  return [
    {
      start: 0,
      end: 9999,
      title: "已上传音频文件",
      subtitle: "可继续在后台补充歌词时间轴",
      summary: "这首歌已经从后台曲库接入前台播放。当前版本支持先上传音频文件，再逐步补齐歌词和精讲内容。",
      vocab: "建议在后台为这首歌补充逐句歌词与翻译。",
      phrase: "如果配置了时间轴，前台会自动按播放进度高亮歌词。",
      background: "正式项目可以继续扩展后台字段，例如词汇、词组、语法和背景说明。"
    }
  ];
}

function renderTags(tags = []) {
  if (!songTagList) return;
  songTagList.innerHTML = tags.map((tag) => `<span class="song-tag">${tag}</span>`).join("");
}

function renderExercises(items = []) {
  if (!exerciseList) return;
  const source = items.length
    ? items
    : [
        "播放完整音频，先熟悉整首歌的旋律和节奏",
        "继续回后台补充歌词时间轴和精讲内容",
        "上传完成后，前台会自动读取并展示这首歌"
      ];
  exerciseList.innerHTML = source.map((item) => `<li>${item}</li>`).join("");
}

function updateAudioSource(song) {
  if (!audioElement || !audioStatus) return;
  if (currentAudioUrl) {
    URL.revokeObjectURL(currentAudioUrl);
    currentAudioUrl = "";
  }

  if (song.audioBlob instanceof Blob) {
    currentAudioUrl = URL.createObjectURL(song.audioBlob);
    audioElement.src = currentAudioUrl;
    audioStatus.textContent = `当前播放源：后台上传音频 ${song.audioFileName || ""}`;
  } else {
    audioElement.removeAttribute("src");
    audioElement.load();
    audioStatus.textContent = "当前为演示歌曲。上传你自己的音频后，这里会直接播放真实文件。";
  }
}

function renderLine(index) {
  const song = songLibrary[currentSong];
  const lines = ensureSongLines(song);
  const line = lines[index];
  if (!line) return;

  explainTitle.textContent = line.title;
  explainSummary.textContent = line.summary;
  explainVocab.textContent = line.vocab;
  explainPhrase.textContent = line.phrase;
  explainBackground.textContent = line.background;

  lyricButtons.forEach((button, idx) => {
    button.classList.toggle("active", idx === index);
  });

  progressText.textContent = `${String(index + 1).padStart(2, "0")} / ${String(lines.length).padStart(2, "0")}`;
  progressFill.style.width = `${((index + 1) / lines.length) * 100}%`;
  currentLine = index;
}

function renderSong(songKey) {
  const song = songLibrary[songKey];
  if (!song) return;

  currentSong = songKey;
  const lines = ensureSongLines(song);

  trackTitle.textContent = song.title;
  trackArtist.textContent = song.artist;
  trackFocus.textContent = song.focus || "上传后可继续补充学习重点。";
  trackGoal.textContent = song.goal || "上传后可继续配置学习目标。";
  lineContextText.textContent = song.context || "这是一首来自后台曲库的歌曲。";

  renderTags(song.tags || []);
  renderExercises(song.exercises || []);
  updateAudioSource(song);

  lyricButtons.forEach((button, index) => {
    const line = lines[index] || lines[0];
    button.querySelector(".lyric-en").textContent = line.title;
    button.querySelector(".lyric-cn").textContent = line.subtitle;
  });

  getSongCards().forEach((card) => {
    card.classList.toggle("selected", card.dataset.song === songKey);
  });

  renderLine(0);
}

function startFallbackTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    const lines = ensureSongLines(songLibrary[currentSong]);
    const nextIndex = (currentLine + 1) % lines.length;
    renderLine(nextIndex);
  }, 2400);
}

function stopFallbackTimer() {
  clearInterval(timer);
}

function setPlayingState(nextState) {
  playing = nextState;
  if (playToggle) playToggle.textContent = nextState ? "❚❚" : "▶";
  if (recordDisc) recordDisc.classList.toggle("spinning", nextState);
}

function startPlayback() {
  const song = songLibrary[currentSong];
  setPlayingState(true);

  if (audioElement && song.audioBlob instanceof Blob && audioElement.src) {
    stopFallbackTimer();
    audioElement.play().catch(() => {
      startFallbackTimer();
      audioStatus.textContent = "浏览器未允许自动播放，当前使用演示模式切换歌词。";
    });
    return;
  }

  startFallbackTimer();
}

function stopPlayback() {
  setPlayingState(false);
  stopFallbackTimer();
  if (audioElement && !audioElement.paused) {
    audioElement.pause();
  }
}

function renderPersona(key) {
  const data = personas[key];
  if (!data || !personaContent) return;
  personaContent.innerHTML = `
    <h3>${data.title}</h3>
    <p>${data.text}</p>
    <ul>${data.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>
  `;
}

function bindSongCardEvents() {
  getSongCards().forEach((card) => {
    if (card.dataset.bound === "true") return;
    card.dataset.bound = "true";
    card.addEventListener("click", () => {
      renderSong(card.dataset.song);
      if (playing) startPlayback();
    });
  });
}

async function loadUploadedSongs() {
  if (!window.MusicLibraryDB || !songGrid) return;
  const uploadedSongs = await window.MusicLibraryDB.getAllSongs();
  const uploadEntry = songGrid.querySelector(".song-card-upload");

  uploadedSongs.forEach((song) => {
    const normalizedSong = {
      ...song,
      lines: ensureSongLines(song)
    };
    songLibrary[normalizedSong.id] = normalizedSong;

    const card = document.createElement("article");
    card.className = "song-card";
    card.dataset.song = normalizedSong.id;

    const coverStyle =
      normalizedSong.coverBlob instanceof Blob
        ? `style="background-image:url('${URL.createObjectURL(normalizedSong.coverBlob)}'); background-size:cover; background-position:center;"`
        : "";

    card.innerHTML = `
      <div class="song-gradient" ${coverStyle}></div>
      <div class="song-info">
        <span class="tag">后台上传</span>
        <h3>${normalizedSong.title}</h3>
        <p>${normalizedSong.artist} · ${normalizedSong.focus || "已上传到曲库，可直接前台播放。"}</p>
      </div>
    `;

    songGrid.insertBefore(card, uploadEntry);
  });

  bindSongCardEvents();
}

lyricButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const index = Number(button.dataset.line);
    renderLine(index);
    const song = songLibrary[currentSong];
    const line = ensureSongLines(song)[index];
    if (audioElement && song.audioBlob instanceof Blob && typeof line.start === "number") {
      audioElement.currentTime = Math.max(line.start, 0);
    }
  });
});

personaTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    personaTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    renderPersona(tab.dataset.persona);
  });
});

if (playToggle) {
  playToggle.addEventListener("click", () => {
    if (playing) {
      stopPlayback();
    } else {
      startPlayback();
    }
  });
}

if (audioElement) {
  audioElement.addEventListener("timeupdate", () => {
    const song = songLibrary[currentSong];
    if (!(song && song.audioBlob instanceof Blob)) return;
    const lines = ensureSongLines(song);
    const matchIndex = lines.findIndex((line) => {
      const start = typeof line.start === "number" ? line.start : -1;
      const end = typeof line.end === "number" && line.end > 0 ? line.end : start + 4;
      return audioElement.currentTime >= start && audioElement.currentTime <= end;
    });

    if (matchIndex >= 0 && matchIndex !== currentLine) {
      renderLine(matchIndex);
    }
  });

  audioElement.addEventListener("ended", () => {
    stopPlayback();
  });
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    siteNav.classList.toggle("is-open");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
    });
  });
}

bindSongCardEvents();
renderSong(currentSong);
renderPersona("student");
loadUploadedSongs();
