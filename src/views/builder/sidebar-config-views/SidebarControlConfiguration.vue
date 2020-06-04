<template>
    <div class="sidebar-form-configuration">
        <h5>Control Configuration</h5>

        <!-- Basic of the control/Same for all -->
        <ControlBasicInformation :control="control" />

        <!-- Validation of the control / same for all -->
        <SidebarToggleableContainer
                headline="Validation"
                :initial-open="false">
            Nè
        </SidebarToggleableContainer>

        <!-- Control specific configuration / Only render it if the control has specific configuration view -->
        <SidebarToggleableContainer
                v-if="specificConfigurationView"
                headline="Control Specific Configuration"
                :initial-open="false">

            <component :is="specificConfigurationView"
                       :control="control" />

        </SidebarToggleableContainer>


        <div class="buttons">
            <button :class="styles.BUTTON.PRIMARY" @click="save(false)">
                Save
            </button>
            <button :class="styles.BUTTON.INFO" @click="save(true)">
                Save & Close
            </button>
        </div>
    </div>
</template>

<script>
    import {STYLE_INJECTION_MIXIN} from "@/mixins/style-injection-mixin";
    import {SIDEBAR_BODY_MIXIN} from "@/mixins/sidebar-body-mixin";
    import SidebarToggleableContainer from "@/views/container-views/SidebarToggleableContainer";
    import ControlBasicInformation
        from "@/views/builder/sidebar-config-views/control-configuration-views/ControlBasicInformation";
    import {CONTROLS} from "@/configs/controls";

    export default {
        name: "SidebarControlConfiguration",
        components: {ControlBasicInformation, SidebarToggleableContainer},
        mixins: [STYLE_INJECTION_MIXIN, SIDEBAR_BODY_MIXIN],
        data:() => ({
            dataKey: "control",
            control: null
        }),

        created() {
            this.control = this.dataPackage
        },

        computed: {
            /**
             * Quick'n'Short access to the control type
             */
            controlType() {
                return this.control.type
            },

            /**
             * Pick-up the specific configuration View for the Control
             * Depend on the `configComponent` of CONTROLS in `src/configs/controls.js`
             * If there's none => No Specific Configuration for the field
             * @returns VueComponent
             */
            specificConfigurationView() {
                if (!CONTROLS[this.controlType].hasOwnProperty('configComponent')) {
                    return null
                }

                // NOTE: this is a hash map access , not 2d array =))
                return CONTROLS[this.controlType]['configComponent'];
            }
        },
    }
</script>