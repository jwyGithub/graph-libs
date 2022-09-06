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
import Rectangle from '../Rectangle';
import { ALIGN, DEFAULT_IMAGESIZE, NONE, } from '../../../util/Constants';
import RectangleShape from './RectangleShape';
/**
 * Extends {@link Shape} to implement an image shape with a label.
 * This shape is registered under {@link Constants#SHAPE_LABEL} in
 * {@link CellRenderer}.
 *
 * Constructor: mxLabel
 *
 * Constructs a new label shape.
 *
 * @param bounds {@link Rectangle} that defines the bounds. This is stored in
 * {@link Shape#bounds}.
 * @param fill String that defines the fill color. This is stored in <fill>.
 * @param stroke String that defines the stroke color. This is stored in <stroke>.
 * @param strokewidth Optional integer that defines the stroke width. Default is
 * 1. This is stored in <strokewidth>.
 */
class LabelShape extends RectangleShape {
    constructor(bounds, fill, stroke, strokeWidth) {
        super(bounds, fill, stroke, strokeWidth);
        /**
         * Default width and height for the image.
         * @default mxConstants.DEFAULT_IMAGESIZE
         */
        this.imageSize = DEFAULT_IMAGESIZE;
        this.imageSrc = null;
        /**
         * Default value for image spacing
         * @type {number}
         * @default 2
         */
        this.spacing = 2;
        /**
         * Default width and height for the indicicator.
         * @type {number}
         * @default 10
         */
        this.indicatorSize = 10;
        /**
         * Default spacing between image and indicator
         * @default 2
         * @type {number}
         */
        this.indicatorSpacing = 2;
        this.indicatorImageSrc = null;
    }
    /**
     * Initializes the shape and the <indicator>.
     */
    init(container) {
        super.init(container);
        if (this.indicatorShape) {
            this.indicator = new this.indicatorShape();
            this.indicator.dialect = this.dialect;
            this.indicator.init(this.node);
        }
    }
    /**
     * Reconfigures this shape. This will update the colors of the indicator
     * and reconfigure it if required.
     */
    redraw() {
        if (this.indicator) {
            this.indicator.fill = this.indicatorColor;
            this.indicator.stroke = this.indicatorStrokeColor;
            this.indicator.gradient = this.indicatorGradientColor;
            this.indicator.direction = this.indicatorDirection;
            this.indicator.redraw();
        }
        super.redraw();
    }
    /**
     * Returns true for non-rounded, non-rotated shapes with no glass gradient and
     * no indicator shape.
     */
    isHtmlAllowed() {
        return super.isHtmlAllowed() && this.indicatorColor === NONE && !!this.indicatorShape;
    }
    /**
     * Generic background painting implementation.
     * @param {mxAbstractCanvas2D} c
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     */
    paintForeground(c, x, y, w, h) {
        this.paintImage(c, x, y, w, h);
        this.paintIndicator(c, x, y, w, h);
        super.paintForeground(c, x, y, w, h);
    }
    /**
     * Generic background painting implementation.
     * @param {mxAbstractCanvas2D} c
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     */
    paintImage(c, x, y, w, h) {
        if (this.imageSrc) {
            const bounds = this.getImageBounds(x, y, w, h);
            c.image(bounds.x, bounds.y, bounds.width, bounds.height, this.imageSrc, false, false, false);
        }
    }
    /**
     * Generic background painting implementation.
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     */
    getImageBounds(x, y, w, h) {
        const align = this.style?.imageAlign ?? ALIGN.LEFT;
        const valign = this.style?.verticalAlign ?? ALIGN.MIDDLE;
        const width = this.style?.imageWidth ?? DEFAULT_IMAGESIZE;
        const height = this.style?.imageHeight ?? DEFAULT_IMAGESIZE;
        const spacing = this.style?.spacing ?? this.spacing + 5;
        if (align === ALIGN.CENTER) {
            x += (w - width) / 2;
        }
        else if (align === ALIGN.RIGHT) {
            x += w - width - spacing;
        } // default is left
        else {
            x += spacing;
        }
        if (valign === ALIGN.TOP) {
            y += spacing;
        }
        else if (valign === ALIGN.BOTTOM) {
            y += h - height - spacing;
        } // default is middle
        else {
            y += (h - height) / 2;
        }
        return new Rectangle(x, y, width, height);
    }
    /**
     * Generic background painting implementation.
     * @param {mxAbstractCanvas2D} c
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     */
    paintIndicator(c, x, y, w, h) {
        if (this.indicator) {
            this.indicator.bounds = this.getIndicatorBounds(x, y, w, h);
            this.indicator.paint(c);
        }
        else if (this.indicatorImageSrc) {
            const bounds = this.getIndicatorBounds(x, y, w, h);
            c.image(bounds.x, bounds.y, bounds.width, bounds.height, this.indicatorImageSrc, false, false, false);
        }
    }
    /**
     * Generic background painting implementation.
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     * @returns {Rectangle}
     */
    getIndicatorBounds(x, y, w, h) {
        const align = this.style?.imageAlign ?? ALIGN.LEFT;
        const valign = this.style?.verticalAlign ?? ALIGN.MIDDLE;
        const width = this.style?.indicatorWidth ?? this.indicatorSize;
        const height = this.style?.indicatorHeight ?? this.indicatorSize;
        const spacing = this.spacing + 5;
        if (align === ALIGN.RIGHT) {
            x += w - width - spacing;
        }
        else if (align === ALIGN.CENTER) {
            x += (w - width) / 2;
        } // default is left
        else {
            x += spacing;
        }
        if (valign === ALIGN.BOTTOM) {
            y += h - height - spacing;
        }
        else if (valign === ALIGN.TOP) {
            y += spacing;
        } // default is middle
        else {
            y += (h - height) / 2;
        }
        return new Rectangle(x, y, width, height);
    }
    /**
     * Generic background painting implementation.
     */
    redrawHtmlShape() {
        super.redrawHtmlShape();
        // Removes all children
        while (this.node.hasChildNodes()) {
            this.node.removeChild(this.node.lastChild);
        }
        if (this.imageSrc && this.bounds) {
            const node = document.createElement('img');
            node.style.position = 'relative';
            node.setAttribute('border', '0');
            const bounds = this.getImageBounds(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
            bounds.x -= this.bounds.x;
            bounds.y -= this.bounds.y;
            node.style.left = `${Math.round(bounds.x)}px`;
            node.style.top = `${Math.round(bounds.y)}px`;
            node.style.width = `${Math.round(bounds.width)}px`;
            node.style.height = `${Math.round(bounds.height)}px`;
            node.src = this.imageSrc;
            this.node.appendChild(node);
        }
    }
}
export default LabelShape;
