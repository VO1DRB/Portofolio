// app/utils/smoothScroll.ts
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export const smoothScrollTo = (targetId: string) => {
  gsap.to(window, {
    duration: 1.2,
    scrollTo: {
      y: `#${targetId}`,
      offsetY: 50,
    },
    ease: "power2.out",
  });
};
