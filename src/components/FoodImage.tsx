'use client';
import { useEffect, useState } from 'react';
import { useMotion, EASING_FUNCTIONS } from '@cirolee/tiny-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface FoodImageProps {
  show?: boolean;
  className?: string;
  src?: string;
  alt?: string;
}
export default function FoodImage({ show, className, src, alt = 'img' }: FoodImageProps) {
  const [visible, setVisible] = useState(false);
  const [ref, motion] = useMotion<HTMLImageElement>();

  useEffect(() => {
    setVisible(!!show);
    if (visible) {
      motion('zoomOverIn', { duration: 350, fill: 'forwards', easing: EASING_FUNCTIONS.easeInOutBack });
    }
  }, [show, visible, motion]);

  return (
    <>
      {visible && src ? (
        <Image
          src={src}
          ref={ref}
          width={1024}
          height={1024}
          className={cn(
            'fixed top-20 left-1/2 z-9999 flex size-50 origin-center -translate-x-1/2 md:size-70',
            className,
          )}
          alt={alt}
        />
      ) : null}
    </>
  );
}
