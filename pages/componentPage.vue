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
  </div>
</template>

<script setup>
import ChevDown from "../assets/icons/ic_chevdown.vue";
</script>

<style scoped></style>
