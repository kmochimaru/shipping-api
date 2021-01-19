export interface ContactInfo {
    no: string;
    createdDate: Date | string;
    dueDate: Date;
    refNo?: string;
    seller?: string;
    company?: string;
    code?: string;
    name: string;
    address: string;
    email?: string;
    phonenumber: string;
    tin: string;
}