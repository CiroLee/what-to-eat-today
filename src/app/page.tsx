'use client';
import Image from 'next/image';
import { useEffect, useState, useRef, useCallback } from 'react';
import Button from '@/components/Button';
import { foods, type FoodMeta } from '@/config/food.config';
import { cn, randomInt } from '@/lib/utils';
import FoodImage from '@/components/FoodImage';
import Link from 'next/link';
export default function Home() {
  const timer = useRef<ReturnType<typeof setInterval>>(null);
  const [status, setStatus] = useState<'playing' | 'stopped' | 'idle'>('idle');
  const [food, setFood] = useState<FoodMeta>();

  const getRandomFood = () => {
    const index = randomInt(0, foods.length - 1);
    return foods[index];
  };

  const start = useCallback(() => {
    setStatus('playing');
    timer.current = setInterval(() => {
      setFood(getRandomFood());
    }, 50);
  }, []);

  const handleBtnClick = useCallback(() => {
    if (status !== 'playing') {
      start();
    } else {
      timer.current && clearInterval(timer.current);
      setStatus('stopped');
    }
  }, [status, timer, start]);

  useEffect(() => {
    // random init
    setFood(getRandomFood());
  }, []);

  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <Link
        href="https://github.com/CiroLee/what-to-eat-today"
        className="fixed top-4 right-4 z-10 size-6 rounded"
        target="_blank"
        rel="noopener noreferrer">
        <Image src="/icons/github.svg" width={256} height={256} className="size-full" alt="github" />
      </Link>
      {status === 'idle' ? <p className="absolute top-[36%] text-5xl font-bold">今天吃点啥</p> : null}
      <FoodImage show={status === 'stopped'} src={food?.imagePath} alt={food?.cname} />
      <p
        className={cn('mb-8 h-9 text-center text-3xl font-semibold opacity-0 md:mb-12', {
          'opacity-100': status !== 'idle',
        })}>
        {food?.cname}
      </p>
      <Button className="w-30 text-lg" onClick={handleBtnClick}>
        {status === 'playing' ? '就它了！' : '挑一个'}
      </Button>
    </div>
  );
}
