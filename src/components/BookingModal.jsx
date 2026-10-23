import React, { useState } from 'react';
import { X, Check, Upload, Calendar, Clock, MapPin, AlertCircle, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingModal({ categories, onClose, onSubmitBooking, lang }) {
  const [step, setStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState({
    newspaper: 20,
    cardboard: 10
  });
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Rohit Kulkarni',
    phone: '98220 54123',
    address: 'B-604, Rohan Ashima Apartments, Kothrud',
    pincode: '411038',
    date: 'Tomorrow',
    slot: 'Morning (09:00 AM - 12:00 PM)',
    notes: 'Please bring carton bags for loose bottles'
  });

  const toggleItem = (catId, defaultRate) => {
    setSelectedItems(prev => {
      const copy = { ...prev };
      if (copy[catId] !== undefined) {
        delete copy[catId];
      } else {
        copy[catId] = 10; // default 10kg
      }
      return copy;
    });
  };

  const updateWeight = (catId, weight) => {
    setSelectedItems(prev => ({
      ...prev,
      [catId]: Math.max(1, Number(weight) || 0)
    }));
  };

  // Calculate estimated payout
  const totalEstPayout = Object.entries(selectedItems).reduce((sum, [catId, weight]) => {
    const cat = categories.find(c => c.id === catId);
    return sum + (cat ? cat.rate * weight : 0);
  }, 0);

  const totalEstWeight = Object.values(selectedItems).reduce((a, b) => a + b, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(selectedItems).length === 0) {
      alert('Please select at least one scrap category to request pickup.');
      return;
    }

    const newPickup = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      sellerName: formData.name,
      sellerType: "Household",
      phone: `+91 ${formData.phone}`,
      address: formData.address,
      pincode: formData.pincode,
      slot: `${formData.date}, ${formData.slot}`,
      items: Object.entries(selectedItems).map(([catId, weight]) => ({
        categoryId: catId,
        estWeight: weight
      })),
      status: "requested",
      assignedDealerId: null,
      assignedDealerName: null,
      dealerPhone: null,
      estTotal: totalEstPayout,
      actualWeighed: null,
      finalAmount: null,
      paymentMethod: null,
      createdAt: "Just now",
      notes: formData.notes
    };

    onSubmitBooking(newPickup);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // safe fallback
    }

    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card booking-wizard" onClick={(e) => e.stopPropagation()}>
        {/* Wizard Header */}
        <div className="modal-header">
          <div>
            <h3>Schedule Free Doorstep Scrap Pickup</h3>
            <p className="subtext">Step {step} of 3: {step === 1 ? 'Select Scrap' : step === 2 ? 'Date & Address' : 'Review & Confirm'}</p>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Wizard Progress Steps */}
        <div className="wizard-stepper">
          <div className={`step-item ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <span className="step-num">{step > 1 ? <Check size={14} /> : '1'}</span>
            <span className="step-label">Scrap Items</span>
          </div>
          <div className="step-divider" />
          <div className={`step-item ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <span className="step-num">{step > 2 ? <Check size={14} /> : '2'}</span>
            <span className="step-label">Address & Time</span>
          </div>
          <div className="step-divider" />
          <div className={`step-item ${step === 3 ? 'active' : ''}`}>
            <span className="step-num">3</span>
            <span className="step-label">Confirmation</span>
          </div>
        </div>

        {/* STEP 1: Categories & Weights */}
        {step === 1 && (
          <div className="wizard-body">
            <p className="section-instruction">Select the types of scrap you have and estimate weight:</p>
            <div className="scrap-select-grid">
              {categories.map((cat) => {
                const isSelected = selectedItems[cat.id] !== undefined;
                return (
                  <div
                    key={cat.id}
                    className={`scrap-select-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleItem(cat.id, cat.rate)}
                  >
                    <div className="scrap-select-header">
                      <span className="cat-badge" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                        {cat.category}
                      </span>
                      <span className="cat-rate font-bold text-emerald">₹{cat.rate}/{cat.unit}</span>
                    </div>
                    <div className="cat-name">{cat.name}</div>
                    
                    {isSelected && (
                      <div className="weight-adjuster" onClick={(e) => e.stopPropagation()}>
                        <label>Est. {cat.unit}:</label>
                        <input
                          type="number"
                          min="1"
                          max="500"
                          value={selectedItems[cat.id]}
                          onChange={(e) => updateWeight(cat.id, e.target.value)}
                          className="weight-input"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Photo upload preview simulation */}
            <div className="photo-upload-strip">
              <div 
                className={`upload-dropzone ${photoUploaded ? 'uploaded' : ''}`}
                onClick={() => setPhotoUploaded(!photoUploaded)}
              >
                <Upload size={20} className="upload-icon" />
                <div>
                  <p className="font-semibold text-sm">
                    {photoUploaded ? "✓ 1 Photo Attached (scrap_stack.jpg - 1.2 MB)" : "Attach Photo of Scrap Pile (Optional)"}
                  </p>
                  <p className="text-xs text-muted">Helps the dealer bring the right vehicle (Scooter / Tempo / Mini-Truck)</p>
                </div>
              </div>
            </div>

            <div className="estimate-summary-pill">
              <span>Estimated Weight: <strong>{totalEstWeight} kg</strong></span>
              <span>Expected Cash Payout: <strong className="text-emerald">~₹{totalEstPayout.toFixed(0)}</strong></span>
            </div>
          </div>
        )}

        {/* STEP 2: Address & Time Slot */}
        {step === 2 && (
          <div className="wizard-body form-grid">
            <div className="form-group full-width">
              <label>Your Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter full name"
                className="input-box"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number (for OTP & Dealer Call)</label>
              <div className="input-with-prefix">
                <span className="prefix">+91</span>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="10 digit mobile"
                  className="input-box"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Service Pin Code</label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                placeholder="e.g. 411038"
                className="input-box"
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Doorstep Address / Apartment / Landmark</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="House no, Building, Street, Landmark"
                rows="2"
                className="input-box"
                required
              />
            </div>

            <div className="form-group">
              <label>Preferred Day</label>
              <select
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="input-box"
              >
                <option value="Today">Today (Within 2-3 hours)</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="This Weekend (Sunday)">This Weekend (Sunday)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Preferred Time Slot</label>
              <select
                value={formData.slot}
                onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                className="input-box"
              >
                <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                <option value="Afternoon (01:00 PM - 04:00 PM)">Afternoon (01:00 PM - 04:00 PM)</option>
                <option value="Evening (04:00 PM - 07:00 PM)">Evening (04:00 PM - 07:00 PM)</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Special Instructions / Notes</label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="e.g. Lift is working / call before coming"
                className="input-box"
              />
            </div>
          </div>
        )}

        {/* STEP 3: Review & Confirmation */}
        {step === 3 && (
          <div className="wizard-body review-summary">
            <div className="review-highlight-card">
              <div className="flex-between mb-2">
                <span className="text-sm font-semibold text-muted">ESTIMATED EARNINGS</span>
                <span className="badge badge-green">Zero Pickup Charges</span>
              </div>
              <div className="highlight-price text-emerald font-bold font-mono">
                ₹{totalEstPayout.toFixed(0)} <span className="text-sm text-muted">est. cash or UPI</span>
              </div>
              <p className="text-xs text-muted mt-1">
                Final amount is weighed right in front of you on a certified digital scale.
              </p>
            </div>

            <div className="review-grid">
              <div className="review-box">
                <div className="review-box-title">Selected Scrap ({Object.keys(selectedItems).length} types)</div>
                <ul className="review-item-list">
                  {Object.entries(selectedItems).map(([catId, weight]) => {
                    const cat = categories.find(c => c.id === catId);
                    return (
                      <li key={catId}>
                        <span>{cat?.name} (~{weight} kg)</span>
                        <span className="font-mono font-semibold">₹{(cat ? cat.rate * weight : 0).toFixed(0)}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="review-box">
                <div className="review-box-title">Pickup Details</div>
                <div className="text-sm">
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Contact:</strong> +91 {formData.phone}</p>
                  <p><strong>Address:</strong> {formData.address} ({formData.pincode})</p>
                  <p className="text-emerald mt-1"><strong>Slot:</strong> {formData.date}, {formData.slot}</p>
                </div>
              </div>
            </div>

            <div className="kabaadsetu-guarantee-banner">
              <Sparkles size={20} className="text-emerald shrink-0" />
              <div>
                <strong>KabaadSetu Fair-Weight Guarantee</strong>
                <p className="text-xs text-muted">
                  Every dealer carries an electronic digital scale inspected by the Dept. of Legal Metrology. You get an immediate digital receipt before the dealer leaves.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="modal-actions wizard-footer">
          {step > 1 ? (
            <button className="btn-secondary" onClick={() => setStep(step - 1)}>
              <ChevronLeft size={16} /> Back
            </button>
          ) : (
            <button className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
          )}

          {step < 3 ? (
            <button 
              className="btn-primary"
              disabled={Object.keys(selectedItems).length === 0}
              onClick={() => setStep(step + 1)}
            >
              Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button className="btn-primary pulse-glow" onClick={handleSubmit}>
              Confirm Pickup Request 🎉
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
