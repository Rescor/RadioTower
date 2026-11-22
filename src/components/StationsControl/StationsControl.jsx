import { useState } from "react";
import Player from "./Player/Player";
import StationSelector from "./StationSelector/StationSelector";
import { stations } from "../../stations";
import styles from "./StationsControl.module.css";

function loadStation() {
  const lastStation = Number(localStorage.getItem("Last station"));
  return stations.find(station => station.id === lastStation) ?? stations[0];
}

function loadSourceId(station) {
  const saved = localStorage.getItem(`Station ${station.id} source`);
  const id = saved === null ? NaN : Number(saved);
  return Number.isInteger(id) && id >= 0 && id < station.sources.length ?
    id : station.default_source;
}

export default function StationsControl(props) {
  const [currentStation, setCurrentStation] = useState(loadStation);
  const [sourceId, setSourceId] = useState(() => loadSourceId(currentStation));
  const [status, setStatus] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  function changePlaying(value) {
    setIsPlaying(value);
    props.setIsPlaying(value);
  }

  function handleStationChange(event) {
    const selectedStation = stations.find(station => station.id === Number(event.target.value));
    setCurrentStation(selectedStation);
    localStorage.setItem("Last station", selectedStation.id);
    setSourceId(loadSourceId(selectedStation));
    changePlaying(true);
  }

  function playHandler() {
    changePlaying(!isPlaying);
  }

  function changeSourceHandler(id) {
    localStorage.setItem(`Station ${currentStation.id} source`, id);
    setSourceId(id);
  }

  function handleStreamError() {
    setStatus("Stream unavailable");
    changePlaying(false);
  }

  function handlePlayBlocked() {
    setStatus("");
    changePlaying(false);
  }

  return <div className={styles.control_wrapper}>
    <Player
      isPlaying={isPlaying}
      src={currentStation.sources[sourceId].url}
      onLoading={() => setStatus("Loading...")}
      onPlaying={() => setStatus("")}
      onError={handleStreamError}
      onPlayBlocked={handlePlayBlocked}
    />

    {status !== "Loading..." && <button
      className={styles.play_button}
      onClick={playHandler}>
      {isPlaying ? "Pause" : "Play"}
    </button>}

    <p className={styles.status}>{status}</p>

    <StationSelector
      stations={stations}
      currentStation={currentStation}
      sourceId={sourceId}
      changeHandler={handleStationChange}
      sourceHandler={changeSourceHandler}
    />
  </div>
}
