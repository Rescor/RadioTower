export default function Background() {
  // If I decide to make a dynamic backgrounds
  /*
    const bgImages = [
      "bg01.jpg",
    ]

    const randomIndex = Math.floor(Math.random() * bgImages.length);
    const randomBgImage = bgImages[randomIndex];

    const image = require(`../../assets/bg/${randomBgImage}`);
  */
  const image = require("../../assets/bg/bg01.jpg");

  const bgStyle = {
    background: `url(${image}) center/cover no-repeat rgba(0,0,0,0.73)`,
    backgroundBlendMode: "multiply",
    zIndex: -10,
    backgroundAttachment: "fixed",
    position: "fixed",
    width: "100%",
    height: "100dvh",
    top: 0,
    left: 0
  }

  return <div style={bgStyle}></div>
}
