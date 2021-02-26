/**
 * NOTE - This file only exists for development purpose.
 * It will help me to run and test the form
 */


import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n';
import {VueFormBuilderPlugin} from "@/index";

Vue.config.productionTip = false

Vue.use(VueI18n);
Vue.use(VueFormBuilderPlugin)

 const messages = {
  ptBR: {
    canvas: {
      add_section: 'Adicionar Seção',
      add_control: 'Adicionar Controle',
      normal_block_name: 'FIXA',
      normal_block_description: 'Bloco padrão com título e subtítulo',
      toggleable_block_name: 'Expansível',
      toggleable_block_description: 'Bloco sanfonado com título',
      droppable_zone: 'As zonas / controles para soltar serão mostrados aqui ...'
    },
    buttons:{
      form_configurations: 'Configurações do Formulário',
      save_and_close: 'Salvar & Fechar',
      configuration: 'Configurar',
      delete: 'Excluir'
    },
    config:{
      main_form_configuration: 'Configurações do Formulário Principal',
    },
    controls:{
      choose_your_control: 'Escolha seu componente',
      input_field: 'Input Field',
      number_input_field: 'Number Input Field',
      text_field: 'Text Field',
      date_picker: 'Date Picker',
      dropdown: 'DropDown',
      checkbox_list: 'Checkbox List',
      radio_list: 'Radio List',
      label: 'Label',
      button: 'Button',
      empty_block: 'Empty Block',
      text_block: 'Text Block',
    }
  },
};

const i18n = new VueI18n({
  locale: 'ptBR',
  messages
}); 

new Vue({
  render: h => h(App),
  i18n
}).$mount('#app')
