export interface ICreateMemoCategoryProps {
    name: string;
    backgroundColor: string;
}
export interface IUpdateMemoCategoryProps {
    id: number;
    name: string;
    backgroundColor: string;
}

export interface IMemoCommonProps {
    onSuccessHandler: () => void;
}