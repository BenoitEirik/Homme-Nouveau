<template>
<article>
  <header class="relative-position" v-ripple="{ color: 'secondary' }">
    <span class="q-px-md q-py-sm text-subtitle2">
      {{ data.title }}
    </span>
    <img :srcset="data.cover" class="fit" />
  </header>

  <section class="q-px-md q-pt-sm description">
    {{ data.description }}
  </section>

  <footer class="q-px-md q-pb-lg q-pt-sm row justify-between items-center">
    <img src="~assets/images/logo/small.png">
    <span class="col">{{ data.meta }}</span>
    <div>
      <q-btn outline rounded dense no-caps color="primary" v-for="tag in data.tags" :key="tag.label" :label="tag.label"
        class="q-py-xs q-px-sm q-mr-sm" />
    </div>
  </footer>
</article>
</template>

<script lang="ts">
import { Article } from 'src/assets/js/articles';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    data: {
      type: Object as () => Article,
      required: true
    }
  }
})
</script>

<style scoped lang="scss">
@import '../css/app.scss';

article {
  max-width: 100%;

  header {
    position: relative;
    height: 220px;
    overflow: hidden;

    span {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba($color: #000000, $alpha: 0.5);
      color: white;
      text-shadow: -1px 0 #B01329, 0 1px #B01329, 1px 0 #B01329, 0 -1px #B01329;
    }

    img {
      object-fit: cover;
    }
  }

  section {
    @include line-clamp(3);
    hyphens: auto;
  }

  footer {
    img {
      height: 20px;
    }

    span {
      color: #555555;
      @include line-clamp(1);
    }
  }
}
</style>
