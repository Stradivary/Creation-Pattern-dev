// Direct class implementations without Abstract Factory pattern - PROBLEMATIC APPROACH
// Fruit Products without proper interfaces
export class Apple {
    type: string = "regular";
    price: number = 0.99;

    planting(): string {
        return 'Growing regular apple trees';
    }

    getDescription(): string {
        return `Regular apple: $${this.price} each`;
    }
}

export class OrganicApple {
    type: string = "organic";
    price: number = 1.99;

    planting(): string {
        return 'Growing organic apple trees without pesticides';
    }

    getDescription(): string {
        return `Organic apple: $${this.price} each`;
    }
}

export class Melon {
    type: string = "regular";
    price: number = 3.99;

    planting(): string {
        return 'Growing regular melons';
    }

    getDescription(): string {
        return `Regular melon: $${this.price} each`;
    }
}

export class OrganicMelon {
    type: string = "organic";
    price: number = 6.99;

    planting(): string {
        return 'Growing organic melons without pesticides';
    }

    getDescription(): string {
        return `Organic melon: $${this.price} each`;
    }
}

// Packaging products without proper interfaces - SECOND PRODUCT FAMILY
export class FruitBox {
    material: string = "cardboard";
    recyclable: boolean = true;
    cost: number = 0.50;

    getMaterial(): string {
        return this.material;
    }

    isRecyclable(): boolean {
        return this.recyclable;
    }

    getDescription(): string {
        return `Regular cardboard fruit box ($${this.cost})`;
    }

    getCost(): number {
        return this.cost;
    }

    getCapacity(): number {
        return 6; // Regular box holds 6 fruits
    }
}

export class OrganicFruitBox {
    material: string = "compostable fiber";
    recyclable: boolean = true;
    cost: number = 1.25;

    getMaterial(): string {
        return this.material;
    }

    isRecyclable(): boolean {
        return this.recyclable;
    }

    getDescription(): string {
        return `Eco-friendly compostable fiber fruit box ($${this.cost})`;
    }

    getCost(): number {
        return this.cost;
    }

    getCapacity(): number {
        return 8; // Organic box holds 8 fruits
    }
}

export class GiftWrapping {
    material: string = "standard paper";
    recyclable: boolean = true;
    cost: number = 1.50;

    getMaterial(): string {
        return this.material;
    }

    isRecyclable(): boolean {
        return this.recyclable;
    }

    getDescription(): string {
        return `Regular paper gift wrapping ($${this.cost})`;
    }

    getCost(): number {
        return this.cost;
    }

    hasRibbon(): boolean {
        return false; // Regular wrapping has no ribbon
    }
}

export class OrganicGiftWrapping {
    material: string = "recycled paper with soy-based ink";
    recyclable: boolean = true;
    cost: number = 3.75;

    getMaterial(): string {
        return this.material;
    }

    isRecyclable(): boolean {
        return this.recyclable;
    }

    getDescription(): string {
        return `Premium recycled paper gift wrapping with soy-based ink ($${this.cost})`;
    }

    getCost(): number {
        return this.cost;
    }

    hasRibbon(): boolean {
        return true; // Organic wrapping includes a natural fiber ribbon
    }
}

// Simple product creators without abstraction
export class FruitCreator {
    // Problem: Separate classes for each variant with duplicated logic
    createApple(organic: boolean) {
        if (organic) {
            return new OrganicApple();
        }
        return new Apple();
    }

    createMelon(organic: boolean) {
        if (organic) {
            return new OrganicMelon();
        }
        return new Melon();
    }
}

export class PackagingCreator {
    // Separate creator for packaging items with duplicated logic
    createFruitBox(organic: boolean) {
        if (organic) {
            return new OrganicFruitBox();
        }
        return new FruitBox();
    }

    createGiftWrapping(organic: boolean) {
        if (organic) {
            return new OrganicGiftWrapping();
        }
        return new GiftWrapping();
    }
}

/* 
Problems with this approach for product families:
1. Inconsistent interfaces between regular and organic versions
2. Duplicate code between regular and organic variants
3. No common interface/type for different products
4. Adding a new product type requires adding multiple classes 
5. Adding a new variant (e.g., "premium") would require many new classes
6. No guarantee that methods are consistently implemented across variants
7. Multiple creators required for different product families
8. No relationship enforced between product families (fruits and packaging)
9. Client has to know which combinations are appropriate

// Usage example showing the awkward relationship between product families:
const fruitCreator = new FruitCreator();
const packagingCreator = new PackagingCreator();

// Need to manually track which type we're working with
const isOrganic = true;

// Create fruits
const apple =  fruitCreator.createApple(isOrganic);
const melon =  fruitCreator.createMelon(isOrganic);

// Create matching packaging - client needs to maintain consistency
const fruitBox = packagingCreator.createFruitBox(isOrganic); 
const giftWrap = packagingCreator.createGiftWrapping(isOrganic);

// Client is responsible for ensuring consistency between product families
console.log("Created items:");
console.log(apple.getDescription());
console.log(melon.getDescription());
console.log(fruitBox.getDescription());
console.log(giftWrap.getDescription());

// Creating a gift basket requires maintaining consistency manually
function createGiftBasket(organic: boolean) {
    const apple = fruitCreator.createApple(organic);
    const melon = fruitCreator.createMelon(organic);
    const wrapping = packagingCreator.createGiftWrapping(organic);
    
    const totalCost = apple.getPrice() + melon.getPrice() + wrapping.getCost();
    
    return {
        apple,
        melon,
        wrapping,
        totalCost,
        description: `Gift basket with ${apple.getType()} apple, ${melon.getType()} melon, and ${wrapping.getMaterial()} wrapping`
    };
}

// Typing issues - collections of related items are problematic
const fruits: (Apple | OrganicApple)[] = [
    fruitCreator.createApple(false),
    fruitCreator.createApple(true)
];

// Error: Property 'type' does not exist on type 'Apple | OrganicApple'
// fruits.forEach(fruit => console.log(fruit.type));

// Type safety is compromised
*/