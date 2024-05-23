<template>
  <div>
    <header
      class="w-full flex h-[60px] bg-gray-700 justify-between px-6 items-center"
    >
      <div class="flex-1">
        <ul>
          <li
            class="text-white h-full flex items-center"
          >
            <h2 class="text-4xl cursor-pointer">
              Logo
            </h2>
          </li>
        </ul>
      </div>
      <div class="h-full flex-1">
        <ul
          class="flex w-full h-full items-center justify-around"
        >
          <li class="h-full">
            <a
              href="#"
              class="text-gray-100 h-full flex items-center justify-center transition duration-300 hover:text-yellow-300"
            >
              Home
            </a>
          </li>
          <li class="h-full">
            <a
              href="#"
              class="text-white h-full flex items-center justify-center transition duration-300 hover:text-yellow-300"
            >
              About us
            </a>
          </li>
          <li class="h-full">
            <a
              href="#"
              class="text-white h-full flex items-center justify-center transition duration-300 hover:text-yellow-300"
            >
              Blog
            </a>
          </li>
          <li class="h-full">
            <a
              href="#"
              class="text-white h-full flex items-center justify-center transition duration-300 hover:text-yellow-300"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </header>
    <button
      class="bg-white p-2 rounded-md w-full"
      @click="addImage"
    >
      Add image
    </button>

    <div id="image-container"></div>
  </div>
</template>

<script setup>
import ChevDown from "../assets/icons/ic_chevdown.vue";
const addImage = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*"; // Chỉ chấp nhận các tệp hình ảnh
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = document.createElement("img");
        img.src = event.target.result;
        img.classList.add("added-image"); // Thêm một lớp CSS cho hình ảnh
        // Chèn hình ảnh vào DOM
        document
          .getElementById("image-container")
          .appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  };
  // Kích hoạt sự kiện click trên input để mở hộp thoại chọn tệp
  input.click();
};
</script>

<style scoped></style>
