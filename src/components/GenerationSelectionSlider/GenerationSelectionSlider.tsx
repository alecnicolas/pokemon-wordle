type GenerationSelectionSliderProps = {
  selectedGen: number;
  onChange: (gen: number) => void;
  disabled: boolean;
};

const GenerationSelectionSlider = ({ selectedGen, onChange, disabled }: GenerationSelectionSliderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <label
        htmlFor="gen-range"
        className="block mb-2 text-sm font-medium text-gray-300 dark:text-white"
      >
        Up to Generation {selectedGen}
      </label>
      <input
        id="gen-range"
        type="range"
        min={1}
        max={9}
        disabled={disabled}
        value={selectedGen}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 bg-gradient-to-r from-blue-500 to-gray-300 disabled:cursor-not-allowed disabled:from-gray-500"
      />
    </div>
  );
};

export default GenerationSelectionSlider;
