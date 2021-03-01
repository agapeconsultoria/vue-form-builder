<template>
  <div class="normal-section">
    <div class="headline-block p5" v-show="section.isShowHeadline">
      <h2 :class="section.headlineAdditionalClass">{{ section.headline }}</h2>
      <p :class="section.subHeadlineAdditionalClass">{{ section.subHeadline }}</p>
    </div>

    <!--- SHOW CONTROLS WITH SORTABLE --->
    <draggable
      :class="draggableClasses"
      class="dragAndDrop"
      ghost-class="ghost"
      :handle="dragControlHandle"
      :list="section.controls"
      :group="dragGroup"
    >
      <ControlView
        v-for="controlId in section.controls"
        :key="controlId"
        :control="controls[controlId]"
        :parent-id="section.uniqueId"
      />
      <AddControlControl :section="section" v-if="!hasControl" />
    </draggable>

    <!-- Add Control -->
  </div>
</template>

<script>
import { SECTION_VIEW_MIXINS } from "@/mixins/section-view-mixins";
import { EVENT_CONSTANTS } from "@/configs/events";

/**
 * @property {Object} section
 * @property {Object} rows RowId - RowData
 * @property {Object} controls ControlId - ControlData
 * @property {Array} section.rows
 * @property {Array} section.controls
 */
export default {
  name: "NormalSectionView",
  mixins: [SECTION_VIEW_MIXINS],
  data: () => ({}),
  methods: {
    openControlMenu(uniqueId) {
      this.$formEvent.$emit(
        EVENT_CONSTANTS.BUILDER.SIDEBAR.OPEN,
        `add-control-${uniqueId}`
      );
    },
  },
};
</script>

