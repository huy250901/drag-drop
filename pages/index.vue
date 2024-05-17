<template>
  <div>
    <header
      class="bg-slate-400 h-16 items-center flex sticky z-50 top-0 px-4 justify-between"
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
        `${section.css} h-[500px]
        border-2 border- bg-slate-500`,
        {
          selected:
            selectedSectionId === section.id,
        },
      ]"
    >
      <vue-draggable-resizable
        v-for="button in section.buttons"
        :key="button.id"
        @dragging="onDrag('button', $event)"
        @drag-stop="
          (x, y) =>
            onDragStop(
              x,
              y,
              'button',
              section.id,
              button.id
            )
        "
        class="absolute w-32 h-11"
        :w="`${button.width}`"
        :h="`${button.height}`"
        :x="`${button.left}`"
        :y="`${button.top}`"
        :parent="true"
      >
        <p
          v-if="dragging"
          class="absolute top-[-20px] left-0"
        >
          <!-- :style="
          button.left
            ? `transform: translate(${button.left}px, ${button.top}px)`
            : ''
        " -->

          <!-- X: {{ x }} / Y: {{ y }} -->
        </p>
        <button
          :class="`${button.css}`"
          @click="
            selectElement(
              section.id,
              'button',
              button.id
            )
          "
        >
          {{ `${button.contents}` }}
          <!-- {{
            `X: ${button.left}, Y:${button.top}`
          }} -->
        </button>
      </vue-draggable-resizable>
      <vue-draggable-resizable
        v-for="moduleBtn in section.modules"
        :key="moduleBtn.id"
        :w="`${moduleBtn.width}`"
        :h="`${moduleBtn.height}`"
        :x="`${moduleBtn.left}`"
        :y="`${moduleBtn.top}`"
        :parent="true"
        class="absolute"
        @dragging="onDrag('template', $event)"
        @drag-stop="
          (x, y) =>
            onDragStop(
              x,
              y,
              'template',
              section.id,
              moduleBtn.id
            )
        "
      >
        <div
          :class="`w-full h-full ${moduleBtn.css}`"
        >
          <button
            v-for="btn in moduleBtn.buttons"
            :key="btn.id"
            :class="`${btn.css}`"
            :style="`width: ${btn.width}px; height: ${btn.height}px`"
          >
            {{ btn.contents }}
          </button>
        </div>
      </vue-draggable-resizable>

      <vue-draggable-resizable
        v-for="paragraph in section.paragraphs"
        :key="paragraph.id"
        :w="`${paragraph.width}`"
        :h="`${paragraph.height}`"
        :x="paragraph.left"
        :y="paragraph.top"
        @dragging="onDrag('paragraph', $event)"
        @drag-stop="
          (x, y) =>
            onDragStop(
              x,
              y,
              'paragraph',
              section.id,
              paragraph.id
            )
        "
        class="absolute"
        :parent="true"
      >
        <p
          :id="'paragraph-' + paragraph.id"
          :class="`w-full h-full ${paragraph.css}`"
          @click="
            selectElement(
              section.id,
              'paragraph',
              paragraph.id
            )
          "
        >
          {{ paragraph.contents }}
        </p>
      </vue-draggable-resizable>
    </div>

    <!-- <div class="w-3/12 h-full bg-slate-200">
        <h2>Hello</h2>
      </div> -->
  </div>
</template>
<style>
.menuLeft {
  transition: 0.3s ease-in-out;
}

.selected {
  border: 2px dotted white;
}
</style>

<script setup>
import { ref, watch } from "vue";
import IcClose from "./assets/icons/ic_close.vue";
import { useSectionStore } from "~/store/myStore";
import { useRouter } from "vue-router";
import draggable from "vuedraggable";
import VueDraggableResizable from "vue-draggable-resizable";

const dragging = ref(false);
const x = ref(0);
const y = ref(0);

const drag = ref(false);

const onDrag = (elementType, ...$event) => {
  console.log("dang keo:", elementType);
  console.log("EVENT X", $event[0]);
  console.log("EVENT Y", $event[1]);
  dragging.value = true;
  x.value = $event[0];
  y.value = $event[1];
};

const onDragStop = (
  x,
  y,
  elementType,
  sectionId,
  elementId
) => {
  console.log("X:", x);
  console.log("Y:", y);
  console.log("elementTypeeeee:", elementType);
  console.log("sectionId:", sectionId);
  console.log("elementId:", elementId);

  const section = sectionStore.sections.find(
    (section) => section.id === sectionId
  );
  if (section) {
    if (elementType === "button") {
      const button = section.buttons.find(
        (button) => button.id === elementId
      );
      if (button) {
        console.log("Gán thành công nút", x, y);
        button.left = x;
        button.top = y;
      } else {
        console.log("Không tìm thấy nút");
      }
    }
    if (elementType === "paragraph") {
      const paragraph = section.paragraphs.find(
        (paragraph) => paragraph.id === elementId
      );
      if (paragraph) {
        console.log(
          "Gán thành công đoạn văn",
          x,
          y
        );
        paragraph.left = x;
        paragraph.top = y;
      } else {
        console.log("Không tìm thấy đoạn văn");
      }
    }
    if (elementType === "template") {
      console.log("DANG KEO SECTION MODULE");
      const moduleElement = section.modules.find(
        (template) => template.id === elementId
      );
      console.log("MODULE:", moduleElement);
      if (moduleElement) {
        console.log(
          "keo MODULE TRONG ID :",
          elementId
        );
        moduleElement.left = x;
        moduleElement.top = y;
        console.log("set successfully");
      } else {
        console.log(
          "Không tìm thấy module với ID:",
          elementId
        );
      }
    }
  } else {
    console.log("Không tìm thấy phần");
  }

  dragging.value = false;
};

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
  element.style;
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
        type: "template",
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

// const startDrag = (
//   event,
//   sectionId,
//   elementId,
//   elementType
// ) => {
//   const element = event.target;
//   const sectionElement =
//     element.closest(".section");
//   const sectionRect =
//     sectionElement.getBoundingClientRect();
//   const initialX = event.clientX;
//   const initialY = event.clientY;
//   const offsetX = element.offsetLeft;
//   const offsetY = element.offsetTop;

//   const onMouseMove = (moveEvent) => {
//     const deltaX = moveEvent.clientX - initialX;
//     const deltaY = moveEvent.clientY - initialY;
//     let newLeft = offsetX + deltaX;
//     let newTop = offsetY + deltaY;

//     const elementRect =
//       element.getBoundingClientRect();
//     if (newLeft < 0) newLeft = 0;
//     if (newTop < 0) newTop = 0;
//     if (
//       newLeft + elementRect.width >
//       sectionRect.width
//     )
//       newLeft =
//         sectionRect.width - elementRect.width;
//     if (
//       newTop + elementRect.height >
//       sectionRect.height
//     )
//       newTop =
//         sectionRect.height - elementRect.height;

//     element.style.left = `${newLeft}px`;
//     element.style.top = `${newTop}px`;

//     const section = sectionStore.sections.find(
//       (section) => section.id === sectionId
//     );

//     if (elementType === "button") {
//       console.log("keo button");
//       const button = section.buttons.find(
//         (button) => button.id === elementId
//       );
//       button.left = newLeft;
//       button.top = newTop;
//       button.css = `absolute bg-blue-500 text-white rounded px-4 py-2 left-[${newLeft}px] top-[${newTop}px]`;
//     } else if (elementType === "paragraph") {
//       console.log("keo paragraph");

//       const paragraph = section.paragraphs.find(
//         (paragraph) => paragraph.id === elementId
//       );
//       paragraph.left = newLeft;
//       paragraph.top = newTop;
//       paragraph.css = `absolute left-[${newLeft}px] top-[${newTop}px]`;
//     } else if (elementType === "section") {
//       console.log("keo section");

//       console.log(
//         "SECTION MODULES ARRAY",
//         section.modules[elementId - 1]
//       );
//       console.log("element ID", elementId);

//       //     const foundModule = section.modules.find(
//       // (module) => module.id === elementId);
//       const foundModule =
//         section.modules[elementId - 1];
//       foundModule.left = newLeft;
//       foundModule.top = newTop;
//       foundModule.css = `absolute bg-slate-300 w-[200px] h-[100px] flex justify-center items-center left-[${newLeft}px] top-[${newTop}px]`;
//     }
//   };

//   const onMouseUp = () => {
//     document.removeEventListener(
//       "mousemove",
//       onMouseMove
//     );
//     document.removeEventListener(
//       "mouseup",
//       onMouseUp
//     );
//   };

//   document.addEventListener(
//     "mousemove",
//     onMouseMove
//   );
//   document.addEventListener("mouseup", onMouseUp);
// };

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
        console.log(
          "xoa element ID: " +
            selectedElement.value.elementId,
          "ELEMENT TYPE:",
          selectedElement.value
        );
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
        console.log(
          "xoa element: " +
            selectedElement.value.elementId
        );
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
