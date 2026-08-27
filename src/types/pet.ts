export type PetSpecies = 'Dog' | 'Cat' | 'Bird' | 'Rabbit' | 'Hamster' | 'Reptile' | 'Fish' | 'Other';

export type PetGender = 'Male' | 'Female';

export interface CreatePetRequest {
  name: string;
  species: PetSpecies;
  breed: string;
  gender: PetGender | '';
  age: string;
  color: string;
  description: string;
  personality: string;
  location: string;
  ownerName: string;
  ownerPhone: string;
  ownerWhatsapp: string;
  isAvailableForAdoption: boolean;
  isAvailableForMating: boolean;
  weight: string;
  vaccinationStatus: string;
}

export interface PetResponse {
  id: string;
  owner_id: string | null;
  name: string;
  species: PetSpecies;
  breed: string | null;
  gender: PetGender | null;
  age: string | null;
  color: string | null;
  description: string | null;
  personality: string | null;
  location: string | null;
  owner_name: string | null;
  owner_phone: string | null;
  owner_whatsapp: string | null;
  image_url: string;
  created_at: string;
  is_available_for_adoption: boolean;
  is_available_for_mating: boolean;
  weight: string | null;
  vaccination_status: string | null;
}

export interface ApiError {
  message: string;
  code?: string;
}

export const PET_SPECIES: PetSpecies[] = [
  'Dog',
  'Cat',
  'Bird',
  'Rabbit',
  'Hamster',
  'Reptile',
  'Fish',
  'Other',
];

export const PET_GENDERS: PetGender[] = ['Male', 'Female'];

export const SPECIES_EMOJI: Record<string, string> = {
  Dog: '🐶',
  Cat: '🐱',
  Bird: '🐦',
  Rabbit: '🐰',
  Hamster: '🐹',
  Reptile: '🦎',
  Fish: '🐟',
  Other: '✨',
};
