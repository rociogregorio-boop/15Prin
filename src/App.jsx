import { useState, useEffect } from 'react';

// Datos de la Quinceañera
const EVENT_CONFIG = {
    birthdayGirl: "Princesa",
    date: "2026-10-10T21:00:00", // 10 de Octubre de 2026
    prettyDate: "Sábado 10 de Octubre, 2026",
    ceremonyLocation: "Parroquia San Francisco",
    ceremonyAddress: "Av. Principal 1234",
    ceremonyTime: "19:30 hs",
    partyLocation: "Salón de Fiestas",
    partyAddress: "Camino Principal Km 5",
    partyTime: "21:00 hs",
    cbu: "0000003100012345678901",
    alias: "Princesa021",
    bankHolder: "Princesa Del Valle Azul Gregorio Hinga",
    bankName: "Mercado Pago"
};

// Opciones de Regalos
// Opciones de Regalos (Incluye opciones individuales y grupales)
const GIFT_LIST = [
    { id: 1, title: "Celular / Smartwatch (Regalo Grupal 📱)", icon: "fa-mobile-screen-button" },
    { id: 2, title: "Fondo para el Viaje de 15 ✈️", icon: "fa-plane" },
    { id: 3, title: "Voucher para Ropa / Zapatos 👗", icon: "fa-shirt" },
    { id: 4, title: "Sesión de Fotos / Álbum 📸", icon: "fa-camera" },
    { id: 5, title: "Auriculares Inalámbricos 🎧", icon: "fa-headphones" },
    { id: 6, title: "Día de Spa / Maquillaje 💄", icon: "fa-sparkles" },
    { id: 7, title: "Perfume / Accesorios ✨", icon: "fa-gem" },
    { id: 8, title: "Aporte Libre (CBU / Efectivo) 🎁", icon: "fa-gift" }
];

export default function App() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [selectedGift, setSelectedGift] = useState('');
    
    // Estado para Formulario RSVP (Asistencia)
    const [rsvpData, setRsvpData] = useState({ 
        fullName: '', 
        attending: 'si', 
        companions: 0, 
        dietary: '',
        giftChoice: '' 
    });
    const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
    const [toast, setToast] = useState('');

    // Cuenta Regresiva al 10 de Octubre de 2026
    useEffect(() => {
        const target = new Date(EVENT_CONFIG.date).getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = target - now;
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(''), 3000);
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        showToast(`¡${label} copiado!`);
    };

    const handleRsvpSubmit = (e) => {
        e.preventDefault();
        setRsvpSubmitted(true);
        showToast("¡Confirmación recibida exitosamente!");
    };

    return (
        <div className="min-h-screen bg-rose-50/40 text-slate-800 font-sans pb-16">
            
            {/* Mensaje flotante de confirmación/copiado */}
            {toast && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-rose-700 text-white px-6 py-3 rounded-full shadow-xl text-sm font-semibold animate-bounce">
                    {toast}
                </div>
            )}

            {/* HERO PRINCIPAL */}
            <header className="min-h-[75vh] flex flex-col justify-center items-center text-center px-4 pt-12">
                <span className="px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-widest border border-rose-200 mb-2">
                    Mis 15 Años
                </span>
                
                <h1 className="text-6xl sm:text-8xl font-bold text-rose-700 my-2 tracking-tight">
                    {EVENT_CONFIG.birthdayGirl}
                </h1>

                <p className="text-slate-600 text-base sm:text-lg italic max-w-md my-2">
                    {EVENT_CONFIG.prettyDate}
                </p>

                {/* Reloj Cuenta Regresiva */}
                <div className="grid grid-cols-4 gap-3 max-w-md w-full my-6">
                    {[
                        { label: 'Días', val: timeLeft.days },
                        { label: 'Hs', val: timeLeft.hours },
                        { label: 'Min', val: timeLeft.minutes },
                        { label: 'Seg', val: timeLeft.seconds }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-2xl shadow-sm border border-rose-100 text-center">
                            <span className="block text-2xl font-bold text-rose-600">
                                {String(item.val).padStart(2, '0')}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium uppercase block mt-1">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="flex gap-3 mt-2">
                    <a href="#rsvp" className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-md text-sm transition">
                        Confirmar Asistencia
                    </a>
                    <a href="#regalos" className="bg-white text-rose-700 border border-rose-200 font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-rose-50 transition">
                        Ver Regalos
                    </a>
                </div>
            </header>

            {/* 🎥 SECCIÓN VIDEO DE PRINCESA */}
            <section className="max-w-3xl mx-auto px-4 py-8">
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-slate-800">Video Especial</h2>
                    <p className="text-xs text-slate-500">Un recorrido inolvidable para compartir con ustedes</p>
                </div>
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-black">
                    {/* Cambiá esta URL por el video de YouTube que quieras poner */}
                  <iframe 
    className="w-full h-full"
    src="https://www.youtube.com/embed/kei9JzhdiMg" 
    title="Video de Princesa"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowFullScreen
></iframe>
                </div>
            </section>

            {/* 📸 GALERÍA DE FOTOS */}
            <section className="max-w-4xl mx-auto px-4 py-8">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">Galería de Fotos</h2>
                    <p className="text-xs text-slate-500">Momentos preferidos de Princesa</p>
                </div>
              <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory py-4 px-2 scrollbar-none">
    {Array.from({ length: 32 }, (_, i) => `/foto${i + 1}.jpeg`).map((imgUrl, idx) => (
        <div 
            key={idx} 
            className="flex-none w-64 sm:w-80 aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-white snap-center hover:scale-105 transition duration-300"
        >
            <img 
                src={imgUrl} 
                alt={`Foto Princesa ${idx + 1}`} 
                className="w-full h-full object-cover" 
            />
        </div>
    ))}
</div>
            </section>

            {/* 🎁 LISTA DE REGALOS & DATOS BANCARIOS */}
            <section id="regalos" className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm text-center">
                    <i className="fa-solid fa-gift text-3xl text-amber-500 mb-2"></i>
                    <h2 className="font-bold text-2xl text-slate-800">Mesa de Regalos</h2>
                    <p className="text-xs text-slate-500 mb-6">Tu presencia es lo más importante. Si deseas hacerle un regalo a Princesa:</p>

                    {/* Tarjetas de Regalo Elegibles */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        {GIFT_LIST.map((gift) => (
                            <button 
                                key={gift.id}
                                onClick={() => {
                                    setSelectedGift(gift.title);
                                    setRsvpData({...rsvpData, giftChoice: gift.title});
                                    showToast(`Seleccionaste: ${gift.title}`);
                                }}
                                className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition ${
                                    selectedGift === gift.title 
                                        ? 'border-rose-600 bg-rose-50 text-rose-700 font-bold' 
                                        : 'border-slate-200 hover:border-rose-300'
                                }`}
                            >
                                <i className={`fa-solid ${gift.icon} text-lg text-amber-500`}></i>
                                <span className="text-xs">{gift.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* CBU & Alias */}
                    <div className="bg-slate-50 p-4 rounded-2xl text-xs space-y-2 text-left border border-slate-100">
                        <div className="flex justify-between items-center">
                            <span>Alias: <strong>{EVENT_CONFIG.alias}</strong></span>
                            <button onClick={() => copyToClipboard(EVENT_CONFIG.alias, 'Alias')} className="text-rose-600 font-bold">Copiar</button>
                        </div>
                        <div className="flex justify-between items-center border-t pt-2">
                            <span>CBU: <strong>{EVENT_CONFIG.cbu}</strong></span>
                            <button onClick={() => copyToClipboard(EVENT_CONFIG.cbu, 'CBU')} className="text-rose-600 font-bold">Copiar</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ✍️ CONFIRMACIÓN DE ASISTENCIA (RSVP) */}
            <section id="rsvp" className="max-w-xl mx-auto px-4 py-8">
                <div className="bg-white p-8 rounded-3xl border border-rose-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-800 text-center mb-1">Confirmar Asistencia</h2>
                    <p className="text-center text-xs text-slate-500 mb-6">Asegurá tu lugar en los 15 de Princesa</p>

                    {rsvpSubmitted ? (
                        <div className="text-center py-6">
                            <i className="fa-solid fa-circle-check text-5xl text-emerald-500 mb-3"></i>
                            <h3 className="font-bold text-lg text-slate-800">¡Asistencia Confirmada!</h3>
                            <p className="text-xs text-slate-500 mt-1">¡Nos vemos el 10 de Octubre para festejar!</p>
                        </div>
                    ) : (
                        <form onSubmit={handleRsvpSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Nombre Completo *</label>
                                <input 
                                    type="text" required 
                                    value={rsvpData.fullName}
                                    onChange={(e) => setRsvpData({...rsvpData, fullName: e.target.value})}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500" 
                                    placeholder="Ej. María Pérez"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">¿Asistes?</label>
                                    <select 
                                        value={rsvpData.attending}
                                        onChange={(e) => setRsvpData({...rsvpData, attending: e.target.value})}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                                    >
                                        <option value="si">¡Sí, ahí estaré!</option>
                                        <option value="no">No podré ir</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Acompañantes</label>
                                    <input 
                                        type="number" min="0" max="5"
                                        value={rsvpData.companions}
                                        onChange={(e) => setRsvpData({...rsvpData, companions: e.target.value})}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Restricción Alimentaria</label>
                                <input 
                                    type="text" 
                                    value={rsvpData.dietary}
                                    onChange={(e) => setRsvpData({...rsvpData, dietary: e.target.value})}
                                    placeholder="Ej. Celíaco, Vegano, Vegetariano"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                                />
                            </div>

                            {selectedGift && (
                                <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-800 border border-amber-200">
                                    🎁 Regalo elegido: <strong>{selectedGift}</strong>
                                </div>
                            )}

                            <button type="submit" className="w-full bg-rose-600 text-white font-bold py-3 rounded-xl hover:bg-rose-700 text-sm shadow-md transition">
                                Enviar Confirmación
                            </button>
                        </form>
                    )}
                </div>
            </section>

        </div>
    );
}