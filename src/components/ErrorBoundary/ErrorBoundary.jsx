import { Component } from "react";
import { resetSettings } from "../Settings/Settings";
import styles from "./ErrorBoundary.module.css";

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error(error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return <div className={styles.fallback}>
      <p>Something went wrong :(</p>
      <button className={styles.button} onClick={() => window.location.reload()}>Reload</button>
      <button className={styles.button} onClick={resetSettings}>Reset settings</button>
    </div>
  }
}
