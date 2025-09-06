'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import Button from '@/components/Button';
import { foods, type FoodMeta } from '@/config/food.config';
import { randomInt } from '@/lib/utils';
import FoodImage from '@/components/FoodImage';
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

      console.log(food);
    }
  }, [status, timer, food, start]);

  useEffect(() => {
    // random init
    setFood(getRandomFood());
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {status === 'idle' ? <p className="mb-10 text-5xl font-bold">今天吃点啥</p> : null}
      {status !== 'idle' ? (
        <div className="mb-12 w-[65%] overflow-hidden md:w-50">
          <FoodImage show={status === 'stopped'} src={food?.imagePath || ''} alt={food?.cname} />
          <p className="text-center text-3xl font-bold md:text-2xl">{food?.cname}</p>
        </div>
      ) : null}
      <Button className="w-30 text-lg" onClick={handleBtnClick}>
        {status === 'stopped' ? '开始' : '就它了！'}
      </Button>
    </div>
  );
}
