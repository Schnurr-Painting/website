import { getCollection } from './content';

export interface StatData {
  value: string;
  label?: string;
  description?: string;
  showOn?: string[];
  sortOrder: number;
}

export type StatsPageKey = 'home' | 'about' | 'safety';

export async function getStatsForPage(page: StatsPageKey) {
  const allStats = await getCollection<StatData>('stats');
  return allStats
    .filter((s) => (s.data.showOn || []).includes(page))
    .sort((a, b) => a.data.sortOrder - b.data.sortOrder);
}
