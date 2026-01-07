"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Leaf, TrendingUp } from "lucide-react"

interface ResultCardProps {
  result: {
    crop: string
    confidence: number
    advisory: string
  }
  onReset: () => void
  onSave?: () => void
}

export function ResultCard({ result, onReset, onSave }: ResultCardProps) {
  const confidencePercentage = Math.round(result.confidence * 100)
  const confidenceColor =
    confidencePercentage >= 80 ? "text-green-600" : confidencePercentage >= 60 ? "text-blue-600" : "text-amber-600"

  return (
    <Card className="w-full max-w-2xl shadow-lg border-2 border-primary">
      <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-t-lg">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-8 h-8" />
          <CardTitle className="text-2xl">Prediction Complete</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-8 space-y-8">
        {/* Recommended Crop */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center">
              <Leaf className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium mb-1">Recommended Crop</p>
            <h2 className="text-4xl md:text-5xl font-bold text-primary text-balance">{result.crop}</h2>
          </div>
        </div>

        {/* Confidence Badge */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">Confidence Score</span>
            </div>
            <span className={`text-3xl font-bold ${confidenceColor}`}>{confidencePercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary to-green-500 h-2 rounded-full"
              style={{ width: `${confidencePercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Advisory Message */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <p className="text-sm font-semibold text-amber-900 mb-2">Agricultural Advisory</p>
          <p className="text-foreground leading-relaxed">{result.advisory}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button onClick={onReset} variant="outline" className="flex-1 bg-transparent">
            Make Another Prediction
          </Button>
          <Button onClick={onSave} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">Save Result</Button>
        </div>
      </CardContent>
    </Card>
  )
}
