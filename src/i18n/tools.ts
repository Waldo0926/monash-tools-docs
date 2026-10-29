// Copy for the tools page (/tools/). One section per tool: what it is, the facts, how to get it.
// The demo panels are samples; anything that looks like data is labelled as such on the page.

import type { Lang } from './landing';

const INSTALL_MAC = 'curl -LsSf https://docs.secureview.tech/study-kit/install.sh | sh';

type Tool = {
  id: string;
  name: string;
  h2: string;
  desc: string;
  spec: [string, string][];
  cmd?: string;
  links: [string, string][];
  tabs: string[];
  note: string;
};

export const toolsPage: Record<Lang, { title: string; description: string; h1a: string; h1b: string; lead: string; copy: string; tools: Tool[] }> = {
  en: {
    title: 'Tools · Monash Student Tools',
    description: 'Every tool on one page: what it does, what it needs, and how to start.',
    h1a: 'Five tools,',
    h1b: 'each one page.',
    lead: 'What each tool does, what it needs, and the one thing to do to start. The panels on the right show what you will see.',
    copy: 'Copy',
    tools: [
      {
        id: 'study-kit',
        name: 'Study Kit',
        h2: 'Moodle and Ed, inside your AI app.',
        desc: 'Syncs your own Moodle and Ed to your computer, read-only, and gives your AI app 17 tools to search them. The same data works from the terminal with no AI at all.',
        spec: [['Install', 'One command'], ['Version', '1.3.0'], ['Tested with', 'Claude Desktop, Claude Code; ChatGPT, Codex (remote integration)'], ['One-command local setup', 'Codex, Cursor, VS Code, Windsurf, Gemini CLI'], ['Local server runs on', 'macOS, Windows, Linux'], ['Licence', 'MIT']],
        cmd: INSTALL_MAC,
        links: [['Guide', 'study-kit/'], ['GitHub', 'https://github.com/Waldo0926/monash-study-kit'], ['PyPI', 'https://pypi.org/project/monash-study-kit/']],
        tabs: ['In the terminal', 'In an AI app'],
        note: 'Real command output with sample course data. The terminal prints in Chinese.',
      },
      {
        id: 'monash-hub',
        name: 'Monash Hub',
        h2: 'Units, degrees and marks, in one site.',
        desc: 'Look up a unit, see what a degree is made of, lay out a course map that is checked against offerings and requisites, work out WAM and GPA, and check Malaysia tuition fees and key dates. Every answer links its official source.',
        spec: [['Install', 'None, add to home screen if you like'], ['Version', '1.0.0'], ['Languages', 'English, 简体中文'], ['Runs on', 'Any browser'], ['Account', 'Not needed']],
        links: [['Open Monash Hub', 'https://monashhub.secureview.tech'], ['Guide', 'monash-hub/']],
        tabs: ['WAM and GPA', 'Search'],
        note: 'Screenshots of the live site. The marks are made up.',
      },
      {
        id: 'ed-web',
        name: 'Ed Web',
        h2: 'An Ed forum you can skim.',
        desc: 'Fetches your Ed forums into your own browser tab. Each post gets a one-line takeaway, staff answers are marked, and a whole unit\'s lesson files download as one zip. No server, no AI.',
        spec: [['Install', 'None'], ['Runs on', 'Any desktop browser'], ['Your token', 'Kept in the tab, sent only to Ed'], ['Interface', 'Chinese'], ['Licence', 'Source on GitHub']],
        links: [['Open Ed Web', 'https://monashed.secureview.tech/app/'], ['Guide', 'ed-web/'], ['GitHub', 'https://github.com/Waldo0926/ed-web']],
        tabs: ['Posts', 'Lessons'],
        note: 'Screenshots of the real page, loaded with made-up posts so no classmate posts are shown.',
      },
      {
        id: 'attendance',
        name: 'Attendance Helper',
        h2: 'It finds the codes. You confirm.',
        desc: 'A Chrome extension that reads your classes from Monash Attendance and looks for the codes in Gmail, Ed and Moodle, including codes posted as screenshots. Nothing is submitted until you tick each class you attended.',
        spec: [['Install', 'Chrome Web Store'], ['Version', '1.3.52'], ['Runs on', 'Chrome on Windows, macOS, Linux'], ['For', 'Classes on attendance.monash.edu.my'], ['Text recognition', 'On your computer']],
        links: [['Chrome Web Store', 'https://chromewebstore.google.com/detail/monash-attendance-helper/mnbkcmgkjmfngcifndchaidndhdfafcd'], ['Install guide', 'attendance/install/']],
        tabs: ['Confirm page', 'Popup'],
        note: 'Real screenshots of the extension.',
      },
      {
        id: 'wechat-bot',
        name: 'WeChat Q&A',
        h2: 'Ask in Chinese. Get the official link.',
        desc: 'Message the 马莫百科 WeChat account. Answers come from replies the owner wrote, Monash Hub and the account\'s own articles, each with a link. When it has nothing reliable, it says so and passes the question to a person.',
        spec: [['Where', 'WeChat account 马莫百科'], ['Install', 'None, just follow the account'], ['Language', 'Chinese'], ['For', 'Students at the Malaysia campus'], ['When unsure', 'Hands the question to a person']],
        links: [['Guide', 'wechat-bot/']],
        tabs: ['Not sure', 'Thanks'],
        note: 'The reply text is copied from the bot code.',
      },
    ],
  },
  zh: {
    title: '全部工具 · Monash 学生工具',
    description: '每个工具一屏：能做什么、需要什么、怎么开始。',
    h1a: '五个工具，',
    h1b: '一个一屏。',
    lead: '每个工具能做什么、需要什么、第一步做什么。右边的面板是你实际会看到的样子。',
    copy: '复制',
    tools: [
      {
        id: 'study-kit',
        name: 'Study Kit',
        h2: '把 Moodle 和 Ed 接进你的 AI。',
        desc: '把你自己的 Moodle 和 Ed 只读同步到电脑上，给 AI 17 个工具去搜。同样的数据在终端里也能查，完全不用 AI。',
        spec: [['安装', '一条命令'], ['版本', '1.3.0'], ['实测过', 'Claude Desktop、Claude Code；ChatGPT、Codex（远程集成）'], ['本地一键接入', 'Codex、Cursor、VS Code、Windsurf、Gemini CLI'], ['本地服务器运行在', 'macOS、Windows、Linux'], ['许可证', 'MIT']],
        cmd: INSTALL_MAC,
        links: [['说明', 'study-kit/'], ['GitHub', 'https://github.com/Waldo0926/monash-study-kit'], ['PyPI', 'https://pypi.org/project/monash-study-kit/']],
        tabs: ['在终端里', '在 AI 里'],
        note: '真实命令输出，课程数据是示例。',
      },
      {
        id: 'monash-hub',
        name: 'Monash Hub',
        h2: '课程、学位和成绩，一个网站查齐。',
        desc: '查课、看学位由哪些课组成、排选课计划并自动对照开课和先修要求、算 WAM 和 GPA、查马来西亚学费和重要日期。每个答案都附官方出处。',
        spec: [['安装', '不用装，想要可以加到主屏幕'], ['版本', '1.0.0'], ['语言', 'English、简体中文'], ['运行在', '任何浏览器'], ['账号', '不需要']],
        links: [['打开 Monash Hub', 'https://monashhub.secureview.tech'], ['说明', 'monash-hub/']],
        tabs: ['WAM 和 GPA', '搜索'],
        note: '线上网站截图，成绩是编的。',
      },
      {
        id: 'ed-web',
        name: 'Ed Web',
        h2: 'Ed 论坛，扫一眼就懂。',
        desc: '把 Ed 论坛抓到你自己的浏览器标签页里。每帖一句话概括，老师的回答单独标出来，整门课的课件一键打包成 zip。没有服务器，也不用 AI。',
        spec: [['安装', '不用装'], ['运行在', '任何电脑浏览器'], ['令牌', '只存在标签页里，只发给 Ed'], ['界面', '中文'], ['源码', 'GitHub 公开']],
        links: [['打开 Ed Web', 'https://monashed.secureview.tech/app/'], ['说明', 'ed-web/'], ['GitHub', 'https://github.com/Waldo0926/ed-web']],
        tabs: ['帖子', '课程内容'],
        note: '真实页面截图，帖子是编的，不放同学的真实帖子。',
      },
      {
        id: 'attendance',
        name: '签到助手',
        h2: '签到码帮你找，提交你说了算。',
        desc: 'Chrome 扩展。从 Monash Attendance 读你的课，再去 Gmail、Ed、Moodle 找签到码，截图里的码也能认。你逐节勾选确认上过课之前，什么都不会提交。',
        spec: [['安装', 'Chrome 应用商店'], ['版本', '1.3.52'], ['运行在', 'Windows、macOS、Linux 上的 Chrome'], ['适用', 'attendance.monash.edu.my 的课'], ['文字识别', '在你电脑上跑']],
        links: [['Chrome 应用商店', 'https://chromewebstore.google.com/detail/monash-attendance-helper/mnbkcmgkjmfngcifndchaidndhdfafcd?hl=zh-CN'], ['安装说明', 'attendance/install/']],
        tabs: ['确认页', '弹窗'],
        note: '扩展的真实截图。',
      },
      {
        id: 'wechat-bot',
        name: '公众号问答',
        h2: '用中文问，答案带官网链接。',
        desc: '给马莫百科公众号发消息。答案来自号主写的回答、Monash Hub 和公众号自己的文章，都附链接。没有可靠资料时直接说，并转给真人。',
        spec: [['在哪', '微信公众号 马莫百科'], ['安装', '不用装，关注就行'], ['语言', '中文'], ['适用', '马来西亚校区的同学'], ['拿不准时', '转给真人回答']],
        links: [['说明', 'wechat-bot/']],
        tabs: ['拿不准时', '道谢'],
        note: '回复原文取自机器人代码。',
      },
    ],
  },
};
