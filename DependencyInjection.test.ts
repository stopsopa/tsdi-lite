import { DependencyInjection } from "./DependencyInjection";

describe("DependencyInjection", () => {
  it("normal use case", (done) => {
    type DependencyInjectionType = {
      one: string;
      two: string;
      three: number;
    };

    const registry = new DependencyInjection<DependencyInjectionType>();

    registry.registerService("one", "oneval");
    registry.registerService("two", "twoval " + registry.getService("one"));
    registry.registerService("three", 5);

    expect(registry.getService("one")).toBe("oneval");
    expect(registry.getService("two")).toBe("twoval oneval");
    expect(registry.getService("three")).toBe(5);

    done();
  });

  it("getService throw", (done) => {
    type DependencyInjectionType = {
      one: string;
      two: string;
      three: number;
    };

    const registry = new DependencyInjection<DependencyInjectionType>();

    registry.registerService("one", "oneval");
    registry.registerService("two", "twoval " + registry.getService("one"));

    expect(registry.getService("one")).toBe("oneval");
    expect(registry.getService("two")).toBe("twoval oneval");
    try {
      registry.getService("three");
    } catch (e) {
      expect(String(e)).toEqual("Error: tsdi-lite error: key >three< not found in the registry");
    }

    done();
  });

  it("registerService throw", (done) => {
    type DependencyInjectionType = {
      one: string;
      two: string;
      three: number;
    };

    const registry = new DependencyInjection<DependencyInjectionType>();

    registry.registerService("one", "oneval");

    try {
      // try to register the same service again - this should fail with self descriptive message
      registry.registerService("one", "oneval2");
    } catch (e) {
      expect(String(e)).toEqual("Error: tsdi-lite error: key >one< already exists in the registry");
    }

    done();
  });
});
