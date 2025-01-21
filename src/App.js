import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, Calendar, Copy, Volume2, VolumeX, Map } from 'lucide-react';

// Componente ImagePlayer
const ImagePlayer = ({ url }) => {
  return (
    <div className="w-full">
      <img
        src={url}
        alt="Imagem da história"
        className="w-full rounded-lg shadow-md"
      />
    </div>
  );
};

// Carousel
const Carousel = ({ items }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="relative w-full">
      {items.map((item, index) => (
        <div
          key={index}
          className={`${
            index === current ? 'block' : 'hidden'
          }`}
        >
          <ImagePlayer url={item.url} />
        </div>
      ))}
    </div>
  );
};

const StoryBook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: null, left: null });
  const audioRef = useRef(null);

  const pixKey = "076.644.995-50";

  const moveNoButton = () => {
    const newTop = Math.random() * (window.innerHeight - 100);
    const newLeft = Math.random() * (window.innerWidth - 100);
    setNoButtonPosition({ top: newTop, left: newLeft });
  };

  const pages = [
    {
      type: "cover",
      title: "Convite de Casamento"
    },
    {
      title: "O Primeiro Encontro",
      text: "Era uma tarde especial de Agosto de 2020, quando marcamos um encontro, que marcou as nossas vidas...",
      media: {
        type: "image",
        url: "/convite-padrinhos/arquivos/1.png"
      }
    },
    {
      title: "O Pedido de Namoro",
      text: "Sob as estrelas, com o coração acelerado, ele preparou uma surpresa inesquecível...",
      media: {
        type: "carousel",
        items: [
          { type: "image", url: "/convite-padrinhos/arquivos/2.png" },
          { type: "image", url: "/convite-padrinhos/arquivos/3.png" }
        ]
      }
    },
    {
      title: "Nossa Jornada",
      text: "Juntos, descobrindo novos horizontes e construindo memórias para toda vida...",
      media: {
        type: "carousel",
        items: [
          { type: "image", url: "/convite-padrinhos/arquivos/4.png" },
          { type: "image", url: "/convite-padrinhos/arquivos/5.png" },
          { type: "image", url: "/convite-padrinhos/arquivos/6.png" },
          { type: "image", url: "/convite-padrinhos/arquivos/7.png" },
          { type: "image", url: "/convite-padrinhos/arquivos/8.png" },
          { type: "image", url: "/convite-padrinhos/arquivos/9.png" },
          { type: "image", url: "/convite-padrinhos/arquivos/10.png" },
          { type: "image", url: "/convite-padrinhos/arquivos/11.png" }
        ]
      }
    },
    {
      title: "O Pedido de Casamento",
      text: "No momento perfeito, as palavras certas fizeram o coração transbordar de alegria...",
      media: {
        type: "video",
        url: "/convite-padrinhos/arquivos/13.mp4"
      }
    },
    {
      type: "surprise-message",
      title: "Espere... tem mais!"
    },
    {
      type: "question",
      title: "A Grande Pergunta"
    },
    {
      type: "accepted",
      title: "Que Alegria!"
    },

    {
      type: "thank-you-video",
      title: "Nosso Agradecimento",
      media: {
        type: "video",
        url: "/convite-padrinhos/arquivos/agradecimento.mp4"
      }
    },
    {
      type: "invitation",
      title: "Convite Especial"
    }
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            setIsPlaying(false);
            console.log('Reprodução automática bloqueada pelo navegador');
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleMusic = () => setIsPlaying(!isPlaying);
  
  const copyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    setShowCopySuccess(true);
    setTimeout(() => setShowCopySuccess(false), 2000);
  };

  const MusicControl = () => (
    <button
      onClick={toggleMusic}
      style={{backgroundColor: '#034078'}}
      className="fixed top-4 left-4 px-4 py-2 rounded-full shadow-lg text-white hover:bg-opacity-90 transition-all z-50 backdrop-blur-sm flex items-center gap-2"
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5" />
      ) : (
        <>
          <VolumeX className="w-5 h-5" />
          <span className="text-sm">Ativar Música</span>
        </>
      )}
    </button>
  );

  const renderCoverPage = () => (
    <div className="text-center space-y-12 py-4 sm:py-8 px-2 sm:px-8 min-h-[60vh] flex flex-col items-center justify-center">
      <div className="space-y-12 max-w-2xl mx-auto p-8 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg">
        <Heart style={{color: '#034078'}} className="w-16 h-16 mx-auto animate-pulse" />
        
        <div className="space-y-6">
          <h1 style={{color: '#0A1128'}} className="text-4xl sm:text-6xl font-serif">
            Lucca & Paloma
          </h1>
          
          <p style={{color: '#001F54'}} className="text-xl font-light italic px-4">
            "Quando dois corações se encontram, 
            nasce uma história que merece ser eternizada..."
          </p>
        </div>

        <div className="flex justify-center pt-8">
          <button 
            onClick={() => setCurrentPage(currentPage + 1)}
            style={{backgroundColor: '#034078'}}
            className="text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
           > Nossa Hitória 
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderSurpriseMessage = () => (
    <div className="text-center space-y-12 py-4 sm:py-8 px-2 sm:px-8 min-h-[60vh] flex flex-col items-center justify-center">
      <div className="space-y-12 max-w-2xl mx-auto p-8 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg">
        <Heart style={{color: '#034078'}} className="w-16 h-16 mx-auto animate-pulse" />
        
        <div className="space-y-6">
          <h2 style={{color: '#0A1128'}} className="text-3xl sm:text-5xl font-serif">
            Espere... tem mais!
          </h2>
          
          <p style={{color: '#001F54'}} className="text-xl font-light">
            Se você está vendo essa parte, significa que tem algo a mais por vir...
          </p>
        </div>
      </div>
    </div>
  );
  const renderQuestionPage = () => (
    <div className="text-center p-4 sm:p-8 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-8 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg">
        <div className="space-y-8 sm:space-y-12">
          <h1 style={{color: '#0A1128'}} 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
            Vocês aceitam ser nossos padrinhos?
          </h1>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 pt-4 sm:pt-8">
            <button 
              onClick={() => setCurrentPage(currentPage + 1)}
              style={{backgroundColor: '#034078'}}
              className="w-full sm:w-auto text-white px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
            >
              Sim!
            </button>
            
            <button 
              onClick={moveNoButton}
              style={{
                backgroundColor: '#001F54',
                position: noButtonPosition.top !== null ? 'fixed' : 'relative',
                top: noButtonPosition.top ? `${noButtonPosition.top}px` : 'auto',
                left: noButtonPosition.left ? `${noButtonPosition.left}px` : 'auto',
                zIndex: 50,
                transition: 'all 0.2s ease'
              }}
              className="w-full sm:w-auto text-white px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl rounded-full hover:bg-opacity-90 shadow-lg"
            >
              Não
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
const renderAcceptedPage = () => (
  <div className="text-center space-y-12 py-4 sm:py-8 px-2 sm:px-8 min-h-[60vh] flex flex-col items-center justify-center">
    <div className="space-y-12 max-w-2xl mx-auto p-8 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg">
      <Heart style={{color: '#034078'}} className="w-16 h-16 mx-auto animate-pulse" />
      
      <h1 style={{color: '#0A1128'}} className="text-4xl sm:text-6xl font-serif">
        Que Alegria!
      </h1>
      
      <div className="space-y-6">
        <p style={{color: '#001F54'}} className="text-xl leading-relaxed">
          Nossos corações transbordam de felicidade com o seu "sim"! Ter vocês ao nosso lado
          neste momento tão especial é uma benção. Mais que padrinhos, vocês são parte fundamental
          da nossa história e da família que estamos construindo.
        </p>
        <p style={{color: '#001F54'}} className="text-xl leading-relaxed">
          Preparamos uma mensagem especial para vocês...
        </p>
      </div>
    </div>
  </div>
);

const renderThankYouVideo = () => (
  <div className="text-center space-y-12 py-4 sm:py-8 px-2 sm:px-8 min-h-[60vh] flex flex-col items-center justify-center">
    <div className="space-y-12 max-w-2xl mx-auto p-8 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg">
      <h2 style={{color: '#0A1128'}} className="text-3xl sm:text-4xl font-serif">
        Nosso Agradecimento Especial
      </h2>
      
      <div className="w-full">
        <video
          className="w-full rounded-lg shadow-md"
          controls
          autoPlay={false}
          playsInline
          preload="metadata"
        >
          <source src={pages[currentPage].media.url} type="video/mp4" />
          Seu navegador não suporta o elemento de vídeo.
        </video>
      </div>
    </div>
  </div>
);


  const renderInvitationPage = () => (
    <div className="text-center space-y-8 py-4 sm:py-8 px-2 sm:px-8">
      <div className="space-y-6">
        <Heart style={{color: '#034078'}} className="w-12 h-12 mx-auto animate-pulse" />
        <h2 style={{color: '#0A1128'}} className="text-3xl sm:text-5xl font-serif">
          Informações Especiais
        </h2>
      </div>

      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg space-y-8 p-4 sm:p-8">
        {/* Seção Especial para Padrinhos */}
        <div style={{backgroundColor: '#FEFCFB'}} 
             className="p-4 rounded-lg space-y-4 mb-8 border border-[#1282A2]">
          <h3 style={{color: '#0A1128'}} className="text-xl font-medium">Informações para os Padrinhos</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="font-medium" style={{color: '#001F54'}}>Trajes</p>
              <p style={{color: '#0A1128'}}>
                Optamos por não escolher cores para as vestimentas dos padrinhos, 
                mas devem se atentar para não usarem as cores dos noivos: 
                Que são azul marinho e braco.
                Mais detalhes serão enviados em nosso grupo exclusivo.
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="font-medium" style={{color: '#001F54'}}>Ensaio</p>
              <p style={{color: '#0A1128'}}>
                O ensaio será realizado no dia 26 de Dezembro às 19h na Igreja.
                A presença de todos é fundamental.
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-medium" style={{color: '#001F54'}}>No Dia</p>
              <p style={{color: '#0A1128'}}>
                Pedimos que os padrinhos cheguem com 1 hora de antecedência para fotos e preparativos.
              </p>
            </div>

            <button 
              onClick={() => window.open('https://chat.whatsapp.com/seugrupo')}
              style={{backgroundColor: '#034078'}}
              className="w-full text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-all mt-4"
            >
              Entrar no Grupo dos Padrinhos
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-center gap-2">
            <Calendar style={{color: '#034078'}} className="w-6 h-6" />
            <p style={{color: '#0A1128'}} className="text-xl sm:text-2xl font-medium">
              27 de Dezembro de 2025
            </p>
          </div>

          {/* Cerimônia */}
          <div style={{backgroundColor: '#FEFCFB'}} 
               className="p-4 rounded-lg space-y-4 transition-all hover:shadow-md border border-[#1282A2]">
            <h3 style={{color: '#0A1128'}} className="text-xl font-medium">Cerimônia</h3>
            <div className="space-y-2">
              <p style={{color: '#0A1128'}} className="text-lg">17:00 horas</p>
              <p style={{color: '#0A1128'}} className="text-lg font-medium">
                Igreja Nossa Senhora da Luz
              </p>
              <p style={{color: '#0A1128'}} className="text-lg">
                Av. Nossa Sra. da Luz, 194 - Centro
              </p>
              <p style={{color: '#0A1128'}} className="text-lg">Clevelândia - PR</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <button
                onClick={() => {
                  window.open('https://www.google.com/maps/place/Igreja+Nossa+Senhora+da+Luz/@-26.4054754,-52.3553762,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipN2srrWdGyDefwveWJzaZR_IGrMKAp5XFKgAhlC!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipN2srrWdGyDefwveWJzaZR_IGrMKAp5XFKgAhlC%3Dw114-h86-k-no!7i4032!8i3024!4m7!3m6!1s0x94e53dc34c0375fb:0x439b0cf20cda5c80!8m2!3d-26.4054117!4d-52.35541!10e5!16s%2Fg%2F11fn8ww954?entry=ttu');
                }}
                style={{backgroundColor: '#034078'}}
                className="flex-1 text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Map className="w-4 h-4" />
                Ver no Maps
              </button>
              <button
                onClick={() => {
                  const event = {
                    text: "Cerimônia de Casamento",
                    dates: "20251227T170000",
                    location: "Igreja Matriz Nossa Senhora da Luz"
                  };
                  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.text)}&dates=${event.dates}/${event.dates}&location=${encodeURIComponent(event.location)}`;
                  window.open(googleCalendarUrl);
                }}
                style={{backgroundColor: '#001F54'}}
                className="flex-1 text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Save the Date
              </button>
            </div>
          </div>

          {/* Festa */}
          <div style={{backgroundColor: '#FEFCFB'}} 
               className="p-4 rounded-lg space-y-4 transition-all hover:shadow-md border border-[#1282A2]">
            <h3 style={{color: '#0A1128'}} className="text-xl font-medium">Festa</h3>
            <div className="space-y-2">
              <p style={{color: '#0A1128'}} className="text-lg">20:00 horas</p>
              <p style={{color: '#0A1128'}} className="text-lg font-medium">
                Clube Grêmio Mariopolitano
              </p>
              <p style={{color: '#0A1128'}} className="text-lg">
                Alameda Um, 1450 - Centro
              </p>
              <p style={{color: '#0A1128'}} className="text-lg">Mariópolis - PR</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <button
                onClick={() => {
                  window.open('https://www.google.com/maps/place/Clube+Gr%C3%AAmio+Mariopolitano/@-26.360187,-52.6215843,13z/data=!4m10!1m2!2m1!1sclube+mariopolis!3m6!1s0x94e54813b25716c5:0x7057fd14b9cf9b90!8m2!3d-26.360187!4d-52.5453666!15sChBjbHViZSBtYXJpb3BvbGlzWhIiEGNsdWJlIG1hcmlvcG9saXOSAQZzcG9ydHOaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVTlhNVkF0VTJGbkVBReABAPoBBAgAEDQ!16s%2Fg%2F1hc8m061g?entry=ttu');
                }}
                style={{backgroundColor: '#034078'}}
                className="flex-1 text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Map className="w-4 h-4" />
                Ver no Maps
              </button>
              <button
                onClick={() => {
                  const event = {
                    text: "Festa de Casamento",
                    dates: "20251227T200000",
                    location: "Clube Grêmio Mariopolitano"
                  };
                  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.text)}&dates=${event.dates}/${event.dates}&location=${encodeURIComponent(event.location)}`;
                  window.open(googleCalendarUrl);
                }}
                style={{backgroundColor: '#001F54'}}
                className="flex-1 text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Save the Date
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-center max-w-xl mx-auto">
            <p style={{color: '#0A1128'}} className="text-lg leading-relaxed">
              O verdadeiro presente é poder compartilhar este momento único com você.
              Sua presença é o que tornará nosso dia ainda mais especial e memorável.
            </p>
            <p style={{color: '#0A1128'}} className="text-lg leading-relaxed mt-4">
              Caso manifestem o interesse em nos presentear além de sua presença, 
              compartilhamos que estamos iniciando a construção do nosso lar juntos.
            </p>
            
            <div style={{backgroundColor: '#FEFCFB'}} 
                 className="rounded-lg p-4 mt-6 transition-all hover:shadow-md border border-[#1282A2]">
              <p style={{color: '#0A1128'}} className="font-light mb-3">Nossa chave PIX:</p>
              <div className="flex items-center justify-center gap-2 w-full max-w-sm mx-auto">
                <input 
                  type="text" 
                  value={pixKey}
                  readOnly
                  className="w-full px-4 py-2 border rounded-l-lg bg-white text-gray-700"
                />
                <button
                  onClick={copyPixKey}
                  style={{backgroundColor: '#034078'}}
                  className="px-4 py-2 rounded-r-lg border-y border-r transition-colors text-white hover:bg-opacity-90 flex-shrink-0"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
              {showCopySuccess && (
                <p className="text-green-600 text-sm mt-2">Chave PIX copiada!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col items-center justify-center" 
         style={{backgroundColor: '#FEFCFB'}}>
      <audio
        ref={audioRef}
        loop
        style={{ display: 'none' }}
        src="/convite-padrinhos/arquivos/musica.mp3"
      />

      <MusicControl />

      <div className="w-full max-w-4xl mx-auto p-4 sm:p-8">
        <div className="bg-white rounded-lg shadow-2xl p-4 sm:p-8 relative">
          {pages[currentPage].type === 'cover' ? (
            renderCoverPage()
          ) : pages[currentPage].type === 'surprise-message' ? (
            renderSurpriseMessage()
          ) : pages[currentPage].type === 'question' ? (
            renderQuestionPage()
          ) : pages[currentPage].type === 'accepted' ? (
            renderAcceptedPage()
          ) : pages[currentPage].type === 'thank-you-video' ? (
            renderThankYouVideo()
          ) : pages[currentPage].type === 'invitation' ? (
            renderInvitationPage()
          ) : (
            <div className="mb-8 space-y-6">
              <h2 style={{color: '#0A1128'}} className="text-2xl sm:text-3xl font-serif text-center">
                {pages[currentPage].title}
              </h2>
              
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <div className="w-full md:w-1/2">
                  {pages[currentPage].media?.type === "carousel" && (
                    <Carousel items={pages[currentPage].media.items} />
                  )}
                  {pages[currentPage].media?.type === "image" && (
                    <ImagePlayer url={pages[currentPage].media.url} />
                  )}
                  {pages[currentPage].media?.type === "video" && (
                    <video
                      className="w-full rounded-lg shadow-md"
                      controls
                      muted
                      autoPlay={false}
                      playsInline
                      preload="metadata"
                    >
                      <source src={pages[currentPage].media.url} type="video/mp4" />
                      Seu navegador não suporta o elemento de vídeo.
                    </video>
                  )}
                </div>
                
                <div className="w-full md:w-1/2">
                  <p style={{color: '#0A1128'}} className="text-lg leading-relaxed">
                    {pages[currentPage].text}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navegação minimalista - esconder na capa e na página de pergunta */}
          {!['cover', 'question'].includes(pages[currentPage].type) && (
            <div className="flex justify-between items-center">
              {currentPage > 0 && (
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  style={{backgroundColor: '#001F54'}}
                  className="p-3 rounded-full text-white hover:bg-opacity-90 transition-all shadow-md"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              
              {currentPage < pages.length - 1 && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  style={{backgroundColor: '#001F54'}}
                  className={`p-3 rounded-full text-white hover:bg-opacity-90 transition-all shadow-md ${
                    currentPage === 0 ? 'ml-auto' : ''
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryBook;