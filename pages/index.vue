<template>
  <div>
    <header
      class="bg-slate-400 h-16 items-center flex sticky z-50 top-0 px-4 justify-between"
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
      :class="menuProperty"
      class="menuRight fixed z-[1000] top-0 w-52 h-full bg-gray-200 p-4"
    >
      <IcClose
        @click="closeElementProperty()"
        class="cursor-pointer absolute top-2 right-2"
      />
      <div class="flex flex-col rounded-md mt-3">
        <div
          class="bg-slate-200 rounded-md flex justify-center p-2"
        >
          <h2>Element Property</h2>
        </div>
        <div>
          <h2>Element Property</h2>
        </div>
        <div>
          <h2>Element Property</h2>
        </div>
      </div>
      <!-- <ul
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
      </ul> -->
    </div>
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
        @resizing="onResize"
        @resize-stop="
          (x, y, w, h) =>
            onResizeStop(
              x,
              y,
              w,
              h,
              'button',
              section.id,
              button.id
            )
        "
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
        </button>
      </vue-draggable-resizable>
      <vue-draggable-resizable
        v-for="moduleBtn in section.modules"
        :key="moduleBtn.id"
        @resizing="onResize"
        @resize-stop="
          (x, y, w, h) =>
            onResizeStop(
              x,
              y,
              w,
              h,
              'module',
              section.id,
              moduleBtn.id
            )
        "
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
        @resizing="onResize"
        @resize-stop="
          (x, y, w, h) =>
            onResizeStop(
              x,
              y,
              w,
              h,
              'paragraph',
              section.id,
              paragraph.id
            )
        "
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
  </div>
</template>
<style>
.menuLeft {
  transition: 0.3s ease-in-out;
}

.menuRight {
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

const store = useSectionStore();
const isMenuOpen = ref(false);
const isElementProperty = ref(false);
const router = useRouter();
const selectedElement = ref({
  sectionId: null,
  type: null,
  elementId: null,
});
const showMenuElement = ref(false);
const selectedSectionId = ref(null);

const sectionStore = useSectionStore();
const sections = ref(sectionStore.sections);
const paragraphArray = ref([]);
const previewSections = ref([]);
const storeSections = ref(sectionStore.sections);
const dragging = ref(false);
const x = ref(0);
const y = ref(0);

const drag = ref(false);

const onResize = (...$event) => {
  // const { x, y, width, height } = $event;

  console.log(
    "EVENT X: ",
    $event[0],
    "EVENT Y: ",
    $event[1],
    "EVENT Width: ",
    $event[2],
    "EVENT Height: ",
    $event[3]
  );
};

const onResizeStop = (
  x,
  y,
  w,
  h,
  elementType,
  sectionId,
  elementId
) => {
  console.log(
    `resize stop: X: ${x}, Y: ${y}, W: ${w}, H: ${h}, elementType: ${elementType}, sectionId: ${sectionId}, elementId: ${elementId}`
  );
  const section = sectionStore.sections.find(
    (section) => section.id === sectionId
  );
  if (section) {
    if (elementType === "button") {
      const button = section.buttons.find(
        (button) => button.id === elementId
      );
      if (button) {
        button.width = w;
        button.height = h;
        console.log(
          "gan thanh cong width height resize ",
          button.width,
          button.height
        );
      }
    }
    if (elementType === "module") {
      // console.log(
      //   "resize template",
      //   elementType + elementId
      // );
      const moduleElement = section.modules.find(
        (template) => template.id === elementId
      );
      console.log("MODULE:", moduleElement);
      if (moduleElement) {
        console.log(
          "resize MODULE TRONG ID :",
          elementId
        );
        moduleElement.width = w;
        moduleElement.height = h;
        console.log("set rezise successfully");
      } else {
        console.log(
          "Không tìm thấy module với ID:",
          elementId
        );
      }
    }
    if (elementType === "paragraph") {
      const paragraph = section.paragraphs.find(
        (paragraph) => paragraph.id === elementId
      );
      if (paragraph) {
        paragraph.width = w;
        paragraph.height = h;
        console.log(
          "gan thanh cong width height resize ",
          paragraph.width,
          paragraph.height
        );
      }
    }
  }
};

const onDrag = (elementType, ...$event) => {
  // console.log("dang keo:", elementType);
  // console.log("EVENT X", $event[0]);
  // console.log("EVENT Y", $event[1]);
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
  // console.log("X:", x);
  // console.log("Y:", y);
  // console.log("elementTypeeeee:", elementType);
  // console.log("sectionId:", sectionId);
  // console.log("elementId:", elementId);

  const section = sectionStore.sections.find(
    (section) => section.id === sectionId
  );
  if (section) {
    if (elementType === "button") {
      const button = section.buttons.find(
        (button) => button.id === elementId
      );
      if (button) {
        // console.log("Gán thành công nút", x, y);
        button.left = x;
        button.top = y;
      } else {
        // console.log("Không tìm thấy nút");
      }
    }
    if (elementType === "paragraph") {
      const paragraph = section.paragraphs.find(
        (paragraph) => paragraph.id === elementId
      );
      if (paragraph) {
        // console.log(
        //   "Gán thành công đoạn văn",
        //   x,
        //   y
        // );
        paragraph.left = x;
        paragraph.top = y;
      } else {
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

function openElementProperty() {
  isElementProperty.value = true;
}

function closeElementProperty() {
  isElementProperty.value = false;
}

const menuProperty = computed(() => {
  return {
    "right-0": isElementProperty.value,
    "-right-[208px]": !isElementProperty.value,
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

  const clickedElement2 = event.target;
  const element = event.currentTarget;
  if (
    clickedElement2.classList.contains("section")
  ) {
    openElementProperty();
    console.log("Clicked on parent");
  } else {
    openElementProperty();
    console.log(
      "Clicked on children: ",
      clickedElement2
    );
  }
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

  if (
    !target.closest(".section") &&
    !target.closest(".menuLeft") &&
    !target.closest(".menuRight")
  ) {
    closeElementProperty();
  }
});

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
