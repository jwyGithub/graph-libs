/*
Copyright 2021-present The maxGraph project Contributors
Copyright (c) 2006-2015, JGraph Ltd
Copyright (c) 2006-2015, Gaudenz Alder

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
import Client from '../Client';
import InternalEvent from '../view/event/InternalEvent';
import { write, writeln } from "../util/domUtils";
import Translations from "../util/Translations";
/**
 * A simple class for creating HTML forms.
 *
 * @class MaxForm
 */
class MaxForm {
    constructor(className) {
        this.table = document.createElement('table');
        this.table.className = className;
        this.body = document.createElement('tbody');
        this.table.appendChild(this.body);
    }
    /**
     * Returns the table that contains this form.
     */
    getTable() {
        return this.table;
    }
    /**
     * Helper method to add an OK and Cancel button using the respective
     * functions.
     */
    addButtons(okFunct, cancelFunct) {
        const tr = document.createElement('tr');
        let td = document.createElement('td');
        tr.appendChild(td);
        td = document.createElement('td');
        // Adds the ok button
        let button = document.createElement('button');
        write(button, Translations.get('ok') || 'OK');
        td.appendChild(button);
        InternalEvent.addListener(button, 'click', () => {
            okFunct();
        });
        // Adds the cancel button
        button = document.createElement('button');
        write(button, Translations.get('cancel') || 'Cancel');
        td.appendChild(button);
        InternalEvent.addListener(button, 'click', () => {
            cancelFunct();
        });
        tr.appendChild(td);
        this.body.appendChild(tr);
    }
    /**
     * Adds an input for the given name, type and value and returns it.
     */
    addText(name, value, type = 'text') {
        const input = document.createElement('input');
        input.setAttribute('type', type);
        input.value = value;
        return this.addField(name, input);
    }
    /**
     * Adds a checkbox for the given name and value and returns the textfield.
     */
    addCheckbox(name, value) {
        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        this.addField(name, input);
        // IE can only change the checked value if the input is inside the DOM
        if (value) {
            input.checked = true;
        }
        return input;
    }
    /**
     * Adds a textarea for the given name and value and returns the textarea.
     */
    addTextarea(name, value, rows) {
        const input = document.createElement('textarea');
        if (Client.IS_NS) {
            rows--;
        }
        input.setAttribute('rows', String(rows || 2));
        input.value = value;
        return this.addField(name, input);
    }
    /**
     * Adds a combo for the given name and returns the combo.
     */
    addCombo(name, isMultiSelect, size) {
        const select = document.createElement('select');
        if (size != null) {
            select.setAttribute('size', String(size));
        }
        if (isMultiSelect) {
            select.setAttribute('multiple', 'true');
        }
        return this.addField(name, select);
    }
    /**
     * Adds an option for the given label to the specified combo.
     */
    addOption(combo, label, value, isSelected) {
        const option = document.createElement('option');
        writeln(option, label);
        option.setAttribute('value', value);
        if (isSelected) {
            option.setAttribute('selected', String(isSelected));
        }
        combo.appendChild(option);
    }
    /**
     * Adds a new row with the name and the input field in two columns and
     * returns the given input.
     */
    addField(name, input) {
        const tr = document.createElement('tr');
        let td = document.createElement('td');
        write(td, name);
        tr.appendChild(td);
        td = document.createElement('td');
        td.appendChild(input);
        tr.appendChild(td);
        this.body.appendChild(tr);
        return input;
    }
}
export default MaxForm;
