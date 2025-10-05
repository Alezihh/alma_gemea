import { useState } from 'react';

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
  };

  return {
    formData,
    updateField,
    resetForm
  };
};
