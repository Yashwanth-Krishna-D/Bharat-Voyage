import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  X,
  ChevronRight,
  Camera,
  Mountain,
  Utensils,
  Building2
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import IndiaBg from '../assets/Background-Image.png';
import Navbar from '../components/Navbar';

interface Region {
  id: string;
  name: string;
  position: { top: string; left: string };
  description: string;
  highlights: string[];
  bestTime: string;
  famousFor: string[];
}

const Home: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const navigate = useNavigate();

  const regions: Region[] = [
    {
      id: 'punjab',
      name: 'Punjab & Haryana',
      position: { top: '70%', left: '40%' },
      description:
        'Experience the spiritual heart of Sikhism at the Golden Temple and explore the vibrant culture of Punjab with its rich heritage and warm hospitality.',
      highlights: ['Golden Temple Amritsar', 'Wagah Border', 'Jallianwala Bagh', 'Rock Garden Chandigarh'],
      bestTime: 'October to March',
      famousFor: ['Spiritual Tourism', 'Punjabi Cuisine', 'Historical Sites']
    },
    {
      id: 'northeast',
      name: 'Northeast India',
      position: { top: '80%', left: '75%' },
      description:
        "Discover untouched natural beauty, lush tea gardens, vibrant tribal culture, and biodiversity in India's hidden gem of the Seven Sisters.",
      highlights: ['Kaziranga National Park', 'Tawang Monastery', 'Living Root Bridges', 'Assam Tea Gardens'],
      bestTime: 'October to April',
      famousFor: ['Wildlife Safari', 'Tea Tourism', 'Tribal Culture', 'Adventure Sports']
    },
    {
      id: 'rajasthan',
      name: 'Rajasthan - The Royal State',
      position: { top: '85%', left: '30%' },
      description:
        'Journey through magnificent forts and palaces, experience the golden Thar Desert, and immerse yourself in royal Rajasthani culture and heritage.',
      highlights: ['Jaipur City Palace', 'Udaipur Lake Palace', 'Jaisalmer Fort', 'Mehrangarh Fort'],
      bestTime: 'November to February',
      famousFor: ['Desert Safari', 'Royal Palaces', 'Camel Rides', 'Folk Music']
    },
    {
      id: 'north-central',
      name: 'Uttar Pradesh',
      position: { top: '85%', left: '45%' },
      description:
        'Home to the iconic Taj Mahal and spiritual cities, experience the perfect blend of Mughal architecture, ancient temples, and sacred ghats.',
      highlights: ['Taj Mahal Agra', 'Varanasi Ghats', 'Lucknow Monuments', 'Mathura Vrindavan'],
      bestTime: 'October to March',
      famousFor: ['Taj Mahal', 'Spiritual Tourism', 'Mughal Heritage', 'River Ganges']
    },
    {
      id: 'west-coast',
      name: 'Goa & West Coast',
      position: { top: '103%', left: '21%' },
      description:
        "Relax on pristine beaches, explore Portuguese colonial heritage, enjoy water sports, and experience the vibrant nightlife of India's beach paradise.",
      highlights: ['Goa Beaches', 'Old Goa Churches', 'Dudhsagar Falls', 'Spice Plantations'],
      bestTime: 'November to February',
      famousFor: ['Beach Tourism', 'Water Sports', 'Nightlife', 'Seafood']
    },
    {
      id: 'mumbai-maharashtra',
      name: 'Maharashtra',
      position: { top: '103%', left: '30%' },
      description:
        'From the bustling streets of Mumbai to ancient cave temples, experience the perfect mix of modernity, history, and cultural diversity.',
      highlights: ['Gateway of India', 'Ajanta Ellora Caves', 'Marine Drive', 'Lonavala Hill Station'],
      bestTime: 'October to February',
      famousFor: ['Bollywood', 'Street Food', 'Historical Caves', 'Urban Tourism']
    },
    {
      id: 'east',
      name: 'West Bengal & Odisha',
      position: { top: '98%', left: '46%' },
      description:
        'Explore colonial architecture, witness grand Durga Puja celebrations, visit ancient temples, and experience the artistic heritage of East India.',
      highlights: ['Kolkata Heritage', 'Durga Puja', 'Konark Sun Temple', 'Darjeeling Hills'],
      bestTime: 'October to March',
      famousFor: ['Durga Puja Festival', 'Colonial Architecture', 'Temple Tours', 'Bengali Culture']
    },
    {
      id: 'south',
      name: 'South India',
      position: { top: '130%', left: '22%' },
      description:
        'Cruise through serene backwaters, marvel at Dravidian temple architecture, explore hill stations, and indulge in rich culinary traditions.',
      highlights: ['Kerala Backwaters', 'Meenakshi Temple', 'Hampi Ruins', 'Ooty Hill Station'],
      bestTime: 'November to February',
      famousFor: ['Backwater Cruises', 'Temple Architecture', 'Ayurveda', 'Classical Dance']
    }
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#fff7ed,#fff7e0_40%,#eff6ff)] text-slate-900 font-sans overflow-hidden">

      <Navbar>
        <button
          className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-[18px] py-2.5 rounded-full font-semibold shadow-[0_8px_28px_rgba(249,115,22,0.18)] hover:-translate-y-0.5 hover:scale-[1.02] transition-transform duration-200 border-none cursor-pointer"
          onClick={() => navigate('/account')}
        >
          My Account
        </button>
      </Navbar>

      <main className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-72px)] mt-[72px] w-full overflow-hidden">

        <section className="w-full lg:w-[60%] h-[400px] lg:h-full p-5 lg:p-5 flex items-center justify-center overflow-hidden">
          <div className="w-full h-full relative rounded-[28px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.12)] bg-white flex items-stretch">
            <div className="absolute inset-0">
              <img
                src={IndiaBg}
                alt="Bharat Voyage Map"
                className="w-full h-full object-cover block select-none"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" aria-hidden />
            </div>

            {regions.map((region) => {
              const isHovered = hoveredRegion === region.id;

              return (
                <div
                  key={region.id}
                  className="relative -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform duration-250"
                  style={{ top: region.position.top, left: region.position.left }}
                  onClick={() => setSelectedRegion(region)}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  role="button"
                  aria-label={`Open ${region.name} details`}
                >
                  <div className="relative w-7 h-7 flex items-center justify-center">
                    <div
                      className={`w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-b from-orange-400 to-orange-500 transition-all duration-250 ${isHovered ? 'scale-118 shadow-[0_18px_34px_rgba(234,88,12,0.18)]' : 'shadow-[0_10px_24px_rgba(249,115,22,0.16)]'}`}
                    >
                      <MapPin className="w-6 h-6 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]" />
                    </div>

                    <div className="absolute left-1/2 top-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/15 pointer-events-none animate-bv-pulse" />

                    <div className={`absolute inset-0 rounded-full border-4 border-white/95 transition-transform duration-250 ${isHovered ? 'scale-105' : ''}`} />

                    <div
                      className={`absolute top-[74px] left-1/2 -translate-x-1/2 translate-y-1.5 pointer-events-none transition-all duration-200 whitespace-nowrap ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0'}`}
                    >
                      <div className="bg-white/95 backdrop-blur-[6px] px-3 py-2 rounded-[14px] border-2 border-orange-200 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                        <span className="font-bold text-gray-800 text-[13px]">{region.name}</span>
                      </div>
                      <div className="absolute left-1/2 -top-2.5 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="w-full lg:w-[40%] h-auto lg:h-full p-6 flex flex-col items-start overflow-y-auto justify-center">
          <div className="w-full max-w-2xl pb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-orange-50 to-orange-50/50 border border-orange-200 font-bold text-orange-700 mb-3.5">
              <Sparkles className="w-[18px] h-[18px] text-orange-500" />
              <span>AI-Surged Travel Planning</span>
            </div>

            <h1 className="text-[44px] leading-[1.03] my-2 font-extrabold text-slate-900">
              One tap away from <span className="bg-gradient-to-r from-orange-600 to-blue-500 bg-clip-text text-transparent">Dreams to Destinations</span>
            </h1>

            <p className="text-slate-600 text-base mb-[18px]">
              Let our AI create your perfect journey through India's diverse landscapes, rich culture, and timeless heritage.
            </p>

            <div className="flex gap-3 my-4 flex-wrap">
              <button
                className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-5 py-3.5 rounded-full font-semibold shadow-[0_8px_28px_rgba(249,115,22,0.18)] hover:-translate-y-0.5 hover:scale-[1.02] transition-transform duration-200 border-none cursor-pointer inline-flex items-center gap-2"
                onClick={() => navigate("/plan")}
              >
                <span className="font-bold">Plan Your Trip</span>
                <ChevronRight className="w-[18px] h-[18px]" />
              </button>
              <button className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-[18px] py-2.5 rounded-full font-semibold shadow-[0_8px_28px_rgba(249,115,22,0.18)] hover:-translate-y-0.5 hover:scale-[1.02] transition-transform duration-200 border-none cursor-pointer">
                Virtual Tour
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-[18px]">
              <div className="bg-gradient-to-b from-orange-50/50 to-orange-50 p-3.5 rounded-[14px] text-center border border-orange-200 shadow-sm">
                <div className="text-xl font-extrabold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">India's 1<sup>st</sup></div>
                <div className="text-gray-500 text-xs mt-2">Open source Travel Planner.</div>
              </div>
              <div className="bg-gradient-to-b from-orange-50/50 to-orange-50 p-3.5 rounded-[14px] text-center border border-orange-200 shadow-sm">
                <div className="text-xl font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">500+</div>
                <div className="text-gray-500 text-xs mt-2">Destinations.</div>
              </div>
              <div className="bg-gradient-to-b from-orange-50/50 to-orange-50 p-3.5 rounded-[14px] text-center border border-orange-200 shadow-sm">
                <div className="text-xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">Bookings</div>
                <div className="text-gray-500 text-xs mt-2">From Peaks to Plains, We've Got Your Stays Covered.</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="flex gap-3 items-center p-3 rounded-xl bg-white border border-slate-100 shadow-[0_6px_18px_rgba(2,6,23,0.04)] font-semibold text-slate-900">
                <Camera className="w-5 h-[25px]" /><span>Curated Experiences</span>
              </div>
              <div className="flex gap-3 items-center p-3 rounded-xl bg-white border border-slate-100 shadow-[0_6px_18px_rgba(2,6,23,0.04)] font-semibold text-slate-900">
                <Mountain className="w-7 h-[25px]" /><span>Adventure Tours</span>
              </div>
              <div className="flex gap-3 items-center p-3 rounded-xl bg-white border border-slate-100 shadow-[0_6px_18px_rgba(2,6,23,0.04)] font-semibold text-slate-900">
                <Utensils className="w-7 h-[25px]" /><span>Culinary Journeys</span>
              </div>
              <div className="flex gap-3 items-center p-3 rounded-xl bg-white border border-slate-100 shadow-[0_6px_18px_rgba(2,6,23,0.04)] font-semibold text-slate-900">
                <Building2 className="w-7 h-[25px]" /><span>Heritage Sites</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {selectedRegion && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-5 animate-bv-fade-in" role="dialog" aria-modal="true">
          <div className="w-full max-w-[920px] bg-white rounded-[20px] overflow-hidden shadow-2xl animate-bv-scale-in flex flex-col max-h-[90vh]">
            <div className="bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600 text-white p-7 relative">
              <button
                onClick={() => setSelectedRegion(null)}
                className="absolute right-5 top-[18px] w-11 h-11 rounded-full flex items-center justify-center bg-white text-gray-700 border-none cursor-pointer shadow-lg hover:bg-gray-50 transition-colors"
                aria-label="Close"
                title="Close"
              >
                <X />
              </button>

              <h2 className="text-[28px] m-0 font-extrabold drop-shadow-md">{selectedRegion.name}</h2>
              <div className="text-white/95 font-semibold">Explore the wonders</div>
            </div>

            <div className="p-6 px-7 pb-9 overflow-y-auto text-gray-800">
              <p className="text-base text-slate-700 mb-[18px]">{selectedRegion.description}</p>

              <div className="bg-gradient-to-b from-orange-50 to-orange-50/50 rounded-xl p-3.5 border border-amber-200 mb-4">
                <h3 className="flex gap-2 items-center font-extrabold m-0 text-slate-900">
                  <Sparkles className="w-[18px] h-[18px]" /> Best Time to Visit
                </h3>
                <p className="mt-2 mb-0 text-slate-700 font-semibold">{selectedRegion.bestTime}</p>
              </div>

              <div className="mb-3">
                <h3 className="flex gap-2 items-center font-extrabold text-slate-900">
                  <Camera className="w-[18px] h-[18px]" /> Top Attractions
                </h3>
                <div className="grid grid-cols-2 gap-2.5 mt-2">
                  {selectedRegion.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-[10px] border border-slate-100">
                      <ChevronRight className="text-orange-500 mt-1 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-1.5">
                <h3 className="flex gap-2 items-center font-extrabold text-slate-900">
                  <Building2 className="w-[18px] h-[18px]" /> Famous For
                </h3>
                <div className="flex gap-2 flex-wrap mt-2">
                  {selectedRegion.famousFor.map((f, i) => (
                    <span key={i} className="px-3 py-2 rounded-full bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 font-bold text-orange-700 text-sm">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <button
                className="w-full mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-5 py-3.5 rounded-full font-extrabold shadow-lg hover:to-orange-600 transition-all"
                onClick={() => {
                  alert(`Plan your ${selectedRegion.name} trip - implement action`);
                }}
              >
                <span>Plan Your {selectedRegion.name} Trip</span>
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;