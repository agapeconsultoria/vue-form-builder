<template>
  <div class="section-config">
    <div class="buttons">
      <button
        class="btn btn-outline-primary border-primary-2"
        title="Push Down"
        @click="pushDown"
        v-html="$form.getIcon('arrowDown', '16px', '16px', '#5AAED3')"
        :class="!canDown ? 'disabled' : ''"
        :disabled="!canDown"
      ></button>

      <button
        class="btn btn-outline-primary border-primary-2"
        title="Push Up"
        @click="pushUp"
        v-html="$form.getIcon('arrowUp', '16px', '16px', '#5AAED3')"
        :class="!canUp ? 'disabled' : ''"
        :disabled="!canUp"
      ></button>

      <button class="btn btn-custom-primary" @click="openConfiguration">
        <span v-html="$form.getIcon('editPencilBorder')"></span>
        <span>{{ $t('buttons.configuration') }}</span>
      </button>

      <button class="btn btn-outline-danger border-danger-2" @click="deleteSection">
        <span v-html="$form.getIcon('trashCustom')"></span>
        <span>{{ $t('buttons.delete') }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { SECTION_SORT_MIXINS } from "@/mixins/section-sort-mixins";
import { STYLE_INJECTION_MIXIN } from "@/mixins/style-injection-mixin";
import { EVENT_CONSTANTS } from "@/configs/events";
import SidebarRenderer from "@/libraries/sidebar-renderer.class";
import SidebarSectionConfiguration from "@/views/builder/sidebar-config-views/SidebarSectionConfiguration";

export default {
  name: "SectionNavigationBar",
  mixins: [SECTION_SORT_MIXINS, STYLE_INJECTION_MIXIN],
  props: {
    section: {
      type: Object,
      required: true,
    },
    context: { type: Array, default: [] },
  },
  methods: {
    /**
     * Submit to delete a Section
     */
    deleteSection() {
      if (this.section.rows.length > 0) {
        if (
          !confirm(
            "This section contains row(s). Are you sure? Everything is gone and can't be recovered after deleted."
          )
        ) {
          return;
        }
      }

      // submit to delete
      this.$formEvent.$emit(
        EVENT_CONSTANTS.BUILDER.SECTION.DELETE,
        this.section.uniqueId
      );
    },

    /**
     * Tell the sidebar to open so we can configure our Section =))
     */
    openConfiguration() {
      this.$formEvent.$emit(EVENT_CONSTANTS.BUILDER.SIDEBAR.OPEN, {
        runnerId: this.section.uniqueId,
        title: "CONFIGURAÇÕES DO COMPONENTE",
      });
    },

    /**
     * We need this special event to know when the sidebar is opened
     * Therefore, we will render the sidebar and turn on the border (current editing section)
     */
    configurationOpened(runnerId) {
      if (this.section.uniqueId !== runnerId) {
        return;
      }

      // render sidebar and turn on the border
      this.renderSidebar();
      this.$emit("active", true); // call to parent to let it know this section is currently editing..
    },

    /**
     * Emitting the configuration to render the Section-Config-Sidebar
     */
    renderSidebar() {
      this.$formEvent.$emit(
        EVENT_CONSTANTS.BUILDER.SIDEBAR.INJECT,
        new SidebarRenderer(
          this.section.uniqueId,
          SidebarSectionConfiguration,
          this.section
        )
      );
    },

    /**
     * Handle Saving the Form Configuration
     * @param {string} runnerId
     * @param {Object} data
     */
    saveConfiguration(runnerId, data) {
      // does it out of scope? if it does, stop
      if (runnerId !== this.section.uniqueId) {
        return;
      }

      let newValue = Object.assign({}, this.section, data);
      this.$formEvent.$emit(EVENT_CONSTANTS.BUILDER.SECTION.UPDATE, newValue);
    },

    /**
     * Save and close
     * @param runnerId
     * @param data
     */
    saveAndClose(runnerId, data) {
      // does it out of scope? if it does, stop
      if (runnerId !== this.section.uniqueId) {
        return;
      }

      this.saveConfiguration(runnerId, data);
    },

    /**
     * After Sidebar closed => Remove the Active Class
     */
    removeActive() {
      this.$emit("active", false); // call to parent to let it know this section is finished edit
    },
  },

  created() {
    // listen to after-closed from GlobalSidebar
    this.$formEvent.$on(
      EVENT_CONSTANTS.BUILDER.SIDEBAR.SAVE,
      this.saveConfiguration
    );
    this.$formEvent.$on(
      EVENT_CONSTANTS.BUILDER.SIDEBAR.SAVE_AND_CLOSE,
      this.saveAndClose
    );
    this.$formEvent.$on(
      EVENT_CONSTANTS.BUILDER.SIDEBAR.AFTER_CLOSED,
      this.removeActive
    );
    this.$formEvent.$on(
      EVENT_CONSTANTS.BUILDER.SIDEBAR.OPENED,
      this.configurationOpened
    );
  },

  computed: {
    canUp() {
      if (this.section.sortOrder == 1 || this.context.length == 1) {
        return false;
      } else {
        return true;
      }
    },
    canDown() {
      if (
        this.context.length == 1 ||
        this.section.sortOrder ==
          this.context[this.context.length - 1].sortOrder
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style>
.section-config .btn-custom-primary {
  background-color: #5aaed3;
  color: white;
}

.section-config .btn-custom-primary:hover {
  background-color: #468caa;
  color: white;
}

.section-config .border-primary-2 {
  border: 2px solid #5aaed3;
}

.section-config .border-danger-2 {
  border: 2px solid #e5817e;
}

.section-config .buttons .disabled {
  border: 2px solid #c4c4c4;
}

.section-config .buttons .btn-outline-primary:hover svg {
  fill: white;
}

.section-config .disabled svg {
  fill: #c4c4c4 !important;
}
</style>