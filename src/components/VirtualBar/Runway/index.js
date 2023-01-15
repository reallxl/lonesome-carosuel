import { useState, useRef, useEffect, Children, cloneElement } from 'react';

import styles from "./Runway.module.scss";

const Runway = ({ children }) => {

  const [isAtBottom, setIsAtBottom] = useState(false);
  const [items, setItems] = useState(children);

  // const prevItemsRef = useRef();
  const ref = useRef();
  // const itemsRef = useRef([]);
  const sentinelRef = useRef();
  
  useEffect(() => {
    if (!sentinelRef?.current) return;
    const target = sentinelRef.current;
  
    const loadObserver = new IntersectionObserver(
      ([{ isIntersecting }]) => setIsAtBottom(isIntersecting)
    );
  
    loadObserver.observe(target);
    return () => loadObserver.unobserve(target);
  }, []);

  // useEffect(() => {
  //   if (!viewportRef?.current || !items.length || items.length !== itemsRef?.current.length) return;
  //   const viewport = viewportRef.current;
  //   const targets = itemsRef.current;

  //   const startingItemSerialNo = targets[0].getAttribute('data-serial-no');
  //   if (prevItemsRef?.current === startingItemSerialNo) return;
  //   prevItemsRef.current = startingItemSerialNo;

  //   const watchObserver = new IntersectionObserver(
  //     (entries) =>
  //       entries.forEach(({ intersectionRatio, target }) => {
  //         console.log('observed...')
  //         const serialNo = target.getAttribute('data-serial-no');
  //         console.log(serialNo)
  //         setItems((items) => {
  //           const newItems = [...items];
  //           newItems[serialNo] = { ...items[serialNo], ratio: intersectionRatio };
  //           console.log(items[serialNo], newItems[serialNo]);
  //           return newItems;
  //         });
  //       }),
  //     {
  //       root: viewport,
  //       threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  //     }
  //   );

  //   targets.forEach((target) => watchObserver.observe(target));
  //   return () => {
  //     console.log('unobserved...')
  //     targets.forEach((target) => watchObserver.unobserve(target))
  //   };
  // }, [viewportRef, items, itemsRef, prevItemsRef]);

  useEffect(() => {
    if (isAtBottom) {
      setItems((prevData) => prevData.concat(prevData));
    }
  }, [isAtBottom]);

  return items ? (
    <div className={styles.runway} ref={ref}>
      <div className={styles['runway-status-bar']}>
        {`(${items.length}) ${isAtBottom ? 'at bottom' : 'sliding'}`}
      </div>
      {ref?.current ? items.map((entry, i) => cloneElement(
        entry,
        {
          // key: JSON.stringify(entry),
          serialNo: i,
          viewportEl: ref.current,
        },
        null
      )) : null}
      <div ref={sentinelRef}>toggle</div>
    </div>
  ) : null;
};

export default Runway;