
// Import the packaging interfaces
import {
	FruitBox,
	GiftWrapping
} from './packaging';


// Abstract Product interfaces
interface Fruit {
	getType(): string;
	getPrice(): number;
	planting(): string;
	getDescription(): string;
}

interface Apple extends Fruit {
	// Apple-specific methods could go here
	isGood(): boolean;
}

interface Melon extends Fruit {
	// Melon-specific methods could go here
	isRipe(): boolean;
}

// Concrete Products
class RegularApple implements Apple {
	getType(): string {
		return 'regular';
	}

	getPrice(): number {
		return 0.99;
	}

	planting(): string {
		return 'Growing regular apple trees in conventional orchards';
	}

	getDescription(): string {
		return `Regular apple: $${this.getPrice()} each`;
	}

	isGood(): boolean {
		return true;
	}
}

class OrganicApple implements Apple {
	getType(): string {
		return 'organic';
	}

	getPrice(): number {
		return 1.99;
	}

	planting(): string {
		return 'Growing organic apple trees without pesticides';
	}

	getDescription(): string {
		return `Organic apple: $${this.getPrice()} each`;
	}

	isGood(): boolean {
		return true;
	}
}

class RegularMelon implements Melon {
	getType(): string {
		return 'regular';
	}

	getPrice(): number {
		return 3.99;
	}

	planting(): string {
		return 'Growing regular melons in conventional fields';
	}

	getDescription(): string {
		return `Regular melon: $${this.getPrice()} each`;
	}

	isRipe(): boolean {
		return true;
	}
}

class OrganicMelon implements Melon {
	getType(): string {
		return 'organic';
	}

	getPrice(): number {
		return 6.99;
	}

	planting(): string {
		return 'Growing organic melons without pesticides';
	}

	getDescription(): string {
		return `Organic melon: $${this.getPrice()} each`;
	}

	isRipe(): boolean {
		return true;
	}
}

// Concrete Packaging Products
class RegularFruitBox implements FruitBox {
	getMaterial(): string {
		return 'cardboard';
	}

	isRecyclable(): boolean {
		return true;
	}

	getDescription(): string {
		return `Regular cardboard fruit box ($${this.getCost().toFixed(2)})`;
	}

	getCost(): number {
		return 0.50;
	}

	getCapacity(): number {
		return 6; // Regular box holds 6 fruits
	}
}

class RegularGiftWrapping implements GiftWrapping {
	getMaterial(): string {
		return 'standard paper';
	}

	isRecyclable(): boolean {
		return true;
	}

	getDescription(): string {
		return `Regular paper gift wrapping ($${this.getCost().toFixed(2)})`;
	}

	getCost(): number {
		return 1.50;
	}

	hasRibbon(): boolean {
		return false; // Regular wrapping has no ribbon
	}
}

class OrganicFruitBox implements FruitBox {
	getMaterial(): string {
		return 'compostable fiber';
	}

	isRecyclable(): boolean {
		return true;
	}

	getDescription(): string {
		return `Eco-friendly compostable fiber fruit box ($${this.getCost().toFixed(2)})`;
	}

	getCost(): number {
		return 1.25;
	}

	getCapacity(): number {
		return 8; // Organic box has larger capacity
	}
}

class OrganicGiftWrapping implements GiftWrapping {
	getMaterial(): string {
		return 'recycled paper with soy-based ink';
	}

	isRecyclable(): boolean {
		return true;
	}

	getDescription(): string {
		return `Premium recycled paper gift wrapping with soy-based ink ($${this.getCost().toFixed(2)})`;
	}

	getCost(): number {
		return 3.75;
	}

	hasRibbon(): boolean {
		return true; // Organic wrapping includes a natural fiber ribbon
	}
}

// Abstract Factory interface - now creates both fruits AND packaging
export interface FruitFactory {
	// Fruit product family
	createApple(): Apple;
	createMelon(): Melon;

	// Packaging product family
	createFruitBox(): FruitBox;
	createGiftWrapping(): GiftWrapping;
}

// Concrete Factories
export class RegularFruitFactory implements FruitFactory {
	// Fruit product family
	createApple(): Apple {
		return new RegularApple();
	}

	createMelon(): Melon {
		return new RegularMelon();
	}

	// Packaging product family
	createFruitBox(): FruitBox {
		return new RegularFruitBox();
	}

	createGiftWrapping(): GiftWrapping {
		return new RegularGiftWrapping();
	}
	
}

export class OrganicFruitFactory implements FruitFactory {
	// Fruit product family
	createApple(): Apple {
		return new OrganicApple();
	}

	createMelon(): Melon {
		return new OrganicMelon();
	}

	// Packaging product family
	createFruitBox(): FruitBox {
		return new OrganicFruitBox();
	}

	createGiftWrapping(): GiftWrapping {
		return new OrganicGiftWrapping();
	}
}

/* 
Benefits of Abstract Factory pattern:
1. Consistent interfaces across all product variants
2. Common base types (Apple, Melon, FruitBox, GiftWrapping) allow for polymorphism
3. Code reuse through interfaces
4. Adding a new product type only requires implementing interfaces
5. Adding a new variant (e.g., "premium") only requires one new factory class
6. Guarantees consistent implementation across variants
7. Creates families of related products that work well together

// Usage example:
// Client code using regular fruits and packaging
const regularFactory: FruitFactory = new RegularFruitFactory();
const apple: Apple = regularFactory.createApple();
const melon: Melon = regularFactory.createMelon();
const fruitBox: FruitBox = regularFactory.createFruitBox();
const giftWrap: GiftWrapping = regularFactory.createGiftWrapping();

// Client code using organic fruits and packaging
const organicFactory: FruitFactory = new OrganicFruitFactory();
const organicApple: Apple = organicFactory.createApple();
const organicMelon: Melon = organicFactory.createMelon();
const organicBox: FruitBox = organicFactory.createFruitBox();
const organicWrap: GiftWrapping = organicFactory.createGiftWrapping();

// Key benefit: The entire product family is consistent
// A regular fruit should be packaged in regular packaging
// An organic fruit should be packaged in organic packaging

function createGiftSet(factory: FruitFactory) {
	return {
		fruit: factory.createApple(),
		packaging: factory.createGiftWrapping()
	};
}

const regularGiftSet = createGiftSet(regularFactory);
const organicGiftSet = createGiftSet(organicFactory);
*/

