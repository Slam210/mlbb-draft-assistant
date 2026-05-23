import style from "@/src/styles/DraftPage.module.css";

export default function DraftPanel({
  title,
  handleSlotClick,
  handleNullSlotClick,
  slots,
  heroes,
}) {
  return (
    <div className={style.draftPanel}>
      <h3>{title}</h3>
      <div className={style.slotContainer}>
        {slots.map((el, i) => (
          <div className={style.slot} key={i}>
            <button
              className={style.slotIcon}
              onClick={() => handleSlotClick(title, i)}
            >
              {el === null || !heroes[el - 1] ? (
                "+"
              ) : (
                <img
                  src={heroes[el - 1].icons.round}
                  alt={heroes[el - 1].name}
                />
              )}
            </button>
            <button
              className={style.nullSlotButton}
              onClick={() => handleNullSlotClick(title, i)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
