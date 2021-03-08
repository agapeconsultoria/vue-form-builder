<template>
  <div class="control-label-container">
    <div class="d-flex justify-content-between align-items-center">
      <label
        v-text="control.label"
        :for="control.uniqueId"
        :class="control.additionalLabelClass"
        class="label m-0"
      ></label>
      <div class="exclude btn btn-sm" @click.stop="emitExclude">
        <span v-html="$form.getIcon('trashCustom', '20px', '20px')" class="mr-1"></span>
        <u>Excluir</u>
      </div>
    </div>
    <br v-if="control.subLabel" />
    <small v-if="control.subLabel" v-text="control.subLabel"></small>
  </div>
</template>

<script>
export default {
  name: "ControlLabel",
  methods: {
    emitExclude() {
      this.$emit("delete", true);
    },
  },
  props: {
    control: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.exclude {
  display: none;
}

.label {
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.015em;
  columns: #505050;
}

.exclude {
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.015em;
  text-align: left;
  color: #e5817e;
}
</style>