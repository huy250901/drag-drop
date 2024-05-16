<template>
  <div>
    <NuxtLink
      class="bg-red-500 rounded-md p-2 absolute z-40 top-[12px]"
      to="/"
      >Return Home</NuxtLink
    >
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
          >
            <component
              :is="button.type"
              :style="`left: ${button.left}px ;top: ${button.top}px`"
              :class="`${button.css} `"
            >
              {{ button.contents }}
            </component>
          </div>
          <div
            v-for="moduleBtn in section.modules"
            :key="moduleBtn.id"
            :class="moduleBtn.css"
            :style="`left: ${moduleBtn.left}px; top: ${moduleBtn.top}px`"
          >
            <div
              v-for="btn in moduleBtn.buttons"
              :key="btn.id"
            >
              <button :class="btn.css">
                {{ btn.contents }}
              </button>
            </div>
          </div>
          <div
            v-for="paragraph in section.paragraphs"
            :key="paragraph.id"
          >
            <p
              :class="paragraph.css"
              :style="`left: ${paragraph.left}px; top: ${paragraph.top}px`"
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
      <!-- <vue-draggable-resizable
        :w="100"
        :h="100"
        v-on:dragging="onDrag"
        v-on:resizing="onResize"
        :parent="true"
      >
        <p>
          Hello! I'm a flexible component. You can
          drag me around and you can resize me.<br />
          X: {{ x }} / Y: {{ y }} - Width:
          {{ width }} / Height: {{ height }}
        </p>
      </vue-draggable-resizable> -->
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
