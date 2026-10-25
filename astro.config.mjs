// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// One sidebar group per tool. Labels are translated; slugs are shared by both languages.
const group = (label, zh, dir, items) => ({
  label,
  translations: { 'zh-CN': zh },
  items: items.map((slug) => (dir ? `${dir}/${slug}` : slug).replace(/\/index$/, '')),
});

export default defineConfig({
  site: 'https://docs.secureview.tech',
  integrations: [
    starlight({
      title: { en: 'Monash Student Tools', 'zh-CN': 'Monash 学生工具' },
      description: 'Guides for the free tools I built for Monash students: Moodle and Ed in Claude, Monash Hub, Ed Web and the attendance helper.',
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        'zh-cn': { label: '简体中文', lang: 'zh-CN' },
      },
      logo: { src: './src/assets/logo.svg' },
      components: {
        Header: './src/components/docs/Header.astro',
        Sidebar: './src/components/docs/Sidebar.astro',
      },
      favicon: '/favicon.svg',
      editLink: { baseUrl: 'https://github.com/Waldo0926/monash-tools-docs/edit/main/' },
      lastUpdated: true,
      customCss: ['@fontsource-variable/inter', './src/styles/custom.css'],
      head: [
        { tag: 'link', attrs: { rel: 'alternate', type: 'text/plain', href: '/llms.txt', title: 'llms.txt' } },
      ],
      sidebar: [
        group('Start here', '从这里开始', '', ['choose', 'ai-setup']),
        group('Study Kit', 'Study Kit', 'study-kit', [
          'index', 'install', 'setup', 'ask-claude', 'cli', 'other-clients', 'recordings', 'privacy', 'troubleshooting', 'commands', 'update',
        ]),
        group('Monash Hub', 'Monash Hub', 'monash-hub', ['index', 'app']),
        group('Ed Web', 'Ed Web', 'ed-web', ['index']),
        group('Attendance Helper', '签到助手', 'attendance', ['index', 'install', 'use']),
        group('WeChat Q&A bot', '公众号问答', 'wechat-bot', ['index']),
        group('More', '更多', '', ['private-tools', 'about']),
      ],
    }),
  ],
});
