// Abstract Product interfaces for the second product family (Packaging)
export interface Packaging {
    getMaterial(): string;
    isRecyclable(): boolean;
    getDescription(): string;
    getCost(): number;
}

export interface FruitBox extends Packaging {
    // FruitBox-specific methods
    getCapacity(): number;
}

export interface GiftWrapping extends Packaging {
    // GiftWrapping-specific methods
    hasRibbon(): boolean;
}
