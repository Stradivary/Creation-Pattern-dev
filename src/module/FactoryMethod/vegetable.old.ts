// Direct creation of produce items without Factory Method pattern
export class Produce {
    name: string;
    price: number;
    category: string;
    organic: boolean;

    constructor(name: string, price: number, category: string, organic: boolean = false) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.organic = organic;
    }

    getDescription(): string {
        const organicLabel = this.organic ? "organic " : "";
        return `${organicLabel}${this.name} (${this.category})`;
    }
}

export class ProduceManager {
    // Hard-coded creation logic with many if-else statements
    createProduce(type: string): Produce {
        // Problem: Complex conditional logic that's difficult to maintain
        if (type === 'spinach') {
            return new Produce('Spinach', 3.99, 'leafy green', false);
        } else if (type === 'organic_spinach') {
            return new Produce('Spinach', 5.99, 'leafy green', true);
        } else if (type === 'kale') {
            return new Produce('Kale', 4.50, 'leafy green', false);
        } else if (type === 'organic_kale') {
            return new Produce('Kale', 6.50, 'leafy green', true);
        } else if (type === 'broccoli') {
            return new Produce('Broccoli', 2.99, 'cruciferous', false);
        } else if (type === 'organic_broccoli') {
            return new Produce('Broccoli', 4.99, 'cruciferous', true);
        } else if (type === 'carrot') {
            return new Produce('Carrot', 1.99, 'root', false);
        } else if (type === 'organic_carrot') {
            return new Produce('Carrot', 3.50, 'root', true);
        } else if (type === 'apple') {
            return new Produce('Apple', 0.99, 'fruit', false);
        } else if (type === 'organic_apple') {
            return new Produce('Apple', 1.99, 'fruit', true);
        } else {
            return new Produce('Unknown', 0, 'unknown', false);
        }
    }
}

/* 
Problems with this approach:
1. Code duplication in produce creation
2. Adding new produce types requires modifying existing code - violating Open/Closed Principle
3. Complex conditional logic is difficult to maintain
4. Creating different variations (organic/conventional) doubles the number of conditions
5. Hard to add new attributes or variation types

// Usage example:
const manager = new ProduceManager();
const spinach = manager.createProduce('spinach');
const organicApple = manager.createProduce('organic_apple');
*/

