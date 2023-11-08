import Sheet from "@/components/Sheet/Sheet";
import { InlineStyleRangeInterface, PositionInterface, SheetStateInterface } from "./sheetSlicer";

export const findCell = (
    state: SheetStateInterface,
    position: PositionInterface
) => {
    return state.cells.find((v) => v.position.row === position.row && v.position.column === position.column);
};

export const findInlineStyleRange = (
    state: SheetStateInterface,
    position: PositionInterface,
    inlineStyleRange: InlineStyleRangeInterface
) => {
    const cell = findCell(state, position);
    if (cell) {
        return cell.inlineStyleRanges.find(
            (v) => v.offset === inlineStyleRange.offset && v.length === inlineStyleRange.length && v.style === inlineStyleRange.style
        );
    }
};