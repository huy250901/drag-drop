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
      const section = this.sections.find(
        (section) => section.id === sectionId
      );
      if (section) {
        section.buttons.push(buttonData);
      }
    },
    addParagraphToSection(
      sectionId,
      paragraphData
    ) {
      const section = this.sections.find(
        (section) => section.id === sectionId
      );
      if (section) {
        section.paragraphs.push(paragraphData);
      }
    },
    removeButtonFromSection(sectionId, buttonId) {
      const section = this.sections.find(
        (s) => s.id === sectionId
      );
      if (section) {
        section.buttons = section.buttons.filter(
          (button) => button.id !== buttonId
        );
      }
    },
    removeParagraphFromSection(
      sectionId,
      paragraphId
    ) {
      const section = this.sections.find(
        (s) => s.id === sectionId
      );
      if (section) {
        section.paragraphs =
          section.paragraphs.filter(
            (paragraph) =>
              paragraph.id !== paragraphId
          );
      }
    },
  },
});
