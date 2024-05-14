<template>
  <div>
    <h1>Preview</h1>
    <div
      v-for="section in sections"
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sections: [],
    };
  },
};
</script>
