export const dateInfo = ['year', 'date', 'nextyear', 'nextdate'] as const;

export type T_dateInfo = Record<typeof dateInfo[number], string>;
