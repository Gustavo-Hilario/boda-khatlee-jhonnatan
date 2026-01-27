import type { WeddingConfig, TimelineEvent, GalleryImage } from '../types';

export const weddingConfig: WeddingConfig = {
    couple: {
        bride: 'Khatlee',
        groom: 'Jhonnatan',
    },
    date: new Date('2026-03-07T12:00:00-05:00'),
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
        { name: 'Ricardo Reyes Mango' },
        { name: 'Cyntia Milagros Silvera Romero' },
    ],
    venues: {
        religious: {
            name: 'Santuario Arquidiocesano del Sagrado Corazón de Jesús',
            location: 'Santorín 258, Santiago de Surco 15023',
            mapUrl: 'https://maps.app.goo.gl/cSpP4f9mpqxb7GcPA',
            image: 'images/cards/Iglesia Sagrado Corazon de Jesus.jpg',
        },
        civil: {
            name: 'Ceremonia Civil',
            location: '----------',
            mapUrl: 'https://maps.app.goo.gl/Nun6z5gpkLXgA5c87?g_st=iw',
        },
        reception: {
            name: 'Villa Virginia Eventos – Huachipa',
            location: 'C. Los Gavilanes LT.2, Lurigancho-Chosica 15457',
            mapUrl: 'https://maps.app.goo.gl/SsUhZSHG1edUDrPD8',
            image: 'images/cards/Villa Virginia.jpg',
        },
    },
    dressCode: {
        style: 'ELEGANTE',
        reserved: ['blanco', 'ivory', 'perla'],
        bridal: ['Verde Oliva', 'Borgoña'],
        pinterestWomen: 'https://pin.it/3kgK9tEUd',
        pinterestMen: 'https://pin.it/210NZNEKg',
    },
    rsvp: {
        whatsappNumber: '51924161790',
        deadline: 'antes del inicio del mes',
    },
    photoUpload:
        'https://drive.google.com/drive/folders/1YWaPAznJ3sA19CbZpUcXY-KyHHG0brsO',
    contact: {
        invitationCreator: '920756997',
    },
};

export const timelineEvents: TimelineEvent[] = [
    {
        id: '1',
        time: '12:00',
        title: 'Iglesia',
    },
    {
        id: '2',
        time: '15:00',
        title: 'Recepción',
    },
    {
        id: '3',
        time: '15:45',
        title: 'Almuerzo',
    },
    {
        id: '4',
        time: '16:30',
        title: 'Fiesta',
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
    closingFull:
        'Gracias por acompañarnos el día más especial de nuestra historia. Su compañía en este día es el mayor regalo que podemos recibir. Gracias a sus oraciones y su cariño, por esta parte de nuestro camino estamos agradecidos con Dios y con la vida por permitirnos celebrar este momento con ustedes, nuestra familia y amigos queridos.',
};
