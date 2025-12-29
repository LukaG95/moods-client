import { useEffect, useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { useAnimate } from "@/context/TransitionContext";

const TRANSITION_MS = 200;

export default function DelayMounting() {
  const location = useLocation();
  const newOutlet = useOutlet();
  const { setTransitioning } = useAnimate();

  const [displayed, setDisplayed] = useState(newOutlet);

  useEffect(() => {
    const t = setTimeout(() => {
      setDisplayed(newOutlet);
      setTransitioning(false);
    }, TRANSITION_MS);

    return () => clearTimeout(t);
  }, [location.key]); // KEY, not pathname

  return <>{displayed}</>;
}
