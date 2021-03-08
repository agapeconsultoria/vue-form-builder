<template>
  <div class="normal-section">
    <div class="headline-block p5" v-show="section.isShowHeadline">
      <h6 class="header" :class="section.headlineAdditionalClass">{{ section.headline }}</h6>
      <div class="subheader" :class="section.subHeadlineAdditionalClass">{{ section.subHeadline }}</div>
    </div>

    <!--- SHOW CONTROLS WITH SORTABLE --->
    <draggable
      :class="draggableClasses"
      class="dragAndDrop p-0"
      :style="hasControl ? 'padding-bottom: 50px !important;' : ''"
      :handle="dragControlHandle"
      :list="section.controls"
      :group="dragGroup"
      @click.native.self="openAddControl(4)"
    >
      <ControlView
        v-for="controlId in section.controls"
        :key="controlId"
        :control="controls[controlId]"
        :parent-id="section.uniqueId"
      />
      <AddControlControl :section="section" v-show="!hasControl" ref="AddControl" />
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
    openAddControl() {
     this.$refs["AddControl"].openAddControl()
    },
  },
};
</script>

<style scoped>
.headline-block .header {
  font-family: Poppins;
  font-size: 21px;
  font-style: normal;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: #505050;
}

.headline-block .subheader {
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.015em;
  color: #505050;
}
</style>

