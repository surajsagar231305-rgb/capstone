import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Clock, 
  MapPin, 
  Phone, 
  FileText, 
  CheckCircle2, 
  Truck, 
  Scale, 
  Calendar, 
  Leaf, 
  TreePine, 
  Droplet, 
  Wind,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';

export default function SellerView({ 
  categories, 
  pickups, 
  onOpenBooking, 
  onViewReceipt, 
  lang 
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('All');

  const categoryTabs = ['All', 'Paper', 'Metals', 'Plastic', 'E-Waste', 'Appliances'];

  const filteredCategories = categories.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (cat.nameHi && cat.nameHi.includes(searchQuery)) ||
                          cat.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedCategoryTab === 'All' || cat.category === selectedCategoryTab;
    return matchesSearch && matchesTab;
  });

  const completedPickups = pickups.filter(p => p.status === 'completed');
  const totalEarned = completedPickups.reduce((sum, p) => sum + (p.finalAmount || p.estTotal), 0);
  const totalRecycledKg = completedPickups.reduce((sum, p) => {
    if (p.actualWeighed) {
      return sum + p.actualWeighed.reduce((s, item) => s + item.weight, 0);
    }
    return sum + p.items.reduce((s, item) => s + (item.estWeight || 0), 0);
  }, 0) + 120;

  const treesSaved = Math.max(1, (totalRecycledKg * 0.017).toFixed(1));
  const co2Reduced = Math.max(10, (totalRecycledKg * 1.8).toFixed(0));
  const waterSavedLiters = Math.max(50, (totalRecycledKg * 26).toFixed(0));

  return (
    <div className="seller-view-container">
      {/* HERO SECTION */}
      <section className="seller-hero">
        <div className="hero-badge">
          <Leaf size={14} className="text-emerald" />
          <span>{t.hero.badge}</span>
        </div>
        <h1 className="hero-title">{t.hero.title}</h1>
        <p className="hero-subtitle">{t.hero.subtitle}</p>

        <div className="hero-actions">
          <button className="btn-primary cta-large pulse-glow" onClick={onOpenBooking}>
            <Sparkles size={18} />
            <span>{t.hero.ctaBook}</span>
          </button>
          <a href="#rates-section" className="btn-secondary cta-large">
            <span>{t.hero.ctaRates}</span>
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Live Trust Metrics Bar */}
        <div className="trust-metrics-strip glass-panel">
          <div className="metric-col">
            <span className="metric-num">14,250+ kg</span>
            <span className="metric-label">{t.stats.recycled}</span>
          </div>
          <div className="metric-divider" />
          <div className="metric-col">
            <span className="metric-num text-emerald">₹3,84,500</span>
            <span className="metric-label">{t.stats.payout}</span>
          </div>
          <div className="metric-divider" />
          <div className="metric-col">
            <span className="metric-num">48 Dealers</span>
            <span className="metric-label">{t.stats.dealers}</span>
          </div>
          <div className="metric-divider" />
          <div className="metric-col">
            <span className="metric-num text-amber">4.9 ★</span>
            <span className="metric-label">{t.stats.rating}</span>
          </div>
        </div>
      </section>

      {/* ACTIVE ORDERS / TRACKER SECTION */}
      <section className="section-container" id="my-pickups">
        <div className="section-header">
          <div>
            <h2 className="section-title">Your Scrap Pickups & Requests</h2>
            <p className="section-subtitle">Track pickup vehicle, verify digital scale receipts, and view earnings</p>
          </div>
          <button className="btn-secondary text-sm" onClick={onOpenBooking}>
            + Request Another
          </button>
        </div>

        <div className="pickups-grid">
          {pickups.map(pickup => {
            return (
              <div key={pickup.id} className="pickup-card glass-panel">
                <div className="pickup-card-header">
                  <div>
                    <span className="order-id font-mono">{pickup.id}</span>
                    <span className="order-date text-xs text-muted ml-2">{pickup.createdAt}</span>
                  </div>
                  <div>
                    {pickup.status === 'requested' && (
                      <span className="badge badge-amber">Waiting for Dealer</span>
                    )}
                    {pickup.status === 'out_for_pickup' && (
                      <span className="badge badge-blue">
                        <Truck size={12} /> Out for Pickup
                      </span>
                    )}
                    {pickup.status === 'completed' && (
                      <span className="badge badge-green">
                        <CheckCircle2 size={12} /> Weighed & Paid
                      </span>
                    )}
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="timeline-track">
                  <div className={`timeline-step ${['requested', 'assigned', 'out_for_pickup', 'completed'].includes(pickup.status) ? 'step-done' : ''}`}>
                    <div className="step-circle"><CheckCircle2 size={12} /></div>
                    <span>Booked</span>
                  </div>
                  <div className={`timeline-line ${['assigned', 'out_for_pickup', 'completed'].includes(pickup.status) ? 'line-done' : ''}`} />
                  <div className={`timeline-step ${['assigned', 'out_for_pickup', 'completed'].includes(pickup.status) ? 'step-done' : ''}`}>
                    <div className="step-circle"><CheckCircle2 size={12} /></div>
                    <span>Assigned</span>
                  </div>
                  <div className={`timeline-line ${['out_for_pickup', 'completed'].includes(pickup.status) ? 'line-done' : ''}`} />
                  <div className={`timeline-step ${['out_for_pickup', 'completed'].includes(pickup.status) ? 'step-done' : ''}`}>
                    <div className="step-circle"><Truck size={12} /></div>
                    <span>On Route</span>
                  </div>
                  <div className={`timeline-line ${pickup.status === 'completed' ? 'line-done' : ''}`} />
                  <div className={`timeline-step ${pickup.status === 'completed' ? 'step-done' : ''}`}>
                    <div className="step-circle"><Scale size={12} /></div>
                    <span>Settled</span>
                  </div>
                </div>

                {/* Details */}
                <div className="pickup-details">
                  <div className="detail-row">
                    <span className="detail-label"><Clock size={14} /> Scheduled Slot:</span>
                    <span className="detail-val font-semibold">{pickup.slot}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label"><MapPin size={14} /> Address:</span>
                    <span className="detail-val text-xs text-muted">{pickup.address} ({pickup.pincode})</span>
                  </div>

                  {pickup.assignedDealerName && (
                    <div className="dealer-assigned-box">
                      <div className="dealer-avatar-small">
                        <ShieldCheck size={16} className="text-emerald" />
                      </div>
                      <div className="dealer-assigned-info">
                        <div className="dealer-name-tag font-semibold text-sm">
                          {pickup.assignedDealerName}
                        </div>
                        <div className="text-xs text-muted flex items-center gap-2">
                          <span><Phone size={11} inline /> {pickup.dealerPhone}</span>
                          <span className="text-emerald font-medium">✓ Certified Digital Scale</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="scrap-items-preview">
                    <span className="text-xs text-muted">Items: </span>
                    {pickup.items.map((it, idx) => {
                      const cat = categories.find(c => c.id === it.categoryId);
                      return (
                        <span key={idx} className="item-tag">
                          {cat?.name || it.categoryId} ({it.estWeight}kg)
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Payout and Receipt */}
                <div className="pickup-card-footer">
                  <div>
                    <span className="text-xs text-muted">
                      {pickup.status === 'completed' ? 'Final Payout Received:' : 'Estimated Cash:'}
                    </span>
                    <div className="footer-amount font-mono font-bold text-emerald">
                      ₹{pickup.finalAmount ? pickup.finalAmount.toFixed(2) : pickup.estTotal.toFixed(0)}
                    </div>
                  </div>

                  {pickup.status === 'completed' ? (
                    <button className="btn-secondary text-sm" onClick={() => onViewReceipt(pickup)}>
                      <FileText size={15} /> View Digital Receipt
                    </button>
                  ) : (
                    <div className="text-xs text-muted italic">
                      Dealer will weigh on certified digital scale
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TODAY'S LIVE SCRAP RATES BOARD */}
      <section className="section-container" id="rates-section">
        <div className="section-header">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="section-title">Today's Live Scrap Rates (Pune Market)</h2>
              <span className="badge badge-green flex items-center gap-1">
                <span className="live-dot" /> Live Updated
              </span>
            </div>
            <p className="section-subtitle">Transparent per-kg rates benchmarked with wholesale recycling mills. No hidden deductions.</p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="rates-filter-bar glass-panel">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search newspaper, copper, iron, AC, plastic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="tabs-container">
            {categoryTabs.map(tab => (
              <button
                key={tab}
                className={`tab-btn ${selectedCategoryTab === tab ? 'active' : ''}`}
                onClick={() => setSelectedCategoryTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Rates Grid */}
        <div className="rates-grid">
          {filteredCategories.map(cat => (
            <div key={cat.id} className="rate-card glass-panel">
              <div className="rate-card-top">
                <span className="cat-pill" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                  {cat.category}
                </span>
                <span className="trend-indicator text-xs text-emerald flex items-center gap-1 font-semibold">
                  <TrendingUp size={12} /> {cat.trend}
                </span>
              </div>

              <div className="rate-item-name font-bold">{cat.name}</div>
              {cat.nameHi && <div className="rate-item-hi text-xs text-muted">{cat.nameHi}</div>}

              <div className="rate-price-row">
                <span className="rate-currency">₹</span>
                <span className="rate-value font-mono font-bold">{cat.rate}</span>
                <span className="rate-unit">/{cat.unit}</span>
              </div>

              <p className="rate-desc text-xs text-muted">{cat.desc}</p>

              <button className="book-item-btn" onClick={onOpenBooking}>
                Add to Pickup <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* GREEN IMPACT & ENVIRONMENT DASHBOARD */}
      <section className="section-container">
        <div className="impact-card dark-glass">
          <div className="impact-header">
            <div>
              <span className="badge badge-green mb-2">Household Sustainability Score</span>
              <h2 className="text-white text-2xl font-bold">Your Direct Environmental Contribution</h2>
              <p className="text-dark-muted text-sm mt-1">
                Every kilogram of scrap you recycle through Scrapify diverts waste from overflowing municipal landfills.
              </p>
            </div>
            <div className="impact-total-box">
              <span className="text-emerald font-mono font-bold text-3xl">{totalRecycledKg} kg</span>
              <span className="text-xs text-dark-muted">Total Diverted from Landfill</span>
            </div>
          </div>

          <div className="impact-stats-grid">
            <div className="impact-stat-item">
              <div className="impact-icon-circle green">
                <TreePine size={22} />
              </div>
              <div>
                <div className="stat-val font-bold text-white">{treesSaved} Trees</div>
                <div className="stat-label text-dark-muted text-xs">Saved from paper logging</div>
              </div>
            </div>

            <div className="impact-stat-item">
              <div className="impact-icon-circle blue">
                <Droplet size={22} />
              </div>
              <div>
                <div className="stat-val font-bold text-white">{waterSavedLiters} Liters</div>
                <div className="stat-label text-dark-muted text-xs">Industrial water conserved</div>
              </div>
            </div>

            <div className="impact-stat-item">
              <div className="impact-icon-circle amber">
                <Wind size={22} />
              </div>
              <div>
                <div className="stat-val font-bold text-white">{co2Reduced} kg CO₂</div>
                <div className="stat-label text-dark-muted text-xs">Greenhouse gas emission avoided</div>
              </div>
            </div>

            <div className="impact-stat-item">
              <div className="impact-icon-circle purple">
                <Scale size={22} />
              </div>
              <div>
                <div className="stat-val font-bold text-white">₹{totalEarned.toFixed(0)}</div>
                <div className="stat-label text-dark-muted text-xs">Circular economy cash earned</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS 3-STEP GUIDE */}
      <section className="section-container">
        <h2 className="section-title text-center mb-2">How Scrapify Works</h2>
        <p className="section-subtitle text-center mb-8">Selling household scrap has never been this smooth and honest</p>

        <div className="steps-container">
          <div className="step-card glass-panel">
            <div className="step-badge">1</div>
            <div className="step-icon-bg">
              <Calendar size={28} className="text-emerald" />
            </div>
            <h3 className="step-title">1. Schedule Free Pickup</h3>
            <p className="step-desc text-sm text-muted">
              Choose your scrap categories, enter your address, and select a convenient 2-hour morning or evening slot.
            </p>
          </div>

          <div className="step-card glass-panel">
            <div className="step-badge">2</div>
            <div className="step-icon-bg">
              <Scale size={28} className="text-emerald" />
            </div>
            <h3 className="step-title">2. Digital Doorstep Weighing</h3>
            <p className="step-desc text-sm text-muted">
              Verified dealer arrives with a certified digital hanging or platform scale. Watch the real-time weight on the LCD.
            </p>
          </div>

          <div className="step-card glass-panel">
            <div className="step-badge">3</div>
            <div className="step-icon-bg">
              <Sparkles size={28} className="text-emerald" />
            </div>
            <h3 className="step-title">3. Instant Cash or Direct UPI</h3>
            <p className="step-desc text-sm text-muted">
              Get paid on the spot with a legal digital receipt sent to your phone. Zero deductions, 100% fair.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
