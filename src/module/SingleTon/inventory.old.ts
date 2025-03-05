
// Problem: Multiple inventory instances causing data inconsistency
export class Inventory {
    private items: Map<string, number>;
    private prices: Map<string, number>;

    constructor() {
        // Each instance maintains its own separate inventory data
        this.items = new Map<string, number>();
        this.prices = new Map<string, number>();
        console.log("New inventory system created");
    }

    addItem(name: string, quantity: number, price: number): void {
        this.items.set(name, (this.items.get(name) || 0) + quantity);
        this.prices.set(name, price);
    }

    sellItem(name: string, quantity: number): boolean {
        const currentQuantity = this.items.get(name) || 0;
        if (currentQuantity < quantity) {
            console.log(`Not enough ${name} in stock!`);
            return false;
        }

        this.items.set(name, currentQuantity - quantity);
        return true;
    }

    getStockCount(name: string): number {
        return this.items.get(name) || 0;
    }

    getPrice(name: string): number {
        return this.prices.get(name) || 0;
    }
}

/* 
Problem scenario:
- Multiple parts of the application create their own inventory instances
- No synchronization between these instances
- Cash register system has different inventory data than the stock management system

const registerSystem = new Inventory();
registerSystem.addItem("Apple", 50, 1.5);

// Meanwhile, in another part of the application...
const stockSystem = new Inventory(); // Creates a completely separate inventory!
stockSystem.addItem("Orange", 30, 2.0);

// These instances don't share data - the register doesn't know about oranges
console.log(registerSystem.getStockCount("Orange")); // Returns 0

// And the stock system doesn't know about apples
console.log(stockSystem.getStockCount("Apple")); // Returns 0

// This leads to data inconsistency and incorrect stock calculations
*/