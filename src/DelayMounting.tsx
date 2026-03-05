import { useEffect, useState } from "react";
import { useOutlet } from "react-router-dom";
import { useTransitioning } from "@/context/TransitionContext";

export default function DelayMounting() {
  const newOutlet = useOutlet();
  const { transitioning } = useTransitioning();

  const [displayed, setDisplayed] = useState(newOutlet);

  useEffect(() => {
    if (!transitioning) setDisplayed(newOutlet);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transitioning]);

  return displayed;
}
