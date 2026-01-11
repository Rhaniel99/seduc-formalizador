import { DemandFormData } from "./Demand"

export type StepProps = {
  data: Partial<DemandFormData>
  errors: Record<string, string>
  onChange: (field: keyof DemandFormData, value: any) => void
}