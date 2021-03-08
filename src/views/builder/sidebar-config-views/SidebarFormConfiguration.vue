<template>
  <div class="sidebar-form-configuration w-100">
    <h5 class="subheader">{{ $t('config.main_form_configuration') }}</h5>

    <div :class="styles.FORM.FORM_GROUP">
      <label class="labelInput">{{ $t('config.name_form') }}</label>
      <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="formConfiguration.headline" @input="change()"/>
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>{{ $t('config.type_form') }}</label>
      <!-- <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="formConfiguration.subHeadline" /> -->
       <select :class="styles.FORM.FORM_CONTROL" v-model="formConfiguration.subHeadline" @change="change()">
                <option v-for="(className, classID) in listCategory"
                        :key="classID">
                  {{className}}
                </option>
            </select>
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label class="labelInput">
        {{ $t('config.category_form') }}</label>
        <!-- <input
          type="checkbox"
          v-model="formConfiguration.isShowHeadline"
        /> -->
         <select :class="styles.FORM.FORM_CONTROL" @change="change()">
                <option v-for="(className, classID) in listCategory"
                        :key="classID">
                  {{className}}
                </option>
            </select>
      
    </div>

  <!--   <div :class="styles.FORM.FORM_GROUP">
      <label>
        Wrapper &#x3C;form&#x3E; outside of the Form?
        <input
          type="checkbox"
          v-model="formConfiguration.renderFormTag"
        />
      </label>
    </div> -->

    <div v-show="formConfiguration.renderFormTag">
      <div :class="styles.FORM.FORM_GROUP">
        <label class="labelInput">Form-TAG Action URL</label>
        <input
          type="text"
          :class="styles.FORM.FORM_CONTROL"
          v-model="formConfiguration.formActionURL"
        />
      </div>

      <div :class="styles.FORM.FORM_GROUP">
        <label>Form-TAG Method</label>
        <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="formConfiguration.formMethod" />
      </div>
    </div>

<!--     <div class="buttons">
      <button :class="styles.BUTTON.PRIMARY" @click="save(false)">Save</button>
      <button :class="styles.BUTTON.INFO" @click="save(true)">{{ $t('buttons.save_and_close') }}</button>
    </div>  -->
  </div>
</template>

<script>
import { STYLE_INJECTION_MIXIN } from "@/mixins/style-injection-mixin";
import { SIDEBAR_BODY_MIXIN } from "@/mixins/sidebar-body-mixin";
import { FORM_DEFAULT_DATA } from "@/configs/form";

export default {
  name: "SidebarFormConfiguration",
  mixins: [STYLE_INJECTION_MIXIN, SIDEBAR_BODY_MIXIN],
  data: () => ({
    dataKey: "formConfiguration",
    formConfiguration: Object.assign({}, FORM_DEFAULT_DATA),
    listCategory: ['Teste 01', 'Teste 02', 'Teste 03']
  }),

  created() {
    this.formConfiguration = Object.assign(
      {},
      this.formConfiguration,
      this.dataPackage
    );
  },

  methods:{
    change(){
      console.log('a');
      this.save(false);
    }
  }
};
</script>

<style scoped>
</style>