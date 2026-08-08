'use client';

import Image from 'next/image';
import { Suspense, lazy } from 'react';

function HeroLoadingPoster() {
  return (
    <div className="spline-loading-poster" aria-hidden="true">
      <Image
        src="/site-visuals/fullstack-product-system.webp"
        alt=""
        fill
        priority
        sizes="(min-width: 900px) 373px, min(100vw - 3rem, 373px)"
        className="spline-loading-poster-image"
      />
    </div>
  );
}

const Spline = lazy(() => import('@splinetool/react-spline'));

export function InteractiveRobotSpline({ scene, className, style }) {
  return (
    <Suspense fallback={<HeroLoadingPoster />}>
      <Spline
        scene={scene}
        className={`spline-container ${className || ""}`}
        style={{ position: 'relative', ...style }}
      >
        <HeroLoadingPoster />
      </Spline>
    </Suspense>
  );
}
