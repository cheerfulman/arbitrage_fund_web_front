declare module 'chinese-days' {
  export function isHoliday(date: string | Date): boolean;
  export function isWorkday(date: string | Date): boolean;
  const _default: {
    isHoliday: typeof isHoliday;
    isWorkday: typeof isWorkday;
  };
  export default _default;
}