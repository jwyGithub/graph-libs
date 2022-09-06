/**
 * @class StyleRegistry
 *
 * Singleton class that acts as a global converter from string to object values
 * in a style. This is currently only used to perimeters and edge styles.
 */
declare class StyleRegistry {
    /**
     * Maps from strings to objects.
     */
    static values: any;
    /**
     * Puts the given object into the registry under the given name.
     */
    static putValue(name: string, obj: any): void;
    /**
     * Returns the value associated with the given name.
     */
    static getValue(name: string): any;
    /**
     * Returns the name for the given value.
     */
    static getName(value: any): string | null;
}
export default StyleRegistry;
