import { useRef, useEffect } from "react";

export default function Player(props) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!props.isPlaying) {
      audio.oncanplay = null;
      audio.onerror = null;
      audio.pause();
      return;
    }

    audio.src = props.src;
    props.onLoading();
    audio.oncanplay = () => {
      audio.play()
        .then(() => props.onPlaying())
        .catch(e => {
          if (e.name !== "AbortError") props.onPlayBlocked();
        });
    };
    audio.onerror = () => props.onError();
    audio.load();
  }, [props.isPlaying, props.src]);

  return <audio ref={audioRef} src={props.src} preload="none"/>
}
