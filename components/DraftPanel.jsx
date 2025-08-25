import Slot from "./Slot";
import style from "@/styles/DraftPage.module.css";

export default function DraftPanel({ title, slots, openPopUp }) {
    return (
        <div className={style.draftPanel}>
            <h3>{title}</h3>
            <div className={style.slotContainer}>
                {Array.from({ length: slots }).map((_, i) => (
                    <Slot key={i} openPopUp={openPopUp} />
                ))}
            </div>
        </div>
    );
}