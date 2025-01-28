// import { useState, useEffect } from "react";

// export default function AdblockerWarning() {
//     const [adblockerDetected, setAdblockerDetected] = useState(false);

//     useEffect(() => {
//         const detectAdblocker = () => {
//             const testAd = document.createElement("div");
//             testAd.className = "adsbygoogle"; // Adblockerek által blokkolt osztály
//             testAd.style.display = "none";
//             document.body.appendChild(testAd);

//             // Ellenőrzi, hogy az elem látható-e
//             const isBlocked = window.getComputedStyle(testAd).display === "none";
//             document.body.removeChild(testAd);
//             return isBlocked;
//         };

//         if (detectAdblocker()) {
//             console.log("Adblocker detected");
//             setAdblockerDetected(true);
//         }
//     }, []); // Csak egyszer fusson le a komponens mountolásakor

//     if (!adblockerDetected) return null;

//     return (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 1000 }}>
//             <div className="bg-white p-5 rounded-lg shadow-lg text-center">
//                 <h2 className="text-xl font-bold mb-3">Kérlek, kapcsold ki az Adblockert</h2>
//                 <p className="mb-4">
//                     Az oldal fenntartása és fejlesztése nagyon sok munkát igényel. Kérlek, támogass minket azzal, hogy kikapcsolod az Adblockert.
//                 </p>
//                 <button
//                     onClick={() => setAdblockerDetected(false)} // Üzenet elrejtése kattintásra
//                     className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                 >
//                     Értem
//                 </button>
//             </div>
//         </div>
//     );
// }
