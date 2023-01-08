<template>
  <q-slider
    :model-value="model"
    class="custom-slider"
    @change="setValue"
    :min="props.min"
    :max="props.max"
    :marker-labels="objMarkerLabel"
    label
  />
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";

/*
  Related to Component Props
*/

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
});

/*
  Related to Component Events
*/

const emit = defineEmits(["update:modelValue"]);

/*
  Related to Component Behavior
*/

const model = ref(null);

onMounted(() => {
  model.value = props.modelValue;
});

watch(
  () => props.modelValue,
  () => {
    if (model.value !== props.modelValue) {
      model.value = props.modelValue;
    }
  }
);

watch(model, () => {
  if (model.value !== props.modelValue) {
    emit("update:modelValue", model.value);
  }
});

const setValue = (val) => {
  model.value = val;
};

const objMarkerLabel = computed(() => {
  const markers = {};
  markers[props.min] = props.min;
  markers[props.max] = props.max;

  return markers;
});
</script>

<style lang="scss" scoped>
.custom-slider {
  :deep(.q-slider__text) {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.2rem;
  }

  :deep(.q-slider__marker-labels) {
    font-size: 20px;
    transform: translateY(-5px) translateX(-5px);
  }
}
</style>
