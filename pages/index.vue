<template>
  <div>
    <header
      class="bg-slate-500 h-16 items-center flex px-4 justify-between"
    >
      <button
        @click="openMenu"
        class="px-4 bg-slate-200 p-2 rounded-md"
      >
        Menu
      </button>
      <button
        :class="{
          'bg-red-500': selectedElement,
          'bg-slate-200': !selectedElement,
        }"
        class="px-4 p-2 rounded-md"
        :disabled="!selectedElement"
      >
        Xóa
      </button>

      <button
        @click="preview"
        class="px-4 bg-slate-200 p-2 rounded-md"
      >
        Preview
      </button>
    </header>

    <div
      :class="menuClasses"
      class="menuLeft fixed z-[1000] top-0 w-52 h-full bg-gray-400 p-4"
    >
      <IcClose
        @click="closeMenu"
        class="cursor-pointer absolute top-2 right-2"
      />
      <ul
        v-if="showMenuElement"
        class="flex flex-col gap-4 pt-4"
      >
        <li>
          <button
            class="button bg-white p-2 rounded-md w-full"
            @click="addSection"
            id="createSectionBtn"
          >
            Create Section
          </button>
        </li>
        <li>
          <button
            class="bg-white p-2 rounded-md w-full"
            @click="
              createButton(selectedSectionId)
            "
          >
            Add Button
          </button>
        </li>
        <li>
          <button
            class="bg-white p-2 rounded-md w-full"
            @click="
              createParagraph(selectedSectionId)
            "
          >
            Add paragraph
          </button>
        </li>
      </ul>
      <ul v-else class="flex flex-col gap-4 pt-4">
        <li>
          <button
            class="button bg-white p-2 rounded-md w-full"
            @click="addSection"
            id="createSectionBtn"
          >
            Create Section
          </button>
        </li>
      </ul>
    </div>

    <div
      v-for="section in sections"
      @click="handleSectionClick(section.id)"
      :key="section.id"
      class="section relative bg-slate-500 rounded-md p-4 mb-4 w-2/3 m-auto h-[300px]"
    >
      <div
        v-for="paragraph in section.paragraphs"
        :key="paragraph.id"
      >
        <p
          :id="'paragraph-' + paragraph.id"
          class="cursor-pointer bg-emerald-600 text-center w-40"
        >
          {{ paragraph.contents }}
        </p>
      </div>

      <draggable
        v-model="section.buttons"
        group="buttonsGroup"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #item="{ element }">
          <button
            :id="'button-' + element.id"
            class="bg-red-600 p-2 rounded-md w-24 h-10"
          >
            {{ element.contents }}
          </button>
        </template>
      </draggable>

      <!-- <div
        v-for="button in section.buttons"
        :key="button.id"
        :id="'button-' + button.id"
      >
        <button
          class="bg-red-600 p-2 rounded-md w-24 h-10"
        >
          {{ button.contents }}
        </button>
        <Draggable v-model="section.buttons">
          <button
            class="bg-red-600 p-2 rounded-md w-24 h-10"
          >
            <div>
              {{ button.contents }}
            </div>
          </button>
        </Draggable>
      </div> -->
    </div>
  </div>
</template>

<!-- <template>
  <div>
    <header
      class="bg-slate-500 h-16 items-center flex px-4 justify-between"
    >
      <button
        @click="openMenu"
        class="px-4 bg-slate-200 p-2 rounded-md"
      >
        Menu
      </button>
      <button
        :class="{
          'bg-red-500': selectedElement,
          'bg-slate-200': !selectedElement,
        }"
        class="px-4 p-2 rounded-md"
        :disabled="!selectedElement"
      >
        Xóa
      </button>
      <button
        @click="preview"
        class="px-4 bg-slate-200 p-2 rounded-md"
      >
        Preview
      </button>
    </header>

    <div
      :class="menuClasses"
      class="menuLeft fixed z-[1000] top-0 w-52 h-full bg-gray-400 p-4"
    >
      <IcClose
        @click="closeMenu"
        class="cursor-pointer absolute top-2 right-2"
      />
      <ul
        v-if="showMenuElement"
        class="flex flex-col gap-4 pt-4"
      >
        <li>
          <button
            class="button bg-white p-2 rounded-md w-full"
            @click="addSection"
            id="createSectionBtn"
          >
            Create Section
          </button>
        </li>
        <li>
          <button
            class="bg-white p-2 rounded-md w-full"
            @click="
              createButton(selectedSectionId)
            "
          >
            Add Button
          </button>
        </li>
        <li>
          <button
            class="bg-white p-2 rounded-md w-full"
            @click="
              createParagraph(selectedSectionId)
            "
          >
            Add paragraph
          </button>
        </li>
      </ul>
      <ul v-else class="flex flex-col gap-4 pt-4">
        <li>
          <button
            class="button bg-white p-2 rounded-md w-full"
            @click="addSection"
            id="createSectionBtn"
          >
            Create Section
          </button>
        </li>
      </ul>
    </div>

    <div
      v-for="section in sections"
      :key="section.id"
      class="section relative bg-slate-500 rounded-md p-4 mb-4 w-2/3 m-auto h-[300px]"
      @click="handleSectionClick"
    >
      <div
        v-for="paragraph in section.paragraphs"
        :key="paragraph.id"
      >
        <p
          :id="'paragraph-' + paragraph.id"
          class="cursor-pointer bg-emerald-600 text-center w-40"
        >
          {{ paragraph.contents }}
        </p>
      </div>

      <draggable
        v-model="section.buttons"
        group="buttonsGroup"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <button
          v-for="button in section.buttons"
          :key="button.id"
          :id="'button-' + button.id"
          class="bg-red-600 p-2 rounded-md w-24 h-10"
        >
          {{ button.contents }}
        </button>
      </draggable>
    </div>
  </div>
</template> -->
<style>
.menuLeft {
  transition: 0.3s ease-in-out;
}
</style>

<script setup>
import { ref, watch } from "vue";
import IcClose from "./assets/icons/ic_close.vue";
import { useSectionStore } from "~/store/myStore";
import { useRouter } from "vue-router";
import draggable from "vuedraggable";
const drag = ref(false);

const isMenuOpen = ref(false);
const router = useRouter();
const selectedElement = ref({
  sectionId: null,
  type: null,
  elementId: null,
});

let sectionIdCounter = 0;
const showMenuElement = ref(false);
const selectedSectionId = ref(null);

const sectionStore = useSectionStore();
const sections = sectionStore.sections;
const paragraphArray = ref([]);

const previewSections = ref([]);
const storeSections = ref(sectionStore.sections);
const preview = () => {
  router.push({
    path: "/previewPage",
    query: {
      sections: JSON.stringify(
        storeSections.value
      ),
    },
  });
};

watch(sections, (newSections, oldSections) => {
  console.log("New sections:", newSections);
  console.log("Old sections:", oldSections);
});

const openMenu = () => {
  isMenuOpen.value = true;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const menuClasses = computed(() => {
  return {
    "left-0": isMenuOpen.value,
    "-left-[208px]": !isMenuOpen.value,
  };
});

const addSection = () => {
  const sectionId =
    sectionStore.sections.length + 1;
  const sectionData = {
    id: sectionId,
    buttons: [],
    paragraphs: [],
  };
  sectionStore.addSection(sectionData);
};

const handleSectionClick = (sectionId) => {
  showMenuElement.value = true;
  selectedSectionId.value = sectionId;
};

const createParagraph = () => {
  if (selectedSectionId.value !== null) {
    console.log(
      "co paragraph",
      selectedSectionId.value
    );
    const sectionId = selectedSectionId.value;
    const clickedSection =
      sectionStore.sections.find(
        (section) => section.id === sectionId
      );
    if (clickedSection) {
      console.log("tao paragraph ");

      const paragraphId =
        clickedSection.paragraphs.length + 1;
      const paragraphData = {
        id: paragraphId,
        contents: `Add a paragraph text here.${paragraphId}`,
      };

      paragraphArray.value.push(paragraphData);
      console.log(
        "paragraphArray",
        paragraphArray
      );
      sectionStore.addParagraphToSection(
        sectionId,
        paragraphData
      );
      console.log("paragraphData", paragraphData);
    }
  }
};

const createButton = () => {
  if (selectedSectionId.value !== null) {
    const sectionId = selectedSectionId.value;
    const clickedSection =
      sectionStore.sections.find(
        (section) => section.id === sectionId
      );
    if (clickedSection) {
      const buttonId =
        clickedSection.buttons.length + 1;
      const buttonData = {
        id: buttonId,
        contents: `Button ${buttonId}`,
      };
      sectionStore.addButtonToSection(
        sectionId,
        buttonData
      );
    }
  }
};

// const createButton = () => {
//   if (selectedSectionId.value !== null) {
//     console.log(
//       "co button",
//       selectedSectionId.value
//     );
//     const sectionId = selectedSectionId.value;
//     const clickedSection =
//       sectionStore.sections.find(
//         (section) => section.id === sectionId
//       );
//     if (clickedSection) {
//       console.log("tao button ");

//       const buttonId =
//         clickedSection.buttons.length + 1;
//       const buttonData = {
//         id: buttonId,
//         contents: `Button ${buttonId}`,
//       };
//       sectionStore.addButtonToSection(
//         sectionId,
//         buttonData
//       );
//       console.log("buttonData", buttonData);
//     }
//   }
// };

document.addEventListener("click", (event) => {
  const target = event.target;

  if (
    !target.closest(".menuLeft") &&
    !target.closest(".section")
  ) {
    showMenuElement.value = false;
  }
});
</script>
