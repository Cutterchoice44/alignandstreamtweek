const API_KEY = "pk_0b8abc6f834b444f949f727e88a728e0";
const STATION_ID = "cutters-choice-radio";
const BASE_URL = "https://api.radiocult.fm/api";
const FALLBACK_ART = "https://i.imgur.com/qWOfxOS.png";
const MIXCLOUD_PASSWORD = "cutters44";
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

async function rcFetch(path) {
  const res = await fetch(BASE_URL + path, {
    headers: { "x-api-key": API_KEY }
  });
  return res.json();
}

async function fetchLiveNow() {
  try {
    const { result } = await rcFetch(`/station/${STATION_ID}/schedule/live`);
    const md = result.metadata || {}, ct = result.content || {};
    document.getElementById("now-dj").textContent =
      md.artist ? `${md.artist} – ${md.title}` : (ct.title || "No live show");
    document.getElementById("now-art").src = md.artwork_url || FALLBACK_ART;
  } catch (e) {
    console.error("Live-now fetch error:", e);
    document.getElementById("now-dj").textContent = "Error fetching live info";
    document.getElementById("now-art").src = FALLBACK_ART;
  }
}

async function fetchWeeklySchedule() {
  // existing schedule logic...
}

function fetchNowPlayingArchive() {
  // existing archive logic...
}

function openChatPopup() {
  const chatUrl = "https://app.radiocult.fm/embed/chat/cutters-choice-radio?theme=midnight&primaryColor=%235A8785&corners=sharp";
  window.open(chatUrl, "CuttersChoiceChat", "width=400,height=700,resizable=yes,scrollbars=yes");
}

document.addEventListener("DOMContentLoaded", () => {
  fetchLiveNow();
  fetchWeeklySchedule();
  fetchNowPlayingArchive();
  setInterval(fetchLiveNow, 30000);
  setInterval(fetchNowPlayingArchive, 60000);

  const popOutBtn = document.getElementById("popOutBtn");
  if (popOutBtn) {
    popOutBtn.addEventListener("click", () => {
      const src = document.getElementById("inlinePlayer").src;
      const pop = window.open("", "CCRPlayer", "width=400,height=200,resizable=yes");
      pop.document.write(
        `<!DOCTYPE html><html lang="en"><head><title>CCR Player</title></head><body style="margin:0"><iframe src="${src}" allow="autoplay" style="width:100%;height:100%;border:none"></iframe></body></html>`
      );
      pop.document.close();
    });
  }

  if (isMobile) {
    const mixSec = document.querySelector(".mixcloud");
    if (mixSec) mixSec.remove();
  } else {
    // shuffle logic...
  }
});

// rest of mixcloud functions...
