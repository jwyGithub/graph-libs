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
import GenericChangeCodec from './GenericChangeCodec';
/**
 * Action to change a cell's collapsed state in a model.
 *
 * Constructor: mxCollapseChange
 *
 * Constructs a change of a collapsed state in the
 * specified model.
 */
class CollapseChange {
    constructor(model, cell, collapsed) {
        this.model = model;
        this.cell = cell;
        this.collapsed = collapsed;
        this.previous = collapsed;
    }
    /**
     * Changes the collapsed state of {@link cell}` to {@link previous}` using
     * <Transactions.collapsedStateForCellChanged>.
     */
    execute() {
        this.collapsed = this.previous;
        this.previous = this.model.collapsedStateForCellChanged(this.cell, this.previous);
    }
}
const __dummy = undefined;
CodecRegistry.register(new GenericChangeCodec(new CollapseChange(__dummy, __dummy, __dummy), 'collapsed'));
export default CollapseChange;
