import { useEffect, useEffectEvent, useState } from "react";

export default function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);

  const setHasMountedEvent = useEffectEvent(() => {
    setHasMounted(true);
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasMountedEvent();
  }, []);

  return hasMounted;
}
