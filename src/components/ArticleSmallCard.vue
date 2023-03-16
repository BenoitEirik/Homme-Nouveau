<template>
  <article class="relative-position" v-ripple="{ color: 'primary' }">
    <img :srcset="data.cover" />
    <section>
      <span class="text-subtitle2">{{ data.title }}</span>
    </section>
  </article>
</template>

<script lang="ts">
import { Article } from 'src/assets/js/articles';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    data: {
      type: Object as () => Article,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
@import '../css/app.scss';

article {
  padding-inline: 0.75rem;
  padding-block: 0.5rem;
  width: auto;
  height: 6rem;
  display: flex;
  align-items: stretch;
  gap: 0.5rem;

  img {
    flex: 5;
    object-fit: cover;
  }

  section {
    flex: 7;
    @include line-clamp(3);
    hyphens: auto;
  }
}
</style>
