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
          <!-- Header Content -->
          <component
            :is="header.type"
            v-for="header in section.headerContent"
            :key="header.id"
            :class="`${header.css} absolute`"
            :style="header.style"
          >
            <div
              v-for="divOne in header.divOne"
              :key="divOne.id"
              :class="divOne.css"
            >
              <component
                v-for="span in divOne.childs"
                :class="span.css"
                :is="span.type"
                :key="span.id"
              >
                {{ span.content }}
              </component>
            </div>
            <div
              v-for="divSecond in header.divSecond"
              :class="divSecond.css"
              :key="divSecond.id"
            >
              <h1
                v-for="h in divSecond.childs"
                :class="h.cssH1"
                :key="h.id"
              >
                <span
                  v-for="span in h.childH1"
                  :key="span.id"
                  :class="span.css"
                  :style="span.style"
                  >{{ span.content }}</span
                >
              </h1>
              <a
                v-for="a in divSecond.childs"
                :key="a.id"
                :class="a.cssA"
                :href="a.href"
                >{{ a.contentA }}</a
              >
            </div>
          </component>
          <!-- IMAGE -->
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
          <!-- BUTTON -->
          <div
            v-for="button in section.buttons"
            :key="button.id"
            class="absolute"
            :style="`transform: translate(${button.left}px, ${button.top}px); width: ${button.width}px; height: ${button.height}px`"
          >
            <component
              :is="button.type"
              :class="`${button.css} bg-blue-500`"
              >{{ button.contents }}</component
            >
          </div>
          <!-- HEADER -->
          <div
            v-for="header in section.headers"
            class="absolute w-full"
            :key="header.id"
            :style="`transform: translate(0px, ${header.top}px);width: ${header.width}px; height: ${header.height}px`"
          >
            <component
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
          <!-- MODULE BTN -->
          <div
            v-for="moduleBtn in section.modules"
            :key="moduleBtn.id"
            :class="`${moduleBtn.css} absolute`"
            :style="`transform: translate(${moduleBtn.left}px, ${moduleBtn.top}px); width: ${moduleBtn.width}px; height: ${moduleBtn.height}px`"
          >
            <component
              :is="`button`"
              v-for="button in moduleBtn.buttons"
              :key="button.id"
              :class="button.css"
              :style="`width: ${button.width}px;height: ${button.height}`"
            >
              {{ button.contents }}
            </component>
          </div>
          <!-- PARAGRAPH -->
          <div
            v-for="paragraph in section.paragraphs"
            class="absolute"
            :key="paragraph.id"
            :style="`transform: translate(${paragraph.left}px, ${paragraph.top}px); width: ${paragraph.width}px; height: ${paragraph.height}px`"
          >
            <component
              :is="paragraph.typeP"
              :class="paragraph.css"
            >
              {{ paragraph.contents }}
            </component>
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
