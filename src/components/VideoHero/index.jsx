import { useRef, useState, useEffect } from "react";
import "./styles.css";

export default function VideoHero() {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showNextScreen, setShowNextScreen] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [showSecondImage, setShowSecondImage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const audioRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  
  useEffect(() => {
    if (showSecondImage && audioRef.current) {
      audioRef.current.volume = 0.8; // 🔊 80% do volume
      audioRef.current.play().catch(() => {
        console.log("Autoplay bloqueado");
      });
    }
  }, [showSecondImage]);

  const handleClick = () => {
    if (!isPlaying) {
      videoRef.current.play().catch(() => {});
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(true);
    }
  };
  const handleVideoEnd = () => {
    setShowNextScreen(true);
  };

  const handleNextClick = () => {
    setTransitioning(true);

    setTimeout(() => {
      setShowSecondImage(true);
      setTransitioning(false);
    }, 500);
  };

  return (
    <>
      {/* VÍDEO */}
      {!showNextScreen && (
        <video
          ref={videoRef}
          className="media-full"
          src="/videos/inicio_1.mp4"
          playsInline
          webkit-playsinline="true"
          preload="auto"
          onClick={handleClick}
          onEnded={handleVideoEnd}
        />
      )}

      {/* PRIMEIRA IMAGEM */}
      {showNextScreen && !showSecondImage && (
        <img
          src="/fotos/background_tem_certeza.jpg"
          className={`media-full-foto ${transitioning ? "fade-out" : ""}`}
          onClick={handleNextClick}
          onLoad={() => setImgLoaded(true)}
          style={{ opacity: imgLoaded ? 1 : 0 }}
          alt="tela seguinte"
        />
      )}

      {showSecondImage && (
        <div className="container_envelope fade-in">
          <img
            src="/fotos/foto_principal.png"
            className="media-full-foto"
            alt="foto principal"
        />

          <ul className="menu">
            <li>
              <a
                href="https://api.whatsapp.com/send/?phone=5511953945344&text=Ol%C3%A1!%20Gostaria%20de%20confirmar%20minha%20presen%C3%A7a%20no%20anivers%C3%A1rio%20da%20Giovana.%20%F0%9F%8E%A9%F0%9F%90%87%F0%9F%A6%8B&type=phone_number&app_absent=0"
                target="_blank"
              >
                <img src="/fotos/whats.svg" className="icons" />
                <p className="frase">Confirmar<br />presença</p>
              </a>
            </li>

            <li>
              <a
                href="https://maps.app.goo.gl/9yxv9QDSaerW8bTY8"
                target="_blank"
              >
                <img src="/fotos/locali.svg" className="icons" />
                <p className="frase">Como <br /> chegar</p>
              </a>
            </li>

            {/* <li>
              <a href="#">
                <img src="/fotos/lista.svg" className="icons" />
                <p className="frase">lista de <br />presentes</p>
              </a>
            </li> */}

            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(true);
                }}
              >
                <img src="/fotos/vestimenta.svg" className="icons" />
                <p className="frase">Informações <br /> vestimenta</p>
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* OVERLAY BRANCO */}
      {transitioning && <div className="white-overlay"></div>}

      <audio ref={audioRef} src="/musica/music.mp3"/>
    
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <p>
              Traje esporte fino. Cor azul vetada somente para os familiares.
            </p>
          </div>
        </div>
      )}
    </>
  );
}