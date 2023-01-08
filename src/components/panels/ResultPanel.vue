<template>
  <div class="result-panel column">
    <div
      v-for="row in info"
      :key="row.identifier"
      class="column result-panel__info items-center"
    >
      <div
        class="result-panel__info__label full-width text-center"
        :style="{
          'background-color': row.color,
        }"
      >
        {{ row.label }}
      </div>

      <div
        class="result-panel__info__value row items-center justify-center full-width"
        :class="{
          loading: tipsStore.loadingConversion && row.identifier === 'total-brl',
        }"
        :style="{
          'background-color': row.color,
        }"
      >
        <span class="result-panel__info__value__unit">
          {{ row.unit || tipsStore.currencyUnit }}
        </span>

        <span :class="row.identifier">
          {{ row.value }}
        </span>

        <q-spinner-ios
          v-if="row.identifier === 'total-brl' && tipsStore.loadingConversion"
          class="result-panel__info__value__spinner"
          color="white"
          size="1em"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useTipsStore } from "@/stores/tips.js";

/*
  Related to Store
*/

const tipsStore = useTipsStore();

/*
  Related to Component Info
*/

const info = computed(() => {
  return [
    {
      label: "Conta",
      identifier: "account",
      value: tipsStore.result.account.toFixed(2),
      color: "#79e8e7",
    },
    {
      label: "Gorjeta",
      identifier: "tip",
      value: tipsStore.result.tip.toFixed(2),
      color: "#3EDAD8",
    },
    {
      label: "Total",
      identifier: "total",
      value: tipsStore.result.total.toFixed(2),
      color: "#37C9EF",
    },
    {
      label: "por Pessoa",
      identifier: "amount-per-person",
      value: tipsStore.result.amountPerPerson.toFixed(2),
      color: "#2C92D5",
    },
    {
      label: "em R$",
      identifier: "total-brl",
      value: tipsStore.result.totalBrl.toFixed(2),
      color: "#0364A4",
      unit: "R$",
    },
  ];
});
</script>

<style lang="scss">
@import "@/css/mixins/platform.scss";

.result-panel {
  padding: 0px 80px;

  @include mobile {
    padding: 0px;
  }

  &__info {
    text-transform: uppercase;
    color: white;
    font-size: 15px;

    & > * {
      margin-bottom: 5px;
    }

    &__value {
      position: relative;

      &__unit {
        padding-right: 5px;
      }

      &__spinner {
        position: absolute;
        right: 25%;
      }
    }

    &__label,
    &__value {
      padding: 10px;
    }
  }

  .loading {
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>
