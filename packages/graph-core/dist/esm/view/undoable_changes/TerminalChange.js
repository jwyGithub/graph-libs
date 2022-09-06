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
import ObjectCodec from '../../serialization/ObjectCodec';
import CodecRegistry from '../../serialization/CodecRegistry';
/**
 * Action to change a terminal in a model.
 *
 * Constructor: mxTerminalChange
 *
 * Constructs a change of a terminal in the
 * specified model.
 */
export class TerminalChange {
    constructor(model, cell, terminal, source) {
        this.model = model;
        this.cell = cell;
        this.terminal = terminal;
        this.previous = terminal;
        this.source = source;
    }
    /**
     * Changes the terminal of {@link cell}` to {@link previous}` using
     * <Transactions.terminalForCellChanged>.
     */
    execute() {
        this.terminal = this.previous;
        this.previous = this.model.terminalForCellChanged(this.cell, this.previous, this.source);
    }
}
/**
 * Codec for {@link TerminalChange}s. This class is created and registered
 * dynamically at load time and used implicitly via <Codec> and
 * the <CodecRegistry>.
 *
 * Transient Fields:
 *
 * - model
 * - previous
 *
 * Reference Fields:
 *
 * - cell
 * - terminal
 */
export class TerminalChangeCodec extends ObjectCodec {
    constructor() {
        const __dummy = undefined;
        super(new TerminalChange(__dummy, __dummy, __dummy, __dummy), ['model', 'previous'], ['cell', 'terminal']);
    }
    /**
     * Restores the state by assigning the previous value.
     */
    afterDecode(dec, node, obj) {
        obj.previous = obj.terminal;
        return obj;
    }
}
CodecRegistry.register(new TerminalChangeCodec());
export default TerminalChange;
