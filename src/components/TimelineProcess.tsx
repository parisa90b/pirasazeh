import React from 'react';
import { 
  GitCommit, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import { PROCESS_STEPS } from '../siteConfig';

export const TimelineProcess: React.FC = () => {
  return (
    <section id="process" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-bold text-blue-900 shadow-xs">
            <GitCommit className="w-3.5 h-3.5 text-blue-700" />
            <span>فرآیند مهندسی، استاندارد و شفاف</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            مراحل ۴ گانه طراحی، ساخت کارخانه‌ای و نصب سوله
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            از ثبت ابعاد زمین و مدلسازی سه‌بعدی تا تست‌های جوشکاری NDT و تحویل کلید در محل پروژه در سراسر ایران
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step) => (
            <div 
              key={step.stepNumber}
              className="bg-slate-50 rounded-3xl border border-slate-200 p-6 text-right space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative group hover:border-blue-400"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 mb-4">
                  <span className="w-9 h-9 rounded-2xl bg-blue-700 text-white font-black text-sm flex items-center justify-center font-mono shadow-xs">
                    {step.stepNumber}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-800 bg-blue-100/70 px-2.5 py-1 rounded-full">
                    <Clock className="w-3 h-3 text-blue-700" />
                    <span>{step.duration}</span>
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 mb-2 leading-snug group-hover:text-blue-700 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-slate-200/80 text-[11px] text-slate-700">
                {step.details.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
