import { format, formatDistanceToNow } from 'date-fns';

export function formatDate(isoDate: string): string {
  return format(new Date(isoDate), 'MMM d, yyyy');
}

export function formatRelative(isoDate: string): string {
  return formatDistanceToNow(new Date(isoDate), { addSuffix: true });
}
