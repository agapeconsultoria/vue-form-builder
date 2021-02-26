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

      <div class="w-100 row justify-content-center" v-if="!hasControl" 
      @click="openControlMenu(section.uniqueId)"
      >
        <div class="col-md-3 text-right">
          <img src="../../../assets/svg-images/add-control.svg" alt />
        </div>
        <div class="col-md-5 align-self-center">
          <div class="title">Insira os componentes do formulário</div>
          <div
            class="desc"
          >Para adicionar conteúdo a seu formulário, clique no elemento que deseja no menu ao lado.</div>
        </div>
      </div>
    </draggable>
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

<style scoped>
.title {
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.015em;
  text-align: left;
}

.desc {
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.015em;
  text-align: left;
}
</style>