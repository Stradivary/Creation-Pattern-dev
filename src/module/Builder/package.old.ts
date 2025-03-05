// Regular class without Builder pattern
export class ProducePackage {
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
    
    constructor(
        name: string = "",
        fruits: string[] = [],
        vegetables: string[] = [],
        totalItems: number = 0,
        price: number = 0,
        isGift: boolean = false,
        hasDiscount: boolean = false,
        discountPercent: number = 0,
        recyclablePackaging: boolean = true,
        customMessage: string = "",
        deliveryDate: Date | null = null
    ) {
        this.name = name;
        this.fruits = fruits;
        this.vegetables = vegetables;
        this.totalItems = totalItems;
        this.price = price;
        this.isGift = isGift;
        this.hasDiscount = hasDiscount;
        this.discountPercent = discountPercent;
        this.recyclablePackaging = recyclablePackaging;
        this.customMessage = customMessage;
        this.deliveryDate = deliveryDate;
    }
    
    getDiscountedPrice(): number {
        if (!this.hasDiscount) return this.price;
        return this.price * (1 - this.discountPercent / 100);
    }
}

/* 
Problems with this approach:
1. Constructor has many parameters, making it error-prone
2. Hard to keep track of parameter order
3. Some parameters might be optional, but all must be passed or explicitly set to default
4. Creating variations of packages requires separate constructors or methods
5. No easy way to validate parameters during construction

// Usage examples showing the problems:

// Example 1: Too many parameters to remember order
const basicPackage = new ProducePackage(
    "Basic Produce",
    ["Apple", "Banana"],
    ["Carrot", "Broccoli"],
    4,
    19.99,
    false,
    false,
    0,
    true,
    "",
    null
);

// Example 2: Need to provide all parameters even if only a few are relevant
const giftPackage = new ProducePackage(
    "Gift Package",
    ["Apple", "Pear", "Orange"],
    ["Spinach"],
    4,
    29.99,
    true, // This is a gift package
    true, // With discount
    10,   // 10% discount
    true, // Recyclable
    "Happy Birthday!", // Custom message
    new Date("2023-05-15") // Delivery date
);

// Example 3: Easy to mix up parameter order accidentally
const mixedUpPackage = new ProducePackage(
    "Mixed Up",
    ["Apple"], // fruits
    ["Carrot"], // vegetables
    2,         // meant to be totalItems, correct
    15.99,     // meant to be price, correct
    true,      // meant to be isGift, correct 
    10,        // meant to be hasDiscount, but accidentally used the discount percent value
    true,      // meant to be discountPercent, but accidentally used recyclable value
    "Oops!",   // meant to be recyclablePackaging, but accidentally used customMessage
    null,      // meant to be customMessage, but accidentally used deliveryDate
    new Date() // meant to be deliveryDate, correct
);
// This wouldn't cause compilation errors but would lead to runtime behavior issues
*/