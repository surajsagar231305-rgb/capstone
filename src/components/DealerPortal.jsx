import React, { useState } from 'react';
import { 
  Wrench, 
  ShieldCheck, 
  Scale, 
  Truck, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Clock, 
  Plus, 
  ArrowUpRight, 
  QrCode, 
  TrendingUp, 
  AlertCircle,
  FileText,
  DollarSign,
  Package,
  Layers,
  Sparkles
} from 'lucide-react';
import { INITIAL_DEALER_STOCK } from '../data/mockData';

export default function DealerPortal({ 
  dealer, 
  pickups, 
  onAcceptPickup, 
  onCompleteWeighing, 
  categories, 
  onUpdateCategoryRate,
  onViewReceipt 
}) {
  const [activeTab, setActiveTab] = useState('weighing');
  const [selectedPickupForWeighing, setSelectedPickupForWeighing] = useState(
    pickups.find(p => p.status === 'out_for_pickup') || pickups[0]
  );

  const [weighedItems, setWeighedItems] = useState([
    { categoryId: 'newspaper', name: 'Newspaper (Raddi)', weight: 26.5, rate: 16 },
    { categoryId: 'cardboard', name: 'Cardboard / Carton', weight: 14.8, rate: 11 },
    { categoryId: 'plastic_pet', name: 'Hard Plastic & Bottles', weight: 5.2, rate: 12 }
  ]);
  const [paymentMode, setPaymentMode] = useState('UPI');
  const [isSettled, setIsSettled] = useState(false);

  const incomingRequests = pickups.filter(p => p.status === 'requested');
  const myAssignedPickups = pickups.filter(p => p.status === 'assigned' || p.status === 'out_for_pickup');
  const completedPickups = pickups.filter(p => p.status === 'completed');

  const liveScaleTotal = weighedItems.reduce((sum, item) => sum + (item.weight * item.rate), 0);
  const liveTotalWeight = weighedItems.reduce((sum, item) => sum + item.weight, 0);

  const handleWeightChange = (index, newWeight) => {
    const updated = [...weighedItems];
    updated[index].weight = parseFloat(newWeight) || 0;
    setWeighedItems(updated);
  };

  const handleFinishWeighingAndPay = () => {
    if (!selectedPickupForWeighing) return;

    const actualWeighedList = weighedItems.map(item => ({
      name: item.name,
      weight: item.weight,
      rate: item.rate,
      total: item.weight * item.rate
    }));

    onCompleteWeighing(
      selectedPickupForWeighing.id,
      actualWeighedList,
      liveScaleTotal,
      paymentMode === 'UPI' ? 'UPI (GooglePay / PhonePe)' : 'Doorstep Cash'
    );

    setIsSettled(true);
    setTimeout(() => {
      setIsSettled(false);
    }, 4000);
  };

  return (
    <div className="dealer-portal-container">
      {/* DEALER HERO & KYC STATUS BANNER */}
      <div className="dealer-header-card glass-panel">
        <div className="dealer-profile-row">
          <div className="dealer-avatar-large">
            <Wrench size={32} className="text-emerald" />
          </div>
          <div className="dealer-info-col">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="dealer-shop-name text-2xl font-bold">{dealer.name}</h1>
              <span className="badge badge-green flex items-center gap-1">
                <ShieldCheck size={13} /> KYC Verified
              </span>
              <span className="badge badge-blue">Scale Stamped 2026</span>
            </div>
            <p className="text-sm text-muted mt-1">
              Owner: <strong>{dealer.owner}</strong> &bull; {dealer.phone} &bull; Service Area: <strong>{dealer.area}</strong>
            </p>
            <p className="text-xs text-muted">
              Legal Metrology Scale Cert: <code className="bg-slate-100 px-1 py-0.5 rounded">{dealer.scaleCertNo}</code> ({dealer.scaleType})
            </p>
          </div>
        </div>

        {/* Dealer Quick Stats */}
        <div className="dealer-stats-strip">
          <div className="stat-cell">
            <span className="stat-title">Today's Purchases</span>
            <span className="stat-number font-mono text-emerald">182.5 kg</span>
          </div>
          <div className="stat-cell">
            <span className="stat-title">Cash/UPI Disbursed</span>
            <span className="stat-number font-mono">₹4,970</span>
          </div>
          <div className="stat-cell">
            <span className="stat-title">Pending Pickups</span>
            <span className="stat-number font-mono text-amber">{myAssignedPickups.length} scheduled</span>
          </div>
          <div className="stat-cell">
            <span className="stat-title">Seller Rating</span>
            <span className="stat-number font-mono text-yellow-500">★ 4.8 / 5.0</span>
          </div>
        </div>
      </div>

      {/* DEALER TABS */}
      <div className="dealer-tabs-nav">
        <button
          className={`d-tab-btn ${activeTab === 'weighing' ? 'active' : ''}`}
          onClick={() => setActiveTab('weighing')}
        >
          <Scale size={18} />
          <span>Doorstep Digital Scale & Bill</span>
        </button>
        <button
          className={`d-tab-btn ${activeTab === 'feed' ? 'active' : ''}`}
          onClick={() => setActiveTab('feed')}
        >
          <Truck size={18} />
          <span>Incoming Requests ({incomingRequests.length})</span>
        </button>
        <button
          className={`d-tab-btn ${activeTab === 'rates' ? 'active' : ''}`}
          onClick={() => setActiveTab('rates')}
        >
          <TrendingUp size={18} />
          <span>My Buying Rate Card</span>
        </button>
        <button
          className={`d-tab-btn ${activeTab === 'stock' ? 'active' : ''}`}
          onClick={() => setActiveTab('stock')}
        >
          <Layers size={18} />
          <span>Godown Inventory & Margins</span>
        </button>
      </div>

      {/* TAB 1: ON-SITE DIGITAL SCALE & BILLING DESK */}
      {activeTab === 'weighing' && (
        <div className="scale-desk-container">
          <div className="scale-layout-grid">
            {/* Left: Active Pickup Selector & Customer Details */}
            <div className="active-order-sidebar glass-panel">
              <h3 className="text-md font-bold mb-3 flex items-center gap-2">
                <Clock size={16} className="text-emerald" /> Select Order to Weigh
              </h3>

              <div className="order-select-list">
                {myAssignedPickups.map(pickup => (
                  <div
                    key={pickup.id}
                    className={`order-mini-card ${selectedPickupForWeighing?.id === pickup.id ? 'active' : ''}`}
                    onClick={() => setSelectedPickupForWeighing(pickup)}
                  >
                    <div className="flex-between">
                      <span className="font-mono font-bold text-xs">{pickup.id}</span>
                      <span className="badge badge-blue text-2xs">{pickup.status}</span>
                    </div>
                    <div className="font-semibold text-sm mt-1">{pickup.sellerName}</div>
                    <div className="text-xs text-muted flex items-center gap-1 mt-1">
                      <MapPin size={11} /> {pickup.address}
                    </div>
                    <div className="text-xs text-emerald font-semibold mt-1">
                      Est: ₹{pickup.estTotal} ({pickup.slot})
                    </div>
                  </div>
                ))}

                {completedPickups.slice(0, 2).map(pickup => (
                  <div
                    key={pickup.id}
                    className="order-mini-card completed-opacity"
                    onClick={() => onViewReceipt(pickup)}
                  >
                    <div className="flex-between">
                      <span className="font-mono text-xs">{pickup.id}</span>
                      <span className="badge badge-green text-2xs">Completed</span>
                    </div>
                    <div className="text-sm font-medium">{pickup.sellerName}</div>
                    <div className="text-xs text-muted">Paid: ₹{pickup.finalAmount}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: The Interactive Digital Weighing Machine */}
            <div className="digital-scale-box glass-panel">
              <div className="scale-top-header">
                <div className="flex items-center gap-2">
                  <div className="lcd-indicator-dot" />
                  <span className="font-bold text-sm tracking-wide">LEGAL METROLOGY ELECTRONIC LCD</span>
                </div>
                <span className="scale-serial text-2xs text-muted font-mono">MODEL: CROWN-150-DIGITAL</span>
              </div>

              {/* LCD Display Screen (Simulating real digital scale) */}
              <div className="lcd-screen">
                <div className="lcd-reading-col">
                  <span className="lcd-label">NET WEIGHT</span>
                  <div className="lcd-digits font-mono">
                    {liveTotalWeight.toFixed(2)} <span className="lcd-unit">KG</span>
                  </div>
                </div>
                <div className="lcd-divider" />
                <div className="lcd-reading-col text-right">
                  <span className="lcd-label">TOTAL PAYOUT</span>
                  <div className="lcd-digits font-mono text-emerald">
                    ₹{liveScaleTotal.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Table of items being weighed */}
              <div className="weighed-items-editor">
                <div className="flex-between mb-2">
                  <h4 className="text-sm font-semibold">Live Weight Entry per Item:</h4>
                  <span className="text-xs text-muted">Zero Tare Calibrated ✓</span>
                </div>

                <div className="weigh-rows">
                  {weighedItems.map((item, idx) => (
                    <div key={idx} className="weigh-row">
                      <div className="weigh-item-name font-medium text-sm">
                        {item.name}
                      </div>
                      <div className="weigh-rate-tag text-xs text-muted font-mono">
                        ₹{item.rate}/kg
                      </div>
                      <div className="weigh-input-wrap">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          value={item.weight}
                          onChange={(e) => handleWeightChange(idx, e.target.value)}
                          className="weigh-input font-mono font-bold"
                        />
                        <span className="input-unit">kg</span>
                      </div>
                      <div className="weigh-subtotal font-mono font-bold text-emerald">
                        ₹{(item.weight * item.rate).toFixed(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Settlement Mode */}
              <div className="payment-mode-section">
                <label className="text-xs font-semibold text-muted mb-2 block">SELECT DOORSTEP SETTLEMENT MODE:</label>
                <div className="payment-options-grid">
                  <div
                    className={`pay-card ${paymentMode === 'UPI' ? 'active' : ''}`}
                    onClick={() => setPaymentMode('UPI')}
                  >
                    <QrCode size={20} className="text-emerald" />
                    <div>
                      <div className="font-semibold text-sm">Instant UPI Transfer</div>
                      <div className="text-xs text-muted">GPay / PhonePe / Paytm to Seller's Mobile</div>
                    </div>
                  </div>

                  <div
                    className={`pay-card ${paymentMode === 'Cash' ? 'active' : ''}`}
                    onClick={() => setPaymentMode('Cash')}
                  >
                    <DollarSign size={20} className="text-amber" />
                    <div>
                      <div className="font-semibold text-sm">Doorstep Cash</div>
                      <div className="text-xs text-muted">Physical cash handed to citizen</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Notification Bar */}
              {isSettled && (
                <div className="settlement-success-alert badge-green p-3 rounded-lg mb-3 flex items-center gap-2">
                  <CheckCircle2 size={18} />
                  <div>
                    <strong>Settlement Complete!</strong> Digital Invoice & SMS sent to {selectedPickupForWeighing?.sellerName}.
                  </div>
                </div>
              )}

              {/* Bottom Action Button */}
              <div className="scale-actions">
                <button
                  className="btn-primary w-full pulse-glow"
                  onClick={handleFinishWeighingAndPay}
                  disabled={liveScaleTotal === 0}
                >
                  <CheckCircle2 size={18} />
                  <span>Disburse ₹{liveScaleTotal.toFixed(0)} & Issue Digital Receipt</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INCOMING REQUESTS FEED */}
      {activeTab === 'feed' && (
        <div className="feed-container">
          <div className="flex-between mb-4">
            <div>
              <h3 className="text-xl font-bold">Available Scrap Requests in Your Area</h3>
              <p className="text-sm text-muted">Requests matching your verified pin codes (411038, 411004, 411052)</p>
            </div>
            <span className="badge badge-green">{incomingRequests.length} Fresh Requests</span>
          </div>

          <div className="feed-grid">
            {incomingRequests.length === 0 ? (
              <div className="empty-feed glass-panel text-center py-8">
                <Package size={40} className="text-muted mx-auto mb-2" />
                <p className="font-semibold">No pending unassigned requests</p>
                <p className="text-xs text-muted">New requests from households will appear here automatically.</p>
              </div>
            ) : (
              incomingRequests.map(req => (
                <div key={req.id} className="feed-card glass-panel">
                  <div className="feed-card-header">
                    <div>
                      <span className="font-mono font-bold text-xs">{req.id}</span>
                      <span className="badge badge-purple text-2xs ml-2">{req.sellerType}</span>
                    </div>
                    <span className="text-xs text-muted">{req.createdAt}</span>
                  </div>

                  <h4 className="font-bold text-base mt-2">{req.sellerName}</h4>
                  <p className="text-xs text-muted flex items-center gap-1 mt-1">
                    <MapPin size={12} /> {req.address} ({req.pincode})
                  </p>
                  <p className="text-xs text-emerald font-semibold mt-1">
                    <Clock size={12} inline /> Slot Requested: {req.slot}
                  </p>

                  <div className="feed-items-box">
                    <span className="text-xs font-semibold text-muted block mb-1">Declared Scrap:</span>
                    <div className="flex gap-2 flex-wrap">
                      {req.items.map((it, idx) => {
                        const cat = categories.find(c => c.id === it.categoryId);
                        return (
                          <span key={idx} className="item-tag">
                            {cat?.name || it.categoryId}: ~{it.estWeight}kg
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {req.notes && (
                    <div className="text-xs bg-slate-50 p-2 rounded mt-2 border text-muted">
                      "{req.notes}"
                    </div>
                  )}

                  <div className="feed-card-footer mt-4 flex-between">
                    <div>
                      <span className="text-xs text-muted">Est. Value:</span>
                      <div className="font-mono font-bold text-emerald text-lg">
                        ₹{req.estTotal}
                      </div>
                    </div>
                    <button
                      className="btn-primary"
                      onClick={() => {
                        onAcceptPickup(req.id, dealer.id, dealer.name);
                        setActiveTab('weighing');
                      }}
                    >
                      Accept & Assign Van
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: DAILY BUYING RATE CARD */}
      {activeTab === 'rates' && (
        <div className="dealer-rates-container glass-panel">
          <div className="flex-between mb-4">
            <div>
              <h3 className="text-xl font-bold">Your Today's Buying Rate Card</h3>
              <p className="text-sm text-muted">Adjust what you pay per kg. Higher rates attract more household bookings.</p>
            </div>
            <button className="btn-secondary text-sm" onClick={() => alert("All rates synchronized with city wholesale benchmark.")}>
              Sync with City Benchmark
            </button>
          </div>

          <div className="rates-table-wrap">
            <table className="receipt-table">
              <thead>
                <tr>
                  <th>Material</th>
                  <th>Category</th>
                  <th>Your Rate</th>
                  <th>Benchmark Rate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(cat => (
                  <tr key={cat.id}>
                    <td className="font-semibold">{cat.name}</td>
                    <td><span className="cat-pill">{cat.category}</span></td>
                    <td>
                      <div className="flex items-center gap-1">
                        <span className="font-bold font-mono text-emerald">₹{cat.rate}</span>
                        <span className="text-xs text-muted">/{cat.unit}</span>
                      </div>
                    </td>
                    <td className="text-muted font-mono text-xs">₹{cat.rate - 1} - ₹{cat.rate + 2}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          className="btn-sm-qty"
                          onClick={() => onUpdateCategoryRate(cat.id, cat.rate + 1)}
                        >
                          + ₹1
                        </button>
                        <button
                          className="btn-sm-qty"
                          onClick={() => onUpdateCategoryRate(cat.id, Math.max(1, cat.rate - 1))}
                        >
                          - ₹1
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: GODOWN STOCK & WHOLESALE MARGINS */}
      {activeTab === 'stock' && (
        <div className="stock-container glass-panel">
          <div className="flex-between mb-4">
            <div>
              <h3 className="text-xl font-bold">Godown Inventory & Bulk Recycler Margins</h3>
              <p className="text-sm text-muted">Estimated profit when selling consolidated truckloads to wholesale smelting/pulper mills</p>
            </div>
            <span className="badge badge-purple">9.4 Metric Tons in Stock</span>
          </div>

          <div className="stock-table-wrap">
            <table className="receipt-table">
              <thead>
                <tr>
                  <th>Scrap Category</th>
                  <th className="text-right">Stock in Godown</th>
                  <th className="text-right">Avg Buy Rate (Doorstep)</th>
                  <th className="text-right">Wholesale Mill Rate</th>
                  <th className="text-right">Est. Gross Margin</th>
                </tr>
              </thead>
              <tbody>
                {INITIAL_DEALER_STOCK.map((item, idx) => {
                  const estProfit = (item.estWholesaleRate - item.avgPurchaseRate) * item.currentStockKg;
                  return (
                    <tr key={idx}>
                      <td className="font-semibold">{item.category}</td>
                      <td className="text-right font-mono font-bold">{item.currentStockKg.toLocaleString()} kg</td>
                      <td className="text-right font-mono text-muted">₹{item.avgPurchaseRate.toFixed(2)}/kg</td>
                      <td className="text-right font-mono text-emerald font-semibold">₹{item.estWholesaleRate.toFixed(2)}/kg</td>
                      <td className="text-right font-mono font-bold text-emerald">
                        +₹{estProfit.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="wholesale-dispatch-bar mt-6 p-4 rounded-xl bg-slate-900 text-white flex-between">
            <div>
              <h4 className="font-bold text-sm text-emerald">Ready to dispatch full truckload (10 Tons)?</h4>
              <p className="text-xs text-dark-muted">Connect with Partner Smelting Mills in MIDC Bhosari & Chakan for instant gate pass.</p>
            </div>
            <button className="btn-primary" onClick={() => alert("Requesting dispatch truck & B2B gate pass from wholesale recycler.")}>
              Dispatch to Mill
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
