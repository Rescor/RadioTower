import { useState, useEffect } from "react";
import he from "he";
import Settings from "../Settings/Settings";
import styles from "./OnAir.module.css";

const station_names = [
  "МДС",
  "Проводач",
  "Radio Anonymous",
  "Anison FM",
  //'KeyGen FM',
  "Industrial Junk",
  "Lonesome Town",
  "Mad Dog FM",
  "RRN Radio",
  "Vigilante 2084",
];

export default function OnAir(props) {
  const [onAir, setOnAir] = useState([]);
  const [showSettings, setShowSettings] = useState(false);

  const animationStatus = localStorage.getItem("Animation");
  const classes = props.isPlaying && animationStatus !== "Disabled" ?
    `${styles.on_air} ${styles.on_air_animation}` : `${styles.on_air}`;

  useEffect(() => {
    fetchData();
    setInterval(() => fetchData(), 10000);
  }, []);

  async function fetchData() {
    // MDS
    async function getMdsData() {
      try {
        const response = await fetch("http://mds-station.com:8000/status-json.xsl");
        const data = await response.json();
        setOnAir(prev => {
          const updatedOnAir = [...prev];
          updatedOnAir[0] = he.decode(data.icestats.source.title);
          return updatedOnAir;
        })
      } catch (e) { console.log(e) }
    }

    // Provodach
    async function getProvodachData() {
      try {
        const response = await fetch("https://station.waveradio.org/status-json.xsl");
        const data = await response.json();
        setOnAir(prev => {
          const updatedOnAir = [...prev];
          updatedOnAir[1] = he.decode(data.icestats.source[0].title);
          return updatedOnAir;
        })
      } catch (e) { console.log(e) }
    }

    // anon.fm
    async function getAnonFMData() {
      try {
        const response = await fetch("https://anon.fm/state.txt");
        const data = await response.text();
        setOnAir(prev => {
          const updatedOnAir = [...prev];
          const lines = data.split('\n');

          for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim() === "Title" || lines[i].trim() === "Name") {
              updatedOnAir[2] = he.decode(lines[i + 1]);
              break;
            }
          }
          return updatedOnAir;
        })
      } catch (e) { console.log(e) }
    }

    // AnisonFM
    async function getAnisonData() {
      try {
        const response = await fetch("https://rsx.aww.xyz/rtproxy.php", {
          headers: { "Referer": "https://anison.fm" }
        });
        const data = await response.json();
        const song = JSON.parse(data.song);

        setOnAir(prev => {
          const updatedOnAir = [...prev];
          updatedOnAir[3] = `${song.on_air.anime} - ${song.on_air.track}`;
          return updatedOnAir;
        })
      } catch (e) { console.log(e) }
    }

    // Radiotower
    async function getRTData() {
      try {
        const response = await fetch("http://listen.radiotower.su:8000/status-json.xsl");
        const data = await response.json();

        setOnAir(prev => {
          const updatedOnAir = [...prev];
          for (let i = 0; i < 5; i++) {
            updatedOnAir[i+4] = he.decode(data.icestats.source[i*2].title);
          }
          return updatedOnAir;
        })
      } catch (e) { console.log(e) }
    }
    await getMdsData();
    await getProvodachData();
    await getAnonFMData();
    await getAnisonData();
    await getRTData();

    //const keygenResp = await fetch("https://rsx.aww.xyz/rtproxy.php");
    //const keygenData = await keygenResp.json();
    //updatedOnAir[2] = he.decode(keygenData.song);
  }

  function openSettings() {
    setShowSettings(!showSettings)
  }

  return <div className={styles.on_air_wrapper}>
      <pre className={classes} onClick={openSettings}>
        {` .-. . .   .-. .-. .-.\n| | |\\|   |-|  |  |(\n \`-' ' \`   \` ' \`-' ' '`}
      </pre>

      {station_names.map((station, i) =>
        <p style={{color: "lime"}} key={station}>
          {station} > {onAir[i] ? onAir[i] : ""}
        </p>)}

      {showSettings && <Settings />}
    </div>
}
