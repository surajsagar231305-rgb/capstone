import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SellerView from './components/SellerView';
import DealerPortal from './components/DealerPortal';
import AdminDashboard from './components/AdminDashboard';
import BookingModal from './components/BookingModal';
import ReceiptModal from './components/ReceiptModal';
import { 
  INITIAL_CATEGORIES, 
  INITIAL_DEALERS, 
  INITIAL_PICKUPS, 
  TRANSLATIONS 
} from './data/mockData';
import './App.css';

function App() {
  const [role, setRole] = useState('seller'); // 'seller' | 'dealer' | 'admin'
  const [lang, setLang] = useState('en'); // 'en' | 'hi' | 'mr'
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [dealers, setDealers] = useState(INITIAL_DEALERS);
  const [pickups, setPickups] = useState(INITIAL_PICKUPS);
  
  // Modals
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // Active user / dealer context
  const activeDealer = dealers[0]; // Shree Ganesh Recycling Center

  // Handler: Seller submits a new pickup request
  const handleCreateBooking = (newPickup) => {
    setPickups([newPickup, ...pickups]);
  };

  // Handler: Dealer accepts a pending request from marketplace feed
  const handleAcceptPickup = (pickupId, dealerId, dealerName) => {
    setPickups(prev => prev.map(p => {
      if (p.id === pickupId) {
        return {
          ...p,
          status: 'out_for_pickup',
          assignedDealerId: dealerId,
          assignedDealerName: dealerName,
          dealerPhone: activeDealer.phone
        };
      }
      return p;
    }));
  };

  // Handler: Dealer finishes digital weighing and settles payment
  const handleCompleteWeighing = (pickupId, actualWeighed, finalAmount, paymentMethod) => {
    setPickups(prev => prev.map(p => {
      if (p.id === pickupId) {
        return {
          ...p,
          status: 'completed',
          actualWeighed,
          finalAmount,
          paymentMethod,
          completedAt: 'Today, Just now',
          receiptNo: `KS-INV-2026-${pickupId.replace('REQ-', '')}`,
          ratingGiven: 5.0,
          feedback: 'Accurate digital weight recorded. Direct doorstep payment received.'
        };
      }
      return p;
    }));

    // Auto-open digital receipt modal for immediate verification
    const targetPickup = pickups.find(p => p.id === pickupId);
    if (targetPickup) {
      setSelectedReceipt({
        ...targetPickup,
        actualWeighed,
        finalAmount,
        paymentMethod,
        completedAt: 'Today, Just now',
        receiptNo: `KS-INV-2026-${pickupId.replace('REQ-', '')}`
      });
    }
  };

  // Handler: Update scrap category rate per kg
  const handleUpdateCategoryRate = (categoryId, newRate) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, rate: newRate };
      }
      return cat;
    }));
  };

  const sellerPickups = pickups.filter(p => p.sellerType === 'Household' || p.id === 'REQ-1082');

  return (
    <div className="app-wrapper">
      {/* Top Header & Role Switcher */}
      <Navbar
        currentRole={role}
        setRole={setRole}
        lang={lang}
        setLang={setLang}
        onOpenBooking={() => setIsBookingOpen(true)}
        activePickupsCount={pickups.filter(p => p.status !== 'completed').length}
      />

      {/* Main View Area based on Role */}
      <main className="main-content">
        {role === 'seller' && (
          <SellerView
            categories={categories}
            pickups={pickups}
            onOpenBooking={() => setIsBookingOpen(true)}
            onViewReceipt={(pickup) => setSelectedReceipt(pickup)}
            lang={lang}
          />
        )}

        {role === 'dealer' && (
          <DealerPortal
            dealer={activeDealer}
            pickups={pickups}
            onAcceptPickup={handleAcceptPickup}
            onCompleteWeighing={handleCompleteWeighing}
            categories={categories}
            onUpdateCategoryRate={handleUpdateCategoryRate}
            onViewReceipt={(pickup) => setSelectedReceipt(pickup)}
          />
        )}

        {role === 'admin' && (
          <AdminDashboard
            categories={categories}
            onUpdateCategoryRate={handleUpdateCategoryRate}
            dealers={dealers}
            pickups={pickups}
          />
        )}
      </main>

      {/* Booking Modal */}
      {isBookingOpen && (
        <BookingModal
          categories={categories}
          onClose={() => setIsBookingOpen(false)}
          onSubmitBooking={handleCreateBooking}
          lang={lang}
        />
      )}

      {/* Digital Weighing Receipt Modal */}
      {selectedReceipt && (
        <ReceiptModal
          pickup={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
        />
      )}
    </div>
  );
}

export default App;
