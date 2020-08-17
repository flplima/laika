export interface NlpResult {
  utterance: string;
  locale: string;
  languageGuessed: boolean,
  localeIso2: string;
  language: string;
  domain: string;
  classifications: Array<{
    label: string;
    value: number;
  }>;
  intent: string,
  score: number,
  entities: Array<{
    type?: string;
    subtype?: string;
    start: number;
    end: number;
    len: number;
    accuracy: number;
    sourceText: string;
    utteranceText: string;
    entity: string;
    resolution: any;
  }>;
  sentiment: {
    score: number;
    comparative: number;
    vote: string;
    numWords: number;
    numHits: number;
    type: string;
    language: string;
  };
  actions: any[];
  srcAnswer?: string;
  answer?: string;
};

export interface TrimEntityOptions {
  between?: string[],
  after?: string,
  afterFirst?: string,
  afterLast?: string,
  before?: string,
  beforeFirst?: string,
  beforeLast?: string,
}