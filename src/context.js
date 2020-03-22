import moment from 'moment'

export default function getDefaultContext() {
  return {
    navbrand: 'anditakaesar',
    topnavs: [
      { title: 'Blog', href: '#' },
      { title: 'Portofolio', href: '#' },
      { title: 'Admin', href: '/admin' },
    ],
    socials: [
      { title: 'Linkedin', href: '#' },
      { title: 'Github', href: '#' },
      { title: 'Twitter', href: '#' },
      { title: 'Telegram', href: '#' },
    ],
    footcopy: {
      title: 'anditakaesar',
      href: '#',
      year: moment().year(),
    },
  }
}
