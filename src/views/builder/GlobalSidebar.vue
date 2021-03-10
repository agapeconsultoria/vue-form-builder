<template>
  <div class="sidebar container p-0">
    <div class="row sidebarHeader px-2 py-3">
      <div class="col-md-10 text-center">
        <span class="title">{{ title }}</span>
      </div>
      <div class="col-md-2">
        <span v-html="$form.getIcon('close_custom')" @click="close" class="closeIcon"></span>
      </div>
    </div>

    <div class="row px-3">
      <!--- For dynamic purpose --->
      <component
        v-if="component"
        :is="component"
        :dataPackage="dynamicData"
        :formData="formData"
        @save="save"
        @saveAndClose="saveAndClose"
        @close="close"
      />
    </div>
  </div>
</template>

<script>
import { EVENT_CONSTANTS } from "@/configs/events";
import { ALERT_DIALOG } from "@/libraries/alert-dialog";

const SIDEBAR_WIDTH_SIZE = "300px";

export default {
  name: "GlobalSidebar",
  props: {
    formData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data: () => ({
    component: null,
    dynamicData: {},
    runnerId: null,
    isOpen: false,
    title: "Titulo",
  }),
  methods: {
    /**
     * Open the Right Sidebar
     */
    open(runnerId) {
      if (this.isOpen) {
        /*  ALERT_DIALOG.show('Please close the current active sidebar before open another')
                    return */
        this.close();
      }

      // set size
      this.$el.style.width = SIDEBAR_WIDTH_SIZE;
      document.getElementsByTagName(
        "body"
      )[0].style.marginRight = SIDEBAR_WIDTH_SIZE;

      // turn on flag and notify watcher that sidebar is opened
      // `runnerId` will be sent back in order to make sure other components will touch yours
      this.$formEvent.$emit(EVENT_CONSTANTS.BUILDER.SIDEBAR.OPENED, runnerId);
      this.isOpen = true;
    },

    /**
     * Save - Emitting data to the listener but do not close the sidebar
     * @hook Emit Data to the Listener
     */
    save(specialData = {}) {
      this.$formEvent.$emit(
        EVENT_CONSTANTS.BUILDER.SIDEBAR.SAVE,
        this.runnerId,
        Object.assign({}, specialData)
      );
    },

    /**
     * Save event with close the right sidebar
     */
    saveAndClose(specialData = {}) {
      this.$formEvent.$emit(
        EVENT_CONSTANTS.BUILDER.SIDEBAR.SAVE_AND_CLOSE,
        this.runnerId,
        Object.assign({}, specialData)
      );

      this.close();
    },

    /**
     * Close the right sidebar
     * @hook After Closed - Fire an Event to notify (maybe someone will listen :v )
     */
    close() {
      this.$el.style.width = 0;
      document.getElementsByTagName("body")[0].style.marginRight = 0;

      // fire event after closed (if emit == true)
      this.$formEvent.$emit(
        EVENT_CONSTANTS.BUILDER.SIDEBAR.AFTER_CLOSED,
        this.runnerId,
        null
      );

      // remove renderer
      this.component = null;
      this.dynamicData = {};
      this.runnerId = null;
      this.isOpen = false;
    },

    /**
     * This method will help us inject our Component into the Sidebar Body
     * @param {SidebarRenderer} rendererInfo - data that will be assigned for the Component
     */
    updateBody(rendererInfo) {
      if (this.isOpen) {
        return;
      }

      this.dynamicData = Object.assign({}, rendererInfo.data);
      this.component = rendererInfo.component;
      this.runnerId = rendererInfo.runnerId;
    },
  },

  created() {
    // listen to render even
    this.$formEvent.$on(
      EVENT_CONSTANTS.BUILDER.SIDEBAR.INJECT,
      this.updateBody
    );

    // listen to open
    this.$formEvent.$on(EVENT_CONSTANTS.BUILDER.SIDEBAR.OPEN, (param) => {
      this.title = param.title || "Título";
      this.open(param.runnerId);
    });
  },
};
</script>

<style scoped>
.sidebarHeader .title {
  font-family: Poppins;
  font-size: 21px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: #5aaed3;
}

.sidebarHeader .closeIcon {
  cursor: pointer;
  margin-top: -10px;
}
</style>