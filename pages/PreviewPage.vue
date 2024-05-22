<template>
  <div>
    <!-- <NuxtLink
      class="bg-red-500 rounded-md p-2 absolute z-40 top-[12px]"
      to="/"
      >Return Home</NuxtLink
    > -->
    <div v-if="dataPreview">
      <div
        v-for="section in previewSections"
        :key="section.id"
      >
        <component
          :is="section.type"
          :class="section.css"
        >
          <div
            v-for="button in section.buttons"
            :key="button.id"
            :style="`position: absolute;
width: ${button.width}px; height: ${button.height}px`"
          >
            <component
              :is="button.type"
              :style="`transform: translate(${button.left}px, ${button.top}px)`"
              :class="`bg-emerald-500 ${button.css}`"
            >
              {{ `${button.contents}` }}
            </component>
          </div>
          <div
            v-for="moduleBtn in section.modules"
            :key="moduleBtn.id"
            :class="moduleBtn.css"
            :style="`transform: translate(${moduleBtn.left}px, ${moduleBtn.top}px);position: absolute;width: ${moduleBtn.width}px;height: ${moduleBtn.height}px`"
          >
            <!-- <div
              v-for="btn in moduleBtn.buttons"
              :key="btn.id"
              :style="`position: absolute;`"
            > -->
            <button
              v-for="btn in moduleBtn.buttons"
              :key="btn.id"
              :style="`position: relative;`"
              :class="`${btn.css}`"
            >
              {{ btn.contents }}
              <!-- {{ moduleBtn.left }} -->
            </button>
            <!-- </div> -->
          </div>
          <div
            v-for="paragraph in section.paragraphs"
            :key="paragraph.id"
            :style="`position: absolute;transform: translate(${paragraph.left}px, ${paragraph.top}px)`"
          >
            <p
              :class="paragraph.css"
              :style="`width: ${paragraph.width}px;height: ${paragraph.height}px`"
            >
              {{ paragraph.contents }}
            </p>
          </div>
        </component>
      </div>
    </div>
    <div
      v-else
      class="flex justify-center items-center h-screen"
    >
      <h1 class="relative">Không có dữ liệu</h1>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import VueDraggableResizable from "vue-draggable-resizable";

// const width = ref(0);
const previewSections = ref([]);
const dataPreview = ref(false);

onMounted(() => {
  const sectionsData = localStorage.getItem(
    "previewSections"
  );
  if (sectionsData) {
    previewSections.value =
      JSON.parse(sectionsData);
    dataPreview.value = true;
  }
  console.log(
    "DATA TRANFER: ",
    sectionsData,
    dataPreview
  );
});
</script>

<style scoped>
@import "vue-draggable-resizable/style.css";
</style>
