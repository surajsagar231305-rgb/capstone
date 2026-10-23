import React from 'react';
import { Recycle, ShieldCheck, UserCheck, Wrench, Globe, PlusCircle } from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';

export default function Navbar({ currentRole, setRole, lang, setLang, onOpenBooking, activePickupsCount }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <header className="navbar-container glass-panel">
      <div className="navbar-content">
        {/* Brand */}
        <div className="brand" onClick={() => setRole('seller')} style={{ cursor: 'pointer' }}>
          <div className="brand-logo">
            <Recycle className="brand-icon" />
          </div>
          <div className="brand-text">
            <span className="brand-name">{t.brandName}</span>
            <span className="brand-tagline">{t.tagline}</span>
          </div>
        </div>

        {/* Center: Role Switcher (Simulates the 3 platform perspectives) */}
        <div className="role-switcher">
          <div className="role-hint">Simulate Role:</div>
          <button
            className={`role-btn ${currentRole === 'seller' ? 'active' : ''}`}
            onClick={() => setRole('seller')}
          >
            <UserCheck size={16} />
            <span>{t.roles.seller}</span>
            {activePickupsCount > 0 && <span className="counter-pill">{activePickupsCount}</span>}
          </button>
          <button
            className={`role-btn ${currentRole === 'dealer' ? 'active' : ''}`}
            onClick={() => setRole('dealer')}
          >
            <Wrench size={16} />
            <span>{t.roles.dealer}</span>
            <span className="verified-dot" title="Verified Scale Badge" />
          </button>
          <button
            className={`role-btn ${currentRole === 'admin' ? 'active' : ''}`}
            onClick={() => setRole('admin')}
          >
            <ShieldCheck size={16} />
            <span>{t.roles.admin}</span>
          </button>
        </div>

        {/* Right side: Language + CTA */}
        <div className="nav-actions">
          <div className="lang-selector">
            <Globe size={16} className="lang-icon" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              aria-label="Language selection"
              className="lang-select"
            >
              <option value="en">English (EN)</option>
              <option value="hi">हिंदी (HI)</option>
              <option value="mr">मराठी (MR)</option>
            </select>
          </div>

          {currentRole === 'seller' && (
            <button className="cta-btn pulse-glow" onClick={onOpenBooking}>
              <PlusCircle size={18} />
              <span>{t.nav.bookPickup}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
