export type SectionId = 
  | 'hero' 
  | 'about' 
  | 'technologies' 
  | 'process'
  | 'industries' 
  | 'gallery' 
  | 'partners' 
  | 'team' 
  | 'locations' 
  | 'faq' 
  | 'contact';

export interface CameraKeyframe {
  position: [number, number, number];
  target: [number, number, number];
  rotationSpeed: number;
  objectScale: number;
}

export type LanguageCode = 'EN' | 'AR';

export interface NavLinkItem {
  id: SectionId;
  label: string;
}

export interface ModalState {
  bookMeetingOpen: boolean;
  createAccountOpen: boolean;
  selectedLanguage: LanguageCode;
  soundEnabled: boolean;
  reducedMotion: boolean;
}
