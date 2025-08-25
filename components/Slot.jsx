import style from "@/styles/DraftPage.module.css";

export default function Slot({ openPopUp }) {
    return (
        <button className={style.slot} onClick={openPopUp}>
            +
        </button>
    );
}