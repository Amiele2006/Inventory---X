
export default function Stepper({ currentStep, totalSteps }) {
  return (
    <div className="flex items-center justify-center">
      {[...Array(totalSteps)].map((_, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium
              ${index + 1 === currentStep ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-400"}`}
          >
            {index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div className="mx-2 w-16">
              <div className="border-b border-dotted border-gray-300"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

