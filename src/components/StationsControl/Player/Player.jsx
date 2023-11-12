import { useRef, useEffect } from "react";

export default function Player(props) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (props.isPlaying) {
      audioRef.current.src = props.src;
      props.setLoadingStatus();
      audioRef.current.load();
      audioRef.current.oncanplay = () => {
        audioRef.current.play();
        props.resetStatus();
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [props.isPlaying, props.src]);

  return <audio ref={audioRef} src={props.src} preload="none"/>
}
