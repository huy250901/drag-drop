import { defineStore } from "pinia";

export const useSectionStore = defineStore({
  id: "section",
  state: () => ({
    sections: [],
  }),
  actions: {
    addSection(sectionData) {
      const sectionWithDefaults = {
        ...sectionData,
        type: "section",
        css: "relative bg-slate-500 rounded-md p-4 mb-4 w-2/3 m-auto h-[300px]",
        buttons: [],
        paragraphs: [],
        modules: [],
      };
      this.sections.push(sectionWithDefaults);
    },
    addSectionWithButton(sectionId, data) {
      const section = this.sections.find(
        (s) => s.id === sectionId
      );
      if (section) {
        const newSection = {
          type: "section",
          css: "bg-slate-300 w-[200px] h-[100px] flex justify-center items-center",
          buttons: [
            {
              id: 1,
              type: "button",
              contents: "Button in section",
              css: "bg-red-500 w-20 h-10 rounded",
            },
          ],
          ...data,
        };

        // Thêm dữ liệu vào mảng modules
        section.modules.push(newSection);

        // Thêm newSection vào mảng sections
        this.sections.push(newSection);
      }
    },

    addButtonToSection(
      sectionId,
      buttonData,
      newLeft
    ) {
      const section = this.sections.find(
        (section) => section.id === sectionId
      );
      if (section) {
        const buttonWithDefaults = {
          ...buttonData,
          css: `absolute left-${newLeft}px bg-blue-500 text-white rounded px-4 py-2`,
          type: "button",
        };
        section.buttons.push(buttonWithDefaults);
        console.log(
          "section.buttons after adding:",
          section.buttons
        );
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
        const paragraphWithDefaults = {
          ...paragraphData,
          css: "text-black",
          type: "paragraph",
        };
        section.paragraphs.push(
          paragraphWithDefaults
        );
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
