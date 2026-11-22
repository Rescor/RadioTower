import * as he from "he";

function decode(title) {
  return typeof title === "string" ? he.decode(title.trim()) : "";
}

function parseIcecast(data, mount) {
  const sources = data?.icestats?.source;
  const list = Array.isArray(sources) ? sources : sources ? [sources] : [];
  const source = list.find(s => typeof s.listenurl === "string" && s.listenurl.endsWith(mount));
  return decode(source?.title);
}

function parseAnonFM(text) {
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === "Title" || lines[i].trim() === "Name") {
      return decode(lines[i + 1]);
    }
  }
  return "";
}

function parseAnison(data) {
  const onAir = JSON.parse(data.song)?.on_air;
  return onAir ? `${onAir.anime} - ${onAir.track}` : "";
}

function parseAzuraCast(data) {
  return decode(data?.now_playing?.song?.text);
}

export async function fetchStatus(url, type) {
  const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return type === "anonfm" ? response.text() : response.json();
}

export function parseNowPlaying(nowPlaying, data) {
  switch (nowPlaying.type) {
    case "icecast": return parseIcecast(data, nowPlaying.mount);
    case "anonfm": return parseAnonFM(data);
    case "anison": return parseAnison(data);
    case "azuracast": return parseAzuraCast(data);
    default: return "";
  }
}
