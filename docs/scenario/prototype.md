# Prototype Pattern: Real-World Bundle Management System

## Real-Life Scenario
A produce delivery service needs to manage different produce bundles for various occasions and seasons. Each bundle contains multiple items with specific configurations, and the service frequently needs to create variations of existing bundles.

### The Problem
Without Prototype:
- Creating new bundles requires setting up all properties from scratch
- Seasonal variants require duplicating entire bundle configurations
- High risk of missing properties when copying bundle data
- Complex validation needed for each new bundle creation

### Why Prototype?
1. **Efficient Bundle Creation**:
   - Clone existing bundles instead of manual recreation
   - All properties are properly copied
   - Maintain consistency across variants

2. **Flexible Customization**:
   - Create variants while preserving base configuration
   - Easy seasonal or promotional modifications
   - Quick bundle experimentation

3. **Reduced Complexity**:
   - Encapsulated cloning logic
   - Simplified bundle variant creation
   - Maintainable codebase

## Implementation Breakdown

### Core Components
```typescript
interface Cloneable<T> {
    clone(): T;
}

class BundleItem implements Cloneable<BundleItem> {
    constructor(
        public name: string,
        public price: number,
        public quantity: number,
        public organic: boolean = false
    ) {}
    
    clone(): BundleItem {
        return new BundleItem(this.name, this.price, this.quantity, this.organic);
    }
}
```
- `Cloneable`: Interface ensuring clone functionality
- `BundleItem`: Prototype implementation for individual items

### Bundle Management
```typescript
class ProduceBundle implements Cloneable<ProduceBundle> {
    clone(): ProduceBundle {
        const clonedItems = this.items.map(item => item.clone());
        return new ProduceBundle(
            this.name,
            clonedItems,
            this.discountPercentage,
            [...this.tags],
            this.seasonal
        );
    }
    
    createVariant(options: Partial<ProduceBundle>): ProduceBundle {
        const clone = this.clone();
        Object.assign(clone, options);
        return clone;
    }
}
```
- Deep cloning ensures complete bundle copying
- Variant creation simplifies bundle customization

## Real-World Use Cases

1. **Seasonal Bundle Management**:
```typescript
// Create base holiday bundle
const holidayBundle = new ProduceBundle(
    "Holiday Essential",
    [
        new BundleItem("Apple", 0.99, 6),
        new BundleItem("Orange", 0.75, 6),
        new BundleItem("Pear", 1.50, 4)
    ],
    10,  // 10% discount
    ["holiday", "family"]
);

// Create Christmas variant
const christmasBundle = holidayBundle.createVariant({
    name: "Christmas Special",
    discountPercentage: 15,
    tags: [...holidayBundle.tags, "christmas"]
});

// Create New Year variant
const newYearBundle = holidayBundle.createVariant({
    name: "New Year Fresh Start",
    discountPercentage: 20,
    tags: [...holidayBundle.tags, "new-year"]
});
```

2. **Dynamic Promotion Management**:
```typescript
const weekdayBundle = new ProduceBundle(
    "Weekday Mix",
    [
        new BundleItem("Carrot", 1.99, 5),
        new BundleItem("Apple", 0.99, 3),
        new BundleItem("Kale", 4.50, 1)
    ],
    10,
    ["popular", "healthy"]
);

// Flash sale variant
const flashSaleBundle = weekdayBundle.createVariant({
    name: "Flash Sale Bundle",
    discountPercentage: 25,
    tags: [...weekdayBundle.tags, "flash-sale"]
});

// Premium variant
const premiumBundle = weekdayBundle.createVariant({
    name: "Premium Selection",
    items: weekdayBundle.items.map(item => {
        const premium = item.clone();
        premium.organic = true;
        return premium;
    }),
    tags: [...weekdayBundle.tags, "premium", "organic"]
});
```

## Benefits in Practice

1. **Marketing Operations**:
   - Quick creation of promotional bundles
   - Easy A/B testing of different bundle configurations
   - Flexible pricing strategies

2. **Seasonal Planning**:
   - Efficient seasonal bundle rollouts
   - Simple bundle rotation management
   - Easy historical bundle recreation

3. **Inventory Management**:
   - Consistent bundle structures
   - Reliable item tracking
   - Simplified stock calculations

## Common Pitfalls and Solutions

1. **Deep vs Shallow Cloning**:
   - Implement proper deep cloning for nested objects
   - Consider immutable data structures
   - Document cloning behavior

2. **State Management**:
   - Clear separation of static and dynamic properties
   - Careful handling of reference types
   - Proper validation after cloning

3. **Performance**:
   - Optimize cloning for large bundles
   - Consider lazy cloning for heavy objects
   - Cache frequently used prototypes

## Best Practices

1. **Clear Interfaces**:
   - Define explicit cloning contracts
   - Document cloning behavior
   - Make clone operations predictable

2. **Validation**:
   - Validate cloned objects
   - Maintain data integrity
   - Handle edge cases

3. **Documentation**:
   - Document prototype usage
   - Explain variant creation
   - Provide usage examples

## Advanced Use Cases

1. **Bundle Registry System**:
```typescript
class BundleRegistry {
    private static prototypes = new Map<string, ProduceBundle>();
    
    static registerPrototype(key: string, bundle: ProduceBundle): void {
        this.prototypes.set(key, bundle);
    }
    
    static createBundle(key: string, customization?: Partial<ProduceBundle>): ProduceBundle {
        const prototype = this.prototypes.get(key);
        if (!prototype) throw new Error(`No prototype found for key: ${key}`);
        
        return customization ? 
            prototype.createVariant(customization) : 
            prototype.clone();
    }
}
```

2. **Bundle Version Control**:
```typescript
class VersionedBundle extends ProduceBundle {
    private version: number = 1;
    private history: ProduceBundle[] = [];
    
    createVersion(): ProduceBundle {
        const newVersion = this.clone();
        this.history.push(this.clone());
        this.version++;
        return newVersion;
    }
    
    revertToVersion(version: number): ProduceBundle {
        if (version <= 0 || version > this.history.length) {
            throw new Error("Invalid version number");
        }
        return this.history[version - 1].clone();
    }
}
```

## Conclusion
The Prototype pattern excels in scenarios requiring flexible object creation and variation management. For produce bundle systems, it provides an elegant solution for managing different bundle variations while maintaining code simplicity and reducing error potential.