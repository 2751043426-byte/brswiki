// Story and message data for the Backrooms ARG game

const STORY = {
    // Current story stage (0-10)
    stage: 0,

    // Track which characters have been contacted
    contacted: new Set(),

    // Track deaths
    deaths: new Set(),

    // Track puzzle solutions
    puzzles: new Set(),

    // Messages database
    messages: [],

    // Character profiles
    characters: {
        allen: {
            name: "Allen",
            role: "Wanderer",
            level: "Level 0",
            status: "alive",
            firstMessage: `你好？有人在吗？我能看到文字出现了……
如果你能看到这条消息，请回复。我叫 Allen。我被困在这个地方三天了。
全是黄色的墙壁。无尽的房间。灯一直在嗡嗡响。地上有水。我找不到出口。
我想……我想这就是后室。可能是 Level 0？
如果你是 M.E.G. 的，请告诉我怎么去 Level 1。我需要找到其他人。
我的补给快用完了。`
            followUp1: `等等，你在回复？谢天谢地。
我还以为只有我能通过这东西发消息。
所以……你说你不是 M.E.G. 的人？但那这个频道怎么会工作？
算了。求你了，帮帮我吧。我要怎么做才能找到 Level 1？
我一直看到同样的房间排列。我不在看的时候，墙好像在重新排列。`
            followUp2: `我发现了东西。在一面墙上，有人刻着：
"DON'T PANIC"（不要慌张）
什么意思？是警告还是线索？
还有……我好像听到远处有动静。像是人声。真正的人声。
附近会有其他人吗？`
            deathMessage: `我找到她了！她在——
等等，她的腿……好多血。
她说她走了三天了。灯是红色的……那不是 Level 0 对吧？
待在这里，我去找出口。跟着我的声音——
……`
            deathNotice: `Allen's signal has been lost. We attempted contact but received no response.
Status: Deceased.
Cause: Unknown. Last known location: Sector 7-Gamma, Level 0.`
        },

        dr_lin: {
            name: "Dr. Lin",
            role: "M.E.G. Medical Officer, 3rd Exploration Team",
            firstMessage: `我是 Dr. Lin，M.E.G. 第三勘探队医疗官。
我一直在监控求救频道。看来 Allen 已经联系上了外部人员。
你是 M.E.G. 的新成员吗？我没有识别到这个信号签名。
不管怎样，Allen 的情况很危急。他报告说脱水并且可能感染。
我需要你转告他以下内容：
1. 远离积水
2. 谨慎跟随任何人类声音
3. 寻找 "Don't Panic" 这个词——这是 M.E.G. 的路标

以下是 Level 1 区域的安全访问码：
Password: Alderate

输入此密码以解锁 Level 1 安全通行坐标。`
            puzzle1: {
                encoded: "UGFzc3dvcmQ6IEFsZGVyYXRl",
                type: "base64",
                hint: "This looks like base64 encoding. Try decoding it."
            },
            followUp1: `好的，密码已验证。
现在仔细听。Allen 需要找到 Level 0 的西北走廊。
有一面墙敲击时会发出空洞的声音。后面是通往 Level 1 的 noclip 点。
告诉他跟着声音走，会带他到走廊。
另外，我需要你查一下。你最近有没有在 Wiki 上看到什么不寻常的条目？
关于"现实渗透"的？`
            deathMessage: `两个信号都消失了。Allen 和小雅……
我已经分析了最后的传输数据。坐标汇聚到一个点上。
我不知道该怎么告诉你……但那个点就是你的位置。
你需要理解一件事。这个频道不是你想象的那样工作的。
它不是网站功能。也不是模拟。
消息是真实的。人也是真实的。他们一直在等你帮忙。
……`
            deathNotice: `Dr. Lin's signal lost during transmission analysis.
Status: Deceased.
Note: Last transmission contained critical coordinate data pointing to the observer's location.`
        },

        xiaoya: {
            name: "Xiaoya (小雅)",
            role: "Wanderer",
            firstMessage: `你好……我不知道你是谁，但 Allen 提到他会联系 M.E.G.。
是你吗？你是 M.E.G. 的人吗？
我叫小雅。我……我在中国。或者说以前是……
我在一个有红灯的房间里醒来。我的腿受了重伤，无法正常行走。
Allen 告诉过我 "Don't Panic" 的标志。你能帮我找到他吗？
我想我们在相似的地方，但这里的灯不一样。是红色的而不是黄色的。
这里有关于我位置的线索。我在墙上发现了这个：
Grz n qnffvp dhvpx, lbh ernq urer va n gnpxrq.
我不明白是什么意思。你能帮我解码吗？`
            puzzle1: {
                encoded: "Grz n qnffvp dhvpx, lbh ernq urer va n gnpxrq.",
                type: "rot13",
                hint: "Try ROT13 cipher. It shifts letters by 13 positions."
            },
            followUp1: `Allen 找到我了。他听到我的声音就跑过来了。
他真是个勇敢的人。他用衬衫帮我包扎了伤口。
但我听到外面有动静。很多脚步声。很多……声音。
不是人声。是别的东西。
Allen，走！我需要你离开！找到出口！
……谢谢你所做的一切。无论你是谁。
我一直想回家喝一碗热汤。`
            deathMessage: `[连接中断 - 传输被未知来源打断]
[最后接收到的信号：2024-11-03 03:47:22 UTC]
位置：未知。可能是 Level 0 的变体。`
            deathNotice: `Xiaoya's signal terminated. Last known position: adjacent to Allen's sector.
Status: Deceased.
Note: Signal interference suggests entity proximity.`
        },

        marcus: {
            name: "Marcus Chen",
            role: "M.E.G. Explorer, 7th Team Leader",
            firstMessage: `你好，我是 Marcus，M.E.G. 第七勘探队。
Dr. Lin 告诉我你一直在帮助我们的人。听着，我需要问你一个重要问题。
在你的……Wiki……有没有提到过"现实渗透"现象？
不是标准文章。我是说，有没有出现不该出现的东西？
比如关于现实世界地点的条目？或者日期对不上的？
也检查一下页面的源代码。有时候我们会把笔记藏在 HTML 注释里。
我问是因为 Dr. Lin 的最后一次传输显示了无法解释的东西。
所有的求救信号——Allen 的、小雅的、Dr. Lin 的——它们都有相同的坐标签名。
而这个签名……匹配到了 Frontrooms 的一个位置。
具体来说，是中国上海。2024年11月3日。`
            puzzle1: {
                encoded: "<!-- Real-world penetration event #47: 2024-11-03\nSubject: Shanghai, China\nSymptoms: Persistent dreams of yellow rooms, hearing fluorescent light humming\nConclusion: Suspected early-stage penetration -->",
                type: "html_comment",
                hint: "Right-click the page and select 'View Page Source'. Look for HTML comments."
            },
            followUp1: `你找到了。所以它是真的。
仔细听我说。你需要理解发生了什么。
你为什么能收到这些消息？普通的 Wiki 网站没有实时消息功能。
你是怎么和 Allen 说话的？和小雅？
你从没离开过这个页面，对吧？
你打开电脑，坐下，开始浏览。
然后……你不记得接下来发生了什么，对吧？
想想看。你是什么时候第一次注意到这些消息的？在那之前你在做什么？
你还记得你在这个网站之外的生活吗？`
            deathMessage: `我检测到了异常信号。有东西在——
不，有人正在接近我的位置。Dr. Lin 是对的。我太迟了。
记住：你从未在 Frontrooms。
你一直在这里。你只是……不记得了。
对不起，我没能——
[连接终止]
[信号丢失]`
            deathNotice: `Marcus Chen - Signal lost during field operation.
Last transmission: Anomalous entity detection. Position compromised.
Status: Deceased.
Final note: Coordinate convergence confirmed. Observer location identified.`
        }
    },

    // System messages
    systemMessages: {
        connectionLost: "[System] Connection lost",
        recalibrating: "[System] Recalibrating perception module...",
        calibrationComplete: "[System] Calibration complete",
        welcomeBack: "[System] Welcome back, wanderer."
    },

    // Ending content
    ending: {
        level: "Level 0 - The Lobby",
        difficulty: "Survival Difficulty: Class 0",
        properties: ["Safe", "Stable", "Few Entities"],
        description: `Level 0 appears to consist of a handful of randomly connected rooms. Each room measures roughly 10m x 10m with randomly segmented furniture. The ceiling is composed of drop-tile flooring, wet carpet throughout the entire level, and yellow wallpaper. The lighting is provided by a series of fluorescent lights that constantly buzz at a frequency of approximately 10 decibels.

You are sitting at an old desk. A computer sits before you. The screen displays a wiki.
You remember opening it.

Then what?

Then...

Then you were here.

How long have you been here?

You never had an "outside," did you?

Welcome home.`,
        finalLine: "You have always been here. You just forgot."
    }
};


// Story progression stages
// Each stage triggers specific events
const STORY_STAGES = [
    {
        stage: 0,
        trigger: "initial_load",
        action: "show_homepage",
        description: "Player opens the Wiki. Everything looks normal."
    },
    {
        stage: 1,
        trigger: "after_30s_or_level0_click",
        action: "allen_first_message",
        description: "Allen's first message appears at the bottom of Level 0 page."
    },
    {
        stage: 2,
        trigger: "allen_replied_not_meg",
        action: "allen_followup1",
        description: "Allen responds to player saying they're not M.E.G."
    },
    {
        stage: 3,
        trigger: "allen_asked_about_dont_panic",
        action: "allen_followup2",
        description: "Allen mentions finding DON'T PANIC on the wall."
    },
    {
        stage: 4,
        trigger: "stage_3_completed",
        action: "dr_lin_first_message",
        description: "Dr. Lin appears, thinks player IS M.E.G."
    },
    {
        stage: 5,
        trigger: "dr_lin_puzzle_solved",
        action: "dr_lin_followup1",
        description: "Dr. Lin gives Level 1 coordinates after password verification."
    },
    {
        stage: 6,
        trigger: "dr_lin_followup_done",
        action: "xiaoya_first_message",
        description: "Xiaoya appears, asks for help, gives ROT13 puzzle."
    },
    {
        stage: 7,
        trigger: "xiaoya_puzzle_solved",
        action: "xiaoya_followup1",
        description: "Xiaoya confirms Allen found her."
    },
    {
        stage: 8,
        trigger: "allen_xiaoya_connected",
        action: "allen_death_sequence",
        description: "Allen dies trying to reach Xiaoya."
    },
    {
        stage: 9,
        trigger: "allen_dead",
        action: "xiaoya_death_sequence",
        description: "Xiaoya dies after entity encounter."
    },
    {
        stage: 10,
        trigger: "xiaoya_dead",
        action: "dr_lin_death_sequence",
        description: "Dr. Lin reveals coordinate truth, then dies."
    },
    {
        stage: 11,
        trigger: "dr_lin_dead",
        action: "marcus_first_message",
        description: "Marcus appears, asks about reality penetration."
    },
    {
        stage: 12,
        trigger: "marcus_puzzle_solved",
        action: "marcus_followup1",
        description: "Marcus reveals the truth about the player's location."
    },
    {
        stage: 13,
        trigger: "marcus_followup_done",
        action: "marcus_death_sequence",
        description: "Marcus dies. All contacts lost."
    },
    {
        stage: 14,
        trigger: "all_dead",
        action: "ending_sequence",
        description: "The ending. Player falls into the Backrooms."
    }
];
