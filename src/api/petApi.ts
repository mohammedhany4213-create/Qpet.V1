import { supabase } from './supabase';
import type {
  CreatePetRequest,
  PetResponse,
} from '@/types/pet';

const PET_PHOTOS_BUCKET = 'pet-photos';

export interface CreatePetWithImageInput extends CreatePetRequest {
  imageFile: File;
}

export interface UpdatePetInput {
  name: string;
  species: PetResponse['species'];
  breed: string;
  gender: string;
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
  imageFile?: File | null;
}

function mapError(context: string, error: { message?: string } | null): Error {
  return new Error(`${context}${error?.message ? `: ${error.message}` : ''}`);
}

export async function uploadPetImage(
  petId: string,
  imageFile: File
): Promise<string> {
  const fileExt = imageFile.name.split('.').pop()?.toLowerCase() || 'jpg';
  const filePath = `${petId}.${fileExt}`;

  const { error } = await supabase.storage
    .from(PET_PHOTOS_BUCKET)
    .upload(filePath, imageFile, {
      contentType: imageFile.type,
      upsert: true,
    });

  if (error) throw mapError('Failed to upload photo', error);

  const { data: publicUrlData } = supabase.storage
    .from(PET_PHOTOS_BUCKET)
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}

export async function createPet(input: CreatePetWithImageInput): Promise<PetResponse> {
  // Insert via the SECURITY DEFINER function so owner_id is set server-side
  // from the authenticated session — never from the client.
  const { data: newPet, error: insertError } = await supabase
    .rpc('create_pet', {
      p_row: {
        name: input.name,
        species: input.species,
        breed: input.breed || null,
        gender: input.gender || null,
        age: input.age || null,
        color: input.color || null,
        description: input.description || null,
        personality: input.personality || null,
        location: input.location || null,
        owner_name: input.ownerName || null,
        owner_phone: input.ownerPhone || null,
        owner_whatsapp: input.ownerWhatsapp || null,
        is_available_for_adoption: input.isAvailableForAdoption || false,
        is_available_for_mating: input.isAvailableForMating || false,
        weight: input.weight || null,
        vaccination_status: input.vaccinationStatus || null,
      },
    })
    .single();

  if (insertError || !newPet) {
    throw mapError('Failed to create pet profile', insertError);
  }

  try {
    const imageUrl = await uploadPetImage(newPet.id, input.imageFile);

    const { data: updatedPet, error: updateError } = await supabase
      .from('pets')
      .update({ image_url: imageUrl })
      .eq('id', newPet.id)
      .select()
      .single();

    if (updateError || !updatedPet) {
      throw mapError('Failed to save photo URL', updateError);
    }

    return updatedPet as PetResponse;
  } catch (uploadErr) {
    await supabase.from('pets').delete().eq('id', newPet.id);
    throw uploadErr instanceof Error ? uploadErr : new Error('Photo upload failed');
  }
}

export async function getPet(id: string): Promise<PetResponse | null> {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw mapError('Failed to load pet', error);
  return data as PetResponse | null;
}

export async function getAdoptionPets(): Promise<PetResponse[]> {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('is_available_for_adoption', true)
    .order('created_at', { ascending: false });

  if (error) throw mapError('Failed to load adoption pets', error);
  return (data as PetResponse[]) ?? [];
}

export async function getMatingPets(): Promise<PetResponse[]> {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('is_available_for_mating', true)
    .order('created_at', { ascending: false });

  if (error) throw mapError('Failed to load mating pets', error);
  return (data as PetResponse[]) ?? [];
}

export async function getMyPets(): Promise<PetResponse[]> {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return [];

  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('owner_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw mapError('Failed to load your pets', error);
  return (data as PetResponse[]) ?? [];
}

export async function updatePet(id: string, input: UpdatePetInput): Promise<PetResponse> {
  const patch = {
    name: input.name,
    species: input.species,
    breed: input.breed || null,
    gender: (input.gender || null) as PetResponse['gender'],
    age: input.age || null,
    color: input.color || null,
    description: input.description || null,
    personality: input.personality || null,
    location: input.location || null,
    owner_name: input.ownerName || null,
    owner_phone: input.ownerPhone || null,
    owner_whatsapp: input.ownerWhatsapp || null,
    is_available_for_adoption: input.isAvailableForAdoption,
    is_available_for_mating: input.isAvailableForMating,
    weight: input.weight || null,
    vaccination_status: input.vaccinationStatus || null,
  };

  if (input.imageFile) {
    const imageUrl = await uploadPetImage(id, input.imageFile);
    Object.assign(patch, { image_url: imageUrl });
  }

  const { data, error } = await supabase
    .from('pets')
    .update(patch)
    .eq('id', id)
    .select()
    .single();

  if (error || !data) {
    throw mapError('Failed to update pet', error);
  }
  return data as PetResponse;
}

export async function deletePet(id: string): Promise<void> {
  const { error } = await supabase.from('pets').delete().eq('id', id);
  if (error) throw mapError('Failed to delete pet', error);
}
