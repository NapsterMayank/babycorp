"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 w-full">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        return (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`w-9 h-9 rounded-full flex items-center justify-center font-poppins font-semibold text-sm transition-all duration-300 ${
                  isCompleted
                    ? "bg-gradient-to-r from-orange to-orange-hover text-white shadow-lg shadow-orange/30"
                    : isActive
                    ? "bg-gradient-to-r from-orange to-orange-hover text-white shadow-lg shadow-orange/30"
                    : "bg-white/10 text-white/40 border border-white/20"
                }`}
              >
                {isCompleted ? <Check size={16} /> : index + 1}
              </motion.div>
              <span
                className={`text-[10px] mt-1 font-poppins whitespace-nowrap ${
                  isActive ? "text-orange font-semibold" : isCompleted ? "text-white/60" : "text-white/30"
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-8 sm:w-16 mx-1 mb-4 transition-all duration-500 ${
                  index < currentStep ? "bg-gradient-to-r from-orange to-orange-hover" : "bg-white/10"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
