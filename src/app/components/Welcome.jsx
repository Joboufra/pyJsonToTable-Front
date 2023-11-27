// Welcome.jsx
import Image from "next/image";
function Welcome() {
  return (
    <div className="flex flex-col justify-center items-center h-full mt-20 md:mt-0 md:h-screen p-6 font-sans">
      <h2 className="flex flex-row items-center text-2xl font-bold text-white mb-4 uppercase gap-2">
        <Image 
            src="/logo.webp"
            alt="Logo" 
            width={48}
            height={48}
          />
          JSON to Table
          </h2>
        <p className="text-xl text-gray-400 text-center">Introduce tus datos y dale al botón de &apos;Procesar JSON&apos; para que podamos comenzar.</p>
    </div>
  );
}

export default Welcome;
