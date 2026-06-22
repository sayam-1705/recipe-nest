"use client";

import { PenTool, FlaskConical, Share2 } from "lucide-react";

export default function WorkflowSection() {
  const steps = [
    {
      id: 1,
      title: "Design",
      description: "Conceptualize your dish with our AI plating assistant. Mock up textures and colors before you even touch a pan.",
      icon: PenTool,
      isPrimary: false
    },
    {
      id: 2,
      title: "Innovate",
      description: "Refine flavor pairings using our proprietary ingredient synergy engine. Discover unexpected chemical matches.",
      icon: FlaskConical,
      isPrimary: true
    },
    {
      id: 3,
      title: "Showcase",
      description: "Share your creation with a worldwide network of chefs. Get peer-reviewed feedback and earn innovation badges.",
      icon: Share2,
      isPrimary: false
    }
  ];

  return (
    <section id="workflow" className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16 md:mb-24">
          <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] md:text-sm block mb-4">THE WORKFLOW</span>
          <h2 className="font-display font-bold text-3xl xs:text-4xl sm:text-5xl md:text-7xl text-slate-900 dark:text-white mb-4 sm:mb-6 md:mb-8">CRAFTING EXCELLENCE</h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-12">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`glass-panel p-5 sm:p-7 md:p-10 lg:p-12 rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] lg:rounded-[3.5rem] group hover:-translate-y-4 transition-all duration-500 flex flex-col items-center md:items-start text-center md:text-left ${
                step.isPrimary ? "border-primary/30 ring-2 ring-primary/10 shadow-glow" : "border-white/40 dark:border-white/10"
              }`}
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-5 sm:mb-7 md:mb-10 lg:mb-12 shadow-xl shrink-0 transition-colors duration-500 ${
                step.isPrimary ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 group-hover:bg-primary group-hover:text-white"
              }`}>
                <step.icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-slate-900 dark:text-white mb-3 sm:mb-4 md:mb-6">
                {step.id}. {step.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px]"></div>
      </div>
    </section>
  );
}
