const tickets = [
  {
    tag: "夜班工单 01",
    title: "没有门的房间",
    intro: "客户连续七晚梦见同一间温暖房间。房间里有灯、有床、有窗，却没有门。醒来后客户总觉得自己忘记了某个出口。",
    category: "空间异常",
    solution: "repair",
    preferredReply: "door",
    fragments: [
      { icon: "🛏️", name: "过分整齐的床", clue: "被角每天都折成同一个角度，像有人替客户把休息固定成任务。", zone: "memory" },
      { icon: "🪟", name: "打不开的窗", clue: "窗外是客户小时候的楼道，玻璃上写着“先别出去”。", zone: "anchor" },
      { icon: "💡", name: "不熄灭的台灯", clue: "灯泡没有电线，却在客户想离开时变得更亮。", zone: "anomaly" },
      { icon: "📻", name: "隔墙收音机", clue: "收音机播放客户母亲年轻时常听的晚间节目。", zone: "memory" },
      { icon: "🧱", name: "柔软的墙", clue: "墙面摸起来像棉被，靠近时会让人想继续睡。", zone: "feeling" },
    ],
    treatments: ["repair", "archive", "delete"],
    replies: [
      { id: "door", text: "为房间补回一扇向内开的门，并保留窗外楼道。" },
      { id: "sleep", text: "延长睡眠时长，让客户继续留在房间里休息。" },
      { id: "erase", text: "删除整间房间，防止梦境再次复发。" },
    ],
    success: "你没有拆掉房间，只给它补回一扇门。客户下一晚仍然梦见那盏灯，但这次醒来前，他自己走了出去。",
    fail: "处理偏离了梦的核心。房间短暂消失，随后变成一条更长的走廊，客户醒来时仍然找不到出口。",
  },
  {
    tag: "夜班工单 02",
    title: "总是迟到的婚礼",
    intro: "客户每晚都在赶去一场婚礼。他总能看见礼堂的光，却永远在最后一站下错车。客户说自己并不知道新郎新娘是谁。",
    category: "重复梦",
    solution: "archive",
    preferredReply: "letter",
    fragments: [
      { icon: "🚏", name: "湿掉的站牌", clue: "站牌上所有方向都写着“再等一班”。", zone: "feeling" },
      { icon: "💌", name: "未拆的请柬", clue: "请柬没有姓名，封口处压着一枚旧邮票。", zone: "anchor" },
      { icon: "👞", name: "磨破的皮鞋", clue: "鞋底沾着医院走廊的白色地蜡。", zone: "memory" },
      { icon: "🕰️", name: "倒走的钟", clue: "钟表只在客户靠近礼堂时倒退。", zone: "anomaly" },
      { icon: "🎼", name: "停在前奏的曲谱", clue: "曲谱反复停在入场前四小节。", zone: "feeling" },
    ],
    treatments: ["repair", "archive", "return"],
    replies: [
      { id: "letter", text: "把请柬归档为未送达的告别，而不是失败的赴约。" },
      { id: "route", text: "重算公交线路，让客户准时抵达礼堂。" },
      { id: "alarm", text: "为梦境添加闹钟，提醒客户提前出发。" },
    ],
    success: "你没有强行让客户抵达婚礼，而是把请柬归入告别档案。客户后来梦见礼堂关灯，门口有人替他留了一把伞。",
    fail: "系统把路线改得更精确，客户却仍然迟到。礼堂越来越近，也越来越像一处不该抵达的地方。",
  },
  {
    tag: "夜班工单 03",
    title: "被替换的夏天",
    intro: "客户投诉：最喜欢的童年夏日梦被错误替换成了考试梦。她记得西瓜、凉席和电风扇，却每次醒来都只剩空白试卷。",
    category: "梦境替换",
    solution: "repair",
    preferredReply: "restore",
    fragments: [
      { icon: "🍉", name: "冰镇西瓜", clue: "西瓜只剩中间最甜的一块，被夹在数学卷里。", zone: "memory" },
      { icon: "📝", name: "空白试卷", clue: "试卷没有题目，页脚却印着客户现在的员工编号。", zone: "anomaly" },
      { icon: "🌀", name: "转不动的风扇", clue: "风扇每转半圈，就吹出一句“你应该更努力”。", zone: "feeling" },
      { icon: "🧊", name: "融化的冰格", clue: "冰格里冻着外婆家的门牌号。", zone: "anchor" },
      { icon: "📚", name: "过高的书堆", clue: "书堆挡住窗户，书脊却全是暑假作业封面。", zone: "feeling" },
    ],
    treatments: ["repair", "delete", "archive"],
    replies: [
      { id: "restore", text: "恢复夏日梦主线，只保留一张试卷作为压力来源记录。" },
      { id: "deleteExam", text: "删除所有考试元素，避免客户再次紧张。" },
      { id: "merge", text: "把夏天和考试合并成一场补习梦。" },
    ],
    success: "你恢复了西瓜、凉席和风扇，也留下那张空白试卷。客户说梦里终于有风吹进来，而她没有急着答题。",
    fail: "梦被修得太干净，连夏天也一起变淡。客户醒来后只记得自己好像曾经很热，却说不出为什么快乐。",
  },
  {
    tag: "夜班工单 04",
    title: "十三层电梯",
    intro: "客户梦见自己坐电梯回家，但电梯总会越过真实楼层，停在不存在的十三层。门打开时，走廊里所有门牌都是客户的生日。",
    category: "楼层异常",
    solution: "return",
    preferredReply: "handoff",
    fragments: [
      { icon: "🛗", name: "无按钮电梯", clue: "按钮面板空白，只有客户按下空气时才会亮起。", zone: "anomaly" },
      { icon: "🔢", name: "重复门牌", clue: "门牌全是同一天，但字体来自不同年代。", zone: "memory" },
      { icon: "🔑", name: "弯曲钥匙", clue: "钥匙能打开每扇门，却会在开门后变轻。", zone: "anchor" },
      { icon: "📦", name: "未搬完的纸箱", clue: "纸箱写着“先放这里”，胶带已经老化。", zone: "feeling" },
      { icon: "🪞", name: "没有人的镜子", clue: "镜子照不出客户，只照出一间还没退租的房间。", zone: "anomaly" },
    ],
    treatments: ["return", "repair", "quarantine"],
    replies: [
      { id: "handoff", text: "把十三层退回潜意识转运处，建议客户醒后处理旧住处物品。" },
      { id: "block", text: "封锁十三层，禁止电梯再次停靠。" },
      { id: "home", text: "把十三层改造成客户现在的家。" },
    ],
    success: "你把十三层退回转运处。客户后来整理了旧纸箱，梦里的电梯第一次停在了真实楼层。",
    fail: "十三层被粗暴封锁，电梯开始在十二层和十四层之间震动。客户醒来后更确定有什么东西还没搬走。",
  },
  {
    tag: "夜班工单 05",
    title: "办公室海面",
    intro: "客户的工位每天晚上都会变成一片海。电脑漂在水上，会议邀请像浮标一样排到天边。客户说这不是噩梦，只是太吵。",
    category: "情绪外溢",
    solution: "quarantine",
    preferredReply: "quiet",
    fragments: [
      { icon: "💻", name: "漂浮电脑", clue: "电脑屏幕显示 47 个未读会议邀请。", zone: "memory" },
      { icon: "📅", name: "浮标日历", clue: "每个浮标都写着“可否再同步十分钟”。", zone: "feeling" },
      { icon: "🌊", name: "室内潮汐", clue: "潮水只在客户说“没问题”时上涨。", zone: "anomaly" },
      { icon: "🎧", name: "进水耳机", clue: "耳机里循环播放客户自己的确认声。", zone: "anchor" },
      { icon: "🪑", name: "沉下去的椅子", clue: "椅子沉没前，椅背上浮出“我需要安静”。", zone: "feeling" },
    ],
    treatments: ["quarantine", "repair", "delete"],
    replies: [
      { id: "quiet", text: "隔离过量会议噪声，为梦境保留一段无通知海面。" },
      { id: "drain", text: "抽干海水，让办公室恢复正常。" },
      { id: "mute", text: "删除所有声音，保证客户不会被吵醒。" },
    ],
    success: "你隔离了会议噪声，却没有抽干海。客户下一晚仍在海边办公，但终于听见了真正的安静。",
    fail: "海水被抽走后，会议邀请堆成一座山。客户醒来前一直在爬，醒来后也没有休息过。",
  },
  {
    tag: "夜班工单 06",
    title: "忘记脸的人",
    intro: "客户反复梦见一个背对自己的人。每当那个人快转身，梦就自动断开。客户醒来后会难过，但不知道自己在想念谁。",
    category: "身份缺失",
    solution: "archive",
    preferredReply: "seal",
    fragments: [
      { icon: "🧥", name: "灰色外套", clue: "外套肩线很熟悉，口袋里有两张电影票根。", zone: "memory" },
      { icon: "🚪", name: "半开的门", clue: "门缝里透出的不是光，而是一段没说完的道歉。", zone: "feeling" },
      { icon: "📼", name: "消磁录像", clue: "录像只有背影，声音被客户自己的呼吸覆盖。", zone: "anomaly" },
      { icon: "☕", name: "冷掉的咖啡", clue: "杯底写着一个昵称，但最后一个字被梦境涂掉。", zone: "anchor" },
      { icon: "🧾", name: "未结清账单", clue: "账单金额是零，备注写着“欠一次好好告别”。", zone: "feeling" },
    ],
    treatments: ["archive", "repair", "delete"],
    replies: [
      { id: "seal", text: "加密归档这张脸，只保留背影和告别权限。" },
      { id: "face", text: "强制补全正脸，帮助客户确认身份。" },
      { id: "clear", text: "删除背影，避免客户继续难过。" },
    ],
    success: "你没有替客户补全那张脸。梦境被归档后，客户仍会偶尔难过，但终于知道那是一次告别，而不是故障。",
    fail: "正脸被系统补齐，却像很多人叠在一起。客户醒来后更难过，因为那不是答案，只是拼贴。",
  },
];

const zoneNames = {
  memory: "记忆",
  feeling: "情绪",
  anomaly: "异常",
  anchor: "锚点",
};

const treatmentNames = {
  repair: "修复梦境",
  archive: "归档保留",
  delete: "删除片段",
  return: "退回转运处",
  quarantine: "隔离异常",
};

const state = {
  caseIndex: 0,
  selectedFragment: null,
  selectedTreatment: null,
  selectedReply: null,
  placed: {},
  log: [],
};

const el = {
  caseIndex: document.querySelector("#caseIndex"),
  caseTag: document.querySelector("#caseTag"),
  caseTitle: document.querySelector("#caseTitle"),
  caseIntro: document.querySelector("#caseIntro"),
  meterFill: document.querySelector("#meterFill"),
  meterText: document.querySelector("#meterText"),
  itemsGrid: document.querySelector("#itemsGrid"),
  selectedHint: document.querySelector("#selectedHint"),
  clueLog: document.querySelector("#clueLog"),
  treatments: document.querySelector("#treatments"),
  replies: document.querySelector("#replies"),
  submitBtn: document.querySelector("#submitBtn"),
  resultTitle: document.querySelector("#resultTitle"),
  resultText: document.querySelector("#resultText"),
  resetBtn: document.querySelector("#resetBtn"),
  counts: {
    memory: document.querySelector("#memoryCount"),
    feeling: document.querySelector("#feelingCount"),
    anomaly: document.querySelector("#anomalyCount"),
    anchor: document.querySelector("#anchorCount"),
  },
};

function currentTicket() {
  return tickets[state.caseIndex];
}

function load() {
  const demoState = new URLSearchParams(window.location.search).get("store_state");
  if (demoState) {
    applyDemoState(demoState);
    render();
    return;
  }
  const saved = localStorage.getItem("dream-support-save-v1");
  if (saved) {
    try {
      Object.assign(state, JSON.parse(saved));
    } catch {
      reset();
    }
  }
  render();
}

function applyDemoState(demoState) {
  state.caseIndex = demoState === "result" ? 2 : 0;
  state.selectedFragment = null;
  state.selectedTreatment = null;
  state.selectedReply = null;
  state.placed = {};
  state.log = [];

  const data = currentTicket();
  if (demoState === "core" || demoState === "result") {
    const count = demoState === "core" ? 4 : data.fragments.length;
    data.fragments.slice(0, count).forEach((fragment) => {
      state.placed[fragment.name] = { zone: fragment.zone, correct: true };
      state.log.unshift({
        text: `${fragment.name} 归入「${zoneNames[fragment.zone]}」：${fragment.clue}`,
        correct: true,
      });
    });
  }
  if (demoState === "result") {
    state.selectedTreatment = data.solution;
    state.selectedReply = data.preferredReply;
  }
}

function save() {
  localStorage.setItem("dream-support-save-v1", JSON.stringify(state));
}

function reset() {
  state.caseIndex = 0;
  state.selectedFragment = null;
  state.selectedTreatment = null;
  state.selectedReply = null;
  state.placed = {};
  state.log = [];
  save();
  render();
}

function startTicket(index) {
  state.caseIndex = index;
  state.selectedFragment = null;
  state.selectedTreatment = null;
  state.selectedReply = null;
  state.placed = {};
  state.log = [];
  save();
  render();
}

function placedCount() {
  return Object.keys(state.placed).length;
}

function selectFragment(index) {
  const fragment = currentTicket().fragments[index];
  if (state.placed[fragment.name]) return;
  state.selectedFragment = index;
  save();
  render();
}

function classifySelected(zone) {
  if (state.selectedFragment === null) return;
  const fragment = currentTicket().fragments[state.selectedFragment];
  const correct = fragment.zone === zone;
  state.placed[fragment.name] = { zone, correct };
  state.log.unshift({
    text: `${fragment.name} 归入「${zoneNames[zone]}」：${fragment.clue}`,
    correct,
  });
  state.selectedFragment = null;
  save();
  render();
}

function chooseTreatment(treatment) {
  state.selectedTreatment = treatment;
  save();
  render();
}

function chooseReply(reply) {
  state.selectedReply = reply;
  save();
  render();
}

function submitDecision() {
  const data = currentTicket();
  if (placedCount() < data.fragments.length || !state.selectedTreatment || !state.selectedReply) return;
  const correctFragments = Object.values(state.placed).filter((item) => item.correct).length;
  const solved =
    state.selectedTreatment === data.solution &&
    state.selectedReply === data.preferredReply &&
    correctFragments >= 3;

  el.resultTitle.textContent = solved ? "工单已妥善结案" : "工单需要复核";
  el.resultText.textContent = solved ? data.success : data.fail;
  if (state.caseIndex < tickets.length - 1) {
    el.submitBtn.textContent = "接入下一张工单";
    el.submitBtn.disabled = false;
    el.submitBtn.onclick = () => startTicket(state.caseIndex + 1);
  } else {
    el.submitBtn.textContent = "重新开始夜班";
    el.submitBtn.disabled = false;
    el.submitBtn.onclick = reset;
  }
}

function render() {
  const data = currentTicket();
  const total = data.fragments.length;
  const sorted = placedCount();
  const percent = Math.round((sorted / total) * 100);

  el.caseIndex.textContent = `${state.caseIndex + 1}/${tickets.length}`;
  el.caseTag.textContent = `${data.tag} · ${data.category}`;
  el.caseTitle.textContent = data.title;
  el.caseIntro.textContent = data.intro;
  el.meterFill.style.width = `${percent}%`;
  el.meterText.textContent = `归类 ${sorted}/${total} 个梦境碎片`;

  el.itemsGrid.innerHTML = data.fragments
    .map((fragment, index) => {
      const placed = state.placed[fragment.name];
      const selected = state.selectedFragment === index;
      return `
        <button class="item-card ${placed ? "done" : ""}" type="button" data-item="${index}" aria-pressed="${selected}">
          <span class="item-icon">${fragment.icon}</span>
          <strong>${fragment.name}</strong>
          <small>${placed ? `已归入：${zoneNames[placed.zone]}` : "等待归类"}</small>
        </button>
      `;
    })
    .join("");

  el.itemsGrid.querySelectorAll("[data-item]").forEach((button) => {
    button.addEventListener("click", () => selectFragment(Number(button.dataset.item)));
  });

  for (const zone of Object.keys(zoneNames)) {
    el.counts[zone].textContent = Object.values(state.placed).filter((item) => item.zone === zone).length;
  }

  document.querySelectorAll(".drop-zone").forEach((zone) => {
    zone.classList.toggle("ready", state.selectedFragment !== null);
    zone.onclick = () => classifySelected(zone.dataset.zone);
  });

  el.selectedHint.textContent =
    state.selectedFragment === null ? "尚未选择碎片" : `已选择：${data.fragments[state.selectedFragment].name}`;

  el.clueLog.innerHTML = state.log.length
    ? state.log.map((entry) => `<div class="clue">${entry.text}</div>`).join("")
    : `<div class="clue">耳机里只有夜班电流声。请先从梦境碎片中选择一个异常点。</div>`;

  el.treatments.innerHTML = data.treatments
    .map((treatment) => {
      return `<button class="choice" type="button" data-treatment="${treatment}" aria-pressed="${state.selectedTreatment === treatment}">${treatmentNames[treatment]}</button>`;
    })
    .join("");
  el.treatments.querySelectorAll("[data-treatment]").forEach((button) => {
    button.addEventListener("click", () => chooseTreatment(button.dataset.treatment));
  });

  el.replies.innerHTML = data.replies
    .map((reply) => `<button class="choice" type="button" data-reply="${reply.id}" aria-pressed="${state.selectedReply === reply.id}">${reply.text}</button>`)
    .join("");
  el.replies.querySelectorAll("[data-reply]").forEach((button) => {
    button.addEventListener("click", () => chooseReply(button.dataset.reply));
  });

  el.submitBtn.textContent = "提交工单";
  el.submitBtn.onclick = submitDecision;
  el.submitBtn.disabled = sorted < total || !state.selectedTreatment || !state.selectedReply;

  if (sorted < total) {
    el.resultTitle.textContent = "工单处理中";
    el.resultText.textContent = `还剩 ${total - sorted} 个梦境碎片。先判断它们属于记忆、情绪、异常还是锚点。`;
  } else if (!state.selectedTreatment) {
    el.resultTitle.textContent = "等待处理方案";
    el.resultText.textContent = "碎片已经归档。现在选择要修复、归档、删除、退回或隔离。";
  } else if (!state.selectedReply) {
    el.resultTitle.textContent = "等待客户回复";
    el.resultText.textContent = `已选择「${treatmentNames[state.selectedTreatment]}」。还需要一条合适的结案话术。`;
  } else {
    const reply = data.replies.find((item) => item.id === state.selectedReply)?.text || "";
    el.resultTitle.textContent = "可以提交";
    el.resultText.textContent = `方案：${treatmentNames[state.selectedTreatment]}。回复：${reply}`;
  }
}

el.resetBtn.addEventListener("click", reset);
load();
