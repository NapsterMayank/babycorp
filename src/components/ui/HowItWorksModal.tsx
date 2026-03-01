"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import {
  X,
  ChevronRight,
  ChevronLeft,
  Shield,
  BarChart3,
  Baby,
  GraduationCap,
  Heart,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    id: 1,
    tag: "Step 1",
    title: "Assess Your Champion",
    description:
      "We start with a gentle, fun-first assessment. Our certified coaches observe your child's natural movements, reflexes, comfort with water, and cognitive responses — all through play. No pressure. No tests. Just joy.",
    image: "/images/baby-swimming.png",
    items: [
      "Age-appropriate movement screening",
      "Interest & comfort evaluation",
      "Personalized sport recommendation",
    ],
    color: "from-aqua to-aqua/70",
    icon: Baby,
  },
  {
    id: 2,
    tag: "Step 2",
    title: "Build a Custom Path",
    description:
      "Based on the assessment, we create a structured development plan — choosing from Swimming, Gymnastics, Chess, Badminton, and Table Tennis. Each plan is age-specific, with clear milestones and weekly sessions.",
    image: "/images/baby-gymnastics.png",
    items: [
      "Multi-sport or focused training",
      "Weekly session schedule",
      "Monthly milestone goals",
    ],
    color: "from-purple-500 to-purple-400",
    icon: GraduationCap,
  },
  {
    id: 3,
    tag: "Step 3",
    title: "Train in World-Class Facilities",
    description:
      "Your child trains in premium, child-safe facilities with internationally certified coaches. UV-treated pools, padded gymnastics floors, child-sized equipment — everything built for tiny champions.",
    image: "/images/safe-training.png",
    items: [
      "Certified coaches (STA, FIG, FIDE)",
      "3:1 child-to-coach ratio (infants)",
      "Hospital-grade hygiene standards",
    ],
    color: "from-green-500 to-green-400",
    icon: Shield,
  },
  {
    id: 4,
    tag: "Step 4",
    title: "Track Real Progress",
    description:
      "No guesswork. Our parent dashboard gives you monthly progress reports, session recordings, nutritionist notes, and developmental milestones. You'll see your child growing stronger every week.",
    image: "/images/parent-dashboard.png",
    items: [
      "Real-time progress dashboard",
      "Monthly video reports",
      "Nutritionist & pediatrician support",
    ],
    color: "from-orange to-gold",
    icon: BarChart3,
  },
  {
    id: 5,
    tag: "Your Child is Safe",
    title: "Safety is Our First Championship",
    description:
      "We know handing your child to anyone is the biggest decision you'll make. That's why every coach is background-verified, every facility is CCTV-monitored, and medical staff is on-site at every session. Parents can observe all sessions.",
    image: "/images/safe-training.png",
    items: [
      "Police-verified staff & coaches",
      "CCTV monitoring in all areas",
      "Medical staff on-site at every session",
      "Parent observation area always open",
      "Comprehensive insurance coverage",
    ],
    color: "from-green-600 to-emerald-500",
    icon: Heart,
  },
];

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HowItWorksModal({
  isOpen,
  onClose,
}: HowItWorksModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const step = steps[currentStep];
  const Icon = step.icon;
  const isLast = currentStep === steps.length - 1;
  const isFirst = currentStep === 0;

  const handleNext = () => {
    if (!isLast) setCurrentStep((s) => s + 1);
  };
  const handlePrev = () => {
    if (!isFirst) setCurrentStep((s) => s - 1);
  };
  const handleClose = () => {
    setCurrentStep(0);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-navy/80 backdrop-blur-md" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-navy/5 hover:bg-navy/10 flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-navy/60" />
            </button>

            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-navy/5 z-20">
              <motion.div
                className="h-full bg-gradient-to-r from-orange to-gold"
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
              {/* Left — Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`relative bg-gradient-to-br ${step.color} p-8 flex items-center justify-center min-h-[280px] md:min-h-full`}
                >
                  {/* Glow */}
                  <div className="absolute inset-0 bg-black/10" />

                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.5, type: "spring" }}
                    className="relative z-10"
                  >
                    <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 224px, 288px"
                      />
                    </div>
                  </motion.div>

                  {/* Step indicator floating on image */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/20 backdrop-blur-sm text-white font-poppins font-bold text-xs px-3 py-1.5 rounded-full">
                      {step.tag}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Right — Content */}
              <div className="p-8 md:p-10 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${step.color} bg-clip-text mb-4`}>
                      <Icon size={22} className="text-orange" />
                    </div>

                    <h3 className="font-nunito font-black text-2xl md:text-3xl text-navy mb-4 leading-tight">
                      {step.title}
                    </h3>

                    <p className="text-navy/60 font-lato text-sm md:text-base leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Checklist */}
                    <ul className="space-y-3">
                      {step.items.map((item, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + j * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2
                            size={18}
                            className="text-green-500 flex-shrink-0 mt-0.5"
                          />
                          <span className="text-navy/70 font-lato text-sm">
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-navy/5">
                  {/* Step dots */}
                  <div className="flex gap-2">
                    {steps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentStep(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === currentStep
                            ? "w-8 bg-gradient-to-r from-orange to-gold"
                            : i < currentStep
                            ? "w-2 bg-orange/40"
                            : "w-2 bg-navy/10"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Nav buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handlePrev}
                      disabled={isFirst}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isFirst
                          ? "bg-navy/5 text-navy/20 cursor-not-allowed"
                          : "bg-navy/5 text-navy hover:bg-navy/10"
                      }`}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    {isLast ? (
                      <a
                        href="#contact"
                        onClick={handleClose}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-bold text-sm px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-orange/30 transition-all duration-300"
                      >
                        Enroll Now
                        <ChevronRight size={16} />
                      </a>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-bold text-sm px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-orange/30 transition-all duration-300"
                      >
                        Next
                        <ChevronRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
