export const debounce = <T extends (...args: any[]) => ReturnType<T>>(
  callback: T,
  timeout = 300
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
};

export const chunk = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

export const requestInit = {
  data: null,
  error: null,
  loading: false,
};
