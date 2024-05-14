<template>
  <div>
    <h1>Preview</h1>
    <div v-if="dataPreview">
      <div
        v-for="section in previewSections"
        :key="section.id"
      >
        <h2>Section {{ section.id }}</h2>
        <div
          v-for="button in section.buttons"
          :key="button.id"
        >
          <p>
            Button {{ button.id }}:
            {{ button.contents }}
          </p>
        </div>
        <div
          v-for="paragraph in section.paragraphs"
          :key="paragraph.id"
        >
          <p>
            Paragraph {{ paragraph.id }}:
            {{ paragraph.contents }}
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Không có dữ liệu</h1>
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
  console.log(
    previewSections.value,
    "preview sections value"
  );
});
</script>
