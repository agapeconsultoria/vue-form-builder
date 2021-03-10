<template>
  <div class="container">
    <div v-for="(controlInfo, controlKey) in controlTypes" :key="controlKey">
      <div
        class="controlGroupTitle mb-3"
        v-if="controlInfo.group"
      >{{$t(`constrolsGroup.${controlInfo.group}`)}}</div>
      <div class="controlCard p-2 mb-2" @click="selectedControl(controlKey)">
        <div class="header">
          <span class="title">{{$t(`controls.${controlInfo.name}`)}}</span>
          <span v-html="$form.getIcon(controlInfo.exampleImage)" class="float-right"></span>

        </div>
        <div class="body">
          <span class="desc">{{$t(`controlsDescription.${controlInfo.description}`)}}</span>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="sidebar-form-configuration">
    <div>{{ $t('controls.choose_your_control') }}</div>

    <div :class="[styles.LIST_GROUP.CONTAINER]">
      <a
        href="javascript:void(0)"
        :class="styles.LIST_GROUP.SINGLE_ITEM"
        v-for="(controlInfo, controlKey) in controlTypes"
        :key="controlKey"
        @click="selectedControl(controlKey)"
      >
        <p class="type-headline">{{ $t(`controls.${controlInfo.name}`) }}</p>
        <p class="type-desc" v-text="controlInfo.description"></p>
      </a>
    </div>
  </div>-->
</template>

<script>
import { STYLE_INJECTION_MIXIN } from "@/mixins/style-injection-mixin";
import { CONTROLS, createControlData } from "@/configs/controls";
import { SIDEBAR_BODY_MIXIN } from "@/mixins/sidebar-body-mixin";

export default {
  name: "SidebarControlSelectList",
  mixins: [STYLE_INJECTION_MIXIN, SIDEBAR_BODY_MIXIN],

  data: () => ({
    dataKey: "newControlData",
    newControlData: null,
    controlTypes: [],
  }),
  mounted() {
    this.controlTypes = CONTROLS;
  },
  methods: {
    /**
     * Selected a control => we will generate a new control data then emit it to the section
     * @param controlKey
     */
    selectedControl(controlKey) {
      if (!CONTROLS[controlKey]) {
        alert(`Control ${controlKey} doesn't exists in Vue-Form-Builder`);
        return;
      }

      // create
      this.newControlData = createControlData(controlKey);
      this.save(true);
    },
  },
};
</script>

<style scoped>
.controlGroupTitle {
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.015em;
  color: #505050;
}

.controlCard {
  border: 1px solid #c4c4c4;
  border-radius: 6px;
  cursor: pointer;
  display: flow-root;
}

.controlCard .title {
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.015em;
  color: #505050;
}

.controlCard .desc {
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.015em;
  color: #505050;
}

.controlCard:hover {
  background-color: #9cd2ea;
  border: 0;
}

.controlCard:hover .title,
.controlCard:hover .desc {
  color: white;
}

.controlCard:hover .title {
  font-weight: 600;
}
</style>