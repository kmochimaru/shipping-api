export interface SummaryDoc {
    note?: string;
    total: any;
    discount: any;
    vat: any;
    // Add With InvoicePage
    aftdisc?: any; //after discount ยอดหลังหักส่วนลด
}