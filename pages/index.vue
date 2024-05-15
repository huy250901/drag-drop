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
      @click="handleSectionClick(section.id)"
      :key="section.id"
      :class="`section ${section.css}`"
    >
      <!-- <div
        v-for="moduleBtn in section.modules"
        :key="moduleBtn.id"
      >
        <div :class="moduleBtn.css">
          {{ moduleBtn.contents }}
        </div>
      </div> -->

      <div
        v-for="moduleBtn in section.modules"
        :key="moduleBtn.id"
        :class="`${moduleBtn.css}`"
      >
        <div
          v-for="btn in moduleBtn.buttons"
          :key="btn.id"
        >
          <!-- Hiển thị nội dung của mỗi button -->
          <button :class="btn.css">
            {{ btn.contents }}
          </button>
        </div>
      </div>

      <div
        v-for="paragraph in section.paragraphs"
        :key="paragraph.id"
        @click="
          selectElement(
            section.id,
            'paragraph',
            paragraph.id
          )
        "
      >
        <p
          :id="'paragraph-' + paragraph.id"
          :class="`${paragraph.css}`"
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
          :class="`${button.css}`"
          @click="
            selectElement(
              section.id,
              'button',
              button.id
            )
          "
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
import draggable from "vuedraggable";
const drag = ref(false);
const store = useSectionStore();

const isMenuOpen = ref(false);
const router = useRouter();
const selectedElement = ref({
  sectionId: null,
  type: null,
  elementId: null,
});
let dragging = ref(false);
let dragElement = ref(null);
let initialX = ref(0);
let initialY = ref(0);
let offsetX = ref(0);
let offsetY = ref(0);

let sectionIdCounter = 0;
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

const handleSectionClick = (sectionId) => {
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
        contents: `Button ${nextButtonId}`,
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
        css: "bg-slate-300 w-[200px] h-[100px] flex justify-center items-center",
      };

      sectionStore.addSectionWithButton(
        sectionId,
        sectionData
      );
      console.log("data:", section);
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
  buttonId
) => {
  // console.log("keo tha + event", event);
  const buttonElement = event.target;
  // console.log("buttonElement", buttonElement);
  const sectionElement =
    buttonElement.closest(".section");
  // console.log("sectionElement", sectionElement);
  const sectionRect =
    sectionElement.getBoundingClientRect();
  // console.log("sectionRect", sectionRect);
  const initialX = event.clientX;
  // console.log("initialX:", initialX);
  const initialY = event.clientY;
  // console.log("initialY:", initialY);
  const offsetX = buttonElement.offsetLeft;
  // console.log("offsetX:", offsetX);
  const offsetY = buttonElement.offsetTop;
  const onMouseMove = (moveEvent) => {
    // console.log("start drag");
    // console.log("Move Event:", moveEvent);
    const deltaX = moveEvent.clientX - initialX;
    const deltaY = moveEvent.clientY - initialY;
    let newLeft = offsetX + deltaX;
    let newTop = offsetY + deltaY;

    const buttonRect =
      buttonElement.getBoundingClientRect();
    // console.log("buttonRect:", buttonRect);
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

    const section = sectionStore.sections.find(
      (section) => section.id === sectionId
    );
    const button = section.buttons.find(
      (button) => button.id === buttonId
    );

    button.left = newLeft;
    button.top = newTop;
    console.log("update");
    console.log("New left:", newLeft);
    console.log("New top:", newTop);
    button.css = `absolute bg-blue-500 text-white rounded px-4 py-2 left-[${newLeft}px] top-[${newTop}px]`;
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

const handleDragStart = (
  event,
  sectionId,
  buttonId
) => {
  // console.log("keo tha + event", event);
  const buttonElement = event.target;
  // console.log("buttonElement", buttonElement);
  const sectionElement =
    buttonElement.closest(".section");
  // console.log("sectionElement", sectionElement);
  const sectionRect =
    sectionElement.getBoundingClientRect();
  // console.log("sectionRect", sectionRect);
  const initialX = event.clientX;
  // console.log("initialX:", initialX);
  const initialY = event.clientY;
  // console.log("initialY:", initialY);
  const offsetX = buttonElement.offsetLeft;
  // console.log("offsetX:", offsetX);
  const offsetY = buttonElement.offsetTop;
  const onMouseMove = (moveEvent) => {
    // console.log("start drag");
    // console.log("Move Event:", moveEvent);
    const deltaX = moveEvent.clientX - initialX;
    const deltaY = moveEvent.clientY - initialY;
    let newLeft = offsetX + deltaX;
    let newTop = offsetY + deltaY;
    const buttonRect =
      buttonElement.getBoundingClientRect();
    // console.log("buttonRect:", buttonRect);
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
