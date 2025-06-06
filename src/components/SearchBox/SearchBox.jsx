import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { selectNameFilter } from "../../redux/filters/selectors";
import css from "./SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();

  const filter = useSelector(selectNameFilter);

  return (
    <div className={css.searchBox}>
      <p className={css.label}>Find contacts by name</p>
      <input
        type="text"
        value={filter}
        onChange={(event) => dispatch(changeFilter(event.target.value))}
      />
    </div>
  );
}
