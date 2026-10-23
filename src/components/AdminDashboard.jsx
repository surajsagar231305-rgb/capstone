import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Scale, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  AlertTriangle, 
  Building2, 
  FileCheck,
  Search,
  Sliders,
  DollarSign
} from 'lucide-react';
import { INITIAL_KYC_APPLICATIONS } from '../data/mockData';

export default function AdminDashboard({ 
  categories, 
  onUpdateCategoryRate, 
  dealers, 
  pickups 
}) {
  const [kycList, setKycList] = useState(INITIAL_KYC_APPLICATIONS);
  const [activeTab, setActiveTab] = useState('kyc'); // 'kyc' | 'benchmark' | 'disputes'

  const handleApproveKyc = (id) => {
    setKycList(prev => prev.map(item => item.id === id ? { ...item, status: 'approved' } : item));
  };

  const handleRejectKyc = (id) => {
    setKycList(prev => prev.map(item => item.id === id ? { ...item, status: 'rejected' } : item));
  };

  const totalRecycledTons = 142.8;
  const platformRevenue = 192400; // ₹1.92L
  const grossTradeVolume = 3848000; // ₹38.4L

  return (
    <div className="admin-dashboard-container">
      {/* ADMIN TOP SUMMARY CARDS */}
      <div className="admin-header-row mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheck className="text-emerald" /> Platform Operations & Compliance Suite
          </h1>
          <p className="text-sm text-muted">
            Legal Metrology scale verification, city base rates, and dealer KYC management
          </p>
        </div>
        <span className="badge badge-green">City: Pune Metropolitan Area</span>
      </div>

      <div className="admin-kpi-grid">
        <div className="admin-kpi-card glass-panel">
          <div className="flex-between">
            <span className="text-xs font-semibold text-muted">TOTAL RECYCLED</span>
            <Scale size={18} className="text-emerald" />
          </div>
          <div className="kpi-value font-mono font-bold text-emerald text-2xl mt-1">
            {totalRecycledTons} Tons
          </div>
          <span className="text-2xs text-muted">Across 18 urban municipal wards</span>
        </div>

        <div className="admin-kpi-card glass-panel">
          <div className="flex-between">
            <span className="text-xs font-semibold text-muted">GROSS SCRAP TRADE</span>
            <DollarSign size={18} className="text-blue-500" />
          </div>
          <div className="kpi-value font-mono font-bold text-2xl mt-1">
            ₹{(grossTradeVolume / 100000).toFixed(2)} Lakhs
          </div>
          <span className="text-2xs text-emerald font-semibold">100% Doorstep Direct Settlements</span>
        </div>

        <div className="admin-kpi-card glass-panel">
          <div className="flex-between">
            <span className="text-xs font-semibold text-muted">ACTIVE VERIFIED DEALERS</span>
            <Users size={18} className="text-purple-500" />
          </div>
          <div className="kpi-value font-mono font-bold text-2xl mt-1">
            {dealers.length + 45}
          </div>
          <span className="text-2xs text-muted">With valid stamped electronic scales</span>
        </div>

        <div className="admin-kpi-card glass-panel">
          <div className="flex-between">
            <span className="text-xs font-semibold text-muted">PLATFORM COMMISSION</span>
            <TrendingUp size={18} className="text-amber-500" />
          </div>
          <div className="kpi-value font-mono font-bold text-2xl mt-1">
            ₹{(platformRevenue / 1000).toFixed(1)}k
          </div>
          <span className="text-2xs text-muted">5% Dealer lead generation fee</span>
        </div>
      </div>

      {/* ADMIN NAVIGATION TABS */}
      <div className="dealer-tabs-nav mt-6">
        <button
          className={`d-tab-btn ${activeTab === 'kyc' ? 'active' : ''}`}
          onClick={() => setActiveTab('kyc')}
        >
          <FileCheck size={18} />
          <span>Dealer Scale & KYC Verification ({kycList.filter(k => k.status === 'pending').length} Pending)</span>
        </button>
        <button
          className={`d-tab-btn ${activeTab === 'benchmark' ? 'active' : ''}`}
          onClick={() => setActiveTab('benchmark')}
        >
          <Sliders size={18} />
          <span>City Benchmark Rates Controller</span>
        </button>
        <button
          className={`d-tab-btn ${activeTab === 'disputes' ? 'active' : ''}`}
          onClick={() => setActiveTab('disputes')}
        >
          <AlertTriangle size={18} />
          <span>Customer Feedback & Audit Log</span>
        </button>
      </div>

      {/* TAB 1: DEALER KYC & ELECTRONIC SCALE VERIFICATION DESK */}
      {activeTab === 'kyc' && (
        <div className="kyc-desk-container glass-panel">
          <div className="flex-between mb-4">
            <div>
              <h3 className="text-lg font-bold">New Dealer Onboarding & Metrology Scale Audit</h3>
              <p className="text-xs text-muted">
                Mandatory rule: Scrap dealers cannot receive customer leads until physical scale stamping and Govt ID are verified.
              </p>
            </div>
          </div>

          <div className="kyc-applications-list">
            {kycList.map(app => (
              <div key={app.id} className="kyc-card">
                <div className="kyc-card-top flex-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-muted">{app.id}</span>
                    <h4 className="font-bold text-base mt-1">{app.name}</h4>
                    <p className="text-xs text-muted">Applicant: <strong>{app.applicant}</strong> ({app.phone})</p>
                  </div>
                  <div>
                    {app.status === 'pending' && <span className="badge badge-amber">Verification Pending</span>}
                    {app.status === 'approved' && <span className="badge badge-green"><CheckCircle2 size={12} /> Approved & Active</span>}
                    {app.status === 'rejected' && <span className="badge badge-purple"><XCircle size={12} /> Rejected</span>}
                  </div>
                </div>

                <div className="kyc-details-grid mt-3">
                  <div className="kyc-detail-item">
                    <span className="label">Shop Address:</span>
                    <span className="val">{app.shopAddress} (Pin: {app.pinCode})</span>
                  </div>
                  <div className="kyc-detail-item">
                    <span className="label">Electronic Scale Model & Stamping:</span>
                    <span className="val text-emerald font-semibold">{app.scaleModel}</span>
                  </div>
                  <div className="kyc-detail-item">
                    <span className="label">Submitted Proofs:</span>
                    <span className="val">{app.idProof}</span>
                  </div>
                </div>

                {app.status === 'pending' && (
                  <div className="kyc-actions mt-4 flex gap-3">
                    <button
                      className="btn-primary text-sm flex items-center gap-1"
                      onClick={() => handleApproveKyc(app.id)}
                    >
                      <CheckCircle2 size={16} /> Approve & Grant Verified Scale Badge
                    </button>
                    <button
                      className="btn-secondary text-sm flex items-center gap-1 text-danger"
                      onClick={() => handleRejectKyc(app.id)}
                    >
                      <XCircle size={16} /> Reject Incomplete Scale Stamping
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BENCHMARK SCRAP RATES CONTROLLER */}
      {activeTab === 'benchmark' && (
        <div className="benchmark-controller glass-panel">
          <div className="flex-between mb-4">
            <div>
              <h3 className="text-lg font-bold">Pune City Benchmark Base Rates</h3>
              <p className="text-xs text-muted">
                Admin guidance rates published daily at 8:00 AM. Dealers use these benchmark rates to prevent unfair under-quoting.
              </p>
            </div>
            <button className="btn-secondary text-sm" onClick={() => alert("Daily rate broadcast notification sent to all 48 scrap dealers!")}>
              Broadcast to All Dealers
            </button>
          </div>

          <div className="rates-table-wrap">
            <table className="receipt-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Material Name</th>
                  <th>City Benchmark Rate</th>
                  <th>Wholesale Smelter Spread</th>
                  <th>Quick Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(cat => (
                  <tr key={cat.id}>
                    <td><span className="cat-pill">{cat.category}</span></td>
                    <td className="font-semibold">{cat.name}</td>
                    <td>
                      <span className="font-mono font-bold text-emerald text-base">₹{cat.rate}</span>
                      <span className="text-xs text-muted"> / {cat.unit}</span>
                    </td>
                    <td className="text-xs text-muted font-mono">Wholesale margin: +18% to 25%</td>
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

      {/* TAB 3: CUSTOMER FEEDBACK & AUDIT LOG */}
      {activeTab === 'disputes' && (
        <div className="audit-desk glass-panel">
          <h3 className="text-lg font-bold mb-3">Live Doorstep Weighing Audit & Customer Reviews</h3>
          <div className="audit-list">
            {pickups.filter(p => p.status === 'completed').map(p => (
              <div key={p.id} className="audit-card">
                <div className="flex-between">
                  <div>
                    <span className="font-mono text-xs font-bold">{p.id}</span>
                    <span className="text-sm font-semibold ml-2">{p.sellerName}</span>
                    <span className="text-xs text-muted ml-1">&bull; {p.address}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                    ★ {p.ratingGiven || 5.0}
                  </div>
                </div>
                <p className="text-xs text-muted mt-2">
                  Dealer: <strong>{p.assignedDealerName}</strong> &bull; Total Settled: <strong className="text-emerald">₹{p.finalAmount}</strong> ({p.paymentMethod})
                </p>
                <div className="text-xs bg-slate-50 p-2 rounded mt-2 border text-slate-700 italic">
                  "{p.feedback || 'Smooth transaction, scale showed digital weight clearly.'}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
