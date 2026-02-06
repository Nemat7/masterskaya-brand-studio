import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";

interface FormData {
  service: string;
  budget: string;
  name: string;
  email: string;
  phone: string;
  description: string;
}

const services = [
  { id: "marketing", labelKey: "form.service.marketing" },
  { id: "branding", labelKey: "form.service.branding" },
  { id: "smm", labelKey: "form.service.smm" },
  { id: "events", labelKey: "form.service.events" },
  { id: "digital", labelKey: "form.service.digital" },
];

const budgets = [
  { id: "small", labelKey: "form.budget.small" },
  { id: "medium", labelKey: "form.budget.medium" },
  { id: "large", labelKey: "form.budget.large" },
  { id: "enterprise", labelKey: "form.budget.enterprise" },
];

export function ProjectForm() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    service: "",
    budget: "",
    name: "",
    email: "",
    phone: "",
    description: "",
  });

  const totalSteps = 4;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.service !== "";
      case 2:
        return formData.budget !== "";
      case 3:
        return formData.name !== "" && formData.email !== "";
      case 4:
        return true;
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-6"
        >
          <Check className="w-10 h-10 text-primary-foreground" />
        </motion.div>
        <h3 className="text-2xl font-semibold mb-2">{t("form.success.title")}</h3>
        <p className="text-muted-foreground">{t("form.success.text")}</p>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map((s) => (
            <motion.div
              key={s}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                s <= step
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
              animate={{ scale: s === step ? 1.1 : 1 }}
            >
              {s < step ? <Check className="w-4 h-4" /> : s}
            </motion.div>
          ))}
        </div>
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Form steps */}
      <div className="min-h-[300px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-6">{t("form.step1.title")}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((service) => (
                  <motion.button
                    key={service.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData({ ...formData, service: service.id })}
                    className={`p-4 rounded-xl text-left transition-all ${
                      formData.service === service.id
                        ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    <span className="font-medium">{t(service.labelKey)}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-6">{t("form.step2.title")}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {budgets.map((budget) => (
                  <motion.button
                    key={budget.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData({ ...formData, budget: budget.id })}
                    className={`p-4 rounded-xl text-left transition-all ${
                      formData.budget === budget.id
                        ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    <span className="font-medium">{t(budget.labelKey)}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-6">{t("form.step3.title")}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t("form.name")}</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t("form.name.placeholder")}
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t("form.email")}</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t("form.email.placeholder")}
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t("form.phone")}</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t("form.phone.placeholder")}
                    className="h-12"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-6">{t("form.step4.title")}</h3>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={t("form.description.placeholder")}
                className="w-full h-40 p-4 rounded-xl border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={step === 1}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("form.back")}
        </Button>

        {step < totalSteps ? (
          <Button onClick={nextStep} disabled={!canProceed()} className="gap-2">
            {t("form.next")}
            <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="gap-2">
            <Sparkles className="w-4 h-4" />
            {t("form.submit")}
          </Button>
        )}
      </div>
    </div>
  );
}
