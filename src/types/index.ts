export interface TimelineEvent {
  id: string
  time: string
  title: string
  icon: string
}

export interface Venue {
  name: string
  location: string
  mapUrl: string
  image?: string
}

export interface GalleryImage {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface FamilyMember {
  name: string
  role?: string
}

export interface WeddingConfig {
  couple: {
    bride: string
    groom: string
  }
  date: Date
  displayDate: string
  parents: {
    bride: FamilyMember[]
    groom: FamilyMember[]
  }
  godparents: FamilyMember[]
  venues: {
    religious: Venue
    civil: Venue
    reception: Venue
  }
  dressCode: {
    style: string
    reserved: string[]
    bridal: string[]
    pinterestWomen?: string
    pinterestMen?: string
  }
  rsvp: {
    whatsappNumber: string
    deadline: string
  }
  photoUpload: string
  contact: {
    invitationCreator: string
  }
}
