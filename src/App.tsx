import Header from "./components/Header/Header";
import PatternSection from "./components/PatternSection/PatternSection";
import SingletonDemo from "./components/PatternDemos/SingletonDemo";
import FactoryMethodDemo from "./components/PatternDemos/FactoryMethodDemo";
import AbstractFactoryDemo from "./components/PatternDemos/AbstractFactoryDemo";
import BuilderDemo from "./components/PatternDemos/BuilderDemo";
import PrototypeDemo from "./components/PatternDemos/PrototypeDemo";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-8 max-w-6xl mx-auto">
          <PatternSection
            title="Singleton Pattern"
            description="The Singleton pattern ensures a class has only one instance and provides a global point of access to it. This is useful when exactly one object is needed to coordinate actions across the system, like a central data store or a shared resource."
            patternType="singleton"
          >
            <SingletonDemo />
          </PatternSection>
          
          <PatternSection
            title="Factory Method Pattern"
            description="The Factory Method pattern defines an interface for creating objects but lets subclasses decide which classes to instantiate. It enables a class to defer instantiation to subclasses, promoting loose coupling and extensibility in your code."
            patternType="factory"
          >
            <FactoryMethodDemo />
          </PatternSection>
          
          <PatternSection
            title="Abstract Factory Pattern"
            description="The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes. This pattern is particularly useful when your system needs to be independent from how its products are created and represented."
            patternType="abstract-factory"
          >
            <AbstractFactoryDemo />
          </PatternSection>
          
          <PatternSection
            title="Builder Pattern"
            description="The Builder pattern separates the construction of a complex object from its representation, allowing the same construction process to create different representations. It's especially useful for objects with numerous optional parameters or complex internal structures."
            patternType="builder"
          >
            <BuilderDemo />
          </PatternSection>
          
          <PatternSection
            title="Prototype Pattern"
            description="The Prototype pattern lets you copy existing objects without making your code dependent on their concrete classes. This pattern delegates the cloning process to the actual objects that are being cloned, making it easier to create complex objects with varying states."
            patternType="prototype"
          >
            <PrototypeDemo />
          </PatternSection>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-6 mt-10">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">Creational Design Patterns Demo</p>
          <p className="text-gray-400 text-sm">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
