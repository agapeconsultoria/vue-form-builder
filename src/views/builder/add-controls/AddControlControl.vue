<template>
  <div class="add-control-outer" :class="styles.COLUMNS.COL12">
    <div class="w-100 row justify-content-center m-0" @click="openAddControl">
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
    <!-- <div class="add-control-container" @click="openAddControl">
      <span v-html="$form.getIcon('addOutline', '32px', '32px', '#000')"></span>
      <span>{{ $t('canvas.add_control') }}</span>
    </div>-->
  </div>
</template>

<script>
import { STYLE_INJECTION_MIXIN } from "@/mixins/style-injection-mixin";
import { EVENT_CONSTANTS } from "@/configs/events";
import SidebarRenderer from "@/libraries/sidebar-renderer.class";
import SidebarControlSelectList from "@/views/builder/sidebar-config-views/SidebarControlSelectList";

export default {
  name: "AddControlControl",
  mixins: [STYLE_INJECTION_MIXIN],
  props: {
    section: {
      type: Object,
      required: true,
    },

    // TODO: Need to extend: Row too.
  },
  data: () => ({
    show: false,
  }),
  methods: {
    /**
     * Open the sidebar to add control yeah yeah
     */
    openAddControl() {
      this.$formEvent.$emit(EVENT_CONSTANTS.BUILDER.SIDEBAR.OPEN, {
        title: "COMPONENTES",
        runnerId: this.runnerId,
      });
    },

    /**
     * Render the sidebar if can be opened hehe
     */
    afterOpenedSidebar(runnerId) {
      if (runnerId !== this.runnerId) {
        return;
      }

      // render
      this.renderSidebar();
    },

    /**
     * Trigger this to render the GlobalSidebar for Select Controls
     */
    renderSidebar() {
      this.$formEvent.$emit(
        EVENT_CONSTANTS.BUILDER.SIDEBAR.INJECT,
        new SidebarRenderer(
          this.runnerId,
          SidebarControlSelectList,
          this.section
        )
      );
    },

    /**
     * After user chose a control. This will be invoked in order to create a new control
     */
    createNewControlForSection(runnerId, controlObj) {
      // runnerId to check the right identifier of the Invoker
      // uniqueId to check if we create new control or not
      if (this.runnerId !== runnerId) {
        return;
      }

      // emit to FormBuilder and let it create control...
      // TODO: Need to extend - For Rows
      this.$formEvent.$emit(
        EVENT_CONSTANTS.BUILDER.CONTROL.CREATE,
        this.section.uniqueId,
        controlObj
      );
    },
  },

  computed: {
    /**
     * Runner ID to detect the right
     * @returns {string}
     */
    runnerId() {
      return `add-control-${this.section.uniqueId}`;
    },
  },

  created() {
    // listen to Global Sidebar
    this.$formEvent.$on(
      EVENT_CONSTANTS.BUILDER.SIDEBAR.OPENED,
      this.afterOpenedSidebar
    );
    this.$formEvent.$on(
      EVENT_CONSTANTS.BUILDER.SIDEBAR.SAVE_AND_CLOSE,
      this.createNewControlForSection
    );
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