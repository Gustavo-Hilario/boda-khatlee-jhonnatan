export interface Guest {
  id: string
  name: string
  passes: number
  confirmed?: number // Number of confirmed attendees (undefined = not yet confirmed)
}

export interface GuestFormData {
  name: string
  passes: number
}

export interface TimelineEvent {
  id: string
  time: string
  title: string
  icon?: string // Optional - now using component-based icons mapped by title
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
  giftSuggestions?: {
    bankName?: string
    accountNumber: string
    cci: string
    phoneNumber: string
  }
}
