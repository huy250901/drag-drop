// TinyMCEEditor.vue
<template>
  <Editor
    :api-key="apiKey"
    v-model="content"
    :init="{
      height: 200,
      menubar: false,
      plugins:
        'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount',
      toolbar:
        'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
    }"
  />
</template>

<script setup>
import { ref, watch } from "vue";
import Editor from "@tinymce/tinymce-vue";

const props = defineProps({
  modelValue: String,
  apiKey:
    "im553e0dg7ie5sse6op3k4zy8eptalk4mj47c3bx32z0upwb",
});

const emit = defineEmits(["update:modelValue"]);

const content = ref(props.modelValue);

watch(content, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>

<!-- api-key="im553e0dg7ie5sse6op3k4zy8eptalk4mj47c3bx32z0upwb" -->
