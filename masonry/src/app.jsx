import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import kurz2 from './images/kurz2.jpg';

const generateItems = ({ count = 20, width, startIndex = 0 }) => {
  return Array.from({ length: count }).map((_, i) => {
    const id = startIndex + i;
    const height = Math.floor(width * (0.8 + 0.8 * Math.random()));
    return {
      id: `item-${id}`,
      title: `card-title-${id} Mock`,
      imgUrl: kurz2,
      width,
      height,
    };
  });
};

const MasonryList = () => {
  const [containerWidth, setContainerWidth] = useState(window.innerWidth);
  const [items, setItems] = useState(() => generateItems({
    count: 20,
    width: 200,
    startIndex: 0
  }));
  const [scrollTop, setScrollTop] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const BOTTOM_TEXT_HEIGHT = 60;
  const GAP = 10;
  const BUFFER = 600;

  const columnCount = useMemo(() => {
    if (containerWidth < 600) return 2;
    if (containerWidth < 900) return 3;
    return 4;
  }, [containerWidth]);

  // Calculate positions for all items
  const { positions, totalHeight } = useMemo(() => {
    const colWidth = (containerWidth - GAP * (columnCount + 1)) / columnCount;
    const colHeights = new Array(columnCount).fill(GAP);

    const calculatedPosition = items.map((item) => {
      const minHeight = Math.min(...colHeights);
      const minIndex = colHeights.indexOf(minHeight);

      const renderHeight = (item.height / item.width) * colWidth;
      const cardTotalHeight = renderHeight + BOTTOM_TEXT_HEIGHT;

      const x = GAP + minIndex * (GAP + colWidth);
      const y = minHeight;

      colHeights[minIndex] = y + cardTotalHeight + GAP;

      return {
        ...item,
        w: colWidth,
        h: renderHeight,
        x,
        y,
      };
    });

    return {
      positions: calculatedPosition,
      totalHeight: Math.max(...colHeights),
    };
  }, [items, columnCount, containerWidth]);

  const visibleItems = useMemo(() => {
    const viewTop = scrollTop - BUFFER;
    const viewBottom = scrollTop + window.innerHeight + BUFFER;

    return positions.filter((pos) => {
      const itemTop = pos.y;
      const itemBottom = pos.y + pos.h;
      return itemBottom > viewTop && itemTop < viewBottom;
    });
  }, [positions, scrollTop]);

  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setContainerWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadMore = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
    console.log("loading...");
    
    setTimeout(() => {
      setItems((prev) => [
        ...prev, 
        ...generateItems({ 
          count: 20, 
          width: 200, 
          startIndex: prev.length 
        })
      ]);
      setIsLoading(false);
    }, 300);
  }, [isLoading]);

  const handleScroll = useCallback((e) => {
    const target = e.target;
    
    if (target.scrollHeight - target.scrollTop - target.clientHeight < 200) {
      loadMore();
    }

    // Simple throttle using requestAnimationFrame
    requestAnimationFrame(() => {
      setScrollTop(target.scrollTop);
    });
  }, [loadMore]);

  return (
    <div
      className="scroll-container"
      ref={containerRef}
      onScroll={handleScroll}
    >
      <div style={{ width: "100%", height: totalHeight + 'px' }}></div>
      {visibleItems.map((item) => (
        <div
          key={item.id}
          className="card"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: item.w,
            transform: `translate3d(${item.x}px, ${item.y}px, 0)`,
          }}
        >
          {/* <div className="image-wrapper">
            <img
              src={item.imgUrl}
              className="image-content"
              loading="lazy"
              onLoad={(e) => e.currentTarget.classList.add("loaded")}
              alt={item.title}
            />
          </div> */}
          <div className="image-wrapper" style={{ height: item.h, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
            <span>{Math.round(item.h)}px</span>
          </div>
          <div className="card-footer" style={{ height: BOTTOM_TEXT_HEIGHT }}>
            {item.title}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="loading-spinner">loading...</div>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<MasonryList />);
