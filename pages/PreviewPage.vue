<template>
  <div>
    <!-- <h1 class="relative z-40">Preview</h1> -->
    <NuxtLink
      class="bg-red-500 rounded-md p-2 relative z-40 top-[12px]"
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
            <button :class="`${button.css}`">
              {{ button.contents }}
              {{ button.left }}
              {{ button.top }}
            </button>
          </div>
          <div
            v-for="paragraph in section.paragraphs"
            :key="paragraph.id"
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

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
