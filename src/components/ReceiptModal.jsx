import React from 'react';
import { X, CheckCircle2, QrCode, Download, Printer, ShieldCheck, Scale } from 'lucide-react';

export default function ReceiptModal({ pickup, onClose }) {
  if (!pickup) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card receipt-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="receipt-title-box">
            <ShieldCheck className="text-emerald" size={24} />
            <div>
              <h3>Verified Digital Weighing Receipt</h3>
              <p className="subtext">Scrapify Guaranteed Settlement Slip</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="receipt-body">
          <div className="receipt-top-info">
            <div>
              <div className="label">RECEIPT NUMBER</div>
              <div className="val font-mono">{pickup.receiptNo || `KS-INV-2026-${pickup.id.replace('REQ-', '')}`}</div>
            </div>
            <div className="text-right">
              <div className="label">DATE & TIME</div>
              <div className="val">{pickup.completedAt || pickup.slot}</div>
            </div>
          </div>

          <div className="receipt-parties">
            <div className="party-box">
              <span className="party-title">Seller / Citizen</span>
              <p className="font-semibold">{pickup.sellerName}</p>
              <p className="text-sm text-muted">{pickup.phone}</p>
              <p className="text-xs text-muted">{pickup.address}</p>
            </div>
            <div className="party-box">
              <span className="party-title">Verified Scrap Dealer</span>
              <p className="font-semibold">{pickup.assignedDealerName || "Shree Ganesh Recycling Center"}</p>
              <p className="text-sm text-muted">Scale Cert: DL/W&M/2026/8942</p>
              <p className="text-xs text-emerald flex items-center gap-1">
                <CheckCircle2 size={12} /> Stamped Digital Scale
              </p>
            </div>
          </div>

          <div className="receipt-table-container">
            <table className="receipt-table">
              <thead>
                <tr>
                  <th>Item / Material</th>
                  <th className="text-right">Actual Weight</th>
                  <th className="text-right">Rate / Unit</th>
                  <th className="text-right">Total (₹)</th>
                </tr>
              </thead>
              <tbody>
                {pickup.actualWeighed && pickup.actualWeighed.length > 0 ? (
                  pickup.actualWeighed.map((item, idx) => (
                    <tr key={idx}>
                      <td className="font-medium">{item.name}</td>
                      <td className="text-right font-mono">{item.weight} kg</td>
                      <td className="text-right font-mono">₹{item.rate}</td>
                      <td className="text-right font-mono font-bold">₹{item.total.toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-muted">
                      Estimated items (Pending on-site digital weighing)
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="receipt-total-bar">
            <div className="payment-status">
              <span className="badge badge-green">
                <CheckCircle2 size={14} /> Paid via {pickup.paymentMethod || "Instant Direct UPI"}
              </span>
            </div>
            <div className="total-amount-box">
              <span className="total-label">Net Payout to Seller:</span>
              <span className="total-val">₹{pickup.finalAmount ? pickup.finalAmount.toFixed(2) : pickup.estTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="receipt-footer-security">
            <div className="qr-box">
              <div className="qr-placeholder">
                <QrCode size={48} className="qr-code-icon" />
              </div>
              <div className="qr-text">
                <p className="font-semibold text-xs">Govt Legal Metrology Compliant</p>
                <p className="text-2xs text-muted">Scan to verify electronic scale hash & tamper-proof log</p>
              </div>
            </div>
            <div className="green-pledge">
              <span className="eco-badge">♻️ 100% Traceable Recycling Chain</span>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={handlePrint}>
            <Printer size={16} /> Print Receipt
          </button>
          <button className="btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
