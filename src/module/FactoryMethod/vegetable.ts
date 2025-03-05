// Abstract Product
abstract class Produce {
    constructor(
        public readonly name: string, 
        public readonly price: number, 
        public readonly category: string,
        public readonly organic: boolean = false
    ) {}
    
    abstract getDescription(): string;
}

// Concrete Products
class LeafyGreen extends Produce {
    getDescription(): string {
        const organicLabel = this.organic ? "Organic " : "";
        return `${organicLabel}${this.name}: Fresh leafy green vegetable ($${this.price.toFixed(2)})`;
    }
}

class Cruciferous extends Produce {
    getDescription(): string {
        const organicLabel = this.organic ? "Organic " : "";
        return `${organicLabel}${this.name}: Nutrient-dense cruciferous vegetable ($${this.price.toFixed(2)})`;
    }
}

class RootVegetable extends Produce {
    getDescription(): string {
        const organicLabel = this.organic ? "Organic " : "";
        return `${organicLabel}${this.name}: Hearty root vegetable ($${this.price.toFixed(2)})`;
    }
}

class FruitProduce extends Produce {
    getDescription(): string {
        const organicLabel = this.organic ? "Organic " : "";
        return `${organicLabel}${this.name}: Sweet and fresh fruit ($${this.price.toFixed(2)})`;
    }
}

// Abstract Creator
export abstract class ProduceFactory {
    abstract createProduce(name: string, price: number, organic: boolean): Produce;
    
    // This is a template method that uses the factory method
    getProduce(name: string, price: number, organic: boolean = false): Produce {
        const produce = this.createProduce(name, price, organic);
        console.log(`Created: ${produce.getDescription()}`);
        return produce;
    }
}

// Concrete Creators
export class LeafyGreenFactory extends ProduceFactory {
    createProduce(name: string, price: number, organic: boolean): Produce {
        return new LeafyGreen(name, price, 'leafy green', organic);
    }
}

export class CruciferousFactory extends ProduceFactory {
    createProduce(name: string, price: number, organic: boolean): Produce {
        return new Cruciferous(name, price, 'cruciferous', organic);
    }
}

export class RootVegetableFactory extends ProduceFactory {
    createProduce(name: string, price: number, organic: boolean): Produce {
        return new RootVegetable(name, price, 'root', organic);
    }
}

export class FruitFactory extends ProduceFactory {
    createProduce(name: string, price: number, organic: boolean): Produce {
        return new FruitProduce(name, price, 'fruit', organic);
    }
}

/* 
Benefits of Factory Method pattern:
1. Each produce type is encapsulated in its own class
2. Adding new produce types doesn't require modifying existing code - just add a new class
3. No complex conditional logic, making code more maintainable
4. Variations (organic/conventional) are handled through parameters, not separate conditions
5. Easy to add new attributes or behavior to specific produce types

// Usage example:
const leafyFactory = new LeafyGreenFactory();
const spinach = leafyFactory.getProduce('Spinach', 3.99, false);
const organicSpinach = leafyFactory.getProduce('Spinach', 5.99, true);

const fruitFactory = new FruitFactory();
const apple = fruitFactory.getProduce('Apple', 0.99);
const organicApple = fruitFactory.getProduce('Apple', 1.99, true);
*/

