import { useState } from "react";
import Background from "../components/Background/Background";
import Logo from "../components/Logo/Logo";
import OnAir from "../components/OnAir/OnAir";
import StationsControl from "../components/StationsControl/StationsControl";

export default function MainPage() {
  const [isPlaying, setIsPlaying] = useState(false)

  return <>
    <Background />
    <Logo />
    <OnAir isPlaying={isPlaying} />
    <StationsControl setIsPlaying={setIsPlaying} />
  </>
}
