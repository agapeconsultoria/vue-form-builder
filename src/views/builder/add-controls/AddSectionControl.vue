<template>
  <div class="container" v-if="listSections.length == 0">
    <img src="../../../assets/svg-images/corner-left.svg" class="cornerLeft" />
    <img src="../../../assets/svg-images/circle.svg" class="circle" />

    <div class="row cardSection">
      <div class="cardSectionTexts col-md-12">
        <div class="pt-3">
          Este espaço se chama
          <b>seção</b>.
        </div>
        <div
          class="py-2"
        >Nela é possível colocar todos os elementos que irão compor seu formulário, você pode criar quantas seções precisar!</div>
        <div>Para começar, escolha o tipo de seção com a qual deseja trabalhar:</div>
      </div>

      <div class="cardSectionButtons col-md-12 row py-3">
        <div
          class="button col-3 col-lg-3 col-md-4 col-sm-4 mr-2"
          v-for="(sectionInfo, sectionKey) in sectionTypes"
          :key="sectionKey"
          @click="addNew(sectionKey)"
        >
          <div class="title mt-1">{{ $t(`canvas.${sectionInfo.name}`) }}</div>
          <div class="desc mt-1">{{ $t(`canvas.${sectionInfo.description}`) }}</div>
        </div>
      </div>
    </div>

    <img src="../../../assets/svg-images/people.svg" class="people" />
    <img src="../../../assets/svg-images/corner-right.svg" class="cornerRight" />
  </div>
  <div class="text-center addNewSection" @click="addNewSection" v-else>
    <img src="../../../assets/svg-icons/add.svg" class="mr-2" />
    <span>
      <u>Adicionar nova seção</u>
    </span>
  </div>
</template>

<script>
import { SECTION_TYPES } from "@/configs/section";
import { STYLE_INJECTION_MIXIN } from "@/mixins/style-injection-mixin";

export default {
  name: "AddSectionControl",
  mixins: [STYLE_INJECTION_MIXIN],
  data: () => ({
    sectionTypes: SECTION_TYPES,
    typeOfSections: "",
  }),
  methods: {
    addNewSection() {
      this.$emit("addSectionNotify", this.typeOfSections);
    },
    addNew(type) {
      this.typeOfSections = type;
      this.$emit("addSectionNotify", type);
    },
  },
  props: {
    listSections: { default: [] },
  },
};
</script>


<style scoped>
.container {
  padding: 100px;
}

.cardSection {
  border: 2px dashed #505050;
}

.cardSectionTexts {
  padding: 0 10vw;
}

.cardSectionTexts div {
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.015em;
  text-align: left;
}

.cardSectionButtons {
  place-content: center;
}

.button {
  border-radius: 6px;
  cursor: pointer;
  height: 80px;
}

.cardSectionButtons .button {
  border: 2px solid #5aaed3;
}

.cardSectionButtons .button:hover,
.cardSectionButtons .button:hover .title,
.cardSectionButtons .button:hover .desc {
  background-color: #5aaed3;
  color: white !important;
}

.cardSectionButtons div .title {
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.015em;
  color: #5aaed3;
  text-align: left;
  text-align: center;
}

.cardSectionButtons div .desc {
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.015em;
  text-align: center;
  color: #505050;
}

.addNewSection {
  cursor: pointer;
  color: #5aaed3;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.015em;
  text-align: left;
}

/* SVG */

.cornerLeft {
  position: absolute;
  margin-left: -10vh;
  margin-top: -12vh;
  z-index: -1;
}

.cornerRight {
  position: absolute;
  right: 0;
  margin-right: 8vw;
  margin-top: -17vh;
  z-index: -1;
}

.circle {
  position: absolute;
  margin-left: 45vw;
  margin-top: -5vh;
}

.people {
  position: absolute;
  margin-left: -10vh;
  margin-top: -20vh;
}
</style>