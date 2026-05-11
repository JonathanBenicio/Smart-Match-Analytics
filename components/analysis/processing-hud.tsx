'use client';

import { motion } from 'motion/react';
import { Cpu, Activity, Database, Zap, Shield, Target, Crosshair } from 'lucide-react';

export function ProcessingHud({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-4xl glass-panel p-8 rounded-3xl border border-primary/20 relative overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/40">
               <Cpu className="w-6 h-6 text-primary animate-pulse" />
             </div>
             <div>
               <h2 className="font-display text-xl font-bold text-primary tracking-tighter uppercase">Neural Engine V2.0</h2>
               <p className="text-[10px] text-on-surface-variant font-bold tracking-widest uppercase">Deep Tactical Extraction Active</p>
             </div>
           </div>
           <div className="text-right">
             <div className="text-4xl font-display font-extrabold text-on-surface">{progress}%</div>
             <div className="text-[10px] text-primary font-bold tracking-widest uppercase">Syncing Clusters</div>
           </div>
        </div>

        {/* Main Loading Bar */}
        <div className="relative h-4 bg-surface-container rounded-full overflow-hidden mb-12 shadow-inner border border-white/5 p-0.5">
           <motion.div 
             className="h-full bg-gradient-to-r from-primary via-primary-container to-secondary rounded-full relative"
             initial={{ width: 0 }}
             animate={{ width: `${progress}%` }}
             transition={{ duration: 0.5, ease: "easeOut" }}
           >
             <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[progress-stripe_1s_linear_infinite]"></div>
           </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <HudStep icon={<Activity />} title="Movement Vectors" active={progress > 20} status={progress > 40 ? 'COMPLETE' : progress > 20 ? 'ACTIVE' : 'WAITING'} />
           <HudStep icon={<Database />} title="Entity Database" active={progress > 40} status={progress > 60 ? 'COMPLETE' : progress > 40 ? 'ACTIVE' : 'WAITING'} />
           <HudStep icon={<Crosshair />} title="Positional Mesh" active={progress > 60} status={progress > 80 ? 'COMPLETE' : progress > 60 ? 'ACTIVE' : 'WAITING'} />
           <HudStep icon={<Target />} title="XG Calibration" active={progress > 80} status={progress > 95 ? 'COMPLETE' : progress > 80 ? 'ACTIVE' : 'WAITING'} />
           <HudStep icon={<Shield />} title="Defensive Shadows" active={progress > 30} status={progress > 55 ? 'COMPLETE' : progress > 30 ? 'ACTIVE' : 'WAITING'} />
           <HudStep icon={<Zap />} title="Final Render" active={progress > 90} status={progress === 100 ? 'COMPLETE' : progress > 90 ? 'ACTIVE' : 'WAITING'} />
        </div>

        {/* Animated Terminal / Logs */}
        <div className="mt-12 bg-black/40 rounded-xl p-4 font-mono text-[10px] text-primary/70 h-32 overflow-hidden relative border border-white/5">
           <div className="space-y-1 animate-scroll-up">
              <div>[SYSTEM] Initializing Frame buffer...</div>
              <div>[NEURAL] Mapping 22 entities in coordinate space...</div>
              <div>[DATA] Extraction probability: 99.82%</div>
              <div>[SYNC] Cluster node 7c-42 active...</div>
              <div>[INFO] Resolution detected: 1080p (60fps)</div>
              <div>[SYSTEM] Invariant check pass...</div>
              <div>[NEURAL] Ball tracking locked...</div>
              <div>[DATA] Tactical symmetry detected: 4-3-3 vs 4-2-3-1</div>
              <div>[SYSTEM] Generating heatmaps...</div>
              <div>[INFO] AI confidence: HIGH</div>
           </div>
           <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes progress-stripe {
          from { background-position: 0 0; }
          to { background-position: 20px 0; }
        }
        @keyframes scroll-up {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        .animate-scroll-up {
          animation: scroll-up 10s linear infinite;
        }
      `}</style>
    </div>
  );
}

function HudStep({ icon, title, active, status }: { icon: React.ReactNode; title: string, active?: boolean, status: string }) {
  return (
    <div className={`p-4 rounded-xl border transition-all duration-500 ${active ? 'bg-primary/5 border-primary/20' : 'bg-surface-container/50 border-white/5'}`}>
       <div className="flex justify-between items-start mb-3">
          <div className={`${active ? 'text-primary' : 'text-on-surface-variant'} [&>svg]:w-5 [&>svg]:h-5`}>{icon}</div>
          <div className={`text-[8px] font-bold px-1.5 py-0.5 rounded border transition-colors ${status === 'COMPLETE' ? 'bg-primary text-on-primary border-primary' : status === 'ACTIVE' ? 'bg-primary/20 text-primary border-primary animate-pulse' : 'bg-white/5 text-on-surface-variant border-white/10'}`}>
            {status}
          </div>
       </div>
       <div className={`text-[10px] font-bold uppercase tracking-widest ${active ? 'text-on-surface' : 'text-on-surface-variant'}`}>{title}</div>
    </div>
  );
}
