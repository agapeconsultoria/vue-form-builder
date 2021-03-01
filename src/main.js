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
      configuration: 'Editar',
      delete: 'Excluir'
    },
    config:{
      main_form_configuration: 'Configurações do Formulário Principal',
    },
    constrolsGroup:{
      data_entry: 'Entrada de dados',
      list_elements: 'Lista de elementos',
      others: 'Outros componentes',
    },
    controls:{
      input_field: 'Texto curto',
      number_input_field: 'Numérico',
      text_field: 'Texto longo',
      date_picker: 'Data',
      dropdown: 'Lista suspensa',
      checkbox_list: 'Seleção múltipla',
      radio_list: 'Seleção única',
      label: 'Label',
      button: 'Button',
      empty_block: 'Empty Block',
      text_block: 'Text Block',
    },
    controlsDescription:{
      input_field: 'Campo para a entrada de dados do tipo texto em uma única linha',
      number_input_field: 'Campo para a entrada de dados do tipo numérico em uma única linha',
      text_field: 'Campo para a entrada de dados do tipo texto em várias linhas ',
      date_picker: 'Campo para a entrada de dados do tipo data',
      dropdown: 'Lista de elementos para a seleção de uma única opção dentre as apresentadas.',
      checkbox_list: 'Lista de opções que permite a seleção de 1 ou mais elementos',
      radio_list: 'Lista de opções que permite a seleção de um único elemento',

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
