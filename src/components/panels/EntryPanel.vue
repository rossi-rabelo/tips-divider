<template>
  <div class="entry-panel column items-center full-height justify-around">
    <q-btn-toggle
      v-model="entry.currency"
      class="entry-panel__currency"
      no-caps
      rounded
      unelevated
      toggle-color="primary"
      text-color="primary"
      :options="options"
      @update:model-value="calculate"
      size="lg"
    />

    <div class="row items-center">
      Valor:

      <custom-input
        v-model="entry.value"
        class="entry-panel__input-value"
        @update:model-value="calculate"
      >
        <template v-slot:before>
          <span class="entry-panel__input-value__before">
            {{ tipsStore.currencyUnit }}
          </span>
        </template>
      </custom-input>
    </div>

    <div class="row items-center">
      Gorjeta: {{ entry.tipValue }}%

      <custom-slider
        v-model="entry.tipValue"
        class="entry-panel__slider-tip"
        @update:model-value="calculate"
        v-bind="sliderTipProps"
      />
    </div>

    <div class="row items-center">
      Pessoas: {{ entry.dividers }}

      <custom-slider
        v-model="entry.dividers"
        class="entry-panel__slider-dividers"
        @update:model-value="calculate"
        v-bind="sliderDividersProps"
      />
    </div>
  </div>
</template>

<script setup>
import CustomSlider from "@/components/form/CustomSlider.vue";
import CustomInput from "@/components/form/CustomInput.vue";

import { useTipsStore } from "@/stores/tips.js";

/*
  Related to Tips Store
*/

const tipsStore = useTipsStore();

const entry = tipsStore.entry;

/*
  Related to Currency
*/

const options = [
  { label: "EUR", value: "EUR" },
  { label: "USD", value: "USD" },
];

/*
  Related to Slider Tip
*/

const sliderTipProps = {
  min: 10,
  max: 20,
};

/*
  Related to Slider Dividers
*/

const sliderDividersProps = {
  min: 2,
  max: 16,
};

/*
  Related to the final calculation
*/

const calculate = () => {
  if (tipsStore.entry.value) {
    tipsStore.calculateTipsResult();
  }
};
</script>

<style lang="scss" scoped>
@import "@/css/mixins/platform.scss";

.entry-panel {
  font-family: "Cookie";

  & > * {
    @include mobile {
      margin-bottom: 30px;
    }
  }

  &__currency {
    border: 1px solid $primary;
  }

  &__slider-tip {
    :deep(.q-slider__text) {
      &::after {
        content: "%";
      }
    }
  }

  &__input-value {
    width: 135px;
    margin-left: 30px;

    &__before {
      font-size: 30px;
      color: rgba(0, 0, 0, 0.7);
    }
  }
}
</style>
