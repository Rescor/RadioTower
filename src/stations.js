// now_playing.type:
//   "icecast" - Icecast status-json.xsl, the stream is found by its mount
//   "anonfm"  - anon.fm state.txt
//   "anison"  - Anison FM data via rtproxy.php
//   "azuracast" - AzuraCast /api/nowplaying/<station>

const RADIOTOWER_STATUS_URL = "https://listen.radiotower.su/status-json.xsl";

export const stations = [
  {
    id: 5,
    name: "KRTD",
    sources: [
      {info: "128 kbps", url: "https://krtd.049406.xyz/listen/krtd/low"},
      {info: "320 kbps", url: "https://krtd.049406.xyz/listen/krtd/high"},
    ],
    default_source: 1,
    now_playing: {type: "azuracast", url: "https://krtd.049406.xyz/api/nowplaying/krtd"},
  },
  {
    id: 1,
    name: "Модель для сборки",
    short_name: "МДС",
    sources: [
      {info: "Mirror 1", url: "https://stream.mds-station.com:8443/01-mds"},
      {info: "Mirror 2", url: "https://mds-station.com:8443/mds"},
    ],
    default_source: 0,
    now_playing: {type: "icecast", url: "https://mds-station.com:8443/status-json.xsl", mount: "/mds"},
  },
  {
    id: 2,
    name: "Проводач",
    sources: [
      {info: "aac: low", url: "https://station.waveradio.org/provodach-low"},
      {info: "aac: high", url: "https://station.waveradio.org/provodach"},
    ],
    default_source: 1,
    now_playing: {type: "icecast", url: "https://station.waveradio.org/status-json.xsl", mount: "/provodach"},
  },
  {
    id: 3,
    name: "Radio Anonymous",
    sources: [
      {info: "64 kbps", url: "https://anon.fm/streams/radio-low"},
      {info: "192 kbps", url: "https://anon.fm/streams/radio"},
    ],
    default_source: 1,
    now_playing: {type: "anonfm", url: "https://anon.fm/state.txt"},
  },
  {
    id: 4,
    name: "Anison FM",
    sources: [
      {info: "128 kbps", url: "https://pool.anison.fm/AniSonFM(128)"},
      {info: "256 kbps", url: "https://pool.anison.fm/AniSonFM(256)"},
      {info: "320 kbps", url: "https://pool.anison.fm/AniSonFM(320)"},
    ],
    default_source: 2,
    now_playing: {type: "anison", url: "https://rsx.aww.xyz/rtproxy.php"},
  },
  {
    id: 20,
    name: "Industrial Junk",
    sources: [
      {info: "128 kbps", url: "https://listen.radiotower.su/industrial_junk_128"},
      {info: "320 kbps", url: "https://listen.radiotower.su/industrial_junk_320"},
    ],
    default_source: 1,
    now_playing: {type: "icecast", url: RADIOTOWER_STATUS_URL, mount: "/industrial_junk_128"},
  },
  {
    id: 21,
    name: "Lonesome Town",
    sources: [
      {info: "128 kbps", url: "https://listen.radiotower.su/lonesome_town_128"},
      {info: "320 kbps", url: "https://listen.radiotower.su/lonesome_town_320"},
    ],
    default_source: 1,
    now_playing: {type: "icecast", url: RADIOTOWER_STATUS_URL, mount: "/lonesome_town_128"},
  },
  {
    id: 22,
    name: "Mad Dog FM",
    sources: [
      {info: "128 kbps", url: "https://listen.radiotower.su/mad_dog_fm_128"},
      {info: "320 kbps", url: "https://listen.radiotower.su/mad_dog_fm_320"},
    ],
    default_source: 1,
    now_playing: {type: "icecast", url: RADIOTOWER_STATUS_URL, mount: "/mad_dog_fm_128"},
  },
  {
    id: 23,
    name: "RRN Radio",
    sources: [
      {info: "128 kbps", url: "https://listen.radiotower.su/rrn_radio_128"},
      {info: "320 kbps", url: "https://listen.radiotower.su/rrn_radio_320"},
    ],
    default_source: 1,
    now_playing: {type: "icecast", url: RADIOTOWER_STATUS_URL, mount: "/rrn_radio_128"},
  },
  {
    id: 24,
    name: "Vigilante 2084",
    sources: [
      {info: "128 kbps", url: "https://listen.radiotower.su/vigilante_2084_128"},
      {info: "320 kbps", url: "https://listen.radiotower.su/vigilante_2084_320"},
    ],
    default_source: 1,
    now_playing: {type: "icecast", url: RADIOTOWER_STATUS_URL, mount: "/vigilante_2084_128"},
  },
];
