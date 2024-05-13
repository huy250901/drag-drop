<template>
  <div>
    <header
      class="bg-slate-500 h-16 items-center flex content-center px-4"
    >
      <button
        @click="openMenu"
        class="px-4 bg-slate-200 p-2 rounded-md"
      >
        Menu
      </button>
    </header>

    <div
      :class="menuClasses"
      class="menuLeft fixed top-0 w-52 h-full bg-gray-400 p-4"
    >
      <IcClose
        @click="closeMenu"
        class="cursor-pointer absolute top-2 right-2"
      />
      <ul class="flex flex-col gap-4 pt-4">
        <li>
          <button
            class="button bg-white p-2 rounded-md w-full"
            @click="createSection"
            id="createSectionBtn"
          >
            Create Section
          </button>
        </li>
        <li v-if="showCreateButton">
          <button
            class="bg-white p-2 rounded-md w-full"
            @click="
              createButton(selectedSectionId)
            "
          >
            Create Button
          </button>
        </li>
      </ul>
    </div>
    <!-- <button
      @click="createSection"
      id="createSectionBtn"
    >
      Create Section
    </button> -->

    <div id="sectionContainer"></div>
    <div
      class="flex justify-center flex-col items-center"
      id="buttonContainer"
    ></div>
  </div>
</template>

<style>
.menuLeft {
  transition: 0.3s ease-in-out;
}
</style>

<script setup>
import { ref } from "vue";
import IcClose from "../components/ic_close.vue";
const isMenuOpen = ref(false);

let sectionIdCounter = 0;
const showCreateButton = ref(false);
const selectedSectionId = ref(null);

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

// const createButton = () => {
//   const buttonId = 2;
//   const buttonData = {
//     id: buttonId,
//     classes: [
//       "button",
//       "bg-red-300",
//       "w-[96px]",
//       "h-[30px]",
//     ],
//     contents: "Button",
//   };

//   const existingButtons =
//     JSON.parse(localStorage.getItem("buttons")) ||
//     [];
//   existingButtons.push(buttonData);
//   localStorage.setItem(
//     "buttons",
//     JSON.stringify(existingButtons)
//   );

//   const buttonElement =
//     document.createElement("button");
//   buttonElement.setAttribute("id", buttonId);
//   buttonData.classes.forEach((className) =>
//     buttonElement.classList.add(className)
//   );

//   buttonElement.appendChild(
//     document.createTextNode(buttonData.contents)
//   );

//   document
//     .getElementById("buttonContainer")
//     .appendChild(buttonElement);
// };

function createSection() {
  sectionIdCounter++;
  const sectionId = sectionIdCounter;
  const sectionData = {
    id: sectionId,
    classes: [
      "section",
      "w-[900px]",
      "h-[300px]",
      "bg-slate-200",
      "mb-4",
      "m-auto",
    ],
  };

  const existingSections =
    JSON.parse(
      localStorage.getItem("sections")
    ) || [];
  existingSections.push(sectionData);
  localStorage.setItem(
    "sections",
    JSON.stringify(existingSections)
  );

  const sectionElement =
    document.createElement("section");
  sectionElement.setAttribute("id", sectionId);
  sectionData.classes.forEach((className) =>
    sectionElement.classList.add(className)
  );

  // Thêm sự kiện click cho phần tử <section>
  sectionElement.addEventListener(
    "click",
    function () {
      // console.log(
      //   "Phần tử <section> đã được click"
      // );

      const sectionId = this.id;
      // console.log(
      //   "ID của phần tử <section> được click là: ",
      //   sectionId
      // );

      if (sectionId) {
        selectedSectionId.value = sectionId;
        showCreateButton.value = true;
        console.log(
          "showCreateButton",
          showCreateButton
        );
      }
    }
  );

  document
    .getElementById("sectionContainer")
    .appendChild(sectionElement);
}

function createButton(selectedSectionId) {
  const sectionElement = document.getElementById(
    selectedSectionId
  );
  if (sectionElement) {
    const buttonId =
      sectionElement.getAttribute("id");
    const buttonData = {
      id: buttonId,
      classes: [
        "button",
        "bg-red-300",
        "w-[96px]",
        "h-[30px]",
        "rounded-md",
      ],
      contents: "Button",
    };

    const existingButtons =
      JSON.parse(
        localStorage.getItem("buttons")
      ) || [];
    existingButtons.push(buttonData);
    localStorage.setItem(
      "buttons",
      JSON.stringify(existingButtons)
    );

    const buttonElement =
      document.createElement("button");
    buttonElement.setAttribute("id", buttonId);
    buttonData.classes.forEach((className) =>
      buttonElement.classList.add(className)
    );

    buttonElement.appendChild(
      document.createTextNode(buttonData.contents)
    );

    sectionElement.appendChild(buttonElement);
  } else {
    console.error(
      `Section with ID ${selectedSectionId} not found.`
    );
  }
}

document.addEventListener(
  "click",
  function (event) {
    const clickedElement = event.target;

    const isClickedInsideSection =
      clickedElement.closest("section");
    const isClickedInsideMenu =
      clickedElement.closest("button");

    if (
      !isClickedInsideSection &&
      !isClickedInsideMenu
    ) {
      showCreateButton.value = false;
    }
  }
);
</script>
