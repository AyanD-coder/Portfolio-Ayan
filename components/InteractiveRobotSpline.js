'use client';

import { Suspense, lazy } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

export function InteractiveRobotSpline({ scene, className, style }) {
  return (
    <Suspense
      fallback={
        <div 
          className={className} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            backgroundColor: 'transparent',
            minHeight: '200px',
            width: '100%',
            height: '100%',
            ...style
          }}
        >
          <div style={{ 
            width: '24px', 
            height: '24px', 
            border: '3px solid rgba(200,200,200,0.3)', 
            borderRadius: '50%', 
            borderTopColor: 'var(--primary)', 
            animation: 'spin 1s ease-in-out infinite' 
          }} />
        </div>
      }
    >
      <Spline
        scene={scene}
        className={`spline-container ${className || ""}`}
        style={style}
      />
    </Suspense>
  );
}
