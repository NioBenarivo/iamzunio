import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function LoadMore({ className, inViewProps, fetchMore }) {
  const [ref, inView] = useInView({
    threshold: 1,
    triggerOnce: true,
    ...inViewProps
  });

  useEffect(() => {
    if (inView) {
      // controls.start("visible");
      console.log("INVIEW")
      fetchMore();
    }
  }, [inView]);

  // const normalVariant = {
  //   hidden: {
  //     opacity: 0,
  //   },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.2,
  //     }
  //   }
  // }

  return (
    <div ref={ref} className={className} />
  );
}
