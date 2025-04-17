import { DailyPractice } from '@/components/features/daily-practice/DailyPractice'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/daily')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DailyPractice />
}
