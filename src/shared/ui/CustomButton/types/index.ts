export interface IButton {
    type?: "submit" | "reset" | "button" | undefined;
    name?: string;
    variant: "Primary" | "Secondary" | "Without" | "ColorBlue" | "ColorRed" | "Gray";
    width: number;
    text: string;
    height?: number;
    onClick?: () => void;
}
