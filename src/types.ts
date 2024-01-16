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