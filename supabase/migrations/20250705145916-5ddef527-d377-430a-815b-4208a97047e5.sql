
-- Enable RLS on addresses table if not already enabled
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to view their own addresses
CREATE POLICY "Users can view their own addresses" 
  ON public.addresses 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to insert their own addresses
CREATE POLICY "Users can create their own addresses" 
  ON public.addresses 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to update their own addresses
CREATE POLICY "Users can update their own addresses" 
  ON public.addresses 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to delete their own addresses
CREATE POLICY "Users can delete their own addresses" 
  ON public.addresses 
  FOR DELETE 
  USING (auth.uid() = user_id);
