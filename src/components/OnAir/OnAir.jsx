import { useState, useEffect } from "react";
import Settings from "../Settings/Settings";
import { stations } from "../../stations";
import { fetchStatus, parseNowPlaying } from "../../nowPlaying";
import styles from "./OnAir.module.css";

const statusGroups = new Map();
for (const station of stations) {
  const { url } = station.now_playing;
  if (!statusGroups.has(url)) statusGroups.set(url, []);
  statusGroups.get(url).push(station);
}

export default function OnAir(props) {
  const [onAir, setOnAir] = useState({});
  const [showSettings, setShowSettings] = useState(false);

  const animationStatus = localStorage.getItem("Animation");
  const classes = props.isPlaying && animationStatus !== "Disabled" ?
    `${styles.on_air} ${styles.on_air_animation}` : `${styles.on_air}`;

  useEffect(() => {
    fetchData();
    const fetchDataInterval = setInterval(() => fetchData(), 10000);
    return () => clearInterval(fetchDataInterval);
  }, []);

  function fetchData() {
    for (const [url, group] of statusGroups) {
      fetchStatus(url, group[0].now_playing.type)
        .then(data => {
          const titles = {};
          for (const station of group) {
            titles[station.id] = parseNowPlaying(station.now_playing, data);
          }
          setOnAir(prev => ({ ...prev, ...titles }));
        })
        .catch(e => console.log(e));
    }
  }

  function openSettings() {
    setShowSettings(!showSettings)
  }

  return <div className={styles.on_air_wrapper}>
      <button className={classes} onClick={openSettings}>
        {` .-. . .   .-. .-. .-.\n| | |\\|   |-|  |  |(\n \`-' ' \`   \` ' \`-' ' '`}
      </button>

      {stations.map(station =>
        <p style={{color: "lime"}} key={station.id}>
          {station.short_name ?? station.name} &gt; {onAir[station.id] ?? ""}
        </p>)}

      {showSettings && <Settings />}
    </div>
}
