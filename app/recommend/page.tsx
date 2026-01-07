import { CropRecommendationForm } from "@/components/crop-recommendation-form"

export const metadata = {
  title: "Get Crop Recommendation - Smart Crop Advisory",
}

export default function RecommendPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <CropRecommendationForm />
      </div>
    </main>
  )
}
