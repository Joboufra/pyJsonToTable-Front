// Welcome.jsx
import Image from 'next/image';

function Welcome() {
  const steps = [
    'Pega o escribe tu JSON en la columna izquierda.',
    'Pulsa "Procesar JSON" para generar la tabla.',
    'Filtra por columna o exporta el resultado.',
  ];

  return (
    <div className="flex flex-col justify-center items-center h-full min-h-[520px] rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-6 font-sans shadow-inner">
      <div className="flex items-center gap-2 text-2xl font-bold text-white mb-4 uppercase">
        <Image src="/logo.webp" alt="Logo" width={44} height={44} />
        JSON to Table
      </div>
      <p className="text-lg text-slate-200 text-center max-w-2xl">
        Transforma tus datos JSON en tablas listas para explorar y compartir. Ideal para validar respuestas de APIs o filtrar datasets rápidamente.
      </p>
      <div className="grid md:grid-cols-3 gap-3 mt-6 w-full max-w-3xl">
        {steps.map((step, idx) => (
          <div key={idx} className="rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-center text-slate-200">
            <span className="text-teal-300 font-semibold mr-2">0{idx + 1}.</span>
            {step}
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-5 text-center">
        Ningun dato se almacena. Todo el procesado ocurre en la sesion actual.
      </p>
    </div>
  );
}

export default Welcome;
