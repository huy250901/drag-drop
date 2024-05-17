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
              :class="`${button.css}`"
            >
              {{ `${button.contents}` }}
            </component>
          </div>
          <div
            v-for="moduleBtn in section.modules"
            :key="moduleBtn.id"
            :class="moduleBtn.css"
            :style="`position: absolute;transform: translate(${moduleBtn.left}px, ${moduleBtn.top}px);width: ${moduleBtn.width}px; height: ${moduleBtn.height}px`"
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
            <p :class="paragraph.css">
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
      <vue-draggable-resizable>
        <p>
          You can drag me around and resize me as
          you wish.
        </p>
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import VueDraggableResizable from "vue-draggable-resizable";

// const width = ref(0);
const previewSections = ref([]);
const dataPreview = ref(false);

const route = useRoute();

onMounted(() => {
  const sections = route.query.sections;
  if (sections) {
    console.log("dataPreview", sections);
    try {
      previewSections.value =
        JSON.parse(sections);
      if (previewSections.value.length > 0) {
        dataPreview.value = true;
      }
    } catch (e) {
      console.error("Error parsing sections:", e);
    }
  }
});
</script>

<style scoped>
@import "vue-draggable-resizable/style.css";
</style>
