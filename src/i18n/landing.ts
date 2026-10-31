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
      'Free tools for Monash students: ask your AI about your Moodle, Ed, school mail and attendance, look up units and plan a degree, read Ed faster, and find attendance codes.',
    prefix: '',
    otherLang: { label: '中文', href: '/zh-cn/' },
    nav: { how: 'How it works', tools: 'Tools', docs: 'Docs', github: 'GitHub', start: 'Get started' },
    copy: 'Copy',
    hero: {
      h1a: 'Moodle, Ed, Mail\nand Attendance,',
      h1b: 'answered by your AI.',
      lead:
        'Study Kit copies your own Moodle and Ed to your laptop, plus your school mail and attendance if you connect them, and lets the AI app on your computer search them: Claude, Codex (also inside the ChatGPT desktop app), Cursor and others. Ask what is due, what changed on Ed, which slide covers a topic, which emails need you, or which classes you have not checked in to. Your login stays on your computer, and the AI only gets what it looks up.',
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
      meta: 'Read-only for Moodle and Ed · Mail and check-in only after you confirm · MIT · Runs on your computer',
    },
    sheets: SHEETS_EN,
    story: {
      h2a: 'One question,',
      h2b: 'one page read.',
      sample: 'Sample course data',
      sources: [
        { id: 'moodle', name: 'Moodle', note: 'Files, deadlines, grades' },
        { id: 'ed', name: 'Ed', note: 'Posts, lessons, replies' },
        { id: 'mail', name: 'Mail', note: 'Optional · inbox, attachments', optional: true },
        { id: 'attendance', name: 'Attendance', note: 'Optional · classes, codes', optional: true },
      ],
      laptop: 'Your computer',
      query: 'Where were monads covered?',
      steps: [
        { h: 'Sync', p: 'Every hour while your AI app is open, new files, Ed posts and replies are copied to your computer. Connected mail syncs every 30 minutes and attendance follows your timetable. Nothing is posted to Moodle or Ed, and mail or check-in waits for your OK.' },
        { h: 'Index', p: 'Slides, PDFs, notes, lecture transcripts and mail attachments go into a full-text index, in a folder only your user account can read.' },
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
        { name: 'Study Kit', line: 'Ask your AI about your own Moodle and Ed, plus school mail and attendance if you connect them: deadlines, Ed updates, grades, which slide covers what, unread mail, check-in status.', install: 'One command', runs: 'Your computer', href: 'study-kit/' },
        { name: 'Monash Hub', line: 'Units, degrees, course maps, WAM and GPA, Malaysia tuition fees, key dates and official guides with source links.', install: 'None', runs: 'Any browser', href: 'monash-hub/' },
        { name: 'Ed Web', line: 'Fetch an Ed forum into your browser, skim one line per post, download a unit\'s lesson files as a zip.', install: 'None', runs: 'Browser tab', href: 'ed-web/' },
        { name: 'Attendance Helper', line: 'Finds attendance codes in Gmail, Ed and Moodle. Submits only the classes you tick as attended.', install: 'Chrome Web Store', runs: 'Chrome', href: 'attendance/' },
        { name: 'WeChat Q&A', line: 'Ask 马莫百科 in Chinese. Answers come from official pages with links, and unknowns go to a person.', install: 'None', runs: 'WeChat', href: 'wechat-bot/' },
      ],
      rules: ['Study Kit only reads Moodle and Ed, and asks before any mail or check-in', 'Attendance Helper submits only the classes you tick', 'Your login stays with you', 'Free, no tracking'],
    },
    agent: {
      h2a: 'Or paste one line',
      h2b: 'into your AI.',
      p: 'Claude Code, Codex, Cursor and similar tools can read a guide written for them and install Study Kit. They stop when it is time for your Ed token, Monash login and, if you connect mail, Google sign-in. None of these go through the chat.',
      prompt: 'Read https://docs.secureview.tech/agents/study-kit.md and set up Monash Study Kit on my computer.',
      more: 'How it works',
    },
    footer: {
      blurb: 'Free tools for Monash students, built by one. Not affiliated with Monash University, Ed, Anthropic or OpenAI.',
      cols: [
        { h: 'Start', links: [['Which tool do I need?', 'choose/'], ['Let your AI set it up', 'ai-setup/'], ['Install Study Kit', 'study-kit/install/'], ['Connect mail and attendance', 'study-kit/mail-attendance/']] },
        { h: 'Tools', links: [['Study Kit', 'study-kit/'], ['Monash Hub', 'monash-hub/'], ['Ed Web', 'ed-web/'], ['Attendance Helper', 'attendance/'], ['WeChat Q&A', 'wechat-bot/']] },
        { h: 'Project', links: [['About', 'about/'], ['GitHub', 'https://github.com/Waldo0926'], ['Blog', 'https://blog.secureview.tech'], ['llms.txt', '/llms.txt']] },
      ],
      small: 'No cookies, no analytics. Icons by Lucide (ISC).',
    },
  },
  zh: {
    htmlLang: 'zh-CN',
    title: 'Monash学生工具',
    description: '给Monash同学的免费工具：查课程、规划学位、查看Moodle和Ed更新、找签到码。',
    prefix: '/zh-cn',
    otherLang: { label: 'English', href: '/' },
    nav: { how: '怎么工作', tools: '工具', docs: '文档', github: 'GitHub', start: '开始使用' },
    copy: '复制',
    hero: {
      h1a: 'Moodle、Ed、\n邮箱和考勤，',
      h1b: '问你的AI',
      lead:
        'Study Kit在你电脑上同步Moodle和Ed资料，也能选择连接学校邮箱和考勤。接进Claude、Codex或Cursor后，可以问这周要交什么、Ed有什么新消息、知识点在哪页、还有哪些课没签到。登录信息留在你的设备上，工具返回的查询内容会发送给你所使用的AI服务。',
      tabs: ['macOS', 'Windows', '让AI装'],
      cmds: [
        INSTALL_MAC,
        INSTALL_WIN,
        '阅读https://docs.secureview.tech/agents/study-kit.md，帮我在电脑上装好Monash Study Kit。',
      ],
      notes: [
        '粘贴到“终端”运行。会装好monash命令，然后带你登录。',
        '粘贴到PowerShell运行。不用装Python。',
        '适用于Claude Code、Codex等能运行命令的AI。令牌和MFA还是你自己输入。',
      ],
      primary: '安装说明',
      secondary: '全部工具',
      meta: '对Moodle和Ed只读 · 邮件和签到须你确认 · MIT开源 · 在你电脑上运行',
    },
    sheets: [
      { unit: 'FIT2102', name: '第8周课件', meta: 'PDF · 第14页' },
      { unit: 'FIT2102', name: '第8讲录播字幕', meta: '录播 · 41:20' },
      { unit: 'FIT2102', name: '课程笔记：Monads', meta: '网页' },
      { unit: 'Ed', name: '#214 A2第2题输入范围', meta: '老师帖子' },
      { unit: 'FIT2109', name: '第9周pre-class', meta: 'Ed lesson' },
      { unit: 'FIT2014', name: 'Lab 8说明', meta: 'PDF' },
    ],
    story: {
      h2a: '问一个问题，',
      h2b: '只读一页。',
      sample: '示例课程数据',
      sources: [
        { id: 'moodle', name: 'Moodle', note: '课件、截止、成绩' },
        { id: 'ed', name: 'Ed', note: '帖子、lesson、回复' },
        { id: 'mail', name: '邮箱', note: '可选 · 收件箱、附件', optional: true },
        { id: 'attendance', name: '考勤', note: '可选 · 课表、签到码', optional: true },
      ],
      laptop: '你的电脑',
      query: 'monad在哪份资料里讲过？',
      steps: [
        { h: '同步', p: 'AI软件开着时每小时把新课件、Ed帖子和回复复制到你电脑上。接上的邮箱每30分钟同步一次，考勤按你的课表查。不会在Moodle或Ed上提交、发帖，发邮件和签到都要你点头。' },
        { h: '索引', p: '课件、PDF、笔记、录播字幕和邮件附件建成全文索引，放在只有你自己账户能读的文件夹里。' },
        { h: '查找', p: '问题在你电脑上搜，结果是哪份文件第几页，比如第8周课件第14页。' },
        { h: '回答', p: 'AI只读那一页，不读整份PDF。在一次真实课程搜索里，用的token大约是直接贴文件的10%。' },
      ],
      answer: {
        tool: 'search_content',
        source: '第8周课件 · 第14页',
        reply: '第8周课件第14页开始讲monad，录播41:20讲了Maybe的例子。要我带你过一遍吗？',
        read: '62页里只读了1页',
      },
      more: '隐私细节',
    },
    tools: {
      h2: '五个工具，按需要选择',
      installLabel: '安装',
      runsLabel: '运行在',
      rows: [
        { name: 'Study Kit', line: '让AI查自己的Moodle和Ed，接上的话还有学校邮箱和考勤：截止日期、Ed新消息、成绩、某个知识点在哪页、未读邮件、签到情况。', install: '一条命令', runs: '你的电脑', href: 'study-kit/' },
        { name: 'Monash Hub', line: '课程、学位、选课规划、WAM和GPA、马来西亚学费、重要日期，还有带出处的官方指南。', install: '不用装', runs: '任何浏览器', href: 'monash-hub/' },
        { name: 'Ed Web', line: '把Ed论坛抓到浏览器里，每帖一句话概括，一键打包下载整门课的课件。', install: '不用装', runs: '浏览器标签页', href: 'ed-web/' },
        { name: '签到助手', line: '从Gmail、Ed、Moodle里找签到码。只提交你勾选确认上过的课。', install: 'Chrome应用商店', runs: 'Chrome', href: 'attendance/' },
        { name: '公众号问答', line: '在马莫百科公众号用中文提问。答案来自官网并附链接，不知道的转给人工。', install: '不用装', runs: '微信', href: 'wechat-bot/' },
      ],
      rules: ['Study Kit对Moodle和Ed只读，邮件和签到都先问你', '签到助手只提交你勾选的课', '登录凭据留在你的设备上，AI会收到查询结果', '免费，无追踪'],
    },
    agent: {
      h2a: '或者把一句话',
      h2b: '贴给你的AI。',
      p: 'Claude Code、Codex、Cursor这类工具可以读一份专门写给它的说明，把Study Kit装好。到了输入Ed令牌、登录Monash，以及接邮箱时登录Google这几步，它会停下来交给你，这些都不经过聊天。',
      prompt: '阅读https://docs.secureview.tech/agents/study-kit.md ，帮我在电脑上装好Monash Study Kit。',
      more: '具体流程',
    },
    footer: {
      blurb: '一个Monash学生给同学做的免费工具。与Monash University、Ed和Anthropic无关。',
      cols: [
        { h: '开始', links: [['该用哪个工具？', 'choose/'], ['让AI帮你装', 'ai-setup/'], ['安装Study Kit', 'study-kit/install/'], ['接上邮箱和考勤', 'study-kit/mail-attendance/']] },
        { h: '工具', links: [['Study Kit', 'study-kit/'], ['Monash Hub', 'monash-hub/'], ['Ed Web', 'ed-web/'], ['签到助手', 'attendance/'], ['公众号问答', 'wechat-bot/']] },
        { h: '项目', links: [['关于', 'about/'], ['GitHub', 'https://github.com/Waldo0926'], ['博客', 'https://blog.secureview.tech'], ['llms.txt', '/llms.txt']] },
      ],
      small: '本站不设cookie，也没有统计代码。图标来自Lucide（ISC）。',
    },
  },
};
