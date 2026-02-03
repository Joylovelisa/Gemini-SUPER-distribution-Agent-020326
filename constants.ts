import { FdaRecord, PainterStyle, Translations } from './types';

export const DEFAULT_DISTRIBUTION_CSV = `SupplierID,Deliverdate,CustomerID,LicenseNo,Category,UDID,DeviceNAME,LotNO,SerNo,Model,Number
B00079,20251107,C05278,衛部醫器輸字第033951號,E.3610植入式心律器之脈搏產生器,00802526576331,“波士頓科技”英吉尼心臟節律器,890057,,L111,1
B00079,20251106,C06030,衛部醫器輸字第033951號,E.3610植入式心律器之脈搏產生器,00802526576331,“波士頓科技”英吉尼心臟節律器,872177,,L111,1
B00079,20251106,C00123,衛部醫器輸字第033951號,E.3610植入式心律器之脈搏產生器,00802526576331,“波士頓科技”英吉尼心臟節律器,889490,,L111,1
B00079,20251105,C06034,衛部醫器輸字第033951號,E.3610植入式心律器之脈搏產生器,00802526576331,“波士頓科技”英吉尼心臟節律器,889253,,L111,1
B00079,20251103,C05363,衛部醫器輸字第029100號,E.3610植入式心律器之脈搏產生器,00802526576461,“波士頓科技”艾科雷心臟節律器,869531,,L311,1
B00079,20251103,C06034,衛部醫器輸字第033951號,E.3610植入式心律器之脈搏產生器,00802526576331,“波士頓科技”英吉尼心臟節律器,889230,,L111,1
B00079,20251103,C05278,衛部醫器輸字第029100號,E.3610植入式心律器之脈搏產生器,00802526576485,“波士頓科技”艾科雷心臟節律器,182310,,L331,1
B00051,20251030,C02822,衛部醫器輸字第028560號,L.5980經陰道骨盆腔器官脫垂治療用手術網片,08437007606478,“尼奧麥迪克”舒兒莉芙特骨盆懸吊系統,CC250520,19,CPS02,1
B00079,20251030,C00123,衛部醫器輸字第033951號,E.3610植入式心律器之脈搏產生器,00802526576324,“波士頓科技”英吉尼心臟節律器,915900,,L110,1
B00051,20251030,C02822,衛部醫器輸字第028560號,L.5980經陰道骨盆腔器官脫垂治療用手術網片,08437007606478,“尼奧麥迪克”舒兒莉芙特骨盆懸吊系統,CC250520,20,CPS02,1
B00051,20251029,C02082,衛部醫器輸字第028560號,L.5980經陰道骨盆腔器官脫垂治療用手術網片,08437007606478,“尼奧麥迪克”舒兒莉芙特骨盆懸吊系統,CC250326,4,CPS02,1
B00051,20251029,C02082,衛部醫器輸字第028560號,L.5980經陰道骨盆腔器官脫垂治療用手術網片,08437007606478,“尼奧麥迪克”舒兒莉芙特骨盆懸吊系統,CC250326,5,CPS02,1
B00209,20251028,C03210,衛部醫器輸字第026988號,L.5980經陰道骨盆腔器官脫垂治療用手術網片,07798121803473,“博美敦”凱莉星脫垂修補系統,,00012150,Calistar S,1
B00051,20251028,C01774,衛部醫器輸字第030820號,L.5980經陰道骨盆腔器官脫垂治療用手術網片,08437007606515,“尼奧麥迪克”蜜普思微創骨盆懸吊系統,MB241203,140,KITMIPS02,1
B00209,20251028,C03210,衛部醫器輸字第026988號,L.5980經陰道骨盆腔器官脫垂治療用手術網片,07798121803473,“博美敦”凱莉星脫垂修補系統,,00012154,Calistar S,1
B00051,20251028,C01773,衛部醫器輸字第028560號,L.5980經陰道骨盆腔器官脫垂治療用手術網片,08437007606478,“尼奧麥迪克”舒兒莉芙特骨盆懸吊系統,CC241128,85,CPS02,1
B00209,20251028,C03210,衛部醫器輸字第026988號,L.5980經陰道骨盆腔器官脫垂治療用手術網片,07798121803473,“博美敦”凱莉星脫垂修補系統,,00012155,Calistar S,1
B00051,20251028,C01774,衛部醫器輸字第030820號,L.5980經陰道骨盆腔器官脫垂治療用手術網片,08437007606515,“尼奧麥迪克”蜜普思微創骨盆懸吊系統,MB241203,142,KITMIPS02,1
B00209,20251028,C03210,衛部醫器輸字第026988號,L.5980經陰道骨盆腔器官脫垂治療用手術網片,07798121803473,“博美敦”凱莉星脫垂修補系統,,00012156,Calistar S,1`;

export const MOCK_DATA: { [key: string]: any[] } = {
  "510k": [
    {
      "k_number": "K240123",
      "decision_date": "2024-02-14",
      "decision": "SESE",
      "device_name": "FlowPilot FP-2 Infusion Pump",
      "applicant": "NorthRiver Devices LLC",
      "manufacturer_name": "NorthRiver Devices LLC",
      "product_code": "FRN",
      "device_class": "II",
      "summary": "Substantial equivalence based on intended use and technological characteristics.",
      "source": "510k"
    },
    {
      "k_number": "K240305",
      "decision_date": "2024-03-27",
      "decision": "SESE",
      "device_name": "StapleWave SW-45 Surgical Stapler",
      "applicant": "BlueWave Surgical Co.",
      "manufacturer_name": "BlueWave Surgical Co.",
      "product_code": "GAG",
      "device_class": "II",
      "summary": "SE determination with design changes in handle ergonomics.",
      "source": "510k"
    },
    {
      "k_number": "K241010",
      "decision_date": "2024-10-02",
      "decision": "SESE",
      "device_name": "OrchiFill Dermal Filler",
      "applicant": "Orchid Aesthetics Corp.",
      "manufacturer_name": "Orchid Aesthetics Corp.",
      "product_code": "LMH",
      "device_class": "III",
      "summary": "SE with emphasis on biocompatibility.",
      "source": "510k"
    }
  ],
  "adr": [
    {
      "adverse_event_id": "MDR-2024-001",
      "report_date": "2024-04-22",
      "event_type": "Malfunction",
      "patient_outcome": "Serious Injury",
      "device_problem": "Misfire / Failure to staple",
      "manufacturer_name": "BlueWave Surgical Co.",
      "brand_name": "StapleWave",
      "narrative": "During surgery, stapler misfired; surgeon used alternative device.",
      "source": "adr"
    },
    {
      "adverse_event_id": "MDR-2024-002",
      "report_date": "2024-03-18",
      "event_type": "Malfunction",
      "patient_outcome": "Hospitalization",
      "device_problem": "Lead fracture",
      "manufacturer_name": "Acme MedTech, Inc.",
      "brand_name": "PulseSure Lead",
      "narrative": "Loss of capture suspected; imaging indicated possible lead integrity issue.",
      "source": "adr"
    }
  ],
  "gudid": [
    {
      "primary_di": "00812345000012",
      "device_description": "Implantable cardiac pulse generator",
      "device_class": "III",
      "manufacturer_name": "Acme MedTech, Inc.",
      "brand_name": "PulseSure",
      "product_code": "DXY",
      "source": "gudid"
    },
    {
      "primary_di": "00777001000018",
      "device_description": "Infusion pump, programmable ambulatory",
      "device_class": "II",
      "manufacturer_name": "NorthRiver Devices LLC",
      "brand_name": "FlowPilot",
      "source": "gudid"
    }
  ],
  "recall": [
    {
      "recall_number": "Z-0421-2024",
      "recall_class": "I",
      "event_date": "2024-04-16",
      "status": "Ongoing",
      "firm_name": "BlueWave Surgical Co.",
      "product_description": "Surgical stapler StapleWave SW-45 may misfire.",
      "reason_for_recall": "Potential for misfire leading to bleeding.",
      "source": "recall"
    },
    {
      "recall_number": "Z-0777-2024",
      "recall_class": "I",
      "event_date": "2024-09-03",
      "status": "Ongoing",
      "firm_name": "Acme MedTech, Inc.",
      "product_description": "PulseSure PS-3000 battery depletion.",
      "reason_for_recall": "Battery depletion could lead to loss of therapy.",
      "source": "recall"
    }
  ]
};

export const PAINTER_STYLES: PainterStyle[] = [
  {
    id: 'van-gogh',
    name: 'Van Gogh',
    colors: {
      bgGradientStart: '#0B1026',
      bgGradientEnd: '#1F3B73',
      glassBg: 'rgba(28, 45, 90, 0.5)',
      glassBorder: 'rgba(243, 207, 85, 0.2)',
      textPrimary: '#F1F5F9',
      textSecondary: '#94A3B8',
      accent: '#F3CF55', // Starry yellow
      accentHover: '#FCD34D',
      chartColors: ['#F3CF55', '#2A4B8C', '#5C82BC', '#9CB3D9']
    },
    pattern: 'radial-gradient(circle at 50% 50%, rgba(243, 207, 85, 0.1) 1px, transparent 1px)'
  },
  {
    id: 'monet',
    name: 'Monet',
    colors: {
      bgGradientStart: '#8DA399',
      bgGradientEnd: '#C5D6D8',
      glassBg: 'rgba(255, 255, 255, 0.25)',
      glassBorder: 'rgba(255, 255, 255, 0.4)',
      textPrimary: '#1C3A35',
      textSecondary: '#4A6662',
      accent: '#E68FAC', // Water lily pink
      accentHover: '#F4A7C2',
      chartColors: ['#E68FAC', '#7BA89E', '#A3C4BC', '#D8E2DC']
    }
  },
  {
    id: 'picasso',
    name: 'Picasso',
    colors: {
      bgGradientStart: '#8C3F23',
      bgGradientEnd: '#D99E6A',
      glassBg: 'rgba(242, 235, 219, 0.2)',
      glassBorder: 'rgba(43, 43, 43, 0.2)',
      textPrimary: '#2B2B2B',
      textSecondary: '#595959',
      accent: '#2B2B2B', // Bold lines
      accentHover: '#000000',
      chartColors: ['#D94A3D', '#2B59C3', '#E6B325', '#2B2B2B']
    },
    fontDisplay: 'Playfair Display'
  },
  {
    id: 'warhol',
    name: 'Warhol',
    colors: {
      bgGradientStart: '#FF007F',
      bgGradientEnd: '#00FFFF',
      glassBg: 'rgba(255, 255, 255, 0.8)',
      glassBorder: 'rgba(0, 0, 0, 1)',
      textPrimary: '#000000',
      textSecondary: '#333333',
      accent: '#FFFF00', // Pop yellow
      accentHover: '#FFE600',
      chartColors: ['#FF007F', '#00FFFF', '#FFFF00', '#000000']
    }
  },
  {
    id: 'dali',
    name: 'Dali',
    colors: {
      bgGradientStart: '#6D4C3D',
      bgGradientEnd: '#C2845B',
      glassBg: 'rgba(135, 206, 235, 0.15)',
      glassBorder: 'rgba(255, 255, 255, 0.2)',
      textPrimary: '#FFFFFF',
      textSecondary: '#E0E0E0',
      accent: '#008CBA', // Sky blue
      accentHover: '#00A3D9',
      chartColors: ['#C2845B', '#008CBA', '#E6C685', '#55392D']
    }
  },
  {
    id: 'mondrian',
    name: 'Mondrian',
    colors: {
      bgGradientStart: '#FFFFFF',
      bgGradientEnd: '#F0F0F0',
      glassBg: 'rgba(255, 255, 255, 0.9)',
      glassBorder: 'rgba(0, 0, 0, 1)',
      textPrimary: '#000000',
      textSecondary: '#444444',
      accent: '#FF0000', // Primary red
      accentHover: '#CC0000',
      chartColors: ['#FF0000', '#0000FF', '#FFFF00', '#000000']
    }
  },
  {
    id: 'klimt',
    name: 'Klimt',
    colors: {
      bgGradientStart: '#2C241B',
      bgGradientEnd: '#4A3B2A',
      glassBg: 'rgba(212, 175, 55, 0.15)', // Gold tint
      glassBorder: 'rgba(212, 175, 55, 0.5)',
      textPrimary: '#F5E6C4',
      textSecondary: '#C5A059',
      accent: '#D4AF37', // Gold
      accentHover: '#EDC959',
      chartColors: ['#D4AF37', '#000000', '#B85C38', '#5E7D73']
    },
    pattern: 'repeating-linear-gradient(45deg, rgba(212, 175, 55, 0.05) 0px, rgba(212, 175, 55, 0.05) 2px, transparent 2px, transparent 10px)'
  },
  {
    id: 'hokusai',
    name: 'Hokusai',
    colors: {
      bgGradientStart: '#1D3B56',
      bgGradientEnd: '#D6DCD9',
      glassBg: 'rgba(255, 250, 240, 0.8)', // Off white paper
      glassBorder: 'rgba(29, 59, 86, 0.3)',
      textPrimary: '#1D3B56', // Prussian blue
      textSecondary: '#5A6E7C',
      accent: '#C14940', // Stamp red
      accentHover: '#D65A50',
      chartColors: ['#1D3B56', '#C14940', '#D6DCD9', '#8596A0']
    }
  },
  {
    id: 'basquiat',
    name: 'Basquiat',
    colors: {
      bgGradientStart: '#111111',
      bgGradientEnd: '#222222',
      glassBg: 'rgba(0, 0, 0, 0.7)',
      glassBorder: 'rgba(255, 255, 255, 0.5)',
      textPrimary: '#FFFFFF',
      textSecondary: '#CCCCCC',
      accent: '#FF3333', // Vivid red
      accentHover: '#FF5555',
      chartColors: ['#FF3333', '#FFFF33', '#33CCFF', '#FFFFFF']
    },
    fontDisplay: 'Playfair Display'
  },
  {
    id: 'da-vinci',
    name: 'Da Vinci',
    colors: {
      bgGradientStart: '#3E2F26', // Deep Sepia
      bgGradientEnd: '#6B5442',
      glassBg: 'rgba(240, 225, 205, 0.1)', // Parchment
      glassBorder: 'rgba(168, 142, 116, 0.4)',
      textPrimary: '#E8DCCA',
      textSecondary: '#A89278',
      accent: '#C27E58', // Sanguine
      accentHover: '#D69572',
      chartColors: ['#C27E58', '#8A6E55', '#E8DCCA', '#3E2F26']
    },
    pattern: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")'
  },
  {
    id: 'matisse',
    name: 'Matisse',
    colors: {
      bgGradientStart: '#00549F', // Deep Blue
      bgGradientEnd: '#F25C05', // Orange
      glassBg: 'rgba(255, 255, 255, 0.9)',
      glassBorder: 'rgba(0, 0, 0, 0.1)',
      textPrimary: '#1A1A1A',
      textSecondary: '#4A4A4A',
      accent: '#009647', // Leaf Green
      accentHover: '#00B355',
      chartColors: ['#F25C05', '#00549F', '#009647', '#E6007E']
    }
  },
  {
    id: 'okeeffe',
    name: 'O\'Keeffe',
    colors: {
      bgGradientStart: '#4A2545',
      bgGradientEnd: '#A84B5B',
      glassBg: 'rgba(255, 235, 238, 0.1)',
      glassBorder: 'rgba(255, 150, 150, 0.3)',
      textPrimary: '#FFF0F5',
      textSecondary: '#E6C6CA',
      accent: '#FF6B6B',
      accentHover: '#FF8787',
      chartColors: ['#A84B5B', '#4A2545', '#FF6B6B', '#F8B195']
    }
  },
  {
    id: 'hopper',
    name: 'Hopper',
    colors: {
      bgGradientStart: '#0D1F18', // Nighthawks Green
      bgGradientEnd: '#1A3C34',
      glassBg: 'rgba(255, 246, 143, 0.05)', // Artificial light
      glassBorder: 'rgba(255, 246, 143, 0.2)',
      textPrimary: '#E0E8E5',
      textSecondary: '#8DA69D',
      accent: '#F4D03F', // Yellow light
      accentHover: '#F7DC6F',
      chartColors: ['#F4D03F', '#0D1F18', '#A93226', '#566573']
    }
  },
  {
    id: 'vermeer',
    name: 'Vermeer',
    colors: {
      bgGradientStart: '#00334E',
      bgGradientEnd: '#145374',
      glassBg: 'rgba(240, 230, 200, 0.15)',
      glassBorder: 'rgba(224, 194, 60, 0.3)',
      textPrimary: '#F7F7F7',
      textSecondary: '#B0C4DE',
      accent: '#E0C23C', // Pearl/Turban Yellow
      accentHover: '#F0D453',
      chartColors: ['#00334E', '#E0C23C', '#556B2F', '#A0522D']
    }
  },
  {
    id: 'munch',
    name: 'Munch',
    colors: {
      bgGradientStart: '#1A1C29',
      bgGradientEnd: '#B34700', // Scream Orange
      glassBg: 'rgba(44, 62, 80, 0.6)',
      glassBorder: 'rgba(255, 127, 80, 0.3)',
      textPrimary: '#ECF0F1',
      textSecondary: '#BDC3C7',
      accent: '#E67E22',
      accentHover: '#D35400',
      chartColors: ['#B34700', '#2C3E50', '#8E44AD', '#F1C40F']
    }
  },
  {
    id: 'pollock',
    name: 'Pollock',
    colors: {
      bgGradientStart: '#DDDDDD',
      bgGradientEnd: '#FFFFFF',
      glassBg: 'rgba(255, 255, 255, 0.95)',
      glassBorder: 'rgba(0,0,0,0.8)',
      textPrimary: '#111111',
      textSecondary: '#555555',
      accent: '#222222',
      accentHover: '#000000',
      chartColors: ['#000000', '#FF0000', '#FFEE00', '#0000FF']
    },
    pattern: 'radial-gradient(circle, #000 10%, transparent 11%), radial-gradient(circle at 40% 40%, #f00 5%, transparent 6%)'
  },
  {
    id: 'kahlo',
    name: 'Kahlo',
    colors: {
      bgGradientStart: '#2E5E4E',
      bgGradientEnd: '#1E3D32',
      glassBg: 'rgba(200, 50, 50, 0.1)',
      glassBorder: 'rgba(50, 200, 100, 0.3)',
      textPrimary: '#FDFDFD',
      textSecondary: '#A8CABA',
      accent: '#D93030', // Red flower
      accentHover: '#E84545',
      chartColors: ['#2E5E4E', '#D93030', '#F2A900', '#8C4B2E']
    }
  },
  {
    id: 'rothko',
    name: 'Rothko',
    colors: {
      bgGradientStart: '#4A0404',
      bgGradientEnd: '#CC4400',
      glassBg: 'rgba(0,0,0,0.2)',
      glassBorder: 'rgba(255,255,255,0.1)',
      textPrimary: '#FFE5D9',
      textSecondary: '#FFBFA6',
      accent: '#FF7F50',
      accentHover: '#FF9F80',
      chartColors: ['#CC4400', '#4A0404', '#D98E04', '#591C0B']
    }
  },
  {
    id: 'lichtenstein',
    name: 'Lichtenstein',
    colors: {
      bgGradientStart: '#FFFFFF',
      bgGradientEnd: '#E6E6E6',
      glassBg: 'rgba(255, 255, 255, 1)',
      glassBorder: 'rgba(0, 0, 0, 1)',
      textPrimary: '#000000',
      textSecondary: '#333333',
      accent: '#E50914',
      accentHover: '#FF2E39',
      chartColors: ['#E50914', '#0047AB', '#FFEF00', '#000000']
    },
    pattern: 'radial-gradient(circle, #000 2px, transparent 2.5px)'
  },
  {
    id: 'tech-noir',
    name: 'Tech Noir',
    colors: {
      bgGradientStart: '#0B1020',
      bgGradientEnd: '#141B33',
      glassBg: 'rgba(28, 38, 69, 0.4)',
      glassBorder: 'rgba(255, 255, 255, 0.08)',
      textPrimary: '#E2E8F0',
      textSecondary: '#94A3B8',
      accent: '#FF7F50',
      accentHover: '#FF6347',
      chartColors: ['#FF7F50', '#7DF9FF', '#F87171', '#6366F1']
    }
  }
];

export const TRANSLATIONS_DICT: Record<string, Translations> = {
  en: {
    title: "Device Related Records & Analytics",
    subtitle: "Search results for:",
    liveDatabase: "Live Database",
    searchPlaceholder: "Search records...",
    keyDistributions: "Key Distributions and Trends",
    recordTypeDist: "Record Type Distribution",
    timeline: "Timeline Overview",
    deviceClass: "Device Class",
    recallSeverity: "Recall Severity",
    decisionCode: "Decision Code Distribution",
    searchResults: "Raw Search Results",
    tabs: {
      all: "All",
      k510: "510(k)",
      recalls: "Recalls",
      adr: "ADR",
      gudid: "GUDID"
    },
    actions: {
      analyze: "Analyze",
      workspace: "Workspace"
    },
    controls: {
      theme: "Theme",
      style: "Style",
      language: "Lang",
      jackpot: "Jackpot"
    },
    distribution: {
      title: "Distribution Analysis",
      inputLabel: "Paste CSV data or use default",
      loadDefault: "Load Default Dataset",
      upload: "Upload CSV/TXT",
      analyze: "Analyze & Visualize",
      instructions: "Analysis Instructions (Optional)",
      summary: "Distribution Summary",
      totalUnits: "Total Units",
      uniqueCustomers: "Unique Customers",
      topModel: "Top Model",
      networkGraph: "Distribution Network Flow",
      followUp: "Follow-up Questions",
      filters: "Filter Data"
    }
  },
  'zh-TW': {
    title: "設備相關記錄與分析",
    subtitle: "搜尋結果：",
    liveDatabase: "即時資料庫",
    searchPlaceholder: "搜尋記錄...",
    keyDistributions: "關鍵分佈與趨勢",
    recordTypeDist: "記錄類型分佈",
    timeline: "時間軸總覽",
    deviceClass: "設備等級",
    recallSeverity: "召回嚴重程度",
    decisionCode: "決策代碼分佈",
    searchResults: "搜尋結果",
    tabs: {
      all: "全部",
      k510: "510(k)",
      recalls: "召回",
      adr: "不良反應",
      gudid: "GUDID"
    },
    actions: {
      analyze: "分析",
      workspace: "工作區"
    },
    controls: {
      theme: "主題",
      style: "風格",
      language: "語言",
      jackpot: "手氣不錯"
    },
    distribution: {
      title: "分銷分析",
      inputLabel: "貼上 CSV 資料或使用預設",
      loadDefault: "載入預設資料集",
      upload: "上傳 CSV/TXT",
      analyze: "分析與視覺化",
      instructions: "分析指令（選填）",
      summary: "分銷摘要",
      totalUnits: "總單位數",
      uniqueCustomers: "唯一客戶數",
      topModel: "熱門型號",
      networkGraph: "分銷網絡流向",
      followUp: "後續問題",
      filters: "篩選資料"
    }
  }
};