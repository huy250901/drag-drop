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
            v-for="image in section.images"
            class="absolute"
            :key="image.id"
            :style="`transform: translate(${image.left}px, ${image.top}px); width: ${image.width}px; height: ${image.height}px`"
          >
            <component
              :is="image.type"
              :src="image.src"
              :class="image.css"
            >
            </component>
          </div>

          <div
            class="absolute w-full"
            v-for="header in section.headers"
            :key="header.id"
            :style="`position: absolute;
width: ${header.width}px; height: ${header.height}px`"
          >
            <component
              :style="`transform: translate(0px, ${header.top}px)`"
              :is="header.type"
              :header="header"
              :class="`${header.css} h-[${header.height}px] ${header.backgroundColor}`"
            >
              <component
                :is="div.type"
                :key="div.id"
                v-for="div in header.divOne"
                :class="div.css"
              >
                <img
                  src="../assets/img/instgram.webp"
                  alt="logo"
                  :class="div.cssImg"
                />
              </component>
              <component
                :class="div.css"
                :is="div.type"
                v-for="div in header.divSecond"
                :key="div.id"
              >
                <component
                  :class="`${div.cssUl}`"
                  :key="div.id"
                  :is="div.parentLink"
                >
                  <li
                    v-for="li in div.links"
                    :key="li.id"
                    :class="li.cssLi"
                  >
                    <a
                      :class="li.cssA"
                      :href="li.href"
                      >{{ li.name }}</a
                    >
                  </li>
                </component>
              </component>
            </component>
          </div>
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
            :style="`width: ${moduleBtn.width}px;height: ${moduleBtn.height}px;transform: translate(${moduleBtn.left}px, ${moduleBtn.top}px)`"
          >
            <component
              :is="`button`"
              v-for="button in moduleBtn.buttons"
              :key="button.id"
              :class="button.css"
              :style="`position: absolute; width: ${button.width}px;height: ${button.height}px`"
            >
              {{ button.contents }}
            </component>
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
  // console.log(
  //   "DATA TRANFER: ",
  //   sectionsData,
  //   dataPreview
  // );
});
</script>

<style scoped>
@import "vue-draggable-resizable/style.css";
</style>
