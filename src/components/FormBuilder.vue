<template>
  <div :class="[styles.CONTAINER.FLUID, 'form-padding', 'vue-form-builder']" class="row">
    <div class="col">
      <!-- top configuration -->
      <!-- if you need work in right menu add code: -->
      <FormConfiguration v-model="formData.formConfig" />

      <!-- form headline -->
      <div class="form-headline-container" v-show="formData.formConfig.isShowHeadline">
        <h1 v-text="formData.formConfig.headline"></h1>
        <p v-text="formData.formConfig.subHeadline"></p>
      </div>

      <!-- sections of the form -->
      <SectionContainer
        v-for="(sectionData) in sortedSections"
        :section="sectionData"
        :rows="formData.rows"
        :controls="formData.controls"
        :key="sectionData.uniqueId"
        :context="sortedSections"
      />

      <!-- below all -->
      <AddSectionControl @addSectionNotify="addSection" :listSections="sortedSections" />
    </div>
    <!-- global stuff -->
    <!-- <GlobalSidebar :formData="formData"/> -->
  </div>
</template>

<script>
import AddSectionControl from "@/views/builder/add-controls/AddSectionControl";
import { MAIN_CONSTANTS } from "@/configs";
import SectionContainer from "@/views/builder/SectionContainer";
import FormBuilderBusiness from "@/mixins/form-builder-mixins";
import FormConfiguration from "@/views/builder/FormConfiguration";
import GlobalSidebar from "@/views/builder/GlobalSidebar";
import { EVENT_CONSTANTS } from "@/configs/events";

export default {
  name: "FormBuilder",
  components: {
    GlobalSidebar,
    FormConfiguration,
    SectionContainer,
    AddSectionControl,
  },
  methods: {
    openFormConfig() {
      this.$formEvent.$emit(EVENT_CONSTANTS.BUILDER.SIDEBAR.OPEN, {
        runnerId: "FormConfiguration",
        title: "CONFIGURAÇÕES DO FORMULÁRIO",
      });
    },
  },
  mixins: FormBuilderBusiness,
  data: () => ({
    formData: {
      formConfig: {},
      sections: {},
      rows: {},
      controls: {},
    },
  }),

  created() {
    if (this.value && typeof this.value === "object") {
      this.mapping(this.value);
    } else {
      this.createDefaultData();
    }
  },
};
</script>

<style scoped>
.vue-form-builder {
  min-height: 700px;
}
</style>
