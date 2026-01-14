import type { WeddingConfig, TimelineEvent, GalleryImage } from '../types';

export const weddingConfig: WeddingConfig = {
    couple: {
        bride: 'Khatlee',
        groom: 'Jhonnatan',
    },
    date: new Date('2026-03-07T16:00:00-05:00'),
    displayDate: 'SÁBADO 07 DE MARZO DE 2026',
    parents: {
        bride: [
            { name: 'Victor Romero Santa Rosa' },
            { name: 'Yanet Atao Eulate' },
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
            image: 'images/venue.png',
        },
        civil: {
            name: 'Ceremonia Civil',
            location: '----------',
            mapUrl: 'https://maps.app.goo.gl/Nun6z5gpkLXgA5c87?g_st=iw',
        },
        reception: {
            name: 'Recepción Social',
            location: '----------',
            mapUrl: 'https://maps.app.goo.gl/Nun6z5gpkLXgA5c87?g_st=iw',
        },
    },
    dressCode: {
        style: 'ELEGANTE',
        reserved: ['blanco', 'ivory', 'perla'],
        bridal: ['Verde Oliva', 'Borgoña'],
        pinterestWomen: '#',
        pinterestMen: '#',
    },
    rsvp: {
        whatsappNumber: '51924161790',
        deadline: 'antes del inicio del mes',
    },
    photoUpload:
        'https://drive.google.com/drive/folders/1_ECAEtDQNt4oUvzhOqzj3inq7GtpWwgp?usp=sharing',
    contact: {
        invitationCreator: '920756997',
    },
};

export const timelineEvents: TimelineEvent[] = [
    {
        id: '1',
        time: '16:00',
        title: 'Ceremonia',
    },
    {
        id: '2',
        time: '17:30',
        title: 'Cóctel',
    },
    {
        id: '3',
        time: '18:30',
        title: 'Recepción',
    },
    {
        id: '4',
        time: '19:00',
        title: 'Cena',
    },
    {
        id: '5',
        time: '21:00',
        title: 'Baile',
    },
    {
        id: '6',
        time: '00:00',
        title: 'Brindis',
    },
];

export const galleryImages: GalleryImage[] = [
    { src: 'images/gallery/Foto2.jpg', alt: 'Khatlee y Jhonnatan - Foto 1' },
    { src: 'images/gallery/Foto3.jpg', alt: 'Khatlee y Jhonnatan - Foto 2' },
    { src: 'images/gallery/Foto4.jpg', alt: 'Khatlee y Jhonnatan - Foto 3' },
    { src: 'images/gallery/Foto5.jpg', alt: 'Khatlee y Jhonnatan - Foto 4' },
    { src: 'images/gallery/Foto6.jpg', alt: 'Khatlee y Jhonnatan - Foto 5' },
    { src: 'images/gallery/Foto7.jpg', alt: 'Khatlee y Jhonnatan - Foto 6' },
    { src: 'images/gallery/Foto8.jpg', alt: 'Khatlee y Jhonnatan - Foto 7' },
    { src: 'images/gallery/Foto9.jpg', alt: 'Khatlee y Jhonnatan - Foto 8' },
    { src: 'images/gallery/Foto10.jpg', alt: 'Khatlee y Jhonnatan - Foto 9' },
    { src: 'images/gallery/Foto11.jpg', alt: 'Khatlee y Jhonnatan - Foto 10' },
];

export const quotes = {
    main: 'Nuestro gran día se aproxima y nos encantaría que formaras parte de él. Nos hace mucha ilusión invitarlos a nuestra boda.',
    closing:
        'Creemos que mereces una noche llena de alegría y de buenos momentos. Por eso esperamos contar con tu compañía para hacer aún más especial este momento.',
    closingFull:
        'Gracias por acompañarnos el día más especial de nuestra historia. Su compañía en este día es el mayor regalo que podemos recibir. Gracias a sus oraciones y su cariño, por esta parte de nuestro camino estamos agradecidos con Dios y con la vida por permitirnos celebrar este momento con ustedes, nuestra familia y amigos queridos.',
};
