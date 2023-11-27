// Welcome.jsx
import Image from "next/image";
function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 rounded-lg shadow-lg backdrop-blur-md font-sans">
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
