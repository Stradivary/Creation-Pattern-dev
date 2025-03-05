import React, { useState } from 'react';
import { ProducePackage } from '../../module/Builder/package';
import CreationalPatternView from '../CreationalPatternView/CreationalPatternView';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

const BuilderDemo: React.FC = () => {
  const [packageName, setPackageName] = useState<string>('');
  const [fruits, setFruits] = useState<string>('');
  const [vegetables, setVegetables] = useState<string>('');
  const [price, setPrice] = useState<number>(19.99);
  const [isGift, setIsGift] = useState<boolean>(false);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [recyclable, setRecyclable] = useState<boolean>(true);
  const [customMessage, setCustomMessage] = useState<string>('');
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [createdPackages, setCreatedPackages] = useState<Array<any>>([]);

  const handleCreatePackage = () => {
    if (!packageName) {
      alert('Package name is required');
      return;
    }

    try {
      const builder = ProducePackage.builder(packageName);

      // Add fruits if provided
      if (fruits.trim()) {
        builder.withFruits(fruits.split(',').map(f => f.trim()));
      }

      // Add vegetables if provided
      if (vegetables.trim()) {
        builder.withVegetables(vegetables.split(',').map(v => v.trim()));
      }

      // Add price
      if (price > 0) {
        builder.withPrice(price);
      }
      
      // Add optional properties based on user selections
      if (isGift) {
        builder.asGift();
        if (customMessage) {
          builder.withCustomMessage(customMessage);
        }
      }

      if (discountPercent > 0) {
        builder.withDiscount(discountPercent);
      }

      builder.withRecyclablePackaging(recyclable);

      if (deliveryDate) {
        const date = new Date(deliveryDate);
        if (!isNaN(date.getTime())) {
          builder.withDeliveryDate(date);
        }
      }

      // Build the package
      const producePackage = builder.build();

      // Store the created package
      setCreatedPackages(prev => [...prev, {
        name: producePackage.getName(),
        fruits: producePackage.getFruits().join(', '),
        vegetables: producePackage.getVegetables().join(', '),
        price: producePackage.getPrice(),
        discountedPrice: producePackage.getDiscountedPrice(),
        totalItems: producePackage.getTotalItems(),
        isGift: producePackage.getIsGift(),
        hasDiscount: producePackage.getHasDiscount(),
        discountPercent: producePackage.getDiscountPercent(),
        recyclable: producePackage.getRecyclablePackaging(),
        message: producePackage.getCustomMessage(),
        delivery: producePackage.getDeliveryDate() ? producePackage.getDeliveryDate()?.toLocaleDateString() : 'N/A'
      }]);

      // Reset form for next package
      resetForm();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const resetForm = () => {
    setPackageName('');
    setFruits('');
    setVegetables('');
    setPrice(19.99);
    setIsGift(false);
    setDiscountPercent(0);
    setRecyclable(true);
    setCustomMessage('');
    setDeliveryDate('');
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-inner">
      <h3 className="text-lg font-semibold mb-4">Interactive Builder Pattern Demo</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 text-orange-700">Build Your Package</h4>

          <div className="space-y-4">
            <div>
              <Label htmlFor="packageName">Package Name*</Label>
              <Input
                id="packageName"
                type="text"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                className="w-full mt-1"
                placeholder="e.g., Family Weekly Box"
                required
              />
            </div>

            <div>
              <Label htmlFor="fruits">Fruits (comma separated)</Label>
              <Input
                id="fruits"
                type="text"
                value={fruits}
                onChange={(e) => setFruits(e.target.value)}
                className="w-full mt-1"
                placeholder="e.g., Apple, Banana, Orange"
              />
            </div>

            <div>
              <Label htmlFor="vegetables">Vegetables (comma separated)</Label>
              <Input
                id="vegetables"
                type="text"
                value={vegetables}
                onChange={(e) => setVegetables(e.target.value)}
                className="w-full mt-1"
                placeholder="e.g., Carrot, Spinach, Broccoli"
              />
            </div>

            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                className="w-full mt-1"
                min="0.01"
                step="0.01"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
                  className="w-full mt-1"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <Label htmlFor="deliveryDate">Delivery Date</Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full mt-1"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="gift"
                  checked={isGift}
                  onCheckedChange={() => setIsGift(prev => !prev)}
                />
                <Label htmlFor="gift">Is Gift</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="recyclable"
                  checked={recyclable}
                  onCheckedChange={() => setRecyclable(prev => !prev)}
                />
                <Label htmlFor="recyclable">Recyclable</Label>
              </div>
            </div>

            {isGift && (
              <div>
                <Label htmlFor="giftMessage">Gift Message*</Label>
                <Input
                  id="giftMessage"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full mt-1"
                  placeholder="Enter your gift message"
                  required={isGift}
                />
              </div>
            )}

            <div className="pt-2">
              <Button
                onClick={handleCreatePackage}
                className="bg-orange-600 hover:bg-orange-700 w-full"
                disabled={!packageName.trim() || (isGift && !customMessage.trim())}
              >
                Build Package
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 text-orange-700">Created Packages</h4>

          <ScrollArea className="border border-orange-200 rounded-lg h-80 bg-white p-3">
            {createdPackages.length === 0 ? (
              <p className="text-gray-500 italic">No packages yet. Build some using the form.</p>
            ) : (
              <div className="space-y-4">
                {createdPackages.map((pkg, i) => (
                  <div key={i} className="p-3 border rounded-lg border-orange-100 shadow-sm">
                    <div className="flex justify-between items-start">
                      <h5 className="font-semibold text-orange-700">{pkg.name}</h5>
                      <span className={pkg.hasDiscount ? "text-green-600 font-semibold" : ""}>
                        ${pkg.hasDiscount ? pkg.discountedPrice.toFixed(2) : pkg.price.toFixed(2)}
                        {pkg.hasDiscount && <span className="text-xs line-through ml-1 text-gray-500">${pkg.price.toFixed(2)}</span>}
                      </span>
                    </div>

                    <div className="mt-2 text-sm">
                      {pkg.fruits && <p><span className="font-medium">Fruits:</span> {pkg.fruits}</p>}
                      {pkg.vegetables && <p><span className="font-medium">Vegetables:</span> {pkg.vegetables}</p>}
                      <p><span className="font-medium">Total Items:</span> {pkg.totalItems}</p>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {pkg.isGift && <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">Gift</span>}
                        {pkg.hasDiscount && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{pkg.discountPercent}% Off</span>}
                        {pkg.recyclable && <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded">Recyclable</span>}
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Delivery: {pkg.delivery}</span>
                      </div>

                      {pkg.isGift && pkg.message && (
                        <>
                          <Separator className="my-2" />
                          <p className="italic text-xs text-gray-600">{pkg.message}</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          <div className="mt-4">
            <CreationalPatternView
              title="Builder Pattern"
              data="The Builder pattern separates object construction from its representation, allowing the same construction process to create different representations."
              patternType="builder"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderDemo;