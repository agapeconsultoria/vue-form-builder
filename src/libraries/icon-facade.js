/**
 * Form-Icon-Facade is a lightweight library to help you retain ICON inside Form-Builder v2
 * @author Phat Tran <phattranminh96@gmail.com>
 * @license From Zondicons of Steve Schoger. Thanks very much for the beautiful/lightweight icons
 * @iconHomePage https://www.zondicons.com/
 */
import { ARROW_UP_ICON } from "@/libraries/icons/arrow-up.icon";
import { ARROW_DOWN_ICON } from "@/libraries/icons/arrow-down.icon";
import { EDIT_PENCIL_ICON } from "@/libraries/icons/edit-pencil.icon";
import { EDIT_PENCIL_BORDER } from "@/libraries/icons/edit-pencil-border.icon";
import { COG_ICON } from "@/libraries/icons/cog.icon";
import { ADD_OUTLINE_ICON } from "@/libraries/icons/add-outline.icon";
import { CLOSE_ICON } from "@/libraries/icons/close.icon";
import { TRASH_ICON } from "@/libraries/icons/trash.icon";
import { TRASH_ICON_CUSTOM } from "@/libraries/icons/trash-custom.icon";
import { CHEVRON_UP_ICON } from "@/libraries/icons/chevron-up.icon";
import { CHEVRON_DOWN_ICON } from "@/libraries/icons/chevron-down.icon";
import { NAVIGATION_MORE_ICON } from "@/libraries/icons/navigation-more.icon";
import { INFORMATION_OUTLINE_ICON } from "@/libraries/icons/information-outline.icon";
import { CORNER_LEFT } from "@/libraries/icons/corner_left.icon";
import { CORNER_RIGHT } from "@/libraries/icons/corner_right.icon";
import { PEOPLE } from "@/libraries/icons/people.icon";
import { CIRCLE } from "@/libraries/icons/circle.icon";
import { ADD_CONTROL } from "@/libraries/icons/add-control.icon";
import { BUTTON_ICON } from "@/libraries/icons/examples-controls/button.icon";
import { CHECKBOX_ICON } from "@/libraries/icons/examples-controls/checkbox.icon";
import { DATE_ICON } from "@/libraries/icons/examples-controls/date.icon";
import { DROPDOWN_ICON } from "@/libraries/icons/examples-controls/dropdown.icon";
import { INPUT_ICON } from "@/libraries/icons/examples-controls/input.icon";
import { RADIO_ICON } from "@/libraries/icons/examples-controls/radio-button.icon";
import { TEXTAREA_ICON } from "@/libraries/icons/examples-controls/text-area.icon";
import { TEXTBLOCK_ICON } from "@/libraries/icons/examples-controls/text-block.icon";
import { NUMBER_ICON } from "@/libraries/icons/examples-controls/number.icon";
import { ADD_SECTION } from "@/libraries/icons/add-section.icon";
import { CLOSE_CUSTOM } from "@/libraries/icons/close-custom.icon";


const ICONS = {
    addOutline: ADD_OUTLINE_ICON,
    arrowUp: ARROW_UP_ICON,
    arrowDown: ARROW_DOWN_ICON,
    editPencil: EDIT_PENCIL_ICON,
    editPencilBorder: EDIT_PENCIL_BORDER,
    cog: COG_ICON,
    close: CLOSE_ICON,
    trash: TRASH_ICON,
    trashCustom: TRASH_ICON_CUSTOM,
    chevronUp: CHEVRON_UP_ICON,
    chevronDown: CHEVRON_DOWN_ICON,
    navigationMore: NAVIGATION_MORE_ICON,
    informationOutline: INFORMATION_OUTLINE_ICON,
    corner_left: CORNER_LEFT,
    corner_right: CORNER_RIGHT,
    people: PEOPLE,
    circle: CIRCLE,
    add_control: ADD_CONTROL,
    control_button: BUTTON_ICON,
    control_checkbox: CHECKBOX_ICON,
    control_date: DATE_ICON,
    control_dropdown: DROPDOWN_ICON,
    control_input: INPUT_ICON,
    control_textarea: TEXTAREA_ICON,
    control_radiobutton: RADIO_ICON,
    control_textblock: TEXTBLOCK_ICON,
    control_number: NUMBER_ICON,
    add_section: ADD_SECTION,
    close_custom: CLOSE_CUSTOM,
}

const FormIcon = {
    /**
     * Get SVG Icon for Form-Builder
     * @param {String} iconName
     * @param {String} width - Width with px (Eg: 16px)
     * @param {String} height - Height with px (Eg: 16px)
     * @param {String} fillColor - Hex Color String (Eg: #ffffff)
     * @returns {string} of SVG HTML TAG
     */
    getSVG(
        iconName,
        width = '16px',
        height = '16px',
        fillColor = '#ffffff'
    ) {
        if (!ICONS[iconName]) {
            throw new TypeError(`Icon Name '${iconName}' doesn't exists in Vue-Form-Builder.`);
        }

        let replacedIconWithData = ICONS[iconName]
            .replace("{0}", width)
            .replace("{1}", height)
            .replace("{2}", fillColor)

        return replacedIconWithData
    }
};

export {
    FormIcon
}