import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Check, ChevronRight, Globe, Palette, Box, Zap, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: {
    name: string;
    price: string;
  } | null;
}

export default function OrderModal({ isOpen, onClose, selectedPlan }: OrderModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    instagram: '',
    websiteGoal: '',
    primaryColor: '#ffffff',
    secondaryColor: '#000000',
    features: {
      threeD: false,
      animations: true,
      ecommerce: false,
      seo: true,
    }
  });

  const isCustom = selectedPlan?.name === 'Custom';
  const isProfessional = selectedPlan?.name === 'Professional';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setStep(1);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureToggle = (feature: string) => {
    // Logic for locking features based on plan
    if (feature === 'threeD' && !isCustom) return;
    if (feature === 'ecommerce' && !isCustom && !isProfessional) return;

    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: !prev.features[feature as keyof typeof prev.features]
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('orders')
        .insert([
          {
            plan_name: selectedPlan?.name,
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            instagram: formData.instagram,
            website_goal: formData.websiteGoal,
            primary_color: formData.primaryColor,
            secondary_color: formData.secondaryColor,
            selected_features: formData.features,
          }
        ]);

      if (error) throw error;

      alert('Order Submitted Successfully! Wepnest will contact you soon.');
      onClose();
    } catch (error: any) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again or contact us on Instagram.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-[#0A0A0A] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Sidebar Info */}
            <div className="w-full md:w-1/3 bg-gradient-to-b from-[#111] to-[#050505] p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                    <span className="text-black font-intranet text-xl">W</span>
                  </div>
                  <span className="font-intranet text-xl tracking-tighter">WEPNEST</span>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-ppsemibold mb-2">Selected Plan</p>
                    <h3 className="text-3xl font-intranet text-white uppercase tracking-tighter">{selectedPlan?.name}</h3>
                    <p className="text-xl font-intranet text-white/60 mt-1">${selectedPlan?.price}</p>
                  </div>

                  <div className="space-y-4 pt-8">
                    <div className={`flex items-center gap-3 transition-opacity ${step >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                      <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px]">1</div>
                      <span className="text-xs uppercase tracking-widest font-ppsemibold">Personal Info</span>
                    </div>
                    <div className={`flex items-center gap-3 transition-opacity ${step >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                      <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px]">2</div>
                      <span className="text-xs uppercase tracking-widest font-ppsemibold">Project Details</span>
                    </div>
                    <div className={`flex items-center gap-3 transition-opacity ${step >= 3 ? 'opacity-100' : 'opacity-30'}`}>
                      <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px]">3</div>
                      <span className="text-xs uppercase tracking-widest font-ppsemibold">Customization</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <p className="text-[10px] text-white/20 font-ppsemibold leading-relaxed">
                  English / العربية<br/>
                  SECURE CHECKOUT • 24/7 SUPPORT
                </p>
              </div>
            </div>

            {/* Form Area */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <form onSubmit={handleSubmit} className="space-y-8">
                {step === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <h2 className="text-2xl font-intranet uppercase tracking-tight">Personal Information</h2>
                      <p className="text-sm text-midgray opacity-60 font-ppsemibold">Let's start with who you are.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-ppsemibold">First Name / الاسم الأول</label>
                        <input 
                          required
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          type="text" 
                          placeholder="John"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/30 outline-none transition-all font-ppsemibold"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-ppsemibold">Last Name / اللقب</label>
                        <input 
                          required
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          type="text" 
                          placeholder="Doe"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/30 outline-none transition-all font-ppsemibold"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-ppsemibold">Phone (Optional) / رقم الهاتف</label>
                      <input 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        type="tel" 
                        placeholder="+1 234 567 890"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/30 outline-none transition-all font-ppsemibold"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-ppsemibold">Instagram Handle / حساب انستغرام</label>
                      <input 
                        required
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleInputChange}
                        type="text" 
                        placeholder="@username"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/30 outline-none transition-all font-ppsemibold"
                      />
                    </div>

                    <button 
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full py-4 bg-white text-black rounded-xl font-ppsemibold uppercase tracking-widest text-xs hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                    >
                      Next Step <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <h2 className="text-2xl font-intranet uppercase tracking-tight">Project Details</h2>
                      <p className="text-sm text-midgray opacity-60 font-ppsemibold">Tell us about your vision.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-ppsemibold">Website Goal / هدف الموقع</label>
                      <textarea 
                        required
                        name="websiteGoal"
                        value={formData.websiteGoal}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Describe what you want to achieve..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/30 outline-none transition-all font-ppsemibold resize-none"
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-ppsemibold">Upload Assets / ارفاق ملفات (Logo, Brand Guide)</label>
                      <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:border-white/20 transition-all cursor-pointer bg-white/[0.02]">
                        <Upload className="w-8 h-8 text-white/20" />
                        <p className="text-xs text-midgray font-ppsemibold">Drag and drop or click to upload</p>
                        <input type="file" className="hidden" multiple />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 py-4 border border-white/10 rounded-xl font-ppsemibold uppercase tracking-widest text-xs hover:bg-white/5 transition-all"
                      >
                        Back
                      </button>
                      <button 
                        type="button"
                        onClick={() => setStep(3)}
                        className="flex-[2] py-4 bg-white text-black rounded-xl font-ppsemibold uppercase tracking-widest text-xs hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                      >
                        Next Step <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                      <h2 className="text-2xl font-intranet uppercase tracking-tight">Customization</h2>
                      <p className="text-sm text-midgray opacity-60 font-ppsemibold">Fine-tune your digital experience.</p>
                    </div>

                    {/* Color Selection */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-ppsemibold flex items-center gap-2">
                          <Palette className="w-3 h-3" /> Primary Color
                        </label>
                        <div className="flex items-center gap-3">
                          <input 
                            type="color" 
                            name="primaryColor"
                            value={formData.primaryColor}
                            onChange={handleInputChange}
                            className="w-12 h-12 rounded-lg bg-transparent border-none cursor-pointer"
                          />
                          <span className="text-xs font-mono opacity-40">{formData.primaryColor}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-ppsemibold flex items-center gap-2">
                          <Palette className="w-3 h-3" /> Secondary Color
                        </label>
                        <div className="flex items-center gap-3">
                          <input 
                            type="color" 
                            name="secondaryColor"
                            value={formData.secondaryColor}
                            onChange={handleInputChange}
                            className="w-12 h-12 rounded-lg bg-transparent border-none cursor-pointer"
                          />
                          <span className="text-xs font-mono opacity-40">{formData.secondaryColor}</span>
                        </div>
                      </div>
                    </div>

                    {/* Features Grid */}
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-ppsemibold">Features & Add-ons / الميزات</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <FeatureToggle 
                          icon={<Box className="w-4 h-4" />}
                          title="3D Design / تصاميم ثلاثية أبعاد"
                          active={formData.features.threeD}
                          locked={!isCustom}
                          onClick={() => handleFeatureToggle('threeD')}
                        />
                        <FeatureToggle 
                          icon={<Zap className="w-4 h-4" />}
                          title="Advanced Animations / تحريك متطور"
                          active={formData.features.animations}
                          onClick={() => handleFeatureToggle('animations')}
                        />
                        <FeatureToggle 
                          icon={<Globe className="w-4 h-4" />}
                          title="E-Commerce / متجر إلكتروني"
                          active={formData.features.ecommerce}
                          locked={!isCustom && !isProfessional}
                          onClick={() => handleFeatureToggle('ecommerce')}
                        />
                        <FeatureToggle 
                          icon={<Check className="w-4 h-4" />}
                          title="SEO Optimization / تهيئة محركات البحث"
                          active={formData.features.seo}
                          onClick={() => handleFeatureToggle('seo')}
                        />
                      </div>
                      {!isCustom && (
                        <p className="text-[10px] text-white/20 font-ppsemibold italic">
                          * Some features are locked for your current plan. Upgrade to 'Custom' for full access.
                        </p>
                      )}
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button 
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex-1 py-4 border border-white/10 rounded-xl font-ppsemibold uppercase tracking-widest text-xs hover:bg-white/5 transition-all"
                      >
                        Back
                      </button>
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-[2] py-4 bg-white text-black rounded-xl font-ppsemibold uppercase tracking-widest text-xs hover:bg-white/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          'Confirm Order / تأكيد الطلب'
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function FeatureToggle({ icon, title, active, locked, onClick }: { 
  icon: React.ReactNode, 
  title: string, 
  active: boolean, 
  locked?: boolean,
  onClick: () => void 
}) {
  return (
    <div 
      onClick={onClick}
      className={`
        flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer
        ${active ? 'bg-white/10 border-white/20' : 'bg-white/[0.02] border-white/5'}
        ${locked ? 'opacity-30 grayscale cursor-not-allowed' : 'hover:border-white/20'}
      `}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${active ? 'bg-white text-black' : 'bg-white/5 text-white/40'}`}>
          {icon}
        </div>
        <span className="text-xs font-ppsemibold tracking-tight">{title}</span>
      </div>
      {active && <Check className="w-4 h-4 text-white" />}
    </div>
  );
}
