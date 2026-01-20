-- Add UTM tracking fields to page_views table
ALTER TABLE page_views 
ADD COLUMN utm_source VARCHAR(255),
ADD COLUMN utm_medium VARCHAR(255),
ADD COLUMN utm_campaign VARCHAR(255),
ADD COLUMN utm_content VARCHAR(255),
ADD COLUMN utm_term VARCHAR(255);

-- Create indexes for UTM fields for faster queries
CREATE INDEX idx_page_views_utm_source ON page_views(utm_source);
CREATE INDEX idx_page_views_utm_campaign ON page_views(utm_campaign);
CREATE INDEX idx_page_views_utm_medium ON page_views(utm_medium);
