
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useSalonSpecialists = () => {
  return useQuery({
    queryKey: ['salon-specialists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('salon_specialists')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (error) {
        throw error;
      }
      
      return data;
    }
  });
};
