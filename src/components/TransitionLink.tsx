import { Link, type LinkProps } from "react-router-dom";
import { useTransitioning } from "@/context/TransitionContext";

type Props = LinkProps & {
  transition?: boolean;
};

export default function TransitionLink({ onClick, ...props }: Props) {
  const { setTransitioning } = useTransitioning();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    setTransitioning(true);

    onClick?.(e); // preserve user's onClick if provided
  }

  return <Link {...props} onClick={handleClick} />;
}
