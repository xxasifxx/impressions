
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useSalonServices = () => {
  return useQuery({
    queryKey: ['salon-services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('salon_services')
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
