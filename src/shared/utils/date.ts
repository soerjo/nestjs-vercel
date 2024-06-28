import * as dayjs from 'dayjs';

export const formatDate = (date: Date): string => {
  return dayjs(date).locale('id').format('DD MMMM YYYY').toString();
};

export const formatCompletedDate = (date: Date): string => {
  return dayjs(date).locale('id').format('DD MMMM YYYY HH:mm:ss').toString();
};

export const getLastYearDate = (): string => {
  return dayjs()
    .subtract(1, 'year')
    .endOf('year')
    .format('DD MMMM YYYY')
    .toString();
};

export const getThisYearDate = (): string => {
  return dayjs().endOf('year').format('DD MMMM YYYY').toString();
};

export const getThisYearPlusOne = (): string => {
  return dayjs().add(1, 'year').endOf('year').format('DD MMMM YYYY').toString();
};
