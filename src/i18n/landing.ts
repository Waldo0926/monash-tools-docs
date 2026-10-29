// Copy for the home page. Docs pages live in src/content/docs; this file is only the landing page.

export type Lang = 'en' | 'zh';

const INSTALL_MAC = 'curl -LsSf https://docs.secureview.tech/study-kit/install.sh | sh';
const INSTALL_WIN = 'powershell -ExecutionPolicy ByPass -c "irm https://docs.secureview.tech/study-kit/install.ps1 | iex"';

// Sample course files shown as sheets in the hero and the scroll story. The highlighted one is index 0.
const SHEETS_EN = [
  { unit: 'FIT2102', name: 'Week 8 lecture slides', meta: 'PDF · page 14' },
  { unit: 'FIT2102', name: 'Lecture 8 transcript', meta: 'Recording · 41:20' },
  { unit: 'FIT2102', name: 'Course notes: Monads', meta: 'Web page' },
  { unit: 'Ed', name: '#214 A2 Q2 input bounds', meta: 'Staff post' },
  { unit: 'FIT2109', name: 'Week 9 pre-class', meta: 'Ed lesson' },
  { unit: 'FIT2014', name: 'Lab 8 specification', meta: 'PDF' },
];

export const strings = {
  en: {
    htmlLang: 'en',
    title: 'Monash Student Tools',
    description:
      'Free tools for Monash students: ask your AI about your Moodle and Ed, look up units and plan a degree, read Ed faster, and find attendance codes.',
    prefix: '',
    otherLang: { label: '中文', href: '/zh-cn/' },
    nav: { how: 'How it works', tools: 'Tools', docs: 'Docs', github: 'GitHub', start: 'Get started' },
    copy: 'Copy',
    hero: {
      h1a: 'Your Moodle and Ed,',
      h1b: 'answered by your AI.',
      lead:
        'Study Kit copies your own Moodle and Ed to your laptop and lets the AI app on your computer search them: Claude, Codex (also inside the ChatGPT desktop app), Cursor and others. Ask what is due, what changed on Ed, or which slide covers a topic. Your login stays on your computer, and the AI only gets the pages it looks up.',
      tabs: ['macOS', 'Windows', 'Ask your AI'],
      cmds: [
        INSTALL_MAC,
        INSTALL_WIN,
        'Read https://docs.secureview.tech/agents/study-kit.md and set up Monash Study Kit on my computer.',
      ],
      notes: [
        'Paste into Terminal. It installs the monash command, then walks you through signing in.',
        'Paste into PowerShell. No Python needed.',
        'For Claude Code, Codex or any AI that runs commands. You still type your own token and MFA.',
      ],
      primary: 'Install guide',
      secondary: 'All tools',
      meta: 'Read-only · MIT · Computer only, not phones',
    },
    sheets: SHEETS_EN,
    story: {
      h2a: 'One question,',
      h2b: 'one page read.',
      sample: 'Sample course data',
      sources: [
        { name: 'Moodle', note: 'Files, deadlines, grades' },
        { name: 'Ed', note: 'Posts, lessons, replies' },
      ],
      laptop: 'Your computer',
      query: 'Where were monads covered?',
      steps: [
        { h: 'Sync', p: 'Every hour while your AI app is open, new files, Ed posts and replies are copied to your computer. It never submits or posts anything.' },
        { h: 'Index', p: 'Slides, PDFs, notes and lecture transcripts go into a full-text index, in a folder only your user account can read.' },
        { h: 'Find', p: 'Your question is searched locally. The result is a file and a page number, like page 14 of the Week 8 slides.' },
        { h: 'Answer', p: 'The AI reads that one page instead of the whole PDF. On a real course search that used about 10% of the tokens.' },
      ],
      answer: {
        tool: 'search_content',
        source: 'Week 8 lecture slides · page 14',
        reply:
          'Monads start on page 14 of the Week 8 slides, and the lecture goes through the Maybe example at 41:20. Want me to walk you through it?',
        read: 'Read 1 page of 62',
      },
      more: 'Privacy details',
    },
    tools: {
      h2: 'Five tools. Most need nothing installed.',
      installLabel: 'Install',
      runsLabel: 'Runs on',
      rows: [
        { name: 'Study Kit', line: 'Ask your AI about your own Moodle and Ed: deadlines, Ed updates, grades, which slide covers what.', install: 'One command', runs: 'Your computer', href: 'study-kit/' },
        { name: 'Monash Hub', line: 'Units, degrees, course maps, WAM and GPA, Malaysia tuition fees, key dates and official guides with source links.', install: 'None', runs: 'Any browser', href: 'monash-hub/' },
        { name: 'Ed Web', line: 'Fetch an Ed forum into your browser, skim one line per post, download a unit\'s lesson files as a zip.', install: 'None', runs: 'Browser tab', href: 'ed-web/' },
        { name: 'Attendance Helper', line: 'Finds attendance codes in Gmail, Ed and Moodle. Submits only the classes you tick as attended.', install: 'Chrome Web Store', runs: 'Chrome', href: 'attendance/' },
        { name: 'WeChat Q&A', line: 'Ask 马莫百科 in Chinese. Answers come from official pages with links, and unknowns go to a person.', install: 'None', runs: 'WeChat', href: 'wechat-bot/' },
      ],
      rules: ['Study Kit only reads', 'Attendance Helper submits only the classes you tick', 'Your login stays with you', 'Free, no tracking'],
    },
    agent: {
      h2a: 'Or paste one line',
      h2b: 'into your AI.',
      p: 'Claude Code, Codex, Cursor and similar tools can read a guide written for them and install Study Kit. They stop when it is time for your Ed token and Monash login, which never go through the chat.',
      prompt: 'Read https://docs.secureview.tech/agents/study-kit.md and set up Monash Study Kit on my computer.',
      more: 'How it works',
    },
    footer: {
      blurb: 'Free tools for Monash students, built by one. Not affiliated with Monash University, Ed, Anthropic or OpenAI.',
      cols: [
        { h: 'Start', links: [['Which tool do I need?', 'choose/'], ['Let your AI set it up', 'ai-setup/'], ['Install Study Kit', 'study-kit/install/']] },
        { h: 'Tools', links: [['Study Kit', 'study-kit/'], ['Monash Hub', 'monash-hub/'], ['Ed Web', 'ed-web/'], ['Attendance Helper', 'attendance/'], ['WeChat Q&A', 'wechat-bot/']] },
        { h: 'Project', links: [['About', 'about/'], ['GitHub', 'https://github.com/Waldo0926'], ['Blog', 'https://blog.secureview.tech'], ['llms.txt', '/llms.txt']] },
      ],
      small: 'No cookies, no analytics. Icons by Lucide (ISC).',
    },
  },
  zh: {
    htmlLang: 'zh-CN',
    title: 'Monash 学生工具',
    description: '给 Monash 同学的免费工具：让 AI 查自己的 Moodle 和 Ed、查课和规划学位、更快地看 Ed、找签到码。',
    prefix: '/zh-cn',
    otherLang: { label: 'English', href: '/' },
    nav: { how: '怎么工作', tools: '工具', docs: '文档', github: 'GitHub', start: '开始使用' },
    copy: '复制',
    hero: {
      h1a: 'Moodle 和 Ed，',
      h1b: '直接问 AI。',
      lead:
        'Study Kit 把你自己的 Moodle 和 Ed 复制到电脑上，让电脑上的 AI 来搜：Claude、Codex（ChatGPT 桌面版里也有）、Cursor 等都能接。可以问这周要交什么、Ed 上有什么新消息、某个知识点在哪份课件第几页。登录信息只留在你电脑上，AI 只拿到它查的那几页。',
      tabs: ['macOS', 'Windows', '让 AI 装'],
      cmds: [
        INSTALL_MAC,
        INSTALL_WIN,
        '阅读 https://docs.secureview.tech/agents/study-kit.md ，帮我在电脑上装好 Monash Study Kit。',
      ],
      notes: [
        '粘贴到“终端”运行。会装好 monash 命令，然后带你登录。',
        '粘贴到 PowerShell 运行。不用装 Python。',
        '适用于 Claude Code、Codex 等能运行命令的 AI。令牌和 MFA 还是你自己输入。',
      ],
      primary: '安装说明',
      secondary: '全部工具',
      meta: '只读 · MIT 开源 · 只能在电脑上用，手机不行',
    },
    sheets: [
      { unit: 'FIT2102', name: '第 8 周课件', meta: 'PDF · 第 14 页' },
      { unit: 'FIT2102', name: '第 8 讲录播字幕', meta: '录播 · 41:20' },
      { unit: 'FIT2102', name: '课程笔记：Monads', meta: '网页' },
      { unit: 'Ed', name: '#214 A2 第 2 题输入范围', meta: '老师帖子' },
      { unit: 'FIT2109', name: '第 9 周 pre-class', meta: 'Ed lesson' },
      { unit: 'FIT2014', name: 'Lab 8 说明', meta: 'PDF' },
    ],
    story: {
      h2a: '问一个问题，',
      h2b: '只读一页。',
      sample: '示例课程数据',
      sources: [
        { name: 'Moodle', note: '课件、截止、成绩' },
        { name: 'Ed', note: '帖子、lesson、回复' },
      ],
      laptop: '你的电脑',
      query: 'monad 在哪份资料里讲过？',
      steps: [
        { h: '同步', p: 'AI 软件开着时每小时把新课件、Ed 帖子和回复复制到你电脑上。从不提交作业或发帖。' },
        { h: '索引', p: '课件、PDF、笔记和录播字幕建成全文索引，放在只有你自己账户能读的文件夹里。' },
        { h: '查找', p: '问题在你电脑上搜，结果是哪份文件第几页，比如第 8 周课件第 14 页。' },
        { h: '回答', p: 'AI 只读那一页，不读整份 PDF。在一次真实课程搜索里，用的 token 大约是直接贴文件的 10%。' },
      ],
      answer: {
        tool: 'search_content',
        source: '第 8 周课件 · 第 14 页',
        reply: '第 8 周课件第 14 页开始讲 monad，录播 41:20 讲了 Maybe 的例子。要我带你过一遍吗？',
        read: '62 页里只读了 1 页',
      },
      more: '隐私细节',
    },
    tools: {
      h2: '五个工具，大部分不用装。',
      installLabel: '安装',
      runsLabel: '运行在',
      rows: [
        { name: 'Study Kit', line: '让 AI 查自己的 Moodle 和 Ed：截止日期、Ed 新消息、成绩、某个知识点在哪页。', install: '一条命令', runs: '你的电脑', href: 'study-kit/' },
        { name: 'Monash Hub', line: '课程、学位、选课规划、WAM 和 GPA、马来西亚学费、重要日期，还有带出处的官方指南。', install: '不用装', runs: '任何浏览器', href: 'monash-hub/' },
        { name: 'Ed Web', line: '把 Ed 论坛抓到浏览器里，每帖一句话概括，一键打包下载整门课的课件。', install: '不用装', runs: '浏览器标签页', href: 'ed-web/' },
        { name: '签到助手', line: '从 Gmail、Ed、Moodle 里找签到码。只提交你勾选确认上过的课。', install: 'Chrome 应用商店', runs: 'Chrome', href: 'attendance/' },
        { name: '公众号问答', line: '在马莫百科公众号用中文提问。答案来自官网并附链接，不知道的转给人工。', install: '不用装', runs: '微信', href: 'wechat-bot/' },
      ],
      rules: ['Study Kit 只读不写', '签到助手只提交你勾选的课', '登录信息留在你这', '免费，无追踪'],
    },
    agent: {
      h2a: '或者把一句话',
      h2b: '贴给你的 AI。',
      p: 'Claude Code、Codex、Cursor 这类工具可以读一份专门写给它的说明，把 Study Kit 装好。到了输入 Ed 令牌和登录 Monash 这一步，它会停下来交给你，这两样都不经过聊天。',
      prompt: '阅读 https://docs.secureview.tech/agents/study-kit.md ，帮我在电脑上装好 Monash Study Kit。',
      more: '具体流程',
    },
    footer: {
      blurb: '一个 Monash 学生给同学做的免费工具。与 Monash University、Ed 和 Anthropic 无关。',
      cols: [
        { h: '开始', links: [['该用哪个工具？', 'choose/'], ['让 AI 帮你装', 'ai-setup/'], ['安装 Study Kit', 'study-kit/install/']] },
        { h: '工具', links: [['Study Kit', 'study-kit/'], ['Monash Hub', 'monash-hub/'], ['Ed Web', 'ed-web/'], ['签到助手', 'attendance/'], ['公众号问答', 'wechat-bot/']] },
        { h: '项目', links: [['关于', 'about/'], ['GitHub', 'https://github.com/Waldo0926'], ['博客', 'https://blog.secureview.tech'], ['llms.txt', '/llms.txt']] },
      ],
      small: '本站不设 cookie，也没有统计代码。图标来自 Lucide（ISC）。',
    },
  },
};
