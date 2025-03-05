import React, { useState } from 'react';
import { RegularFruitFactory, OrganicFruitFactory } from '../../module/AbstractFactory/fruit';
import CreationalPatternView from '../CreationalPatternView/CreationalPatternView';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

const AbstractFactoryDemo: React.FC = () => {
  const [selectedFactory, setSelectedFactory] = useState<'regular' | 'organic'>('regular');
  const [createdItems, setCreatedItems] = useState<Array<{
    name: string, 
    description: string, 
    details: string, 
    type: 'fruit' | 'packaging' | 'gift-set'
  }>>([]);

  // Product Family 1: Fruits
  const handleCreateApple = () => {
    const factory = selectedFactory === 'regular' ? new RegularFruitFactory() : new OrganicFruitFactory();
    const apple = factory.createApple();
    
    setCreatedItems(prev => [...prev, {
      name: `${apple.getType().charAt(0).toUpperCase() + apple.getType().slice(1)} Apple`,
      description: apple.getDescription(),
      details: apple.planting(),
      type: 'fruit'
    }]);
  };

  const handleCreateMelon = () => {
    const factory = selectedFactory === 'regular' ? new RegularFruitFactory() : new OrganicFruitFactory();
    const melon = factory.createMelon();
    
    setCreatedItems(prev => [...prev, {
      name: `${melon.getType().charAt(0).toUpperCase() + melon.getType().slice(1)} Melon`,
      description: melon.getDescription(),
      details: melon.planting(),
      type: 'fruit'
    }]);
  };
  
  // Product Family 2: Packaging
  const handleCreateFruitBox = () => {
    const factory = selectedFactory === 'regular' ? new RegularFruitFactory() : new OrganicFruitFactory();
    const box = factory.createFruitBox();
    
    setCreatedItems(prev => [...prev, {
      name: `${selectedFactory.charAt(0).toUpperCase() + selectedFactory.slice(1)} Fruit Box`,
      description: box.getDescription(),
      details: `Material: ${box.getMaterial()}, Recyclable: ${box.isRecyclable() ? 'Yes' : 'No'}, Capacity: ${box.getCapacity()} fruits`,
      type: 'packaging'
    }]);
  };
  
  const handleCreateGiftWrapping = () => {
    const factory = selectedFactory === 'regular' ? new RegularFruitFactory() : new OrganicFruitFactory();
    const wrapping = factory.createGiftWrapping();
    
    setCreatedItems(prev => [...prev, {
      name: `${selectedFactory.charAt(0).toUpperCase() + selectedFactory.slice(1)} Gift Wrapping`,
      description: wrapping.getDescription(),
      details: `Material: ${wrapping.getMaterial()}, Recyclable: ${wrapping.isRecyclable() ? 'Yes' : 'No'}, Includes Ribbon: ${wrapping.hasRibbon() ? 'Yes' : 'No'}`,
      type: 'packaging'
    }]);
  };
  
  // Create combined products that demonstrate the family concept
  const handleCreateGiftBasket = () => {
    const factory = selectedFactory === 'regular' ? new RegularFruitFactory() : new OrganicFruitFactory();
    
    // Get products from multiple families that are designed to work together
    const apple = factory.createApple();
    const melon = factory.createMelon();
    const fruitBox = factory.createFruitBox();
    const giftWrapping = factory.createGiftWrapping();
    
    const totalCost = apple.getPrice() + melon.getPrice() + fruitBox.getCost() + giftWrapping.getCost();
    
    setCreatedItems(prev => [...prev, {
      name: `${selectedFactory.charAt(0).toUpperCase() + selectedFactory.slice(1)} Gift Basket`,
      description: `Complete gift basket with ${apple.getType()} apple, ${melon.getType()} melon, and matching packaging ($${totalCost.toFixed(2)} total)`,
      details: `Contents: ${apple.getDescription()}, ${melon.getDescription()}, ${fruitBox.getDescription()}, ${giftWrapping.getDescription()}`,
      type: 'gift-set'
    }]);
  };

  const handleClearItems = () => {
    setCreatedItems([]);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-inner">
      <h3 className="text-lg font-semibold mb-4">Interactive Abstract Factory Demo</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 text-purple-700">Product Factory Selection</h4>

          <div className="mb-5">
            <Label className="block text-sm font-medium mb-2">Select Factory Type</Label>
            <RadioGroup 
              value={selectedFactory} 
              onValueChange={(value) => setSelectedFactory(value as 'regular' | 'organic')}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="regular" id="regular" />
                <Label htmlFor="regular">Regular Factory</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="organic" id="organic" />
                <Label htmlFor="organic">Organic Factory</Label>
              </div>
            </RadioGroup>
          </div>

          <Tabs defaultValue="fruits" className="mb-4">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="fruits">Fruits</TabsTrigger>
              <TabsTrigger value="packaging">Packaging</TabsTrigger>
            </TabsList>
            
            <TabsContent value="fruits" className="mt-4">
              <Card>
                <CardContent className="pt-4">
                  <p className="text-xs text-gray-500 mb-3">Create fruit products from the selected factory:</p>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={handleCreateApple}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Create Apple
                    </Button>
                    <Button
                      onClick={handleCreateMelon}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Create Melon
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="packaging" className="mt-4">
              <Card>
                <CardContent className="pt-4">
                  <p className="text-xs text-gray-500 mb-3">Create packaging products from the selected factory:</p>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={handleCreateFruitBox}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Create Fruit Box
                    </Button>
                    <Button
                      onClick={handleCreateGiftWrapping}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Create Gift Wrap
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="space-y-4">
            <Button
              onClick={handleCreateGiftBasket}
              className="bg-purple-800 hover:bg-purple-900 w-full"
            >
              Create Gift Basket Set
            </Button>
            
            <Button
              onClick={handleClearItems}
              variant="secondary"
              className="w-full"
            >
              Clear All Items
            </Button>
          </div>
          
          <div className="mt-4 border-t pt-4 border-purple-100">
            <p className="text-xs text-gray-600">
              <span className="font-semibold">Note:</span> Abstract Factory pattern creates <span className="font-medium">families of related products</span>. 
              Each factory type produces a consistent set of products designed to work together.
            </p>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 text-purple-700">Created Product Families</h4>
          
          <ScrollArea className="border border-purple-200 rounded-lg h-[500px] bg-white p-3">
            {createdItems.length === 0 ? (
              <p className="text-gray-500 italic">No products yet. Create some using the factory buttons.</p>
            ) : (
              <div className="space-y-3">
                {createdItems.map((item, i) => (
                  <div 
                    key={i} 
                    className={`p-3 border rounded-lg shadow-sm ${
                      item.type === 'fruit' ? 'border-green-100' : 
                      item.type === 'packaging' ? 'border-blue-100' : 
                      'border-purple-200 bg-purple-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <h5 className={`font-semibold ${
                        item.type === 'fruit' ? 'text-green-700' : 
                        item.type === 'packaging' ? 'text-blue-700' : 
                        'text-purple-700'
                      }`}>
                        {item.name}
                      </h5>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        item.type === 'fruit' ? 'bg-green-100 text-green-800' : 
                        item.type === 'packaging' ? 'bg-blue-100 text-blue-800' : 
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {item.type === 'fruit' ? 'Fruit Product' : 
                         item.type === 'packaging' ? 'Packaging Product' : 
                         'Product Family'}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{item.description}</p>
                    <Separator className="my-2" />
                    <p className="text-xs text-gray-600">{item.details}</p>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          <div className="mt-4">
            <CreationalPatternView
              title="Abstract Factory Pattern"
              data={`The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes. The ${selectedFactory} factory creates consistent product families that work together.`}
              patternType="abstract-factory"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbstractFactoryDemo;