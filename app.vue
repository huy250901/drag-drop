<template>
  <div>
    <header class="bg-slate-500 h-16 items-center flex content-center px-4">
      <button @click="openMenu" class="px-4 bg-slate-200 p-2 rounded-md">
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
            @click="addSection"
            id="createSectionBtn"
          >
            Create Section
          </button>
        </li>
        <li v-if="showCreateButton">
          <button
            class="bg-white p-2 rounded-md w-full"
            @click="createButton(selectedSectionId)"
          >
            Create Button
          </button>
        </li>
      </ul>
    </div>
    <div
      v-for="section in sections"
      @click="handleSectionClick(section.id)"
      :key="section.id"
      class="section bg-slate-500 rounded-md p-4 mb-4 w-2/3 m-auto h-[300px]"
    >
      <div v-for="button in section.buttons" :key="button.id">
        <button class="bg-red-600 p-2 rounded-md w-24 h-10">
          {{ button.contents }}
        </button>
      </div>
    </div>
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
import IcClose from "./assets/icons/ic_close.vue";
import { useSectionStore } from "~/store/myStore";
const isMenuOpen = ref(false);

let sectionIdCounter = 0;
const showCreateButton = ref(false);
const selectedSectionId = ref(null);
const sectionStore = useSectionStore();

const sections = sectionStore.sections;

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

// function createSection() {
//   const sectionId = useSectionStore().sections.length + 1;

//   const sectionData = {
//     id: sectionId,
//     classes: [
//       "section",
//       "w-[900px]",
//       "h-[300px]",
//       "bg-slate-200",
//       "mb-4",
//       "m-auto",
//     ],
//   };

//   useSectionStore().addSection(sectionData);

//   const sectionElement = document.createElement("section");
//   sectionElement.setAttribute("id", sectionId);
//   sectionData.classes.forEach((className) =>
//     sectionElement.classList.add(className)
//   );

//   sectionElement.addEventListener("click", function () {
//     const sectionId = this.id;

//     if (sectionId) {
//       selectedSectionId.value = sectionId;
//       showCreateButton.value = true;
//       console.log("showCreateButton", showCreateButton);
//     }
//   });

//   document.getElementById("sectionContainer").appendChild(sectionElement);
// }

const addSection = () => {
  const sectionId = sectionStore.sections.length + 1;
  const sectionData = {
    id: sectionId,
    buttons: [],
  };
  sectionStore.addSection(sectionData);
};

const handleSectionClick = (sectionId) => {
  console.log("Clicked on Section", sectionId);
  showCreateButton.value = true;
  selectedSectionId.value = sectionId;
};

const createButton = () => {
  if (selectedSectionId.value !== null) {
    console.log("co ");
    const sectionId = selectedSectionId.value;
    const clickedSection = sectionStore.sections.find(
      (section) => section.id === sectionId
    );
    if (clickedSection) {
      console.log("tao button ");

      const buttonId = clickedSection.buttons.length + 1;
      const buttonData = {
        id: buttonId,
        contents: `Button ${buttonId}`,
      };
      sectionStore.addButtonToSection(sectionId, buttonData);
      console.log("buttonData", buttonData);
    }
  }
};

document.addEventListener("click", (event) => {
  const target = event.target;

  if (!target.closest(".menuLeft") && !target.closest(".section")) {
    showCreateButton.value = false;
  }
});
</script>
