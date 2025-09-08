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
      ref.current.onload = () => {
        motion('zoomOverIn', { duration: 350, fill: 'forwards', easing: EASING_FUNCTIONS.easeInOutBack });
      };
    }
  }, [show, visible, motion, ref]);

  return (
    <>
      {visible && src ? (
        <Image src={src} ref={ref} width={1024} height={1024} className={cn('origin-center', className)} alt={alt} />
      ) : null}
    </>
  );
}
