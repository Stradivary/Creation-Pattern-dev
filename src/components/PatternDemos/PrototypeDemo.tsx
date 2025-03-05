import React, { useState } from 'react';
import { ProduceBundle, BundleItem } from '../../module/Prototypes/bundle';
import CreationalPatternView from '../CreationalPatternView/CreationalPatternView';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const PrototypeDemo: React.FC = () => {
  const [bundles, setBundles] = useState<ProduceBundle[]>([]);
  const [selectedBundleIndex, setSelectedBundleIndex] = useState<number>(-1);
  const [newBundleName, setNewBundleName] = useState<string>('');
  const [newDiscount, setNewDiscount] = useState<number>(0);
  const [newSeasonal, setNewSeasonal] = useState<boolean>(false);
  const [newTags, setNewTags] = useState<string>('');
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemPrice, setNewItemPrice] = useState<number>(1.99);
  const [newItemQuantity, setNewItemQuantity] = useState<number>(1);
  const [newItemOrganic, setNewItemOrganic] = useState<boolean>(false);

  // Create initial template bundle
  const createTemplateBundle = () => {
    const templateBundle = new ProduceBundle(
      'Basic Bundle', 
      [
        new BundleItem('Apple', 0.99, 3),
        new BundleItem('Banana', 0.79, 5),
        new BundleItem('Carrot', 1.49, 4),
      ],
      5,
      ['popular', 'basic'],
      false
    );
    
    setBundles([templateBundle]);
  };

  // Add item to selected bundle
  const addItemToBundle = () => {
    if (selectedBundleIndex === -1) return;
    if (!newItemName.trim()) {
      alert('Item name is required');
      return;
    }
    
    const updatedBundles = [...bundles];
    const bundle = updatedBundles[selectedBundleIndex];
    
    // Clone the bundle to work with
    const updatedBundle = bundle.clone();
    updatedBundle.items.push(new BundleItem(
      newItemName, 
      newItemPrice, 
      newItemQuantity,
      newItemOrganic
    ));
    
    updatedBundles[selectedBundleIndex] = updatedBundle;
    setBundles(updatedBundles);
    
    // Reset fields
    setNewItemName('');
    setNewItemPrice(1.99);
    setNewItemQuantity(1);
    setNewItemOrganic(false);
  };

  // Create a variant from selected bundle
  const createVariant = () => {
    if (selectedBundleIndex === -1) return;
    if (!newBundleName.trim()) {
      alert('New variant name is required');
      return;
    }
    
    const sourceBundle = bundles[selectedBundleIndex];
    
    // Create a variant with specified options
    const variant = sourceBundle.createVariant({
      name: newBundleName,
      discountPercentage: newDiscount || sourceBundle.discountPercentage,
      seasonal: newSeasonal,
      tags: newTags.trim() 
        ? [...sourceBundle.tags, ...newTags.split(',').map(t => t.trim())] 
        : [...sourceBundle.tags]
    });
    
    setBundles([...bundles, variant]);
    
    // Reset fields
    setNewBundleName('');
    setNewDiscount(0);
    setNewSeasonal(false);
    setNewTags('');
  };

  // Calculate and format price
  const formatPrice = (bundle: ProduceBundle) => {
    const originalPrice = bundle.calculateTotalPrice();
    const discountedPrice = bundle.getDiscountedPrice();
    
    if (originalPrice !== discountedPrice) {
      return (
        <span>
          <span className="text-green-600">${discountedPrice.toFixed(2)}</span>
          <span className="text-gray-400 text-xs line-through ml-1">${originalPrice.toFixed(2)}</span>
        </span>
      );
    }
    
    return <span>${originalPrice.toFixed(2)}</span>;
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-inner">
      <h3 className="text-lg font-semibold mb-4">Interactive Prototype Pattern Demo</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 text-yellow-700">Prototype Management</h4>
          
          {bundles.length === 0 ? (
            <div className="mb-4">
              <p className="text-sm mb-3">Start by creating a template bundle that will serve as our prototype</p>
              <Button
                onClick={createTemplateBundle}
                variant="default"
                className="bg-yellow-600 hover:bg-yellow-700 w-full"
              >
                Create Template Bundle
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="bundle-select" className="mb-1 block">Select Bundle to Work With</Label>
                <Select 
                  value={selectedBundleIndex > -1 ? selectedBundleIndex.toString() : "-1"}
                  onValueChange={(value) => setSelectedBundleIndex(parseInt(value))}
                >
                  <SelectTrigger id="bundle-select" className="w-full">
                    <SelectValue placeholder="-- Select a bundle --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="-1">-- Select a bundle --</SelectItem>
                    {bundles.map((bundle, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {bundle.name} ({bundle.items.length} items)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedBundleIndex !== -1 && (
                <>
                  <div className="border-t border-b py-3 border-yellow-200">
                    <h5 className="font-medium text-sm mb-2">Add Item to Bundle</h5>
                    <div className="space-y-2">
                      <div>
                        <Label htmlFor="item-name" className="text-xs">Item Name</Label>
                        <Input
                          id="item-name"
                          type="text"
                          value={newItemName}
                          onChange={(e) => setNewItemName(e.target.value)}
                          className="w-full"
                          placeholder="e.g., Orange"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="item-price" className="text-xs">Price ($)</Label>
                          <Input
                            id="item-price"
                            type="number"
                            value={newItemPrice}
                            onChange={(e) => setNewItemPrice(parseFloat(e.target.value) || 0)}
                            className="w-full"
                            min="0.01"
                            step="0.01"
                          />
                        </div>
                        <div>
                          <Label htmlFor="item-quantity" className="text-xs">Quantity</Label>
                          <Input
                            id="item-quantity"
                            type="number"
                            value={newItemQuantity}
                            onChange={(e) => setNewItemQuantity(parseInt(e.target.value) || 0)}
                            className="w-full"
                            min="1"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="organic"
                          checked={newItemOrganic}
                          onCheckedChange={() => setNewItemOrganic(prev => !prev)}
                        />
                        <Label htmlFor="organic" className="text-xs">Organic</Label>
                      </div>
                      
                      <Button
                        onClick={addItemToBundle}
                        disabled={selectedBundleIndex === -1 || !newItemName.trim()}
                        className="bg-yellow-600 hover:bg-yellow-700 w-full"
                        size="sm"
                      >
                        Add Item
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border-b pb-3 border-yellow-200">
                    <h5 className="font-medium text-sm mb-2">Create Variant from Prototype</h5>
                    <div className="space-y-2">
                      <div>
                        <Label htmlFor="bundle-name" className="text-xs">New Bundle Name</Label>
                        <Input
                          id="bundle-name"
                          type="text"
                          value={newBundleName}
                          onChange={(e) => setNewBundleName(e.target.value)}
                          className="w-full"
                          placeholder="e.g., Weekend Special"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="discount" className="text-xs">Discount (%)</Label>
                          <Input
                            id="discount"
                            type="number"
                            value={newDiscount}
                            onChange={(e) => setNewDiscount(parseFloat(e.target.value) || 0)}
                            className="w-full"
                            min="0"
                            max="100"
                          />
                        </div>
                        <div>
                          <Label htmlFor="tags" className="text-xs">Tags (comma separated)</Label>
                          <Input
                            id="tags"
                            type="text"
                            value={newTags}
                            onChange={(e) => setNewTags(e.target.value)}
                            className="w-full"
                            placeholder="e.g., special, limited"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="seasonal"
                          checked={newSeasonal}
                          onCheckedChange={() => setNewSeasonal(prev => !prev)}
                        />
                        <Label htmlFor="seasonal" className="text-xs">Seasonal Bundle</Label>
                      </div>
                      
                      <Button
                        onClick={createVariant}
                        disabled={selectedBundleIndex === -1 || !newBundleName.trim()}
                        className="bg-yellow-700 hover:bg-yellow-800 w-full"
                        size="sm"
                      >
                        Create Variant
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 text-yellow-700">Bundle Collection</h4>
          
          <ScrollArea className="border border-yellow-200 rounded-lg h-72 bg-white p-3">
            {bundles.length === 0 ? (
              <p className="text-gray-500 italic">No bundles yet. Create a template bundle first.</p>
            ) : (
              <div className="space-y-4">
                {bundles.map((bundle, i) => (
                  <div 
                    key={i} 
                    className={`p-3 border rounded-lg shadow-sm ${
                      selectedBundleIndex === i ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedBundleIndex(i)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="flex justify-between items-start">
                      <h5 className="font-semibold text-yellow-800">
                        {bundle.name}
                        {bundle.seasonal && <span className="ml-2 text-xs bg-red-100 text-red-700 px-1 py-0.5 rounded">Seasonal</span>}
                      </h5>
                      {formatPrice(bundle)}
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">
                        {bundle.items.length} items | {bundle.discountPercentage > 0 ? `${bundle.discountPercentage}% discount` : 'No discount'}
                      </p>
                      
                      {bundle.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {bundle.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="bg-yellow-100 text-yellow-800 text-xs px-1.5 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="mt-2 text-sm">
                        <p className="font-medium mb-1 text-xs text-gray-600">Items:</p>
                        <div className="flex flex-col gap-1">
                          {bundle.items.map((item, itemIndex) => (
                            <p key={itemIndex} className="text-xs">
                              {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                              {item.organic && <span className="ml-1 text-green-600">(Organic)</span>}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          <div className="mt-4">
            <CreationalPatternView
              title="Prototype Pattern"
              data="The Prototype pattern lets you copy existing objects without making your code dependent on their classes. This is useful when creating variations of objects that share common properties."
              patternType="prototype"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrototypeDemo;