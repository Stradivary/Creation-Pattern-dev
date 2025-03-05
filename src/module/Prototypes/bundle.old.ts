// Complex bundle class without Prototype pattern
export class ProduceBundle {
    name: string;
    items: Array<BundleItem>;
    totalPrice: number;
    discountPercentage: number;
    tags: string[];
    seasonal: boolean;
    
    constructor(
        name: string, 
        items: Array<BundleItem> = [], 
        discountPercentage: number = 0,
        tags: string[] = [],
        seasonal: boolean = false
    ) {
        this.name = name;
        this.items = items;
        this.totalPrice = this.calculateTotalPrice();
        this.discountPercentage = discountPercentage;
        this.tags = tags;
        this.seasonal = seasonal;
    }
    
    calculateTotalPrice(): number {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    getDiscountedPrice(): number {
        return this.totalPrice * (1 - this.discountPercentage / 100);
    }
    
    // Problem: Creating a similar bundle requires recreating all data manually
    createSimilarBundle(newName: string, additionalDiscount: number = 0): ProduceBundle {
        // We need to manually copy all items
        const copiedItems = this.items.map(item => {
            return new BundleItem(item.name, item.price, item.quantity, item.organic);
        });
        
        // Manually copy and adjust all other properties
        return new ProduceBundle(
            newName, 
            copiedItems, 
            this.discountPercentage + additionalDiscount,
            [...this.tags],
            this.seasonal
        );
    }
    
    // Creating a seasonal version requires even more manual work
    createSeasonalVersion(seasonalName: string, seasonalDiscount: number): ProduceBundle {
        const copiedItems = this.items.map(item => {
            return new BundleItem(item.name, item.price, item.quantity, item.organic);
        });
        
        return new ProduceBundle(
            seasonalName, 
            copiedItems, 
            seasonalDiscount,
            [...this.tags, "seasonal"],
            true
        );
    }
}

export class BundleItem {
    constructor(
        public name: string,
        public price: number,
        public quantity: number,
        public organic: boolean = false
    ) {}
}

/* 
Problems with this approach:
1. Duplicated code when creating similar bundles
2. Deep copying of complex objects is error-prone
3. Any change to the ProduceBundle class structure requires updating all copy methods
4. Easy to forget to copy some properties
5. Difficult to maintain as the class grows

// Example usage:
const weekdayBundle = new ProduceBundle("Weekday Mix", [
    new BundleItem("Carrot", 1.99, 5),
    new BundleItem("Apple", 0.99, 3),
    new BundleItem("Kale", 4.50, 1)
], 10, ["popular", "healthy"]);

// Creating a weekend bundle requires manual copying and adjustment
const weekendBundle = weekdayBundle.createSimilarBundle("Weekend Special", 5);

// Creating a seasonal variant requires even more manual work
const fallBundle = weekdayBundle.createSeasonalVersion("Fall Harvest Special", 15);
*/