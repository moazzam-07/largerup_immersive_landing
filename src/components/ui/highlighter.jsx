import React, { useLayoutEffect, useRef } from 'react';
import { useInView } from 'motion/react';
import { annotate } from 'rough-notation';

/**
 * MagicUI / RoughNotation Text Highlighter
 * Creates a human-drawn marker stroke, underline, or box annotation.
 */
export function Highlighter({
  children,
  action = 'highlight',
  color = '#ffd1dc',
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
  className = '',
}) {
  const elementRef = useRef(null);

  const isInView = useInView(elementRef, {
    once: true,
    margin: '-10%',
  });

  const shouldShow = !isView || isInView;

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!shouldShow || !element) return;

    let annotation = null;
    let resizeObserver = null;

    try {
      const annotationConfig = {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
      };

      annotation = annotate(element, annotationConfig);
      annotation.show();

      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
          try {
            annotation.hide();
            annotation.show();
          } catch (e) {
            // graceful fallback on layout shift
          }
        });

        resizeObserver.observe(element);
        if (document.body) {
          resizeObserver.observe(document.body);
        }
      }
    } catch (err) {
      console.warn('Highlighter annotation error:', err);
    }

    return () => {
      try {
        annotation?.remove();
      } catch (e) {}
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ]);

  return (
    <span ref={elementRef} className={`relative inline-block bg-transparent ${className}`}>
      {children}
    </span>
  );
}

export default Highlighter;
