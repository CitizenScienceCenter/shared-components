import Vue from 'vue'

import * as coms from './components'

export default {
  install (Vue, options) {
    Vue.use(coms.Comments)
    Vue.use(coms.ContentSection)
    Vue.use(coms.Cover)
    Vue.use(coms.Expandable)
    Vue.use(coms.Feedback)
    Vue.use(coms.Footer)
    Vue.use(coms.GDPR)
    Vue.use(coms.GrowingTextArea)
    Vue.use(coms.Header)
    Vue.use(coms.InlineHover)
    Vue.use(coms.Loader)
    Vue.use(coms.LoginForm)
    Vue.use(coms.NewsletterSignup)
    Vue.use(coms.RankingTable)
    Vue.use(coms.RegisterForm)
    Vue.use(coms.SectionFeedback)
    Vue.use(coms.SectionNewsletterSignup)
    Vue.use(coms.SectionStats)
    Vue.use(coms.StepWizard)
    Vue.use(coms.StepWizardStep)
    Vue.use(coms.SubmitButton)
    Vue.use(coms.Tab)
    Vue.use(coms.TabbedContent)
    Vue.use(coms.UserAvatar)
  }
}
