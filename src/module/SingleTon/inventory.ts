
// Solution: Singleton pattern ensures only one inventory exists
export class Inventory {
  private static instance: Inventory | null = null;
  private items: Map<string, number>;
  private prices: Map<string, number>;

  private constructor() {
    // Private constructor prevents direct instantiation
    this.items = new Map<string, number>();
    this.prices = new Map<string, number>();
    console.log("Inventory system initialized");
  }

  public static getInstance(): Inventory {
    // Create the instance only if it doesn't exist
    if (!Inventory.instance) {
      Inventory.instance = new Inventory();
    }
    return Inventory.instance;
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

  getAllItems(): Array<[string, number]> {
    return Array.from(this.items.entries());
  }
}

/* 
Solution benefits:
- Single source of truth for inventory data
- All systems work with the same inventory instance
- No possibility of data desynchronization

// Usage across different app components:
const registerSystem = Inventory.getInstance();
registerSystem.addItem("Apple", 50, 1.5);

// In another part of the application:
const stockSystem = Inventory.getInstance(); // Gets the SAME instance!
stockSystem.addItem("Orange", 30, 2.0);

// Both systems see the complete inventory
console.log(registerSystem.getStockCount("Orange")); // Returns 30
console.log(stockSystem.getStockCount("Apple")); // Returns 50

// Changes made in one place are visible everywhere
*/
