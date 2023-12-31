import {
  CSSProperties,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./index.scss";

type Position =
  | "bottom"
  | "top"
  | "bottomLeft"
  | "bottomRight"
  | "topLeft"
  | "topRight";

function positionIsTop(position: Position): boolean {
  if (position === "top" || position === "topLeft" || position === "topRight") {
    return true;
  } else {
    return false;
  }
}

interface PositionValues {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

interface IDropdown {
  trigger: ReactNode;
  content: ReactNode;
  gap?: number;
  position?: Position;
}

export default function Dropdown({
  trigger,
  content,
  gap,
  position = "bottomLeft",
}: IDropdown) {
  const [showContent, setShowContent] = useState<boolean>(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMouseOut = () => {
    setShowContent(false);
  };

  const [triggerRect, setTriggerRect] = useState<DOMRect>();
  const [contentRect, setContentRect] = useState<DOMRect>();

  const positionMap: Record<Position, PositionValues> = {
    bottomLeft: { top: (triggerRect?.height || 0) + (gap || 0), left: 0 },
    bottom: {
      top: (triggerRect?.height || 0) + (gap || 0),
      left: 0 - ((contentRect?.width || 0) - (triggerRect?.width || 0)) / 2,
    },
    top: {
      bottom: (gap || 0) + (triggerRect?.height || 0),
      left: 0 - ((contentRect?.width || 0) - (triggerRect?.width || 0)) / 2,
    },
    topLeft: {
      bottom: (gap || 0) + (triggerRect?.height || 0),
      left: 0,
    },
    topRight: {
      bottom: (gap || 0) + (triggerRect?.height || 0),
      right: 0,
    },
    bottomRight: {
      top: (triggerRect?.height || 0) + (gap || 0),
      right: 0,
    },
  };

  useLayoutEffect(() => {
    if (triggerRef.current) {
      setTriggerRect(triggerRef.current?.getBoundingClientRect());
    }
    if (contentRef.current) {
      setContentRect(contentRef.current?.getBoundingClientRect());
    }
  }, [showContent]);

  return (
    <div
      className={`relative`}
      onMouseLeave={handleMouseOut}
      style={
        {
          "--gap": `${gap}px`,
        } as CSSProperties
      }
    >
      <div
        ref={triggerRef}
        onMouseEnter={() => setShowContent(true)}
        className={`trigger inline relative ${showContent && "show-content"} ${
          positionIsTop(position) ? "top" : "bottom"
        }`}
      >
        {trigger}
        <AnimatePresence>
          {showContent && (
            <motion.div
              ref={contentRef}
              className={`absolute rounded-md shadow px-3 py-1 bg-white`}
              style={{
                top: positionMap[position].top,
                left: positionMap[position].left,
                bottom: positionMap[position].bottom,
                right: positionMap[position].right,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
