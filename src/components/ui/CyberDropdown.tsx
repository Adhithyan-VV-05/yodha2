import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

export interface CyberDropdownOption<T = string | number> {
  value: T;
  label: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface CyberDropdownProps<T = string | number> {
  options: CyberDropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export function CyberDropdown<T = string | number>({
  options,
  value,
  onChange,
  placeholder = "Select Option",
  className = "",
  triggerClassName = "",
  menuClassName = "",
  icon,
  disabled = false,
}: CyberDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close on outside click or ESC key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full select-none ${className}`}>
      {/* TRIGGER BUTTON */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-[#080b2d]/90 hover:bg-[#0e123d] border ${
          isOpen ? "border-purple-400 ring-2 ring-purple-500/30" : "border-purple-500/40 hover:border-purple-400"
        } rounded-2xl px-4 py-3 text-xs sm:text-sm font-mono font-bold text-white flex items-center justify-between shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${triggerClassName}`}
      >
        <div className="flex items-center gap-2.5 truncate">
          {icon && <span className="text-purple-400 shrink-0">{icon}</span>}
          {selectedOption?.icon && <span className="shrink-0">{selectedOption.icon}</span>}
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        </div>

        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-purple-400 shrink-0" />
        </motion.div>
      </button>

      {/* DROPDOWN MENU POPOVER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute left-0 right-0 top-full z-50 bg-[#080b2a]/95 backdrop-blur-2xl border border-purple-500/50 rounded-2xl p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.8)] max-h-60 overflow-y-auto custom-scrollbar ${menuClassName}`}
          >
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={String(option.value)}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-mono font-semibold flex items-center justify-between transition-all cursor-pointer text-left ${
                    isSelected
                      ? "bg-purple-600/40 text-white border border-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                      : "text-slate-200 hover:bg-purple-950/60 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {option.icon && <span className="shrink-0 text-purple-300">{option.icon}</span>}
                    <span className="truncate">{option.label}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {option.badge && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-500/40">
                        {option.badge}
                      </span>
                    )}
                    {isSelected && <Check className="w-4 h-4 text-purple-400" />}
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CyberDropdown;
