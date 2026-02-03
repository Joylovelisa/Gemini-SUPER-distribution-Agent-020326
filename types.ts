export interface FdaRecord {
  // Common fields
  id?: string;
  device_name?: string;
  applicant?: string;
  manufacturer_name?: string;
  product_code?: string;
  device_class?: string;
  
  // 510k specific
  k_number?: string;
  decision_date?: string;
  decision?: string;
  summary?: string;

  // ADR specific
  adverse_event_id?: string;
  report_date?: string;
  event_type?: string;
  patient_outcome?: string;
  device_problem?: string;
  narrative?: string;

  // Recall specific
  recall_number?: string;
  recall_class?: string;
  reason_for_recall?: string;
  status?: string;
  product_description?: string;

  // GUDID specific
  primary_di?: string;
  brand_name?: string;
  device_description?: string;
  
  // Internal
  source: '510k' | 'adr' | 'recall' | 'gudid';
}

export interface DistributionRecord {
  SupplierID: string;
  Deliverdate: string;
  CustomerID: string;
  LicenseNo: string;
  Category: string;
  UDID: string;
  DeviceNAME: string;
  LotNO: string;
  SerNo: string;
  Model: string;
  Number: number;
}

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'zh-TW';

export interface PainterStyle {
  id: string;
  name: string;
  colors: {
    bgGradientStart: string;
    bgGradientEnd: string;
    glassBg: string;
    glassBorder: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    accentHover: string;
    chartColors: string[];
  };
  fontDisplay?: string;
  pattern?: string;
}

export interface Translations {
  title: string;
  subtitle: string;
  liveDatabase: string;
  searchPlaceholder: string;
  keyDistributions: string;
  recordTypeDist: string;
  timeline: string;
  deviceClass: string;
  recallSeverity: string;
  decisionCode: string;
  searchResults: string;
  tabs: {
    all: string;
    k510: string;
    recalls: string;
    adr: string;
    gudid: string;
  };
  actions: {
    analyze: string;
    workspace: string;
  };
  controls: {
    theme: string;
    style: string;
    language: string;
    jackpot: string;
  };
  distribution: {
    title: string;
    inputLabel: string;
    loadDefault: string;
    upload: string;
    analyze: string;
    instructions: string;
    summary: string;
    totalUnits: string;
    uniqueCustomers: string;
    topModel: string;
    networkGraph: string;
    followUp: string;
    filters: string;
  }
}