export const formatDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
};

export const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
