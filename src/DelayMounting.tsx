import { Outlet, useLocation } from "react-router-dom";
import { useTransitioning } from "@/context/TransitionContext";
import { useEffect, useState } from "react";

export default function DelayMounting() {
  const location = useLocation();
  const { transitioning } = useTransitioning();

  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (!transitioning) {
      setDisplayLocation(location);
    }
  }, [transitioning, location]);

  return <Outlet key={displayLocation.key} />;
}
