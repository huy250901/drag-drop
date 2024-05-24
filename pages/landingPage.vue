<template>
  <header
    class="header relative h-[300px] bg-gradient-to-br from-blue-400 to-blue-900"
    style="
      background-image: url('https://images.pexels.com/photos/213399/pexels-photo-213399.jpeg');
      background-size: cover;
      background-position: top;
    "
  >
    <div
      class="brand-box absolute top-10 left-10"
    >
      <span class="brand text-white text-lg"
        >Example Brand</span
      >
    </div>

    <div
      class="text-box absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
    >
      <h1 class="heading-primary mb-4">
        <span
          class="text-white block text-2xl font-normal tracking-wider mb-8"
          style="
            text-shadow: 2px 1px 0px
              rgba(0, 0, 0, 1);
          "
          >Heading Primary Main</span
        >
        <span
          class="text-white block text-xl font-semibold tracking-widest"
          style="
            text-shadow: 2px 1px 0px
              rgba(0, 0, 0, 1);
          "
          >The secondary heading</span
        >
      </h1>
      <a
        href="#"
        class="btn btn-white bg-blue-400 btn-animated inline-block uppercase text-center text-white py-2 px-4 rounded-full transition transform duration-200 ease-in-out hover:shadow-lg hover:translate-y-0.5 active:translate-y-0.5"
        >Discover our tours</a
      >
    </div>
  </header>
</template>
