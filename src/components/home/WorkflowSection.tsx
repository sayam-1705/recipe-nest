"use client";

export default function WorkflowSection() {
  const steps = [
    {
      id: 1,
      title: "Design",
      description: "Conceptualize your dish with our AI plating assistant. Mock up textures and colors before you even touch a pan.",
      icon: "draw",
      isPrimary: false
    },
    {
      id: 2,
      title: "Innovate",
      description: "Refine flavor pairings using our proprietary ingredient synergy engine. Discover unexpected chemical matches.",
      icon: "biotech",
      isPrimary: true
    },
    {
      id: 3,
      title: "Showcase",
      description: "Share your creation with a worldwide network of chefs. Get peer-reviewed feedback and earn innovation badges.",
      icon: "share",
      isPrimary: false
    }
  ];

  return (
    <section id="workflow" className="py-24 md:py-32 px-6 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 md:mb-24">
          <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] md:text-sm block mb-4">THE WORKFLOW</span>
          <h2 className="font-display font-bold text-5xl md:text-7xl text-slate-900 dark:text-white mb-8">CRAFTING EXCELLENCE</h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`glass-panel p-10 md:p-12 rounded-[3rem] md:rounded-[3.5rem] group hover:-translate-y-4 transition-all duration-500 flex flex-col items-center md:items-start text-center md:text-left ${
                step.isPrimary ? "border-primary/30 ring-2 ring-primary/10 shadow-glow" : "border-white/40 dark:border-white/10"
              }`}
            >
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center mb-10 md:mb-12 shadow-xl shrink-0 transition-colors duration-500 ${
                step.isPrimary ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 group-hover:bg-primary group-hover:text-white"
              }`}>
                <span className="material-symbols-outlined text-4xl md:text-5xl">{step.icon}</span>
              </div>
              <h3 className="font-display font-bold text-3xl md:text-4xl text-slate-900 dark:text-white mb-6">
                {step.id}. {step.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl leading-relaxed">
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
