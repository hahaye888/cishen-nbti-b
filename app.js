const STORAGE_KEY = "cishen-nbti-b-progress-v1";
const ACTIVE_QUESTION_COUNT = 12;

const dimensionMeta = {
  speed: { name: "行动速度", left: "先看", right: "先做" },
  resource: { name: "资源态度", left: "即时使用", right: "延迟使用" },
  route: { name: "路线服从", left: "标准答案", right: "个人体感" },
  retry: { name: "失败处理", left: "调整策略", right: "原样再来" },
  info: { name: "信息习惯", left: "概括判断", right: "数据分析" },
  social: { name: "社交需求", left: "独立完成", right: "围观互动" },
  complete: { name: "完成欲", left: "允许未完", right: "必须闭环" },
  risk: { name: "风险感知", left: "稳妥规避", right: "现场试错" },
  style: { name: "审美偏好", left: "实用优先", right: "表达优先" },
  exit: { name: "承诺稳定", left: "说要退出", right: "真能放下" },
};

const questionBank = [
  {
    "id": "q01",
    "pool": "pace",
    "scene": "镖头说“明早鸡叫出发”，镇上的鸡很多。",
    "options": [
      {
        "text": "第一只鸡叫就走",
        "w": {
          "speed": 3,
          "route": -1,
          "risk": 1
        },
        "evidence": "第一声鸡叫响起，你已经把它当成正式发车令"
      },
      {
        "text": "等多数鸡都叫了再出发",
        "w": {
          "speed": -1,
          "info": 2,
          "risk": -1
        },
        "evidence": "出发信号含糊时，你会等更多样本达成共识"
      },
      {
        "text": "去问镖头到底是几点",
        "w": {
          "info": 2,
          "social": 1,
          "route": -1
        },
        "evidence": "江湖暗号可以浪漫，具体时辰必须说清"
      },
      {
        "text": "睡着等队友来叫",
        "w": {
          "speed": -2,
          "social": 1,
          "complete": -1,
          "exit": -1
        },
        "evidence": "只要队伍还记得你，模糊的出发令就不必亲自破解"
      }
    ]
  },
  {
    "id": "q02",
    "pool": "resource",
    "scene": "只剩四张饼，到下一站还要多久没人知道。",
    "options": [
      {
        "text": "现在平均分完",
        "w": {
          "resource": -2,
          "route": -1,
          "risk": -1
        },
        "evidence": "补给到手就先公平落袋，你不把饥饿留给未来"
      },
      {
        "text": "每人半张，剩下的封好",
        "w": {
          "resource": 2,
          "risk": -2,
          "complete": 1
        },
        "evidence": "你会先保证当下，再给未知路程留下余量"
      },
      {
        "text": "让最懂路线的人决定",
        "w": {
          "social": 2,
          "info": 1,
          "resource": 1
        },
        "evidence": "补给怎么分，你更信掌握路况的人"
      },
      {
        "text": "先全部收好，真饿了再开",
        "w": {
          "resource": 3,
          "complete": -1,
          "speed": -1
        },
        "evidence": "只要还能忍，包袱里的资源就仍有继续升值的可能"
      }
    ]
  },
  {
    "id": "q03",
    "pool": "route",
    "scene": "路人送来一张近路地图，上面写着“本人没走过”。",
    "options": [
      {
        "text": "收下地图，照旧走官道",
        "w": {
          "route": -3,
          "risk": -2,
          "resource": 1
        },
        "evidence": "未经验证的近路只能进包袱，不能进路线"
      },
      {
        "text": "先问三个路人这条路通不通",
        "w": {
          "info": 3,
          "social": 1,
          "risk": -1
        },
        "evidence": "陌生路线出现时，你会先把传闻做成交叉验证"
      },
      {
        "text": "先试走一小段，不对就回",
        "w": {
          "route": 2,
          "risk": 1,
          "info": 1
        },
        "evidence": "你愿意用一小段实测，换取路线的真实答案"
      },
      {
        "text": "直接照地图走，近路总得有人开",
        "w": {
          "speed": 2,
          "risk": 3,
          "route": 3
        },
        "evidence": "地图作者没走过不重要，你可以成为第一条实测记录"
      }
    ]
  },
  {
    "id": "q04",
    "pool": "retry",
    "scene": "镖队莫名其妙赢了一仗，没人知道是谁起了作用。",
    "options": [
      {
        "text": "赢了就走，别耽误赶路",
        "w": {
          "speed": 2,
          "info": -2,
          "complete": 1
        },
        "evidence": "结果已经够好时，你不会为解释停下整支队伍"
      },
      {
        "text": "把刚才每一步重新盘一遍",
        "w": {
          "info": 3,
          "complete": 2,
          "retry": -1
        },
        "evidence": "偶然胜利对你不是结算，而是一桩待复盘的案子"
      },
      {
        "text": "下次照原站位再打一遍",
        "w": {
          "retry": 3,
          "route": -1,
          "risk": 1
        },
        "evidence": "没弄懂也不妨碍复现，你相信同一阵势还能再灵一次"
      },
      {
        "text": "只换一个位置，再看结果",
        "w": {
          "route": 2,
          "info": 2,
          "retry": -1
        },
        "evidence": "你会控制变量，让下一仗替上一仗作证"
      }
    ]
  },
  {
    "id": "q05",
    "pool": "resource",
    "scene": "镖局桌上有四样没人认领的东西，只能先拿一件。",
    "options": [
      {
        "text": "路线图",
        "w": {
          "info": 2,
          "route": -1,
          "risk": -1
        },
        "evidence": "你先拿能降低整段路程不确定性的东西"
      },
      {
        "text": "密封干粮",
        "w": {
          "resource": 2,
          "risk": -1,
          "complete": 1
        },
        "evidence": "看不见终点时，耐放的补给最值得占据包袱"
      },
      {
        "text": "没人保养的刀",
        "w": {
          "risk": 2,
          "speed": 1,
          "style": -1
        },
        "evidence": "东西能不能立刻派上用场，比来历是否清楚更重要"
      },
      {
        "text": "写着老张名字的木牌",
        "w": {
          "social": 2,
          "style": 2,
          "info": -1
        },
        "evidence": "四件东西里，你偏偏会被最像故事开头的那件叫住"
      }
    ]
  },
  {
    "id": "q06",
    "pool": "team",
    "scene": "队里多了一个谁都不认识的人，但他走得非常自然。",
    "options": [
      {
        "text": "先看他一路在做什么",
        "w": {
          "info": 2,
          "risk": -1,
          "speed": -1
        },
        "evidence": "陌生人混进队伍，你会先用行为判断他的身份"
      },
      {
        "text": "直接问他是哪一拨的",
        "w": {
          "speed": 2,
          "social": 1,
          "info": 1
        },
        "evidence": "队伍名单有疑点，你习惯当场把问题说开"
      },
      {
        "text": "默认他本来就在，继续赶路",
        "w": {
          "route": 1,
          "risk": 2,
          "info": -1
        },
        "evidence": "只要步伐够自然，你愿意让现场先维持运转"
      },
      {
        "text": "先聊熟，再旁敲侧击",
        "w": {
          "social": 3,
          "style": 1,
          "risk": 1
        },
        "evidence": "确认来路之前，你更擅长先把陌生人聊成自己人"
      }
    ]
  },
  {
    "id": "q07",
    "pool": "info",
    "scene": "茶摊两桌人正压低声音讨论你们这支镖队。",
    "options": [
      {
        "text": "吃完就走，不给他们加戏",
        "w": {
          "speed": 2,
          "info": -2,
          "social": -1
        },
        "evidence": "路边议论不会拖慢你，赶路优先于听完整个故事"
      },
      {
        "text": "坐近一点，顺便听听",
        "w": {
          "info": 2,
          "social": 1,
          "risk": 1
        },
        "evidence": "情报自己送到耳边，你会自然地补齐上下文"
      },
      {
        "text": "直接问他们在说什么",
        "w": {
          "speed": 2,
          "social": 2,
          "info": 1
        },
        "evidence": "与其猜半天，不如把茶摊当成现场问询处"
      },
      {
        "text": "派队里最会聊天的人过去",
        "w": {
          "social": 3,
          "info": 1,
          "speed": -1
        },
        "evidence": "打听消息也讲阵容，你会把任务交给社交主力"
      }
    ]
  },
  {
    "id": "q08",
    "pool": "route",
    "scene": "三个人给出三条路线，而且每个人都很有把握。",
    "options": [
      {
        "text": "选描述最具体的那条",
        "w": {
          "info": 2,
          "route": -1,
          "risk": -1
        },
        "evidence": "意见冲突时，细节最完整的路线先获得你的信任"
      },
      {
        "text": "把三条路线的共同段拼起来",
        "w": {
          "route": 3,
          "info": 2,
          "complete": 1
        },
        "evidence": "别人给三条路，你会尝试组装出第四条"
      },
      {
        "text": "随便走一条，错了再回",
        "w": {
          "route": 2,
          "risk": 2,
          "retry": 2
        },
        "evidence": "路线争不出结果时，你会让实际脚程接管讨论"
      },
      {
        "text": "等到有人不再改口再选",
        "w": {
          "social": 1,
          "risk": -1,
          "speed": -2
        },
        "evidence": "你更相信能经得住反复追问的那个人"
      }
    ]
  },
  {
    "id": "q09",
    "pool": "pace",
    "scene": "遇袭时还没看清对方有多少人。",
    "options": [
      {
        "text": "先找掩体，稳住队形",
        "w": {
          "risk": -3,
          "route": -1,
          "complete": 1
        },
        "evidence": "人数不明时，你会先把最坏结果挡在外面"
      },
      {
        "text": "看队友往哪边动",
        "w": {
          "social": 2,
          "info": 1,
          "speed": -1
        },
        "evidence": "混乱现场里，队友的方向就是你的第一条情报"
      },
      {
        "text": "先冲最近的那个",
        "w": {
          "speed": 3,
          "risk": 3,
          "route": 1
        },
        "evidence": "对面人数还没数完，你已经让最近的人进入战斗"
      },
      {
        "text": "退半步观察再决定",
        "w": {
          "info": 3,
          "risk": -1,
          "speed": -1
        },
        "evidence": "你愿意让出半步距离，换取更完整的战场信息"
      }
    ]
  },
  {
    "id": "q10",
    "pool": "retry",
    "scene": "队友说走完今天就离队。",
    "options": [
      {
        "text": "明天少备他那份干粮",
        "w": {
          "resource": -1,
          "exit": 2,
          "complete": -1
        },
        "evidence": "离队通知一到，你会立刻按新名单安排资源"
      },
      {
        "text": "先听他把原因说完",
        "w": {
          "social": 2,
          "info": 1,
          "risk": -1
        },
        "evidence": "承诺变动之前，你会先确认这是一时情绪还是正式决定"
      },
      {
        "text": "照常给他备一份",
        "w": {
          "complete": 2,
          "exit": -2,
          "resource": 1
        },
        "evidence": "嘴上说离队的人，第二天仍在你的补给名单里"
      },
      {
        "text": "我也离，明早镖局见",
        "w": {
          "exit": -3,
          "retry": 2,
          "social": 1
        },
        "evidence": "你的离队宣言和明早集合，从来不互相冲突"
      }
    ]
  },
  {
    "id": "q11",
    "pool": "info",
    "scene": "包袱里少了一件不值钱的小东西。",
    "options": [
      {
        "text": "不值钱就算了",
        "w": {
          "exit": 3,
          "complete": -3,
          "resource": -1
        },
        "evidence": "损失足够小时，你真的能让事件停在未结案"
      },
      {
        "text": "把库存重新数一遍",
        "w": {
          "info": 3,
          "complete": 2,
          "speed": -1
        },
        "evidence": "少的东西不贵，但账必须先对上"
      },
      {
        "text": "沿路追问谁见过",
        "w": {
          "social": 2,
          "info": 2,
          "complete": 1
        },
        "evidence": "物件可以便宜，线索不能凭空消失"
      },
      {
        "text": "先不声张，观察明天还有没有少",
        "w": {
          "info": 1,
          "speed": -1,
          "risk": -1
        },
        "evidence": "你会把一次异常留在观察名单里，等待第二个样本"
      }
    ]
  },
  {
    "id": "q12",
    "pool": "team",
    "scene": "终点只剩最后一段路，但天已经黑了。",
    "options": [
      {
        "text": "一口气走完再休息",
        "w": {
          "complete": 3,
          "speed": 2,
          "risk": 2
        },
        "evidence": "终点已经看得见，你很难允许进度停在最后一格"
      },
      {
        "text": "先算夜路风险值不值",
        "w": {
          "info": 2,
          "risk": -2,
          "complete": -1
        },
        "evidence": "最后一段也不能免检，你会重新计算整队的风险"
      },
      {
        "text": "嘴上说休息，心里一直惦记",
        "w": {
          "exit": -2,
          "complete": 2,
          "retry": 1
        },
        "evidence": "队伍停下了，你的进度条却仍在黑夜里闪"
      },
      {
        "text": "先庆功，明早再补最后一段",
        "w": {
          "social": 2,
          "complete": -2,
          "style": 1
        },
        "evidence": "只要气氛已经到终点，实际脚程可以明天再结算"
      }
    ]
  },
  {
    "id": "q13",
    "pool": "resource",
    "scene": "路过废弃驿站，四样补给里只能带走一件。",
    "options": [
      {
        "text": "马上补满水囊",
        "w": {
          "resource": -2,
          "risk": -2,
          "speed": 1
        },
        "evidence": "确定能用上的补给，你会在当下直接转化成安全感"
      },
      {
        "text": "带走修车工具，路上可能用得上",
        "w": {
          "resource": 2,
          "info": 1,
          "risk": -1
        },
        "evidence": "你更愿意为未来的故障保留一份处理能力"
      },
      {
        "text": "拿那枚来历不明的旧镖牌",
        "w": {
          "style": 2,
          "route": 1,
          "risk": 1
        },
        "evidence": "实用补给摆在面前，你还是会被最有故事感的东西吸引"
      },
      {
        "text": "什么都不拿，给包袱留位置",
        "w": {
          "exit": 2,
          "resource": 1,
          "complete": -1
        },
        "evidence": "不是每个资源点都必须清空，你能为未知物资保留容量"
      }
    ]
  },
  {
    "id": "q14",
    "pool": "route",
    "scene": "沙尘暴抹掉了路标，只剩三种方向线索。",
    "options": [
      {
        "text": "按罗盘回到官道方向",
        "w": {
          "route": -3,
          "info": 2,
          "risk": -2
        },
        "evidence": "视野再差，你也会先找回可验证的标准路线"
      },
      {
        "text": "跟着最新的马蹄印走",
        "w": {
          "info": 2,
          "risk": 1,
          "route": 1
        },
        "evidence": "你会选择现场最新鲜、最像实证的那条线索"
      },
      {
        "text": "朝远处炊烟走，先找到人",
        "w": {
          "social": 2,
          "route": 2,
          "risk": 1
        },
        "evidence": "地图失效时，你会把有人烟的地方当成新坐标"
      },
      {
        "text": "凭风向选一边，边走边修正",
        "w": {
          "speed": 2,
          "route": 3,
          "risk": 3
        },
        "evidence": "没有路标并不会让你停下，移动本身就是探路"
      }
    ]
  },
  {
    "id": "q15",
    "pool": "pace",
    "scene": "城门还有半分钟关闭，队友却散在三处。",
    "options": [
      {
        "text": "自己先冲过去占住门",
        "w": {
          "speed": 3,
          "risk": 2,
          "social": -1
        },
        "evidence": "倒计时出现时，你会先确保至少有人抵达目标"
      },
      {
        "text": "边喊人边往城门跑",
        "w": {
          "speed": 2,
          "social": 2,
          "complete": 1
        },
        "evidence": "你会同时推进集合与赶路，不愿只保住其中一项"
      },
      {
        "text": "先给守门人打招呼，请他等一下",
        "w": {
          "social": 3,
          "risk": -1,
          "speed": 1
        },
        "evidence": "硬闯之前，你会先试着把系统规则变成人情空间"
      },
      {
        "text": "停下集合，今晚在城外扎营",
        "w": {
          "exit": 2,
          "risk": -3,
          "speed": -1
        },
        "evidence": "门关了不等于任务失败，你能接受整队明天再进"
      }
    ]
  },
  {
    "id": "q16",
    "pool": "team",
    "scene": "临时并进来三辆商队货车，一时没人指挥。",
    "options": [
      {
        "text": "按货物轻重先排一个顺序",
        "w": {
          "speed": 2,
          "complete": 2,
          "social": 1
        },
        "evidence": "队伍卡住时，你会先给出一套能运行的临时秩序"
      },
      {
        "text": "问清每个车夫最熟哪段路",
        "w": {
          "info": 2,
          "social": 3,
          "speed": -1
        },
        "evidence": "接管陌生队伍前，你习惯先盘清每个人的能力"
      },
      {
        "text": "抽签定前后，按统一规则走",
        "w": {
          "route": -2,
          "social": 1,
          "risk": -1
        },
        "evidence": "意见不统一时，你会用公平规则迅速结束争执"
      },
      {
        "text": "先带最靠前那辆动起来",
        "w": {
          "speed": 2,
          "complete": 1,
          "social": -1
        },
        "evidence": "比起主持会议，你更愿意先让一辆车产生进度"
      }
    ]
  },
  {
    "id": "q17",
    "pool": "retry",
    "scene": "套马绳第一次甩空了。",
    "options": [
      {
        "text": "调整距离和角度再来",
        "w": {
          "retry": -2,
          "info": 1,
          "speed": 1
        },
        "evidence": "第一次落空后，你会立刻修改下一次的出手条件"
      },
      {
        "text": "原样再甩一次，刚才只是手滑",
        "w": {
          "retry": 3,
          "risk": 1,
          "complete": 1
        },
        "evidence": "同一招没中，你愿意先把它解释成一次偶然"
      },
      {
        "text": "换个队友试试",
        "w": {
          "social": 2,
          "retry": -1,
          "speed": 1
        },
        "evidence": "个人操作卡住时，你会迅速切换队伍资源"
      },
      {
        "text": "先停下检查绳结和马势",
        "w": {
          "info": 3,
          "risk": -2,
          "speed": -1
        },
        "evidence": "继续出手前，你会先确认问题究竟在工具还是目标"
      }
    ]
  },
  {
    "id": "q18",
    "pool": "info",
    "scene": "货箱封条裂了一道缝，但清单上的东西似乎都在。",
    "options": [
      {
        "text": "东西没少就继续走",
        "w": {
          "speed": 2,
          "info": -2,
          "complete": -1
        },
        "evidence": "结果看起来正常时，你不会让一道裂缝拖慢行程"
      },
      {
        "text": "拍下封条，重新登记一遍",
        "w": {
          "info": 3,
          "complete": 2,
          "speed": -1
        },
        "evidence": "货物未少不代表事件结束，记录必须先补全"
      },
      {
        "text": "问一圈谁碰过这只箱子",
        "w": {
          "social": 2,
          "info": 2,
          "risk": -1
        },
        "evidence": "封条异常时，你会先沿着人员接触线排查"
      },
      {
        "text": "重新封好，下一站再检查",
        "w": {
          "risk": -1,
          "complete": 1,
          "info": 1
        },
        "evidence": "你会先恢复安全状态，再用后续节点验证是否持续异常"
      }
    ]
  },
  {
    "id": "q19",
    "pool": "route",
    "scene": "三位向导给出的路线耗时差不多。",
    "options": [
      {
        "text": "选讲得最具体的那位",
        "w": {
          "info": 2,
          "route": -1,
          "risk": -1
        },
        "evidence": "路线成本接近时，细节完整度替你做最后选择"
      },
      {
        "text": "拼出三条路线的共同段",
        "w": {
          "route": 3,
          "info": 2,
          "complete": 1
        },
        "evidence": "向导给答案，你负责把答案改造成自己的版本"
      },
      {
        "text": "跟最熟当地人情的那位",
        "w": {
          "social": 2,
          "route": 1,
          "style": 1
        },
        "evidence": "你相信路线之外的人情信息也能决定整段行程"
      },
      {
        "text": "抛枚铜钱，定了就走",
        "w": {
          "speed": 2,
          "risk": 2,
          "route": 2
        },
        "evidence": "选择差不多时，你宁愿把时间用在真正赶路上"
      }
    ]
  },
  {
    "id": "q20",
    "pool": "pace",
    "scene": "守夜交班时间到了，下一班的人迟迟没来。",
    "options": [
      {
        "text": "继续守到他出现",
        "w": {
          "complete": 2,
          "exit": -3,
          "risk": -1
        },
        "evidence": "交接没有闭环，你很难真的离开岗位"
      },
      {
        "text": "去把他叫醒再交班",
        "w": {
          "speed": 2,
          "social": 1,
          "complete": 1
        },
        "evidence": "该来的人没来，你会直接推进交接动作"
      },
      {
        "text": "先确认排班是不是记错了",
        "w": {
          "info": 3,
          "risk": -1,
          "speed": -1
        },
        "evidence": "找人之前，你会先排除自己读错规则的可能"
      },
      {
        "text": "到点就走，按排班各负其责",
        "w": {
          "exit": 3,
          "complete": -2,
          "route": -1
        },
        "evidence": "自己的时段结束后，你能把责任清楚地交回系统"
      }
    ]
  },
  {
    "id": "q21",
    "pool": "info",
    "scene": "收到一封四页密信，没有标题，也没人说明重点。",
    "options": [
      {
        "text": "从头到尾读完",
        "w": {
          "info": 2,
          "complete": 3,
          "social": -1
        },
        "evidence": "没有摘要也不妨碍你把整封密信完整跑一遍"
      },
      {
        "text": "先问送信人到底急不急",
        "w": {
          "social": 2,
          "speed": 2,
          "info": -1
        },
        "evidence": "投入时间之前，你会先确认这封信的真实优先级"
      },
      {
        "text": "先按人名和时间整理线索",
        "w": {
          "info": 3,
          "route": -1,
          "complete": 1
        },
        "evidence": "信息太散时，你会主动把它改造成可以追查的结构"
      },
      {
        "text": "先看朱批和盖章，抓大概意思",
        "w": {
          "style": 2,
          "info": -2,
          "speed": 1
        },
        "evidence": "四页字太多，你更擅长从视觉重点里抓结论"
      }
    ]
  },
  {
    "id": "q22",
    "pool": "resource",
    "scene": "整支镖队只有一支求援响箭，前路还有三天。",
    "options": [
      {
        "text": "第一次遇到险情就用",
        "w": {
          "resource": -2,
          "risk": -3,
          "speed": 1
        },
        "evidence": "安全信号能解决当下问题，你不会为了未来硬省"
      },
      {
        "text": "先查沿途哪里能补充响箭",
        "w": {
          "info": 3,
          "resource": 1,
          "speed": -1
        },
        "evidence": "使用稀缺资源前，你会先调查是否存在补给节点"
      },
      {
        "text": "不到最后一天绝不动",
        "w": {
          "resource": 3,
          "risk": 1,
          "complete": 1
        },
        "evidence": "一次性资源必须留给你认定的最高价值时刻"
      },
      {
        "text": "交给镖头决定什么时候用",
        "w": {
          "social": 2,
          "route": -2,
          "risk": -1
        },
        "evidence": "关系整队安全的资源，你愿意服从明确的指挥权"
      }
    ]
  },
  {
    "id": "q23",
    "pool": "team",
    "scene": "两面镖旗都能用，出发前只能挂一面。",
    "options": [
      {
        "text": "选远处最容易看清的",
        "w": {
          "info": 2,
          "style": -3,
          "risk": -1
        },
        "evidence": "镖旗首先是识别工具，实用性会替你裁决"
      },
      {
        "text": "选画得最有气势的",
        "w": {
          "style": 3,
          "route": 1,
          "speed": 1
        },
        "evidence": "两面旗都合格时，你会让队伍的第一印象决定胜负"
      },
      {
        "text": "让全队举手投票",
        "w": {
          "social": 3,
          "style": 1,
          "speed": -1
        },
        "evidence": "队伍门面难分高下，你会把决定变成集体事件"
      },
      {
        "text": "抛铜钱定一面，马上升旗",
        "w": {
          "speed": 3,
          "risk": 1,
          "info": -1
        },
        "evidence": "选择本身不值得耽误出发，你会用随机快速收尾"
      }
    ]
  },
  {
    "id": "q24",
    "pool": "retry",
    "scene": "赶在封路前过桥，吊桥却卡在半空。",
    "options": [
      {
        "text": "先等一会儿，看机关会不会自己落下",
        "w": {
          "retry": 2,
          "risk": -2,
          "complete": 2
        },
        "evidence": "只差最后一点时，你愿意先相信原来的进程能恢复"
      },
      {
        "text": "把机关拉回原位，重新放桥",
        "w": {
          "retry": -3,
          "info": 1,
          "risk": 1
        },
        "evidence": "旧进程卡死后，你会果断重置再来"
      },
      {
        "text": "改走旁边的绳索便桥",
        "w": {
          "route": 3,
          "speed": 2,
          "complete": 2
        },
        "evidence": "目标是按时过河，眼前这座桥并不是唯一答案"
      },
      {
        "text": "先派人通知前站，再继续排查",
        "w": {
          "social": 2,
          "info": 1,
          "risk": -1
        },
        "evidence": "截止时间逼近时，你会先同步现场再处理故障"
      }
    ]
  }
];

const questionById = new Map(questionBank.map((item) => [item.id, item]));

const bonusChoices = [
  "经历很多但拒绝细说",
  "很圆，看起来好相处",
  "方得过于努力",
  "拒绝占用石头编制"
];

const results = [
  {
    "id": "harvester",
    "name": "老莫",
    "archetype": "驿站钉子户",
    "character": "./assets/result-characters/harvester.webp",
    "tagline": "镖可以晚到，队里的人必须一个不少。",
    "final": "你不抢着出头，只会默默把水、路和退路都算好；等别人发现时，整支队伍早被你兜住了。",
    "symptoms": [
      "沿途领取",
      "驿站停靠",
      "挂机补给"
    ],
    "cta": "进《次神》，看看下一站又落了什么",
    "profile": {
      "speed": -1,
      "resource": -2,
      "complete": 1,
      "risk": -1,
      "info": -1
    }
  },
  {
    "id": "red-dot",
    "name": "竖",
    "archetype": "悬赏哪有往哪钻",
    "character": "./assets/result-characters/red-dot.webp",
    "tagline": "别人追进度，你追的是一件必须亲手结清的旧账。",
    "final": "一旦目标被你钉上，红点不消、旧账不清，系统下线也拦不住你。",
    "symptoms": [
      "悬赏清空",
      "奖励全领",
      "活动巡查"
    ],
    "cta": "进《次神》，把今天的悬赏一张张揭完",
    "profile": {
      "speed": 1,
      "resource": -1,
      "info": 1,
      "complete": 3,
      "exit": -1
    }
  },
  {
    "id": "hoarder",
    "name": "常贵人",
    "archetype": "包袱守财奴",
    "character": "./assets/result-characters/hoarder.webp",
    "tagline": "安全感不在心里，在包袱最底下那格库存里。",
    "final": "你相信世上没有废资源，只有暂时没轮到的宝贝；镖车超载不是问题，放下一件才是。",
    "symptoms": [
      "补给囤积",
      "材料保管",
      "长期养成"
    ],
    "cta": "进《次神》，确认包袱还能不能再塞一点",
    "profile": {
      "speed": -1,
      "resource": 3,
      "risk": -2,
      "complete": 1,
      "info": 1
    }
  },
  {
    "id": "stitcher",
    "name": "刀马",
    "archetype": "野路子带队人",
    "character": "./assets/result-characters/stitcher.webp",
    "tagline": "路书只负责指方向，怎么活着到达由你决定。",
    "final": "你不迷信标准路线，能走、能打、能带人回来就是好路线；至于计划，通常在出发之后补。",
    "symptoms": [
      "野路搭配",
      "非标带队",
      "现场改道"
    ],
    "cta": "进《次神》，让实战判断你到底会不会带路",
    "profile": {
      "speed": 1,
      "route": 3,
      "risk": 2,
      "style": 1,
      "info": 1
    }
  },
  {
    "id": "guide-rebel",
    "name": "知世郎",
    "archetype": "路书逆子",
    "character": "./assets/result-characters/guide-rebel.webp",
    "tagline": "别人照着规则赶路，你先研究规则能不能掀了。",
    "final": "你读懂路书不是为了服从，而是为了找出哪一页最值得撕；队伍可能跟不上，但时代会被你拖着走。",
    "symptoms": [
      "冷门路线",
      "路书反读",
      "逆版本培养"
    ],
    "cta": "进《次神》，给路书补一页你的实测批注",
    "profile": {
      "speed": 0,
      "route": 3,
      "risk": 1,
      "info": 2,
      "style": 2
    }
  },
  {
    "id": "quitter",
    "name": "阿育娅",
    "archetype": "离队申请常客",
    "character": "./assets/result-characters/quitter.webp",
    "tagline": "离队的话说得很重，回头救人的脚步更快。",
    "final": "你情绪上来时真想把队伍扔在原地，可一听见有人出事，第一个折返的还是你。",
    "symptoms": [
      "每日离队",
      "准时归队",
      "版本回流"
    ],
    "cta": "进《次神》，提交今天这份正式离队申请",
    "profile": {
      "speed": -1,
      "resource": 1,
      "retry": 1,
      "complete": 2,
      "exit": -3
    }
  },
  {
    "id": "guild-roamer",
    "name": "燕子娘",
    "archetype": "茶摊情报头子",
    "character": "./assets/result-characters/guild-roamer.webp",
    "tagline": "路线图会过期，人情和消息不会。",
    "final": "你走到哪都能把陌生人聊成情报点；镖局还在问路时，你已经知道前面谁撒谎、谁欠茶钱。",
    "symptoms": [
      "茶摊驻点",
      "队友情报",
      "全服听风"
    ],
    "cta": "进《次神》，确认镖局今天又发生了什么",
    "profile": {
      "speed": 0,
      "info": 1,
      "social": 3,
      "complete": -1,
      "style": 1
    }
  },
  {
    "id": "reloader",
    "name": "裴行俨",
    "archetype": "原地劫匪劝退员",
    "character": "./assets/result-characters/reloader.webp",
    "tagline": "一次没打穿就再来一次，直到对面先怀疑人生。",
    "final": "你把失败理解成对手尚未充分认识你；策略可以晚点改，下一轮必须先开。",
    "symptoms": [
      "原地重试",
      "反复验证",
      "不服再来"
    ],
    "cta": "进《次神》，再给对面一次主动撤退的机会",
    "profile": {
      "speed": 1,
      "retry": 3,
      "info": -1,
      "complete": 2,
      "risk": 1
    }
  },
  {
    "id": "forensic",
    "name": "谛听",
    "archetype": "镖局账房仵作",
    "character": "./assets/result-characters/forensic.webp",
    "tagline": "别人看见打完了，你听见线索才刚开始说话。",
    "final": "脚印、伤口、路线和异常都得对上；队伍已经庆功，你还在给战场做审计。",
    "symptoms": [
      "伤害查账",
      "战斗复盘",
      "阵容研究"
    ],
    "cta": "进《次神》，给下一场战斗做账房取证",
    "profile": {
      "speed": -1,
      "route": -1,
      "retry": -1,
      "info": 3,
      "complete": 2,
      "risk": -1
    }
  },
  {
    "id": "brute",
    "name": "阿罗汉",
    "archetype": "闭眼开路哥",
    "character": "./assets/result-characters/brute.webp",
    "tagline": "门打不开就别研究门，先研究墙能不能倒。",
    "final": "你解决问题的方法通常很短：确认方向，然后用力量删掉障碍；地图没看完不要紧，路已经被你打出来了。",
    "symptoms": [
      "快速开路",
      "先走再看",
      "即时应战"
    ],
    "cta": "进《次神》，先开一局再研究地图画了什么",
    "profile": {
      "speed": 3,
      "route": 1,
      "info": -2,
      "complete": 1,
      "risk": 3
    }
  },
  {
    "id": "mystic",
    "name": "小七",
    "archetype": "黄历型镖师",
    "character": "./assets/result-characters/mystic.webp",
    "tagline": "数到约定的数字，危险最好自己消失。",
    "final": "你不是迷信，只是相信熟悉的仪式能让混乱变得可等；只要数还没完，这局就不能判输。",
    "symptoms": [
      "择时出发",
      "仪式开局",
      "玄学调队"
    ],
    "cta": "进《次神》，换个时辰验证本局运势",
    "profile": {
      "speed": 0,
      "route": 1,
      "retry": 2,
      "info": -3,
      "risk": 1,
      "style": 1
    }
  },
  {
    "id": "looks-master",
    "name": "胭脂刀",
    "archetype": "镖队选美掌门",
    "character": "./assets/result-characters/looks-master.webp",
    "tagline": "胜负可以晚点结算，出场不能没有记忆点。",
    "final": "强度会被版本改写，风格却会留下；别人配阵容看数值，你先确认这支队伍像不像一张海报。",
    "symptoms": [
      "角色收集",
      "联动时装",
      "队伍合影"
    ],
    "cta": "进《次神》，让审美接管下一支镖队",
    "profile": {
      "speed": 0,
      "route": 1,
      "info": -1,
      "social": 1,
      "style": 3
    }
  }
];

const app = document.querySelector("#app");
const headerMeta = document.querySelector("#header-meta");
const toast = document.querySelector("#toast");
const modalRoot = document.querySelector("#modal-root");
const brandHome = document.querySelector("#brand-home");

let state = loadState();
let activeQuestions = resolveQuestions(state.questionIds);
let currentIndex = firstUnansweredIndex();
let currentView = "intro";
let isAdvancing = false;
let toastTimer;
let previousFocus;

saveState();

function randomIndex(upperBound) {
  if (globalThis.crypto?.getRandomValues) {
    const values = new Uint32Array(1);
    globalThis.crypto.getRandomValues(values);
    return values[0] % upperBound;
  }
  return Math.floor(Math.random() * upperBound);
}

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = randomIndex(index + 1);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function selectQuestionIds() {
  const pools = ["pace", "resource", "route", "retry", "info", "team"];
  const questionsPerPool = ACTIVE_QUESTION_COUNT / pools.length;
  const selected = pools.flatMap((pool) => {
    const candidates = questionBank.filter((question) => question.pool === pool);
    return shuffle(candidates).slice(0, questionsPerPool);
  });
  return shuffle(selected).map((question) => question.id);
}

function isValidQuestionSet(questionIds) {
  return Array.isArray(questionIds)
    && questionIds.length === ACTIVE_QUESTION_COUNT
    && new Set(questionIds).size === ACTIVE_QUESTION_COUNT
    && questionIds.every((questionId) => questionById.has(questionId));
}

function resolveQuestions(questionIds) {
  return questionIds.map((questionId) => questionById.get(questionId));
}

function emptyState() {
  return {
    questionIds: selectQuestionIds(),
    answers: Array(ACTIVE_QUESTION_COUNT).fill(null),
    bonus: null,
  };
}

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!stored || !isValidQuestionSet(stored.questionIds) || !Array.isArray(stored.answers) || stored.answers.length !== ACTIVE_QUESTION_COUNT) {
      return emptyState();
    }
    return {
      questionIds: stored.questionIds,
      answers: stored.answers.map((value) => (Number.isInteger(value) && value >= 0 && value < 4 ? value : null)),
      bonus: Number.isInteger(stored.bonus) && stored.bonus >= 0 && stored.bonus < 4 ? stored.bonus : null,
    };
  } catch {
    return emptyState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function firstUnansweredIndex() {
  const index = state.answers.findIndex((answer) => answer === null);
  return index === -1 ? ACTIVE_QUESTION_COUNT - 1 : index;
}

function answeredCount() {
  return state.answers.filter((answer) => answer !== null).length;
}

function refreshIcons() {
  if (window.lucide?.createIcons) {
    window.lucide.createIcons({ attrs: { "aria-hidden": "true" } });
  }
}

function focusApp() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  window.setTimeout(() => app.focus({ preventScroll: true }), 30);
}

function updateHeader(type, index = 0) {
  if (type === "question") {
    headerMeta.innerHTML = `
      <span>${String(index + 1).padStart(2, "0")} / 12</span>
      <span class="mini-progress" aria-hidden="true">
        ${activeQuestions.map((_, step) => `<span class="${step <= index ? "done" : ""}"></span>`).join("")}
      </span>`;
    return;
  }
  if (type === "bonus") {
    headerMeta.innerHTML = `<span>彩蛋题 · 不计分</span>`;
    return;
  }
  if (type === "result") {
    headerMeta.innerHTML = `<span>鉴定完成</span>`;
    return;
  }
  headerMeta.innerHTML = `<span>12 题 · 约 60 秒</span>`;
}

function renderIntro() {
  currentView = "intro";
  updateHeader("intro");
  const count = answeredCount();
  const hasCompleteResult = count === activeQuestions.length && state.bonus !== null;
  const buttonLabel = hasCompleteResult ? "查看上次镖局判词" : count > 0 ? "继续走镖" : "入队验明身份";
  const icon = hasCompleteResult ? "scan-search" : count > 0 ? "play" : "arrow-right";

  app.innerHTML = `
    <section class="view intro-view" aria-labelledby="intro-title">
      <div class="intro-copy">
        <h1 id="intro-title">这趟镖，<span>你是来干什么的？</span></h1>
        <p class="intro-lede">刀马和阿育娅已经上路，镖队还缺一个人。从 24 道走镖题中随机抽取 12 道，看看你混进镖队到底有没有正经工作。</p>
        <ul class="test-facts" aria-label="测试信息">
          <li>24 道走镖题 · 随机 12 题</li>
          <li>60–90 秒</li>
          <li>12 种镖队分工</li>
        </ul>
        <div class="button-row">
          <button class="primary-button" id="start-test" type="button">
            ${buttonLabel}<i data-lucide="${icon}"></i>
          </button>
          ${count > 0 ? `<button class="secondary-button" id="restart-test" type="button"><i data-lucide="rotate-ccw"></i>重新抽签</button>` : ""}
        </div>
        ${count > 0 && !hasCompleteResult ? `<p class="resume-note">已保留 ${count} / 12 道回答</p>` : ""}
      </div>
      <div class="identity-visual" aria-label="十二型玩家人格图谱">
        <picture class="identity-art">
          <source media="(max-width: 680px)" srcset="./assets/collab-escort-mobile.webp" />
          <img src="./assets/collab-escort-desktop.webp" alt="黑红剪影山谷中，次神与镖人联动角色护送镖车前行" />
        </picture>
        <div class="visual-stamp" aria-hidden="true">草台镖队<br />验明正身</div>
      </div>
    </section>`;

  document.querySelector("#start-test").addEventListener("click", () => {
    if (hasCompleteResult) {
      renderResult();
      return;
    }
    currentIndex = firstUnansweredIndex();
    renderQuestion();
  });
  document.querySelector("#restart-test")?.addEventListener("click", restartTest);
  refreshIcons();
}

function renderQuestion() {
  currentView = "question";
  updateHeader("question", currentIndex);
  const question = activeQuestions[currentIndex];
  const selected = state.answers[currentIndex];

  app.innerHTML = `
    <section class="view question-view" aria-labelledby="question-title">
      <aside class="question-rail" aria-label="测试进度">
        <strong>${String(currentIndex + 1).padStart(2, "0")}<span class="sr-only">题</span></strong>
        <p>镖队行为勘验记录<br />B 版联动题组</p>
        <div class="step-list" aria-hidden="true">
          ${activeQuestions.map((_, step) => {
            const classes = [state.answers[step] !== null ? "done" : "", step === currentIndex ? "current" : ""].filter(Boolean).join(" ");
            return `<span class="${classes}"></span>`;
          }).join("")}
        </div>
      </aside>
      <div class="question-panel">
        <p class="question-number">ESCORT CHECK / ${String(currentIndex + 1).padStart(2, "0")}</p>
        <h2 id="question-title">${question.scene}</h2>
        <div class="option-list" role="radiogroup" aria-labelledby="question-title">
          ${question.options.map((option, optionIndex) => `
            <button
              class="option-button ${selected === optionIndex ? "selected" : ""}"
              type="button"
              role="radio"
              aria-checked="${selected === optionIndex}"
              data-option="${optionIndex}"
            >
              <span class="option-key">${String.fromCharCode(65 + optionIndex)}</span>
              <span class="option-copy">${option.text}</span>
              <span class="option-check"><i data-lucide="check"></i></span>
            </button>`).join("")}
        </div>
        <div class="question-actions">
          <button class="text-button" id="back-question" type="button">
            <i data-lucide="arrow-left"></i>${currentIndex === 0 ? "返回首页" : "上一题"}
          </button>
          <span class="result-id">AUTO SAVE</span>
        </div>
      </div>
    </section>`;

  document.querySelectorAll("[data-option]").forEach((button) => {
    button.addEventListener("click", () => selectAnswer(Number(button.dataset.option)));
  });
  document.querySelector("#back-question").addEventListener("click", () => {
    if (isAdvancing) return;
    if (currentIndex === 0) {
      renderIntro();
      return;
    }
    currentIndex -= 1;
    renderQuestion();
    focusApp();
  });
  refreshIcons();
}

function selectAnswer(optionIndex) {
  if (isAdvancing) return;
  isAdvancing = true;
  state.answers[currentIndex] = optionIndex;
  saveState();
  renderQuestion();

  window.setTimeout(() => {
    if (currentIndex < activeQuestions.length - 1) {
      currentIndex += 1;
      renderQuestion();
    } else {
      renderBonus();
    }
    isAdvancing = false;
    focusApp();
  }, 180);
}

function renderBonus() {
  currentView = "bonus";
  updateHeader("bonus");
  app.innerHTML = `
    <section class="view question-view" aria-labelledby="bonus-title">
      <aside class="question-rail" aria-label="彩蛋题">
        <strong>+</strong>
        <p>随队石头抽签<br />不参与主结果计分</p>
        <div class="step-list" aria-hidden="true">
          ${activeQuestions.map(() => `<span class="done"></span>`).join("")}
        </div>
      </aside>
      <div class="question-panel">
        <p class="question-number">BONUS CHECK / 不计分</p>
        <h2 id="bonus-title">从四块石头里选一块随队。</h2>
        <div class="option-list" role="radiogroup" aria-labelledby="bonus-title">
          ${bonusChoices.map((choice, index) => `
            <button
              class="option-button ${state.bonus === index ? "selected" : ""}"
              type="button"
              role="radio"
              aria-checked="${state.bonus === index}"
              data-bonus="${index}"
            >
              <span class="option-key">${String.fromCharCode(65 + index)}</span>
              <span class="option-copy">${choice}</span>
              <span class="option-check"><i data-lucide="check"></i></span>
            </button>`).join("")}
        </div>
        <div class="question-actions">
          <button class="text-button" id="bonus-back" type="button"><i data-lucide="arrow-left"></i>上一题</button>
          <span class="result-id">NO SCORE</span>
        </div>
      </div>
    </section>`;

  document.querySelectorAll("[data-bonus]").forEach((button) => {
    button.addEventListener("click", () => {
      if (isAdvancing) return;
      isAdvancing = true;
      state.bonus = Number(button.dataset.bonus);
      saveState();
      renderBonus();
      window.setTimeout(() => {
        isAdvancing = false;
        renderResult({ reveal: true });
        focusApp();
      }, 220);
    });
  });
  document.querySelector("#bonus-back").addEventListener("click", () => {
    if (isAdvancing) return;
    currentIndex = activeQuestions.length - 1;
    renderQuestion();
    focusApp();
  });
  refreshIcons();
}

function getDimensionScores() {
  const scores = Object.fromEntries(Object.keys(dimensionMeta).map((key) => [key, 0]));
  state.answers.forEach((answer, questionIndex) => {
    if (answer === null) return;
    const options = activeQuestions[questionIndex].options;
    Object.keys(dimensionMeta).forEach((key) => {
      const values = options.map((option) => option.w[key] || 0);
      const average = values.reduce((sum, value) => sum + value, 0) / values.length;
      scores[key] += values[answer] - average;
    });
  });
  return scores;
}

function normalizeDimensionScores(scores) {
  const ranges = Object.fromEntries(
    Object.keys(dimensionMeta).map((key) => [key, { positive: 0, negative: 0 }]),
  );

  activeQuestions.forEach((question) => {
    Object.keys(dimensionMeta).forEach((key) => {
      const values = question.options.map((option) => option.w[key] || 0);
      const average = values.reduce((sum, value) => sum + value, 0) / values.length;
      const centered = values.map((value) => value - average);
      ranges[key].positive += Math.max(0, ...centered);
      ranges[key].negative += Math.abs(Math.min(0, ...centered));
    });
  });

  return Object.fromEntries(
    Object.entries(scores).map(([key, value]) => {
      const limit = value >= 0 ? ranges[key].positive : ranges[key].negative;
      return [key, limit ? value / limit : 0];
    }),
  );
}

function getAnswerForQuestion(questionId) {
  const questionIndex = state.questionIds.indexOf(questionId);
  return questionIndex >= 0 ? state.answers[questionIndex] : null;
}

function calculateResult() {
  const scores = getDimensionScores();
  const normalizedScores = normalizeDimensionScores(scores);
  const answerHash = state.answers.reduce((hash, answer, index) => {
    const questionNumber = Number.parseInt(state.questionIds[index].slice(1), 10);
    return (Math.imul(hash, 33) ^ Math.imul(answer + 1, questionNumber + 7)) >>> 0;
  }, 2166136261);
  const userNorm = Math.sqrt(Object.values(normalizedScores).reduce((sum, value) => sum + value ** 2, 0)) || 1;
  const resultCalibration = {
    harvester: -0.02,
    "red-dot": 0.08,
    hoarder: -0.12,
    stitcher: 0.07,
    "guide-rebel": 0.07,
    quitter: -0.05,
    "guild-roamer": 0.04,
    reloader: -0.02,
    forensic: 0.01,
    brute: 0.02,
    mystic: 0.05,
    "looks-master": -0.05,
  };

  const ranked = results.map((result, resultIndex) => {
    const profileEntries = Object.entries(result.profile);
    const profileNorm = Math.sqrt(profileEntries.reduce((sum, [, value]) => sum + value ** 2, 0)) || 1;
    let match = profileEntries.reduce(
      (sum, [key, weight]) => sum + normalizedScores[key] * weight,
      0,
    ) / (userNorm * profileNorm);
    match += resultCalibration[result.id] || 0;

    if (result.id === "reloader" && getAnswerForQuestion("q17") === 1) match += 0.1;
    if (result.id === "brute" && getAnswerForQuestion("q09") === 2) match += 0.08;
    if (result.id === "forensic" && getAnswerForQuestion("q11") === 1) match += 0.08;
    if (result.id === "guide-rebel" && getAnswerForQuestion("q03") === 2) match += 0.07;
    if (result.id === "quitter" && getAnswerForQuestion("q10") === 3) match += 0.1;
    if (result.id === "guild-roamer" && [1, 2, 3].includes(getAnswerForQuestion("q07"))) match += 0.07;
    if (result.id === "looks-master" && [1, 2].includes(getAnswerForQuestion("q23"))) match += 0.1;
    if (result.id === "hoarder" && [1, 3].includes(getAnswerForQuestion("q02"))) match += 0.07;
    if (result.id === "harvester" && getAnswerForQuestion("q13") === 0) match += 0.07;
    if (result.id === "red-dot" && getAnswerForQuestion("q12") === 0) match += 0.08;

    match += ((answerHash >>> (resultIndex % 16)) & 3) * 0.0001;
    return { result, match };
  });

  ranked.sort((a, b) => b.match - a.match);
  const supportedWinner = ranked.find(({ result }) => {
    const alignedEvidenceCount = state.answers.reduce((count, answer, questionIndex) => {
      const option = activeQuestions[questionIndex].options[answer];
      const alignment = Object.entries(option.w).reduce(
        (sum, [key, value]) => sum + value * (result.profile[key] || 0),
        0,
      );
      return count + (alignment > 0 ? 1 : 0);
    }, 0);
    return alignedEvidenceCount >= 2;
  });
  return { result: (supportedWinner || ranked[0]).result, scores, normalizedScores, answerHash };
}

function getEvidence(result) {
  const ranked = state.answers
    .map((answer, questionIndex) => {
      const option = activeQuestions[questionIndex].options[answer];
      const alignment = Object.entries(option.w).reduce(
        (sum, [key, value]) => sum + value * (result.profile[key] || 0),
        0,
      );
      const relevance = Object.entries(option.w).reduce(
        (sum, [key, value]) => sum + Math.abs(value * (result.profile[key] || 0)),
        0,
      );
      return { text: option.evidence, alignment, relevance, questionIndex };
    })
    .sort((a, b) => b.alignment - a.alignment || b.relevance - a.relevance || a.questionIndex - b.questionIndex);

  const aligned = ranked.filter((item) => item.alignment > 0);
  return (aligned.length >= 2 ? aligned : ranked).slice(0, 2);
}

function getResultId(result, answerHash) {
  const typeIndex = results.findIndex((item) => item.id === result.id) + 1;
  return `BJ-${String(typeIndex).padStart(2, "0")}-${answerHash.toString(16).slice(-4).toUpperCase()}`;
}

function renderResult({ reveal = false } = {}) {
  if (answeredCount() !== activeQuestions.length) {
    currentIndex = firstUnansweredIndex();
    renderQuestion();
    return;
  }

  currentView = "result";
  updateHeader("result");
  const { result, normalizedScores, answerHash } = calculateResult();
  const evidence = getEvidence(result);
  const resultId = getResultId(result, answerHash);
  const shouldReveal = reveal
    && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dimensions = Object.entries(normalizedScores)
    .sort(([, a], [, b]) => Math.abs(b) - Math.abs(a))
    .slice(0, 5);

  app.innerHTML = `
    <section class="view result-view ${shouldReveal ? "is-revealing" : ""}" aria-labelledby="result-title">
      ${shouldReveal ? `
        <div class="result-reveal" aria-hidden="true">
          <div class="reveal-status">FINAL VERDICT · ANALYZING</div>
          <div class="reveal-sun"></div>
          <div class="reveal-eclipse"></div>
          <div class="reveal-halo"></div>
          <div class="reveal-flash"></div>
          ${Array.from({ length: 12 }, (_, index) => `
            <span class="reveal-particle reveal-particle-${index + 1} ${index % 2 ? "red" : ""}"></span>
          `).join("")}
          <div class="reveal-verdict">
            <span class="reveal-seal">判</span>
            <small>镖局分工 / ESCORT TYPE</small>
            <strong>${result.name}</strong>
            <span>${result.tagline}</span>
          </div>
        </div>
      ` : ""}
      <div class="result-grid">
        <article class="result-card">
          <div class="result-card-top">
            <span>草台镖队入队判词</span>
            <span class="result-id">${resultId}</span>
          </div>
          <div class="result-identity">
            <div class="result-copy">
              <p class="result-label">镖局分工</p>
              <p class="result-archetype">${result.archetype}</p>
              <h1 id="result-title">${result.name}</h1>
            </div>
            <div class="result-character" aria-hidden="true">
              <img src="${result.character}" alt="" />
            </div>
          </div>
          <p class="result-tagline">${result.tagline}</p>
          <div class="evidence-block" aria-label="镖局发现">
            ${evidence.map((item, index) => `
              <div class="evidence-item">
                <strong>${index + 1}</strong>
                <span>${item.text}</span>
              </div>`).join("")}
          </div>
          <div class="symptom-list" aria-label="押镖症状">
            ${result.symptoms.map((symptom) => `<span>${symptom}</span>`).join("")}
            <span>随队石：${bonusChoices[state.bonus ?? 0]}</span>
          </div>
        </article>

        <div class="result-side">
          <section class="diagnosis-panel" aria-labelledby="diagnosis-title">
            <h2 id="diagnosis-title">押镖倾向</h2>
            <div class="dimension-list">
              ${dimensions.map(([key, value]) => {
                const meta = dimensionMeta[key];
                const percent = Math.max(8, Math.min(92, 50 + value * 42));
                const tendency = Math.abs(value) < 0.08 ? "相对均衡" : value >= 0 ? meta.right : meta.left;
                return `
                  <div class="dimension-row">
                    <div class="dimension-meta"><strong>${meta.name}</strong><span>${tendency}</span></div>
                    <div class="dimension-track" aria-label="${meta.name}：${tendency}"><span style="width:${percent}%"></span></div>
                  </div>`;
              }).join("")}
            </div>
          </section>

          <section class="cta-panel" aria-labelledby="cta-title">
            <h2 id="cta-title">网页验明正身，轮到实战押镖。</h2>
            <p>${result.final}</p>
            <button class="primary-button" id="game-cta" type="button">
              ${result.cta}<i data-lucide="arrow-up-right"></i>
            </button>
          </section>
        </div>
      </div>

      <div class="result-actions" aria-label="结果操作">
        <button class="secondary-button" id="share-result" type="button"><i data-lucide="share-2"></i>分享判词</button>
        <button class="secondary-button" id="download-result" type="button"><i data-lucide="download"></i>保存入队牌</button>
        <button class="secondary-button" id="restart-result" type="button"><i data-lucide="rotate-ccw"></i>换支镖队</button>
      </div>
    </section>`;

  document.querySelector("#game-cta").addEventListener("click", () => openCtaModal(result, resultId));
  document.querySelector("#share-result").addEventListener("click", () => shareResult(result));
  document.querySelector("#download-result").addEventListener("click", () => downloadResultCard(result, evidence, resultId));
  document.querySelector("#restart-result").addEventListener("click", restartTest);

  if (shouldReveal) {
    const revealLayer = document.querySelector(".result-reveal");
    let revealFinished = false;
    const finishReveal = () => {
      if (revealFinished) return;
      revealFinished = true;
      document.querySelector(".result-view")?.classList.remove("is-revealing");
      revealLayer?.remove();
    };
    revealLayer?.addEventListener("animationend", (event) => {
      if (event.target === revealLayer && event.animationName === "revealExit") {
        finishReveal();
      }
    });
    window.setTimeout(finishReveal, 2800);
  }

  refreshIcons();
}

function openCtaModal(result, resultId) {
  previousFocus = document.activeElement;
  const code = `${resultId}-${result.id.toUpperCase()}`;
  modalRoot.innerHTML = `
    <div class="modal-backdrop" id="modal-backdrop">
      <section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header class="modal-header">
          <h2 id="modal-title">实机押镖路引已签发</h2>
          <button class="icon-button" id="close-modal" type="button" aria-label="关闭"><i data-lucide="x"></i></button>
        </header>
        <div class="modal-body">
          <p>带着这份镖局判词进入《次神：光之觉醒》，让一场真实战斗判断你到底是不是“${result.name}”。</p>
          <div class="diagnosis-code" aria-label="实机押镖路引">${code}</div>
          <div class="button-row">
            <button class="primary-button" id="copy-code" type="button"><i data-lucide="copy"></i>复制押镖路引</button>
            <button class="secondary-button" id="modal-download" type="button"><i data-lucide="download"></i>保存入队牌</button>
          </div>
        </div>
      </section>
    </div>`;

  const closeModal = () => {
    modalRoot.innerHTML = "";
    document.removeEventListener("keydown", onEscape);
    previousFocus?.focus();
  };
  const onEscape = (event) => {
    if (event.key === "Escape") closeModal();
  };

  document.querySelector("#close-modal").addEventListener("click", closeModal);
  document.querySelector("#modal-backdrop").addEventListener("click", (event) => {
    if (event.target.id === "modal-backdrop") closeModal();
  });
  document.querySelector("#copy-code").addEventListener("click", async () => {
    await copyText(code);
    showToast("押镖路引已复制");
  });
  document.querySelector("#modal-download").addEventListener("click", () => {
    const evidence = getEvidence(result);
    downloadResultCard(result, evidence, resultId);
  });
  document.addEventListener("keydown", onEscape);
  refreshIcons();
  document.querySelector("#close-modal").focus();
}

async function shareResult(result) {
  const text = `经镖局鉴定，我是【${result.name}】｜${result.archetype}。${result.tagline} 这趟镖你又是谁？`;
  if (navigator.share) {
    try {
      await navigator.share({ title: "次神 × 镖人 · 草台镖队人格", text });
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }
  await copyText(text);
  showToast("分享文案已复制");
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2200);
}

function downloadResultCard(result, evidence, resultId) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1440;
  const ctx = canvas.getContext("2d");
  const font = '"Microsoft YaHei", "PingFang SC", Arial, sans-serif';

  ctx.fillStyle = "#f3e6c4";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#c18b36";
  ctx.fillRect(0, 0, canvas.width, 42);
  ctx.fillStyle = "#a52c24";
  ctx.fillRect(0, 42, 210, 1398);
  ctx.strokeStyle = "#191713";
  ctx.lineWidth = 8;
  ctx.strokeRect(34, 34, 1012, 1372);

  ctx.save();
  ctx.translate(105, 720);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = "#191713";
  ctx.font = `900 34px ${font}`;
  ctx.textAlign = "center";
  ctx.fillText("次神 × 镖人 · 草台镖队鉴定", 0, 12);
  ctx.restore();

  ctx.fillStyle = "#191713";
  ctx.textAlign = "left";
  ctx.font = `800 26px ${font}`;
  ctx.fillText("镖局分工 / ESCORT TYPE", 270, 150);
  ctx.fillStyle = "#766b58";
  ctx.font = `700 22px Consolas, monospace`;
  ctx.fillText(resultId, 270, 198);

  ctx.fillStyle = "#a52c24";
  ctx.font = `800 24px ${font}`;
  ctx.fillText(`${result.archetype}`, 270, 270);

  ctx.fillStyle = "#191713";
  ctx.font = `900 98px ${font}`;
  drawWrappedText(ctx, result.name, 270, 350, 700, 118);

  ctx.fillStyle = "#a52c24";
  ctx.font = `900 40px ${font}`;
  drawWrappedText(ctx, result.tagline, 270, 535, 690, 60);

  ctx.strokeStyle = "#191713";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(270, 700);
  ctx.lineTo(960, 700);
  ctx.stroke();

  ctx.fillStyle = "#191713";
  ctx.font = `800 27px ${font}`;
  ctx.fillText("镖局发现", 270, 760);
  ctx.font = `600 25px ${font}`;
  drawWrappedText(ctx, `01  ${evidence[0].text}`, 270, 825, 680, 44);
  drawWrappedText(ctx, `02  ${evidence[1].text}`, 270, 945, 680, 44);

  ctx.fillStyle = "#2d6d61";
  ctx.fillRect(270, 1090, 690, 116);
  ctx.fillStyle = "#191713";
  ctx.font = `800 24px ${font}`;
  drawWrappedText(ctx, result.final, 300, 1135, 630, 38);

  ctx.fillStyle = "#191713";
  ctx.font = `800 21px ${font}`;
  ctx.fillText(`随队石头：${bonusChoices[state.bonus ?? 0]}`, 270, 1302);
  ctx.fillStyle = "#766b58";
  ctx.font = `600 18px ${font}`;
  ctx.fillText("本测试不影响镖局录用，因为镖局可能根本不会录用你。", 270, 1352);

  const link = document.createElement("a");
  link.download = `次神镖人联动-${result.name}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
  showToast("结果卡已生成");
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
  const lines = [];
  let current = "";
  for (const char of text) {
    const candidate = current + char;
    if (ctx.measureText(candidate).width > maxWidth && current) {
      lines.push(current);
      current = char;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  lines.forEach((line, index) => ctx.fillText(line, x, y + index * lineHeight));
}

function restartTest() {
  state = emptyState();
  activeQuestions = resolveQuestions(state.questionIds);
  saveState();
  currentIndex = 0;
  renderQuestion();
  focusApp();
}

brandHome.addEventListener("click", () => {
  if (currentView === "intro") return;
  renderIntro();
  focusApp();
});

document.addEventListener("keydown", (event) => {
  if (currentView !== "question" || isAdvancing || event.altKey || event.ctrlKey || event.metaKey) return;
  const optionIndex = ["1", "2", "3", "4"].indexOf(event.key);
  if (optionIndex >= 0) selectAnswer(optionIndex);
});

renderIntro();
