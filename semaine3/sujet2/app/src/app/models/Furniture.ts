import { Material } from "./Material";

export interface Furniture {
    _id: string;
    name: string;
    category: string;
    materials: Material[];
  }
  