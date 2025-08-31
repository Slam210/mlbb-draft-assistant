import style from "@/styles/DraftPage.module.css";

export default function DraftPanel({ title, handleSlotClick, slots, heroes }) {
    return (
        <div className={style.draftPanel}>
            <h3>{title}</h3>
            <div className={style.slotContainer}>
                {slots.map((el, i) => (
                    <button
                        className={style.slot}
                        onClick={() => handleSlotClick(title, i)}
                        key={i}
                    >
                        {
                            el === null || !heroes[el - 1]
                                ? "+"
                                : <img
                                    src={heroes[el - 1].icons.round}
                                    alt={heroes[el - 1].name}
                                />
                        }
                    </button>
                ))}
            </div>
        </div>
    );
}