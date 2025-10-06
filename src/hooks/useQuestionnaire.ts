import { useState } from 'react';
import { saveUserData, getUserData } from '@/lib/supabase';

export interface QuestionnaireData {
  name: string;
  birthdate: string;
  city: string;
  zodiacSign: string;
  height: string;
  email: string;
}

export const useQuestionnaire = () => {
  const [formData, setFormData] = useState<QuestionnaireData>({
    name: "",
    birthdate: "",
    city: "",
    zodiacSign: "",
    height: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSetup, setShowSetup] = useState(false);

  const updateField = (field: keyof QuestionnaireData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      birthdate: "",
      city: "",
      zodiacSign: "",
      height: "",
      email: "",
    });
    setError(null);
  };

  const saveData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Generate a temporary email if none provided
      const email = formData.email || `temp_${Date.now()}@alma-gemea.com`;
      
      // Convert form data to database format
      const userData = {
        name: formData.name,
        birthdate: formData.birthdate,
        city: formData.city,
        zodiac_sign: formData.zodiacSign,
        height: formData.height,
        email: email,
      };

      console.log('Saving user data:', userData);
      const result = await saveUserData(userData);
      console.log('User data saved successfully:', result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao salvar dados';
      setError(errorMessage);
      console.error('Error saving user data:', err);
      
      // If table doesn't exist, show setup instructions
      if (errorMessage.includes('Tabela "users" não existe')) {
        setShowSetup(true);
      }
      
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserData = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getUserData(email);
      if (result) {
        setFormData({
          name: result.name || "",
          birthdate: result.birthdate || "",
          city: result.city || "",
          zodiacSign: result.zodiac_sign || "",
          height: result.height || "",
          email: result.email || "",
        });
      }
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar dados';
      setError(errorMessage);
      console.error('Error loading user data:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    updateField,
    resetForm,
    saveData,
    loadUserData,
    isLoading,
    error,
    showSetup,
    setShowSetup
  };
};

