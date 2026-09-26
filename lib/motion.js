export const easeOutExpo = [0.16, 1, 0.3, 1];

export const pageVariants = {
  initial: (direction = 1) => ({
    opacity: 0,
    x: direction > 0 ? 26 : -26,
    scale: 0.995,
  }),
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
  exit: (direction = 1) => ({
    opacity: 0,
    x: direction > 0 ? -16 : 16,
    transition: { duration: 0.22, ease: "easeInOut" },
  }),
};

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: easeOutExpo },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
};

export const cardHover = {
  y: -6,
  transition: { duration: 0.22, ease: easeOutExpo },
};
