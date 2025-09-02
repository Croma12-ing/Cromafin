-- Add columns for PAN and Aadhaar card photo URLs to document_submissions table
ALTER TABLE public.document_submissions 
ADD COLUMN pan_card_photo_url text,
ADD COLUMN aadhaar_card_photo_url text;