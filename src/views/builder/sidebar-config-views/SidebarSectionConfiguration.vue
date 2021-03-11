<template>
  <div class="sidebar-form-configuration">
    <h5 class="subheader">{{ $t('config.section_form_configuration') }}</h5>

    <div :class="styles.FORM.FORM_GROUP">
      <label class="labelInput">{{ $t('config.name_section') }}</label>
      <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="sectionConfiguration.headline" @input="change" />
    </div>

    <!--     <div :class="styles.FORM.FORM_GROUP">
      <label>Headline Additional Class (CSS)</label>
      <input
        type="text"
        :class="styles.FORM.FORM_CONTROL"
        v-model="sectionConfiguration.headlineAdditionalClass"
      />
    </div>-->

    <div :class="styles.FORM.FORM_GROUP">
      <label class="labelInput">{{ $t('config.subname_section') }}</label>
      <input
        type="text"
        :class="styles.FORM.FORM_CONTROL"
        v-model="sectionConfiguration.subHeadline"
        @input="change"
      />
    </div>
    <!-- 
    <div :class="styles.FORM.FORM_GROUP">
      <label>Sub-Headline Additional Class (CSS)</label>
      <input
        type="text"
        :class="styles.FORM.FORM_CONTROL"
        v-model="sectionConfiguration.subHeadlineAdditionalClass"
      />
    </div>-->
    <div :class="styles.FORM.FORM_GROUP">
      <label class="labelInput">{{ $t('config.type_section') }}</label>
      <select :class="styles.FORM.FORM_CONTROL" @change="change()">
        <option v-for="(className, classID) in listCategory" :key="classID">{{className}}</option>
      </select>
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label class="labelInput">{{ $t('config.show_name_section') }}</label>
      <input id="checkbox" type="checkbox" v-model="sectionConfiguration.isShowHeadline" @change="change" />
      <label for="checkbox" class="ml-2">Sim</label>
    </div>
<!-- 
    <div class="buttons">
      <button :class="styles.BUTTON.PRIMARY" @click="save(false)">Save</button>
      <button :class="styles.BUTTON.INFO" @click="save(true)">Save & Close</button>
    </div> -->
  </div>
</template>

<script>
import { STYLE_INJECTION_MIXIN } from "@/mixins/style-injection-mixin";
import { SIDEBAR_BODY_MIXIN } from "@/mixins/sidebar-body-mixin";
import { SECTION_DEFAULT_DATA } from "@/configs/section";

export default {
  name: "SidebarSectionConfiguration",
  mixins: [STYLE_INJECTION_MIXIN, SIDEBAR_BODY_MIXIN],

  data: () => ({
    dataKey: "sectionConfiguration",
    sectionConfiguration: Object.assign({}, SECTION_DEFAULT_DATA),
    listCategory: ["Teste 01", "Teste 02", "Teste 03"],
  }),

  created() {
    // retrieve the data from `GlobalSidebar` passed in
    this.sectionConfiguration = Object.assign(
      {},
      this.sectionConfiguration,
      this.dataPackage
    );
  },

  methods:{
      change(){
          this.save(false)
      }
  }
};
</script>