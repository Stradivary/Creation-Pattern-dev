// filepath: /home/rasyid/dev/creational-pattern-app/src/module/Prototypes/bundle.functional.ts
// Functional implementation of the Prototype pattern

// Type definitions instead of classes
export type BundleItem = {
  readonly name: string;
  readonly price: number;
  readonly quantity: number;
  readonly organic: boolean;
};

export type ProduceBundle = {
  readonly name: string;
  readonly items: ReadonlyArray<BundleItem>;
  readonly discountPercentage: number;
  readonly tags: ReadonlyArray<string>;
  readonly seasonal: boolean;
};

// Factory functions instead of constructors
export const createBundleItem = (
  name: string,
  price: number,
  quantity: number,
  organic: boolean = false
): BundleItem => ({
  name,
  price,
  quantity,
  organic,
});

export const createBundle = (
  name: string,
  items: ReadonlyArray<BundleItem> = [],
  discountPercentage: number = 0,
  tags: ReadonlyArray<string> = [],
  seasonal: boolean = false
): ProduceBundle => ({
  name,
  items,
  discountPercentage,
  tags,
  seasonal,
});

// Pure functions instead of methods
export const calculateTotalPrice = (bundle: ProduceBundle): number =>
  bundle.items.reduce((total, item) => total + (item.price * item.quantity), 0);

export const getDiscountedPrice = (bundle: ProduceBundle): number => {
  const totalPrice = calculateTotalPrice(bundle);
  return totalPrice * (1 - bundle.discountPercentage / 100);
};

// Clone functions instead of clone methods
export const cloneBundleItem = (item: BundleItem): BundleItem => ({
  ...item,
});

export const cloneBundle = (bundle: ProduceBundle): ProduceBundle => ({
  ...bundle,
  items: bundle.items.map(cloneBundleItem),
  tags: [...bundle.tags],
});

// Function to create variants instead of a method
export const createVariant = (
  baseBundle: ProduceBundle,
  options: Partial<ProduceBundle>
): ProduceBundle => {
  // Create clone first
  const clone = cloneBundle(baseBundle);
  
  // Merge with options
  return {
    ...clone,
    ...options,
    // Handle nested arrays properly if they're in the options
    items: options.items || clone.items,
    tags: options.tags || clone.tags,
  };
};

/* 
Benefits of Functional Prototype pattern:
1. Immutability - all objects are readonly and new objects are created with each operation
2. Pure functions - no side effects, easier to test and reason about
3. Separation of data and behavior - functions operate on data, not embedded in objects
4. Composition friendly - functions can be easily composed to create more complex operations
5. No 'this' context to worry about - avoids common JavaScript pitfalls

// Example usage:
const carrot = createBundleItem("Carrot", 1.99, 5);
const apple = createBundleItem("Apple", 0.99, 3);
const kale = createBundleItem("Kale", 4.50, 1);

const weekdayBundle = createBundle(
  "Weekday Mix",
  [carrot, apple, kale],
  10,
  ["popular", "healthy"]
);

// Creating a weekend bundle is simple with functional prototype pattern
const weekendBundle = createVariant(weekdayBundle, {
  name: "Weekend Special",
  discountPercentage: 15 // Increased discount
});

// Creating seasonal variant is also simple
const fallBundle = createVariant(weekdayBundle, {
  name: "Fall Harvest Special",
  discountPercentage: 15,
  tags: [...weekdayBundle.tags, "seasonal"],
  seasonal: true
});

// We can even create variants of variants
const limitedFallBundle = createVariant(fallBundle, {
  name: "Limited Fall Harvest",
  tags: [...fallBundle.tags, "limited"]
});

// We can compose functions for more complex operations
const calculateSavings = (bundle: ProduceBundle): number => {
  const totalPrice = calculateTotalPrice(bundle);
  const discountedPrice = getDiscountedPrice(bundle);
  return totalPrice - discountedPrice;
};

const addItem = (bundle: ProduceBundle, item: BundleItem): ProduceBundle => 
  createVariant(bundle, {
    items: [...bundle.items, item]
  });

const addTag = (bundle: ProduceBundle, tag: string): ProduceBundle => 
  createVariant(bundle, {
    tags: [...bundle.tags, tag]
  });

// Composing multiple operations
const enhancedBundle = addTag(
  addItem(weekdayBundle, createBundleItem("Banana", 0.79, 2, true)),
  "enhanced"
);
*/