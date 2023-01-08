<template>
  <q-input
    v-model.number="model"
    class="custom-input"
    debounce="500"
    type="number"
    @update:model-value="emitValue"
    outlined
    dense
  >
    <template #before>
      <slot name="before" />
    </template>
  </q-input>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

/*
  Related to Component Props
*/

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});

/*
  Related to Component Events
*/

const emit = defineEmits(["update:modelValue"]);

/*
  Related to Component Behavior
*/

onMounted(() => {
  model.value = props.modelValue;
});

const model = ref(null);

watch(
  () => props.modelValue,
  () => {
    model.value = props.modelValue;
  }
);

const emitValue = () => {
  if (model.value !== "") {
    emit("update:modelValue", model.value || 0);
  }
};
</script>

<style lang="scss" scoped>
.custom-input {
  :deep(.q-field__control-container) {
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input {
      -moz-appearance: textfield;
      font-size: 25px;
    }
  }
}
</style>
