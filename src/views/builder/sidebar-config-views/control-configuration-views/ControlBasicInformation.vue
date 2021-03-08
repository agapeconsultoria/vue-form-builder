<template>
  <div>
    <div :class="styles.FORM.FORM_GROUP">
      <label>{{ $t('controlsConfig.unique_id') }}</label>
      <input type="text" :class="styles.FORM.FORM_CONTROL" :value="control.uniqueId" readonly />
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>{{ $t('controlsConfig.name') }}</label>
      <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="control.name" />
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>{{ $t('controlsConfig.label') }}Label</label>
      <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="control.label" />
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>{{ $t('controlsConfig.sub_label') }}Sub-label</label>
      <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="control.subLabel" />
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>
        {{ $t('controlsConfig.show_label') }}
        <input type="checkbox" v-model="control.isShowLabel" />
      </label>
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>{{ $t('controlsConfig.placeholder') }}</label>
      <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="control.placeholderText" />
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>{{ $t('controlsConfig.default_value') }}</label>
      <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="control.defaultValue" />
    </div>
  </div>
</template>

<script>
import { STYLE_INJECTION_MIXIN } from "@/mixins/style-injection-mixin";

export default {
  name: "ControlBasicInformation",
  mixins: [STYLE_INJECTION_MIXIN],
  props: {
    control: Object,
  },
};
</script>

<style scoped>
</style>