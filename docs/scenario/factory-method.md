# Factory Method Pattern: Real-World Produce Management System

## Real-Life Scenario
A grocery store needs to manage different types of produce with varying characteristics. Each type of produce (leafy greens, root vegetables, fruits) has its own handling requirements, pricing structure, and descriptions.

### The Problem
Without Factory Method:
- Complex conditional logic to create different produce types
- Inconsistent produce object creation across the application
- Difficult to add new produce types without modifying existing code
- No standardized way to handle organic variants

### Why Factory Method?
1. **Standardized Creation**:
   - Consistent produce object creation
   - Type-specific validation and initialization
   - Encapsulated creation logic

2. **Easy Extension**:
   - New produce types without changing existing code
   - Simple addition of new produce factories
   - Maintainable codebase

3. **Specialized Handling**:
   - Type-specific descriptions and behavior
   - Proper produce categorization
   - Organic variant management

## Implementation Breakdown

### Abstract Base Classes
```typescript
abstract class Produce {
    constructor(
        public readonly name: string, 
        public readonly price: number, 
        public readonly category: string,
        public readonly organic: boolean = false
    ) {}
    
    abstract getDescription(): string;
}

abstract class ProduceFactory {
    abstract createProduce(name: string, price: number, organic: boolean): Produce;
    
    getProduce(name: string, price: number, organic: boolean = false): Produce {
        const produce = this.createProduce(name, price, organic);
        console.log(`Created: ${produce.getDescription()}`);
        return produce;
    }
}
```

### Concrete Implementations
```typescript
class LeafyGreen extends Produce {
    getDescription(): string {
        const organicLabel = this.organic ? "Organic " : "";
        return `${organicLabel}${this.name}: Fresh leafy green vegetable ($${this.price.toFixed(2)})`;
    }
}

class LeafyGreenFactory extends ProduceFactory {
    createProduce(name: string, price: number, organic: boolean): Produce {
        return new LeafyGreen(name, price, 'leafy green', organic);
    }
}
```

## Real-World Use Cases

1. **Produce Department Management**:
```typescript
class ProduceDepartment {
    private leafyFactory = new LeafyGreenFactory();
    private rootFactory = new RootVegetableFactory();
    private fruitFactory = new FruitFactory();
    
    addNewProduce(type: string, name: string, price: number, organic: boolean) {
        switch(type) {
            case 'leafy':
                return this.leafyFactory.getProduce(name, price, organic);
            case 'root':
                return this.rootFactory.getProduce(name, price, organic);
            case 'fruit':
                return this.fruitFactory.getProduce(name, price, organic);
            default:
                throw new Error('Unknown produce type');
        }
    }
}

// Usage
const department = new ProduceDepartment();
const organicSpinach = department.addNewProduce('leafy', 'Spinach', 3.99, true);
const regularCarrot = department.addNewProduce('root', 'Carrot', 1.99, false);
```

2. **Seasonal Produce Management**:
```typescript
class SeasonalProduceManager {
    private factories: Map<string, ProduceFactory> = new Map();
    
    constructor() {
        this.factories.set('spring', new LeafyGreenFactory());
        this.factories.set('summer', new FruitFactory());
        this.factories.set('fall', new RootVegetableFactory());
    }
    
    createSeasonalProduce(season: string, name: string, price: number): Produce {
        const factory = this.factories.get(season);
        if (!factory) throw new Error(`No factory for season: ${season}`);
        
        // Seasonal produce is typically organic
        return factory.getProduce(name, price, true);
    }
}
```

## Benefits in Practice

1. **Inventory Management**:
   - Type-specific stock handling
   - Proper categorization
   - Accurate produce descriptions

2. **Price Management**:
   - Category-based pricing
   - Organic premium calculations
   - Seasonal price adjustments

3. **Display and Marketing**:
   - Consistent product descriptions
   - Category-based promotions
   - Clear organic labeling

## Common Pitfalls and Solutions

1. **Factory Proliferation**:
   - Use factory registry for management
   - Consider composite factories
   - Document factory responsibilities

2. **Complexity Management**:
   - Clear factory naming conventions
   - Proper factory organization
   - Well-defined factory interfaces

3. **Extension Points**:
   - Plan for future produce types
   - Document extension process
   - Maintain backwards compatibility

## Best Practices

1. **Factory Organization**:
   - Group related factories
   - Clear factory responsibilities
   - Consistent naming conventions

2. **Error Handling**:
   - Meaningful error messages
   - Proper validation
   - Factory fallbacks

3. **Documentation**:
   - Clear factory purposes
   - Usage examples
   - Extension guidelines

## Advanced Use Cases

1. **Smart Factory Selection**:
```typescript
class SmartProduceFactory {
    private static factories = new Map<string, ProduceFactory>();
    
    static registerFactory(category: string, factory: ProduceFactory): void {
        this.factories.set(category, factory);
    }
    
    static createProduce(category: string, name: string, price: number, organic: boolean): Produce {
        const factory = this.factories.get(category);
        if (!factory) {
            throw new Error(`No factory registered for category: ${category}`);
        }
        return factory.getProduce(name, price, organic);
    }
}
```

2. **Composite Factory Pattern**:
```typescript
class CompositeProduceFactory extends ProduceFactory {
    private factories: ProduceFactory[] = [];
    
    addFactory(factory: ProduceFactory): void {
        this.factories.push(factory);
    }
    
    createProduce(name: string, price: number, organic: boolean): Produce {
        // Try each factory until one succeeds
        for (const factory of this.factories) {
            try {
                return factory.createProduce(name, price, organic);
            } catch (e) {
                continue;
            }
        }
        throw new Error(`No factory could create produce: ${name}`);
    }
}
```

3. **Factory with Validation**:
```typescript
class ValidatingProduceFactory extends ProduceFactory {
    constructor(private baseFactory: ProduceFactory) {
        super();
    }
    
    createProduce(name: string, price: number, organic: boolean): Produce {
        // Validate inputs
        if (!name || name.trim().length === 0) {
            throw new Error('Name is required');
        }
        
        if (price <= 0) {
            throw new Error('Price must be positive');
        }
        
        // Create produce using base factory
        return this.baseFactory.createProduce(name, price, organic);
    }
}
```

## Conclusion
The Factory Method pattern provides a flexible and maintainable solution for creating different types of produce objects. It enables easy extension of the system with new produce types while maintaining consistent object creation across the application.