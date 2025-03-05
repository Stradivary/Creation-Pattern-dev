// Improved implementation using Prototype pattern
export interface Cloneable<T> {
    clone(): T;
}

export class BundleItem implements Cloneable<BundleItem> {
    constructor(
        public name: string,
        public price: number,
        public quantity: number,
        public organic: boolean = false
    ) {}
    
    // Simple clone method that creates exact copy
    clone(): BundleItem {
        return new BundleItem(this.name, this.price, this.quantity, this.organic);
    }
}

export class ProduceBundle implements Cloneable<ProduceBundle> {
    name: string;
    items: Array<BundleItem>;
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
        this.discountPercentage = discountPercentage;
        this.tags = tags;
        this.seasonal = seasonal;
    }
    
    calculateTotalPrice(): number {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    getDiscountedPrice(): number {
        const totalPrice = this.calculateTotalPrice();
        return totalPrice * (1 - this.discountPercentage / 100);
    }
    
    // Prototype pattern implementation - deep clone of the bundle
    clone(): ProduceBundle {
        // Deep clone items array
        const clonedItems = this.items.map(item => item.clone());
        
        // Create new bundle with cloned data
        return new ProduceBundle(
            this.name,
            clonedItems,
            this.discountPercentage,
            [...this.tags],
            this.seasonal
        );
    }
    
    // Easy creation of variants using the prototype as base
    createVariant(options: Partial<ProduceBundle>): ProduceBundle {
        // Create clone first
        const clone = this.clone();
        
        // Apply provided options to override properties
        Object.assign(clone, options);
        
        return clone;
    }
}

/* 
Benefits of Prototype pattern:
1. No duplicated code for creating similar bundles
2. Deep copying handled by the clone method
3. Changes to the ProduceBundle structure only require updating the clone method
4. All properties are properly copied
5. Easy to maintain and extend

// Example usage:
const weekdayBundle = new ProduceBundle("Weekday Mix", [
    new BundleItem("Carrot", 1.99, 5),
    new BundleItem("Apple", 0.99, 3),
    new BundleItem("Kale", 4.50, 1)
], 10, ["popular", "healthy"]);

// Creating a weekend bundle is simple with prototype
const weekendBundle = weekdayBundle.createVariant({
    name: "Weekend Special",
    discountPercentage: 15  // Increased discount
});

// Creating seasonal variant is also simple
const fallBundle = weekdayBundle.createVariant({
    name: "Fall Harvest Special",
    discountPercentage: 15,
    tags: [...weekdayBundle.tags, "seasonal"],
    seasonal: true
});

// We can even create variants of variants
const limitedFallBundle = fallBundle.createVariant({
    name: "Limited Fall Harvest",
    tags: [...fallBundle.tags, "limited"]
});
*/
