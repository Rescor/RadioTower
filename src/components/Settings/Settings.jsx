// import styles from "./Settings.module.css";

export default function Settings() {
  function changeLogoAnimation() {
    if (!localStorage.getItem("Animation") || localStorage.getItem("Animation") === "Enabled" ) {
      localStorage.setItem("Animation", "Disabled");
    }
    else localStorage.setItem("Animation", "Enabled");
    window.location.reload();
  }

  function resetSettings() {
    localStorage.clear();
    window.location.reload();
  }

  return <>
    <button onClick={changeLogoAnimation}>On/off animation</button>
    <button onClick={resetSettings}>Reset all settings</button>
  </>
}
