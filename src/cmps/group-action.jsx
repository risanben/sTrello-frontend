
export const GroupAction = ({ group, leftPos, onOpenGroupAction }) => {

    const clicledModal = (ev) => {
        ev.stopPropagation()
    }
    return (
        <section className="group-action" style={{ left: leftPos }} onClick={clicledModal}>
            <div className="group-action-container">
                <div className="group-action-title">Actions</div>
                <div className="group-action-close" onClick={onOpenGroupAction}>X</div>
            </div>
        </section>
    )
}