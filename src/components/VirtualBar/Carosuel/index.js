import { useEffect, useRef, useState } from 'react';

import styles from './Carosuel.module.scss';

const Carosuel = ({ serialNo, viewportEl }) => {
  const [ratio, setRatio] = useState(0);

  const ref = useRef();
  const observedPosRef = useRef();

  useEffect(() => {
    if (!ref?.current || !viewportEl) return;

    const target = ref.current;
    const observer = new IntersectionObserver(
      ([{ intersectionRatio, target }]) => {
        const { top } = target.getBoundingClientRect();
        console.log(target.getAttribute('data-serial-no'), top, observedPosRef.current);
        if (top === observedPosRef?.current) return;

        observedPosRef.current = top;
        setRatio(intersectionRatio);
      },
      {
        root: viewportEl,
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );

    observer.observe(target);
    return () => observer.unobserve(target);
  }, [viewportEl]);

  const percentage = (ratio * 100).toFixed(1);

  return (
    <div className={styles['carosuel-container']} ref={ref} data-serial-no={serialNo}>
      <div
        className={styles.carosuel}
        style={{ height: `${percentage}%`, flexGrow: ratio.toFixed(1) }}
      >
        [{serialNo}] {`${percentage}%`} the Carosuel
      </div>
    </div>
  );
};

export default Carosuel;
