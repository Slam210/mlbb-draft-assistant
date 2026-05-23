export default function DraftPanel({
  title,
  handleSlotClick,
  handleNullSlotClick,
  slots,
  heroes,
}) {
  return (
    <div className="mb-5 flex flex-col items-center">
      <h3 className="mb-1 flex flex-col items-center">{title}</h3>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 justify-items-center">
        {slots.map((el, i) => (
          <div key={i} className="flex flex-col gap-1">
            {/* Remove slot button */}
            <button
              onClick={() => handleNullSlotClick(title, i)}
              className="
                flex items-center justify-center
                rounded-md
                text-white
                text-sm
                w-6 h-6
                mx-auto
              "
            >
              x
            </button>
            {/* Slot button */}
            <button
              onClick={() => handleSlotClick(title, i)}
              className="
                w-16 h-16
                border-[3px] border-gray-400
                rounded-full
                flex items-center justify-center
                cursor-pointer
                bg-transparent
                overflow-hidden
              "
            >
              {el === null || !heroes[el - 1] ? (
                "+"
              ) : (
                <img
                  src={heroes[el - 1].icons.round}
                  alt={heroes[el - 1].name}
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}