import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { isString } from 'st-utils';

function formatTime(time: string | boolean | undefined): string {
  if (!time) {
    return '';
  }
  if (isString(time)) {
    return time.startsWith(' ') ? time : ` ${time}`;
  }
  return ' HH:mm:ss';
}

export function formatDateBr(value: string | Date | number, locale: string, time?: string | boolean): string {
  const format = `dd/MM/yyyy${formatTime(time)}`;
  return formatDate(value, format, locale);
}

@Pipe({ name: 'dateBr', standalone: true })
export class DateBrPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private readonly locale: string) {}

  transform(value: string | Date | number, time?: string | boolean, locale?: string): string {
    return formatDateBr(value, locale ?? this.locale, time);
  }
}
