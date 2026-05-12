import { useEffect, useState } from "react";
import "./App.css";

import momSong from "./assets/audio/mom-song.mp3";

import mom1 from "./assets/mom1.png";
import mom2 from "./assets/mom2.jpg";
import mom3 from "./assets/mom3.png";
import mom4 from "./assets/mom4.png";
import mom5 from "./assets/mom5.png";
import mom6 from "./assets/mom6.png";
import mom7 from "./assets/mom7.jpg";
import mom8 from "./assets/mom8.png";

const photos = [
  { src: mom1, caption: "We should keep touring the world together, I'd love to accompany you." },
  { src: mom2, caption: "You don't know the excitement I held before telling you I got Valedictorian and how happy I felt making you proud." },
  { src: mom3, caption: "I see where I get my drinking habits from." },
  { src: mom4, caption: "Thank you for your endless love and guidance even when I acted like I knew everything, you still guided me anyway." },
  { src: mom5, caption: "To many more birthdays and mother's days!" },
  { src: mom6, caption: "My smile is a reflection of yours. They're almost as bright as each other haha." },
  { src: mom7, caption: "Thank you for bringing me out in nature... occasionally..." },
  { src: mom8, caption: "You're the reason for my success. Thank you and I love you." },
];

const fullText = `Thank you for loving me even on the days when life wasn't easy.

Thank you for every sacrifice you made quietly, every sleepless night, every prayer, and every moment you kept pushing forward for our family even when nobody noticed.

Thank you as well for somehow always giving me money whenever I asked... without even asking what it was for lol.

No matter how old I get, I will always be grateful that I get to call you my mom.`;

function App() {
  const [openLetter, setOpenLetter] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!openLetter) return;

    setDisplayedText("");

    let index = 0;

    const interval = setInterval(() => {
      index++;
      setDisplayedText(fullText.slice(0, index));

      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [openLetter]);

  const nextPhoto = () => {
    setPhotoIndex((current) => (current + 1) % photos.length);
  };

  const previousPhoto = () => {
    setPhotoIndex((current) =>
      current === 0 ? photos.length - 1 : current - 1
    );
  };

  return (
    <div className="container">
      <div className="hearts"></div>

      <audio
  id="mom-song"
  src={momSong}
  loop
  autoPlay
/>

      <button
        className="music-button"
        onClick={() => {
          const audio = document.getElementById("mom-song");

          if (audio.paused) {
            audio.play();
          } else {
            audio.pause();
          }
        }}
      >
        Play / Pause Music 🎵
      </button>

      {!openLetter ? (
        <>
          <h1>Happy Mother’s Day, Mama ❤️</h1>

          <p className="message">
            Thank you for everything you do for me. I hope you enjoy this little surprise I made just for you.
          </p>

          <button
  onClick={() => {
    setOpenLetter(true);

    const audio = document.getElementById("mom-song");

    audio.play().catch(() => {
      console.log("Autoplay blocked");
    });
  }}
>
  Open My Letter
</button>
        </>
      ) : (
        <div className="letter-card">
          <h2>To Mama Blenda 💐</h2>

          <p className="typewriter-text">{displayedText}</p>

          {displayedText.length >= fullText.length && (
  <p className="signature signature-fade">
    — Felix 
  </p>
)}

          <div className="gallery">
            <h3>Some of My Favorite Memories</h3>

            <div className="photo-card">
              <img src={photos[photoIndex].src} alt="Memory with Mom" />
              <p>{photos[photoIndex].caption}</p>
            </div>

            <div className="gallery-buttons">
              <button onClick={previousPhoto}>Previous</button>
              <button onClick={nextPhoto}>Next</button>
            </div>

            <p className="photo-count">
              {photoIndex + 1} / {photos.length}
            </p>

            {!showFinalMessage ? (
              <button
                className="final-button"
                onClick={() => setShowFinalMessage(true)}
              >
                One Last Thing
              </button>
            ) : (
              <div className="final-message">
                <h3>One Last Thing ❤️</h3>

                <p>
                  Ma, I hope this little gift reminds you that your love has
                  never gone unnoticed despite many times that I may not have fully expressed it.
                </p>

                <p>
                  Thank you for raising me, believing in me, and
                  loving me in ways I probably still don’t fully understand.
                </p>

                <p>Happy Mother’s Day. I love you always.</p>

                <p className="signature">— Felix </p>

                <p className="made-with-love">
                  Made with love, just for you!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;