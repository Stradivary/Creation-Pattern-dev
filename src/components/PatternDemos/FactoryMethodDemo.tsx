import React, { useState } from 'react';
import { LeafyGreenFactory, CruciferousFactory, RootVegetableFactory, FruitFactory } from '../../module/FactoryMethod/vegetable';
import CreationalPatternView from '../CreationalPatternView/CreationalPatternView';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { ScrollArea } from '../ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const FactoryMethodDemo: React.FC = () => {
  const [selectedFactory, setSelectedFactory] = useState<string>('leafy-green');
  const [produceName, setProduceName] = useState<string>('');
  const [producePrice, setProducePrice] = useState<number>(2.99);
  const [isOrganic, setIsOrganic] = useState<boolean>(false);
  const [createdItems, setCreatedItems] = useState<Array<{ description: string }>>([]);

  const factories = {
    'leafy-green': new LeafyGreenFactory(),
    'cruciferous': new CruciferousFactory(),
    'root': new RootVegetableFactory(),
    'fruit': new FruitFactory()
  };

  const factoryNames = {
    'leafy-green': 'Leafy Green Factory',
    'cruciferous': 'Cruciferous Factory',
    'root': 'Root Vegetable Factory',
    'fruit': 'Fruit Factory'
  };

  const handleCreateProduce = () => {
    if (!produceName || produceName.trim() === '') {
      alert('Please provide a name for your produce');
      return;
    }

    const factory = factories[selectedFactory as keyof typeof factories];
    const produce = factory.getProduce(produceName, producePrice, isOrganic);

    setCreatedItems(prev => [...prev, { description: produce.getDescription() }]);
    setProduceName('');
    setProducePrice(2.99);
    setIsOrganic(false);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-inner">
      <h3 className="text-lg font-semibold mb-4">Interactive Factory Method Demo</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 text-green-700">Create Produce</h4>

          <div className="mb-4">
            <Label htmlFor="factory-select" className="mb-1">Select Factory Type</Label>
            <Select
              value={selectedFactory}
              onValueChange={(value) => setSelectedFactory(value)}
            >
              <SelectTrigger id="factory-select" className="w-full">
                <SelectValue placeholder="Select factory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="leafy-green">Leafy Green Factory</SelectItem>
                <SelectItem value="cruciferous">Cruciferous Factory</SelectItem>
                <SelectItem value="root">Root Vegetable Factory</SelectItem>
                <SelectItem value="fruit">Fruit Factory</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <Label htmlFor="produce-name" className="mb-1">Produce Name</Label>
            <Input
              id="produce-name"
              type="text"
              value={produceName}
              onChange={(e) => setProduceName(e.target.value)}
              className="w-full"
              placeholder="e.g., Spinach, Apple, etc."
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="produce-price" className="mb-1">Price ($)</Label>
            <Input
              id="produce-price"
              type="number"
              value={producePrice}
              onChange={(e) => setProducePrice(parseFloat(e.target.value) || 0)}
              className="w-full"
              min="0.01"
              step="0.01"
            />
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <Checkbox 
              id="organic" 
              checked={isOrganic} 
              onCheckedChange={() => setIsOrganic(prev => !prev)}
            />
            <Label htmlFor="organic">Organic</Label>
          </div>

          <Button
            onClick={handleCreateProduce}
            className="w-full"
            variant="default"
            disabled={!produceName.trim()}
          >
            Create Produce
          </Button>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 text-green-700">Created Products</h4>
          
          <ScrollArea className="border border-green-200 rounded-lg h-64 bg-white p-3">
            {createdItems.length === 0 ? (
              <p className="text-gray-500 italic">No products yet. Create some using the factory.</p>
            ) : (
              <div className="space-y-2">
                {createdItems.map((item, i) => (
                  <div key={i} className="p-2 border-b border-green-50">
                    <p className="text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          <div className="mt-4">
            <CreationalPatternView
              title="Factory Method Pattern"
              data={`Using ${factoryNames[selectedFactory as keyof typeof factoryNames]} to create specific types of produce with consistent interfaces.`}
              patternType="factory"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactoryMethodDemo;