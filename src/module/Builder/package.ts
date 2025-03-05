// Implementation with Builder pattern
export class ProducePackage {
  // All fields are private to enforce using the builder
  private name: string;
  private fruits: string[];
  private vegetables: string[];
  private totalItems: number;
  private price: number;
  private isGift: boolean;
  private hasDiscount: boolean;
  private discountPercent: number;
  private recyclablePackaging: boolean;
  private customMessage: string;
  private deliveryDate: Date | null;

  // Private constructor can only be called by the Builder
  constructor(builder: ProducePackageBuilder) {
    this.name = builder.name;
    this.fruits = builder.fruits;
    this.vegetables = builder.vegetables;
    this.totalItems = builder.calculateTotalItems();
    this.price = builder.price;
    this.isGift = builder.isGift;
    this.hasDiscount = builder.hasDiscount;
    this.discountPercent = builder.discountPercent;
    this.recyclablePackaging = builder.recyclablePackaging;
    this.customMessage = builder.customMessage;
    this.deliveryDate = builder.deliveryDate;
  }

  // Public getters for package properties
  getName(): string { return this.name; }
  getFruits(): string[] { return [...this.fruits]; }
  getVegetables(): string[] { return [...this.vegetables]; }
  getTotalItems(): number { return this.totalItems; }
  getPrice(): number { return this.price; }
  getIsGift(): boolean { return this.isGift; }
  getHasDiscount(): boolean { return this.hasDiscount; }
  getDiscountPercent(): number { return this.discountPercent; }
  getRecyclablePackaging(): boolean { return this.recyclablePackaging; }
  getCustomMessage(): string { return this.customMessage; }
  getDeliveryDate(): Date | null { return this.deliveryDate; }

  getDiscountedPrice(): number {
    if (!this.hasDiscount) return this.price;
    return this.price * (1 - this.discountPercent / 100);
  }

  // Static method to create a builder
  static builder(name: string): ProducePackageBuilder {
    return new ProducePackageBuilder(name);
  }
}

// Builder class
export class ProducePackageBuilder {
  // Fields with default values
  name: string;
  fruits: string[] = [];
  vegetables: string[] = [];
  price: number = 0;
  isGift: boolean = false;
  hasDiscount: boolean = false;
  discountPercent: number = 0;
  recyclablePackaging: boolean = true;
  customMessage: string = "";
  deliveryDate: Date | null = null;

  constructor(name: string) {
    this.name = name;
  }

  // Fluent builder methods - each returns 'this' for method chaining
  withFruits(fruits: string[]): ProducePackageBuilder {
    this.fruits = [...fruits];
    return this;
  }

  withVegetables(vegetables: string[]): ProducePackageBuilder {
    this.vegetables = [...vegetables];
    return this;
  }

  withPrice(price: number): ProducePackageBuilder {
    if (price < 0) {
      throw new Error("Price cannot be negative");
    }
    this.price = price;
    return this;
  }

  asGift(isGift: boolean = true): ProducePackageBuilder {
    this.isGift = isGift;
    return this;
  }

  withDiscount(percent: number): ProducePackageBuilder {
    if (percent < 0 || percent > 100) {
      throw new Error("Discount must be between 0 and 100");
    }
    this.hasDiscount = percent > 0;
    this.discountPercent = percent;
    return this;
  }

  withRecyclablePackaging(recyclable: boolean = true): ProducePackageBuilder {
    this.recyclablePackaging = recyclable;
    return this;
  }

  withCustomMessage(message: string): ProducePackageBuilder {
    this.customMessage = message;
    return this;
  }

  withDeliveryDate(date: Date): ProducePackageBuilder {
    if (date < new Date()) {
      throw new Error("Delivery date cannot be in the past");
    }
    this.deliveryDate = date;
    return this;
  }

  // Calculate the total number of items from fruits and vegetables
  calculateTotalItems(): number {
    return this.fruits.length + this.vegetables.length;
  }

  // Build method creates and returns the final object
  build(): ProducePackage {
    // Validate the state before building the object
    if (this.name.trim().length === 0) {
      throw new Error("Package name cannot be empty");
    }

    if (this.fruits.length === 0 && this.vegetables.length === 0) {
      throw new Error("Package must contain at least one item");
    }

    if (this.isGift && this.customMessage.trim().length === 0) {
      throw new Error("Gift packages must include a custom message");
    }

    return new ProducePackage(this);
  }
}

/* 
Benefits of Builder pattern:
1. Parameters are named and self-documenting through method calls
2. Optional parameters can be omitted without cluttering
3. Parameter validation happens during building process
4. Methods can enforce business rules and constraints
5. Immutable objects can be created safely
6. Complex creation logic is encapsulated in the builder

// Usage examples showing the improvements:

// Example 1: Basic package with clear, readable parameters
const basicPackage = ProducePackage.builder("Basic Produce")
    .withFruits(["Apple", "Banana"])
    .withVegetables(["Carrot", "Broccoli"])
    .withPrice(19.99)
    .build();

// Example 2: Gift package with only relevant parameters specified
const giftPackage = ProducePackage.builder("Gift Package")
    .withFruits(["Apple", "Pear", "Orange"])
    .withVegetables(["Spinach"])
    .withPrice(29.99)
    .asGift()  // Clear indication this is a gift
    .withDiscount(10)
    .withCustomMessage("Happy Birthday!")
    .withDeliveryDate(new Date("2023-05-15"))
    .build();

// Example 3: No chance of mixing up parameters - each has a clear purpose
try {
    const package = ProducePackage.builder("Family Weekly Box")
        .withFruits(["Apple", "Orange", "Banana"])
        .withVegetables(["Kale", "Broccoli", "Carrot"])
        .withPrice(39.99)
        .withDiscount(15)
        .asGift() // This would fail validation without a message
        .build();
} catch (error) {
    console.error("Validation error:", error.message);
    // Properly handles the error: "Gift packages must include a custom message"
}
*/