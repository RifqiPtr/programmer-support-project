export interface ArticleList {
    id: number;
    by?: string;
    descendants?: number;
    kids?: [];
    score?: number;
    text?: string;
    time: number;
    title: string;
    type?: string;
    timeConverter?: string;
}

export interface ArticleDetail{
    id: number;
    by?: string;
    kids?: [];
    parent?: number;
    text?: string;
    time: number;
    type?: string;
    timeConverter?: string;
}