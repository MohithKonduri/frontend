"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { ResultCard } from "./result-card"

interface FormData {
  nitrogen: string
  phosphorus: string
  potassium: string
  temperature: string
  humidity: string
  ph: string
  rainfall: string
}

interface PredictionResult {
  crop: string
  confidence: number
  advisory: string
}

export function CropRecommendationForm() {
  const [formData, setFormData] = useState<FormData>({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const { toast } = useToast()

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}
    let isValid = true

    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key as keyof FormData] = "This field is required"
        isValid = false
      } else {
        const numValue = Number.parseFloat(value)
        if (isNaN(numValue)) {
          newErrors[key as keyof FormData] = "Please enter a valid number"
          isValid = false
        }
        if (key === "humidity" && (numValue < 0 || numValue > 100)) {
          newErrors[key as keyof FormData] = "Humidity must be between 0-100%"
          isValid = false
        }
        if (key === "ph" && (numValue < 0 || numValue > 14)) {
          newErrors[key as keyof FormData] = "pH must be between 0-14"
          isValid = false
        }
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill all fields correctly",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nitrogen: Number.parseFloat(formData.nitrogen),
          phosphorus: Number.parseFloat(formData.phosphorus),
          potassium: Number.parseFloat(formData.potassium),
          temperature: Number.parseFloat(formData.temperature),
          humidity: Number.parseFloat(formData.humidity),
          ph: Number.parseFloat(formData.ph),
          rainfall: Number.parseFloat(formData.rainfall),
        }),
      })

      if (!response.ok) throw new Error("API request failed")

      const data = await response.json()
      setResult(data)

      toast({
        title: "Success",
        description: "Crop prediction completed",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get prediction. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = () => {
    if (!result) return
    const content = `Smart Crop Recommendation\n\nDate: ${new Date().toLocaleDateString()}\n\nRecommended Crop: ${result.crop}\nConfidence Score: ${(result.confidence * 100).toFixed(1)}%\n\nAdvisory:\n${result.advisory}`
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `crop-recommendation-${new Date().getTime()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="w-full max-w-2xl space-y-8">
      <Card className="w-full shadow-lg">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="text-2xl">Crop Recommendation Form</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Enter your soil and weather conditions to get crop recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Soil Nutrients Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-foreground">Soil Nutrients</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <FormField
                  label="Nitrogen (N)"
                  name="nitrogen"
                  value={formData.nitrogen}
                  onChange={handleChange}
                  error={errors.nitrogen}
                  placeholder="kg/ha"
                />
                <FormField
                  label="Phosphorus (P)"
                  name="phosphorus"
                  value={formData.phosphorus}
                  onChange={handleChange}
                  error={errors.phosphorus}
                  placeholder="kg/ha"
                />
                <FormField
                  label="Potassium (K)"
                  name="potassium"
                  value={formData.potassium}
                  onChange={handleChange}
                  error={errors.potassium}
                  placeholder="kg/ha"
                />
              </div>
            </div>

            {/* Weather Conditions Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-foreground">Weather Conditions</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <FormField
                  label="Temperature"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  error={errors.temperature}
                  placeholder="°C"
                />
                <FormField
                  label="Humidity"
                  name="humidity"
                  value={formData.humidity}
                  onChange={handleChange}
                  error={errors.humidity}
                  placeholder="%"
                />
                <FormField
                  label="Rainfall"
                  name="rainfall"
                  value={formData.rainfall}
                  onChange={handleChange}
                  error={errors.rainfall}
                  placeholder="mm"
                />
              </div>
            </div>

            {/* Soil pH Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-foreground">Soil Properties</h3>
              <FormField
                label="Soil pH"
                name="ph"
                value={formData.ph}
                onChange={handleChange}
                error={errors.ph}
                placeholder="0-14"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Predicting...
                </>
              ) : (
                "Predict Suitable Crop"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-500">
          <ResultCard
            result={result}
            onReset={() => {
              setResult(null)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onSave={handleSave}
          />
        </div>
      )}
    </div>
  )
}

interface FormFieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  placeholder?: string
}

function FormField({ label, name, value, onChange, error, placeholder }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type="number"
        step="any"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${error ? "border-destructive" : ""}`}
      />
      {error && <p className="text-sm text-destructive font-medium">{error}</p>}
    </div>
  )
}
