// The docs sidebar has one group per tool. The header shows those groups as tabs,
// and the sidebar shows only the group of the page you are on.

type Entry = { type: 'link'; href: string; isCurrent: boolean; label: string } | { type: 'group'; label: string; entries: Entry[] };

const hasCurrent = (e: Entry): boolean => (e.type === 'link' ? e.isCurrent : e.entries.some(hasCurrent));
const firstHref = (e: Entry): string | undefined =>
  e.type === 'link' ? e.href : e.entries.map(firstHref).find(Boolean);

export function tabs(sidebar: Entry[]) {
  return sidebar
    .filter((e): e is Extract<Entry, { type: 'group' }> => e.type === 'group')
    .map((g) => ({ label: g.label, href: firstHref(g) ?? '#', current: hasCurrent(g) }));
}

export function currentGroup(sidebar: Entry[]) {
  const g = sidebar.find((e) => e.type === 'group' && hasCurrent(e));
  return g ? [g] : sidebar;
}
