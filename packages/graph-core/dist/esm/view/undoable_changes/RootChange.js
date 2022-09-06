/*
Copyright 2021-present The maxGraph project Contributors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import CodecRegistry from '../../serialization/CodecRegistry';
import { NODETYPE } from '../../util/Constants';
import ObjectCodec from '../../serialization/ObjectCodec';
/**
 * Action to change the root in a model.
 *
 * Constructor: mxRootChange
 *
 * Constructs a change of the root in the
 * specified model.
 *
 * @class RootChange
 */
export class RootChange {
    constructor(model, root) {
        this.model = model;
        this.root = root;
        this.previous = root;
    }
    /**
     * Carries out a change of the root using
     * <Transactions.rootChanged>.
     */
    execute() {
        this.root = this.previous;
        this.previous = this.model.rootChanged(this.previous);
    }
}
/**
 * Codec for {@link RootChange}s. This class is created and registered
 * dynamically at load time and used implicitly via <Codec> and
 * the <CodecRegistry>.
 *
 * Transient Fields:
 *
 * - model
 * - previous
 * - root
 */
export class RootChangeCodec extends ObjectCodec {
    constructor() {
        const __dummy = undefined;
        super(new RootChange(__dummy, __dummy), ['model', 'previous', 'root']);
    }
    /**
     * Encodes the child recursively.
     */
    afterEncode(enc, obj, node) {
        enc.encodeCell(obj.root, node);
        return node;
    }
    /**
     * Decodes the optional children as cells
     * using the respective decoder.
     */
    beforeDecode(dec, node, obj) {
        if (node.firstChild != null && node.firstChild.nodeType === NODETYPE.ELEMENT) {
            // Makes sure the original node isn't modified
            node = node.cloneNode(true);
            let tmp = node.firstChild;
            obj.root = dec.decodeCell(tmp, false);
            let tmp2 = tmp.nextSibling;
            tmp.parentNode.removeChild(tmp);
            tmp = tmp2;
            while (tmp != null) {
                tmp2 = tmp.nextSibling;
                dec.decodeCell(tmp);
                tmp.parentNode.removeChild(tmp);
                tmp = tmp2;
            }
        }
        return node;
    }
    /**
     * Restores the state by assigning the previous value.
     */
    afterDecode(dec, node, obj) {
        obj.previous = obj.root;
        return obj;
    }
}
CodecRegistry.register(new RootChangeCodec());
export default RootChange;
