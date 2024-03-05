export const capitalize = (text: string) => {
  return (
    text.substring(0, 1).toUpperCase() +
    text.substring(1, text.length).toLowerCase()
  );
};

export const now = () => new Date().getTime();

export const timeLeft = (expiredAt: number) => Math.max(0, expiredAt - now());
