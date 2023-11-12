import { useEffect, useState } from "react";
import Player from "./Player/Player";
import StationSelector from "./StationSelector/StationSelector";
import styles from "./StationsControl.module.css";

const stations = [
  {
    id: 1,
    name: "Модель для сборки",
    sources: [
      {info: "Mirror 1", url: "http://mds-station.com:8000/mds"},
      {info: "Mirror 2", url: "http://stream.mds-station.com:8000/01-mds"},
    ],
    default_source: 0
  },
  {
    id: 2,
    name: "Проводач",
    sources: [
      {info: "aac: low", url: "https://station.waveradio.org/provodach-low"},
      {info: "aac: high", url: "https://station.waveradio.org/provodach"},
    ],
    default_source: 1
  },
  {
    id: 3,
    name: "Radio Anonymous",
    sources: [
      {info: "64 kbps", url: "http://anon.fm:8000/radio-low"},
      {info: "192 kbps", url: "http://anon.fm:8000/radio"},
    ],
    default_source: 1
  },
  {
    id: 4,
    name: "Anison FM",
    sources: [
      {info: "128 kbps", url: "https://pool.anison.fm/AniSonFM(128)"},
      {info: "256 kbps", url: "https://pool.anison.fm/AniSonFM(256)"},
      {info: "320 kbps", url: "https://pool.anison.fm/AniSonFM(320)"},
    ],
    default_source: 2
  },
  /*{
    id: 3,
    name: "KeyGen FM",
    sources: [
      {info: "128 kbps", url: "http://stream.keygen-fm.ru:8082/listen.mp3"},
      {info: "256 kbps (ogg)", url: "http://stream.keygen-fm.ru:8042/live.ogg"},
    ],
    default_source: 0
  },*/
  {
    id: 20,
    name: "Industrial Junk",
    sources: [
      {info: "128 kbps", url: "http://listen.radiotower.su:8000/industrial_junk_128"},
      {info: "320 kbps", url: "http://listen.radiotower.su:8000/industrial_junk_320"},
    ],
    default_source: 1
  },
  {
    id: 21,
    name: "Lonesome Town",
    sources: [
      {info: "128 kbps", url: "http://listen.radiotower.su:8000/lonesome_town_128"},
      {info: "320 kbps", url: "http://listen.radiotower.su:8000/lonesome_town_320"},
    ],
    default_source: 1
  },
  {
    id: 22,
    name: "Mad Dog FM",
    sources: [
      {info: "128 kbps", url: "http://listen.radiotower.su:8000/mad_dog_fm_128"},
      {info: "320 kbps", url: "http://listen.radiotower.su:8000/mad_dog_fm_320"},
    ],
    default_source: 1
  },
  {
    id: 23,
    name: "RRN Radio",
    sources: [
      {info: "128 kbps", url: "http://listen.radiotower.su:8000/rrn_radio_128"},
      {info: "320 kbps", url: "http://listen.radiotower.su:8000/rrn_radio_320"},
    ],
    default_source: 1
  },
  {
    id: 24,
    name: "Vigilante 2084",
    sources: [
      {info: "128 kbps", url: "http://listen.radiotower.su:8000/vigilante_2084_128"},
      {info: "320 kbps", url: "http://listen.radiotower.su:8000/vigilante_2084_320"},
    ],
    default_source: 1
  },
]

export default function StationsControl(props) {
  const [sourceId, setSourceId] = useState(undefined);
  const [currentStation, setCurrentStation] = useState(undefined)
  const [status, setStatus] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // checking for last station
    if (!localStorage.getItem("Last station")) {
      localStorage.setItem("Last station", stations[0].id);
      localStorage.setItem(`Station ${stations[0].id} source`, stations[0].default_source)
    }

    const lastStation = +localStorage.getItem("Last station")
    // Additional checking for source id existing
    if (!localStorage.getItem(`Station ${lastStation} source`)) {
      localStorage.setItem(`Station ${lastStation} source`, stations[lastStation].default_source)
    }

    setSourceId(localStorage.getItem(`Station ${lastStation} source`));
    setCurrentStation(stations.find(station => station.id === lastStation));
  }, [currentStation]);

  function handleStationChange(event) {
    const selectedStation = JSON.parse(event.target.value);
    setCurrentStation(selectedStation);
    localStorage.setItem("Last station", selectedStation.id);

    if (!localStorage.getItem(`Station ${selectedStation.id} source`)) {
      localStorage.setItem(`Station ${selectedStation.id} source`, selectedStation.default_source)
    }

    const id = +localStorage.getItem(`Station ${selectedStation.id} source`);

    setSourceId(id);
    setIsPlaying(true);
    props.setIsPlaying(true);
  }

  function playHandler() {
    setIsPlaying(!isPlaying);
    props.setIsPlaying(!isPlaying);
  }

  function changeSourceHandler(id) {
    localStorage.setItem(`Station ${currentStation.id} source`, id);
    setSourceId(id);
  }

  function setLoadingStatus() {
    setStatus("Loading...");
  }

  function resetStatus() {
    setStatus("")
  }

   if (currentStation) {
     return <div className={styles.control_wrapper}>
       <Player
         isPlaying={isPlaying}
         src={currentStation.sources[sourceId].url}
         setLoadingStatus={setLoadingStatus}
         resetStatus={resetStatus}
       />

       {status !== "Loading..." && <p
         className={styles.play_button}
         onClick={playHandler}>
         {isPlaying ? "Pause" : "Play"}
       </p>}

       <p className={styles.play_button}>{status}</p>

       {currentStation && <StationSelector
         stations={stations}
         currentStation={currentStation}
         sourceId={sourceId}
         changeHandler={handleStationChange}
         sourceHandler={changeSourceHandler}
       />}
     </div>
   }

  return <p className={styles.control_wrapper}>
    Something went wrong. You can try to reset your settings. Just click to "On Air".
   </p>
}
