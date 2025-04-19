export interface Key {
    id: string;
    orgId: string;
    name: string;
    type: string;
    visibility?: boolean;
    value?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface KeyCreate {
    name: string;
    type: string;
    value: string;
    description?: string;
    orgId?: string;
}