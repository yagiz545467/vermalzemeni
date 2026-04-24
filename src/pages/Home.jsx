import React from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import PricingSection from '../components/landing/PricingSection';
import HowItWorks from '../components/landing/HowItWorks';
import Footer from '../components/landing/Footer';

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <HeroSection />
            <PricingSection />
            <HowItWorks />
            <Footer />
        </div>
    );
}