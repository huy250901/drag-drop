import { defineStore } from "pinia";
export const useSectionStore = defineStore({
  id: "section",
  state: () => ({
    sections: [],
  }),
  actions: {
    initializeNextId(section, type) {
      if (!section.nextIds) {
        section.nextIds = {
          button: 1,
          paragraph: 1,
          module: 1,
        };
      }
      if (isNaN(section.nextIds[type])) {
        section.nextIds[type] = 1;
      }
    },
    addSection(sectionData) {
      const sectionWithDefaults = {
        ...sectionData,
        type: "section",
        css: "section relative w-full border-transparent border-2 h-[500px] bg-slate-500",
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
        this.initializeNextId(section, "button");
        const newSection = {
          type: "section",
          id: section.nextIds.module++,
          css: "bg-blue-500 flex justify-center rounded-md items-center",
          width: "200",
          height: "100",
          left: "",
          top: "",
          buttons: [
            {
              id: section.nextIds.button++,
              type: "button",
              width: "100",
              height: "50",
              contents: "Button in section",
              css: "bg-blue-500 items-center flex text-white rounded px-4 py-2",
            },
          ],
          ...data,
        };

        section.modules.push(newSection);
      }
    },
    addButtonToSection(sectionId, buttonData) {
      const section = this.sections.find(
        (section) => section.id === sectionId
      );
      if (section) {
        this.initializeNextId(section, "button");
        const buttonId = section.nextIds.button++;
        const buttonWithDefaults = {
          ...buttonData,
          id: buttonId,
          css: `h-full w-full bg-blue-500 text-white rounded`,
          type: "button",
          width: "128",
          height: "44",
          left: "",
          top: "",
          contents: `Button ${buttonId}`,
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
        this.initializeNextId(
          section,
          "paragraph"
        );
        const paragraphWithDefaults = {
          ...paragraphData,
          id: section.nextIds.paragraph++,
          css: "text-black",
          type: "paragraph",
          width: "200",
          height: "24",
          left: "",
          top: "",
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
