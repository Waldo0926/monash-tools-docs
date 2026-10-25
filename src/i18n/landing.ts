// Copy for the home page. Docs pages live in src/content/docs; this file is only the landing page.

export type Lang = 'en' | 'zh';

type Row = { tag: string; title: string; meta: string; tone?: 'warn' | 'ok' | 'accent' };
type Demo = {
  q: string;
  tool: string;
  head: string;
  sub: string;
  rows: Row[];
  bars?: { label: string; value: number; text: string }[];
  reply: string;
};

const INSTALL_MAC = 'curl -LsSf https://docs.secureview.tech/study-kit/install.sh | sh';
const INSTALL_WIN = 'powershell -ExecutionPolicy ByPass -c "irm https://docs.secureview.tech/study-kit/install.ps1 | iex"';

export const strings = {
  en: {
    htmlLang: 'en',
    title: 'Monash Student Tools',
    description:
      'Free tools for Monash students: ask Claude about your Moodle and Ed, look up units and plan a degree, read Ed faster, and find attendance codes.',
    prefix: '',
    otherLang: { label: '中文', href: '/zh-cn/' },
    nav: { docs: 'Docs', kit: 'Study Kit', hub: 'Monash Hub', github: 'GitHub', start: 'Get started' },
    theme: 'Switch light and dark',
    copy: 'Copy',
    copied: 'Copied',
    hero: {
      eyebrow: 'Free tools by a Monash student',
      h1a: 'Your Moodle and Ed,',
      h1b: 'one question away.',
      h1c: 'Kept on your laptop, answered in Claude.',
      lead:
        'Study Kit lets Claude read your own Moodle and Ed, so you can ask what is due, what is new on Ed and which slide covers a topic. One command installs it. Your login never leaves your computer.',
      tabs: ['macOS', 'Windows', 'Ask your AI'],
      cmds: [
        INSTALL_MAC,
        INSTALL_WIN,
        'Read https://docs.secureview.tech/agents/study-kit.md and set up Monash Study Kit on my computer.',
      ],
      notes: [
        'Paste into Terminal. It installs uv, the monash command, then walks you through signing in.',
        'Paste into PowerShell. No Python needed, no restart.',
        'For Claude Code, Codex or any AI that can run commands. You still type your own token and MFA.',
      ],
      meta: ['Read-only', 'MIT licensed', 'Claude, Codex, Cursor, VS Code'],
      secondary: 'Not sure which tool you need?',
    },
    demo: {
      window: 'Claude',
      connected: 'monash connected',
      sample: 'Sample data. Real answers come from your own Moodle and Ed.',
      items: [
        {
          q: "What's due this week?",
          tool: 'get_study_todo',
          head: 'This week',
          sub: '3 due · 1 may be missing · 1 Ed lesson',
          rows: [
            { tag: 'FIT2014', title: 'Lab 8 report', meta: 'Due yesterday, not submitted', tone: 'warn' },
            { tag: 'FIT2102', title: 'Assignment 2', meta: 'Fri 23:55 · in 2 days' },
            { tag: 'FIT2109', title: 'Quiz 6', meta: 'Sun 23:55 · in 4 days' },
            { tag: 'Ed', title: 'FIT2109 Week 9 pre-class', meta: 'Not started' },
          ],
          reply:
            'Start with the FIT2014 lab report: it was due last night and Moodle shows no submission. Then Assignment 2, due Friday.',
        },
        {
          q: 'Anything new on Ed?',
          tool: 'list_ed_updates',
          head: 'Ed since yesterday',
          sub: '2 staff posts · 1 reply to you',
          rows: [
            { tag: 'FIT2102', title: '#214 A2: input bounds for Q2 clarified', meta: 'Staff · 3h', tone: 'accent' },
            { tag: 'FIT2109', title: '#88 Quiz 6 covers weeks 7 to 9', meta: 'Staff · 5h', tone: 'accent' },
            { tag: 'FIT2102', title: '#201 Your question: can A1 use lodash?', meta: '1 new reply · 1h', tone: 'ok' },
          ],
          reply:
            'Read #214 before you finish Q2, the input range is smaller than the spec said. Your lodash question got an answer: allowed, but not for the core logic.',
        },
        {
          q: 'Where were monads covered?',
          tool: 'search_content',
          head: '3 matches for "monad"',
          sub: 'FIT2102 · slides, notes and recordings',
          rows: [
            { tag: 'PDF', title: 'Week 8 Lecture Slides', meta: 'Page 14' },
            { tag: 'Web', title: 'Course notes: Monads', meta: 'Section 2' },
            { tag: 'Video', title: 'Week 8 lecture recording', meta: '41:20' },
          ],
          reply:
            'Week 8 introduces it on page 14 of the slides, and the lecture explains the Maybe example at 41:20. Want me to read those pages and walk you through it?',
        },
        {
          q: 'How am I doing in FIT2109?',
          tool: 'get_moodle_grades',
          head: 'FIT2109 grades',
          sub: '3 items released',
          rows: [],
          bars: [
            { label: 'Quizzes 1 to 5', value: 84, text: '42 / 50' },
            { label: 'Assignment 1', value: 85, text: '17 / 20' },
            { label: 'Lab participation', value: 90, text: '9 / 10' },
          ],
          reply:
            'You have 85% of the marks released so far. The A1 feedback says your tests missed edge cases, worth fixing before A2.',
        },
      ] as Demo[],
    },
    flow: {
      eyebrow: 'How Study Kit works',
      h2a: 'Nothing goes through my server.',
      h2b: 'There is no server.',
      sources: ['Moodle', 'Ed'],
      sourceNotes: ['Files, deadlines, grades', 'Posts, lessons, replies'],
      middle: 'Your computer',
      middleNotes: ['Course files', 'Search index', 'Your login'],
      ai: 'Claude',
      aiNote: 'Asks for one page, not the whole PDF',
      steps: [
        { h: 'Sync, read-only', p: 'Every hour while Claude is open, new files, posts and replies are copied to your computer. Nothing is ever submitted or posted.' },
        { h: 'Kept on your disk', p: 'Course files, a full-text index and your Moodle session live in one folder only your user can read.' },
        { h: 'Claude asks for what it needs', p: 'A search returns the file and page, then Claude reads just that page. Your token and cookies are never sent to it.' },
      ],
      stats: [
        { n: '~10%', l: 'of the tokens of pasting the files, on a real course search' },
        { n: '17', l: 'read-only tools for Claude' },
        { n: '1', l: 'runtime dependency' },
      ],
      more: 'Privacy details',
    },
    tools: {
      eyebrow: 'All tools',
      h2a: 'Pick by what you need.',
      h2b: 'Most need nothing installed.',
      installLabel: 'Install',
      runsLabel: 'Runs on',
      open: 'Read the guide',
      cards: [
        { key: 'kit', name: 'Study Kit', line: 'Ask Claude about your own Moodle and Ed: deadlines, Ed updates, grades, which slide covers what.', install: 'One command', runs: 'Your computer', href: 'study-kit/' },
        { key: 'hub', name: 'Monash Hub', line: 'Units, degrees, course maps, WAM and GPA, and official guides with source links, in four languages.', install: 'None, add to home screen', runs: 'Any browser', href: 'monash-hub/' },
        { key: 'ed', name: 'Ed Web', line: 'Fetch an Ed forum into your browser, skim a takeaway per post, and download a unit\'s lesson files as one zip.', install: 'None', runs: 'Your browser tab', href: 'ed-web/' },
        { key: 'att', name: 'Attendance Helper', line: 'Finds attendance codes in Gmail, Ed and Moodle. Submits only the classes you tick as attended.', install: 'Load in Chrome', runs: 'Chrome', href: 'attendance/' },
        { key: 'bot', name: 'WeChat Q&A', line: 'Ask 马莫百科 in Chinese. It answers from official pages, links them, and passes on what it does not know.', install: 'None', runs: 'WeChat', href: 'wechat-bot/' },
      ],
    },
    rules: {
      eyebrow: 'Rules every tool follows',
      items: [
        { h: 'Read-only', p: 'Nothing submits work, attempts quizzes or posts for you. The attendance helper waits for you to confirm each class.' },
        { h: 'Your login stays with you', p: 'Tokens and cookies stay on your computer or in your browser tab. There is no account to create.' },
        { h: 'Quotes, does not guess', p: 'Answers link their source. When a tool is not sure, it says so instead of filling the gap.' },
        { h: 'Free', p: 'No paid tier, no ads, no tracking. The code is public so you can check all of this.' },
      ],
    },
    agent: {
      eyebrow: 'Let your AI do the setup',
      h2: 'Paste one line. Do the two steps only you can do.',
      p: 'Claude Code, Codex, Cursor and other AI tools that run commands can read a guide written for them and install Study Kit. They stop and hand over when it is time for your Ed token and Monash login, which never go through the chat.',
      prompt: 'Read https://docs.secureview.tech/agents/study-kit.md and set up Monash Study Kit on my computer.',
      you: ['Paste your Ed token in your own terminal', 'Pass Monash MFA in the login window'],
      youLabel: 'Only you',
      more: 'How it works',
    },
    footer: {
      blurb: 'Free tools for Monash students, built by one. Not affiliated with Monash University, Ed or Anthropic.',
      cols: [
        { h: 'Start', links: [['Which tool do I need?', 'choose/'], ['Let your AI set it up', 'ai-setup/'], ['Install Study Kit', 'study-kit/install/']] },
        { h: 'Tools', links: [['Study Kit', 'study-kit/'], ['Monash Hub', 'monash-hub/'], ['Ed Web', 'ed-web/'], ['Attendance Helper', 'attendance/'], ['WeChat Q&A', 'wechat-bot/']] },
        { h: 'Project', links: [['About', 'about/'], ['GitHub', 'https://github.com/Waldo0926'], ['Blog', 'https://waldo0926.github.io'], ['llms.txt', '/llms.txt']] },
      ],
      small: 'This site sets no cookies and has no analytics.',
      credit: 'Icons by Lucide (ISC).',
    },
  },
  zh: {
    htmlLang: 'zh-CN',
    title: 'Monash 学生工具',
    description: '给 Monash 同学的免费工具：在 Claude 里查自己的 Moodle 和 Ed、查课和规划学位、更快地看 Ed、找签到码。',
    prefix: '/zh-cn',
    otherLang: { label: 'English', href: '/' },
    nav: { docs: '文档', kit: 'Study Kit', hub: 'Monash Hub', github: 'GitHub', start: '开始使用' },
    theme: '切换深浅色',
    copy: '复制',
    copied: '已复制',
    hero: {
      eyebrow: '一个 Monash 学生做的免费工具',
      h1a: 'Moodle 和 Ed，',
      h1b: '问一句就知道。',
      h1c: '数据留在你电脑上，答案在 Claude 里。',
      lead:
        'Study Kit 让 Claude 读你自己的 Moodle 和 Ed，可以直接问这周要交什么、Ed 上有什么新消息、某个知识点在哪份课件第几页。一条命令装好，登录信息不离开你的电脑。',
      tabs: ['macOS', 'Windows', '让 AI 装'],
      cmds: [
        INSTALL_MAC,
        INSTALL_WIN,
        '阅读 https://docs.secureview.tech/agents/study-kit.md ，帮我在电脑上装好 Monash Study Kit。',
      ],
      notes: [
        '粘贴到“终端”运行。会自动装 uv 和 monash 命令，然后带你登录。',
        '粘贴到 PowerShell 运行。不用装 Python，也不用重开窗口。',
        '适用于 Claude Code、Codex 等能运行命令的 AI。令牌和 MFA 还是你自己输入。',
      ],
      meta: ['只读', 'MIT 开源', 'Claude、Codex、Cursor、VS Code'],
      secondary: '不确定该用哪个？',
    },
    demo: {
      window: 'Claude',
      connected: '已连接 monash',
      sample: '示例数据。实际回答来自你自己的 Moodle 和 Ed。',
      items: [
        {
          q: '这周我有什么要交的？',
          tool: 'get_study_todo',
          head: '本周待办',
          sub: '3 项截止 · 1 项可能漏交 · 1 节 Ed lesson',
          rows: [
            { tag: 'FIT2014', title: 'Lab 8 report', meta: '昨天截止，还没交', tone: 'warn' },
            { tag: 'FIT2102', title: 'Assignment 2', meta: '周五 23:55 · 还有 2 天' },
            { tag: 'FIT2109', title: 'Quiz 6', meta: '周日 23:55 · 还有 4 天' },
            { tag: 'Ed', title: 'FIT2109 Week 9 pre-class', meta: '还没开始' },
          ],
          reply: '先处理 FIT2014 的 lab report：昨晚就截止了，Moodle 上没有提交记录。然后是周五截止的 Assignment 2。',
        },
        {
          q: 'Ed 上有什么新消息？',
          tool: 'list_ed_updates',
          head: '昨天以来的 Ed',
          sub: '2 条老师帖子 · 1 条回复你的',
          rows: [
            { tag: 'FIT2102', title: '#214 A2 第 2 题输入范围说明', meta: '老师 · 3 小时前', tone: 'accent' },
            { tag: 'FIT2109', title: '#88 Quiz 6 考第 7 到 9 周', meta: '老师 · 5 小时前', tone: 'accent' },
            { tag: 'FIT2102', title: '#201 你问的：A1 能不能用 lodash', meta: '1 条新回复 · 1 小时前', tone: 'ok' },
          ],
          reply: '做第 2 题前先看 #214，输入范围比 spec 写的小。你问 lodash 的帖子有人回了：可以用，但核心逻辑不行。',
        },
        {
          q: 'monad 在哪份资料里讲过？',
          tool: 'search_content',
          head: '“monad” 找到 3 处',
          sub: 'FIT2102 · 课件、笔记和录播',
          rows: [
            { tag: 'PDF', title: 'Week 8 Lecture Slides', meta: '第 14 页' },
            { tag: '网页', title: 'Course notes: Monads', meta: '第 2 节' },
            { tag: '录播', title: 'Week 8 lecture recording', meta: '41:20' },
          ],
          reply: '第 8 周课件第 14 页开始讲，录播 41:20 讲了 Maybe 的例子。要我读一下那几页，再给你讲一遍吗？',
        },
        {
          q: '我 FIT2109 现在成绩怎么样？',
          tool: 'get_moodle_grades',
          head: 'FIT2109 成绩',
          sub: '已出 3 项',
          rows: [],
          bars: [
            { label: 'Quiz 1 到 5', value: 84, text: '42 / 50' },
            { label: 'Assignment 1', value: 85, text: '17 / 20' },
            { label: 'Lab 出勤', value: 90, text: '9 / 10' },
          ],
          reply: '目前已出的分数拿了 85%。A1 的反馈说测试没覆盖边界情况，做 A2 前值得补上。',
        },
      ] as Demo[],
    },
    flow: {
      eyebrow: 'Study Kit 怎么工作',
      h2a: '数据不经过我的服务器。',
      h2b: '因为根本没有服务器。',
      sources: ['Moodle', 'Ed'],
      sourceNotes: ['课件、截止、成绩', '帖子、lesson、回复'],
      middle: '你的电脑',
      middleNotes: ['课件', '全文索引', '你的登录'],
      ai: 'Claude',
      aiNote: '只读需要的那一页，不读整份 PDF',
      steps: [
        { h: '只读同步', p: 'Claude 开着时每小时把新课件、新帖子和新回复复制到你电脑上。从不提交或发帖。' },
        { h: '存在你的硬盘上', p: '课件、全文索引和 Moodle 登录都在一个只有你自己账户能读的文件夹里。' },
        { h: 'Claude 按需读取', p: '先搜到是哪份文件第几页，Claude 只读那一页。令牌和 cookie 永远不会发给它。' },
      ],
      stats: [
        { n: '约 10%', l: '真实课程搜索中，相比直接贴整份文件用的 token' },
        { n: '17', l: '个给 Claude 用的只读工具' },
        { n: '1', l: '个运行时依赖' },
      ],
      more: '隐私细节',
    },
    tools: {
      eyebrow: '全部工具',
      h2a: '按你要做的事选。',
      h2b: '大部分什么都不用装。',
      installLabel: '安装',
      runsLabel: '运行在',
      open: '看说明',
      cards: [
        { key: 'kit', name: 'Study Kit', line: '在 Claude 里问自己的 Moodle 和 Ed：截止日期、Ed 新消息、成绩、某个知识点在哪页。', install: '一条命令', runs: '你的电脑', href: 'study-kit/' },
        { key: 'hub', name: 'Monash Hub', line: '课程、学位、选课规划、WAM 和 GPA，还有带出处的官方指南，支持四种语言。', install: '不用装，可加到主屏幕', runs: '任何浏览器', href: 'monash-hub/' },
        { key: 'ed', name: 'Ed Web', line: '把 Ed 论坛抓到你的浏览器里，每帖一句话概括，一键打包下载整门课的课件。', install: '不用装', runs: '浏览器标签页', href: 'ed-web/' },
        { key: 'att', name: '签到助手', line: '从 Gmail、Ed、Moodle 里找签到码。只提交你勾选确认上过的课。', install: '在 Chrome 里加载', runs: 'Chrome', href: 'attendance/' },
        { key: 'bot', name: '公众号问答', line: '在马莫百科公众号用中文提问。答案来自官网并附链接，不知道的转给人工。', install: '不用装', runs: '微信', href: 'wechat-bot/' },
      ],
    },
    rules: {
      eyebrow: '每个工具都守的规矩',
      items: [
        { h: '只读', p: '不会替你交作业、做测验或发帖。签到助手也要你逐节确认才提交。' },
        { h: '登录信息留在你这', p: '令牌和 cookie 只存在你的电脑或浏览器标签页里，也不用注册账号。' },
        { h: '只引用，不瞎猜', p: '回答都附出处。拿不准的时候直接说，不会自己补内容。' },
        { h: '免费', p: '没有付费版、广告和追踪。代码公开，上面这些都能自己核对。' },
      ],
    },
    agent: {
      eyebrow: '让 AI 帮你装',
      h2: '粘贴一句话，你只做两件只有你能做的事。',
      p: 'Claude Code、Codex、Cursor 这类能运行命令的 AI，可以读一份专门写给它的说明，把 Study Kit 装好。到了输入 Ed 令牌和登录 Monash 这一步，它会停下来交给你，这两样都不经过聊天。',
      prompt: '阅读 https://docs.secureview.tech/agents/study-kit.md ，帮我在电脑上装好 Monash Study Kit。',
      you: ['在你自己的终端里粘贴 Ed 令牌', '在登录窗口里通过 Monash MFA'],
      youLabel: '只能你做',
      more: '具体流程',
    },
    footer: {
      blurb: '一个 Monash 学生给同学做的免费工具。与 Monash University、Ed 和 Anthropic 无关。',
      cols: [
        { h: '开始', links: [['该用哪个工具？', 'choose/'], ['让 AI 帮你装', 'ai-setup/'], ['安装 Study Kit', 'study-kit/install/']] },
        { h: '工具', links: [['Study Kit', 'study-kit/'], ['Monash Hub', 'monash-hub/'], ['Ed Web', 'ed-web/'], ['签到助手', 'attendance/'], ['公众号问答', 'wechat-bot/']] },
        { h: '项目', links: [['关于', 'about/'], ['GitHub', 'https://github.com/Waldo0926'], ['博客', 'https://waldo0926.github.io'], ['llms.txt', '/llms.txt']] },
      ],
      small: '本站不设 cookie，也没有统计代码。',
      credit: '图标来自 Lucide（ISC）。',
    },
  },
};
