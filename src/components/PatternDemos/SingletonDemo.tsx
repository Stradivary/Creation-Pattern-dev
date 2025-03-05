import React, { useState } from 'react';
import { Inventory } from '../../module/SingleTon/inventory';
import CreationalPatternView from '../CreationalPatternView/CreationalPatternView';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';

const SingletonDemo: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0.99);
  const [sellQuantity, setSellQuantity] = useState(1);

  const appendLog = (message: string) => {
    setLogs(prev => [...prev, message]);
  };

  const handleAddItem = () => {
    if (!itemName) return;
    
    const inventory = Inventory.getInstance();
    inventory.addItem(itemName, quantity, price);
    
    appendLog(`Added ${quantity} ${itemName}(s) at $${price} each to inventory`);
    setItemName('');
    setQuantity(1);
    setPrice(0.99);
  };

  const handleSellItem = () => {
    if (!itemName) return;
    
    const inventory = Inventory.getInstance();
    const success = inventory.sellItem(itemName, sellQuantity);
    
    if (success) {
      appendLog(`Sold ${sellQuantity} ${itemName}(s)`);
    } else {
      appendLog(`Failed to sell ${sellQuantity} ${itemName}(s) - insufficient stock`);
    }
    setSellQuantity(1);
  };

  const handleCheckStock = () => {
    if (!itemName) return;
    
    const inventory = Inventory.getInstance();
    const count = inventory.getStockCount(itemName);
    const itemPrice = inventory.getPrice(itemName);
    
    appendLog(`Stock check: ${count} ${itemName}(s) available at $${itemPrice} each`);
  };

  const handleShowAllItems = () => {
    const inventory = Inventory.getInstance();
    const items = inventory.getAllItems();
    
    if (items.length === 0) {
      appendLog('Inventory is empty');
      return;
    }
    
    appendLog('Current inventory:');
    items.forEach(([name, count]) => {
      const itemPrice = inventory.getPrice(name);
      appendLog(`- ${name}: ${count} in stock at $${itemPrice} each`);
    });
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-inner">
      <h3 className="text-lg font-semibold mb-4">Interactive Singleton Demo</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 text-blue-700">Inventory Management</h4>
          
          <div className="mb-4">
            <Label htmlFor="itemName" className="mb-1">Item Name</Label>
            <Input 
              id="itemName"
              type="text" 
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full"
              placeholder="e.g., Apple"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="quantity" className="mb-1">Quantity</Label>
              <Input
                id="quantity" 
                type="number" 
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                className="w-full"
                min="1"
              />
            </div>
            <div>
              <Label htmlFor="price" className="mb-1">Price ($)</Label>
              <Input 
                id="price"
                type="number" 
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                className="w-full"
                min="0.01"
                step="0.01"
              />
            </div>
          </div>
          
          <Button 
            onClick={handleAddItem}
            disabled={!itemName}
            className="w-full mb-4"
            variant="default"
          >
            Add to Inventory
          </Button>
          
          <div className="mb-4">
            <Label htmlFor="sellQuantity" className="mb-1">Sell Quantity</Label>
            <div className="flex gap-2">
              <Input 
                id="sellQuantity"
                type="number" 
                value={sellQuantity}
                onChange={(e) => setSellQuantity(parseInt(e.target.value) || 0)}
                className="flex-grow"
                min="1"
              />
              <Button 
                onClick={handleSellItem}
                disabled={!itemName}
                variant="destructive"
              >
                Sell
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={handleCheckStock}
              disabled={!itemName}
              variant="secondary"
            >
              Check Stock
            </Button>
            <Button 
              onClick={handleShowAllItems}
              variant="outline"
            >
              Show All Items
            </Button>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 text-blue-700">Event Log</h4>
          <ScrollArea className="border border-blue-200 rounded-lg h-64 bg-white p-3">
            {logs.length === 0 ? (
              <p className="text-gray-500 italic">No events yet. Try adding or selling items.</p>
            ) : (
              logs.map((log, i) => (
                <p key={i} className="text-sm mb-1 pb-1 border-b border-blue-50">
                  {log}
                </p>
              ))
            )}
          </ScrollArea>
          
          <div className="mt-4">
            <CreationalPatternView 
              title="Singleton Pattern Note" 
              data="This demo uses a single Inventory instance across all operations. Try refreshing the page - your inventory will be reset because we're using an in-memory singleton." 
              patternType="singleton" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingletonDemo;