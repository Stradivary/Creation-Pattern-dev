# Builder Pattern: Real-World Package Assembly System

## Real-Life Scenario
A produce delivery service needs to create customizable produce packages with various options: different combinations of fruits and vegetables, gift wrapping, special discounts, delivery options, and more. Each package can have many optional components and configurations.

### The Problem
Without Builder:
- Complex constructor with many parameters
- Difficult to handle optional parameters
- Error-prone parameter ordering
- Hard to create different package variations
- No step-by-step construction process

### Why Builder?
1. **Step-by-Step Construction**:
   - Clear construction process
   - Flexible parameter ordering
   - Optional components handling

2. **Parameter Organization**:
   - Self-documenting method names
   - Type-safe construction
   - Validation during build

3. **Variation Management**:
   - Easy package customization
   - Clear package configuration
   - Reusable configurations

## Implementation Breakdown

### Core Components
```typescript
class ProducePackage {
    name: string;
    fruits: string[];
    vegetables: string[];
    totalItems: number;
    price: number;
    isGift: boolean;
    hasDiscount: boolean;
    discountPercent: number;
    recyclablePackaging: boolean;
    customMessage: string;
    deliveryDate: Date | null;
}

class ProducePackageBuilder {
    // Building methods with fluent interface
    withFruits(fruits: string[]): ProducePackageBuilder {
        this.fruits = [...fruits];
        return this;
    }

    withPrice(price: number): ProducePackageBuilder {
        if (price < 0) throw new Error("Price cannot be negative");
        this.price = price;
        return this;
    }

    build(): ProducePackage {
        // Validation logic
        if (this.name.trim().length === 0) {
            throw new Error("Package name cannot be empty");
        }
        return new ProducePackage(this);
    }
}
```

## Real-World Use Cases

1. **Holiday Package Creation**:
```typescript
const holidayPackage = ProducePackage.builder("Holiday Special")
    .withFruits(["Apple", "Pear", "Orange"])
    .withVegetables(["Spinach"])
    .withPrice(29.99)
    .asGift()
    .withDiscount(10)
    .withCustomMessage("Happy Holidays!")
    .withDeliveryDate(new Date("2023-12-25"))
    .build();
```

2. **Dynamic Package Assembly**:
```typescript
class PackageAssembler {
    createWeeklyPackage(week: number): ProducePackage {
        const builder = ProducePackage.builder(`Week ${week} Bundle`);
        
        // Base configuration
        builder.withPrice(19.99)
              .withRecyclablePackaging();
        
        // Season-specific items
        if (this.isSummerSeason()) {
            builder.withFruits(["Watermelon", "Peach", "Plum"]);
        } else {
            builder.withFruits(["Apple", "Orange", "Pear"]);
        }
        
        // Special week promotions
        if (week === 1) {
            builder.withDiscount(15)
                   .withCustomMessage("Welcome to our service!");
        }
        
        return builder.build();
    }
}
```

## Benefits in Practice

1. **Order Management**:
   - Clear package specifications
   - Consistent package creation
   - Validated configurations

2. **Customer Experience**:
   - Customizable packages
   - Clear pricing structure
   - Flexible options

3. **Business Operations**:
   - Standardized package assembly
   - Easy promotion implementation
   - Quality control

## Common Pitfalls and Solutions

1. **Builder Complexity**:
   - Keep builders focused
   - Clear method names
   - Proper validation

2. **State Management**:
   - Clear state transitions
   - Proper state validation
   - Error handling

3. **Default Values**:
   - Document defaults
   - Sensible defaults
   - Clear override methods

## Best Practices

1. **Method Naming**:
   - Descriptive method names
   - Consistent naming convention
   - Clear purpose

2. **Validation**:
   - Early validation
   - Clear error messages
   - Complete validation

3. **Documentation**:
   - Clear method documentation
   - Usage examples
   - Configuration options

## Advanced Use Cases

1. **Package Template System**:
```typescript
class PackageTemplate {
    private templates: Map<string, (builder: ProducePackageBuilder) => void> = new Map();
    
    registerTemplate(name: string, configuration: (builder: ProducePackageBuilder) => void): void {
        this.templates.set(name, configuration);
    }
    
    createFromTemplate(templateName: string, customizations?: Partial<ProducePackage>): ProducePackage {
        const template = this.templates.get(templateName);
        if (!template) throw new Error(`Template not found: ${templateName}`);
        
        const builder = ProducePackage.builder(templateName);
        template(builder);
        
        if (customizations) {
            if (customizations.name) builder.withName(customizations.name);
            if (customizations.price) builder.withPrice(customizations.price);
            // Apply other customizations
        }
        
        return builder.build();
    }
}

// Usage
const templates = new PackageTemplate();

templates.registerTemplate("basic", builder => {
    builder.withFruits(["Apple", "Orange"])
           .withPrice(9.99)
           .withRecyclablePackaging();
});

templates.registerTemplate("premium", builder => {
    builder.withFruits(["Mango", "Dragon Fruit"])
           .withPrice(29.99)
           .withRecyclablePackaging()
           .asGift();
});
```

2. **Staged Builder**:
```typescript
class PackageBuilderStage1 {
    constructor(private builder: ProducePackageBuilder) {}
    
    withFruits(fruits: string[]): PackageBuilderStage2 {
        this.builder.withFruits(fruits);
        return new PackageBuilderStage2(this.builder);
    }
}

class PackageBuilderStage2 {
    constructor(private builder: ProducePackageBuilder) {}
    
    withPrice(price: number): PackageBuilderStage3 {
        this.builder.withPrice(price);
        return new PackageBuilderStage3(this.builder);
    }
}

class PackageBuilderStage3 {
    constructor(private builder: ProducePackageBuilder) {}
    
    build(): ProducePackage {
        return this.builder.build();
    }
    
    asGift(): PackageBuilderStage3 {
        this.builder.asGift();
        return this;
    }
}

// Usage enforces order
const package = new PackageBuilderStage1(new ProducePackageBuilder())
    .withFruits(["Apple", "Orange"])
    .withPrice(19.99)
    .asGift()
    .build();
```

3. **Composite Builder**:
```typescript
class CompositePackageBuilder {
    private builders: ProducePackageBuilder[] = [];
    
    addPackage(): ProducePackageBuilder {
        const builder = new ProducePackageBuilder();
        this.builders.push(builder);
        return builder;
    }
    
    buildAll(): ProducePackage[] {
        return this.builders.map(builder => builder.build());
    }
}

// Build multiple packages
const composite = new CompositePackageBuilder();

composite.addPackage()
    .withName("Basic")
    .withPrice(9.99)
    .withFruits(["Apple"]);

composite.addPackage()
    .withName("Premium")
    .withPrice(29.99)
    .withFruits(["Mango"])
    .asGift();

const packages = composite.buildAll();
```

## Conclusion
The Builder pattern provides an elegant solution for constructing complex produce packages with many optional components. It ensures type safety, maintains clean code, and provides a fluent interface for package configuration while enforcing business rules through validation.