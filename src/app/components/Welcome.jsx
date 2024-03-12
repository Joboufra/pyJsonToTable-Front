// Welcome.jsx
import Image from "next/image";
function Welcome() {
  return (
    <div className="flex flex-col justify-center items-center h-full mt-15 md:mt-0 md:h-screen p-6 font-sans">
      <h2 className="flex flex-row items-center text-2xl font-bold text-white mb-4 uppercase gap-2">
        <Image 
            src="/logo.webp"
            alt="Logo" 
            width={48}
            height={48}
          />
          JSON to Table
          </h2>
        <p className="text-xl text-gray-400 text-center font-sans">Introduce tus datos y pulsa el botón de <b>Procesar JSON</b> para mostrar la tabla.</p>
        <p className="text-sm text-gray-500 mt-5 text-center font-sans">Nota: Los datos que se envían en esta aplicación no se almacenan de ninguna manera</p>
    </div>
  );
}

export default Welcome;
