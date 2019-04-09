<i18n>
{
  "en": {
    "section-newsletter-heading": "Sign up for our Newsletter"
  },
  "de": {
    "section-newsletter-heading": "Abonnieren Sie unseren Newsletter"
  }
}
</i18n>

<template>
  <app-content-section color="greyish">
    <div class="content-wrapper">
      <div class="row row-centered">
        <div class="col col-mobile-large-10">
          <h2 class="heading centered">{{ $t('section-newsletter-heading') }}</h2>
        </div>
      </div>
      <div class="row row-centered">
        <div class="col col-mobile-large-10 col-tablet-portrait-8 col-large-12">
          <app-newsletter-signup></app-newsletter-signup>
        </div>
      </div>
    </div>
  </app-content-section>
</template>

<script>

import ContentSection from '@/components/shared/ContentSection.vue'
import NewsletterSignup from '@/components/shared/NewsletterSignup.vue'

export default {
  name: 'SectionNewsletterSignup',
  components: {
      'app-content-section': ContentSection,
      'app-newsletter-signup': NewsletterSignup
  },
}

</script>
