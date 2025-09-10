'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useMotion } from '@cirolee/tiny-motion';
import { useEffect, useState, useRef, useCallback } from 'react';
import Button from '@/components/Button';
import { foods, type FoodMeta } from '@/config/food.config';
import { cn, getDateIndex, randomInt } from '@/lib/utils';
import FoodImage from '@/components/FoodImage';
import { fireworkEffect } from '@/lib/effects';
export default function Home() {
  const timer = useRef<ReturnType<typeof setInterval>>(null);
  const [status, setStatus] = useState<'playing' | 'stopped' | 'idle'>('idle');
  const [food, setFood] = useState<FoodMeta>();
  // 彩蛋提示
  const [isEagerEgg, setIsEagerEgg] = useState(false);
  const [eagerEggRef, motion] = useMotion<HTMLDivElement>();

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
    if (isEagerEgg) {
      setIsEagerEgg(false);
    }
    if (status !== 'playing') {
      start();
    } else {
      timer.current && clearInterval(timer.current);
      setStatus('stopped');
    }
  }, [status, timer, start, isEagerEgg]);

  useEffect(() => {
    // random init
    setFood(getRandomFood());
  }, []);

  // 彩蛋效果
  useEffect(() => {
    if (status === 'stopped' && food) {
      const todayIndx = getDateIndex(new Date(), foods.length);
      const foodIndex = foods.findIndex((item) => item.id === food.id);
      console.log(todayIndx, foods[todayIndx]);
      //触发彩蛋效果
      if (todayIndx === foodIndex) {
        setIsEagerEgg(true);
        motion('fadeInUp', { duration: 300 });
        fireworkEffect();
      }
    }
  }, [status, food, motion]);

  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <Link
        href="https://github.com/CiroLee/what-to-eat-today"
        className="fixed top-4 right-4 z-10 size-6"
        target="_blank"
        rel="noopener noreferrer">
        <Image src="/icons/github.svg" width={256} height={256} className="size-full" alt="github" />
      </Link>
      {status === 'idle' ? <p className="absolute top-[40%] text-5xl font-bold">今天吃点啥</p> : null}
      <div className="relative -mt-11 size-60">
        <FoodImage show={status === 'stopped'} className="size-full" src={food?.imagePath} alt={food?.cname} />
      </div>
      <div className="flex w-90 flex-col items-center">
        <p
          className={cn('mb-6 h-9 text-center text-3xl font-semibold opacity-0 md:mb-10', {
            'opacity-100': status !== 'idle',
          })}>
          {food?.cname}
        </p>
        <p
          className={cn('mb-8 h-9 text-center text-lg font-semibold opacity-0 md:mb-12', {
            'opacity-100 transition': status === 'stopped',
          })}>
          {food?.text}
        </p>
        <Button className="w-30 text-lg" onClick={handleBtnClick}>
          {status === 'playing' ? '就它了！' : '挑一个'}
        </Button>
        <div ref={eagerEggRef} className={cn('mt-10 text-lg', { 'opacity-0!': !isEagerEgg })}>
          太棒了，你挑到了今日推荐菜品！
        </div>
      </div>
    </div>
  );
}
