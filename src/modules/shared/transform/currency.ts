declare global {
    interface Number {
        currency(): string;
    }
}

Number.prototype.currency = function(): string {
    return Number(this).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export {};