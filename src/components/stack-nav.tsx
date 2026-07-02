import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Home, User, Settings, Mail, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StackNavItem {
  id: number;
  label: string;
  icon: React.ReactNode;
}

const ITEMS: StackNavItem[] = [
  { id: 1, label: "Home", icon: <Home size={20} /> },
  { id: 2, label: "About", icon: <User size={20} /> },
  { id: 3, label: "Settings", icon: <Settings size={20} /> },
  { id: 4, label: "Contact", icon: <Mail size={20} /> },
];

export function StackNav({
  items = ITEMS,
  className,
}: {
  items?: StackNavItem[];
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);

  const buttonSize = 56;
  const itemSize = 48;

  const containerVariants = {
    hidden: {
      backgroundColor: "rgba(255, 255, 255, 0)",
      backdropFilter: "blur(0px)",
      border: "1px solid rgba(255, 255, 255, 0)",
      transition: {
        duration: 0.3,
        delay: 0,
      },
    },
    visible: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: {
        duration: 0.4,
        delay: 0.4, // Wait for items to appear
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    }),
    exit: (i: number) => ({
      opacity: 0,
      x: 30,
      scale: 0.8,
      transition: {
        delay: (items.length - 1 - i) * 0.1,
        duration: 0.2,
      },
    }),
  };

  return (
    <div
      className={cn(
        "fixed bottom-8 right-8 z-50 flex flex-row-reverse items-center gap-4",
        className
      )}
    >
      {/* Toggle Button */}
      <motion.button
        className="relative z-10 flex items-center justify-center rounded-full bg-white text-black shadow-lg hover:bg-neutral-200 transition-colors"
        style={{ width: buttonSize, height: buttonSize }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </motion.button>

      {/* Stack Items Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex flex-row-reverse items-center gap-3 rounded-full px-3 py-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {items.map((item, i) => {
              const isActive = activeId === item.id;
              return (
                <motion.button
                  key={item.id}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => setActiveId(item.id)}
                  className={cn(
                    "flex items-center justify-center rounded-full transition-colors",
                    "hover:bg-white/20 hover:text-white",
                    isActive
                      ? "bg-white text-black"
                      : "bg-black/60 text-white border border-white/10"
                  )}
                  style={{ width: itemSize, height: itemSize }}
                  title={item.label}
                >
                  {item.icon}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
