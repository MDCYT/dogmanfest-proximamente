"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Estructura para los diferentes contenidos según la contraseña
interface ContentData {
  image: string;
  audioSrc: string;
  artistName: string;
  socialLink: string;
  description?: string; // Descripción opcional para el artista
}

// Mapa de contraseñas (normalizadas) a sus contenidos correspondientes
const passwordMap: Record<string, ContentData> = {
  dina: {
    image: "https://cdn.dogmanfestperu.com/GnQjjpJWMAA3iCJ.jpg",
    audioSrc:
      "https://cdn.dogmanfestperu.com/Tony%20Rosado%20Ya%20Te%20Olvide%20Conchetumare.mp3",
    artistName: "An_Velas",
    socialLink: "https://x.com/an_velas/status/1906189651527831745/photo/1",
    description: "Fuera Dina, Fuera Dina",
  },
  familia: {
    image: "https://cdn.dogmanfestperu.com/familia_by_meimei.webp",
    audioSrc:
      "https://cdn.dogmanfestperu.com/SPY%20X%20FAMILY%20ED%20Full%20Comedy%20by%20Gen%20Hoshino.mp3",
    artistName: "MeiMei",
    socialLink: "https://www.instagram.com/p/DLBB4sJB0sW/?img_index=1",
    description:
      "Ejemplos de los standees que hice para mi última feria, con muchas ganas de hacer más a futuro ✨",
  },
  scarlet: {
    image:
      "https://cdn.dogmanfestperu.com/491449928_18502451395035044_4944798919556806985_n.webp",
    audioSrc:
      "https://cdn.dogmanfestperu.com/%5BWAF%5DDon%20Omar%20-%20El%20Se%C3%B1or%20De%20La%20Noche.mp3",
    artistName: "MeiMei",
    socialLink: "https://www.instagram.com/p/DIt2vLps_IF/?img_index=1",
    description:
      "Ay dogman 🫦💖 subiendo cositas que hice para la #dogmanfest ✨",
  },
  patas: {
    image:
      "https://cdn.dogmanfestperu.com/491443298_18502762591035044_1110321694424357743_n.webp",
    audioSrc:
      "https://cdn.dogmanfestperu.com/Shakira%20-%20Addicted%20to%20You.mp3",
    artistName: "MeiMei",
    socialLink: "https://www.instagram.com/p/DIt2vLps_IF/?img_index=1",
    description:
      "Se vino el gato entregando la cola ✨ Seguimos con la ronda de cositas que hice para la #dogmanfest",
  },
  margarita: {
    image: "https://cdn.dogmanfestperu.com/GnjknYWWIAAeiWy.jpg",
    audioSrc: "https://cdn.dogmanfestperu.com/GnjknYWWIAAeiWy.jpg",
    artistName: "RayBunny",
    socialLink: "https://x.com/RayBunny18/status/1907525810065465367",
    description: "Yo tmb me quería unir al trend❤️",
  },
  lilpetey: {
    image:
      "https://cdn.dogmanfestperu.com/495048208_18064428167069537_1535931132460547718_n.webp",
    audioSrc: "https://cdn.dogmanfestperu.com/honeypie.mp3",
    artistName: "aleex_ferr0",
    socialLink: "https://www.instagram.com/p/DJFy1mSOIlV/?img_index=1",
    description: "Akira referencia pq si❤️",
  },
  grace: {
    image:
      "https://cdn.dogmanfestperu.com/496221429_18065438738069537_4193147184948655077_n.webp",
    audioSrc:
      "https://cdn.dogmanfestperu.com/Biper%20Y%20El%20Patito%20Juan%2C%20Obedece%20A%20Tu%20Mam%C3%A1...mp3",
    artistName: "aleex_ferr0",
    socialLink: "https://www.instagram.com/p/DJFy1mSOIlV/?img_index=1",
    description: "Feliz día de la madre❤️❤️❤️",
  },
  familiatradicional: {
    image:
      "https://cdn.dogmanfestperu.com/486233982_17931113625016787_3962740590510628689_n.webp",
    audioSrc:
      "https://cdn.dogmanfestperu.com/%E2%99%A5DIOS%20ESTA%20aqu%C3%AD%20TAN%20CIERTO%20COMO%20EL%20AIRE%20que%20RESPIRO%20Alabanza%20y%20Adoracion%20Cristiana%20Hossana.mp3",
    artistName: "Run Run Celestial",
    socialLink: "https://www.instagram.com/p/DHv0eJIR0AA/",
    description: "La familia como Dios ordenó✨",
  },
  petey: {
    image:
      "https://cdn.dogmanfestperu.com/486747788_17931114027016787_4559648007420613639_n.webp",
    audioSrc:
      "https://cdn.dogmanfestperu.com/Natti%20Natasha%20Ft.%20Ozuna%20-%20Criminal.mp3",
    artistName: "Run Run Celestial",
    socialLink: "https://www.instagram.com/p/DHv0xYTxJ4V/",
    description: "Jijijiji aquí mi versión de poster amooo 💖",
  },
  detey: {
    image: "https://cdn.dogmanfestperu.com/GsJ5JGLWMAAjsdt.jpg",
    audioSrc:
      "https://cdn.dogmanfestperu.com/Lady%20Gaga%2C%20Bruno%20Mars%20-%20Die%20With%20A%20Smile.mp3",
    artistName: "RayBunny",
    socialLink: "https://x.com/RayBunny18/status/1928236789619118284",
    description: "Besito 💕",
  },
  peru: {
    image: "https://cdn.dogmanfestperu.com/GmsrRuzbwAAB8oo.jpg",
    audioSrc: "https://cdn.dogmanfestperu.com/Mi%20Vecinita%20-%20Plan%20B.mp3",
    artistName: "Sanchi",
    socialLink:
      "https://x.com/sanchi_comics/status/1903663081554681961/photo/1",
    description:
      "Animense causas. Y nos comemos un rico cuysito frito mientras hablamos mal de Grampa. 😋",
  },
  molly: {
    image: "https://cdn.dogmanfestperu.com/GpbGWeAWIAAMwkf.jpg",
    audioSrc:
      "https://cdn.dogmanfestperu.com/Digital%20Hallucination%20by%200R30%20(feat.%20Lizzie%20Freeman).mp3",
    artistName: "Sanchi",
    socialLink:
      "https://x.com/sanchi_comics/status/1903663081554681961/photo/1",
    description: "Miedo, terror, panico, ozuna.",
  },
  travas: {
    image: "https://cdn.dogmanfestperu.com/GpzkRRQXEAANuIV.jpg",
    audioSrc:
      "https://cdn.dogmanfestperu.com/Voy%20Buscando%20Un%20Travesti.mp3",
    artistName: "RayBunny",
    socialLink: "https://x.com/RayBunny18/status/1917658534520430672",
    description: "💋 Busy woman ✨",
  },
  flatpetey: {
    image: "https://cdn.dogmanfestperu.com/GuIj--jWMAAQHdC.jpg",
    audioSrc:
      "https://cdn.dogmanfestperu.com/El%20Ritmo%20de%20Mi%20Corazon.mp3",
    artistName: "RayBunny",
    socialLink: "https://x.com/RayBunny18/status/1917658534520430672",
    description: "No sé, adoro a estos mensos",
  },
  aibuddy: {
    image: "https://cdn.dogmanfestperu.com/GuIj--jWMAAQHdC.jpg",
    audioSrc:
      "https://cdn.dogmanfestperu.com/El%20Ritmo%20de%20Mi%20Corazon.mp3",
    artistName: "RayBunny",
    socialLink: "https://x.com/RayBunny18/status/1917658534520430672",
    description: "No sé, adoro a estos mensos",
  },
  faraon: {
    image:
      "https://cdn.dogmanfestperu.com/509634526_17940510195016787_9087118194302107283_n.webp",
    audioSrc:
      "https://cdn.dogmanfestperu.com/%F0%9D%90%93%F0%9D%90%AE%F0%9D%90%AD%F0%9D%90%9A%F0%9D%90%A7%F0%9D%90%A4'%F0%9D%90%8C%F0%9D%90%A8%F0%9D%90%A7.mp3",
    artistName: "Run Run Celestial",
    socialLink: "https://www.instagram.com/p/DLLsZ2HN2Ys/",
    description: "AU FARAON Diseños de akione :3",
  },
  greeneyes: {
    image:
      "https://cdn.dogmanfestperu.com/502583695_17940496041016787_6985670300185319039_n.webp",
    audioSrc:
      "https://cdn.dogmanfestperu.com/Lucas%20Sugo%20Ft.%2018%20Kilates%20-%20Desde%20Esa%20Noche%20(Prod.%20Dakos%20Music).mp3",
    artistName: "Run Run Celestial",
    socialLink: "https://www.instagram.com/p/DLLsZ2HN2Ys/",
    description: "Botas top grrrl y el sixpack de greg🤤",
  },
  dogman: {
    image:
      "https://cdn.dogmanfestperu.com/505790843_18068570489069537_6988602910657525458_n.webp",
    audioSrc: "https://cdn.dogmanfestperu.com/El%20embrujo%20-%20Grupo%205.mp3",
    artistName: "aleex_ferr0",
    socialLink: "http://www.instagram.com/p/DK26yW4O0GR/?img_index=1",
    description: "Perdón por no subir dibujos pepepe ",
  },
  greg: {
    image:
      "https://cdn.dogmanfestperu.com/505790843_18068570489069537_6988602910657525458_n.webp",
    audioSrc: "https://cdn.dogmanfestperu.com/El%20embrujo%20-%20Grupo%205.mp3",
    artistName: "aleex_ferr0",
    socialLink: "http://www.instagram.com/p/DK26yW4O0GR/?img_index=1",
    description: "Perdón por no subir dibujos pepepe",
  },
  dipron: {
    image: "https://cdn.dogmanfestperu.com/82691442_T7vlNRz9s9Tz9VO.png",
    audioSrc: "https://cdn.dogmanfestperu.com/Downtown.mp3",
    artistName: "Bunny",
    socialLink: "/",
    description:
      "Hola, soy MDC, nidea como encontraste esto, pero te presento a mi OC Dipron y Oliver",
  },
  oliver: {
    image: "https://cdn.dogmanfestperu.com/82691442_T7vlNRz9s9Tz9VO.png",
    audioSrc: "https://cdn.dogmanfestperu.com/Downtown.mp3",
    artistName: "Bunny",
    socialLink: "/",
    description:
      "Hola, soy MDC, nidea como encontraste esto, pero te presento a mi OC Dipron y Oliver",
  },
  grampa:  {
    image: "https://cdn.dogmanfestperu.com/Gu4hby0XAAAQ4VM.jpg",
    audioSrc: "https://cdn.dogmanfestperu.com/Mayores.mp3",
    artistName: "Damo",
    socialLink: "https://x.com/damo_art/status/1940530928952267221?t=eNYRmJ6GDcpSpBFZRUQXug",
    description:
      "Man of the year !!! ✨💚✨ No eres el jefe sin algunos rasguños...",
  },
};

export function PasswordEntry() {
  // Este comentario es importante:
  // Para que funcione, debes agregar imágenes en /public/artists/
  // y archivos de audio en /public/audio/ con los nombres correspondientes
  // por ejemplo: lilpetey.jpg, lilpetey.mp3, etc.
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState<ContentData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Normaliza la contraseña (minúsculas y sin espacios)
  const normalizePassword = (pwd: string): string => {
    return pwd.toLowerCase().replace(/\s+/g, "");
  };

  // Efecto para dar foco al input cuando se carga el componente
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    if (password.trim() === "") {
      setError("Por favor ingrese una contraseña");
      return;
    }

    setIsLoading(true);

    // Simular un pequeño retraso para efecto visual
    setTimeout(() => {
      const normalizedPassword = normalizePassword(password);
      const content = passwordMap[normalizedPassword];

      setAttempts((prev) => prev + 1);

      if (content) {
        setCurrentContent(content);
        setError("");
        setShowSuccessAnimation(true);

        // Mostrar animación de éxito y luego abrir el modal
        setTimeout(() => {
          setShowSuccessAnimation(false);
          setIsOpen(true);
          setIsLoading(false);
        }, 1000);
      } else {
        setError("Contraseña inválida");
        setCurrentContent(null);
        setIsErrorDialogOpen(true);
        setIsLoading(false);
      }
    }, 800);
  };

  const handleDialogClose = () => {
    // Detener el audio cuando se cierra el modal
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsOpen(false);

    // Limpiar el campo de contraseña y dar foco nuevamente
    setPassword("");
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  return (
    <div className="w-full flex flex-col gap-4 mt-4">
      <AnimatePresence>
        {showSuccessAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="absolute inset-0 flex items-center justify-center bg-green-500/20 backdrop-blur-sm z-50 rounded-lg"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: [0.5, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-full p-6 shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-3 w-full"
      >
        <Label htmlFor="password" className="text-lg font-medium text-center">
          Contraseña
        </Label>
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Ingrese la contraseña"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            className="border-2 focus:border-blue-500 focus:ring-blue-500"
            disabled={isLoading}
          />
          <Button
            onClick={handleSubmit}
            className={`font-semibold transition-all duration-200 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Verificando</span>
              </span>
            ) : (
              "Enviar"
            )}
          </Button>
        </div>
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-500 text-sm font-medium"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {attempts > 2 && !currentContent && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-amber-600 text-xs italic mt-1"
          >
            Pista: Prueba con nombres de personajes de Dog Man y otras cosas
          </motion.p>
        )}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-gray-500 mt-2 max-w-xs mx-auto font-medium border-t border-gray-200 pt-4"
      >
        Página en construcción, ponga la contraseña para entrar
      </motion.p>

      {/* Dialog para error de contraseña */}
      <Dialog
        open={isErrorDialogOpen}
        onOpenChange={(open) => {
          setIsErrorDialogOpen(open);
          if (!open) {
            setTimeout(() => {
              if (inputRef.current) inputRef.current.focus();
            }, 100);
          }
        }}
      >
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-2 border-red-200 dark:border-red-900">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center text-red-600 dark:text-red-400">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: [0.8, 1.1, 1] }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                Error de Acceso
              </motion.div>
            </DialogTitle>
            <DialogDescription className="text-center">
              La contraseña ingresada no es válida. Por favor intente
              nuevamente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Cerrar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal con el contenido */}
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) handleDialogClose();
        }}
      >
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 border-2 border-blue-200 dark:border-blue-900">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                Mientras esperas, ve algunos dibujos y escucha musica :3
              </motion.div>
            </DialogTitle>
          </DialogHeader>

          {currentContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-64 mx-auto"
              >
                <Image
                  src={currentContent.image}
                  alt={`Arte de ${currentContent.artistName}`}
                  fill
                  className="object-contain rounded-lg shadow-lg"
                  priority
                />
              </motion.div>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full"
              >
                <audio
                  ref={audioRef}
                  src={currentContent.audioSrc}
                  autoPlay
                  className="w-full mt-2"
                  controls
                />
              </motion.div>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center space-y-2 bg-white/50 dark:bg-black/20 p-3 rounded-lg w-full"
              >
                <p className="font-medium">
                  Arte/Imagen de:{" "}
                  <Link
                    href={currentContent.socialLink}
                    target="_blank"
                    className="text-blue-500 hover:underline font-bold"
                  >
                    @{currentContent.artistName}
                  </Link>
                </p>

                {currentContent.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                    &quot;{currentContent.description}&quot;
                  </p>
                )}
              </motion.div>
            </motion.div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                onClick={handleDialogClose}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Cerrar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
