'use client';

import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const Spline = lazy(() => import('@splinetool/react-spline'));

function HeroLoadingPoster() {
  return (
    <div className="spline-loading-poster" aria-hidden="true">
      <Image
        className="spline-loading-poster-image"
        src="/site-visuals/robot-loader-light.webp"
        alt=""
        width={768}
        height={768}
        sizes="(min-width: 900px) 31rem, (max-width: 719px) calc(100vw - 1.5rem), calc(100vw - 2rem)"
        priority
        draggable={false}
      />
    </div>
  );
}

export function InteractiveRobotSpline({ scene, className, style }) {
  const containerRef = useRef(null);
  const hasActivatedRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const connection =
      navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const constrainedConnection =
      connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType);

    if (!container || reducedMotion || constrainedConnection) {
      return undefined;
    }

    let idleHandle;
    let timerHandle;
    let pageReady = document.readyState === 'complete';
    let pageVisible = document.visibilityState === 'visible';
    let inViewport = false;

    const cancelScheduledLoad = () => {
      if (idleHandle && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleHandle);
      }
      if (timerHandle) {
        window.clearTimeout(timerHandle);
      }
      idleHandle = undefined;
      timerHandle = undefined;
    };

    const activate = () => {
      if (hasActivatedRef.current || shouldLoad) {
        return;
      }

      hasActivatedRef.current = true;
      cancelScheduledLoad();
      setShouldLoad(true);
    };

    const scheduleLoad = () => {
      if (!pageReady || !pageVisible || !inViewport || idleHandle || timerHandle) return;

      if ('requestIdleCallback' in window) {
        idleHandle = window.requestIdleCallback(activate, { timeout: 2500 });
      } else {
        timerHandle = window.setTimeout(activate, 1200);
      }
    };

    const handlePageReady = () => {
      pageReady = true;
      scheduleLoad();
    };

    const handleVisibilityChange = () => {
      pageVisible = document.visibilityState === 'visible';
      if (pageVisible) scheduleLoad();
      else cancelScheduledLoad();
    };

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(
          ([entry]) => {
            inViewport = entry.isIntersecting;
            if (inViewport) scheduleLoad();
            else cancelScheduledLoad();
          },
          { rootMargin: '160px 0px', threshold: 0.01 },
        )
      : null;

    if (observer) {
      observer.observe(container);
    } else {
      inViewport = true;
    }

    if (pageReady) scheduleLoad();
    else window.addEventListener('load', handlePageReady, { once: true });

    document.addEventListener('visibilitychange', handleVisibilityChange);
    container.addEventListener('pointerenter', activate, { passive: true });
    container.addEventListener('pointerdown', activate, { passive: true });

    return () => {
      cancelScheduledLoad();
      observer?.disconnect();
      window.removeEventListener('load', handlePageReady);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      container.removeEventListener('pointerenter', activate);
      container.removeEventListener('pointerdown', activate);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`spline-deferred-shell${sceneReady ? ' is-loaded' : ''}`}
      aria-hidden="true"
    >
      <HeroLoadingPoster />
      {shouldLoad ? (
        <Suspense fallback={null}>
          <Spline
            scene={scene}
            className={`spline-container ${className || ''}`}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', ...style }}
            onLoad={() => setSceneReady(true)}
            onError={() => setSceneReady(false)}
          />
        </Suspense>
      ) : null}
    </div>
  );
}
