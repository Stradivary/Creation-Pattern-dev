# Singleton Pattern: Real-World Inventory Management System

## Real-Life Scenario
Imagine a busy retail store with multiple point-of-sale (POS) terminals, a stockroom management system, and an online ordering system. All these systems need to access and modify the same inventory data.

### The Problem
Without Singleton:
- Each system might create its own inventory instance
- Terminal A sells an item, but Terminal B doesn't know about it
- Online orders might show items as available when they're actually sold out
- Stock updates in the stockroom aren't immediately reflected at sales terminals

### Why Singleton?
1. **Data Consistency**: All systems work with the same inventory data
   - Sales, restocking, and online orders all see the same stock levels
   - No risk of overselling or conflicting data

2. **Resource Efficiency**: 
   - Single inventory system in memory
   - No duplicate data storage
   - Reduced memory footprint

3. **Centralized Control**:
   - Single point for inventory updates
   - Easier to implement inventory policies
   - Simplified auditing and tracking

## Implementation Breakdown

### Core Components
```typescript
private static instance: Inventory | null = null;
private items: Map<string, number>;
private prices: Map<string, number>;
```
- `instance`: Stores the single inventory instance
- `items`: Tracks item quantities
- `prices`: Stores item prices

### Instance Control
```typescript
private constructor() {
  this.items = new Map<string, number>();
  this.prices = new Map<string, number>();
}

public static getInstance(): Inventory {
  if (!Inventory.instance) {
    Inventory.instance = new Inventory();
  }
  return Inventory.instance;
}
```
- Private constructor prevents direct instantiation
- `getInstance` ensures only one instance exists

## When to Use Singleton
1. **Shared Resource Management**:
   - Database connections
   - Configuration settings
   - Cache systems

2. **State Coordination**:
   - Game state managers
   - Application settings
   - Session management

3. **Control Systems**:
   - Logging systems
   - Print spoolers
   - Device drivers

## Benefits in Action
1. **Sales Terminal Operations**:
```typescript
const terminal1 = Inventory.getInstance();
terminal1.sellItem("Apple", 5);

const terminal2 = Inventory.getInstance();
// terminal2 sees the updated stock after terminal1's sale
console.log(terminal2.getStockCount("Apple")); // Reduced by 5
```

2. **Stock Management**:
```typescript
const stockroom = Inventory.getInstance();
stockroom.addItem("Orange", 100, 0.99);

const onlineStore = Inventory.getInstance();
// Online store immediately sees new stock
console.log(onlineStore.getStockCount("Orange")); // Shows 100
```

## Common Pitfalls and Solutions
1. **Thread Safety**: 
   - In multi-threaded environments, implement proper synchronization
   - Use double-checked locking pattern if needed

2. **Testing**:
   - Singleton can make unit testing harder
   - Consider dependency injection for better testability
   - Use interfaces to mock singleton in tests

3. **Scalability**:
   - For distributed systems, consider using distributed caching
   - Implement proper synchronization mechanisms
   - Consider eventual consistency patterns

## Best Practices
1. **Lazy Initialization**:
   - Create instance only when first needed
   - Saves resources if singleton isn't used

2. **Access Control**:
   - Keep constructor private
   - Use static method for instance access
   - Consider read-only public interfaces

3. **State Management**:
   - Minimize mutable state
   - Implement proper validation
   - Consider using immutable data structures

## Real-World Extension Examples
1. **Multi-Store Inventory**:
```typescript
class MultiStoreInventory {
  private static instances: Map<string, Inventory> = new Map();
  
  public static getStoreInstance(storeId: string): Inventory {
    if (!MultiStoreInventory.instances.has(storeId)) {
      MultiStoreInventory.instances.set(storeId, new Inventory());
    }
    return MultiStoreInventory.instances.get(storeId)!;
  }
}
```

2. **Audit Trail**:
```typescript
class AuditedInventory extends Inventory {
  private static instance: AuditedInventory;
  private auditLog: Array<{action: string, timestamp: Date}> = [];
  
  public static getInstance(): AuditedInventory {
    if (!AuditedInventory.instance) {
      AuditedInventory.instance = new AuditedInventory();
    }
    return AuditedInventory.instance;
  }
  
  addItem(name: string, quantity: number, price: number): void {
    super.addItem(name, quantity, price);
    this.auditLog.push({
      action: `Added ${quantity} ${name}(s) at $${price} each`,
      timestamp: new Date()
    });
  }
}
```

## Conclusion
The Singleton pattern is crucial for managing shared resources like inventory systems. When implemented correctly, it provides a robust solution for maintaining data consistency across multiple system components while optimizing resource usage.