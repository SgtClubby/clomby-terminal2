export type Command = {
    name: string;
    component: string;
    description: string;
    type: string;
  };
  
export  type CommandArray = Command[];
  
export  type CommandConfig = {
    [key: string]: string;
};

export type SudoState = {
  setPassword: (password: string) => void;
  setSudo: (bool: boolean) => void;
  setIsSudo: (bool: boolean) => void;
  isSudoMode: boolean;
  sudoPassword: string;
  user: string
};
