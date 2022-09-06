declare const FIELD_NAME = "mxObjectId";
declare type IdentityObject = {
    [FIELD_NAME]?: string;
    [k: string]: any;
};
declare type IdentityFunction = {
    (): any;
    [FIELD_NAME]?: string;
};
/**
 * @class
 *
 * Identity for JavaScript objects and functions. This is implemented using
 * a simple incrementing counter which is stored in each object under
 * {@link FIELD_NAME}.
 *
 * The identity for an object does not change during its lifecycle.
 */
declare class ObjectIdentity {
    /**
     * Name of the field to be used to store the object ID. Default is
     * <code>mxObjectId</code>.
     */
    static FIELD_NAME: string;
    /**
     * Current counter.
     */
    static counter: number;
    /**
     * Returns the ID for the given object or function.
     */
    static get(obj: IdentityObject | IdentityFunction | null): string | null;
    /**
     * Deletes the ID from the given object or function.
     */
    static clear(obj: IdentityObject | IdentityFunction): void;
}
export default ObjectIdentity;
