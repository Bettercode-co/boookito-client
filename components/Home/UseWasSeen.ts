import React from "react";

function useWasSeen() {
    // to prevents runtime crash in IE, let's mark it true right away
    const [wasSeen, setWasSeen] = React.useState(
      typeof IntersectionObserver !== "function"
    );
  
    const ref = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      if (ref.current && !wasSeen) {
        const observer = new IntersectionObserver(
          ([entry]) => entry.isIntersecting && setWasSeen(true)
        );
        observer.observe(ref.current);
        return () => {
          observer.disconnect();
        };
      }
    }, [wasSeen]);
    return [wasSeen, ref] as const;
  }

export default useWasSeen;