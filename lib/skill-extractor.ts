const skillKeywordMap: Record<string, string[]> = {
  "予算管理": ["予算", "予実", "予算策定", "原価管理"],
  "管理会計": ["管理会計", "FP&A", "KPI", "収益分析"],
  "財務会計": ["財務会計", "決算", "連結", "開示"],
  "業務改善": ["業務改善", "BPR", "オペレーション改善", "効率化"],
  "データ分析": ["SQL", "BI", "Tableau", "データ分析", "可視化"],
  "プロジェクト管理": ["プロジェクト管理", "PMO", "進行管理", "要件定義"]
};

export function extractSkillsFromText(text: string): string[] {
  const normalized = text.toLowerCase();

  return Object.entries(skillKeywordMap)
    .filter(([, keywords]) => keywords.some((k) => normalized.includes(k.toLowerCase())))
    .map(([skill]) => skill);
}

export function getSkillKeywordMap() {
  return skillKeywordMap;
}
