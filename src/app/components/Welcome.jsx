// Welcome.jsx
function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 rounded-lg shadow-lg backdrop-blur-md font-sans">
      <h2 className="text-3xl font-bold text-white mb-4">JsonToTable</h2>
      <p className="text-xl text-gray-400">Escribe tu JSON y dale al botón de procesar JSON para que podamos comenzar.</p>
    </div>
  );
}

export default Welcome;
