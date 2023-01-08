<template>
  <div class="le-tip-view column items-center no-wrap">
    <h1 class="le-tip-view__title full-width text-center">Le/Tip</h1>

    <div class="le-tip-view__content row">
      <div class="col le-tip-view__content__entry-panel" id="entry-panel">
        <entry-panel />
      </div>

      <div class="col le-tip-view__content__result-panel hidePanel" id="result-panel">
        <result-panel />
      </div>
    </div>

    <div class="le-tip-view__actions row justify-end">
      <q-btn
        class="le-tip-view__actions__step-button"
        @click="changeStep"
        round
        color="primary"
        :icon="getIcon"
      />
    </div>
  </div>
</template>

<script setup>
import EntryPanel from "@/components/panels/EntryPanel.vue";
import ResultPanel from "@/components/panels/ResultPanel.vue";

import { ref, computed } from "vue";

/*
  Related to Platform Detection
*/

const currentStep = ref(false);

/*
  Related to Mobile Behavior
*/

const getIcon = computed(() => {
  return currentStep.value ? "chevron_left" : "chevron_right";
});

const changeStep = () => {
  currentStep.value = !currentStep.value;
  const entryPanel = document.getElementById("entry-panel");
  const resultPanel = document.getElementById("result-panel");

  entryPanel.classList.toggle("hidePanel");
  resultPanel.classList.toggle("hidePanel");
};
</script>

<style lang="scss">
@import "@/css/mixins/platform.scss";

.le-tip-view {
  position: relative;
  height: 100vh;

  &__title {
    font-family: "Dancing Script";
    color: white;

    @include mobile {
      margin-bottom: 25px;
      margin-top: 35px;
    }
  }

  &__content {
    padding: 10px;
    width: 80%;
    border-radius: 12px;
    background-color: white;

    &__entry-panel,
    &__result-panel {
      @include mobile {
        &.hidePanel {
          display: none;
        }
      }
    }
  }

  &__actions {
    @include sm {
      display: none;
    }

    &__step-button {
      position: absolute;
      top: calc(100% - 100px);
      right: 50px;
      font-size: 23px;
    }
  }
}
</style>
