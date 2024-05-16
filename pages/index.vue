<template>
  <div>
    <header
      class="bg-slate-500 h-16 items-center flex px-4 justify-between"
    >
      <vue-draggable-resizable
        :w="50"
        :h="50"
        :parent="true"
      >
        <button
          @click="openMenu"
          class="px-4 bg-slate-200 p-2 rounded-md"
        >
          Menu
        </button>
      </vue-draggable-resizable>
      <button
        :class="{
          'bg-red-500': selectedElement,
          'bg-slate-200': !selectedElement,
        }"
        class="px-4 p-2 rounded-md"
        :disabled="!selectedElement"
        @click="deleteElement"
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
            @click="createButton"
          >
            Add Button
          </button>
        </li>
        <li>
          <button
            class="bg-white p-2 rounded-md w-full"
            @click="createParagraph"
          >
            Add paragraph
          </button>
        </li>
        <li>
          <button
            class="bg-white p-2 rounded-md w-full"
            @click="createTemplate"
          >
            Add template
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
      @click="
        handleSectionClick(section.id, $event)
      "
      :key="section.id"
      :class="[
        section.css,
        {
          selected:
            selectedSectionId === section.id,
        },
      ]"
    >
      <div
        v-for="moduleBtn in section.modules"
        :key="moduleBtn.id"
        :class="`absolute ${moduleBtn.css}`"
        :style="`left: ${moduleBtn.left}px; top: ${moduleBtn.top}px`"
        @mousedown="
          startDrag(
            $event,
            section.id,
            moduleBtn.id,
            'section'
          )
        "
      >
        <div
          v-for="btn in moduleBtn.buttons"
          :key="btn.id"
        >
          <button :class="btn.css">
            {{ `${btn.contents}` }}
          </button>
        </div>
      </div>

      <!-- <div
        v-for="paragraph in section.paragraphs"
        :key="paragraph.id"
      >
        <p
          :id="'paragraph-' + paragraph.id"
          :style="`left: ${paragraph.left}px; top: ${paragraph.top}px`"
          :class="`${paragraph.css}`"
          @click="
            selectElement(
              section.id,
              'paragraph',
              paragraph.id
            )
          "
          @mousedown="
            startDrag(
              $event,
              section.id,
              paragraph.id,
              'paragraph'
            )
          "
        >
          {{ paragraph.contents }}
        </p>
      </div> -->
      <div
        v-for="button in section.buttons"
        :key="button.id"
        class="w-full h-full"
      >
        <vue-draggable-resizable
          :w="50"
          :h="50"
          :parent="true"
        >
          <button
            :id="'button-' + button.id"
            :class="`${button.css}`"
            @click="
              selectElement(
                section.id,
                'button',
                button.id
              )
            "
          >
            {{ button.contents }}
          </button>
        </vue-draggable-resizable>
      </div>
    </div>
  </div>
</template>
<style>
.menuLeft {
  transition: 0.3s ease-in-out;
}

.selected {
  border: 2px dotted black;
}
</style>

<script setup>
import { ref, watch } from "vue";
import IcClose from "./assets/icons/ic_close.vue";
import { useSectionStore } from "~/store/myStore";
import { useRouter } from "vue-router";
import draggable from "vuedraggable";
import VueDraggableResizable from "vue-draggable-resizable";

const drag = ref(false);
const store = useSectionStore();

const isMenuOpen = ref(false);
const router = useRouter();
const selectedElement = ref({
  sectionId: null,
  type: null,
  elementId: null,
});
const showMenuElement = ref(false);
const selectedSectionId = ref(null);

const sectionStore = useSectionStore();
// const sections = sectionStore.sections;
const sections = ref(sectionStore.sections);
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

const selectElement = (
  sectionId,
  type,
  elementId
) => {
  selectedElement.value = {
    sectionId: sectionId,
    type: type,
    elementId: elementId,
  };
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
  const sectionData = {
    id: sectionStore.sections.length + 1,
    buttons: [],
    paragraphs: [],
    modules: [],
  };
  sectionStore.addSection(sectionData);
};

const handleSectionClick = (sectionId, event) => {
  console.log("section ID clicked: " + sectionId);

  const element = event.currentTarget;
  console.log("Clicked element:", element);
  showMenuElement.value = true;
  selectedSectionId.value = sectionId;
};

const createParagraph = () => {
  if (selectedSectionId.value !== null) {
    const sectionId = selectedSectionId.value;
    const section = sectionStore.sections.find(
      (section) => section.id === sectionId
    );

    if (section) {
      let maxParagraphId = 0;
      section.paragraphs.forEach((paragraph) => {
        if (paragraph.id > maxParagraphId) {
          maxParagraphId = paragraph.id;
        }
      });

      const paragraphId = maxParagraphId + 1;
      const paragraphData = {
        id: paragraphId,
        contents: `Add a paragraph text here.${paragraphId}`,
      };

      sectionStore.addParagraphToSection(
        sectionId,
        paragraphData
      );
      console.log("paragraph:", section);
    }
  }
};

const createButton = () => {
  if (selectedSectionId.value !== null) {
    const sectionId = selectedSectionId.value;
    const section = sectionStore.sections.find(
      (section) => section.id === sectionId
    );
    if (section) {
      let nextButtonId = 1;
      if (section.buttons.length > 0) {
        const maxButtonId = Math.max(
          ...section.buttons.map(
            (button) => button.id
          )
        );
        nextButtonId = maxButtonId + 1;
      }
      const buttonData = {
        id: nextButtonId,
        // contents: `Button ${nextButtonId}`,
      };
      sectionStore.addButtonToSection(
        sectionId,
        buttonData
      );
    }
  }
};

const createTemplate = () => {
  if (selectedSectionId.value !== null) {
    const sectionId = selectedSectionId.value;
    const section = sectionStore.sections.find(
      (section) => section.id === sectionId
    );

    if (section) {
      const sectionData = {
        type: "section",
        // css: "bg-slate-300 w-[200px] h-[100px] flex justify-center items-center",
      };

      sectionStore.addSectionWithButton(
        sectionId,
        sectionData
      );
      console.log("MODULE", section);
    }
  }
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

const startDrag = (
  event,
  sectionId,
  elementId,
  elementType
) => {
  const element = event.target;
  const sectionElement =
    element.closest(".section");
  const sectionRect =
    sectionElement.getBoundingClientRect();
  const initialX = event.clientX;
  const initialY = event.clientY;
  const offsetX = element.offsetLeft;
  const offsetY = element.offsetTop;

  const onMouseMove = (moveEvent) => {
    const deltaX = moveEvent.clientX - initialX;
    const deltaY = moveEvent.clientY - initialY;
    let newLeft = offsetX + deltaX;
    let newTop = offsetY + deltaY;

    const elementRect =
      element.getBoundingClientRect();
    if (newLeft < 0) newLeft = 0;
    if (newTop < 0) newTop = 0;
    if (
      newLeft + elementRect.width >
      sectionRect.width
    )
      newLeft =
        sectionRect.width - elementRect.width;
    if (
      newTop + elementRect.height >
      sectionRect.height
    )
      newTop =
        sectionRect.height - elementRect.height;

    element.style.left = `${newLeft}px`;
    element.style.top = `${newTop}px`;

    const section = sectionStore.sections.find(
      (section) => section.id === sectionId
    );

    if (elementType === "button") {
      console.log("keo button");
      const button = section.buttons.find(
        (button) => button.id === elementId
      );
      button.left = newLeft;
      button.top = newTop;
      button.css = `absolute bg-blue-500 text-white rounded px-4 py-2 left-[${newLeft}px] top-[${newTop}px]`;
    } else if (elementType === "paragraph") {
      console.log("keo paragraph");

      const paragraph = section.paragraphs.find(
        (paragraph) => paragraph.id === elementId
      );
      paragraph.left = newLeft;
      paragraph.top = newTop;
      paragraph.css = `absolute left-[${newLeft}px] top-[${newTop}px]`;
    } else if (elementType === "section") {
      console.log("keo section");

      console.log(
        "SECTION MODULES ARRAY",
        section.modules[elementId - 1]
      );
      console.log("element ID", elementId);

      //     const foundModule = section.modules.find(
      // (module) => module.id === elementId);
      const foundModule =
        section.modules[elementId - 1];
      foundModule.left = newLeft;
      foundModule.top = newTop;
      foundModule.css = `absolute bg-slate-300 w-[200px] h-[100px] flex justify-center items-center left-[${newLeft}px] top-[${newTop}px]`;
    }
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

const deleteElement = () => {
  console.log("khong co element de xoa");
  if (
    selectedElement.value.sectionId &&
    selectedElement.value.type === "button"
  ) {
    const sectionIndex =
      sectionStore.sections.findIndex(
        (section) =>
          section.id ===
          selectedElement.value.sectionId
      );
    if (sectionIndex !== -1) {
      const buttonIndex = sectionStore.sections[
        sectionIndex
      ].buttons.findIndex(
        (button) =>
          button.id ===
          selectedElement.value.elementId
      );
      if (buttonIndex !== -1) {
        sectionStore.removeButtonFromSection(
          selectedElement.value.sectionId,
          selectedElement.value.elementId
        );
      }
    }
  } else if (
    selectedElement.value.sectionId &&
    selectedElement.value.type === "paragraph"
  ) {
    const sectionIndex =
      sectionStore.sections.findIndex(
        (section) =>
          section.id ===
          selectedElement.value.sectionId
      );
    if (sectionIndex !== -1) {
      const paragraphIndex =
        sectionStore.sections[
          sectionIndex
        ].paragraphs.findIndex(
          (paragraph) =>
            paragraph.id ===
            selectedElement.value.elementId
        );
      if (paragraphIndex !== -1) {
        sectionStore.removeParagraphFromSection(
          selectedElement.value.sectionId,
          selectedElement.value.elementId
        );
      }
    }
  }
  console.log(sections, "data sau khi xoa");
  selectedElement.value = {
    sectionId: null,
    type: null,
    elementId: null,
  };
};
</script>
