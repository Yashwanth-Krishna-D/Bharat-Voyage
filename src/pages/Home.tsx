// import React, { useState } from 'react';
// import {
//   Sparkles,
//   MapPin,
//   X,
//   Plane,
//   ChevronRight,
//   Camera,
//   Mountain,
//   Utensils,
//   Building2
// } from 'lucide-react';
// const IndiaBg = '/assets/Background-Image.png';
// interface Region {
//   id: string;
//   name: string;
//   position: { top: string; left: string };
//   description: string;
//   highlights: string[];
//   bestTime: string;
//   famousFor: string[];
// }

// const rootGradient = 'linear-gradient(135deg, #fff7ed, #fff7e0 40%, #eff6ff)';

// const NAV_HEIGHT = 72;

// const Home: React.FC = () => {
//   const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
//   const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

//   const regions: Region[] = [
//     {
//       id: 'punjab',
//       name: 'Punjab & Haryana',
//       position: { top: '70%', left: '40%' },
//       description:
//         'Experience the spiritual heart of Sikhism at the Golden Temple and explore the vibrant culture of Punjab with its rich heritage and warm hospitality.',
//       highlights: ['Golden Temple Amritsar', 'Wagah Border', 'Jallianwala Bagh', 'Rock Garden Chandigarh'],
//       bestTime: 'October to March',
//       famousFor: ['Spiritual Tourism', 'Punjabi Cuisine', 'Historical Sites']
//     },
//     {
//       id: 'northeast',
//       name: 'Northeast India',
//       position: { top: '80%', left: '75%' },
//       description:
//         "Discover untouched natural beauty, lush tea gardens, vibrant tribal culture, and biodiversity in India's hidden gem of the Seven Sisters.",
//       highlights: ['Kaziranga National Park', 'Tawang Monastery', 'Living Root Bridges', 'Assam Tea Gardens'],
//       bestTime: 'October to April',
//       famousFor: ['Wildlife Safari', 'Tea Tourism', 'Tribal Culture', 'Adventure Sports']
//     },
//     {
//       id: 'rajasthan',
//       name: 'Rajasthan - The Royal State',
//       position: { top: '85%', left: '30%' },
//       description:
//         'Journey through magnificent forts and palaces, experience the golden Thar Desert, and immerse yourself in royal Rajasthani culture and heritage.',
//       highlights: ['Jaipur City Palace', 'Udaipur Lake Palace', 'Jaisalmer Fort', 'Mehrangarh Fort'],
//       bestTime: 'November to February',
//       famousFor: ['Desert Safari', 'Royal Palaces', 'Camel Rides', 'Folk Music']
//     },
//     {
//       id: 'north-central',
//       name: 'Uttar Pradesh',
//       position: { top: '85%', left: '45%' },
//       description:
//         'Home to the iconic Taj Mahal and spiritual cities, experience the perfect blend of Mughal architecture, ancient temples, and sacred ghats.',
//       highlights: ['Taj Mahal Agra', 'Varanasi Ghats', 'Lucknow Monuments', 'Mathura Vrindavan'],
//       bestTime: 'October to March',
//       famousFor: ['Taj Mahal', 'Spiritual Tourism', 'Mughal Heritage', 'River Ganges']
//     },
//     {
//       id: 'west-coast',
//       name: 'Goa & West Coast',
//       position: { top: '103%', left: '21%' },
//       description:
//         "Relax on pristine beaches, explore Portuguese colonial heritage, enjoy water sports, and experience the vibrant nightlife of India's beach paradise.",
//       highlights: ['Goa Beaches', 'Old Goa Churches', 'Dudhsagar Falls', 'Spice Plantations'],
//       bestTime: 'November to February',
//       famousFor: ['Beach Tourism', 'Water Sports', 'Nightlife', 'Seafood']
//     },
//     {
//       id: 'mumbai-maharashtra',
//       name: 'Maharashtra',
//       position: { top: '103%', left: '30%' },
//       description:
//         'From the bustling streets of Mumbai to ancient cave temples, experience the perfect mix of modernity, history, and cultural diversity.',
//       highlights: ['Gateway of India', 'Ajanta Ellora Caves', 'Marine Drive', 'Lonavala Hill Station'],
//       bestTime: 'October to February',
//       famousFor: ['Bollywood', 'Street Food', 'Historical Caves', 'Urban Tourism']
//     },
//     {
//       id: 'east',
//       name: 'West Bengal & Odisha',
//       position: { top: '98%', left: '46%' },
//       description:
//         'Explore colonial architecture, witness grand Durga Puja celebrations, visit ancient temples, and experience the artistic heritage of East India.',
//       highlights: ['Kolkata Heritage', 'Durga Puja', 'Konark Sun Temple', 'Darjeeling Hills'],
//       bestTime: 'October to March',
//       famousFor: ['Durga Puja Festival', 'Colonial Architecture', 'Temple Tours', 'Bengali Culture']
//     },
//     {
//       id: 'south',
//       name: 'South India',
//       position: { top: '130%', left: '22%' },
//       description:
//         'Cruise through serene backwaters, marvel at Dravidian temple architecture, explore hill stations, and indulge in rich culinary traditions.',
//       highlights: ['Kerala Backwaters', 'Meenakshi Temple', 'Hampi Ruins', 'Ooty Hill Station'],
//       bestTime: 'November to February',
//       famousFor: ['Backwater Cruises', 'Temple Architecture', 'Ayurveda', 'Classical Dance']
//     }
//   ];

//   /* ---------------------------
//      Inline style objects
//      --------------------------- */
//   const rootStyle: React.CSSProperties = {
//     height: '100vh', // ensure component fills viewport
//     minHeight: '100vh',
//     background: rootGradient,
//     color: '#0f172a',
//     fontFamily:
//       'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
//     overflow: 'hidden'
//   };

//   const navStyle: React.CSSProperties = {
//     position: 'fixed',
//     left: 0,
//     right: 0,
//     top: 0,
//     zIndex: 40,
//     background: 'rgba(255,255,255,0.95)',
//     backdropFilter: 'blur(6px)',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
//   };

//   const navInner: React.CSSProperties = {
//     maxWidth: 1400,
//     margin: '0 auto',
//     padding: '12px 24px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     height: NAV_HEIGHT
//   };

//   const brandStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 10 };

//   const titleStyle: React.CSSProperties = {
//     fontSize: 20,
//     fontWeight: 700,
//     background: 'linear-gradient(90deg,#ea580c,#2563eb)',
//     WebkitBackgroundClip: 'text' as any,
//     backgroundClip: 'text',
//     color: 'transparent'
//   };

//   const navRight: React.CSSProperties = { display: 'flex', gap: 18, alignItems: 'center' };



//   const primaryBtn: React.CSSProperties = {
//     background: 'linear-gradient(90deg,#ea580c,#f97316)',
//     border: 'none',
//     color: '#fff',
//     padding: '10px 18px',
//     borderRadius: 999,
//     fontWeight: 600,
//     cursor: 'pointer',
//     boxShadow: '0 8px 28px rgba(249,115,22,0.18)',
//     transition: 'transform .18s ease, box-shadow .18s ease'
//   };

//   // main container exactly fills available vertical space under the nav
//   const mainStyle: React.CSSProperties = {
//     display: 'flex',
//     flexDirection: 'row',
//     height: `calc(100vh - ${NAV_HEIGHT}px)`,
//     marginTop: NAV_HEIGHT,
//     width: '100vw',
//     overflow: 'hidden'
//   };

//   // left and right columns share width; both stretch to full height
//   const columnBase: React.CSSProperties = {
//     height: '100%',
//     overflow: 'hidden',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center'
//   };

//   const leftStyle: React.CSSProperties = {
//     ...columnBase,
//     width: '60%',
//     padding: 20,
//     boxSizing: 'border-box'
//   };

//   const rightStyle: React.CSSProperties = {
//     ...columnBase,
//     width: '40%',
//     padding: 24,
//     boxSizing: 'border-box',
//     alignItems: 'flex-start',
//     overflowY: 'auto' // allow right side to scroll if content taller than viewport
//   };

//   const mapWrap: React.CSSProperties = {
//     width: '100%',
//     height: '100%', // fill full column height
//     position: 'relative',
//     borderRadius: 28,
//     overflow: 'hidden',
//     boxShadow: '0 24px 60px rgba(0,0,0,0.12)',
//     background: '#fff',
//     display: 'flex',
//     alignItems: 'stretch'
//   };

//   // on smaller widths, keep natural aspect ratio by falling back to max-height
//   const mapImgStyle: React.CSSProperties = {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//     display: 'block',
//     userSelect: 'none'
//   };

//   const overlayStyle: React.CSSProperties = {
//     position: 'absolute',
//     inset: 0,
//     background: 'linear-gradient(to top, rgba(0,0,0,0.22), transparent 30%)',
//     pointerEvents: 'none'
//   };

//   const pinBase: React.CSSProperties = {
//     position: 'relative',
//     transform: 'translate(-50%, -50%)',
//     cursor: 'pointer',
//     zIndex: 10,
//     transition: 'transform .25s ease'
//   };

//   const pinInner: React.CSSProperties = {
//     position: 'relative',
//     width: 28,
//     height: 28,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center'
//   };

//   const pinCircle: React.CSSProperties = {
//     width: 28,
//     height: 28,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: '50%',
//     background: 'linear-gradient(180deg,#fb923c,#f97316)',
//     boxShadow: '0 10px 24px rgba(249,115,22,0.16)',
//     transition: 'transform .25s ease, box-shadow .25s ease'
//   };

//   const pinPulse: React.CSSProperties = {
//     position: 'absolute',
//     left: '50%',
//     top: '50%',
//     width: '100%',
//     height: '100%',
//     transform: 'translate(-50%,-50%)',
//     borderRadius: '50%',
//     background: 'rgba(249,115,22,0.15)',
//     pointerEvents: 'none',
//     animation: 'bv-pulse 1.8s infinite'
//   };

//   const pinRing: React.CSSProperties = {
//     position: 'absolute',
//     inset: 0,
//     borderRadius: '50%',
//     border: '4px solid rgba(255,255,255,0.95)',
//     transition: 'transform .25s ease'
//   };

//   const pinLabelBase: React.CSSProperties = {
//     position: 'absolute',
//     top: 74,
//     left: '50%',
//     transform: 'translateX(-50%) translateY(6px)',
//     opacity: 0,
//     pointerEvents: 'none',
//     transition: 'opacity .18s ease, transform .18s ease',
//     whiteSpace: 'nowrap'
//   };

//   const pinLabelVisible: React.CSSProperties = {
//     opacity: 1,
//     transform: 'translateX(-50%) translateY(0)'
//   };

//   const contentWrap: React.CSSProperties = { width: '100%', maxWidth: 640, paddingBottom: 24 };

//   const headingStyle: React.CSSProperties = {
//     fontSize: 44,
//     lineHeight: 1.03,
//     margin: '8px 0 12px',
//     fontWeight: 800,
//     color: '#0f172a'
//   };

//   const headingGradientSpan: React.CSSProperties = {
//     background: 'linear-gradient(90deg,#ea580c,#3b82f6)',
//     WebkitBackgroundClip: 'text' as any,
//     backgroundClip: 'text',
//     color: 'transparent'
//   };

//   const leadStyle: React.CSSProperties = { color: '#475569', fontSize: 16, marginBottom: 18 };

//   const ctasStyle: React.CSSProperties = { display: 'flex', gap: 12, margin: '16px 0 8px', flexWrap: 'wrap' };



//   const statsGrid: React.CSSProperties = {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(3,1fr)',
//     gap: 12,
//     marginTop: 18
//   };

//   const statBox: React.CSSProperties = {
//     background: 'linear-gradient(180deg,#fffaf0,#fff5eb)',
//     padding: 14,
//     borderRadius: 14,
//     textAlign: 'center',
//     border: '1px solid #fed7aa',
//     boxShadow: '0 8px 18px rgba(0,0,0,0.04)'
//   };

//   const featuresGrid: React.CSSProperties = {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(2,1fr)',
//     gap: 12,
//     marginTop: 20
//   };

//   const featureBox: React.CSSProperties = {
//     display: 'flex',
//     gap: 12,
//     alignItems: 'center',
//     padding: 12,
//     borderRadius: 12,
//     background: '#fff',
//     border: '1px solid #f1f5f9',
//     boxShadow: '0 6px 18px rgba(2,6,23,0.04)',
//     fontWeight: 600
//   };

//   const modalBackdrop: React.CSSProperties = {
//     position: 'fixed',
//     inset: 0,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     background: 'rgba(0,0,0,0.6)',
//     zIndex: 60,
//     padding: 20,
//     animation: 'bv-fade-in .18s ease'
//   };

//   const modalStyle: React.CSSProperties = {
//     width: '100%',
//     maxWidth: 920,
//     background: '#fff',
//     borderRadius: 20,
//     overflow: 'hidden',
//     boxShadow: '0 30px 80px rgba(2,6,23,0.32)',
//     animation: 'bv-scale-in .28s cubic-bezier(.34,1.56,.64,1)',
//     display: 'flex',
//     flexDirection: 'column',
//     maxHeight: '90vh'
//   };

//   const modalHeader: React.CSSProperties = {
//     background: 'linear-gradient(90deg,#fb923c,#f59e0b,#ea580c)',
//     color: '#fff',
//     padding: 28,
//     position: 'relative'
//   };

//   const modalClose: React.CSSProperties = {
//     position: 'absolute',
//     right: 20,
//     top: 18,
//     width: 44,
//     height: 44,
//     borderRadius: 999,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     background: '#fff',
//     color: '#374151',
//     border: 'none',
//     cursor: 'pointer',
//     boxShadow: '0 8px 20px rgba(0,0,0,0.12)'
//   };

//   const modalBody: React.CSSProperties = { padding: '24px 28px 36px', overflow: 'auto', color: '#1f2937' };

//   const cardStyle: React.CSSProperties = {
//     background: 'linear-gradient(180deg,#fffaf0,#fff7ed)',
//     borderRadius: 12,
//     padding: 14,
//     border: '1px solid #fde68a',
//     marginBottom: 16
//   };

//   /* ---------------------------
//      Render
//      --------------------------- */
//   return (
//     <div style={rootStyle}>
//       {/* keyframes + small CSS required for animation (cannot be inline) */}
//       <style>
//         {`
//           @keyframes bv-pulse {
//             0% { transform: translate(-50%,-50%) scale(1); opacity: .85; }
//             70% { transform: translate(-50%,-50%) scale(1.8); opacity: 0; }
//             100% { opacity: 0; }
//           }
//           @keyframes bv-fade-in { from { opacity: 0 } to { opacity: 1 } }
//           @keyframes bv-scale-in { from { opacity: 0; transform: scale(.96) } to { opacity: 1; transform: scale(1) } }
//           /* small responsive fallback */
//           @media (max-width: 900px) {
//             /* stack columns vertically on narrow screens */
//             .bv-main-responsive { flex-direction: column !important; height: auto !important; margin-top: ${NAV_HEIGHT}px !important; }
//             .bv-left-responsive, .bv-right-responsive { width: 100% !important; height: auto !important; }
//             .bv-map-img-responsive { aspect-ratio: 4/3; height: auto !important; }
//           }
//         `}
//       </style>

//       <nav style={navStyle}>
//         <div style={navInner}>
//           <div style={brandStyle}>
//             <Plane style={{ width: 32, height: 32, color: '#ea580c' }} />
//             <span style={titleStyle}>Bharat Voyage</span>
//           </div>

//           <div style={navRight}>
//             <button
//               style={primaryBtn}
//               onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)')}
//               onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
//             >
//               My Account
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* main fills the full viewport height minus nav */}
//       <main className="bv-main-responsive" style={mainStyle}>
//         <section className="bv-left-responsive" style={leftStyle}>
//           <div style={mapWrap}>
//             <div style={{ position: 'absolute', inset: 0 }}>
//               <img
//                 src={IndiaBg}
//                 alt="Bharat Voyage Map"
//                 style={{ ...mapImgStyle }}
//                 draggable={false}
//                 className="bv-map-img-responsive"
//               />
//               <div style={overlayStyle} aria-hidden />
//             </div>

//             {regions.map((region) => {
//               const isHovered = hoveredRegion === region.id;
//               const pinCircleStyle = {
//                 ...pinCircle,
//                 transform: isHovered ? 'scale(1.18)' : 'scale(1)',
//                 boxShadow: isHovered ? '0 18px 34px rgba(234,88,12,0.18)' : pinCircle.boxShadow
//               } as React.CSSProperties;

//               const ringStyle = { ...pinRing, transform: isHovered ? 'scale(1.08)' : 'scale(1)' } as React.CSSProperties;

//               return (
//                 <div
//                   key={region.id}
//                   style={{ ...pinBase, top: region.position.top, left: region.position.left }}
//                   onClick={() => setSelectedRegion(region)}
//                   onMouseEnter={() => setHoveredRegion(region.id)}
//                   onMouseLeave={() => setHoveredRegion(null)}
//                   role="button"
//                   aria-label={`Open ${region.name} details`}
//                 >
//                   <div style={pinInner}>
//                     <div style={pinCircleStyle}>
//                       <MapPin style={{ width: 24, height: 24, color: '#fff', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.25))' }} />
//                     </div>

//                     <div style={pinPulse} />

//                     <div style={ringStyle} />

//                     <div style={{ ...pinLabelBase, ...(isHovered ? pinLabelVisible : {}) }}>
//                       <div
//                         style={{
//                           background: 'rgba(255,255,255,0.95)',
//                           backdropFilter: 'blur(6px)',
//                           padding: '8px 12px',
//                           borderRadius: 14,
//                           border: '2px solid #ffd6a5',
//                           boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
//                         }}
//                       >
//                         <span style={{ fontWeight: 700, color: '#1f2937', fontSize: 13 }}>{region.name}</span>
//                       </div>

//                       <div
//                         style={{
//                           position: 'absolute',
//                           left: '50%',
//                           top: -10,
//                           transform: 'translateX(-50%)',
//                           width: 0,
//                           height: 0,
//                           borderLeft: '8px solid transparent',
//                           borderRight: '8px solid transparent',
//                           borderBottom: '8px solid white'
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </section>

//         <section className="bv-right-responsive" style={rightStyle}>
//           <div style={contentWrap}>
//             <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 999, background: 'linear-gradient(90deg,#fff3e0,#fff8f1)', border: '1px solid #ffd6a5', fontWeight: 700, color: '#c2410c', marginBottom: 14 }}>
//               <Sparkles style={{ width: 18, height: 18, color: '#f97316' }} />
//               <span>AI-Surged Travel Planning</span>
//             </div>

//             <h1 style={headingStyle}>
//               One tap away from <span style={headingGradientSpan}>Dreams to Destinations</span>
//             </h1>

//             <p style={leadStyle}>
//               Let our AI create your perfect journey through India's diverse landscapes, rich culture, and timeless heritage.
//             </p>

//             <div style={ctasStyle}>
//               <button
//                 style={{ ...primaryBtn, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 20px' }}
//                 onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)')}
//                 onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
//               >
//                 <span style={{ fontWeight: 700 }}>Plan Your Trip</span>
//                 <ChevronRight style={{ width: 18, height: 18 }} />
//               </button>
//               <button style={primaryBtn}> Virtual Tour </button>
//             </div>

//             <div style={statsGrid}>
//               <div style={statBox}>
//                 <div style={{ fontSize: 20, fontWeight: 800, background: 'linear-gradient(90deg,#ea580c,#f97316)', WebkitBackgroundClip: 'text' as any, color: 'transparent' }}>India's 1<sup>st</sup></div>
//                 <div style={{ color: '#6b7280', fontSize: 12, marginTop: 8 }}>Open source Travel Planner.</div>
//               </div>
//               <div style={statBox}>
//                 <div style={{ fontSize: 20, fontWeight: 800, background: 'linear-gradient(90deg,#f59e0b,#f97316)', WebkitBackgroundClip: 'text' as any, color: 'transparent' }}>500+</div>
//                 <div style={{ color: '#6b7280', fontSize: 12, marginTop: 8 }}>Destinations.</div>
//               </div>
//               <div style={statBox}>
//                 <div style={{ fontSize: 20, fontWeight: 800, background: 'linear-gradient(90deg,#3b82f6,#60a5fa)', WebkitBackgroundClip: 'text' as any, color: 'transparent' }}>Bookings</div>
//                 <div style={{ color: '#6b7280', fontSize: 12, marginTop: 8 }}>From Peaks to Plains, We've Got Your Stays Covered.</div>
//               </div>
//             </div>

//             <div style={featuresGrid}>
//               <div style={featureBox}><Camera style={{ width: 20, height: 25 }} /><span>Curated Experiences</span></div>
//               <div style={featureBox}><Mountain style={{ width: 28, height: 25 }} /><span>Adventure Tours</span></div>
//               <div style={featureBox}><Utensils style={{ width: 28, height: 25 }} /><span>Culinary Journeys</span></div>
//               <div style={featureBox}><Building2 style={{ width: 28, height: 25 }} /><span>Heritage Sites</span></div>
//             </div>
//           </div>
//         </section>
//       </main>

//       {selectedRegion && (
//         <div style={modalBackdrop} role="dialog" aria-modal="true">
//           <div style={modalStyle}>
//             <div style={modalHeader}>
//               <button
//                 onClick={() => setSelectedRegion(null)}
//                 style={modalClose}
//                 aria-label="Close"
//                 title="Close"
//               >
//                 <X />
//               </button>

//               <h2 style={{ fontSize: 28, margin: 0, fontWeight: 800, textShadow: '0 4px 12px rgba(0,0,0,0.18)' }}>{selectedRegion.name}</h2>
//               <div style={{ color: 'rgba(255,255,255,0.95)', fontWeight: 600 }}>Explore the wonders</div>
//             </div>

//             <div style={modalBody}>
//               <p style={{ fontSize: 16, color: '#334155', marginBottom: 18 }}>{selectedRegion.description}</p>

//               <div style={cardStyle}>
//                 <h3 style={{ display: 'flex', gap: 8, alignItems: 'center', fontWeight: 800, margin: 0 }}><Sparkles style={{ width: 18, height: 18 }} /> Best Time to Visit</h3>
//                 <p style={{ margin: '8px 0 0', color: '#334155', fontWeight: 600 }}>{selectedRegion.bestTime}</p>
//               </div>

//               <div style={{ marginBottom: 12 }}>
//                 <h3 style={{ display: 'flex', gap: 8, alignItems: 'center', fontWeight: 800 }}><Camera style={{ width: 18, height: 18 }} /> Top Attractions</h3>
//                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginTop: 8 }}>
//                   {selectedRegion.highlights.map((h, i) => (
//                     <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: 10, background: '#f8fafc', borderRadius: 10, border: '1px solid #e6eef8' }}>
//                       <ChevronRight style={{ color: '#f97316', marginTop: 2 }} />
//                       <span>{h}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div style={{ marginBottom: 6 }}>
//                 <h3 style={{ display: 'flex', gap: 8, alignItems: 'center', fontWeight: 800 }}><Building2 style={{ width: 18, height: 18 }} /> Famous For</h3>
//                 <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
//                   {selectedRegion.famousFor.map((f, i) => (
//                     <span key={i} style={{ padding: '8px 12px', borderRadius: 999, background: 'linear-gradient(90deg,#fff7ed,#fff1e6)', border: '1px solid #ffd7a8', fontWeight: 700, color: '#c2410c' }}>{f}</span>
//                   ))}
//                 </div>
//               </div>

//               <button
//                 style={{ ...primaryBtn, marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%' }}
//                 onClick={() => {
//                   // placeholder for plan action
//                   // you can replace with navigation / open planner modal
//                   alert(`Plan your ${selectedRegion.name} trip - implement action`);
//                 }}
//               >
//                 <span style={{ fontWeight: 800 }}>Plan Your {selectedRegion.name} Trip</span>
//                 <ChevronRight />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;
import React from 'react';
import { Box, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import IndiaBg from '../assets/Background-Image.png';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${IndiaBg})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'left',
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          p: 10,
          mt: -8,
          mr: 45,
          textAlign: 'right',
        }}
      >

     <Button
          variant="contained"
          size="large"
          sx={{
            fontWeight: 'bold',
            borderRadius: '30px',
            px: 4,
            py: 1.2,
          }}
          onClick={() => navigate('/plan')}
        >
          Plan Your Trip
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
