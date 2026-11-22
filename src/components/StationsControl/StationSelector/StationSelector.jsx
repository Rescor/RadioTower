import styles from "./StationSelector.module.css";

export default function StationSelector(props) {
  return <div className={styles.selectors_wrapper}>
    <div className={styles.select_wrapper}>
      <select className={styles.select}
        onChange={props.changeHandler}
        value={props.currentStation.id}>
        {props.stations.map(station => (
          <option key={station.id}
            value={station.id}>
              {station.name}
          </option>))}
      </select>
    </div>

    <div className={styles.select_wrapper}>
      <select className={styles.select}
        value={props.sourceId}
        onChange={(event) => props.sourceHandler(Number(event.target.value))}>
        {props.currentStation.sources.map((source, i) =>
          <option key={source.url}
            value={i}>
              {source.info}
          </option>)
        }
      </select>
    </div>
  </div>
}
