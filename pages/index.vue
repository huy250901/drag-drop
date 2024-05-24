<template>
  <div class="h-lvh full-height">
    <header
      class="menu bg-slate-400 h-16 items-center flex sticky z-50 top-0 px-4 justify-between"
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
        @click="
          removeElement(
            selectedSectionId,
            selectedElement
          )
        "
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
        <div v-if="selectedElement">
          <h3>
            Type: {{ selectedElement.type }}
          </h3>
          <h3>ID: {{ selectedElement.id }}</h3>
          <div>
            <label>Width: </label>
            <input
              type="number"
              v-model="selectedElement.width"
              @input="
                updateElementContent(
                  selectedElement
                )
              "
            />
            px
          </div>

          <div>
            <label>Height: </label>
            <input
              type="number"
              v-model="selectedElement.height"
              @input="
                updateElementContent(
                  selectedElement
                )
              "
            />
            px
          </div>
          <div>
            <label>Top: </label>
            <input
              type="number"
              v-model="selectedElement.top"
              @input="
                updateElementContent(
                  selectedElement
                )
              "
            />
            px
          </div>
          <div>
            <label>Left: </label>
            <input
              type="number"
              v-model="selectedElement.left"
              @input="
                updateElementContent(
                  selectedElement
                )
              "
            />
            px
          </div>
          <div>
            <label>Text: </label>
            <input
              type="text"
              v-model="selectedElement.text"
              @input="
                updateElementContent(
                  selectedElement
                )
              "
            />
          </div>

          <!-- <TinyMce
            updateElementContent(
                  selectedElement
                )
            v-model="selectedElement.text"
          /> -->
        </div>
      </div>
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
            class="button bg-white p-2 rounded-md w-full"
            @click="createHeader"
          >
            Add Header
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
            Add section button
          </button>
        </li>
        <li>
          <button
            class="bg-white p-2 rounded-md w-full"
            @click="addImage"
          >
            Add image
          </button>
        </li>
        <li>
          <button
            class="bg-white p-2 rounded-md w-full"
            @click="createHeaderContent"
          >
            Add Header Content
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
      :data-type="section.type"
      :data-id="section.id"
      :class="[
        `${section.css} h-[500px]
        border-2 border- bg-slate-500 border-transparent`,
        {
          selected:
            selectedSectionId === section.id,
        },
      ]"
    >
      <vue-draggable-resizable
        v-for="headerContent in section.headerContent"
        :key="headerContent.id"
        h="300"
        :parent="true"
        :x="headerContent.left"
        :y="headerContent.top"
      >
        <header
          :id="headerContent.id"
          :class="headerContent.css"
          :style="headerContent.style"
        >
          <div
            v-for="divOne in headerContent.divOne"
            :key="divOne.id"
            :class="divOne.css"
          >
            <span
              v-for="span in divOne.childs"
              :class="span.css"
              :key="span.id"
              >{{ span.content }}</span
            >
          </div>
          <div
            v-for="divSecond in headerContent.divSecond"
            :key="divSecond.id"
            :class="divSecond.css"
          >
            <div
              v-for="child in divSecond.childs"
              :key="child.id"
            >
              <h1
                v-for="span in child.childH1"
                :key="span.id"
              >
                <span
                  :class="span.css"
                  :style="span.style"
                >
                  {{ span.content }}
                </span>
              </h1>
              <a
                :href="child.href"
                :class="child.cssA"
              >
                {{ child.contentA }}
              </a>
            </div>
          </div>
        </header>
      </vue-draggable-resizable>

      <vue-draggable-resizable
        v-for="image in section.images"
        :parent="true"
        :min-width="80"
        :min-height="30"
        :max-width="300"
        :max-height="300"
        :key="image.id"
        class="absolute"
        :w="image.width"
        :h="image.height"
        :x="image.left"
        :y="image.top"
        @resizing="onResize"
        @resize-stop="
          (x, y, w, h) =>
            onResizeStop(
              x,
              y,
              w,
              h,
              'img',
              section.id,
              image.id
            )
        "
        @dragging="onDrag('img', $event)"
        @drag-stop="
          (x, y) =>
            onDragStop(
              x,
              y,
              'img',
              section.id,
              image.id
            )
        "
      >
        <img
          :data-id="image.id"
          :data-type="image.type"
          :class="image.css"
          :src="image.src"
        />
      </vue-draggable-resizable>
      <vue-draggable-resizable
        v-for="header in section.headers"
        :min-height="40"
        :key="header.id"
        :parent="true"
        class="absolute"
        :style="`width: ${header.width}`"
        :handles="['bm', 'tm']"
        :axis="'y'"
        :h="`${header.height}`"
        :y="`${header.top}`"
        @resizing="onResize"
        @resize-stop="
          (x, y, w, h) =>
            onResizeStop(
              x,
              y,
              w,
              h,
              'header',
              section.id,
              header.id
            )
        "
        @dragging="onDrag('header', $event)"
        @drag-stop="
          (x, y) =>
            onDragStop(
              x,
              y,
              'header',
              section.id,
              header.id
            )
        "
      >
        <header
          :data-type="header.type"
          :data-id="header.id"
          :class="`${header.css} ${header.backgroundColor}`"
          :style="`width: ${header.width}`"
        >
          <div
            :data-type="div.type"
            class="flex-1"
            v-for="div in header.divOne"
            :css="div.css"
            :key="div.id"
          >
            <img
              data-type="img-header"
              alt="logo"
              :class="`${div.cssImg} h-8`"
              src="../assets/img/instgram.webp"
            />
          </div>
          <div
            :data-type="div.type"
            class="flex-1"
            v-for="div in header.divSecond"
            :key="div.id"
            :class="div.css"
          >
            <ul
              :data-type="div.type"
              :class="div.cssUl"
            >
              <li
                :data-id="link.id"
                :data-type="link.type"
                v-for="link in div.links"
                :key="link.id"
              >
                <a
                  data-type="a-header"
                  :href="link.href"
                  :class="link.cssA"
                  >{{ link.name }}</a
                >
              </li>
            </ul>
          </div>
        </header>
      </vue-draggable-resizable>
      <vue-draggable-resizable
        v-for="button in section.buttons"
        :parent="true"
        :min-width="80"
        :min-height="30"
        :max-width="300"
        :max-height="300"
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
      >
        <button
          :id="button.id"
          :data-type="button.type"
          :data-id="button.id"
          :class="`${button.css} `"
        >
          {{ `${button.contents}` }}
        </button>
      </vue-draggable-resizable>
      <vue-draggable-resizable
        :min-width="140"
        :min-height="70"
        :max-width="500"
        :max-height="500"
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
          :data-type="moduleBtn.type"
          :data-id="moduleBtn.id"
          :class="`w-full h-full ${moduleBtn.css}`"
          :w="moduleBtn.width"
          :h="moduleBtn.height"
          :x="moduleBtn.top"
          :y="moduleBtn.left"
        >
          <button
            v-for="btn in moduleBtn.buttons"
            :key="btn.id"
            :id="btn.id"
            :class="`${btn.css} `"
            :style="`width: ${btn.width}px; height: ${btn.height}px`"
            :data-type="btn.type"
            :data-id="btn.id"
          >
            {{ btn.contents }}
          </button>
        </div>
      </vue-draggable-resizable>

      <vue-draggable-resizable
        :min-width="80"
        :min-height="20"
        v-for="paragraph in section.paragraphs"
        :max-width="300"
        :max-height="300"
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
          :id="paragraph.id"
          :class="`w-full h-full overflow-hidden leading-none break-words ${paragraph.css}`"
          :data-type="paragraph.type"
          :data-id="paragraph.id"
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
  border-color: white;
}
</style>

<script setup>
import { ref, watch } from "vue";
import IcClose from "./assets/icons/ic_close.vue";
import { useSectionStore } from "~/store/myStore";
import { storeToRefs } from "pinia";

import { useRouter } from "vue-router";
import VueDraggableResizable from "vue-draggable-resizable";
import TinyMce from "./TinyMce.vue";
const store = useSectionStore();
const isMenuOpen = ref(false);
const isElementProperty = ref(false);
const router = useRouter();
const selectedElement = ref(null);
const showMenuElement = ref(false);
const selectedSectionId = ref(null);
const sections = ref(store.sections);

watch(
  () => store.sections,
  (newSections, oldSections) => {
    console.log(
      "Dữ liệu sections đã thay đổi",
      newSections
    );
    sections.value = newSections;
  }
);
const dragging = ref(false);
const x = ref(0);
const y = ref(0);

const sectionStore = useSectionStore();
const storeSections = ref(sectionStore.sections);

const dataProperty = ref({
  type: selectedElement.type,
  id: selectedElement.id,
  text: selectedElement.text,
});

let updateCount = 0;

const updateElementContent = (element) => {
  if (element) {
    const { id, type, width, height, top, left } =
      element;
    const newContent = element.text;
    const newWidth = element.width;
    const newHeight = element.height;
    const newTop = element.top;
    const newLeft = element.left;
    if (
      newContent !== undefined &&
      newContent !== null
    ) {
      switch (type) {
        case "button":
          sectionStore.updateButtonProperty(
            id,
            newContent,
            newWidth,
            newHeight,
            newTop,
            newLeft
          );
          break;
        case "paragraph":
          sectionStore.updateParagraphProperty(
            id,
            newContent,
            newWidth,
            newHeight,
            newTop,
            newLeft
          );
          break;
        case "template":
          sectionStore.updateTemplateProperty(
            id,
            newContent,
            newWidth,
            newHeight,
            newTop,
            newLeft
          );
          break;
        case "header":
          sectionStore.updateHeaderProperty(
            id,
            newHeight,
            newTop
          );
          break;
      }
    }
  }
};

const preview = () => {
  const sectionsData = store.sections;

  localStorage.setItem(
    "previewSections",
    JSON.stringify(sectionsData)
  );

  router.push("/previewPage");
};

const onResize = (...$event) => {
  const { x, y, width, height } = $event;
  // console.log("resize element");

  // console.log(
  //   "EVENT X: ",
  //   $event[0],
  //   "EVENT Y: ",
  //   $event[1],
  //   "EVENT Width: ",
  //   $event[2],
  //   "EVENT Height: ",
  //   $event[3]
  // );
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
  // console.log(
  //   `resize stop: X: ${x}, Y: ${y}, W: ${w}, H: ${h}, elementType: ${elementType}, sectionId: ${sectionId}, elementId: ${elementId}`
  // );
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
        button.top = y;
        button.left = x;
        // console.log(
        //   "gan thanh cong width height resize ",
        //   button.width,
        //   button.height
        // );
      }
    }
    if (elementType === "module") {
      const moduleElement = section.modules.find(
        (template) => template.id === elementId
      );
      if (moduleElement) {
        moduleElement.width = w;
        moduleElement.height = h;
        moduleElement.top = y;
        moduleElement.left = x;
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
        paragraph.top = y;
        paragraph.left = x;
      }
    }

    if (elementType === "header") {
      // console.log("day la header resize");
      const header = section.headers.find(
        (header) => header.id === elementId
      );
      if (header) {
        header.height = h;
      }
    }
    if (elementType === "img") {
      // console.log("image resize check");
      // console.log("elementId Image :", elementId);
      const img = section.images.find(
        (image) => image.id === elementId
      );
      if (img) {
        img.width = w;
        img.height = h;
        img.top = y;
        img.left = x;
      }
    }
  }
};

const onDrag = (elementType, ...$event) => {
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
  // console.log(
  //   `dang keo ${elementType}`,
  //   "X:",
  //   x,
  //   "Y:",
  //   y
  // );
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
        paragraph.left = x;
        paragraph.top = y;
      } else {
      }
    }
    if (elementType === "template") {
      const moduleElement = section.modules.find(
        (template) => template.id === elementId
      );
      if (moduleElement) {
        moduleElement.left = x;
        moduleElement.top = y;
      } else {
        console.log(
          "Không tìm thấy module với ID:",
          elementId
        );
      }
    }
    if (elementType === "img") {
      const imgElement = section.images.find(
        (image) => image.id === elementId
      );

      if (imgElement) {
        imgElement.top = y;
        imgElement.left = x;
      }
    }
  } else {
    console.log("Không tìm thấy phần");
  }
  if (elementType === "header") {
    const headerElement = section.headers.find(
      (header) => header.id === elementId
    );

    if (headerElement) {
      headerElement.top = y;
    }
  }

  dragging.value = false;
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
  const clickedElement = event.target;
  const element = event.currentTarget;
  console.log("event target", element);
  openElementProperty();
  showMenuElement.value = true;
  selectedSectionId.value = sectionId;

  const targetElementClick =
    clickedElement.dataset.type;
  console.log(
    "CLICKED ELEMENT DATA TYPE: ",
    targetElementClick
  );
  // console.log(
  //   "CLICKED ELEMENT ID: ",
  //   clickedElement.dataset.id
  // );

  if (targetElementClick === "section") {
    selectedElement.value = {
      type: "section",
      id: sectionId,
      width: element.clientWidth,
      height: element.clientHeight,
      text: "",
    };
    // console.log(
    //   "data set Property Section:",
    //   selectedElement.value
    // );
  }

  let idHeader = null;
  let parentElement = clickedElement;
  let headerElementType = null;

  if (
    [
      "img-header",
      "li-header",
      "div-header",
      "a-header",
      "header",
    ].includes(targetElementClick)
  ) {
    // Kiểm tra nếu clickedElement là header trước
    if (targetElementClick === "header") {
      idHeader = clickedElement.dataset.id;
      headerElementType =
        clickedElement.dataset.type;
    } else {
      parentElement =
        clickedElement.parentElement;
      while (parentElement) {
        const parentElementType =
          parentElement?.dataset.type;
        if (parentElementType === "header") {
          idHeader = parentElement?.dataset.id;
          headerElementType = parentElementType;
          break;
        }
        parentElement =
          parentElement?.parentElement;
      }
    }
  }

  const section = sectionStore.sections.find(
    (s) => s.id === sectionId
  );
  const headerElement = idHeader
    ? headerElementType
    : null;
  // console.log("headerElement: ", headerElement);
  // console.log("idHeaderElement: ", idHeader);

  let selected = null;
  if (headerElement === "header" && idHeader) {
    // console.log("lay property header:", idHeader);
    const idHeaderNumber = Number(idHeader); // Chuyển đổi idHeader thành kiểu số

    // console.log("section:", section.headers);
    selected = section.headers.find((h) => {
      return h.id === idHeaderNumber; // Cần trả về kết quả của hàm find
    });

    if (selected) {
      selectedElement.value = {
        type: selected.type,
        id: selected.id,
        width: selected.width,
        height: selected.height,
        text: selected.contents || "",
        top: selected.top || "",
        left: selected.left || "",
        moduleId: selected.moduleId,
      };
      return;
    } else {
      console.log("Header không tìm thấy.");
    }
  }

  if (targetElementClick) {
    const elementType = targetElementClick;
    const elementId = parseInt(
      clickedElement.dataset.id,
      10
    );

    if (section) {
      switch (elementType) {
        case "button":
          selected =
            section.buttons.find(
              (b) => b.id === elementId
            ) ||
            section.modules
              .flatMap((module) => module.buttons)
              .find((b) => b.id === elementId);
          break;
        case "img":
          selected = section.images.find(
            (img) => img.id === elementId
          );
          console.log(selected, "selected img");
          break;
        case "paragraph":
          selected = section.paragraphs.find(
            (p) => p.id === elementId
          );
          break;
        case "template":
          selected = section.modules.find(
            (m) => m.id === elementId
          );
          break;
        case "module-button":
          for (const module of section.modules) {
            selected = module.buttons.find(
              (b) => b.id === elementId
            );
            if (selected) {
              selected.sectionId = sectionId;
              selected.moduleId = module.id;

              break;
            }
          }
          break;
        case "header":
          // console.log("xoa header");
          break;
        default:
          console.log(
            "element type:",
            elementType
          );
      }

      if (selected) {
        selectedElement.value = {
          type: selected.type,
          id: selected.id,
          width: selected.width,
          height: selected.height,
          text: selected.contents || "",
          top: selected.top || "",
          left: selected.left || "",
          moduleId: selected.moduleId,
        };
      }
    }
  }
  // else if (
  //   clickedElement.classList.contains("section")
  // ) {
  //   selectedElement.value = {
  //     type: "section",
  //     id: sectionId,
  //     width: element.clientWidth,
  //     height: element.clientHeight,
  //     text: "",
  //   };
  //   console.log(
  //     "SELECT ELEMENT VALUE:",
  //     selectedElement.value
  //   );
  // }
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
        // contents: `Add a paragraph text here.${paragraphId}`,
      };

      sectionStore.addParagraphToSection(
        sectionId,
        paragraphData
      );
      console.log("paragraph:", section);
      console.log("store:", store.sections);
    }
  }
};

const createHeader = () => {
  if (selectedSectionId.value !== null) {
    const sectionId = selectedSectionId.value;
    const section = sectionStore.sections.find(
      (section) => section.id === sectionId
    );

    if (section) {
      let nextHeaderId = 1;
      if (section.headers.length > 0) {
        const maxHeaderId = Math.max(
          ...section.headers.map(
            (header) => header.id
          )
        );
        nextHeaderId = maxHeaderId + 1;
      }
      const headerData = {
        id: nextHeaderId,
      };

      sectionStore.addHeader(
        sectionId,
        headerData
      );
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
      };
      sectionStore.addButtonToSection(
        sectionId,
        buttonData
      );
    }
  }
};

const createHeaderContent = () => {
  if (selectedSectionId.value !== null) {
    const sectionId = selectedSectionId.value;
    const section = sectionStore.sections.find(
      (section) => section.id === sectionId
    );

    if (section) {
      let nextHeaderId = 1;
      if (section.headerContent.length > 0) {
        const maxHeaderId = Math.max(
          ...section.headerContent.map(
            (header) => header.id
          )
        );
        nextHeaderId = maxHeaderId + 1;
      }

      const headerContentData = {
        id: nextHeaderId,
      };

      sectionStore.addHeaderContent(
        sectionId,
        headerContentData
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
      // console.log("MODULE", section);
    }
  }
};

const addImage = () => {
  if (!selectedSectionId.value) {
    alert("Please select a section first!");
    return;
  }

  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/jpeg, image/png";
  input.onchange = (e) => {
    const file = e.target.files[0];
    const fileExtension = file.name
      .split(".")
      .pop()
      .toLowerCase();
    if (
      file &&
      (fileExtension === "jpg" ||
        fileExtension === "jpeg" ||
        fileExtension === "png")
    ) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = {
          src: event.target.result,
        };
        sectionStore.addImageToSection(
          selectedSectionId.value,
          image
        );
      };
      reader.readAsDataURL(file);
    } else {
      alert(
        "Please select a valid JPEG or PNG image."
      );
    }
  };
  input.click();
};

const removeElement = (sectionId, element) => {
  // const store = useSectionStore();
  console.log("element chuan bi xoa: ", element);
  if (element.type === "button") {
    store.removeButtonFromSection(
      sectionId,
      element.id
    );
  } else if (element.type === "section") {
    console.log("sectionId", sectionId);
    const section = store.sections.find(
      (section) => section.id === element.id
    );
    if (section) {
      // section.removeSection
      console.log(
        "xoa section id: " + section.id
      );
      store.removeSection(element.id);
    }
  } else if (element.type === "paragraph") {
    store.removeParagraphFromSection(
      sectionId,
      element.id
    );
  } else if (element.type === "img") {
    store.removeImageFromSection(
      sectionId,
      element.id
    );
  } else if (element.type === "template") {
    store.removeSectionWithButton(
      sectionId,
      element.id
    );
  } else if (element.type === "module-button") {
    const section = store.sections.find(
      (s) => s.id === sectionId
    );
    if (section) {
      const module = section.modules.find((m) =>
        m.buttons.some((b) => b.id === element.id)
      );
      if (module) {
        store.removeSectionWithButton(
          sectionId,
          module.id
        );
      }
    }
  } else if (element.type === "header") {
    store.removeHeaderFromSection(
      sectionId,
      element.id
    );
  }
  // console.log(store, "sau khi xoa");
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

  // if (
  //   (target.closest(".menu") ||
  //     target.closest(".menuLeft") ||
  //     target.closest(".menuRight") ||
  //     target.closest(".full-height")) &&
  //   !target.closest(".section")
  // ) {
  //   selectedElement.value = false;
  // }

  if (
    target.closest(".menu") ||
    target.closest(".menuLeft")
  ) {
    selectedElement.value = false;
    console.log("set");
  }
});
</script>
