import { defineStore } from "pinia";

export const useSectionStore = defineStore({
  id: "section",
  state: () => ({
    sections: [],
  }),
  actions: {
    addSection(sectionData) {
      this.sections.push(sectionData);
    },
    addButtonToSection(sectionId, buttonData) {
      const section = this.sections.find((section) => section.id === sectionId);
      if (section) {
        section.buttons.push(buttonData);
      }
    },
  },
});
