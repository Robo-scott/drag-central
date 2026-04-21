import { useState } from 'react';
import { useStore } from '@/store/useStore';
import Footer from '@/components/Footer';

type PortalTab = 'dashboard' | 'profile' | 'licences' | 'vehicles' | 'classifieds' | 'entries' | 'purchases';

const tabs: { id: PortalTab; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'profile', label: 'My Profile' },
  { id: 'licences', label: 'Licences' },
  { id: 'vehicles', label: 'My Vehicles' },
  { id: 'classifieds', label: 'My Classifieds' },
  { id: 'entries', label: 'Event Entries' },
  { id: 'purchases', label: 'Purchases' },
];

function DashboardTab() {
  return (
    <div className="space-y-4">
      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Event Entries', value: '0', icon: '🏁' },
          { label: 'Classifieds', value: '0', icon: '🏷️' },
          { label: 'Vehicles', value: '0', icon: '🏎️' },
          { label: 'Purchases', value: '0', icon: '🛒' },
        ].map((stat) => (
          <div key={stat.label} className="bg-smoke rounded-md p-3 text-center">
            <span className="text-lg">{stat.icon}</span>
            <p className="font-rajdhani font-bold text-white text-xl mt-1">{stat.value}</p>
            <p className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Upcoming events registered */}
      <div className="bg-asphalt rounded-md p-4 border border-smoke">
        <h3 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider mb-3">
          Upcoming Events Registered
        </h3>
        <p className="text-track-silver text-xs font-inter">
          No upcoming event registrations. Register for events via the Events page.
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-drag-red/10 border border-drag-red/30 rounded-md p-3 text-center hover:bg-drag-red/20 transition-colors">
          <span className="text-drag-red text-xs font-montserrat font-bold uppercase tracking-wider block">+ List Item</span>
          <span className="text-track-silver text-[0.6rem] font-inter mt-0.5 block">Add Classified</span>
        </button>
        <button className="bg-nzdra-blue/10 border border-nzdra-blue/30 rounded-md p-3 text-center hover:bg-nzdra-blue/20 transition-colors">
          <span className="text-nzdra-blue text-xs font-montserrat font-bold uppercase tracking-wider block">+ Event Entry</span>
          <span className="text-track-silver text-[0.6rem] font-inter mt-0.5 block">Register for Event</span>
        </button>
      </div>
    </div>
  );
}

function ProfileTab() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider">Personal Details</h3>
      
      <div className="space-y-3">
        <div>
          <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Full Name</label>
          <input type="text" placeholder="Enter full name" className="w-full bg-carbon border border-smoke rounded-sm px-3 py-2 text-white text-xs font-inter outline-none focus:border-drag-red placeholder:text-track-silver/50" />
        </div>
        <div>
          <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Email Address</label>
          <input type="email" placeholder="your@email.com" className="w-full bg-carbon border border-smoke rounded-sm px-3 py-2 text-white text-xs font-inter outline-none focus:border-drag-red placeholder:text-track-silver/50" />
        </div>
        <div>
          <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Phone Number</label>
          <input type="tel" placeholder="+64 21 000 0000" className="w-full bg-carbon border border-smoke rounded-sm px-3 py-2 text-white text-xs font-inter outline-none focus:border-drag-red placeholder:text-track-silver/50" />
        </div>
        <div>
          <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Street Address</label>
          <input type="text" placeholder="123 Street Name" className="w-full bg-carbon border border-smoke rounded-sm px-3 py-2 text-white text-xs font-inter outline-none focus:border-drag-red placeholder:text-track-silver/50" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">City</label>
            <input type="text" placeholder="City" className="w-full bg-carbon border border-smoke rounded-sm px-3 py-2 text-white text-xs font-inter outline-none focus:border-drag-red placeholder:text-track-silver/50" />
          </div>
          <div>
            <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Postcode</label>
            <input type="text" placeholder="0000" className="w-full bg-carbon border border-smoke rounded-sm px-3 py-2 text-white text-xs font-inter outline-none focus:border-drag-red placeholder:text-track-silver/50" />
          </div>
        </div>
        <div>
          <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Emergency Contact</label>
          <input type="text" placeholder="Name and phone number" className="w-full bg-carbon border border-smoke rounded-sm px-3 py-2 text-white text-xs font-inter outline-none focus:border-drag-red placeholder:text-track-silver/50" />
        </div>
      </div>

      <button onClick={handleSave} className="w-full bg-drag-red text-white py-2.5 rounded-sm font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-drag-red/80 transition-colors">
        {saved ? 'Saved!' : 'Save Profile'}
      </button>
    </div>
  );
}

function LicencesTab() {
  return (
    <div className="space-y-4">
      {/* Civil Driver Licence */}
      <div className="bg-asphalt rounded-md p-4 border border-smoke">
        <h3 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider mb-3">Civil Driver Licence</h3>
        <div className="space-y-3">
          <div>
            <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Licence Number</label>
            <input type="text" placeholder="AB123456" className="w-full bg-carbon border border-smoke rounded-sm px-3 py-2 text-white text-xs font-inter outline-none focus:border-drag-red placeholder:text-track-silver/50" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Issue Date</label>
              <input type="date" className="w-full bg-carbon border border-smoke rounded-sm px-3 py-2 text-white text-xs font-inter outline-none focus:border-drag-red" />
            </div>
            <div>
              <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Expiry Date</label>
              <input type="date" className="w-full bg-carbon border border-smoke rounded-sm px-3 py-2 text-white text-xs font-inter outline-none focus:border-drag-red" />
            </div>
          </div>
          <div>
            <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Class / Restrictions</label>
            <input type="text" placeholder="Full, Restricted, etc." className="w-full bg-carbon border border-smoke rounded-sm px-3 py-2 text-white text-xs font-inter outline-none focus:border-drag-red placeholder:text-track-silver/50" />
          </div>
          <div>
            <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Photo — Front</label>
            <div className="border border-dashed border-smoke rounded-sm p-4 text-center hover:border-drag-red transition-colors cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A0A0A0" strokeWidth="1.5" className="mx-auto mb-1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              <p className="text-track-silver text-[0.6rem] font-inter">Upload licence front photo</p>
            </div>
          </div>
          <div>
            <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Photo — Back</label>
            <div className="border border-dashed border-smoke rounded-sm p-4 text-center hover:border-drag-red transition-colors cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A0A0A0" strokeWidth="1.5" className="mx-auto mb-1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              <p className="text-track-silver text-[0.6rem] font-inter">Upload licence back photo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Race Licences */}
      <div className="bg-asphalt rounded-md p-4 border border-smoke">
        <h3 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider mb-3">Race Licences</h3>
        
        {/* NZDRA */}
        <div className="mb-4">
          <h4 className="text-nzdra-blue text-xs font-montserrat font-bold uppercase tracking-wider mb-2">NZDRA Licence</h4>
          <div className="space-y-2">
            <div>
              <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Licence Number</label>
              <input type="text" placeholder="NZDRA-XXXX" className="w-full bg-carbon border border-smoke rounded-sm px-3 py-2 text-white text-xs font-inter outline-none focus:border-nzdra-blue placeholder:text-track-silver/50" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Expiry</label>
                <input type="date" className="w-full bg-carbon border border-smoke rounded-sm px-3 py-2 text-white text-xs font-inter outline-none focus:border-nzdra-blue" />
              </div>
              <div>
                <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Class</label>
                <input type="text" placeholder="Competition, Sportsman, etc." className="w-full bg-carbon border border-smoke rounded-sm px-3 py-2 text-white text-xs font-inter outline-none focus:border-nzdra-blue placeholder:text-track-silver/50" />
              </div>
            </div>
            <div>
              <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Photo — Front & Back</label>
              <div className="border border-dashed border-smoke rounded-sm p-3 text-center hover:border-nzdra-blue transition-colors cursor-pointer">
                <p className="text-track-silver text-[0.6rem] font-inter">Upload NZDRA licence photos</p>
              </div>
            </div>
          </div>
        </div>

        {/* IHRA */}
        <div>
          <h4 className="text-ihra-gold text-xs font-montserrat font-bold uppercase tracking-wider mb-2">IHRA Licence</h4>
          <div className="space-y-2">
            <div>
              <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Licence Number</label>
              <input type="text" placeholder="IHRA-XXXX" className="w-full bg-carbon border border-smoke rounded-sm px-3 py-2 text-white text-xs font-inter outline-none focus:border-ihra-gold placeholder:text-track-silver/50" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Expiry</label>
                <input type="date" className="w-full bg-carbon border border-smoke rounded-sm px-3 py-2 text-white text-xs font-inter outline-none focus:border-ihra-gold" />
              </div>
              <div>
                <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Class</label>
                <input type="text" placeholder="Pro, Sportsman, etc." className="w-full bg-carbon border border-smoke rounded-sm px-3 py-2 text-white text-xs font-inter outline-none focus:border-ihra-gold placeholder:text-track-silver/50" />
              </div>
            </div>
            <div>
              <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Photo — Front & Back</label>
              <div className="border border-dashed border-smoke rounded-sm p-3 text-center hover:border-ihra-gold transition-colors cursor-pointer">
                <p className="text-track-silver text-[0.6rem] font-inter">Upload IHRA licence photos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VehiclesTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider">My Vehicles</h3>
        <button className="bg-drag-red text-white px-3 py-1.5 rounded-sm font-montserrat font-bold text-[0.6rem] uppercase tracking-wider hover:bg-drag-red/80 transition-colors">
          + Add Vehicle
        </button>
      </div>

      <div className="bg-asphalt rounded-md p-4 border border-smoke">
        <p className="text-track-silver text-xs font-inter text-center py-4">
          No vehicles added yet. Add your first vehicle to manage tech inspections and event entries.
        </p>
      </div>

      {/* Vehicle form template */}
      <div className="bg-smoke rounded-md p-4 border border-smoke">
        <h4 className="text-white text-xs font-montserrat font-bold uppercase tracking-wider mb-3">Add New Vehicle</h4>
        <div className="space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Make</label>
              <input type="text" placeholder="e.g. Ford" className="w-full bg-carbon border border-smoke rounded-sm px-2 py-1.5 text-white text-xs font-inter outline-none focus:border-drag-red placeholder:text-track-silver/50" />
            </div>
            <div>
              <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Model</label>
              <input type="text" placeholder="e.g. Mustang" className="w-full bg-carbon border border-smoke rounded-sm px-2 py-1.5 text-white text-xs font-inter outline-none focus:border-drag-red placeholder:text-track-silver/50" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Year</label>
              <input type="text" placeholder="e.g. 1969" className="w-full bg-carbon border border-smoke rounded-sm px-2 py-1.5 text-white text-xs font-inter outline-none focus:border-drag-red placeholder:text-track-silver/50" />
            </div>
            <div>
              <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Colour</label>
              <input type="text" placeholder="e.g. Red" className="w-full bg-carbon border border-smoke rounded-sm px-2 py-1.5 text-white text-xs font-inter outline-none focus:border-drag-red placeholder:text-track-silver/50" />
            </div>
          </div>
          <div>
            <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Engine / Drivetrain</label>
            <input type="text" placeholder="e.g. 565ci BBC, Powerglide" className="w-full bg-carbon border border-smoke rounded-sm px-2 py-1.5 text-white text-xs font-inter outline-none focus:border-drag-red placeholder:text-track-silver/50" />
          </div>
          <div>
            <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Competition Class</label>
            <input type="text" placeholder="e.g. Super Sedan / AA" className="w-full bg-carbon border border-smoke rounded-sm px-2 py-1.5 text-white text-xs font-inter outline-none focus:border-drag-red placeholder:text-track-silver/50" />
          </div>
          <div>
            <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Personal Best ET</label>
            <input type="text" placeholder="e.g. 8.452 @ 162.3 mph" className="w-full bg-carbon border border-smoke rounded-sm px-2 py-1.5 text-white text-xs font-inter outline-none focus:border-drag-red placeholder:text-track-silver/50" />
          </div>
          <div>
            <label className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1 block">Tech Inspection Records</label>
            <div className="border border-dashed border-smoke rounded-sm p-3 text-center hover:border-drag-red transition-colors cursor-pointer">
              <p className="text-track-silver text-[0.6rem] font-inter">Upload tech inspection certificates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClassifiedsTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider">My Classifieds</h3>
        <button className="bg-drag-red text-white px-3 py-1.5 rounded-sm font-montserrat font-bold text-[0.6rem] uppercase tracking-wider hover:bg-drag-red/80 transition-colors">
          + New Listing
        </button>
      </div>

      <div className="bg-asphalt rounded-md p-4 border border-smoke">
        <p className="text-track-silver text-xs font-inter text-center py-4">
          No classified listings yet. Create your first listing to sell cars, parts, trailers, or safety gear.
        </p>
      </div>
    </div>
  );
}

function EntriesTab() {
  return (
    <div className="space-y-4">
      <h3 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider">Event Entries</h3>
      
      <div className="bg-asphalt rounded-md p-4 border border-smoke">
        <p className="text-track-silver text-xs font-inter text-center py-4">
          No event entries found. Register for events via the Events page.
        </p>
      </div>

      <div className="bg-smoke rounded-md p-3 border border-smoke">
        <h4 className="text-white text-[0.65rem] font-montserrat font-bold uppercase tracking-wider mb-2">How Event Entries Work</h4>
        <ul className="space-y-1.5">
          {[
            'Browse upcoming events on the Events page',
            'Click the event you want to enter',
            'Complete the online entry form',
            'Pay the entry fee securely',
            'Your race pack will be available for collection on the day',
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-2 text-track-silver text-xs font-inter">
              <span className="text-drag-red font-rajdhani font-bold flex-shrink-0">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PurchasesTab() {
  return (
    <div className="space-y-4">
      <h3 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider">My Purchases</h3>
      
      {/* Classified purchases */}
      <div className="bg-asphalt rounded-md p-4 border border-smoke">
        <h4 className="text-track-silver text-xs font-montserrat font-bold uppercase tracking-wider mb-2">Classified Items</h4>
        <p className="text-track-silver text-xs font-inter text-center py-3">
          No classified purchases yet.
        </p>
      </div>

      {/* Merchandise */}
      <div className="bg-asphalt rounded-md p-4 border border-smoke">
        <h4 className="text-track-silver text-xs font-montserrat font-bold uppercase tracking-wider mb-2">Team Merchandise</h4>
        <p className="text-track-silver text-xs font-inter text-center py-3">
          No merchandise purchases yet.
        </p>
      </div>

      {/* Coming soon banner */}
      <div className="bg-nzdra-blue/10 border border-nzdra-blue/30 rounded-md p-3 text-center">
        <p className="text-nzdra-blue text-xs font-inter font-medium">
          In-app purchasing coming soon. Contact sellers directly for now.
        </p>
      </div>
    </div>
  );
}

export default function MemberPortal() {
  const [activeTab, setActiveTab] = useState<PortalTab>('dashboard');
  const logout = useStore((s) => s.logout);
  const navigate = useStore((s) => s.navigate);

  return (
    <div className="relative z-10">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <button onClick={() => navigate('home')} className="inline-flex items-center gap-1 text-drag-red text-sm font-montserrat font-bold uppercase tracking-wider hover:underline">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Home
        </button>
        <button onClick={logout} className="text-track-silver text-xs font-inter hover:text-drag-red transition-colors flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Log Out
        </button>
      </div>

      <div className="px-4 pb-2">
        <h1 className="font-rajdhani font-bold text-white text-xl uppercase tracking-[0.04em]">
          Member Portal
        </h1>
        <p className="text-track-silver text-xs font-inter">
          Manage your profile, vehicles, entries, and listings
        </p>
      </div>

      {/* Tab scroll */}
      <div className="px-4 pb-4 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-[0.6rem] font-montserrat font-bold uppercase tracking-wider rounded-sm transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-drag-red text-white'
                  : 'bg-asphalt text-track-silver hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-4 pb-6">
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'licences' && <LicencesTab />}
        {activeTab === 'vehicles' && <VehiclesTab />}
        {activeTab === 'classifieds' && <ClassifiedsTab />}
        {activeTab === 'entries' && <EntriesTab />}
        {activeTab === 'purchases' && <PurchasesTab />}
      </div>

      {/* Disclaimer */}
      <div className="px-4 pb-6">
        <div className="bg-smoke rounded-md p-3 border border-smoke">
          <div className="flex items-start gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4161C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <p className="text-track-silver text-[0.55rem] font-inter leading-relaxed">
              You are providing your personal information at your own risk. Whilst every precaution is taken to protect your data, no system is completely secure. <strong className="text-white">No financial or payment information is ever stored</strong> on Drag Central. All payments are processed through secure third-party providers. Drag Central does not issue licences or interpret regulations — all authority remains with NZDRA, IHRA, and individual tracks.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
