-- AlterTable
ALTER TABLE "page_views" ADD COLUMN     "utm_campaign" TEXT,
ADD COLUMN     "utm_content" TEXT,
ADD COLUMN     "utm_medium" TEXT,
ADD COLUMN     "utm_source" TEXT,
ADD COLUMN     "utm_term" TEXT;

-- CreateIndex
CREATE INDEX "page_views_utm_source_idx" ON "page_views"("utm_source");

-- CreateIndex
CREATE INDEX "page_views_utm_campaign_idx" ON "page_views"("utm_campaign");

-- CreateIndex
CREATE INDEX "page_views_utm_medium_idx" ON "page_views"("utm_medium");
