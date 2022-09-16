export const TaskDetailsCoverModal = (props) => {

    return (
        <section className="cover-modal">
            <input type="color" onChange={props.onSetColor} />

            <select onChange={props.onSetImg}>
                <option >Select a cover image</option>
                <option value={'mountains'}>Mountains</option>
                <option value={'ocean'}>Ocean</option>
            </select>
        </section>
    )
}