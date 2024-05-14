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
        @click.stop="deleteElement"
        :class="{
          'bg-red-500': selectedElement,
          'bg-slate-200': !selectedElement,
        }"
        class="px-4 p-2 rounded-md"
        :disabled="!selectedElement"
      >
        Xóa
      </button>
      <!-- <button
        v-if="selectedElement.type !== null"
        @click="deleteElement"
        class="px-4 bg-slate-200 p-2 rounded-md"
      >
        Xóa
      </button> -->
      <!-- <router-link
        class="px-4 bg-slate-200 p-2 rounded-md"
        to="/PreviewPage"
        >Preview</router-link
      > -->
      <!-- <router-link
        class="px-4 bg-slate-200 p-2 rounded-md"
        :to="{
          name: 'preview',
          params: {
            sections: storeSections.value,
          },
        }"
      >
        Preview
      </router-link> -->
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
    <draggable
      v-model="sections"
      @end="onDragEnd"
    >
      <div
        v-for="section in sections"
        @click="handleSectionClick(section.id)"
        :key="section.id"
        class="section relative bg-slate-500 rounded-md p-4 mb-4 w-2/3 m-auto h-[300px]"
        @dragover.prevent
        @drop="drop($event, section.id)"
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
        <div
          v-for="button in section.buttons"
          :key="button.id"
        >
          <button
            :id="'button-' + button.id"
            class="absolute bg-red-600 p-2 rounded-md w-24 h-10"
            @mousedown="
              startDrag(
                $event,
                section.id,
                button.id
              )
            "
          >
            {{ button.contents }}
          </button>
        </div>
      </div>
    </draggable>
  </div>
</template>

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

const previewSections = ref([]);
const storeSections = ref(sectionStore.sections);

// const { params } = router.currentRoute.value;
// const { sections: receivedPreviewSections } =
//   params;
// previewSections.value = receivedPreviewSections;

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
  console.log("Clicked on Section", sectionId);
  console.log(
    "selectedSectionId",
    selectedSectionId
  );

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
    console.log(
      "co button",
      selectedSectionId.value
    );
    const sectionId = selectedSectionId.value;
    const clickedSection =
      sectionStore.sections.find(
        (section) => section.id === sectionId
      );
    if (clickedSection) {
      console.log("tao button ");

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
      console.log("buttonData", buttonData);
    }
  }
};

const startDrag = (
  event,
  sectionId,
  buttonId
) => {
  console.log("keo tha");
  const buttonElement = event.target;
  console.log("buttonElement", buttonElement);
  const sectionElement =
    buttonElement.closest(".section");
  const sectionRect =
    sectionElement.getBoundingClientRect();
  const initialX = event.clientX;
  const initialY = event.clientY;
  const offsetX = buttonElement.offsetLeft;
  const offsetY = buttonElement.offsetTop;

  const onMouseMove = (moveEvent) => {
    console.log("start drag");

    const deltaX = moveEvent.clientX - initialX;
    const deltaY = moveEvent.clientY - initialY;
    let newLeft = offsetX + deltaX;
    let newTop = offsetY + deltaY;

    const buttonRect =
      buttonElement.getBoundingClientRect();
    if (newLeft < 0) newLeft = 0;
    if (newTop < 0) newTop = 0;
    if (
      newLeft + buttonRect.width >
      sectionRect.width
    )
      newLeft =
        sectionRect.width - buttonRect.width;
    if (
      newTop + buttonRect.height >
      sectionRect.height
    )
      newTop =
        sectionRect.height - buttonRect.height;
    console.log("start drag", deltaX, deltaY);
    buttonElement.style.left = `${newLeft}px`;
    buttonElement.style.top = `${newTop}px`;

    const section = sections.find(
      (section) => section.id === sectionId
    );
    const button = section.buttons.find(
      (button) => button.id === buttonId
    );
    button.left = newLeft;
    button.top = newTop;
  };

  const onMouseUp = () => {
    document.removeEventListener(
      "mousemove",
      onMouseMove
    );
    document.removeEventListener(
      "mouseup",
      onMouseUp
    );
  };

  document.addEventListener(
    "mousemove",
    onMouseMove
  );
  document.addEventListener("mouseup", onMouseUp);
};

const selectElement = (
  sectionId,
  type,
  elementId
) => {
  console.log(
    "selectElement: " + selectedElement.value
  );
  selectedElement.value = {
    sectionId,
    type,
    elementId,
  };
};

const deleteElement = () => {
  if (selectedElement.value.type === "button") {
    console.log("day la button");
    sectionStore.removeButtonFromSection(
      selectedElement.value.sectionId,
      selectedElement.value.elementId
    );
  } else if (
    selectedElement.value.type === "paragraph"
  ) {
    console.log("day la paragraph");
    sectionStore.removeParagraphFromSection(
      selectedElement.value.sectionId,
      selectedElement.value.elementId
    );
  }
  selectedElement.value = {
    sectionId: null,
    type: null,
    elementId: null,
  };
};

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
