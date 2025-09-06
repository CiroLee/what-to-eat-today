import { cn } from '@/lib/utils';
export default function Button({ className, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'bg-ra-orange-9 inset-shadow-ra-orange-11 h-11 cursor-pointer rounded-lg px-4 font-bold text-white inset-shadow-[0_-4px_0px] transition duration-100 active:translate-y-[0.1em] active:inset-shadow-[0_0_0]',
        className,
      )}
      {...props}
    />
  );
}
