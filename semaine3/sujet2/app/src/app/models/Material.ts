export interface Material {
    _id: string;
    name: string;
    company: {
        _id: string;
        name: string;
    };
    stock: number;
}
