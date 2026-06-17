// Wiki 页面内容数据

const WIKI_PAGES = {
    home: {
        title: "欢迎来到后室维基",
        breadcrumb: "首页",
        content: `
<div class="wiki-header">
    <h1>后室维基</h1>
    <div class="breadcrumb">首页</div>
</div>
<div class="wiki-body">
    <div class="info">
        <strong>说明：</strong>后室维基是一个协作百科全书，记录着我们现实之外的阈限空间。所有条目均来自幸存者证词、M.E.G.报告和独立研究。
    </div>
    <h2>快速导航</h2>
    <ul>
        <li><a href="#/level-0">Level 0 - "大厅"</a></li>
        <li><a href="#/level-1">Level 1 - "宜居地带"</a></li>
        <li><a href="#/level-2">Level 2 - "管道之梦"</a></li>
        <li><a href="#/level-3">Level 3 - "电站"</a></li>
        <li><a href="#/entities">实体列表</a></li>
        <li><a href="#/meg">M.E.G.（主要探险组织）</a></li>
    </ul>
    <h2>最近更新</h2>
    <ul>
        <li>新增实体分类标准</li>
        <li>更新 Level 1 安全协议</li>
        <li>M.E.G. 前哨站坐标已验证</li>
        <li>现实渗透事件报告 #47 归档</li>
    </ul>
    <h2>统计信息</h2>
    <ul>
        <li>已记录层级：500+</li>
        <li>M.E.G. 活跃人员：2,340</li>
        <li>已知实体：187 个分类</li>
        <li>上次数据库更新：2024-11-15</li>
    </ul>
</div>
<div class="wiki-footer">
    <p>最后编辑：2024-11-15 by WikiBot。</p>
    <div class="edit-history">
        <div class="edit-entry" onclick="this.classList.toggle('expanded')">
            查看编辑历史...
            <div class="edit-msg">2024-11-15 WikiBot - 数据库同步<br>
2024-11-10 Dr. Lin - 添加 Level 1 安全协议<br>
2024-10-28 Marcus - 更新实体分类<br>
2024-10-15 Admin - 初始迁移至 v47</div>
        </div>
    </div>
</div>
        `.trim()
    },

    "level-0": {
        title: "Level 0 - 大厅",
        breadcrumb: "首页 > 层级 > Level 0",
        infobox: {
            title: "Level 0",
            subtitle: '"大厅"',
            rows: [
                ["生存难度", "等级 0"],
                ["安全？", "是"],
                ["稳定", "是"],
                ["实体数量", "少数"],
            ]
        },
        content: `
<h2>描述</h2>
<p>Level 0 是后室的第一个层级。它由一系列孤立的房间组成，墙壁覆盖着黄色壁纸，地面铺有潮湿的地毯，天花板上荧光灯发出约 10 分贝的嗡嗡声。</p>
<p>每个房间大约 10m x 10m，尺寸偶尔会有变化。整体布局形成无限延伸的迷宫状结构，没有明显的出口。</p>
<div class="warning">
<strong>警告：</strong>在 Level 0 长时间停留可能导致方向感丧失、焦虑和幻觉。荧光灯持续不断的嗡嗡声已被报告在暴露 12 小时后会引起头痛。
</div>
<h2>殖民地与前哨站</h2>
<p>由于 Level 0 的性质，建立永久殖民地不可行。已有流浪者在各个区域的报告，但没有有组织的社区存在。</p>
<h2>入口与出口</h2>
<h3>入口</h3>
<ul>
<li>在某些区域"卡出"现实可能来到这里。</li>
<li>目前没有已知的人造入口。</li>
</ul>
<h3>出口</h3>
<ul>
<li>寻找感觉"不对"或声音不同的墙壁，可能会卡入 Level 1。</li>
<li>跟随人类活动的声音可能会到达 Level 1。</li>
<li>记住 M.E.G. 安全协议："别慌"。</li>
</ul>
<div class="info">
<strong>M.E.G. 备注：</strong>如果你在某个地方听到或看到"别慌"这个词，它表明你靠近 M.E.G. 设立的安全区域或标记路线。
</div>
        `.trim(),
        footer: "最后编辑：2024-11-10 by Dr. Lin。<br>感谢 Marcus 的实地验证。"
    },

    "level-1": {
        title: "Level 1 - 宜居地带",
        breadcrumb: "首页 > 层级 > Level 1",
        infobox: {
            title: "Level 1",
            subtitle: '"宜居地带"',
            rows: [
                ["生存难度", "等级 1"],
                ["安全？", "大部分安全"],
                ["稳定", "是"],
                ["实体数量", "低"],
            ]
        },
        content: `
<h2>描述</h2>
<p>Level 1 类似于一个大型、照明良好的仓库，地面和墙壁均为混凝土材质。照明由间隔约 15 米的荧光灯管提供。</p>
<p>由于杏仁水的丰富和相对较低的实体数量，这一层级被认为是后室中最安全的层级之一。</p>
<div class="info">
<strong>安全协议：</strong>Level 1 是 M.E.G. 的主要运营枢纽。安全区域的坐标定期更新。当前 Sector 7 访问密码：<em>机密</em>。
</div>
<h2>殖民地与前哨站</h2>
<ul>
<li><strong>M.E.G. 前哨站 "Beta"</strong> - 主要运营基地，人口约 200</li>
<li><strong>"前室研究者"组织</strong> - 小型科研团队，人口约 30</li>
</ul>
<h2>出口</h2>
<ul>
<li>通过地板污渍卡入可到达 Level 2。</li>
<li>找到标有 M.E.G. 符号的门可到达 Level 4。</li>
<li>跟随电线可能到达 Level 3。</li>
</ul>
        `.trim(),
        footer: "最后编辑：2024-11-12 by Marcus。"
    },

    "level-2": {
        title: "Level 2 - 管道之梦",
        breadcrumb: "首页 > 层级 > Level 2",
        infobox: {
            title: "Level 2",
            subtitle: '"管道之梦"',
            rows: [
                ["生存难度", "等级 3"],
                ["安全？", "不安全"],
                ["稳定", "不稳定"],
                ["实体数量", "高"],
            ]
        },
        content: `
<h2>描述</h2>
<p>Level 2 由充满管道和蒸汽的服务隧道网络组成。温度持续偏高，能见度经常因冷凝而降低。</p>
<div class="danger">
<strong>危险：</strong>此层级实体密度较高。已报告有猎犬、微笑者和哀鬼。强烈建议 3 人以上结伴出行。
</div>
<h2>出口</h2>
<ul>
<li>通过墙壁卡入可能到达 Level 1（安全方向）。</li>
<li>找到涂有蓝色油漆的通风管道可到达 Level 3。</li>
<li>沿管道向上游可能到达 Level 4。</li>
</ul>
        `.trim(),
        footer: "最后编辑：2024-10-28 by Dr. Lin。"
    },

    "level-3": {
        title: "Level 3 - 电站",
        breadcrumb: "首页 > 层级 > Level 3",
        infobox: {
            title: "Level 3",
            subtitle: '"电站"',
            rows: [
                ["生存难度", "等级 4"],
                ["安全？", "不安全"],
                ["稳定", "不稳定"],
                ["实体数量", "中等"],
            ]
        },
        content: `
<h2>描述</h2>
<p>Level 3 是一个广泛的电气变电站。区域内布满高压设备，电流的噼啪声持续不断，构成危险环境。</p>
<div class="danger">
<strong>危险：</strong>触碰裸露电线可导致严重受伤或死亡。某些区域已报告电力洪水现象。
</div>
<h2>出口</h2>
<ul>
<li>找到维修门可到达 Level 4。</li>
<li>在变压器站附近卡入可能到达 Level 5。</li>
<li>沿安全电路路径可能到达 Level 1。</li>
</ul>
        `.trim(),
        footer: "最后编辑：2024-11-01 by Marcus。"
    },

    entities: {
        title: "实体列表",
        breadcrumb: "首页 > 实体",
        infobox: null,
        content: `
<h2>分类概述</h2>
<p>实体是后室中发现的生物体。它们从无害到极度危险不等。M.E.G. 维护着一套分类系统，帮助流浪者识别威胁。</p>
<h2>已知实体类型</h2>
<h3>无害实体</h3>
<ul>
<li><strong>团块</strong> - 植物样实体，漫无目的地游荡。不构成威胁。</li>
<li><strong>钝化者</strong> - 灰色人形生物，除非被挑衅否则无视流浪者。</li>
</ul>
<h3>谨慎实体</h3>
<ul>
<li><strong>哀鬼</strong> - 已丧失人性的前流浪者。具有攻击性但行动缓慢。</li>
<li><strong>微笑者</strong> - 黑暗走廊实体，以发光的黄牙和咧嘴笑容为标志。夜间活跃。</li>
</ul>
<h3>敌对实体</h3>
<ul>
<li><strong>猎犬</strong> - 狗形生物，具有极强攻击性。群体活动时极其危险。</li>
<li><strong>面人</strong> - 无面部特征的人形生物。通常温顺但不可预测。</li>
</ul>
<div class="info">
<strong>重要提示：</strong>"别慌"一词与实体遭遇有关。这是 M.E.G. 的安全协议提醒。保持冷静可提高 40% 的生存概率。
</div>
<h2>现实渗透事件</h2>
<div class="warning">
<strong>注意：</strong>罕见报告称，有人声称在"现实世界"中看到过后室特征。此类报告尚未被证实，通常归因于群体性癔症或药物滥用。
</div>
<p>在一例已记录的事件中（事件 #47，2024-11-03），一名中国上海的个体报告持续梦见黄色房间，并在清醒时听到荧光灯的嗡嗡声。该对象被监控但因缺乏确认的后室暴露证据而被释放。</p>
        `.trim(),
        footer: "最后编辑：2024-11-05 by Dr. Lin。"
    },

    meg: {
        title: "M.E.G. - 主要探险组织",
        breadcrumb: "首页 > 组织 > M.E.G.",
        infobox: {
            title: "M.E.G.",
            subtitle: '主要探险组织',
            rows: [
                ["成立", "~2015年（估计）"],
                ["成员", "2,340+"],
                ["总部", "Level 1, Beta 前哨站"],
                ["口号", "别慌"],
                ["状态", "活跃"],
            ]
        },
        content: `
<h2>概述</h2>
<p>主要探险组织（M.E.G.）是在后室中运营的最大、最有组织的探险团体。由一批早期流浪者的集体创立，M.E.G. 维持着殖民地、进行科学研究，并出版后室维基。</p>
<h2>组织结构</h2>
<ul>
<li><strong>指挥部</strong> - 战略规划与协调</li>
<li><strong>勘探部</strong> - 野外行动人员和制图师</li>
<li><strong>医疗部</strong> - 健康服务和实体研究</li>
<li><strong>通讯部</strong> - 信号监测和信息传递</li>
</ul>
<h2>行动</h2>
<p>M.E.G. 在安全层级运营多个前哨站，主要在 Level 1 和 Level 4。其通讯部门维护着一个信号中继网络，用于追踪流浪者的求救信号。</p>
<div class="info">
<strong>信号协议：</strong>求救信号通过后室网络中的隐藏渠道传输。只有 M.E.G. 授权人员才能访问这些渠道。如果你通过这些渠道收到消息，你可能正在与后室内的人交流。
</div>
<h2>知名人员</h2>
<ul>
<li><strong>林医生</strong> - 医疗部，第三勘探队</li>
<li><strong>陈 Marcus</strong> - 勘探部，第七队队长</li>
<li><strong>Admin</strong> - 通讯部，维基维护者</li>
</ul>
        `.trim(),
        footer: "最后编辑：2024-11-08 by Admin。"
    }
};
