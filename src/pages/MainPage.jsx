import { useState } from "react";
import Background from "../components/Background/Background";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Logo from "../components/Logo/Logo";
import OnAir from "../components/OnAir/OnAir";
import StationsControl from "../components/StationsControl/StationsControl";

export default function MainPage() {
  const [isPlaying, setIsPlaying] = useState(false)

  return <>
    <Background />
    <Logo />
    <ErrorBoundary>
      <OnAir isPlaying={isPlaying} />
    </ErrorBoundary>
    <ErrorBoundary>
      <StationsControl setIsPlaying={setIsPlaying} />
    </ErrorBoundary>
  </>
}
