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
        :min-width="80"
        :min-height="30"
        :max-width="300"
        :max-height="300"
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
          :id="button.id"
          :data-type="button.type"
          :data-id="button.id"
          :class="`${button.css} bg-emerald-500`"
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
              moduleBtn.icssd
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
        >
          <button
            v-for="btn in moduleBtn.buttons"
            :key="btn.id"
            :id="btn.id"
            :class="`${btn.css} bg-emerald-500`"
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

const sectionStore = useSectionStore();

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
    console.log("new ID: " + id);
    console.log("TYPE ELEMENT: " + type);
    console.log("new CONTENT: " + newContent);
    console.log("new WIDTH: " + newWidth);
    console.log("new HEIGHT: " + newHeight);
    console.log("new TOP: " + top);
    console.log("new LEFT: " + left);

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
          console.log("truyen");
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
          console.log("truyen");
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
          console.log("truyen");
          sectionStore.updateHeaderProperty(
            id,
            newContent,
            newWidth,
            newHeight
          );
          break;
      }
    }
  }
};

// const updateElementContent = (element) => {
//   if (element) {
//     const { id, type, width, height } = element;
//     const newContent = element.text;
//     const newId = element.id;
//     const newWidth = element.width;
//     const newHeight = element.height;
//     console.log("ID: " + newContent);
//     console.log("new content: " + newId);
//     console.log("new WIDTH: " + newWidth);
//     console.log("new HEIGHT: " + newHeight);

//     if (
//       newContent !== undefined &&
//       newContent !== null
//     ) {
//       switch (type) {
//         case "button":
//           sectionStore.updateButtonContent(
//             id,
//             newContent
//           );
//           break;
//         case "paragraph":
//           console.log(
//             `update paragraph content:${updateCount++} ` +
//               newContent,
//             newId,
//             newWidth,
//             newHeight
//           );
//           sectionStore.updateParagraphContent(
//             id,
//             newContent
//           );
//           break;
//       }
//     }
//   }
// };

const preview = () => {
  const sectionsData = store.sections;

  localStorage.setItem(
    "previewSections",
    JSON.stringify(sectionsData)
  );

  router.push("/previewPage");
};

const sections = ref(sectionStore.sections);
const paragraphArray = ref([]);
const previewSections = ref([]);
const storeSections = ref(sectionStore.sections);
const dragging = ref(false);
const x = ref(0);
const y = ref(0);

const onResize = (...$event) => {
  const { x, y, width, height } = $event;
  console.log("X: " + x);
  console.log("EVENT: " + $event);

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

    if (elementType === "header") {
      console.log("day la header resize");
      const header = section.headers.find(
        (header) => header.id === elementId
      );
      if (header) {
        header.height = h;
        console.log(
          "gan thanh cong width height resize ",
          header.width
        );
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
  console.log("dang keo ", "X:", x, "Y:", y);
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
        console.log("set successfully");
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
        console.log("set successfully");
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
  if (elementType === "header") {
    console.log("DANG KEO HEADER");
    const headerElement = section.headers.find(
      (header) => header.id === elementId
    );

    if (headerElement) {
      headerElement.top = y;
      console.log("set successfully");
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

  openElementProperty();
  showMenuElement.value = true;
  selectedSectionId.value = sectionId;

  console.log("EVENT:", event.target);

  const targetElementClick =
    clickedElement.dataset.type;
  // console.log(
  //   "CLICKED ELEMENT DATA TYPE: ",
  //   targetElementClick
  // );
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
    console.log(
      "data set Property Section:",
      selectedElement.value
    );
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
      console.log("click vao header k while");
      idHeader = clickedElement.dataset.id;
      console.log(
        "clickedElement.dataset.type",
        clickedElement.dataset.type
      );
      headerElementType =
        clickedElement.dataset.type;
    } else {
      parentElement =
        clickedElement.parentElement;
      while (parentElement) {
        console.log("vong lap while");
        const parentElementType =
          parentElement?.dataset.type;
        if (parentElementType === "header") {
          idHeader = parentElement?.dataset.id;
          headerElementType = parentElementType;
          console.log(
            "Element cha có data-type là header:",
            parentElement
          );
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
  console.log("headerElement: ", headerElement);
  console.log("idHeaderElement: ", idHeader);

  let selected = null;
  if (headerElement === "header" && idHeader) {
    console.log("lay property header:", idHeader);
    const idHeaderNumber = Number(idHeader); // Chuyển đổi idHeader thành kiểu số

    console.log("section:", section.headers);
    selected = section.headers.find((h) => {
      console.log(
        "h",
        typeof h.id,
        typeof idHeaderNumber
      );
      return h.id === idHeaderNumber; // Cần trả về kết quả của hàm find
    });
    console.log("selected:", selected);

    if (selected) {
      console.log("gan du lieu header");
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
      console.log(
        "Selected header element:",
        selectedElement.value
      );
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
              console.log(
                "module ID: ",
                selected.moduleId,
                module.id
              );
              break;
            }
          }
          break;
        case "header":
          console.log("day la header");
          break;
        default:
          console.log(
            "Unknown element type:",
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
        console.log(
          "SELEECT ELEMENT DATA SET:",
          selectedElement.value
        );
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

// const handleSectionClick = (sectionId, event) => {
//   const clickedElement = event.target;
//   const element = event.currentTarget;

//   openElementProperty();
//   showMenuElement.value = true;
//   selectedSectionId.value = sectionId;

//   console.log("EVENT:", event.target);

//   const targetElementClick =
//     clickedElement.dataset.type;
//   // console.log(
//   //   "CLICKED ELEMENT DATA TYPE: ",
//   //   targetElementClick
//   // );
//   // console.log(
//   //   "CLICKED ELEMENT ID: ",
//   //   clickedElement.dataset.id
//   // );

//   if (targetElementClick === "section") {
//     selectedElement.value = {
//       type: "section",
//       id: sectionId,
//       width: element.clientWidth,
//       height: element.clientHeight,
//       text: "",
//     };
//     console.log(
//       "data Property:",
//       selectedElement.value
//     );
//   }

//   let idHeader = null;
//   let parentElement = null;
//   if (
//     [
//       "img-header",
//       "li-header",
//       "div-header",
//       "a-header",
//       "header",
//     ].includes(targetElementClick)
//   ) {
//     // Kiểm tra nếu clickedElement là header trước
//     if (targetElementClick === "header") {
//       console.log("click vao header k while");
//       idHeader = clickedElement.dataset.id;
//       console.log(
//         "clickedElement.dataset.type",
//         clickedElement.dataset.type
//       );
//       parentElement = clickedElement.dataset.type;
//     } else {
//       parentElement =
//         clickedElement.parentElement;
//       while (parentElement) {
//         console.log("vong lap while");
//         const parentElementType =
//           parentElement?.dataset.type;
//         if (parentElementType === "header") {
//           idHeader = parentElement?.dataset.id;
//           console.log(
//             "Element cha có data-type là header:",
//             parentElement
//           );
//           break;
//         }
//         parentElement =
//           parentElement?.parentElement;
//       }
//     }
//   }

//   const section = sectionStore.sections.find(
//     (s) => s.id === sectionId
//   );
//   const headerElement = idHeader
//     ? parentElement?.dataset.type
//     : null;
//   console.log("headerElement: ", headerElement);
//   console.log("idHeaderElement: ", idHeader);

//   let selected = null;
//   if (headerElement === "header" && idHeader) {
//     console.log("lay property header:", idHeader);
//     selected = section.headers.find(
//       (h) => h.id === idHeader
//     );
//     console.log("selected:", selected);
//     if (selected) {
//       console.log("gan du lieu header");
//       selectedElement.value = {
//         type: selected.type,
//         id: selected.id,
//         width: selected.width,
//         height: selected.height,
//         text: selected.contents || "",
//         top: selected.top || "",
//         left: selected.left || "",
//         moduleId: selected.moduleId,
//       };
//       console.log(
//         "Selected header element:",
//         selectedElement.value
//       );
//       return;
//     }
//   }

//   if (targetElementClick) {
//     const elementType = targetElementClick;
//     const elementId = parseInt(
//       clickedElement.dataset.id,
//       10
//     );

//     if (section) {
//       switch (elementType) {
//         case "button":
//           selected =
//             section.buttons.find(
//               (b) => b.id === elementId
//             ) ||
//             section.modules
//               .flatMap((module) => module.buttons)
//               .find((b) => b.id === elementId);
//           console.log("selected:", selected);
//           break;
//         case "paragraph":
//           selected = section.paragraphs.find(
//             (p) => p.id === elementId
//           );
//           break;
//         case "template":
//           selected = section.modules.find(
//             (m) => m.id === elementId
//           );
//           break;
//         case "module-button":
//           for (const module of section.modules) {
//             selected = module.buttons.find(
//               (b) => b.id === elementId
//             );
//             if (selected) {
//               selected.sectionId = sectionId;
//               selected.moduleId = module.id;
//               console.log(
//                 "module ID: ",
//                 selected.moduleId,
//                 module.id
//               );
//               break;
//             }
//           }
//           break;
//         case "header":
//           console.log("day la header");
//           break;
//         default:
//           console.log(
//             "Unknown element type:",
//             elementType
//           );
//       }

//       if (selected) {
//         selectedElement.value = {
//           type: selected.type,
//           id: selected.id,
//           width: selected.width,
//           height: selected.height,
//           text: selected.contents || "",
//           top: selected.top || "",
//           left: selected.left || "",
//           moduleId: selected.moduleId,
//         };
//         console.log(
//           "DATA SET:",
//           selectedElement.value
//         );
//       }
//     }
//   } else if (
//     clickedElement.classList.contains("section")
//   ) {
//     selectedElement.value = {
//       type: "section",
//       id: sectionId,
//       width: element.clientWidth,
//       height: element.clientHeight,
//       text: "",
//     };
//     console.log(
//       "SELECT ELEMENT VALUE:",
//       selectedElement.value
//     );
//   }
// };

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

const removeElement = (sectionId, element) => {
  const store = useSectionStore();
  console.log("element chuan bi xoa: ", element);
  if (element.type === "button") {
    console.log("xoa element button");
    store.removeButtonFromSection(
      sectionId,
      element.id
    );
  } else if (element.type === "paragraph") {
    console.log(
      "xoa paragraph",
      sectionId,
      element.id
    );
    store.removeParagraphFromSection(
      sectionId,
      element.id
    );
  } else if (element.type === "template") {
    console.log("xoa section with button");
    store.removeSectionWithButton(
      sectionId,
      element.id
    );
  } else if (element.type === "module-button") {
    console.log(
      "xoa module-button va cha template cua no"
    );
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
  }
  console.log(store, "sau khi xoa");
};

// const removeElement = (sectionId, element) => {
//   const store = useSectionStore();
//   console.log("element: ", element);
//   if (element.type === "button") {
//     console.log("xoa element button");
//     store.removeButtonFromSection(
//       sectionId,
//       element.id
//     );
//   } else if (element.type === "paragraph") {
//     console.log(
//       "xoa paragraph",
//       sectionId,
//       element.id
//     );
//     store.removeParagraphFromSection(
//       sectionId,
//       element.id
//     );
//   } else if (element.type === "template") {
//     console.log("xoa section with button");
//     store.removeSectionWithButton(
//       sectionId,
//       element.id
//     );
//   }
//   console.log(store, "sau khi xoa");
// };

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
</script>
