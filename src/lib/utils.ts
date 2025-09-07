import { twMerge } from 'tailwind-merge';
import { ClassValue, clsx } from 'clsx';
export function cn(...classnames: ClassValue[]): string {
  return twMerge(clsx(classnames));
}

export function randomInt(start: number, end: number) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

// 根据日期获取唯一索引
export function getDateIndex(date: Date, length: number) {
  const normalizedDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

  // 哈希计算
  let hash = normalizedDate.getTime();
  hash = (hash << 15) - hash - 1;
  hash = hash ^ (hash >>> 12);
  hash = hash + (hash << 2) + (hash << 4);
  hash = hash ^ (hash >>> 4);
  hash = (hash * 2057) ^ (hash >>> 16);

  // 扩展范围 [0,length]
  return Math.abs(hash) % (length + 1);
}
