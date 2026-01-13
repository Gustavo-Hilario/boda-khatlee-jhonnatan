import type { WeddingConfig, TimelineEvent, GalleryImage } from '../types'

export const weddingConfig: WeddingConfig = {
  couple: {
    bride: 'Khatlee',
    groom: 'Jhonatan',
  },
  date: new Date('2026-03-07T16:00:00'),
  displayDate: 'SABADO 07 DE MARZO DE 2026',
  parents: {
    bride: [
      { name: 'Victor Romero Santa Rosa' },
      { name: 'Yaner Atao Eulate' },
    ],
    groom: [
      { name: 'Gladys Cordova Yauri' },
      { name: 'Teresa Cordova Yauri' },
      { name: 'Hugo Samanamud Loyola' },
    ],
  },
  godparents: [
    { name: 'Ricardo ------- ------' },
    { name: 'Cinthia Silvera Romero' },
  ],
  venues: {
    religious: {
      name: 'Ceremonia Religiosa',
      location: '----------',
      mapUrl: 'https://maps.app.goo.gl/Nun6z5gpkLXgA5c87?g_st=iw',
      image: '/images/venue.png',
    },
    civil: {
      name: 'Ceremonia Civil',
      location: '----------',
      mapUrl: 'https://maps.app.goo.gl/Nun6z5gpkLXgA5c87?g_st=iw',
    },
    reception: {
      name: 'Recepcion Social',
      location: '----------',
      mapUrl: 'https://maps.app.goo.gl/Nun6z5gpkLXgA5c87?g_st=iw',
    },
  },
  dressCode: {
    style: 'ELEGANTE',
    reserved: ['blanco', 'ivory', 'perla'],
    bridal: ['Verde Oliva', 'Borgona'],
    pinterestWomen: '#',
    pinterestMen: '#',
  },
  rsvp: {
    whatsappNumber: '51924161790',
    deadline: 'antes del inicio del mes',
  },
  photoUpload: 'https://drive.google.com/drive/folders/1_ECAEtDQNt4oUvzhOqzj3inq7GtpWwgp?usp=sharing',
  contact: {
    invitationCreator: '920756997',
  },
}

export const timelineEvents: TimelineEvent[] = [
  { id: '1', time: '16:00', title: 'Ceremonia', icon: '/images/icons/image-removebg-preview (19).png' },
  { id: '2', time: '17:30', title: 'Coctel', icon: '/images/icons/image-removebg-preview (19).png' },
  { id: '3', time: '18:30', title: 'Recepcion', icon: '/images/icons/image-removebg-preview (19).png' },
  { id: '4', time: '19:00', title: 'Cena', icon: '/images/icons/image-removebg-preview (19).png' },
  { id: '5', time: '21:00', title: 'Baile', icon: '/images/icons/image-removebg-preview (19).png' },
  { id: '6', time: '00:00', title: 'Brindis', icon: '/images/icons/image-removebg-preview (19).png' },
]

export const galleryImages: GalleryImage[] = [
  { src: '/images/gallery/Foto2.jpg', alt: 'Khatlee y Jhonatan - Foto 1' },
  { src: '/images/gallery/Foto3.jpg', alt: 'Khatlee y Jhonatan - Foto 2' },
  { src: '/images/gallery/Foto4.jpg', alt: 'Khatlee y Jhonatan - Foto 3' },
  { src: '/images/gallery/Foto5.jpg', alt: 'Khatlee y Jhonatan - Foto 4' },
  { src: '/images/gallery/Foto6.jpg', alt: 'Khatlee y Jhonatan - Foto 5' },
  { src: '/images/gallery/Foto7.jpg', alt: 'Khatlee y Jhonatan - Foto 6' },
  { src: '/images/gallery/Foto8.jpg', alt: 'Khatlee y Jhonatan - Foto 7' },
  { src: '/images/gallery/Foto9.jpg', alt: 'Khatlee y Jhonatan - Foto 8' },
  { src: '/images/gallery/Foto10.jpg', alt: 'Khatlee y Jhonatan - Foto 9' },
  { src: '/images/gallery/Foto11.jpg', alt: 'Khatlee y Jhonatan - Foto 10' },
]

export const quotes = {
  main: 'Nuestro gran dia se aproxima y nos encantaria que formaras parte de el. Nos hace mucha ilusion invitarlos a nuestra boda.',
  closing: 'Creemos que mereces una noche llena de alegria y de buenos momentos. Por eso esperamos contar con tu compania para hacer aun mas especial este momento.',
  closingFull: 'Gracias por acompanarnos el dia mas especial de nuestra historia. Su compania en este dia es el mayor regalo que podemos recibir. Gracias a sus oraciones y su carino, por esta parte de nuestro camino estamos agradecidos con Dios y con la vida por permitirnos celebrar este momento con ustedes, nuestra familia y amigos queridos.',
}
